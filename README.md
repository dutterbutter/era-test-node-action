# Era Test Node Action 🚀

## Description

This GitHub Action runs the [`era_test_node`](https://github.com/matter-labs/era-test-node) with various options. It allows for high configurability and makes it easy to integrate `era_test_node` into your CI/CD workflows on GitHub Actions.

**Test node repo**: [matter-labs/era-test-node](https://github.com/matter-labs/era-test-node).

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

The network to use (e.g., `mainnet`, `testnet`) and **should only be used** alongside `fork`.

- **Required**: No

### `forkAtHeight`

The block height to fork at. Needs to be used alongside `fork`.

- **Required**: No

### `port`

Port to listen on.

- **Required**: No
- **Default**: `8011`

### `showCalls`

Show call debug information. 

- **Required**: No
- **Default**: `none`
- **Options**: `none`, `user`, `system`, `all`

### `showStorageLogs`

Show storage log information.

- **Required**: No
- **Default**: `none`
- **Options**: `none`, `read`, `write`, `all`

### `showVmDetails`

Show VM details information.

- **Required**: No
- **Default**: `none`
- **Options**: `none`, `all`

### `showGasDetails`

Show Gas details information.

- **Required**: No
- **Default**: `none`
- **Options**: `none`, `all`

### `resolveHashes`

Enable hash resolution.

- **Required**: No
- **Default**: `false`

### `log`

Log filter level.

- **Required**: No
- **Default**: `info`
- **Options**:  `debug`, `info`, `warn`, `error`

### `logFilePath`

Log file path.

- **Required**: No
- **Default**: `era_test_node.log`

### `target`

Target architecture.

- **Required**: No
- **Default**: `x86_64-unknown-linux-gnu`
- **Options**: `x86_64-unknown-linux-gnu`, `x86_64-apple-darwin`, `aarch64-apple-darwin`

### `version`

Version of `era_test_node` to use.

- **Required**: No
- **Default**: `v0.1.0-alpha.3`

## Example Usage 📝

### Quickstart

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
```

### Command options

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
        version: 'latest'
```

### Upload log file to artifacts

```yml
name: Run Era Test Node Action

on:
  pull_request:
    branches: [main]
  workflow_dispatch:
jobs:
  test:
    name: unit-tests
    strategy:
      matrix:
        platform: [ubuntu-latest]
    runs-on: ${{ matrix.platform }}

    steps:
    - name: Checkout Code
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
        version: 'latest'

    - name: Install Dependencies
      run: yarn install
    
    - name: Run Tests
      run: |
        yarn test:contracts

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
        version: 'latest'
```

## Contributing 🤝

Feel free to open issues or PRs if you find any problems or have suggestions for improvements. Your contributions are more than welcome!

## License 📄

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details.