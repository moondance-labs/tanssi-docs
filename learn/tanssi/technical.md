---
title: Technical Features
description: Tanssi is an Appchain protocol that eases the process of deploying Appchains so that developers can focus on their custom logic.
---

# What is Tanssi? {: #what-is-tanssi } 

Tanssi is a protocol that makes deploying blockchains with custom logic specific to certain types of applications a breeze. These customized blockchains are normally referred to as Appchains, but in Tanssi terms, they are also known as Container Chains.

## The Problem

Appchains normally have to deal with the following problems:

- **Complex Infrastructure Management** - Appchain deployments typically demand handling numerous infrastructural components like block producers, validators, wallets, block explorers, indexers, RPC endpoints, and more. This is both time and resource consuming

- **Weak & Inefficient Security** - Appchains commonly suffer from having small or weak validator sets. Early-stage Appchains don't have enough economic guarantees to power a robust consensus mechanism. Moreover, paying for full blockchain capacity is inefficient when only a fraction of it is needed

- **Cross-Chain and Interoperability** - Appchains inherently don't have cross-chain capabilities to connect to other blockchain ecosystems. Furthermore, developing interoperability solutions requires specialized expertise and meticulous implementation

- **Slow Time to Market** - Appchain's infrastructure complexities diver developer focus from application logic, which is the key driver for intuitive interfaces and seamless user experience, which is critical for adoption

## What Tanssi Provides

Tanssi addresses the most common Appchain problems by:

- **Block Production as a Service** - Appchains built with Tanssi will get their block produced by Tanssi incentivized workers (block-producers). Tanssi guarantees Appchain's liveliness and a decentralized set of block-producers

- **Consensus on Demand** - Appchains will inherent block finality (consensus) from Polkadot, either on a continous basis ([Parachain](XXX)), or on a pay-as-you-go model ([Parathread](XXX)). Consequently, Appchains built with Tanssi will have access to a robust consensus mechanism from the genesis block

- **Modular Blockchain Framework** - Appchains built with Tanssi can build using a modular blockchain framework (called [Substrate](https://substrate.io/){target=_blank}) that enables developers to quicky and easily build optimized blockcahins for any use case. Tanssi will handle most infrastructural complexities so that developers can focus on their Appchain custom logic

- **Key Integrations** - Appchains built with Tanssi with have access to key infrastuctural components alongisde block production. Because these Appchains are built with [Substrate](https://substrate.io/){target=_blank}, crucial components like wallets, block explorers, indexers, RPC providers, and others are supported out of the box. Furthermore, Appchains can leverage multiple interoperability protocols to connect to other blockchain ecosystems like Ethereum, Avalance, Binance Smart Chain and more


## Main features

Polkadot is layer 0 blockchain that offers essential services to other chains within the ecosystem, including security, consensus and interoperability/communication, leaving the implementation of specific use cases to the parachains while tackling these common problems:

1. Scalability: Polkadot's sharded model allows for the parallel processing of transactions across multiple parachains, significantly improving scalability and overall network capacity while lowering processing times and fees. 
2. Interoperability: While most blockchain networks operate in isolation, making it difficult for them to communicate and share assets, Polkadot provide native interoperability through XCM (Cross Consensus Message Format), connecting multiple chains facilitating asset transfer capabilities and information exchange.
3. Governance and Upgrades: Polkadot introduces an on-chain governance model, empowering token holders to participate in decision-making and allowing for efficient upgrades and protocol improvements.
4. Security: In smaller blockchain networks, security can be a concern due to lower levels of mining or staking participation. Polkadot’s model of shared security guarantees the same high security level even for the smaller parachain within the ecosystem.
5. Customizability/flexibility: Polkadot's architecture encourages the creation of sovereign blockchains with high specialization, enabling developers to design chains with specific features and functionalities optimized for the unique requeriments of the use case.

The Polkadot Relay Chain serves as the main network that coordinates the overall operation of the platform providing shared security, consensus, and interoperability amongst the connected parachains, to accelerate the development of the web3.

## The technology behind

Polkadot -and the parachains- are built with an open-source blockchain development framework called Substrate, which is bases on Rust programming language.

Substrate makes it easy for teams to develop blockchains, providing pre built core functinalities such as consensus mechanisms, staking & governance, account and assets management, networking and many more ready to use modules and libraries.

The core principles of Substrate are ease of use and performance, allowing teams to create specialized blockchains for any use case, with high level of performance, flexibility, and robustness.