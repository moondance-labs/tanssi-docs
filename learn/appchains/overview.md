---
title: Appchain Overview
description: Learn the high-level definitions of how a Tanssi Appchain works, its architecture, and its block production as a service mechanism with deterministic finality.
---

# Tanssi Appchains Overview {: #appchains-tanssi-overview }

## Introduction {: #introduction }

Appchains deployed through Tanssi as ContainerChains have many [distinct features](/learn/tanssi/overview/#what-tanssi-provides){target=\_blank}, such as block production as a service.

However, because Tanssi ContainerChains are built with a [modular framework](/learn/framework/){target=\_blank}, they offer many other unique advantages at a runtime level that make them quite extensible. This [unique modularity](/learn/framework/modules/){target=\_blank} allows a developer to add functionality directly into the runtime or extend the capabilities of the EVM itself via precompiled contracts. 

For example, by including modules from [Frontier](https://github.com/paritytech/frontier){target=\_blank}, which is Substrate's Ethereum compatibility layer, an Appchain can be fully Ethereum-compatible, like [Moonbeam](https://moonbeam.network){target=\_blank}. 

Furthermore, the framework used at the heart of Appchains deployed through Tanssi provides specific characteristics that developers should know and that they can leverage as well.

This section covers the fundamentals of a Tanssi ContainerChain, from its architecture to some of the core modules and functionalities and the transaction fee mechanism.

## General Architecture {: #general-architecture}

As previously discussed, Appchains deployed through Tanssi (ContainerChains) are customizable blockchains that, among other features, have block production as a service and inherit block finality (consensus) from Polkadot. Consequently, they act as Layer 1 blockchains like Moonbeam, not Layer 2 solutions on top of another Layer 1. Moreover, they can use Polkadot's native interoperability language, called [XCM](https://wiki.polkadot.network/docs/learn-xcm){target=\_blank}, to connect to other ecosystem blockchains (parachains), like [Moonbeam](https://moonbeam.network){target=\_blank}.

In contrast, each Tanssi Appchain will host its own Data-Preservers, which contain full archive nodes of the Tanssi Appchain they are hosted in. Still, they will be incentivized through Tanssi's data retrieval as a service. These Data-Preservers will provide the RPC infrastructure for apps and users interacting with Tanssi and its Appchains.

![Appchain Architecture Overview](/images/learn/appchains/overview/dark-overview-1.png#only-dark)
![Appchain Architecture Overview](/images/learn/appchains/overview/light-overview-1.png#only-light)

## Appchain Transaction Flow {: #appchain-transaction}

A transaction submitted to a Tanssi Appchain follows a complex yet seamless path from submission to block inclusion and finalization. The Appchain infrastructure, Tanssi, and the Polkadot relay chain all work together at different levels to ensure that the process happens as quickly as possible, which normally takes under 20 seconds. Remember that a transaction in a Tanssi Appchain reaches deterministic finality. Consequently, once the transaction is final, it becomes irreversible and unchangeable, and the state transition that resulted when executing that transaction is final.

For example, a user initiates a transaction when interacting via an application deployed to a Tanssi Appchain. The RPC provider will share the transaction, which sits in the chain's transaction pool, with all network participants. A block producer assigned by Tanssi to that ContainerChain will eventually pick up the transaction and include it in the next ContainerChain block. 

Then, the block producer will share with a Polkadot validator:

- The block itself with the state transitions
- The storage components in the ContainerChain database that the block is modifying
- The necessary hashes of the unaffected points in the Merkle tree of the storage

These components constitute the proof of validity (PoV). 

Next, the PoV is verified by Polkadot validators. Note that Polkadot does not check that the ContainerChain storage is valid but that the state transitions that affect it are. A summary of that verification is then gossiped to other validators for them to verify it and included in the next Polkadot block. Lastly, that Polkadot block is finalized.

The transaction flow process is summarized in the following diagram:

![Path of an Appchain Block in Tanssi & Polkadot](/images/learn/appchains/overview/dark-overview-2.png#only-dark)
![Path of an Appchain Block in Tanssi & Polkadot](/images/learn/appchains/overview/light-overview-2.png#only-light)

