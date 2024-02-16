---
title: Run an RPC Node Using Docker
description: Learn how to set up and run a Tanssi Appchain node using Docker, which allows you to have your own RPC endpoint to interact with your Appchain.
---

# Run an Appchain Node Using Docker

## Introduction {: #introduction }

Running a Tanssi Appchain node allows you to connect to and interact with the network using your infrastructure via either HTTP or WebSocket protocols. 

Nodes store block data and network state. However, developers can run different kinds of nodes:
 
 - **Full Archive Node** - a node storing the entire block data and network state at all block heights. Such nodes are helpful when querying historical data from old blocks. However, a full archive node takes up a lot of space
 
  - **Full Pruned Node** - a node storing block data and network state up to some specific number of blocks before the current block height. Such nodes are helpful when querying recent data or submitting transactions through your infrastructure. They require much less space than an archival node but don't store the full network state

In this guide, you'll learn how to quickly spin up a Tanssi Appchain node using [Docker](https://www.docker.com/){target=\_blank} on a Linux computer, however, it can be adapted to other operating systems.

!!! note
    It is not possible to run an RPC node for Snap Appchains as they run on a private network, and their nodes are, therefore, unreachable for syncing.

## Checking Prerequisites {: #checking-prerequisites }

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

--8<-- 'code/node-operators/rpc/terminal/hello-world.md'

## The Docker Image {: #the-docker-image }

As part of the automated deployment process, two separate Docker images are built and published, one for EVM-compatible Appchains and another for Substrate Appchains. The images bundle together the binary corresponding to the latest stable release of the [client node](/learn/framework/architecture/#architecture){target=\_blank} along with the [chain specification](/builders/build/customize/customizing-chain-specs/){target=\_blank} file.

The chain specification is generated when registering the Appchain in the DApp using the provided parameters for the selected [template](/learn/tanssi/included-templates/){target=\_blank} or is required to be uploaded manually when choosing the Custom Specs option.

### Pulling the Docker Image for EVM-Compatible Appchains {: #pulling-evm-docker-image }

If the Appchain was registered in the DApp choosing the EVM template or uploading a custom specification representing an EVM-compatible Appchain, then execute the following command to pull the Docker image:

```bash
docker pull moondancelabs/dancebox-container-chain-evm-templates
```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/rpc/terminal/pulling-docker-image.md'

### Pulling the Docker Image for Substrate Appchains {: #pulling-substrate-docker-image }

If the Appchain was registered in the DApp choosing the basic substrate template or uploading a custom specification file representing a Substrate Appchain, then execute the following command to pull the Docker image:

```bash
docker pull moondancelabs/dancebox-container-chain-simple-templates
```

The command will download and extract the image and show the status upon execution, showing a similar output as the previous terminal image.

## Start-Up Command {: #start-up-command }

To spin up your node, you must run the Docker image with the `docker run` command.

The following example spins up an RPC node for the [demo EVM ContainerChain](/builders/tanssi-network/networks/dancebox/demo-evm-containerchain/){target=\_blank} deployed on Dancebox with an id of 3001:

```bash
docker run -ti moondancelabs/dancebox-container-chain-evm-templates \
/chain-network/container-chain-template-frontier-node \
--chain=/chain-network/container-3001-raw-specs.json \
--rpc-port=9944 \
--name=para \
--bootnodes=/dns4/fraa-dancebox-c1-rpc-0.a.dancebox.tanssi.network/tcp/30333/p2p
/12D3KooWHbs1SetugtcwHUYEAN2j1gE2TW8vmqgfcbcELy4x9hqg \
-- \
--chain=/chain-network/relay-raw-no-bootnodes-specs.json \
--database=paritydb \
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

Note that even though the previous command has many parameters, only some of them grouped in the first lines need to be changed to spin up your specific Appchain:

```bash
docker run -ti moondancelabs/dancebox-container-chain-evm-templates \
/chain-network/container-chain-template-TEMPLATE_TYPE-node \
--chain=/chain-network/container-YOUR_APPCHAIN_ID-raw-specs.json \
--bootnodes=INSERT_YOUR_APPCHAIN_BOOTNODE \
...
```

- **TEMPLATE_TYPE** - replace the text with either `frontier` for EVM ContainerChains or `simple` for Substrate ContainerChains
- **YOUR_APPCHAIN_ID** - replace the text with your Appchain identifier, which is obtained in the [third step](/builders/deploy/dapp/#reserve-appchain-id){target=\_blank} of the registration process
- **INSERT_YOUR_APPCHAIN_BOOTNODE** - replace the text with the Tanssi provided bootnode, which can be read from the Tanssi Appchain storage on its [Polkadot.js website](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/chainstate){target=\_blank}. The value must be queried from the `dataPreservers`.`bootnodes` storage unit, using your Appchain Id as the option parameter, as shown in the following image:

    ![Getting the bootnode](/images/node-operators/rpc/rpc-1.webp)

### Run Flags {: #run-flags }

The flags used in the `docker run` command can be adjusted according to your preferences and the hardware configuration, being the following ones some of the most note-worthy:

- **--name** - a human-readable name for this node
- **--rpc-port** - specifies the JSON-RPC TCP port the node listens on
- **--unsafe-rpc-external** - exposes the RPC service on all the interfaces
- **--state-pruning** - specifies when the ContainerChain state should be removed from the database. The `Archive` setting makes the node behave as a full node, keeping all the state
- **--blocks-pruning** -  specifies how many blocks should be kept in the database. The `Archive` setting makes the node behave as a full node, keeping all the blocks
- **--detailed-log-output** - enables detailed log output

For a complete list of available flags, their description, and possible values, run the following command:

```bash
docker run -ti moondancelabs/dancebox-container-chain-evm-templates /chain-network/container-chain-template-frontier-node --help
```

## Syncing Your Node {: #syncing-your-node }

Once your node spins up, the syncing process begins displaying lots of log information from the node configuration, the relay chain, and the node itself. At the beginning of the process, some errors are expected to be displayed, disappearing once the chain gets synced to the last block.

--8<-- 'code/node-operators/rpc/terminal/syncing-process.md'

!!! note
    Depending on how long the chain you are syncing your node to, the process might take as long as a few days.

