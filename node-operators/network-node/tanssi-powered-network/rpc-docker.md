---
title: Run an Appchain Node Using Docker
description: Discover how to configure and operate a Tanssi-powered appchain node using Docker, enabling you to host your own RPC endpoint to interact with your appchain.
icon: material-docker
categories: RPC-Data-Preservers
---

# Run an Appchain Node Using Docker

## Introduction {: #introduction }

--8<-- 'text/node-operators/network-node/intro.md'

In this guide, you'll learn how to quickly spin up a Tanssi appchain node using [Docker](https://www.docker.com){target=\_blank} on a Linux computer. However, it can be adapted to other operating systems.

!!! note
    It is not possible to run an RPC node for quick Trial appchains as they run on a private network, and their nodes are, therefore, unreachable for syncing.

## Checking Prerequisites {: #checking-prerequisites }

--8<-- 'text/node-operators/installing-docker.md'

--8<-- 'text/node-operators/network-node/getting-specs-files.md'

--8<-- 'text/node-operators/appchains-docker-data-directory.md'

## Pulling the Docker Image {: #pulling-docker-image }

Two Docker images are built and published as part of the automated deployment process for every release: one for EVM-compatible appchains and the other for Substrate appchains.

These Docker images include all the binary files required to run the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank}. 

Depending on the type of appchain you want to run the node for, pull the corresponding image.

### EVM-Compatible Appchains {: #pulling-evm-docker-image }

If the Tanssi-powered appchain was registered in the dApp choosing the EVM template or uploading a custom specification representing a Tanssi EVM-compatible appchain, then execute the following command to pull the Docker image:

=== "Tanssi MainNet"

    ```bash
    docker pull moondancelabs/container-chain-evm-template
    ```

=== "Dancelight TestNet"

    ```bash
    docker pull moondancelabs/container-chain-evm-template
    ```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/network-node/rpc-docker/terminal/pulling-docker-image.md'

### Simple Substrate Appchains {: #pulling-substrate-docker-image }

If the appchain was registered in the dApp choosing the basic Substrate template or uploading a custom specification file representing a Substrate appchain, then execute the following command to pull the Docker image:

=== "Tanssi MainNet"

    ```bash
    docker pull moondancelabs/container-chain-simple-template
    ```

=== "Dancelight TestNet"

    ```bash
    docker pull moondancelabs/container-chain-simple-template
    ```

The command will download and extract the image and show the status upon execution, showing a similar output as the previous terminal image.

## Start-Up Command {: #start-up-command }

To spin up your node, you must run the Docker image with the `docker run` command. Note that you'll need to modify the following parameters:

- `Appchain specs file` - replace `INSERT_YOUR_APPCHAIN_SPECS_FILE` with your appchain specs file name, downloaded in the [Getting Specifications Files](#getting-specifications-files) step.
--8<-- 'text/node-operators/network-node/bootnode-item.md'

=== "Tanssi MainNet"

    === "EVM-compatible Appchain"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        moondancelabs/container-chain-evm-template \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-mainnet.md'
        ```

    === "Simple Substrate Appchain"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        moondancelabs/container-chain-simple-template \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-mainnet.md'
        ```

=== "Dancelight TestNet"

    === "EVM-compatible Appchain"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        moondancelabs/container-chain-evm-template \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-testnet.md'
        ```

    === "Simple Substrate Appchain"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        moondancelabs/container-chain-simple-template \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-testnet.md'
        ```

!!! note
    Only the historical state of the last 256 finalized blocks are kept in the local database by default. To run a full archive node, you must set the `--state-pruning archive` flag. More information is in the [flags section](#run-flags).

--8<-- 'text/node-operators/network-node/fetching-bootnode-section.md'

### Full Node Example for Demo EVM Appchain {: #example-demo-evm-appchain }

The following example spins up a full archive RPC node for the [demo EVM network](/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank} deployed on Dancelight with an ID of `2001`. This example assumes that the specs files were downloaded and are located in the data folder.

=== "Demo EVM Appchain (Dancelight)"

    ```bash
    docker run --network="host" -v "/var/lib/dancelight-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    moondancelabs/container-chain-evm-template \
    --chain=/data/container-2001-raw-specs.json \
    --rpc-port=9944 \
    --name=demoAppchain \
    --state-pruning=archive \
    --blocks-pruning=archive \
    --database=paritydb \
    --unsafe-rpc-external \
    --bootnodes=/dns4/ukl-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWKDotMgTRpURvoZHsLWP4K9ymhkBByi1EJjMQAnCmqg8E \
    --bootnodes=/dns4/qco-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWB3kqqNhYgGtGbsdtgD18wUoFVeuXVXgWLXTFs91RNgAx \
    -- \
    --chain=/data/dancelight-raw-specs.json \
    --rpc-port=9945 \
    --name=relay \
    --sync=fast \
    --database=paritydb \
    --bootnodes=/dns4/qco-dancelight-boot-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWCekAqk5hv2fZprhqVz8povpUKdJEiHSd3MALVDWNPFzY \
    --bootnodes=/dns4/qco-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWEwhUb3tVR5VhRBEqyH7S5hMpFoGJ9Anf31hGw7gpqoQY \
    --bootnodes=/dns4/ukl-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWPbVtdaGhcuDTTQ8giTUtGTEcUVWRg8SDWGdJEeYeyZcT
    ```

### Run Flags {: #run-flags }

The flags used in the `docker run` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

=== "EVM-compatible Appchain"

    ```bash
    docker run -ti moondancelabs/container-chain-evm-template --help
    ```

=== "Simple Substrate Appchain"

    ```bash
    docker run -ti moondancelabs/container-chain-simple-template --help
    ```

## Syncing Your Node {: #syncing-your-node }

Once your node spins up, the syncing process displays a lot of log information from both the node and the Tanssi appchain. Some errors are expected to be displayed at the beginning of the process, disappearing once the chain gets synced to the last block.

--8<-- 'code/node-operators/terminal/syncing-process.md'

!!! note
    The length of the syncing process is directly proportional to the size of the chain you are syncing to.
