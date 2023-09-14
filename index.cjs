const { getInput, setFailed, addPath } = require('@actions/core');
const { exec } = require('@actions/exec');
const tc = require('@actions/tool-cache');
const { spawn } = require('child_process');

let ERA_TEST_NODE_VERSION = getInput('version') || 'v0.1.0-alpha.3';
let ERA_TEST_NODE_ARCH = getInput('target') || 'x86_64-unknown-linux-gnu';
const ERA_TEST_NODE_NAME = 'era_test_node';

async function run() {
  try {
    const mode = getInput('mode') || 'run';
    const network = getInput('network');
    const forkAtHeight = getInput('forkAtHeight');
    const port = getInput('port');
    const showCalls = getInput('showCalls');
    const showStorageLogs = getInput('showStorageLogs');
    const showVmDetails = getInput('showVmDetails');
    const showGasDetails = getInput('showGasDetails');
    const resolveHashes = getInput('resolveHashes');
    const log = getInput('log');
    const logFilePath = getInput('logFilePath');
    
    let toolPath = tc.find(ERA_TEST_NODE_NAME, ERA_TEST_NODE_VERSION);
    
    if (!toolPath) {
      const downloadUrl = `https://github.com/matter-labs/era-test-node/releases/download/${ERA_TEST_NODE_VERSION}/${ERA_TEST_NODE_NAME}-${ERA_TEST_NODE_VERSION}-${ERA_TEST_NODE_ARCH}.tar.gz`;
      const tarFile = await tc.downloadTool(downloadUrl);
      const extractedDir = await tc.extractTar(tarFile);
      toolPath = await tc.cacheDir(extractedDir, ERA_TEST_NODE_NAME, ERA_TEST_NODE_VERSION);
    }

    addPath(toolPath);

    await exec('chmod', ['+x', `${toolPath}/era_test_node`]);

    let args = [];

    if (port) {
      args.push('--port', port);
    }
    if (showCalls) {
      args.push('--show-calls', showCalls);
    }
    if (showStorageLogs) {
      args.push('--show-storage-logs', showStorageLogs);
    }
    if (showVmDetails) {
      args.push('--show-vm-details', showVmDetails);
    }
    if (showGasDetails) {
      args.push('--show-gas-details', showGasDetails);
    }
    if (resolveHashes === 'true') {
      args.push('--resolve-hashes');
    }
    if (log) {
      args.push('--log', log);
    }
    if (logFilePath) {
      args.push('--log-file-path', logFilePath);
    }
    if (mode === 'fork') {
      args.push('fork');
      if (network) {
        args.push(network);
      }
      if (forkAtHeight) {
        args.push('--fork-at', forkAtHeight);
      }
    } else {
      args.push('run');
    }
    
    console.log('About to start era_test_node with args:', args);

    const child = spawn(`${toolPath}/era_test_node`, args, {
      detached: true,
      stdio: 'ignore'
    });
    
    child.on('error', (error) => {
      console.error(`Failed to start child process: ${error}`);
    });

    child.on('exit', (code, signal) => {
      if (code) {
        console.log(`Child process exited with code ${code}`);
      } else if (signal) {
        console.log(`Child process killed with signal ${signal}`);
      } else {
        console.log('Child process exited');
      }
    });

    child.unref();

    console.log('era_test_node is now be running in the background');

  } catch (error) {
    setFailed(error.message);
  }
}

run();
