FROM debian:bookworm as builder

WORKDIR /workspace

# Install dependencies
RUN apt-get update && \
    apt-get install -y wget libssl-dev ca-certificates tar && \
    rm -rf /var/lib/apt/lists/*

# Install era-test-node
# Fetch the era_test_node binary from the releases and unzip
RUN wget https://github.com/matter-labs/era-test-node/releases/download/v0.1.0-alpha.2/era_test_node-v0.1.0-alpha.2-x86_64-unknown-linux-gnu.tar.gz && \
    tar -xzf era_test_node-v0.1.0-alpha.2-x86_64-unknown-linux-gnu.tar.gz && \
    mv era_test_node-v0.1.0-alpha.2-x86_64-unknown-linux-gnu/era_test_node /usr/local/bin/era_test_node && \
    rm -rf era_test_node-v0.1.0-alpha.2-x86_64-unknown-linux-gnu.tar.gz era_test_node-v0.1.0-alpha.2-x86_64-unknown-linux-gnu

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
