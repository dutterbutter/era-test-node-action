const { getInput, setFailed, addPath } = require('@actions/core');
const { exec } = require('@actions/exec');
const { spawn } = require('child_process');
const tc = require('@actions/tool-cache');
const fs = require('fs');

const ERA_TEST_NODE_VERSION = 'v0.1.0-alpha.2';
const ERA_TEST_NODE_ARCH = 'x86_64-unknown-linux-gnu';
const ERA_TEST_NODE_NAME = 'era_test_node';

async function run() {
  try {
    const mode = getInput('mode');
    const network = getInput('network');
    const forkAtHeight = getInput('forkAtHeight');
    const showCalls = getInput('showCalls');
    const resolveHashes = getInput('resolveHashes');
    const saveLogs = getInput('saveLogs');
    
    let toolPath = tc.find(ERA_TEST_NODE_NAME, ERA_TEST_NODE_VERSION);
    
    if (!toolPath) {
      const downloadUrl = `https://github.com/matter-labs/era-test-node/releases/download/${ERA_TEST_NODE_VERSION}/${ERA_TEST_NODE_NAME}-${ERA_TEST_NODE_VERSION}-${ERA_TEST_NODE_ARCH}.tar.gz`;
      const tarFile = await tc.downloadTool(downloadUrl);
      const extractedDir = await tc.extractTar(tarFile);
      toolPath = await tc.cacheDir(extractedDir, ERA_TEST_NODE_NAME, ERA_TEST_NODE_VERSION);
    }

    addPath(toolPath);

    await exec('chmod', ['+x', `${toolPath}/era_test_node`]);

    let args = [mode];
    if (mode === 'fork') {
      args.push(network);
      if (forkAtHeight) {
        args.push('--fork-at', forkAtHeight);
      }
    }
    if (showCalls === 'true') {
      args.push('--show-calls=user');
    }
    if (resolveHashes === 'true') {
      args.push('--resolve-hashes');
    }

    const child = spawn(`${toolPath}/era_test_node`, args, {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'] 
    });
    if (saveLogs === 'true') {
      const stdoutLogStream = fs.createWriteStream('stdout.log');
      const stderrLogStream = fs.createWriteStream('stderr.log');
      child.stdout.pipe(stdoutLogStream);
      child.stderr.pipe(stderrLogStream);
    }
    
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

    console.log('era_test_node should now be running in the background');

  } catch (error) {
    setFailed(error.message);
  }
}

run();
