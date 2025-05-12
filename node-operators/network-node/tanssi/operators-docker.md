---
title: Run a Tanssi Node Using Docker
description: Learn how to set up and run a Tanssi node using Docker to host your own RPC endpoints for chain interaction.
icon: simple-docker
---

# Run a Tanssi Node Using Docker

## Introduction {: #introduction }

Running your own Tanssi node allows you to have a dedicated connection to the Tanssi network. This provides you with a secure and private RPC endpoint to interact with the chain management functionality, query blockchain data, and submit transactions to the network.

In this guide, you'll learn how to spin up a Tanssi node using the official image release with [Docker](https://www.docker.com){target=\_blank} on Linux systems.

## Checking Prerequisites {: #checking-prerequisites }

--8<-- 'text/node-operators/installing-docker.md'

### Pull the Docker Image {: #pull-docker-image }

A Docker image is built and published in every release, containing all the necessary dependencies a Tanssi node requires and the binary file itself.

A Docker image combines the binary corresponding to the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank}, along with the Tanssi orchestrator specification file.

The following command to pull the Docker image:

```bash
docker pull {{ networks.dancelight.operator_docker_image }}
```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/terminal/pulling-docker-image.md'

### Set Up the Data Directory {: #set-up-data-directory }

Running a Tanssi node requires syncing with the Tanssi chain and storing its state.

Run the following command to create the directory where your node will store the databases containing blocks and chain states:

```bash
mkdir /var/lib/tanssi-data
```

Set the folder's ownership to the account that will run the Docker image to ensure writing permission:

```bash
chown INSERT_DOCKER_USER /var/lib/tanssi-data
```

Or run the following command if you want to run the node with the current logged-in user:

```bash
sudo chown -R $(id -u):$(id -g) /var/lib/tanssi-data
```

!!! note
    The directory is a parameter in the Docker start-up command. If you decide to create the directory elsewhere, update the command accordingly.

### Generate the Node Key {: #generate-node-key }

To generate and store on disk the session keys that will be referenced on the start-up command, run the following command:

```bash
docker run --network="host" -v "/var/lib/tanssi-data:/data" \
-u $(id -u ${USER}):$(id -g ${USER}) \
{{ networks.dancelight.operator_docker_image }} key generate-node-key --file /data/node-key
```

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

## Start Your Node {: #start-your-node }

To spin up your node, you must run the Docker image with the `docker run` command. 

Replace `INSERT_YOUR_TANSSI_NODE_NAME` with a human-readable name and set `YOUR_IP_ADDRESS` with your public IP address.

--8<-- 'text/node-operators/optimized-binaries-note.md'

=== "Generic"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancelight.operator_docker_image }} \
    --chain=dancelight \
    --base-path=/data \
    --node-key-file=/data/node-key \
    --name=INSERT_YOUR_TANSSI_NODE_NAME \
    --listen-addr=/ip4/0.0.0.0/tcp/30333 \
    --public-addr=/ip4/YOUR_IP_ADDRESS/tcp/30333 \
    --state-pruning=archive \
    --blocks-pruning=archive \
    --database=paritydb \
    --unsafe-rpc-external \
    --rpc-port=9944 \
    --prometheus-port=9615 \
    --prometheus-external \
    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0'
    ```

=== "Intel Skylake"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
    {{ networks.dancelight.operator_docker_image }} \
    --chain=dancelight \
    --base-path=/data \
    --node-key-file=/data/node-key \
    --name=INSERT_YOUR_TANSSI_NODE_NAME \
    --listen-addr=/ip4/0.0.0.0/tcp/30333 \
    --public-addr=/ip4/YOUR_IP_ADDRESS/tcp/30333 \
    --state-pruning=archive \
    --blocks-pruning=archive \
    --database=paritydb \
    --unsafe-rpc-external \
    --rpc-port=9944 \
    --prometheus-port=9615 \
    --prometheus-external \
    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0'
    ```

=== "AMD Zen3"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
    {{ networks.dancelight.operator_docker_image }} \
    --chain=dancelight \
    --base-path=/data \
    --node-key-file=/data/node-key \
    --name=INSERT_YOUR_TANSSI_NODE_NAME \
    --listen-addr=/ip4/0.0.0.0/tcp/30333 \
    --public-addr=/ip4/YOUR_IP_ADDRESS/tcp/30333 \
    --state-pruning=archive \
    --blocks-pruning=archive \
    --database=paritydb \
    --unsafe-rpc-external \
    --rpc-port=9944 \
    --prometheus-port=9615 \
    --prometheus-external \
    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0'
    ```

### Run Flags {: #run-flags }

The flags used in the `docker run` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

For a complete list of available flags and their descriptions:

```bash
docker run -ti --entrypoint /chain-network/tanssi-relay {{ networks.dancelight.operator_docker_image }} --help
```

#### RPC Specific Flags

For RPC nodes that need to be accessed from external machines, ensure these flags are included:

- `--unsafe-rpc-external` - Allows external machines to connect to your RPC endpoint
- `--rpc-cors=all` - (Optional) Configures CORS settings for your RPC endpoint
- `--rpc-methods=safe` - (Optional) Limits RPC methods to only safe ones

!!! warning
    Using `--unsafe-rpc-external` exposes your RPC endpoint to the internet. Consider implementing additional security measures like a firewall or reverse proxy with authentication.

## Syncing Your Node {: #syncing-your-node }

The first time your node spins up, the syncing process displays lots of log information from the node configuration and the chain blocks being synced. Some errors are expected to be displayed at the beginning of the process, disappearing once the chain gets synced to the last block.

--8<-- 'code/node-operators/terminal/syncing-process.md'

When the syncing process is finished, your node is ready to be used as an RPC endpoint.
