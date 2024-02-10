---
title: Run an RPC Node Using Docker
description: How to set up and run a ContainerChain node using Docker, so you can have your own RPC endpoint-as-a-backend to support your DApps and interact with your chain.
---

# Run an RPC Node Using Docker

## Introduction {: #introduction }

Running an RPC node on a Tanssi ContainerChain allows you to connect to the network, discover other nodes to synch with through a bootnode, and offer an interaction layer for DApps over the WebSocket protocol.

In this guide, you'll learn how to quickly spin up a ContainerChain node using [Docker](https://www.docker.com/){target=\_blank} on a Linux computer.

!!! note
    It is not possible to run an RPC node for Snap Appchains as they run on a private network, and their nodes are, therefore, unable to reach for synching.

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

## Pulling the Docker Image {: #pulling-docker-image }

As part of the automated deployment process, a Docker image is built for each [template](/learn/tanssi/included-templates/){target=\_blank} and published, bundling together the binary corresponding to the latest release of the [client node](/learn/framework/architecture/#architecture){target=\_blank} along with the [chain specification](/builders/build/customize/customizing-chain-specs/){target=\_blank} file.

The chain specification is generated while registering the Appchain in the DApp, either using the provided parameters for the selected template or as uploaded when choosing the Custom Specs option.

Execute the following command to pull the image that corresponds to the type of your ContainerChain:

=== "EVM Template"

    ```bash
    docker pull moondancelabs/dancebox-container-chain-evm-templates
    ```

=== "Substrate"

    ```bash
    docker pull moondancelabs/dancebox-container-chain-simple-templates
    ```

The command will download and extract the image and show the status upon execution:

--8<-- 'code/node-operators/rpc/terminal/pulling-docker-image.md'

## Start-up Command {: #start-up-command }

To spin up your node, you'll must run the Docker image with the `docker run` command.

The following example spins up an RPC node with the entire history (blocks and state) of the chain for the [demo EVM ContainerChain](/builders/tanssi-network/networks/dancebox/demo-evm-containerchain/){target=\_blank} deployed on Dancebox with an id of 3001:

```bash
docker run -ti moondancelabs/dancebox-container-chain-evm-templates \
    /chain-network/container-chain-template-frontier-node \
    --chain=/chain-network/container-3001-raw-specs.json \
    --bootnodes=/dns4/fraa-dancebox-c1-rpc-0.a.dancebox.tanssi.network/tcp/30333/p2p/12D3KooWHbs1SetugtcwHUYEAN2j1gE2TW8vmqgfcbcELy4x9hqg \
    --database=paritydb \
    --rpc-port=9944 \
    --prometheus-port=9615 \
    --prometheus-external \
    --name=para \
    --listen-addr=/ip4/0.0.0.0/tcp/30333 \
    --state-pruning=archive \
    --blocks-pruning=archive \
    --rpc-cors=all \
    --unsafe-rpc-external \
    --rpc-methods=safe \
    --db-cache=1024 \
    --trie-cache-size=1073741824 \
    --detailed-log-output \
    --rpc-max-connections=400 \
    -- \
    --chain=/chain-network/relay-raw-no-bootnodes-specs.json \
    --database=paritydb \
    --rpc-port=9945 \
    --prometheus-port=9616 \
    --prometheus-external \
    --name=relay \
    --listen-addr=/ip4/0.0.0.0/tcp/30334 \
    --pool-limit=0 \
    --db-cache=128 \
    --state-pruning=2000 \
    --blocks-pruning=2000 \
    --rpc-cors=all \
    --rpc-methods=safe \
    --unsafe-rpc-external \
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

### Run Parameters {: #run-parameters }

The other parameters in the `docker run` command can be adjusted according to your preferences and the hardware configuration:

- **--database** - specifies the database backend to use, having possible values `rocksdb` and `paritydb`
- **--rpc-port** - specifies the JSON-RPC TCP port
- **--prometheus-port** - specifies the [Prometheus](https://prometheus.io/){target=\_blank} TCP Port
- **--prometheus-external** - exposes the Prometheus service on all interfaces
- **--name** - a human-readable name for this node
- **--listen-addr** - choose the interfaces to listen on
- **--state-pruning** - specifies when the ContainerChain state should be removed from the database. The `Archive` setting makes the node behave as a full node, keeping all the state
- **--blocks-pruning** -  specifies how many blocks should be kept in the database. The `Archive` setting makes the node behave as a full node, keeping all the blocks
- **--rpc-cors** - specifies the browser origins allowed to access the HTTP & WS RPC servers
- **--unsafe-rpc-external** - exposes the RPC service on all the interfaces
- **--rpc-methods** - specifies which RPC methods to expose. `unsafe` exposes every RPC method
- **--db-cache** - specifies the memory the database cache can use
- **--trie-cache-size** - specifies the state cache size
- **--detailed-log-output** - enables detailed log output
- **--rpc-max-connections** - specifies the maximum number of RPC server connections

## Synching Your Node {: #synching-your-node }

Once your node spins up, the synching process begins displaying lots of log information from the node configuration, the relay chain, and the node itself. At the beginning of the process, some errors are expected to be displayed, disappearing once the chain gets synched to the last block.

--8<-- 'code/node-operators/rpc/terminal/synching-process.md'

!!! note
    Depending on how long the chain you are synching your node to the process might take as long as a few days.

