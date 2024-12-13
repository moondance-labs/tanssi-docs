---
title: Run a Block Producer Using Docker
description: Learn how to set up and run a block producer (aka collator or sequencer) for Tanssi networks using Docker to participate in the protocol and earn rewards.
---

# Run a Block Producer in Tanssi Using Docker

## Introduction {: #introduction }

--8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/intro.md'

In this guide, you'll learn how to spin up a Tanssi block producer to be part of the shared pool of sequencers using [Docker](https://www.docker.com){target=\_blank} on a Linux computer. However, it can be adapted to other operating systems.

--8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/hardware-requirements.md'

## Checking Prerequisites {: #checking-prerequisites }

--8<-- 'text/node-operators/installing-docker.md'

### Pulling the Docker Image {: #pulling-docker-image }

A Docker image is built and published in every release, containing all the necessary dependencies a Tanssi block producer requires and the binary file itself.

A Docker image combines the binary corresponding to the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank}, along with the Tanssi orchestrator specification file.

The following command to pull the Docker image:

```bash
docker pull moondancelabs/tanssi
```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/block-producers/onboarding/run-a-block-producer/block-producer-docker/terminal/pulling-docker-image.md'

### Setup the Data Directory {: #setup-data-directory }

Running a block producer requires syncing with three chains: the relay chain, the Tanssi chain, and the network it has been assigned to.

Run the following command to create the directory where your block producer will store the databases containing blocks and chain states:

```bash
mkdir /var/lib/dancebox
```

Set the folder's ownership to the account that will run the Docker image to ensure writing permission:

```bash
chown INSERT_DOCKER_USER /var/lib/dancebox
```

Or run the following command if you want to run the block producer with the current logged-in user:

```bash
sudo chown -R $(id -u):$(id -g) /var/lib/dancebox
```

!!! note
    The directory is a parameter in the Docker start-up command. If you decide to create the directory elsewhere, update the command accordingly.

### Generate the Node Key {: #generate-node-key }

--8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/generate-node-key-intro.md'

```bash
docker run --network="host" -v "/var/lib/dancebox:/data" \
-u $(id -u ${USER}):$(id -g ${USER}) \
moondancelabs/tanssi key generate-node-key --file /data/node-key
```

--8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/generate-node-key-unsafe-note.md'

## Start-Up Command {: #start-up-command }

To spin up your node, you must run the Docker image with the `docker run` command. 

Note that the command contains three sections, divided by `-- \`:

- **Tanssi protocol section** - it contains the flags to run the Tanssi node
- **Block producer section** - it contains the flags to run the block producer node. It is abstract enough to be dynamically adapted in runtime to the specific chain the node will serve
- **Relay chain section** - contains the flag to run the relay chain node

Name each of the sections with a human-readable name by replacing the `INSERT_YOUR_TANSSI_NODE_NAME`, `INSERT_YOUR_BLOCK_PRODUCER_NODE_NAME`, and `INSERT_YOUR_RELAY_NODE_NAME` tags in the `--name` flags. These names will come in handy for connecting the log entries and metrics with the node that generates them.

--8<-- 'text/node-operators/optimized-binaries-note.md'

=== "Generic"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    moondancelabs/tanssi \
    --8<-- 'code/node-operators/block-producers/onboarding/run-a-block-producer/block-producer-docker/docker-command.md'
    ```

=== "Intel Skylake"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-skylake" \
    moondancelabs/tanssi \
    --8<-- 'code/node-operators/block-producers/onboarding/run-a-block-producer/block-producer-docker/docker-command.md'
    ```
=== "AMD Zen3"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-znver3" \
    moondancelabs/tanssi \
    --8<-- 'code/node-operators/block-producers/onboarding/run-a-block-producer/block-producer-docker/docker-command.md'
    ```

### Run Flags {: #run-flags }

The flags used in the `docker run` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

```bash
docker run -ti moondancelabs/tanssi --help
```

## Syncing Your Node {: #syncing-your-node }

The first time your node spins up, the syncing process displays lots of log information from the node configuration, the relay chain, and the node itself. Some errors are expected to be displayed at the beginning of the process, disappearing once the chain gets synced to the last block.

--8<-- 'code/node-operators/terminal/syncing-process.md'

When the syncing with the relay chain and the Tanssi orchestrator is finished, the node will still need to sync with the network it has been assigned to. The syncing with the chain served by the block producer node will happen every time the block producer is rotated.
