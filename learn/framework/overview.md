---
title: Appchain Development Framework Overview
description: Substrate is a blockchain development framework built in Rust Programming Language that streamlines and speeds up the process of developing new appchains.
icon: octicons-home-24
---

# Appchain Development Framework Overview {: #appchain-dev-framework-overview }

## Introduction {: #introduction }

Building an appchain from scratch is a very complex task that requires deep knowledge in a wide range of areas, including (but not limited to):

- **Consensus Algorithms** - consensus ensures that all participants in the blockchain network agree on the validity of transactions. Some popular consensus mechanisms include Proof of Work (PoW) and Proof of Stake (PoS)

- **Cryptography** - cryptography plays a crucial role in securing the blockchain. You'll need cryptographic algorithms for tasks like creating digital signatures, verifying transactions, and encrypting data

- **Distributed Network** - a network architecture to enable nodes to communicate, validate transactions, and synchronize the blockchain data is key to maintaining a shared ledger in a decentralized network

- **Data Structures** - besides the list of blocks, where each block contains a set of transactions along with a reference to the previous block, an optimized and performant strategy to store the state of the network is needed

- **Governance** - if the appchain is designed to be permissionless, a voting mechanism is important in order to keep it evolving and reflecting the community will

- **Upgradeability** - it is necessary to clearly define how to upgrade, how modifications are implemented, and how conflicts are resolved within the network

Fortunately, there’s no need to build these blockchain components from scratch, thanks to an excellent open-source framework called [Substrate](https://substrate.io){target=\_blank}. Tanssi itself is built with this framework, leveraging its comprehensive base implementations, modularity, and flexibility to achieve a high level of customization.

## Substrate Framework {: #substrate-framework}

Substrate is an extremely performant, flexible, modular, and highly customizable framework for building blockchains. This framework is the foundation and engine powering many projects across the Web3 ecosystem, including the Tanssi network itself and the appchains deployed through Tanssi.

Many of its great features, such as performance, ease of use, and modularity, result from the programming language chosen for its development. This is where the [Rust Programming Language](#rust-programming-language) shines: It is fast, portable, and provides a wonderful model to handle memory, among other reasons detailed in the [next section](#rust-programming-language).

When developing an appchain, Substrate represents a great head start by providing a ready-to-use set of implementations of the main building blocks a project needs:

- **Consensus Algorithms** - there are multiple built-in consensus engines, such as Aura (Proof of Authority), Babe (Proof of Stake), and Grandpa (block finality), but due to the high degree of customization Substrate offers, teams can always choose to develop their specific consensus to adapt to the use case needs, as the Moonbeam team did with the [Nimbus Parachain Consensus Framework](https://docs.moonbeam.network/learn/features/consensus){target=\_blank}

- **Runtime Modules** - many built-in modules (explained in detail in the [modules](/learn/framework/modules/){target=\_blank} section) can be selected and configured into your appchain, such as accounts, balances, staking, governance, identity, and more

- **Networking** - built-in protocols and libraries for establishing connections, propagating transactions and blocks, synchronizing the blockchain state, and managing network interactions

- **Storage** - built-in storage mechanisms for efficient data storage and retrieval

- **Transaction Queue** - built-in transaction queue system that manages transaction validation, prioritization, and inclusion in blocks, ensuring the consistency and integrity of the appchain's state

- **RPC APIs** - Substrate provides Remote Procedure Call (RPC) APIs that enable external applications to interact with the appchain by querying blockchain data, submitting transactions, and accessing various functionalities exposed by the runtime

Every feature Substrate offers can be used as-is, extended, customized, or replaced to meet the specific requirements of the use case of the appchain.

Substrate streamlines and speeds up the process of developing new appchains. When used in conjunction with Tanssi, which helps in handling the infrastructure and overseeing the deployment, the task of launching a new appchain becomes significantly simpler!

## Rust Programming Language {: #rust-programming-language}

[Rust](https://www.rust-lang.org){target=\_blank} is a programming language that has unique features that have made it the most loved language for the seventh consecutive year, according to [Stack Overflow's annual developer survey](https://survey.stackoverflow.co/2022#section-most-loved-dreaded-and-wanted-programming-scripting-and-markup-languages){target=blank}.

In addition to providing a great experience for developers, Rust excels in many areas:

- **Memory safety** - Rust compiler enforces strict compile-time checks to prevent common programming errors such as null pointer dereferences, buffer overflows, and data races. Additionally, memory is managed through a novel system of ownership (checked by the compiler), which eliminates the necessity for a garbage collector

- **Performance** - Rust achieves performance comparable to that of C and C++ by providing low-level control over system resources and minimizing runtime overhead. It has a zero-cost abstraction principle, similar to "what you don't use, you don't pay for" from C++, meaning that abstractions have no extra overhead

- **Concurrency** - Rust has built-in features that make it easy to write concurrent and parallel code without introducing data races. It provides lightweight threads (tasks) and a powerful ownership model that ensures the safe sharing of data between threads

- **Expressive and safe abstractions** - Rust offers a rich set of modern language features, such as pattern matching, algebraic data types, closures, and type inference, allowing developers to write and read expressive and concise code. The Rust compiler enforces the strong type system, preventing many runtime errors at compile-time

- **Cross-platform compatibility** - Rust is designed to work well on a variety of platforms and architectures. It supports major operating systems like Windows, macOS, and Linux, as well as embedded systems and WebAssembly. This versatility allows developers to write code that can be deployed across different environments

- **Growing ecosystem** - Rust has a rapidly growing ecosystem with a vibrant community and a rich collection of libraries and tools. The official package manager, Cargo, simplifies dependency management, building, and testing

- **Interoperability** - Rust provides seamless interoperability with existing codebases written in C and C++. It has a Foreign Function Interface (FFI) that allows Rust code to interface with code written in other languages, enabling developers to gradually introduce Rust into existing projects, like the Linux kernel
