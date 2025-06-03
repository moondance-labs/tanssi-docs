---
title: Using Substrate API Sidecar
description: Learn how to use Substrate-based REST service with Tanssi-powered networks to access blocks, account balance, compute gas used, and more.
icon: octicons-code-24
---

# Using Substrate API Sidecar

## Introduction {: #introduction }

Substrate API Sidecar allows applications to access blocks, account balance, and other information of Substrate-based blockchains through a REST API. This can be useful for exchanges, wallets or other types of applications that need to keep track of account balance and other state changes on a Tanssi-powered network. This page will describe how to install and run a Substrate API Sidecar for a Tanssi network, and the commonly used API endpoints.

## Installing and Running Substrate API Sidecar {: #installing-and-running-substrate-api-sidecar }

There are multiple ways of installing and running the Substrate API Sidecar. This guide will describe the steps for installing and running it locally through NPM. For running Substrate API Sidecar through Docker, or building and running it from source, please refer to the [Substrate API Sidecar Github Repository](https://github.com/paritytech/substrate-api-sidecar#readme).

--8<-- 'text/_common/general-js-tutorial-check.md'

### Installing the Substrate API Sidecar {: #installing-the-substrate-api-sidecar }

To install the Substrate API Sidecar service locally in the current directory, run this from the command line:

```bash
npm install @substrate/api-sidecar@{{ networks.dancebox.substrate_api_sidecar.stable_version }}
```

!!! note
    If the current folder does not already have a Node.js project structure, you need to manually created the `node_modules` directory by typing `mkdir node_modules`.

Substrate API Sidecar v{{ networks.dancebox.substrate_api_sidecar.stable_version }} is the current stable version that has been tested to work with Tanssi networks. You can verify the installation was successful by typing from the installation directory root:

```bash
node_modules/.bin/substrate-api-sidecar --version
```

## Setting up the Substrate API Sidecar {: #setting-up-the-substrate-api-sidecar }

In the terminal that Sidecar will run, export the environmental variable for the WS endpoint of the network you want to connect to. For example, the WSS endpoint of your Tanssi network. Some examples:

=== "Dancebox"

    ```bash
    export SAS_SUBSTRATE_URL=wss://{{ networks.dancelight.dns_name }}
    ```

=== "Dancebox EVM Network"

    ```bash
    export SAS_SUBSTRATE_URL={{ networks.dancelight.demo_evm_rpc_wss_url }}
    ```

=== "Your Network"

    ```bash
    export SAS_SUBSTRATE_URL=INSERT_NETWORK_WSS_ENDPOINT
    ```

After setting the environmental variable, you can use the `echo` command to check that the environmental variable has been set correctly, by typing:

```bash
echo $SAS_SUBSTRATE_URL
```

And it should display the network endpoint you have just set.

## Running Substrate API Sidecar {: #running-substrate-api-sidecar }

With the network endpoint environmental variable set, and from the installation directory root, run:

```bash
node_modules/.bin/substrate-api-sidecar
```

If the installation and configuration are successful, you should see this output in the console:

![Successful Output](/images/builders/toolkit/substrate-api/libraries/sidecar-api/sidecar-1.webp)

## Substrate API Sidecar Endpoints {: #substrate-api-sidecar-endpoints }

Some of the commonly used Substrate API Sidecar endpoints include:

 - **GET /blocks​/head** — Get the most recently finalized block. The optional parameter `finalized` can be set to `false` to the get the newest known block, which may not be finalized
 - **GET /blocks/head/header** — Get the most recently finalized block header. The optional parameter `finalized` can be set to `false` to the get the newest known block header, which may not be finalized
 - **GET /blocks/{blockId}** — Get a block by its height or hash
 - **GET /accounts/{accountId}/balance-info** — Get balance information for an account
 - **GET /node/version** — Get information about the Substrates node's implementation and versioning
 - **GET /runtime/metadata** — Get the runtime metadata in decoded, JSON form

For a full list of API endpoints available on Substrate API Sidecar, please refer to the [official documentation](https://paritytech.github.io/substrate-api-sidecar/dist).

## Field Mapping in Block JSON Object {: #fields-mapping-in-block-json-object }

Substrate API Sidecar returns blocks as a JSON object. Part of this JSON object is a nesting structure for individual extrinsics processed in a specific block. Each extrinsic calls a specific method of a given module. Generally speaking, for individual extrinsics, the nesting structure is as following:

```text
RESPONSE JSON Block Object:
    |--extrinsics
        |--{extrinsic_number}
            |--method
                |--pallet: "MODULE_NAME"
                |--method: "METHOD_NAME"
            |--signature
            |--nonce
            |--args
                |--transaction
                    |--{transaction_type}
            |--hash
            |--events
                |--{event_number}
                    |--method
                        |--pallet: "MODULE_NAME"
                        |--method: "METHOD_EVENT_NAME"
                    |--data
                        |--0
                        |--1
                        |--2
                        |--3
    ...

```

Consequently, information from specific extrinsics (like balance transfers) can be extracted by knowing the module and method called by the extrinsic.

## EVM Field Mapping in Block JSON Object {: #evm-fields-mapping-in-block-json-object }

For Tanssi EVM networks, the information related to EVM execution of each Tanssi EVM network transaction can be identified by the `method` field under the current extrinsic object, where it is set to:

```text
{extrinsic_number}.method.pallet = "ethereum"
{extrinsic_number}.method.method = "transact"
```

The nesting structure for EVM transactions is as following:

```text
RESPONSE JSON Block Object:
    |--extrinsics
        |--{extrinsic_number}
            |--method
                |--pallet: "ethereum"
                |--method: "transact"
            |--signature
            |--nonce
            |--args
                |--transaction
                    |--{transaction_type}
            |--hash
            |--events
                |--{event_number}
                    |--method
                        |--pallet: "ethereum"
                        |--method: "Executed"
                    |--data
                        |--0
                        |--1
                        |--2
                        |--3
    ...

```

For example, for Substrate transactions, the "Nonce" and "Signature" fields are under:

```text
extrinsics[extrinsic_number]
```

### EVM Transaction Types and Payload {: #transaction-types-and-payload }

Tanssi EVM networks currently support three transaction standards: `legacy`, `eip1559`, and `eip2930`. These correspond to the `transaction type` field in the above JSON object diagram. For each transaction type, the transaction payload contains the following fields:

=== "EIP1559"

    ```text
        ...
        |--eip1559
            |--chainId
            |--nonce
            |--maxPriorityFeePerGas
            |--maxFeePerGas
            |--gasLimit
            |--action
            |--value
            |--input
            |--accessList
            |--oddYParity
            |--r
            |--s
        ...
    ```

=== "Legacy"

    ```text
        ...
        |--legacy
            |--nonce
            |--gasPrice
            |--gasLimit
            |--action
            |--value
            |--input
            |--signature
        ...
    ```

=== "EIP2930"

    ```text
        ...
        |--eip2930
            |--chainId
            |--nonce
            |--gasPrice
            |--gasLimit
            |--action
            |--value
            |--input
            |--accessList
            |--oddYParity
            |--r
            |--s
        ...
    ```

For more information on the new [EIP1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} and [EIP2930](https://eips.ethereum.org/EIPS/eip-2930){target=\_blank} transaction types and what each field means, please refer to the respective official Ethereum proposal specs.

### Transaction Field Mappings {: #transaction-field-mappings }

To obtain the EVM sender address, recipient address, and EVM hash of any EVM transaction type, check the `events` field under the current extrinsic object, and identify the event where the `method` field is set to:

```text
{event_number}.method.pallet: "ethereum"
{event_number}.method.method: "Executed"
```

The EVM field mappings are then summarized as the following:

=== "EIP1559"
    |        EVM Field         |                               Block JSON Field                               |
    |:------------------------:|:----------------------------------------------------------------------------:|
    |         Chain ID         |       `extrinsics[extrinsic_number].args.transaction.eip1559.chainId`        |
    |          Nonce           |        `extrinsics[extrinsic_number].args.transaction.eip1559.nonce`         |
    | Max priority fee per gas | `extrinsics[extrinsic_number].args.transaction.eip1559.maxPriorityFeePerGas` |
    |     Max fee per gas      |     `extrinsics[extrinsic_number].args.transaction.eip1559.maxFeePerGas`     |
    |        Gas limit         |       `extrinsics[extrinsic_number].args.transaction.eip1559.gasLimit`       |
    |       Access list        |      `extrinsics[extrinsic_number].args.transaction.eip1559.accessList`      |
    |        Signature         |    `extrinsics[extrinsic_number].args.transaction.eip1559.oddYParity/r/s`    |
    |      Sender address      |         `extrinsics[extrinsic_number].events[event_number].data[0]`          |
    |    Recipient address     |         `extrinsics[extrinsic_number].events[event_number].data[1]`          |
    |         EVM hash         |         `extrinsics[extrinsic_number].events[event_number].data[2]`          |
    |   EVM execution status   |         `extrinsics[extrinsic_number].events[event_number].data[3]`          |

=== "Legacy"
    |      EVM Field       |                         Block JSON Field                         |
    |:--------------------:|:----------------------------------------------------------------:|
    |        Nonce         |   `extrinsics[extrinsic_number].args.transaction.legacy.nonce`   |
    |      Gas price       | `extrinsics[extrinsic_number].args.transaction.legacy.gasPrice`  |
    |      Gas limit       | `extrinsics[extrinsic_number].args.transaction.legacy.gasLimit`  |
    |        Value         |   `extrinsics[extrinsic_number].args.transaction.legacy.value`   |
    |      Signature       | `extrinsics[extrinsic_number].args.transaction.legacy.signature` |
    |    Sender address    |   `extrinsics[extrinsic_number].events[event_number].data[0]`    |
    |  Recipient address   |   `extrinsics[extrinsic_number].events[event_number].data[1]`    |
    |       EVM hash       |   `extrinsics[extrinsic_number].events[event_number].data[2]`    |
    | EVM execution status |   `extrinsics[extrinsic_number].events[event_number].data[3]`    |

=== "EIP2930"
    |      EVM Field       |                            Block JSON Field                            |
    |:--------------------:|:----------------------------------------------------------------------:|
    |       Chain ID       |    `extrinsics[extrinsic_number].args.transaction.eip2930.chainId`     |
    |        Nonce         |     `extrinsics[extrinsic_number].args.transaction.eip2930.nonce`      |
    |      Gas price       |    `extrinsics[extrinsic_number].args.transaction.eip2930.gasPrice`    |
    |      Gas limit       |    `extrinsics[extrinsic_number].args.transaction.eip2930.gasLimit`    |
    |        Value         |     `extrinsics[extrinsic_number].args.transaction.eip2930.value`      |
    |     Access list      |   `extrinsics[extrinsic_number].args.transaction.eip2930.accessList`   |
    |      Signature       | `extrinsics[extrinsic_number].args.transaction.eip2930.oddYParity/r/s` |
    |    Sender address    |      `extrinsics[extrinsic_number].events[event_number].data[0]`       |
    |  Recipient address   |      `extrinsics[extrinsic_number].events[event_number].data[1]`       |
    |       EVM hash       |      `extrinsics[extrinsic_number].events[event_number].data[2]`       |
    | EVM execution status |      `extrinsics[extrinsic_number].events[event_number].data[3]`       |

For example, for EVM transactions, the "Nonce" and "Signature" fields are under:

```text
extrinsics[extrinsic_number].args.transaction[transaction_type]
```

Consequently, this leaves the "Nonce" and "Signature" for the Substrate-level field `extrinsics[extrinsic_number]` to be `null`.

A successfully executed EVM transaction will return either `succeed: "Stopped"` or `succeed: "Returned"` under the "EVM Execution Status" field.

## Monitor Token Balance Transfers {: #monitor-transfers }

The following code samples will demonstrate how to listen to both native token transfers, sent via Substrate or Ethereum API, and ERC-20 token transfers sent via the Ethereum API, using Substrate API Sidecar. Transfers via the Ethereum API are only applicable to Tanssi EVM networks.

### Native Token Transfers { #native-token-transfers }

Both Tanssi non-EVM networks and EVM networks can perform Substrate-based native token balance transfers.

The following code snippet uses the Axios HTTP client to query the Sidecar endpoint [`/blocks/head`](https://paritytech.github.io/substrate-api-sidecar/dist){target=\_blank} for the latest finalized block, and then decodes the block for the `from`, `to`, `value`, `tx hash` and `transaction status` of native token transfers at both the EVM and Substrate API level.

```typescript
--8<-- 'code/builders/toolkit/substrate-api/libraries/sidecar/sidecar-transfer.ts'
```

### ERC-20 Token Transfers {: #erc-20-token-transfers }

Events emitted by smart contracts such as an ERC-20 token contract deployed on Tanssi EVM networks can be decoded from Sidecar block JSON objects. The nesting structure is as following:

```text
RESPONSE JSON Block Object:
    |--extrinsics
        |--{extrinsic_number}
            |--method
                |--pallet: "ethereum"
                |--method: "transact"
            |--signature:
            |--nonce:
            |--args
                |--transaction
                    |--{transaction_type}
            |--hash
            |--events
                |--{event_number}
                    |--method
                        |--pallet: "evm"
                        |--method: "Log"
                    |--data
                        |--0
                            |-- address
                            |-- topics
                                |--0
                                |--1
                                |--2
					        |-- data
            ...
    ...

```

ERC-20 token transfers will emit the [`Transfer`](https://eips.ethereum.org/EIPS/eip-20){target=\_blank} event which can be decoded as the following:

|     Tx Information      |                           Block JSON Field                            |
|:-----------------------:|:---------------------------------------------------------------------:|
| ERC-20 contract address |  `extrinsics[extrinsic_number].events[event_number].data[0].address`  |
|  Event signature hash   | `extrinsics[extrinsic_number].events[event_number].data[0].topics[0]` |
|     Sender address      | `extrinsics[extrinsic_number].events[event_number].data[0].topics[1]` |
|    Recipient address    | `extrinsics[extrinsic_number].events[event_number].data[0].topics[2]` |
|         Amount          |   `extrinsics[extrinsic_number].events[event_number].data[0].data`    |

Other events emitted by EVM smart contracts can be decoded in a similar fashion, but the content of the topics and data fields will change depending on the definition of the specific event.

!!! note
    The amount transferred is given in accounting for decimals and in hexadecimal format.

## Substrate API Transaction Fees {: #substrate-api-transaction-fees }

For Tanssi non-EVM networks and EVM networks, all the information around fee data for transactions sent via the Substrate API can be extracted from the following block endpoint:

```text
GET /blocks/{blockId}
```

The block endpoints will return data relevant to one or more blocks. You can read more about the block endpoints on the [official Sidecar documentation](https://paritytech.github.io/substrate-api-sidecar/dist/#operations-tag-blocks){target=\_blank}.

Read as a JSON object, for a given `pallet` (module) and `method`, the transaction fee is provided by an associated event with the following extructure:

```text
{event_number}.method.pallet: "transactionPayment"
{event_number}.method.method: "TransactionFeePaid"
```

The relevant nesting structure is as follows:

```text
RESPONSE JSON Block Object:
    ...
    |--number
    |--extrinsics
        |--{extrinsic_number}
            |--method
            |--signature
            |--nonce
            |--args
            |--tip
            |--hash
            |--info
            |--era
            |--events
                |--{event_number}
                    |--method
                        |--pallet: "transactionPayment"
                        |--method: "TransactionFeePaid"
                    |--data
                        |--0
                        |--1
                        |--2
    ...

```

The object mappings are summarized as follows:

|   Tx Information   |                      Block JSON Field                       |
|:------------------:|:-----------------------------------------------------------:|
| Fee paying account | `extrinsics[extrinsic_number].events[event_number].data[0]` |
|  Total fees paid   | `extrinsics[extrinsic_number].events[event_number].data[1]` |
|        Tip         | `extrinsics[extrinsic_number].events[event_number].data[2]` |

Then, the total transaction fee paid for this extrinsic is mapped to the following field of the block JSON object:

```text
extrinsics[extrinsic_number].events[event_number].data[1]
```

## Ethereum API Transaction Fees {: #ethereum-api-transaction-fees }

For Tanssi EVM networks, users could also send funds via the Ethereum API. To calculate the fee incurred on transactions sent via the Ethereum API, the following formula can be used:

=== "EIP-1559"

    ```text
    GasPrice = BaseFee + MaxPriorityFeePerGas < MaxFeePerGas ?
                BaseFee + MaxPriorityFeePerGas : 
                MaxFeePerGas;
    Transaction Fee = (GasPrice * TransactionWeight) / 25000
    ```

=== "Legacy"

    ```text
    Transaction Fee = (GasPrice * TransactionWeight) / 25000
    ```

=== "EIP-2930"

    ```text
    Transaction Fee = (GasPrice * TransactionWeight) / 25000
    ```

The following sections describe in more detail each of the components needed to calculate the transaction fee.

### Base Fee {: #base-fee}

The `BaseFee` is the minimum amount charged to send a transaction and is a value set by the network itself. It was introduced in [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank}. Tanssi EVM networks have a dynamic fee mechanism that aims to replicate the [EIP-1559 fee market mechanism](https://eips.ethereum.org/EIPS/eip-1559#specification){target=\_blank}, where the base fee is adjusted based on block congestion.

For example, for the Tanssi EVM network template the minimum gas price is `1 GWei`.

The `BaseFee` can be directly retrieved from the `baseFeePerGas` storage found in the `baseFee` module (pallet), using the following endpoint:

```text
GET /pallets/baseFee/storage/baseFeePerGas?at={blockId}
```

Read as a JSON object, the relevant nesting structure is as follows:

```text
RESPONSE JSON Storage Object:
    |--at
        |--hash
        |--height
    |--pallet
    |--palletIndex
    |--storageItem
    |--keys
    |--value
```

The relevant data will be stored in the `value` key of the JSON object. This value is a fixed point data type, hence the real value is found by dividing the `value` by the decimals.

### GasPrice, MaxFeePerGas, and MaxPriorityFeePerGas {: #gasprice-maxfeepergas-maxpriorityfeepergas }

The `GasPrice` is used to specify the gas price of legacy transactions prior to [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank}. The `MaxFeePerGas` and `MaxPriorityFeePerGas` were both introduced in EIP-1559 alongside the `BaseFee`. The `MaxFeePerGas` defines the maximum fee permitted to be paid per unit of gas and is the sum of the `BaseFee` and the `MaxPriorityFeePerGas`. The `MaxPriorityFeePerGas` is the maximum priority fee configured by the sender of a transaction that is used to incentive the prioritization of a transaction in a block.

Although Tanssi EVM networks are Ethereum-compatible, they are also Substrate-based chains at their core, and priorities work differently in Substrate than in Ethereum. In Substrate, transactions are not prioritized by gas price. To address this, Tanssi EVM networks uses a modified prioritization system that reprioritizes Substrate transactions using an Ethereum-first solution. A Substrate transaction still goes through the validity process, where it is assigned transaction tags, longevity, and a priority. The original priority is then overwritten with a new priority based on the transaction's fee per gas, which is derived from the transaction's tip and weight. If the transaction is an Ethereum transaction, the priority is set according to the priority fee.

It's important to note that priority is not the sole component responsible for determining the order of transactions in a block. Other components, such as the longevity of a transaction, also play a role in the sorting process.

The values of `GasPrice`, `MaxFeePerGas` and `MaxPriorityFeePerGas` for the applicable transaction types can be read from the block JSON object according to the structure described in [the Sidecar API page](#evm-fields-mapping-in-block-json-object).

The data for an Ethereum transaction in a particular block can be extracted from the following block endpoint:

```text
GET /blocks/{blockId}
```

The paths to the relevant values have also truncated and reproduced below:

=== "EIP1559"
    |      EVM Field       |                               Block JSON Field                               |
    |:--------------------:|:----------------------------------------------------------------------------:|
    |     MaxFeePerGas     |     `extrinsics[extrinsic_number].args.transaction.eip1559.maxFeePerGas`     |
    | MaxPriorityFeePerGas | `extrinsics[extrinsic_number].args.transaction.eip1559.maxPriorityFeePerGas` |

=== "Legacy"
    | EVM Field |                        Block JSON Field                         |
    |:---------:|:---------------------------------------------------------------:|
    | GasPrice  | `extrinsics[extrinsic_number].args.transaction.legacy.gasPrice` |

=== "EIP2930"
    | EVM Field |                         Block JSON Field                         |
    |:---------:|:----------------------------------------------------------------:|
    | GasPrice  | `extrinsics[extrinsic_number].args.transaction.eip2930.gasPrice` |

### Transaction Weight {: #transaction-weight}

`TransactionWeight` is a Substrate mechanism used to measure the execution time a given transaction takes to be executed within a block. For all transactions types, `TransactionWeight` can be retrieved under the event of the relevant extrinsic where the `method` field is set to:

```text
pallet: "system", method: "ExtrinsicSuccess"
```

And then `TransactionWeight` is mapped to the following field of the block JSON object:

```text
extrinsics[extrinsic_number].events[event_number].data[0].weight
```

--8<-- 'text/_disclaimers/third-party-content.md'
