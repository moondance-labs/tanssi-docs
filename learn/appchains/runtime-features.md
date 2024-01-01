---
title: Core Runtime Features
description: Learn the high-level definitions of how a Tanssi Appchain works
---

# Core Runtime Features {: #core-runtime-features }

## Introduction {: #introduction}

Appchains deployed through Tanssi have [many benefits](/learn/tanssi/overview/#what-tanssi-provides){target=_blank} due to its unique [architecture](/learn/tanssi/overview/#tanssi-architecture){target=_blank}.

Nevertheless, Tanssi Appchains are also unique due to the [framework](/learn/framework/){target=_blank} (Substrate) they are built on top of, which provides some unique characteristics that developers can leverage to fine-tune specific behaviors in their runtime.

This section summarizes some of these Tanssi Appchain core runtime-specific features.

## Origins {: #origins}

Generally speaking, all calls in a Tanssi Appchain have an origin. But what is an origin? Developers from the EVM realm might be familiar with the concept of _msg.sender_ in EVM transactions. Origins are to Tanssi Appchains what _msg.sender_ is to an EVM transaction, but supercharged with many extra functionalities.

An origin defines where the call is coming from. In contrast to Ethereum-compatible chains, there can be many origins in Tanssi Appchains. For example, the _msg.sender_ of an EVM transaction is known as a _signed origin_, which means that the call is a transaction that was signed by some on-chain account's private key. This allows the runtime to authenticate the source of the call and, for example, charge transaction fees to the associated account.

However, origins can do much more than represent a private key/public key pair. Origins also have different privilege levels. For example, a _signed origin_ can send a transaction that is dispatched by the private key/public key pair but should not be able to authorize a runtime upgrade. 

Some of the most common types of origins are:

- **Root** - a system-level origin with the highest privilege level. It can be thought of as a superuser of the chain, which can execute any call
- **Signed** - as mentioned before, the origin of a transaction signed by an on-chain account's private key, which includes the account identifier (address) as the signer
- **None** - a lack of origin. Used in specific actions that must be agreed upon at a runtime level. For example, you can program your runtime so that a transaction with _none_  origin can enact a pre-authorized runtime upgrade, which means that the transaction has no fee associated with it
- **Custom** - developers can also create custom origins for specific use cases. For example, [Moonbeam's on-chain governance](https://docs.moonbeam.network/learn/features/governance/){target=_blank} has specific origins for each type of governance vote, called _tracks_. Consequently, each track can be configured to only execute calls with specific privilege levels. One track is _Root_, whose origin is the _Root_ origin mentioned before, and has a very restrictive configuration for votes to go through. But other tracks have much lower privilege levels to do some less critical network operations

## Transaction Types {: #transaction-types}

Tanssi Appchains have three main types of transactions:

- **Signed Transactions** - include a signed payload requesting to execute some runtime call. Generally, the signature is associated with a private key/public key pair. Depending on the runtime logic, the account associated with the signature pays a transaction fee
- **Unsigned Transactions** - include an unsigned payload requesting to execute some runtime call. Because these transactions are unsigned, there is no account associated with them. Consequently, runtimes need to define specific conditions that prevent network spam or replay attacks because there is no fee mechanism to prevent such malicious behaviors. One example of an unsigned transaction is executing pre-approved actions, like a runtime upgrade
- **Inherent Transactions** - an unsigned transaction that a block producer inserts into a block when initializing its construction. These transactions are part of the block and are not stored in the transaction pool or shared among network participants. In addition, the data inserted through inherent transactions can skip runtime validation, and it might be up to block validators to accept it. One example is the block timestamp. This is injected into the block by an inherent transaction, and Polkadot validators can accept or reject the block based on whether the timestamp is within some acceptable range

## Transaction Execution {: #transaction-execution}

When a user or application submits a signed transaction to a Tanssi Appchain, the transaction is validated at a full-node level using rules defined in the runtime, and then it is queued in a transaction pool. This ensures that only transactions that comply with certain chain-specific conditions are considered to be included in a block.

!!! note
    The most common type of transaction is a signed transaction. Nevertheless, unsigned transactions are also validated before they are queued in the transaction pool.

The valid transaction queue comprises two pools: ready and future. The ready queue contains all transactions that can be included in a new pending block. The future queue is for transactions that don't meet all the criteria to be included now but might become valid. For example, transactions with a future nonce. Invalid transactions are directly rejected.

During the block-building process, a block producer uses a [priority system](https://github.com/paritytech/substrate/blob/fb24fda76d613305ebb2e5728c75362c94b64aa1/frame/transaction-payment/src/lib.rs#L614-L681){target=_blank} through a transaction orchestration module to order transactions for the next block, until the block reaches its maximum capacity. The block building and execution order has the following operations:

- **Initializing a Block** - known as `on_initialize`,  enables you to define runtime logic executed before any other transaction is accounted for. For example, inherent transactions, like the timestamp in the previous example, are commonly executed when initializing a block. Once the initialization logic is completed, the transaction orchestration module verifies the parent hash in the block header and the trie root to ensure the information is correct
- **Transaction Execution** - with the block already initialized, the transaction orchestration module executes each valid transaction according to its priority. The initial state is not cached before the execution, meaning that if one of the transactions fails mid-execution, any state changes committed up to that moment can not be reverted, and the subsequent block will be invalid. Consequently, runtime logic should perform all necessary checks to ensure all valid transactions will succeed
- **Finalizing a Block** - after all queued valid transactions are executed or the block limit is reached, the orchestration module calls into each runtime module the `on_idle` and `on_finalize` functions. These two functions allow the definition of extra business logic that is automatically executed in the block finalization process. After the last `on_finalize` function is called, the orchestration module ensures that the block digest and storage root match what was calculated when the block was initialized

## Forkless Upgrades {: #forkless-upgrades}

Appchains deployed through Tanssi have a thrilling feature: [forkless upgrades](https://docs.substrate.io/maintain/runtime-upgrades/){target=_blank}. Forkless upgrades allow developers to change the state transition function that governs the chain without creating a network fork, as seen on Ethereum multiple times. Furthermore, if the Appchain is set up with an on-chain governance system, upgrades to the network can happen in a truly decentralized and trustless way.

Forkless upgrades are made possible by storing the state transition function as a WebAssembly (WASM) blob in both the Appchain and Polkadot. When a new runtime is scheduled through a function call in the Appchain, Polkadot validates this block, so it is notified and readies itself to validate incoming blocks using the most recent state transition function. Following a specified runtime upgrade delay period, a Tanssi block producer on the Appchain constructs a block that references a Polkadot block, signaling to the Appchain that it can now apply the new runtime. Consequently, this new state transition function is utilized for that specific block. As all infrastructure participants at the Appchain level employ the on-chain WASM blob, every Appchain node operator can validate new blocks using the latest state transition function.

A high-level summary of the runtime upgrade process is shown in the following diagram:

![Runtime Upgrade Process Tanssi Appchains](/images/learn/appchains/overview/dark-overview-3.png#only-dark)
![Runtime Upgrade Process Tanssi Appchains](/images/learn/appchains/overview/light-overview-3.png#only-light)

## SUDO Account {: #sudo-account}

Tanssi Appchains may use a specific module called [SUDO](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/pallet/struct.Pallet.html){target=\_blank}. This module introduces a new type of account, also named _SUDO_, that can execute transactions with the [_Root_ origin](#origins).

Consequently, the SUDO account can perform **any** action that the runtime allows the _Root_ origin to execute. This can include:

- Mint new native Appchain tokens
- Perform [forkless runtime upgrades](#forkless-upgrades)
- Send transactions impersonating other [origin types](#origins). Therefore, SUDO can send transactions on behalf of other users without accessing their private key

_SUDO_ is recommended for TestNets as it allows to swiftly make changes without the need to go through a lengthy on-chain governance process. It is good practice to have _SUDO_ keys stored safely and grant access to _SUDO_ calls via proxy accounts. Nevertheless, having _SUDO_ enabled in a production environment can lead to undesired consequences.

**Understanding the centralization risks of having _SUDO_ in a production environment is key.**