#!/bin/bash

# Function to log messages
log() {
    local message="$1"
    local current_time=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$current_time] $message"
}

# Default values
MODE='run'
NETWORK='mainnet'
FORK_AT_HEIGHT=''
SHOW_CALLS='false'
RESOLVE_HASHES='false'

# Read command-line arguments
while [ $# -gt 0 ]; do
  case "$1" in
    --mode=*)
      MODE="${1#*=}"
      ;;
    --network=*)
      NETWORK="${1#*=}"
      ;;
    --forkAtHeight=*)
      FORK_AT_HEIGHT="${1#*=}"
      ;;
    --showCalls=*)
      SHOW_CALLS="${1#*=}"
      ;;
    --resolveHashes=*)
      RESOLVE_HASHES="${1#*=}"
      ;;
  esac
  shift
done

log "Starting era_test_node in '$MODE' mode"

# Initialize the command with either 'run' or 'fork'
cmd="era_test_node $MODE"

# Add the network argument for 'fork' mode
[ "$MODE" == "fork" ] && cmd="$cmd $NETWORK"

# Add optional parameters
[ -n "$FORK_AT_HEIGHT" ] && [ "$MODE" == "fork" ] && cmd="$cmd --fork-at $FORK_AT_HEIGHT"
[ "$SHOW_CALLS" == "true" ] && cmd="$cmd --show-calls=user"
[ "$RESOLVE_HASHES" == "true" ] && cmd="$cmd --resolve-hashes"

# Execute the command
eval "$cmd"
