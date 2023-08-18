---
title: Framework Architecture
description: a Substrate node has two main components, the runtime, controlling the state transition of the blockchain, and the client, controlling everything else.
---

# Framework Architecture {: #framework-architecture } 

## Introduction {: #introduction }

Substrate is a software development kit (SDK) for building blockchains. This framework is the foundation and engine powering the Polkadot's relay chain, the parachains (such as the Tanssi network itself), and the ContainerChains deployed through Tanssi. 

Written in the Rust Language and designed with a modular architecture, Substrate is extremely performant, flexible, and highly customizable, making it the best choice for developing blockchains.

In this article, the architecture of a Substrate node is covered.

## Architecture {: #architecture }

The Substrate framework is designed for maximum customizability, providing a fully functional implementation for every important internal aspect of a blockchain. It allows developers to focus on the specifics of the use case and the runtime characteristics and to change any of the default features (should the need arise).

The architecture of a Substrate node contains two main components:

- **Core Client** - handles the communication with the outer world (other nodes, DApps, etc.), and many other internal responsibilities, such as storage and communication
- **Runtime** - implements the custom logic of the Appchain, executes transactions, and manages the state transitions

The end users can interact with the Appchain using the DApps (or directly via the node RPC endpoints) and get data or send transactions, which will remain queued until execution in the runtime.

![Basic substrate node architecture](/images/learn/framework/architecture/architecture-1.png)

## The Core Client {: #core-client }

The core client comprises components responsible for everything in the operation of a node in the network except for what happens in the runtime. 

Some of the main components are: 

- **Networking** - this component handles the communication with the peers in the network (synchronizing blocks, propagating transactions, and so on) and exposes the endpoints that allow DApps to integrate and interact with the Appchain
- **Storage** - this component manages the state storage of the Appchain in a highly efficient key-value database
- **Consensus** - this component ensures that all the participants in the network agree on the state of the blockchain, validating transactions, state transitions, and the resulting blocks

The default configuration of a Substrate node and the built-in implementations of the components are usually the best choice for most use cases. Still, teams are welcome to innovate and change or replace any piece of the node or even write a completely different implementation of the core client, such as [Kagome](https://github.com/soramitsu/kagome#intro){target=_blank} (C++ implementation) and [Gossamer](https://github.com/ChainSafe/gossamer#a-go-implementation-of-the-polkadot-host){target=_blank} (Golang implementation).

## The Runtime {: #runtime }

The runtime plays a crucial role in the operation of the Appchain. It contains the core logic and rules to meet the requirements of the use case the developers are building, and, therefore, it is responsible for validating the transactions and executing the state transitions.

In Substrate architecture, an important decision has been made regarding the format for the runtime: it is compiled to [WebAssembly (Wasm)](https://webassembly.org){target=_blank} byte code. 

The wasm format offers many advantages to a ContainerChain, including:

- **Portability** - the wasm format is platform-independent, meaning that the same binary can be distributed and run in different nodes using different hardware architectures and operating systems
- **Deterministic Execution** - the wasm format ensures deterministic execution of code, which means that the same input will always produce the same output. Determinacy is a critical aspect in blockchains to obtain the same state transitions across every node in the network and reach a consensus
- **Forkless Upgradeability** - Substrate stores the runtime wasm blob on-chain, meaning that the runtime itself becomes part of the state. This design allows upgrading the runtime logic in a forkless way using a transaction

## Client-Runtime Communication {: #client-runtime-communication }

As previously described, the two main components of a Substrate node (the core client and the runtime) have a clear separation of concerns. Beyond the functional responsibilities, at a lower level, their binary representation and execution environments are different: while the node is compiled to be installed and run in a specific platform (be it Linux x64 or any other), the ContainerChain runtime is compiled to a wasm format that is platform-agostic and runs in an isolated execution environment.

 Bearing in mind the separated execution environments, all the communication between the node client and the runtime occurs through a limited and well-defined interface allowing the necessary operations such as: 

- **Executing Transactions** - when a user submits a transaction to the client node, the node passes this transaction to the runtime through the defined API for its execution

- **State Queries** - the client node can query the current state of the blockchain to retrieve information such as account balances, and any other domain-specific data

- **Consensus and Finality** - the client node coordinates consensus and finalization of the blocks, but it is the runtime responsibility to determine the validity of new blocks, validate transactions, and ensure that the consensus rules are followed

- **Event Notifications** - the runtime emits events while executing transactions that the client node can use to keep the external users updated about specific actions or changes in the state

