import { getInput, setFailed } from '@actions/core';
import { exec as _exec } from '@actions/exec';

async function run() {
  try {
    const mode = getInput('mode');
    const network = getInput('network');
    const forkAtHeight = getInput('forkAtHeight');
    const showCalls = getInput('showCalls');
    const resolveHashes = getInput('resolveHashes');
    
    const downloadUrl = "https://github.com/matter-labs/era-test-node/releases/download/v0.1.0-alpha.2/era_test_node-v0.1.0-alpha.2-x86_64-unknown-linux-gnu.tar.gz";
    const tarFile = "era_test_node-v0.1.0-alpha.2-x86_64-unknown-linux-gnu.tar.gz";
    await _exec('wget', [downloadUrl]);
    await _exec('tar', ['-xzf', tarFile]);
    await _exec('chmod', ['+x', 'era_test_node']);

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

    // Start era_test_node
    await _exec('./era_test_node', args);

  } catch (error) {
    setFailed(error.message);
  }
}

run();
