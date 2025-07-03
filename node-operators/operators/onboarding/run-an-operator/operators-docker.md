---
title: Run an Operator Using Docker
description: Learn how to set up and run an operator (aka validator) for Tanssi network using Docker to participate in the protocol, secure networks, and earn rewards.
icon: simple-docker
---

# Run an Operator in Tanssi Using Docker

## Introduction {: #introduction }

--8<-- 'text/node-operators/operators/onboarding/run-an-operator/intro.md'

In this guide, you'll learn how to spin up a Tanssi operator using the official image release with [Docker](https://www.docker.com){target=\_blank} on Linux systems.

## Checking Prerequisites {: #checking-prerequisites }

--8<-- 'text/node-operators/installing-docker.md'

### Pull the Docker Image {: #pull-docker-image }

A Docker image is built and published in every release, containing all the necessary dependencies a Tanssi operator requires and the binary file itself.

A Docker image combines the binary corresponding to the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank}, along with the Tanssi orchestrator specification file.

The following command to pull the Docker image:

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

To generate and store on disk the session keys that will be referenced on the start-up command, run the following command:

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
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

=== "Dancelight TestNet"

    === "Generic"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

### Run Flags {: #run-flags }

The flags used in the `docker run` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

=== "Tanssi MainNet"

    ```bash
    docker run -ti --entrypoint /chain-network/tanssi-relay {{ networks.dancelight.operator_docker_image }} --help
    ```
    
=== "Dancelight TestNet"
    
    ```bash
    docker run -ti --entrypoint /chain-network/tanssi-relay {{ networks.dancelight.operator_docker_image }} --help
    ```

## Syncing Your Node {: #syncing-your-node }

The first time your node spins up, the syncing process displays lots of log information from the node configuration and the chain blocks being synced. Some errors are expected to be displayed at the beginning of the process, disappearing once the chain gets synced to the last block.

--8<-- 'code/node-operators/terminal/syncing-process.md'

When the syncing process is finished, your node is ready for the next steps.
