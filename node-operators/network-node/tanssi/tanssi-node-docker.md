---
title: Run a Tanssi Node Using Docker
description: Learn how to set up and run a Node for Tanssi network using Docker to provide API endpoints for applications and users.
icon: simple-docker
---

# Run a Tanssi Node Using Docker

## Introduction {: #introduction }

In this guide, you'll learn how to spin up a Tanssi Node using the official image release with [Docker](https://www.docker.com){target=\_blank} on Linux systems. Nodes are crucial for the Tanssi ecosystem as they provide stable API endpoints that applications and users can connect to for chain data and transaction submission.

## Checking Prerequisites {: #checking-prerequisites }

--8<-- 'text/node-operators/installing-docker.md'

### Pull the Docker Image {: #pull-docker-image }

A Docker image is built and published in every release, containing all the necessary dependencies a Tanssi node requires and the binary file itself.

A Docker image combines the binary corresponding to the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank}, along with the Tanssi orchestrator specification file.

The following command to pull the Docker image:

=== "Dancelight"
    ```bash
    docker pull {{ networks.dancelight.operator_docker_image }}
    ```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/terminal/pulling-docker-image.md'

### Set Up the Data Directory {: #set-up-data-directory }

Running an Node requires syncing with the Tanssi chain and storing its state.

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

=== "Dancelight"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancelight.operator_docker_image }} \
    --chain dancelight \
    --base-path /data \
    --name INSERT_YOUR_TANSSI_NODE_NAME \
    --node-key-file /data/node-key \
    --rpc-port 9944 \
    --prometheus-port 9615 \
    --prometheus-external \
    --listen-addr /ip4/0.0.0.0/tcp/30333 \
    --public-addr /ip4/YOUR_IP_ADDRESS/tcp/30333 \
    --state-pruning archive \
    --blocks-pruning archive \
    --database paritydb \
    --unsafe-rpc-external \
    --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'
    ```

### Run Flags {: #run-flags }

The flags used in the `docker run` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

Additionally, these RPC-specific flags are important for your setup:

- `--state-pruning=archive` - Keeps all state data, which is necessary for historical state queries
- `--blocks-pruning=archive` - Keeps all blocks, necessary for historical block data
- `--database=paritydb` - Uses ParityDB as the database backend, which is optimized for RPC node performance
- `--unsafe-rpc-external` - Allows external connections to the RPC server, which is required for an RPC node

You can view all available flags by running:

```bash
docker run -ti --entrypoint /chain-network/tanssi-relay {{ networks.dancelight.operator_docker_image }} --help
```

!!! warning
    The `--unsafe-rpc-external` flag opens your RPC node to external connections. In production environments, you should implement additional security measures like a reverse proxy with rate limiting and authentication.

## Syncing Your Node {: #syncing-your-node }

The first time your node spins up, the syncing process displays lots of log information from the node configuration and the chain blocks being synced. Some errors are expected to be displayed at the beginning of the process, disappearing once the chain gets synced to the last block.

--8<-- 'code/node-operators/terminal/syncing-process.md'

When the syncing process is finished, your Node is ready to serve API requests.

## Testing Your Node {: #testing-your-rpc-node }

After your node is fully synced, you can verify that the RPC endpoint is working correctly by making a simple request. You can use curl to test the connection:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method":"chain_getHeader", "params":[]}' http://localhost:9944
```

If the RPC endpoint is working correctly, you should receive a JSON response containing the latest block header information.
