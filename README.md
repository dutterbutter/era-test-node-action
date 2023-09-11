# Era Test Node Action 🚀

## Description

This GitHub Action runs the `era_test_node` with options. It makes it easy to integrate `era_test_node` into your CI/CD workflows on GitHub Actions.

## Features 🌟

- Supports two modes: `run` and `fork`.
- Allows you to specify which network to use (e.g., `mainnet`, `testnet`).
- Optional fork at a specific block height.
- Show calls based on user type.
- Enable hash resolution.

## Inputs 🛠

### `mode`

Mode to run era_test_node in (`run`, `fork`).

- **Required**: Yes
- **Default**: `run`

### `network`

The network to use (e.g., `mainnet`, `testnet`).

- **Required**: No

### `forkAtHeight`

The block height to fork at.

- **Required**: No

### `showCalls`

User type to show calls for.

- **Required**: No
- **Default**: `false`

### `resolveHashes`

Enable hash resolution.

- **Required**: No
- **Default**: `false`

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
      uses: actions/checkout@v2

    - name: Run Era Test Node
      uses: dutterbutter/era_test_node_action@latest
      with:
        mode: 'run'
        network: 'mainnet'
        forkAtHeight: '1000'
        showCalls: 'true'
        resolveHashes: 'true'
```

## Contributing 🤝

Feel free to open issues or PRs if you find any problems or have suggestions for improvements. Your contributions are more than welcome!

## License 📄

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details.