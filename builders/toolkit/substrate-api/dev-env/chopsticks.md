---
title: How to use Chopsticks to Fork Your Network
description: Learn the basics of how to use Chopsticks to replay blocks, dissect state changes, test XCM interactions, and create a local fork of your Tanssi network.
icon: octicons-code-square-24
---

# How to Use Chopsticks to Fork Your Network

## Introduction {: #introduction }

[Chopsticks](https://github.com/AcalaNetwork/chopsticks){target=\_blank} provides a developer-friendly method of locally forking existing [Substrate-based](/learn/framework/overview/){target=\_blank} chains. It allows for the replaying of blocks to easily examine how transactions affect the state, the forking of multiple Tanssi networks for XCM testing, and more. This empowers developers to test and experiment with their custom blockchain configurations in a local development environment without deploying a live network.

Overall, Chopsticks aims to simplify the process of building blockchain applications on Substrate and make it accessible to a wider range of developers.

This article will cover using Chopsticks to fork and interact with the local copy of a Tanssi network.

!!! note
    Chopsticks currently does not support calls done via the Ethereum JSON-RPC. Consequently, you can't fork your chain using Chopsticks and connect Metamask to it.

## Prerequisites {: #prerequisites }

To follow along with this tutorial, you will need to clone the repository along with its submodules([Smoldot](https://github.com/smol-dot/smoldot.git){target=\_blank}):

```bash
git clone --recurse-submodules https://github.com/AcalaNetwork/chopsticks.git
```

Then, get into the folder and install the dependencies using [yarn](https://classic.yarnpkg.com/en/docs/install){target=\_blank}:

```bash
 cd chopsticks && yarn
```

Finally, build the project:

```bash
yarn build-wasm
```

Now the development environment is ready to start testing and debugging Tanssi-deployed networks.

## Forking a Demo EVM Network with Chopsticks {: #forking-demo-chain }

To fork a Tanssi network using Chopsticks, execute the command with only the RPC endpoint as a parameter:

```bash
yarn start --endpoint wss://dancebox-3001.tanssi-api.network
```

This command will start a local clone of the chain as it was in the latest block.

--8<-- 'code/builders/toolkit/substrate-api/dev-env/chopsticks/chopsticks-1.md'

Typically, the configuration parameters are stored in a configuration file, as are the configurations in the repository's `configs` folder for the relay chains and parachains deployed in the Dotsama ecosystem. The following configuration file works for the [demo EVM network](/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank}, overriding the chain's sudo account with Alith's and additionally funding the account with tokens:

```yaml
endpoint: wss://dancebox-3001.tanssi-api.network
mock-signature-host: true
allow-unresolved-imports: true
db: ./tmp/db_ftrcon.sqlite

import-storage:
  System:
    Account:
      - - - "0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac" # Alith
        - providers: 1
          sufficients: 1
          consumers: 1
          data:
            free: "100000000000000000000000"
  Sudo:
    Key: "0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac"
```

The configuration file accepts all of the following parameters:

|           Option           |                                                 Description                                                  |
|:--------------------------:|:------------------------------------------------------------------------------------------------------------:|
|         `genesis`          |          The link to a parachain's raw genesis file to build the fork from, instead of an endpoint.          |
|        `timestamp`         |                                     Timestamp of the block to fork from.                                     |
|         `endpoint`         |                                    The endpoint of the parachain to fork.                                    |
|          `block`           |                       Use to specify at which block hash or number to replay the fork.                       |
|      `wasm-override`       |              Path of the Wasm to use as the parachain runtime instead of an endpoint's runtime.              |
|            `db`            |               Path to the name of the file that stores or will store the parachain's database.               |
|          `config`          |                                       Path or URL of the config file.                                        |
|           `port`           |                                      The port to expose an endpoint on.                                      |
|     `build-block-mode`     |                       How blocks should be built in the fork: batch, manual, instant.                        |
|      `import-storage`      |              A pre-defined JSON/YAML storage file path to override in the parachain's storage.               |
| `allow-unresolved-imports` |              Whether to allow Wasm unresolved imports when using a Wasm to build the parachain.              |
|           `html`           |                           Include to generate storage diff preview between blocks.                           |
|   `mock-signature-host`    | Mock signature host so that any signature starts with `0xdeadbeef` and filled by `0xcd` is considered valid. |

You can run the command `yarn start` to fork chains by specifying a local configuration file. Alternatively, the name or the GitHub URL can be used if the chain is listed in the repository's `configs` folder.

=== "Local File Path"

    ```bash
    yarn start --config=configs/polkadot.yml
    ```

=== "Chain Name"

    ```bash
    yarn start --config=polkadot
    ```

=== "GitHub URL"

    ```bash
    yarn start \
    --config=https://github.com/AcalaNetwork/chopsticks.git/master/configs/polkadot.yml
    ```

All settings (except `genesis` and `timestamp`) can also be passed as flags to configure the environment completely in the command line. For example, the following command forks the demo EVM network at block 100.

```bash
yarn start --endpoint wss://dancebox-3001.tanssi-api.network --block 100
```

### Interacting with a Fork {: #interacting-with-a-fork }

When running a fork, by default, it will be accessible at:

```text
ws://localhost:8000
```

You can interact with the parachain via libraries such as [Polkadot.js](https://github.com/polkadot-js/common){target=\_blank} and its [user interface, Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A8000#/explorer){target=\_blank}.

![Polkadot Js](/images/builders/toolkit/substrate-api/dev-env/chopsticks/chopsticks-1.webp)

You should now be able to interact with the forked chain as you would with the real one.

!!! note
    If your browser cannot connect to the WebSocket endpoint provided by Chopsticks, you might need to allow insecure connections for the Polkadot.js Apps URL. Another solution is to run the [Docker version of Polkadot.js Apps](https://github.com/polkadot-js/apps#docker){target=\_blank}.

## Replaying Blocks {: #replaying-blocks }

If you would like to replay a block and retrieve its information to dissect the effects of an extrinsic, you can use the `yarn start run-block` command. Its following flags are:

|            Flag            |                                      Description                                       |
|:--------------------------:|:--------------------------------------------------------------------------------------:|
|         `endpoint`         |                         The endpoint of the parachain to fork.                         |
|          `block`           |            Use to specify at which block hash or number to replay the fork.            |
|      `wasm-override`       |   Path of the Wasm to use as the parachain runtime instead of an endpoint's runtime.   |
|            `db`            |    Path to the name of the file that stores or will store the parachain's database.    |
|          `config`          |                            Path or URL of the config file.                             |
| `output-path=/[file_path]` |   Use to print out results to a JSON file instead of printing it out in the console.   |
|           `html`           | Include to generate an HTML representation of the storage diff preview between blocks. |
|           `open`           |                        Whether to open the HTML representation.                        |

For example, running the following command will re-run the demo EVM networks's block 1000 and write the storage diff and other data in a `chain-output.json` file:  

```bash
yarn start run-block  \
--endpoint wss://dancebox-3001.tanssi-api.network  \
--output-path=./chain-output.json  \
--block 1000
```

## WebSocket Commands {: #websocket-commands }

Chopstick's internal WebSocket server has special endpoints that allow the manipulation of the local Substrate chain.

These are the methods that can be invoked and their parameters:

???+ function "**dev_newBlock** (options) — Generates one or more new blocks"

    === "Parameters"

        - **options** - `{ "to": number, "count": number }` - a JSON object where `"to"` will create blocks up to a certain value, and `"count"` will increase by a certain number of blocks. Use only one entry at a time within the JSON object

    === "Example"

        ```js
        import { WsProvider } from '@polkadot/api'
        const ws = new WsProvider(`ws://localhost:8000`)
        // Creates five new blocks
        await ws.send('dev_newBlock', [{ count: 5 }])
        ```

??? function "**dev_setStorage** (values, blockHash) — Creates or overwrites the value of any storage"

    === "Parameters"

         - **values** - Object - a JSON object resembling the path to a storage value, similar to what you would retrieve via Polkadot.js  
        - **blockHash** - String - optional, the block hash at which the storage value is changed  
        
    === "Example"

        ```js
        import { WsProvider } from '@polkadot/api';
        const ws = new WsProvider(`ws://localhost:8000`);
        // Overwrites the sudo key
        await ws.send('dev_setStorage', 
            [{"Sudo": { "Key": "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b" }}]
        );
        ```

??? function "**dev_timeTravel** (date) — Sets the timestamp of the block to the date value"

    === "Parameters"

         - **date** - Date - a string compatible with the JavaScript Date library that will change the timestamp at which the next blocks being created will be. All future blocks will be sequentially created after that point in time  

    === "Example"

        ```js
        import { WsProvider } from '@polkadot/api';
        const ws = new WsProvider(`ws://localhost:8000`);
        // Sets the timestamp of the block to 15th August 2030
        await ws.send('dev_timeTravel', ["2030-08-15T00:00:00"]);
        ```

??? function "**dev_setHead** (hashOrNumber) — Sets the head of the blockchain to a specific hash or number"

    === "Parameters"

         - **hashOrNumber** - number | string - if found, the chain head will be set to the block with the block number or block hash of this value
        
    === "Example"

        ```js
        import { WsProvider } from '@polkadot/api';
        const ws = new WsProvider(`ws://localhost:8000`);
        // Sets the head to block number 500
        await ws.send('dev_setHead', [500]);
        ```

--8<-- 'text/_disclaimers/third-party-content.md'
