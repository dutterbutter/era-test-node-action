const { getInput, setFailed, addPath } = require("@actions/core");
const { exec } = require("@actions/exec");
const tc = require("@actions/tool-cache");
const { spawn } = require("child_process");
const { fetch } = require("ofetch");

const ERA_TEST_NODE_RELEASE_TAG = getInput("releaseTag") || "latest";
const ERA_TEST_NODE_ARCH = getInput("target") || "x86_64-unknown-linux-gnu";

async function getDownloadUrl() {
  let apiUrl;
  if (ERA_TEST_NODE_RELEASE_TAG === "latest") {
    apiUrl =
      "https://api.github.com/repos/matter-labs/anvil-zksync/releases/tags/v0.1.0-alpha.34";
  } else {
    apiUrl = `https://api.github.com/repos/matter-labs/anvil-zksync/releases/tags/${ERA_TEST_NODE_RELEASE_TAG}`;
  }

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch release info for tag ${ERA_TEST_NODE_RELEASE_TAG}. HTTP Status: ${response.status}`
    );
  }

  const releaseInfo = await response.json();

  if (!releaseInfo || !releaseInfo.assets || !releaseInfo.assets.length) {
    throw new Error(
      `Release assets for tag ${ERA_TEST_NODE_RELEASE_TAG} are not available.`
    );
  }

  const assetInfo = releaseInfo.assets.find((asset) =>
    asset.name.includes(ERA_TEST_NODE_ARCH)
  );
  if (!assetInfo) {
    throw new Error(`Asset with architecture ${ERA_TEST_NODE_ARCH} not found.`);
  }

  return assetInfo.browser_download_url;
}

async function run() {
  try {
    const mode = getInput("mode") || "run";
    const network = getInput("network");
    const forkAtHeight = getInput("forkAtHeight");
    const port = getInput("port");
    const showCalls = getInput("showCalls");
    const showStorageLogs = getInput("showStorageLogs");
    const showVmDetails = getInput("showVmDetails");
    const showGasDetails = getInput("showGasDetails");
    const resolveHashes = getInput("resolveHashes");
    const log = getInput("log");
    const logFilePath = getInput("logFilePath");

    let toolPath = tc.find("era_test_node", ERA_TEST_NODE_RELEASE_TAG);

    if (!toolPath) {
      const downloadUrl = await getDownloadUrl();
      const tarFile = await tc.downloadTool(downloadUrl);
      const extractedDir = await tc.extractTar(tarFile);
      toolPath = await tc.cacheDir(
        extractedDir,
        "era_test_node",
        ERA_TEST_NODE_RELEASE_TAG
      );
    }
    addPath(toolPath);

    await exec("chmod", ["+x", `${toolPath}/era_test_node`]);

    let args = [];

    if (port) {
      args.push("--port", port);
    }
    if (showCalls) {
      args.push("--show-calls", showCalls);
    }
    if (showStorageLogs) {
      args.push("--show-storage-logs", showStorageLogs);
    }
    if (showVmDetails) {
      args.push("--show-vm-details", showVmDetails);
    }
    if (showGasDetails) {
      args.push("--show-gas-details", showGasDetails);
    }
    if (resolveHashes === "true") {
      args.push("--resolve-hashes");
    }
    if (log) {
      args.push("--log", log);
    }
    if (logFilePath) {
      args.push("--log-file-path", logFilePath);
    }
    if (mode === "fork") {
      args.push("fork");
      if (network) {
        args.push(network);
      }
      if (forkAtHeight) {
        args.push("--fork-at", forkAtHeight);
      }
    } else {
      args.push("run");
    }

    console.log("Starting era_test_node with args:", args);

    const child = spawn(`${toolPath}/era_test_node`, args, {
      detached: true,
      stdio: "ignore",
    });

    child.on("error", (error) => {
      console.error(`Failed to start child process: ${error}`);
    });

    child.on("exit", (code, signal) => {
      if (code) {
        console.log(`Child process exited with code ${code}`);
      } else if (signal) {
        console.log(`Child process killed with signal ${signal}`);
      } else {
        console.log("Child process exited");
      }
    });

    child.unref();
    // sanity check
    // Adding a timeout to give the node some time to start up before checking
    setTimeout(async () => {
      if (port && (await isNodeRunning(port))) {
        console.log(`Confirmed: era_test_node is running on port ${port}`);
      } else {
        console.error(
          "Health check failed: era_test_node appears to be not running."
        );
        setFailed("Failed to start era_test_node");
      }
    }, 5000);
  } catch (error) {
    setFailed(error.message);
  }
}

run();

async function isNodeRunning(port) {
  try {
    const response = await fetch.post(`http://localhost:${port}`, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_blockNumber",
      params: [],
    });
    return response.data && response.data.result !== undefined;
  } catch (error) {
    return false;
  }
}
