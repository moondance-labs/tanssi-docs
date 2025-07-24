---
title: Run a Tanssi Node Using Docker
description: Learn how to set up and run a node for Tanssi network using Docker to provide API endpoints for applications and users.
icon: simple-docker
categories: RPC-Data-Preservers
---

# Run a Tanssi Node Using Docker

## Introduction {: #introduction }

In this guide, you'll learn how to spin up a Tanssi node using the official image release with [Docker](https://www.docker.com){target=\_blank} on Linux systems. Nodes are crucial for the Tanssi ecosystem as they provide stable API endpoints that applications and users can connect to for chain data and transaction submission.

## Checking Prerequisites {: #checking-prerequisites }

--8<-- 'text/node-operators/installing-docker.md'

### Pull the Docker Image {: #pull-docker-image }

For every release, a Docker image is built and published. It contains all the necessary dependencies a Tanssi node requires and the binary file itself.

A Docker image combines the binary corresponding to the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank}, along with the Tanssi orchestrator specification file.

Run the following command to pull the Docker image:

=== "Tanssi MainNet"

    ```bash
    docker pull {{ networks.dancelight.operator_docker_image }}
    ```
    
=== "Dancelight TestNet"
    
    ```bash
    docker pull {{ networks.dancelight.operator_docker_image }}
    ```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/terminal/pulling-docker-image.md'

--8<-- 'text/node-operators/set-up-data-directory.md'

### Generate the Node Key {: #generate-node-key }

To generate and store on disk the session keys that will be referenced in the start-up command, run the following command:

=== "Tanssi MainNet"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancelight.operator_docker_image }} key generate-node-key --file /data/node-key
    ```

=== "Dancelight TestNet"

    ```bash
    docker run --network="host" -v "/var/lib/dancelight-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancelight.operator_docker_image }} key generate-node-key --file /data/node-key
    ```

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

## Start Your Node {: #start-your-node }

To spin up your node, you must run the Docker image with the `docker run` command.

Replace `INSERT_YOUR_TANSSI_NODE_NAME` with a human-readable name and set `INSERT_YOUR_IP_ADDRESS` with your public IP address.

--8<-- 'text/node-operators/optimized-binaries-note.md'

=== "Tanssi MainNet"

    === "Generic"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

=== "Dancelight TestNet"

    === "Generic"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

### Run Flags {: #run-flags }

The flags used in the `docker run` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

- **--state-pruning=archive** - keeps all state data, which is necessary for historical state queries
- **--blocks-pruning=archive** - keeps all blocks, necessary for historical block data
- **--database=paritydb** - uses ParityDB as the database backend, which is optimized for RPC node performance
- **--unsafe-rpc-external** - allows external connections to the RPC server. This is required for the node to be accessible externally, but exposing RPC endpoints carries security risks. Ensure appropriate firewall and security measures are in place (see warning below)

!!! warning
    The `--unsafe-rpc-external` flag opens your RPC node to external connections. In production environments, you should implement additional security measures like a reverse proxy with rate limiting and authentication.

You can view all available flags by running:

=== "Tanssi MainNet"

    ```bash
    docker run -ti {{ networks.dancelight.operator_docker_image }} --help
    ```
    
=== "Dancelight TestNet"
    
    ```bash
    docker run -ti {{ networks.dancelight.operator_docker_image }} --help
    ```

## Syncing Your Node {: #syncing-your-node }

The first time your node spins up, the syncing process displays lots of log information from the node configuration and the chain blocks being synced. Some errors are expected to be displayed at the beginning of the process, disappearing once the chain gets synced to the last block.

--8<-- 'code/node-operators/terminal/syncing-process.md'

When the syncing process is finished, your node is ready to serve API requests.

## Testing Your Node {: #testing-your-rpc-node }

After your node is fully synced, you can verify that the RPC endpoint is working correctly by making a simple request. You can use curl to test the connection:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method":"chain_getHeader", "params":[]}' http://localhost:9944
```

If the RPC endpoint is working correctly, you should receive a JSON response containing the latest block header information.
