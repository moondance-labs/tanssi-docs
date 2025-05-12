---
title: Run a Network Node Using Docker
description: Discover how to configure and operate a Tanssi-powered network node using Docker, enabling you to host your own RPC endpoint for interaction with your chain.
icon: material-docker
---

# Run a Network Node Using Docker

## Introduction {: #introduction }

--8<-- 'text/node-operators/network-node/intro.md'

In this guide, you'll learn how to quickly spin up a Tanssi network node using [Docker](https://www.docker.com){target=\_blank} on a Linux computer. However, it can be adapted to other operating systems.

!!! note
    It is not possible to run an RPC node for quick Trial networks as they run on a private network, and their nodes are, therefore, unreachable for syncing.

## Checking Prerequisites {: #checking-prerequisites }

--8<-- 'text/node-operators/installing-docker.md'

### Pulling the Docker Image {: #pulling-docker-image }

A Docker image is built and published as part of the automated deployment process, either for a Tanssi EVM-compatible network or another for a Tanssi Substrate network.

A Docker image combines the binary corresponding to the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank}, along with the [chain specification](/builders/build/customize/customizing-chain-specs/){target=\_blank} file.

The chain specification is generated when registering the network in the [dApp](https://apps.tanssi.network){target=\_blank} using the provided parameters for the selected [template](/learn/decentralized-networks/included-templates/){target=\_blank} or is required to be uploaded manually when choosing the custom specs option.

Luckily, running a node requires the right Docker image configured correctly!

### EVM-Compatible Networks {: #pulling-evm-docker-image }

If the Tanssi network was registered in the dApp choosing the EVM template or uploading a custom specification representing a Tanssi EVM-compatible network, then execute the following command to pull the Docker image:

```bash
docker pull moondancelabs/dancelight-container-chain-evm-templates
```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/network-node/rpc-docker/terminal/pulling-docker-image.md'

### Simple Substrate Networks {: #pulling-substrate-docker-image }

If the network was registered in the dApp choosing the basic Substrate template or uploading a custom specification file representing a Substrate network, then execute the following command to pull the Docker image:

```bash
docker pull moondancelabs/dancelight-container-chain-simple-templates
```

The command will download and extract the image and show the status upon execution, showing a similar output as the previous terminal image.

## Start-Up Command {: #start-up-command }

To spin up your node, you must run the Docker image with the `docker run` command. Note that you'll need to modify the following parameters:

- `Network ID` - replace `YOUR_NETWORK_ID` with your Tanssi network ID within the `--chain` command. This ID was obtained during the [third step of the network deployment process](/builders/deploy/dapp/#reserve-network-id){target=\_blank} and can be retrieved from the dashboard on the [dApp](https://apps.tanssi.network){target=\_blank}. For example, `3001`
--8<-- 'text/node-operators/network-node/bootnode-item.md'

--8<-- 'text/node-operators/optimized-binaries-note.md'

=== "EVM-compatible Network"

    === "Generic"

        ```bash
        docker run -ti moondancelabs/dancelight-container-chain-evm-templates \
        /chain-network/container-chain-frontier-node \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run -ti moondancelabs/dancelight-container-chain-evm-templates \
        /chain-network/container-chain-frontier-node-skylake \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run -ti moondancelabs/dancelight-container-chain-evm-templates \
        /chain-network/container-chain-frontier-node-znver3 \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command.md'
        ```

=== "Simple Substrate Network"

    === "Generic"

        ```bash
        docker run -ti moondancelabs/dancelight-container-chain-simple-templates \
        /chain-network/container-chain-simple-node \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command.md'
        ```

    === "Intel Skylake"
    
        ```bash
        docker run -ti moondancelabs/dancelight-container-chain-simple-templates \
        /chain-network/container-chain-simple-node-skylake \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command.md'
        ```
    
    === "AMD Zen3"
    
        ```bash
        docker run -ti moondancelabs/dancelight-container-chain-simple-templates \
        /chain-network/container-chain-simple-node-znver3 \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command.md'
        ```

!!! note
    Only the historical state of the last 256 finalized blocks are kept in the local database by default. To run a full archive node, you must set the `--state-pruning archive` flag. More information is in the [flags section](#run-flags).

--8<-- 'text/node-operators/network-node/fetching-bootnode-section.md'

### Full Node Example for Demo EVM Network {: #example-demo-evm-network }

The following example spins up a full archive RPC node for the [demo EVM network](/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank} deployed on Dancebox with an ID of `3001`.

```bash
docker run -ti moondancelabs/dancelight-container-chain-evm-templates \
/chain-network/container-chain-frontier-node \
--chain=/chain-network/container-3001-raw-specs.json \
--rpc-port=9944 \
--name=para \
--state-pruning=archive \
--blocks-pruning=archive \
--database=paritydb \
--unsafe-rpc-external \
--bootnodes=/dns4/fraa-dancebox-c1-rpc-0.a.dancebox.tanssi.network/tcp/30333/p2p
/12D3KooWHbs1SetugtcwHUYEAN2j1gE2TW8vmqgfcbcELy4x9hqg \
-- \
--chain=/chain-network/relay-raw-no-bootnodes-specs.json \
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

```bash
docker run -ti moondancelabs/dancelight-container-chain-evm-templates \
/chain-network/container-chain-frontier-node \
--help
```

## Syncing Your Node {: #syncing-your-node }

Once your node spins up, the syncing process displays a lot of log information from both the node and the Tanssi network. Some errors are expected to be displayed at the beginning of the process, disappearing once the chain gets synced to the last block.

--8<-- 'code/node-operators/terminal/syncing-process.md'

!!! note
    The length of the syncing process is directly proportional to the size of the chain you are syncing to.
