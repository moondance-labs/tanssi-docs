---
title: Appchain Overview
description: Learn the high-level definitions of how a Tanssi Appchain works
---

# Tanssi Appchains Overview {: #appchains-tanssi-overview }

## Introduction {: #introduction }

Appchains deployed through Tanssi as ContainerChains have many [distinct features](/learn/tanssi/overview/#what-tanssi-provides){target=_blank}, such as block production as a service.

However, because Tanssi ContainerChains are built with a [modular framework](/learn/framework/){target=_blank}, they offer many other unique advantages at a runtime level that make them quite extensible. This [unique modularity](/learn/framework/modules/){target=_blank} allows a developer to add functionality directly into the runtime or extend the capabilities of the EVM itself via precompiled contracts. 

For example, by including modules from [Frontier](https://github.com/paritytech/frontier){traget=_blank}, an Appchain can be fully Ethereum-compatible like [Moonbeam](https://moonbeam.network){target=_blank}. 

Furthermore, the framework used at the heart of Appchains deployed through Tanssi provides specific characteristics that developers should know and that they can leverage as well.

This section covers the fundamentals of a Tanssi ContainerChains, from its architecture to some of the core modules and functionalities and the transaction fee mechanism.

## General Architecture {: #general-architecture}

As previously discussed, Appchains deployed through Tanssi (ContainerChains) are customizable blockchains that, among other features, have block production as a service and inherit block finality (consensus) from Polkadot. Consequently, they act as Layer 1 blockchains like Moonbeam, not Layer 2 solutions on top of another Layer 1. Moreover, they can use Polkadot's native interoperability language, called [XCM](https://wiki.polkadot.network/docs/learn-xcm){taget=_blank} to connect to other ecosystem blockchains (parachains) like [Moonbeam](https://moonbeam.network){target=_blank}.

In contrast, each Tanssi Appchain will host its own Data Preservers, which contain full archive nodes of the Tanssi Appchain they are hosted in. Still, they will be incentivized through the data-retrieval-as-a-service provided by Tanssi. These Data Preservers will provide the RPC infrastructure for apps and users interacting with Tanssi and its Appchain.

![Appchain Architecture Overview](/images/learn/appchains/overview/dark-overview-1.png#only-dark)
![Appchain Architecture Overview](/images/learn/appchains/overview/light-overview-1.png#only-light)

For example, a user initiates a transaction when interacting via an application deployed to a Tanssi Appchain. The RPC provider will share the transaction, which sits in the chain's transaction pool, with all network participants. A block producer assigned to that ContainerChain by Tanssi may pick up the transaction and include it in the next ContainerChain block. 

Then, the block producer will share with a Polkadot validator:

- The block itself with the state transitions.
- The storage components in the ContainerChain database that the block is modifying.
- The hashes of the unaffected points in the Merkle tree of the storage.

These components constitute a proof of validity (PoV). 

Next, the PoV is verified by Polkadot validators. Note that Polkadot does not check that the ContainerChain storage is valid but that the state transitions that affect it are. A summary of that verification is then gossiped to other validators for them to verify it and included in the next Polkadot block. Lastly, that Polkadot block is finalized.

The transaction flow process is summarized in the following diagram:

![Path of an Appchain Block in Tanssi & Polkadot](/images/learn/appchains/overview/dark-overview-2.png#only-dark)
![Path of an Appchain Block in Tanssi & Polkadot](/images/learn/appchains/overview/light-overview-2.png#only-light)

## Main Features {: #main-characteristics}

As mentioned in the [Introduction](#introduction), the [framework used for Tanssi Appchains](/learn/framework/){target=_blank} (Substrate) provides some unique characteristics that developers can leverage to fine-tune specific behaviors in their runtime.

This section provides a summary of some of these Tanssi Appchain-specific features.

### Forkless Upgrades {: forkless-upgrades}

### Origins {: #origins}

Generally speaking, all calls in a Tanssi Appchain have an origin. But what is an origin? Developers from the EVM realm might be familiar with the concept of _msg.sender_ in EVM transactions. Origins are to Tanssi Appchains what _msg.sender_ is to an EVM transaction, but supercharged with many extra functionalities.

An origin defines where the call is coming from. In contrast to Ethereum-compatible chains, there can be many origins in Tanssi Appchains. For example, the _msg.sender_ of an EVM transaction is known as a _signed origin_, which means that the call is a transaction that was signed by some on-chain account's private key. This allows the runtime to authenticate the source of the call and, for example, charge transaction fees to the associated account.

However, origins can do much more than represent a private-key/public-key pair. Origins also have different privilege levels. For example, a _signed origin_ can send a transaction that is dispatched by the private-key/public-key pair but should not be able to authorize a runtime upgrade. 

Some of the most common types of origins are:

- **Root** - a system-level origin with the highest privilege level. It can be thought of as a superuser of the chain, which can execute any call
- **Signed** - as mentioned before, the origin of a transaction signed by an on-chain account's private key, which includes the account identifier (address) as the signer
- **None** - a lack of origin. Used in specific actions that must be agreed upon at a runtime level. For example, you can program your runtime so that a transaction with _none_  origin can enact a pre-authorized runtime upgrade, which means that the transaction has no fee associated with it
- **Custom** - developers can also create custom origins for specific use cases. For example, [Moonbeam's on-chain governance](https://docs.moonbeam.network/learn/features/governa_nce/){target=_blank} has specific origins for each type of governance vote, called _tracks_. Consequently, each track can be configured to only execute calls with specific privilege levels. One track is _Root_, whose origin is the _Root_ origin mentioned before, and has a very restrictive configuration for votes to go through. But other tracks have much lower privilege levels to do some less critical network operations
