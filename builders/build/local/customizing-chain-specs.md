---
title: Customizing Chain Specifications
description: The chain specification contains the initial parameters required for launching a new ContainerChain, including the genesis state, token configuration, and more.
---

# Customizing Chain Specifications {: #customizing-chain-specifications } 

## Introduction {: #introduction }

The chain specification refers to a set of parameters and configurations that define the characteristics and behavior of a new Appchain. It defines the initial settings and state that all nodes participating in the network must agree on to reach consensus and produce blocks. Many initial settings cannot be changed after the network is launched without generating a completely different chain.

The specification contains two main sections:

- **The client specification** - includes the network parameters, for example, the boot nodes the client connects with when joining the network
- **The genesis state** - represents the initial state upon which all transactions and state transitions take place. It includes details like the initial registered accounts and their balances, as well as the account with administrator privileges (sudo, if applicable), among other relevant information

This information the chain specification contains can be stored in a Rust file (which can be found in the [templates](/builders/build/templates){target=_blank} included in the Tanssi repository) or in a JSON file.

To deploy a ContainerChain through Tanssi, uploading the JSON chain specification file is required. This article will cover the sections and attributes a chain specification contains and how to obtain the file.

## The Client Specification {: #client-specification }

The client specification contains the configuration of the network and other settings (excluding those related to the runtime state): 

- **Name** - name for the specifications
- **Id** - a unique simple id for the network used to define the storage path in the node
- **Fork Id** - optional parameter for a network fork identifier
- **Chain Type** - a parameter that can be set to define the chain type and display additional information or enable additional features (it can be set to Development, Local, Live, or a custom type)
- **Boot Nodes** - set of boot nodes that will be used when the new node joins the network and syncs
- **Telemetry Endpoints** - an optional list of endpoints to send information and monitor the operation of the network
- **Protocol Id** - a unique name defining the network protocol
- **Relay Chain** - defines the relay chain the ContainerChain interacts with
- **Parachain Id** - sets the parachain id that has been reserved and assigned in the relay chain
- **Code Substitutes** - an emergency feature to replace the runtime when an Appchain is unable to perform a runtime upgrade
- **Properties** - key-value properties that can be customized and are useful to improve the user experience

In the `properties` attribute, the following settings are used by various front-end libraries, including the [Polkadot.js API](/builders/interact/substrate-api/polkadot-js-api){target=_blank}:

- **Token Symbol** - a name for your ContainerChain's own token symbol
- **SS58 Format** - a unique integer that uniquely identifies the accounts in your network with [SS58 encoding](https://docs.substrate.io/reference/address-formats/){target=_blank}. All Substrated-based accounts have the same 32 bytes representation, that are base-58 encoded using this integer, which should be unique between networks
- **Token Decimals** - represent how divisible a token can be, and what is the smallest representation of the token
- **Is Ethereum** - a boolean identifying the network as EVM compatible or not

## The Genesis State {: #genesis-state }

All the collators assigned to the ContainerChain must agree on the initial state so they can execute the incoming extrinsics, arrive at the same results, and finally reach a consensus on the new valid state.

This genesis state will define the starting point of the ContainerChain. It includes an initial value for the elements that the modules included in the runtime need to persist and the initial runtime Wasm code, which is stored on-chain.

For example, in the templates included, the chain specification defines the initial accounts and token balances in the `Balances` module. In addition, the template also has a sudo account (which **should be modified**) for the `Sudo` module, which provides unique priviledges to the given account, and that can be offboarded once an on-chain democracy module is plugged in.

## Generating a JSON Chain Specification File {: #generating-json-chain-specs }

The following commands will build and generate the chain specification for the EVM-compatible template based on the configuration expressed in the `chain_spec.rs`, located in the `*/container-chains/templates/frontier/node/src/chain_spec.rs`. This example can be adapted to any other template or custom runtime.

To build and generate the chain specifications, take the following steps:

1. Clone the Tanssi code hosted on GitHub
```bash
git clone https://github.com/moondance-labs/tanssi
```
2. Step into the project folder
```bash
cd tanssi
```
3. Build the EVM-compatible Appchain template
```bash
cargo build -p container-chain-template-frontier-node --release
```
4. Generate the chain specification
```bash
./target/release/container-chain-template-frontier-node \
    build-spec > chain_spec.json
```

### Editing the JSON Chain Specification File {: #editing-json-chain-specs }

The generated `chain_spec.json` file reflects the parameters set in the Rust chain specifications file. Being a JSON file, it is easy to read and, should any parameter need to be changed, easy to edit. 

For example, the following code snippet shows some of the attributes of the client specifications:

```json
{
    // Set the name for the specification of this network
    "name": "Frontier Container 1000",
    // Set an id for the specifications of this network
    "id": "frontier_container_1000",
    // Network will be live
    "chainType": "Live",
    "bootNodes": [
        // boot nodes will be added automatically during deployment
    ],
    // Optional attribute, defaults to null
    "telemetryEndpoints": null,
    // Set a protocol identifier for this network
    "protocolId": "container-chain-1000",
    // Set properties to define the token and the ethereum compatibility
    "properties": {
        "isEthereum": true,
        "ss58Format": 42,
        "tokenDecimals": 18,
        "tokenSymbol": "UNIT"
    },
    // Set the stagenet relay chain
    "relay_chain": "westend_moonbase_relay_stagenet",
    // Set the parachain id reserved in the relay chain
    "para_id": 3333,
    // No need
    "codeSubstitutes": {},
    "genesis": { 
        ... 
    }
}
```

The other important section of the file is within the `genesis` attribute, which contains the genesis state. In the following JSON snippet, the default values and configuration for some modules are presented as an example: 

```json
{
    ...
    "genesis": {
        "runtime": {
            ...
            // Sets the account that will bear sudo privileges
            "sudo": {
                "key": "0xf24ff3a9cf04c71dbc94d0b566f7a27b94566cac"
            },
            // Sets the initial balances for some accounts
            "balances": {
                "balances": [
                [
                    "0x3cd0a705a2dc65e5b1e1205896baa2be8a07c6e0",
                    1208925819614629174706176
                ],
                [
                    "0x773539d4ac0e786233d90a233654ccee26a613d9",
                    1208925819614629174706176
                ],
                [
                    "0x798d4ba9baf0064ec19eb4f0a1a45785ae9d6dfc",
                    1208925819614629174706176
                ],
                [
                    "0xf24ff3a9cf04c71dbc94d0b566f7a27b94566cac",
                    1208925819614629174706176
                ]
                ]
            },
            // Sets balances for EVM accounts
            "evm": {
                "accounts": {
                "0x1000000000000000000000000000000000000001": {
                    "nonce": "0x1",
                    "balance": "0xd3c21bcecceda1000000",
                    "storage": {},
                    "code": [
                    0
                    ]
                },
                "0x6be02d1d3665660d22ff9624b7be0551ee1ac91b": {
                    "nonce": "0x0",
                    "balance": "0xffffffffffffffffffffffffffffffff",
                    "storage": {},
                    "code": []
                },
                "0xd43593c715fdd31c61141abd04a99fd6822c8558": {
                    "nonce": "0x0",
                    "balance": "0xffffffffffffffffffffffffffffffff",
                    "storage": {},
                    "code": []
                }
                }
            },
        }
    }
    ...
}
```

An example of a non-manually editable attribute is the Wasm runtime (in the genesis state section), which is a hexadecimal representation of a binary blob generated by the compiler. Still, apart from this, most of the properties are easy to edit before launching the network.

## Generating a Raw JSON Chain Specification File {: #generating-raw-specs-file }

One final step before deploying the ContainerChain is converting the JSON specification file to a raw format, which is a compact, less-readable version of the same file, required to initialize a node.

After going through the [steps to generate the JSON chain Specification File](#generating-json-chain-specs) and editing its values, the following command will convert the chain specs file into the required raw format:

```bash
./target/release/container-chain-template-frontier-node \
    build-spec --chain=chain_spec.json --raw > raw_chain_spec.json
```

Now that this file has been configured and customized and is in the correct raw JSON format, it can be uploaded to initialize a new ContainerChain in Tanssi.

