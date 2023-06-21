---
title: Overview
description: Substrate is a powerful blockchain development framework that provides many ready to use functionalities allowing product teams to quickly and easily build AppChains.
---

# Overview {: #overview } 

## Building an AppChain from scratch {: #building-an-appchain-from-scratch } 

Building an AppChain from scratch is a very complex task that requires deep knowledge in a wide range of areas, including -but not limited to-:

- **Consensus Algorithms** - Consensus ensures that all participants in the blockchain network agree on the validity of transactions. Some popular consensus mechanisms include Proof of Work (PoW) and Proof of Stake (PoS)

- **Cryptography** - Cryptography plays a crucial role in securing the blockchain. You'll need cryptographic algorithms for tasks like creating digital signatures, verifying transactions, and encrypting data

- **Distributed Network** - A network architecture to enable nodes to communicate, validate transactions, and synchronize the blockchain data is key to maintain a shared ledged in a descentralized network

- **Data Structure** - Besides the list of blocks, where each block contains a set of transactions along with a reference to the previous block, Merkle trees are widely used to store the state of the network

- **Governance** - Define how decisions are made, how upgrades or modifications are implemented, and how conflicts are resolved within the network

Fortunately, there is no need to write your own implementations of these blockchain components for there is an awesome open source framework called [Substrate](https://substrate.io/){target=_blank}.

## Substrate Framework {: #substrate-framework}

Substrate is a flexible, modular and highly customizable framework to build Blockchains that is based on [Rust Programming Language](https://www.rust-lang.org){target=_blank}.

When developing an AppChain, Substrate represents a great head start by providing a ready to use set of implementations of the main building blocks a project needs: 

- **Consensus Algorithms** - There are multiple built-in consensus engines, such as Aura (Proof of Authority), Babe (Proof of Stake), and Grandpa (block finality)

- **Runtime Modules** - There are many built-in modules that can be selected and configured into your AppChain, such as accounts, balances, staking, governance, identity, and more

- **Networking** - Built-in protocols and libraries for establishing connections, propagating transactions and blocks, synchronizing the blockchain state, and managing network interactions

- **Storage** - Built-in storage mechanisms for efficient data storage and retrieval

- **Transaction Queue** - Built-in transaction queue system that manages transaction validation, prioritization, and inclusion in blocks, ensuring the consistency and integrity of the AppChain's state

- **RPC APIs** - Substrate provides Remote Procedure Call (RPC) APIs that enable external applications to interact with the AppChain querying blockchain data, submitting transactions, and accesssing various functionalities exposed by the runtime

Every feature Substrate offer can be used as is, extended, customized or replaced to meet the specific requirements of use case of the AppChain.

With Tanssi and Substrate, the development and deployment of a new AppChain becomes easier than ever.
