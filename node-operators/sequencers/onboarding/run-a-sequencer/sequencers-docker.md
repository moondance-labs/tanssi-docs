---
title: Run a Sequencer Using Docker
description: Learn how to set up and run a sequencer (aka block producer) for Tanssi-powered appchains using Docker to participate in the protocol and earn rewards.
icon: simple-docker
categories: Sequencers
---

# Run a Sequencer in Tanssi Using Docker

## Introduction {: #introduction }

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/intro.md'

In this guide, you'll learn how to spin up a Tanssi sequencer to be part of the shared pool of sequencers using [Docker](https://www.docker.com){target=\_blank} on a Linux computer. However, it can be adapted to other operating systems.

## Checking Prerequisites {: #checking-prerequisites }

--8<-- 'text/node-operators/installing-docker.md'

## Pulling the Docker Image {: #pulling-docker-image }

A Docker image is built and published in every release, containing all the necessary dependencies a Tanssi sequencer requires and the binary file itself.

A Docker image combines the binary corresponding to the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank}, along with the Tanssi orchestrator specification file.

The following command to pull the Docker image:

=== "Tanssi MainNet"

    ```bash
    docker pull {{ node_versions.docker_sequencer_image_name }}
    ```
    
=== "Dancelight TestNet"
    
    ```bash
    docker pull {{ node_versions.docker_sequencer_image_name }}
    ```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/terminal/pulling-docker-image.md'

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/download-specs.md'

--8<-- 'text/node-operators/appchains-docker-data-directory.md'

## Generate the Node Key {: #generate-node-key }

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-intro.md'

=== "Tanssi MainNet"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ node_versions.docker_sequencer_image_name }} key generate-node-key --file /data/node-key
    ```
    
=== "Dancelight TestNet"
    
    ```bash
    docker run --network="host" -v "/var/lib/dancelight-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ node_versions.docker_sequencer_image_name }} key generate-node-key --file /data/node-key
    ```

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

## Start-Up Command {: #start-up-command }

To spin up your node, you must run the Docker image with the `docker run` command. 

Note that the command contains two sections, divided by `-- \`:

- **Tanssi protocol section** - it contains the flags to run the Tanssi node
- **Sequencer section** - it contains the flags to run the sequencer node. It is abstract enough to be dynamically adapted in runtime to the specific chain the node will serve

Name each of the sections with a human-readable name by replacing the `INSERT_YOUR_TANSSI_NODE_NAME` and `INSERT_YOUR_SEQUENCER_NODE_NAME` tags in the `--name` flags. These names will come in handy for connecting the log entries and metrics with the node that generates them.

--8<-- 'text/node-operators/optimized-binaries-note.md'

=== "Tanssi MainNet"

    === "Generic"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command-mainnet.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node-skylake solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command-mainnet.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node-znver3 solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command-mainnet.md'
        ```

=== "Dancelight TestNet"

    === "Generic"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node-skylake solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node-znver3 solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
        ```

### Run Flags {: #run-flags }

The flags used in the `docker run` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

=== "Tanssi MainNet"

    ```bash
    docker run {{ node_versions.docker_sequencer_image_name }} --help
    ```

=== "Dancelight TestNet"

    ```bash
    docker run {{ node_versions.docker_sequencer_image_name }} --help
    ```

## Syncing Your Node {: #syncing-your-node }

The first time your node spins up, the syncing process displays lots of log information from the node configuration and the node itself. Some errors are expected to be displayed at the beginning of the process, disappearing once the chain gets synced to the last block.

--8<-- 'code/node-operators/terminal/syncing-process.md'

When the syncing with the Tanssi orchestrator is finished, the node will still need to sync with the network it has been assigned to. The syncing with the chain served by the sequencer node will happen every time the sequencer is rotated.
