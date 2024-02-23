---
title: Run an RPC Node Using Docker
description: Learn how to set up and run a Tanssi Appchain node using Docker, which allows you to have your own RPC endpoint to interact with your Appchain.
---

# Run an Appchain Node Using Docker

## Introduction {: #introduction }

--8<-- 'text/node-operators/appchain-node/intro.md'

In this guide, you'll learn how to quickly spin up a Tanssi Appchain node using [Docker](https://www.docker.com/){target=\_blank} on a Linux computer. However, it can be adapted to other operating systems.

!!! note
    It is not possible to run an RPC node for Snap Appchains as they run on a private network, and their nodes are, therefore, unreachable for syncing.

## Checking Prerequisites {: #checking-prerequisites }

--8<-- 'text/node-operators/installing-docker.md'

### Pulling the Docker Image {: #pulling-docker-image }

A Docker image is built and published as part of the automated deployment process, either for a Tanssi EVM-compatible Appchain or another for a Tanssi Substrate Appchain. 

A Docker image combines the binary corresponding to the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank}, along with the [chain specification](/builders/build/customize/customizing-chain-specs/){target=\_blank} file.

The chain specification is generated when registering the Appchain in the [DApp](https://apps.tanssi.network/){target=\_blank} using the provided parameters for the selected [template](/learn/tanssi/included-templates/){target=\_blank} or is required to be uploaded manually when choosing the custom specs option.

Luckily, running a node requires the right Docker image configured correctly!

### EVM-Compatible Appchains {: #pulling-evm-docker-image }

If the Tanssi Appchain was registered in the DApp, choose the EVM template or upload a custom specification representing a Tanssi EVM-compatible Appchain, then execute the following command to pull the Docker image:

```bash
docker pull moondancelabs/dancebox-container-chain-evm-templates
```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/appchain-node/rpc-docker/terminal/pulling-docker-image.md'

### Simple Substrate Appchains {: #pulling-substrate-docker-image }

If the Appchain was registered in the DApp, choosing the basic Substrate template or uploading a custom specification file representing a Substrate Appchain, then execute the following command to pull the Docker image:

```bash
docker pull moondancelabs/dancebox-container-chain-simple-templates
```

The command will download and extract the image and show the status upon execution, showing a similar output as the previous terminal image.

## Start-Up Command {: #start-up-command }

To spin up your node, you must run the Docker image with the `docker run` command. Note that you'll need to modify the following parameters:

- `Appchain ID` - replace `YOUR_APPCHAIN_ID` with your Tanssi Appchain ID within the `--chain` command. This ID was obtained during the [third step of the appchain deployment process](/builders/deploy/dapp/#reserve-appchain-id){target=\_blank} and can be retrieved from the dashboard on the [dApp](https://apps.tanssi.network/){target=\_blank}. For example, `3001`
--8<-- 'text/node-operators/appchain-node/bootnode-item.md'

=== "EVM-compatible Appchain"

    ```bash
    docker run -ti moondancelabs/dancebox-container-chain-evm-templates \
    /chain-network/container-chain-template-frontier-node \
    --chain=/chain-network/container-YOUR_APPCHAIN_ID-raw-specs.json \
    --rpc-port=9944 \
    --name=para \ 
    --bootnodes=INSERT_YOUR_APPCHAIN_BOOTNODE \
    -- \
    --name=relay \
    --chain=/chain-network/relay-raw-no-bootnodes-specs.json \
    --rpc-port=9945 \
    --sync=fast \
    --bootnodes=/dns4/frag3-stagenet-relay-val-0.g.moondev.network/tcp/30334/p2p/12D3KooWKvtM52fPRSdAnKBsGmST7VHvpKYeoSYuaAv5JDuAvFCc \
    --bootnodes=/dns4/frag3-stagenet-relay-val-1.g.moondev.network/tcp/30334/p2p/12D3KooWQYLjopFtjojRBfTKkLFq2Untq9yG7gBjmAE8xcHFKbyq \
    --bootnodes=/dns4/frag3-stagenet-relay-val-2.g.moondev.network/tcp/30334/p2p/12D3KooWMAtGe8cnVrg3qGmiwNjNaeVrpWaCTj82PGWN7PBx2tth \
    --bootnodes=/dns4/frag3-stagenet-relay-val-3.g.moondev.network/tcp/30334/p2p/12D3KooWLKAf36uqBBug5W5KJhsSnn9JHFCcw8ykMkhQvW7Eus3U \
    --bootnodes=/dns4/vira-stagenet-relay-validator-0.a.moondev.network/tcp/30334/p2p/12D3KooWSVTKUkkD4KBBAQ1QjAALeZdM3R2Kc2w5eFtVxbYZEGKd \
    --bootnodes=/dns4/vira-stagenet-relay-validator-1.a.moondev.network/tcp/30334/p2p/12D3KooWFJoVyvLNpTV97SFqs91HaeoVqfFgRNYtUYJoYVbBweW4 \
    --bootnodes=/dns4/vira-stagenet-relay-validator-2.a.moondev.network/tcp/30334/p2p/12D3KooWP1FA3dq1iBmEBYdQKAe4JNuzvEcgcebxBYMLKpTNirCR \
    --bootnodes=/dns4/vira-stagenet-relay-validator-3.a.moondev.network/tcp/30334/p2p/12D3KooWDaTC6H6W1F4NkbaqK3Ema3jzc2BbhE2tyD3YEf84yNLE \
    ```

=== "Simple Substrate Appchain"
    
    ```bash
    docker run -ti moondancelabs/dancebox-container-chain-evm-templates \
    /chain-network/container-chain-template-simple-node \
    --chain=/chain-network/container-YOUR_APPCHAIN_ID-raw-specs.json \
    --rpc-port=9944 \
    --name=para \
    --bootnodes=INSERT_YOUR_APPCHAIN_BOOTNODE \
    -- \
    --name=relay \
    --chain=/chain-network/relay-raw-no-bootnodes-specs.json \
    --rpc-port=9945 \
    --sync=fast \
    --bootnodes=/dns4/frag3-stagenet-relay-val-0.g.moondev.network/tcp/30334/p2p/12D3KooWKvtM52fPRSdAnKBsGmST7VHvpKYeoSYuaAv5JDuAvFCc \
    --bootnodes=/dns4/frag3-stagenet-relay-val-1.g.moondev.network/tcp/30334/p2p/12D3KooWQYLjopFtjojRBfTKkLFq2Untq9yG7gBjmAE8xcHFKbyq \
    --bootnodes=/dns4/frag3-stagenet-relay-val-2.g.moondev.network/tcp/30334/p2p/12D3KooWMAtGe8cnVrg3qGmiwNjNaeVrpWaCTj82PGWN7PBx2tth \
    --bootnodes=/dns4/frag3-stagenet-relay-val-3.g.moondev.network/tcp/30334/p2p/12D3KooWLKAf36uqBBug5W5KJhsSnn9JHFCcw8ykMkhQvW7Eus3U \
    --bootnodes=/dns4/vira-stagenet-relay-validator-0.a.moondev.network/tcp/30334/p2p/12D3KooWSVTKUkkD4KBBAQ1QjAALeZdM3R2Kc2w5eFtVxbYZEGKd \
    --bootnodes=/dns4/vira-stagenet-relay-validator-1.a.moondev.network/tcp/30334/p2p/12D3KooWFJoVyvLNpTV97SFqs91HaeoVqfFgRNYtUYJoYVbBweW4 \
    --bootnodes=/dns4/vira-stagenet-relay-validator-2.a.moondev.network/tcp/30334/p2p/12D3KooWP1FA3dq1iBmEBYdQKAe4JNuzvEcgcebxBYMLKpTNirCR \
    --bootnodes=/dns4/vira-stagenet-relay-validator-3.a.moondev.network/tcp/30334/p2p/12D3KooWDaTC6H6W1F4NkbaqK3Ema3jzc2BbhE2tyD3YEf84yNLE \
    ```

!!! note
    Only the historical state of the last 256 finalized blocks are kept in the local database by default. To run a full archive node, you must set the `--state-pruning archive` flag. More information is in the [flags section](#run-flags).

--8<-- 'text/node-operators/appchain-node/fetching-bootnode-section.md'

### Full Node Example for Demo EVM Appchain {: #example-demo-evm-appchain }

The following example spins up a full archive RPC node for the [demo EVM Appchain](/builders/tanssi-network/networks/dancebox/demo-evm-containerchain/){target=\_blank} deployed on Dancebox with an ID of `3001`. 

```bash
docker run -ti moondancelabs/dancebox-container-chain-evm-templates \
/chain-network/container-chain-template-frontier-node \
--chain=/chain-network/container-3001-raw-specs.json \
--rpc-port=9944 \
--name=para \
--state-pruning=archive \
--blocks-pruning=archive \
--bootnodes=/dns4/fraa-dancebox-c1-rpc-0.a.dancebox.tanssi.network/tcp/30333/p2p
/12D3KooWHbs1SetugtcwHUYEAN2j1gE2TW8vmqgfcbcELy4x9hqg \
-- \
--chain=/chain-network/relay-raw-no-bootnodes-specs.json \
--rpc-port=9945 \
--name=relay \
--sync=fast \
--bootnodes=/dns4/frag3-stagenet-relay-val-0.g.moondev.network/tcp/30334/p2p/12D3KooWKvtM52fPRSdAnKBsGmST7VHvpKYeoSYuaAv5JDuAvFCc \
--bootnodes=/dns4/frag3-stagenet-relay-val-1.g.moondev.network/tcp/30334/p2p/12D3KooWQYLjopFtjojRBfTKkLFq2Untq9yG7gBjmAE8xcHFKbyq \
--bootnodes=/dns4/frag3-stagenet-relay-val-2.g.moondev.network/tcp/30334/p2p/12D3KooWMAtGe8cnVrg3qGmiwNjNaeVrpWaCTj82PGWN7PBx2tth \
--bootnodes=/dns4/frag3-stagenet-relay-val-3.g.moondev.network/tcp/30334/p2p/12D3KooWLKAf36uqBBug5W5KJhsSnn9JHFCcw8ykMkhQvW7Eus3U \
--bootnodes=/dns4/vira-stagenet-relay-validator-0.a.moondev.network/tcp/30334/p2p/12D3KooWSVTKUkkD4KBBAQ1QjAALeZdM3R2Kc2w5eFtVxbYZEGKd \
--bootnodes=/dns4/vira-stagenet-relay-validator-1.a.moondev.network/tcp/30334/p2p/12D3KooWFJoVyvLNpTV97SFqs91HaeoVqfFgRNYtUYJoYVbBweW4 \
--bootnodes=/dns4/vira-stagenet-relay-validator-2.a.moondev.network/tcp/30334/p2p/12D3KooWP1FA3dq1iBmEBYdQKAe4JNuzvEcgcebxBYMLKpTNirCR \
--bootnodes=/dns4/vira-stagenet-relay-validator-3.a.moondev.network/tcp/30334/p2p/12D3KooWDaTC6H6W1F4NkbaqK3Ema3jzc2BbhE2tyD3YEf84yNLE \
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

--8<-- 'code/node-operators/terminal/syncing-process.md'

!!! note
    The length of the syncing process is directly proportional to the size of the chain you are syncing to.

