Certainly! Below is the updated README to reflect the new features and options.

---

# Era Test Node Action 🚀

## Description

This GitHub Action runs the `era_test_node` with various options. It allows for high configurability and makes it easy to integrate `era_test_node` into your CI/CD workflows on GitHub Actions.

## Features 🌟

- Supports multiple modes: `run` and `fork`.
- Allows you to specify which network to use (e.g., `mainnet`, `testnet`).
- Optional fork at a specific block height.
- Show calls, storage logs, VM details, and gas details based on specified options.
- Enable hash resolution.
- Configurable logging options.
- Support for different target architectures.
- Ability to specify the version of `era_test_node`.

## Inputs 🛠

### `mode`

Mode to run era_test_node in (`run`, `fork`).

- **Required**: No
- **Default**: `run`

### `network`

The network to use (e.g., `mainnet`, `testnet`).

- **Required**: No

### `forkAtHeight`

The block height to fork at.

- **Required**: No

### `port`

Port to listen on.

- **Required**: No
- **Default**: `8011`

### `showCalls`

Show call debug information. 

- **Required**: No
- **Default**: `none`

### `showStorageLogs`

Show storage log information.

- **Required**: No
- **Default**: `none`

### `showVmDetails`

Show VM details information.

- **Required**: No
- **Default**: `none`

### `showGasDetails`

Show Gas details information.

- **Required**: No
- **Default**: `none`

### `resolveHashes`

Enable hash resolution.

- **Required**: No
- **Default**: `false`

### `log`

Log filter level.

- **Required**: No
- **Default**: `info`

### `logFilePath`

Log file path.

- **Required**: No
- **Default**: `era_test_node.log`

### `target`

Target architecture (e.g., `x86_64-unknown-linux-gnu`, `x86_64-apple-darwin`, `aarch64-apple-darwin`).

- **Required**: No
- **Default**: `x86_64-unknown-linux-gnu`

### `version`

Version of `era_test_node` to use.

- **Required**: No
- **Default**: `v0.1.0-alpha.3`

## Example Usage 📝

```yml
name: Run Era Test Node Action

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Run Era Test Node
      uses: dutterbutter/era-test-node-action@latest
      with:
        mode: 'run'
        showCalls: 'user'
        showStorageLogs: 'read'
        showVmDetails: 'all'
        showGasDetails: 'all'
        resolveHashes: 'true'
        log: 'info'
        logFilePath: 'era_test_node.log'
        target: 'x86_64-unknown-linux-gnu'
        version: 'v0.1.0-alpha.3'
```

### Upload log file to artifacts

```yml
name: Run Era Test Node Action

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Run Era Test Node
      uses: dutterbutter/era-test-node-action@latest
      with:
        mode: 'run'
        showCalls: 'user'
        showStorageLogs: 'read'
        showVmDetails: 'all'
        showGasDetails: 'all'
        resolveHashes: 'true'
        log: 'info'
        logFilePath: 'era_test_node.log'
        target: 'x86_64-unknown-linux-gnu'
        version: 'v0.1.0-alpha.3'

    - name: Upload era_test_node log
      uses: actions/upload-artifact@v3
      with:
        name: era_test_node-log
        path: era_test_node.log
```

### With Fork

```yml
name: Run Era Test Node Action

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Run Era Test Node
      uses: dutterbutter/era-test-node-action@latest
      with:
        mode: 'fork'
        network: 'mainnet'
        forkAtHeight: '1855248'
        showCalls: 'user'
        showStorageLogs: 'read'
        showVmDetails: 'all'
        showGasDetails: 'all'
        resolveHashes: 'true'
        log: 'info'
        logFilePath: 'era_test_node.log'
        target: 'x86_64-unknown-linux-gnu'
        version: 'v0.1.0-alpha.3'
```

## Contributing 🤝

Feel free to open issues or PRs if you find any problems or have suggestions for improvements. Your contributions are more than welcome!

## License 📄

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details.