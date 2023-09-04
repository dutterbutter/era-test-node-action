# Use an official Debian as a parent image
FROM debian:bookworm as builder

# Set the working directory
WORKDIR /workspace

# Install Rust and dependencies for rocksDB
RUN apt-get update && \
    apt-get install -y cmake ca-certificates pkg-config libssl-dev clang curl && \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Activate Rust
ENV PATH="/root/.cargo/bin:${PATH}"

# Install era-test-node
RUN cargo install --git https://github.com/matter-labs/era-test-node.git --locked

# Use the same Debian base image
FROM debian:bookworm

# Install dependencies
RUN apt-get update && \
    apt-get install -y libssl-dev ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy the binary and any other resources
COPY --from=builder /root/.cargo/bin/era_test_node /usr/local/bin/era_test_node

# Add a script that will act as an entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Run the entrypoint script by default
ENTRYPOINT ["/entrypoint.sh"]
