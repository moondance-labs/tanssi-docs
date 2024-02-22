---
title: Run a Block Producer Using Docker
description: Learn how to set up and run a block producer (aka collator or sequencer) for Tanssi Appchains using Docker to participate in the protocol and earn rewards.
---

# Run a Block Producer in Tanssi Using Docker

## Introduction {: #introduction }

The Tanssi protocol manages a set of block producers (aka sequencers or collators). It assigns them to provide block production services to all the active Appchains in the Tanssi ecosystem and the Tanssi orchestrator itself.

The assignment algorithm distributes the available block producers on a per-session basis, assigning them to a random Appchain each time, meaning that they would be producing blocks for the same Appchain only for a relatively short period of time, increasing the overall security of the ecosystem.

Since the block producers will be assigned to serve any Appchain (or the Tanssi orchestrator), the nodes must be run using the Tanssi node binary file, which includes the logic to sync and execute transactions, producing blocks for any active Appchain previously unknown to him.

In this guide, you'll learn how to spin up a Tanssi block producer to be part of the shared pool of sequencers using [Docker](https://www.docker.com/){target=\_blank} on a Linux computer. However, it can be adapted to other operating systems.

## Checking Prerequisites {: #checking-prerequisites }

### Installing Docker {: #installing-docker}

To get started, you'll need access to a computer running a Linux OS and install [Docker](https://docs.docker.com/desktop/install/linux-install/){target=\blank}.

Run the following command to install Docker on a Linux Ubuntu platform:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

And the following command to check the installation:

```bash
sudo docker run hello-world
```
 
This is what a successful execution in the terminal looks like:

--8<-- 'code/node-operators/appchain-node/rpc-docker/terminal/hello-world.md'

### Pulling the Docker Image {: #pulling-docker-image }

A Docker image is built and published in every release, containing all the necessary dependencies a Tanssi block producer requires and the binary file itself.

A Docker image combines the binary corresponding to the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank}, along with the Tanssi orchestrator specification file.

The following command to pull the Docker image:

```bash
docker pull moondancelabs/parachain-dancebox
```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/block-producers/run-a-block-producer/block-producer-docker/terminal/pulling-docker-image.md'

## Start-Up Command {: #start-up-command }

To spin up your node, you must run the Docker image with the `docker run` command. 

```bash
docker run --network="host" -v "/var/lib/dancebox:/data" \
moondancelabs/parachain-dancebox \
/chain-network/tanssi-node \
--chain=/chain-network/dancebox-raw-specs.json \
--rpc-port=9944 \
--name=collator-name \
--base-path=/data/para \
--state-pruning=2000 \
--blocks-pruning=2000 \
--collator \
-- \
--rpc-port=9946 \
--name=collator-name-container \
--base-path=/data/container \
-- \
--name=collator-name-relay \
--chain=/chain-network/westend-raw-specs.json \
--rpc-port=9945 \
--sync=fast \
--base-path=/data/relay \
--state-pruning=2000 \
--blocks-pruning=2000 \
```

### Run Flags {: #run-flags }

The flags used in the `docker run` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/appchain-node/run-flags.md'

```bash
docker run -ti moondancelabs/dancebox-container-chain-evm-templates \
/chain-network/container-chain-template-frontier-node \
--help
```

## Syncing Your Node {: #syncing-your-node }

Once your node spins up, the syncing process displays lots of log information from the node configuration, the relay chain, and the node itself. Some errors are expected to be displayed at the beginning of the process, disappearing once the chain gets synced to the last block.

--8<-- 'code/node-operators/appchain-node/rpc-docker/terminal/syncing-process.md'

!!! note
    Depending on how long the chain you are syncing your node to, the process might take as long as a few days.

