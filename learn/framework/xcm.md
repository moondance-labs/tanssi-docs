---
title: Native Cross-Chain Communication
description: Tanssi appchains benefit from XCM, a native cross-chain communication language, which allows fast and secure bridging guaranteed by Polkadot's relay chain.
---

# Native Cross-Chain Communication

## Introduction {: #introduction }

All the Tanssi appchains have an inherent capability to communicate and interoperate with any other appchain in the ecosystem. This native cross-chain communication feature is possible thanks to the unique infrastructure the appchains are built on top of, leveraging the Cross-Consensus Message format (XCM for short), which facilitates communication between different consensus systems.

XCM is a messaging language designed to be generic. It doesn't make any assumptions about the destination chain and can communicate different intentions between sovereign consensus systems.

An XCM message is a program holding one or more instructions that will be relayed for execution to the destination chain. By itself, each XCM instruction is meaningless, but the combination of a specific set of instructions can result in a desired action when the XCM message is executed in the destination chain.

In this article, we cover the basic concepts of the native cross-chain communication mechanism that allows fast and secure bridging within the ecosystem.

## Design Principles {: #design-principles }

Conceived with an abstract mindset, XCM is not designed to comply with a specific use case or specific destination appchain setup, thus minimizing the coupling effect. Its core design principles are:

- **Asynchronous** - similar to sending a postcard -but way faster- the sender will keep performing its duties as usual, without blocking itself or awaiting a response from the destination
- **Absolute** -  messages are guaranteed to be delivered to the intended destination, in order and in a timely fashion
- **Asymmetric** -  messages sent have no response counterpart. Any return values, if required, must be sent back from the destination to the sender with another message
- **Agnostic** -  there are no assumptions whatsoever about the configuration or properties of two communicating appchains. Appchains might differ in every aspect, except the ability to understand XCM. E.g., one chain could be EVM-compatible and not the other, one chain could be a DeFi appchain and the other a gaming appchain, and so on

## Fees {: #fees }

A user executing a transaction on an appchain must pay the fees derived from computational effort associated with the task, and cross-chain execution is no exception to this rule. In cross-chain communication, a message requires execution on at least two different chains, and the user needs to pay for the fees associated with the computational effort made by every chain involved.

For example, if a user on appchain A wants to call a smart contract on appchain B, the user must include instructions in the XCM message to provide an asset that appchain B accepts as payment for its services to cover the associated fees. Once such an asset is provided, the execution can now be bought on the destination chain.

!!! note
    Since appchains are sovereign, they get to decide which tokens are valid for paying their XCM execution fees.
    E.g., if appchain B accepts appchain A tokens for fee payments, any user on appchain A can pay for an XCM message destined for appchain B using only appchain A tokens.

## Common Use Cases {: #common-use-cases }

Many use cases can be addressed by benefiting from the common ground and versatility XCM provides. Two of the most recurrent ones are asset transfers and remote execution.

### Asset Transfers {: #asset-transfer }

Moving digital assets from one appchain to another is essential for creating a more dynamic, efficient, and interconnected blockchain ecosystem. The native cross-chain capability allows two main strategies to transfer assets from one chain to another:

- **Teleport** - teleporting an asset is a simple and efficient mechanism, but it has a major caveat: it requires trust between the parties. In essence, when appchain A wants to send X amount of assets to appchain B, it burns X amount of assets and sends a message to appchain B instructing them to mint exactly X amount of assets, preserving the overall asset balance and concluding the teleport action. In this process, appchain A trusts appchain B not to mint more tokens than what was transferred, and appchain B trusts appchain A to burn the tokens that were transferred
- **Reserve transfer** - A reserve transfer involves the **reserve chain** of an asset, which is the chain where the asset is native (e.g., [Moonbeam](https://moonbeam.network/){target=\_blank} is the reserve chain for the GLMR token). Also, non-reserve appchains hold a **sovereign account** on the reserve chain, a keyless account managed by the respective appchain governor. Thus, when reserve appchain A wants to send X amount of an asset to non-reserve appchain B, it locally transfers the assets to appchain's B sovereign account and, in the same atomic action, it sends an XCM message to appchain B with instructions to mint X amount of a derivative form of the transferred asset. On the other way around, if non-reserve appchain B wants to send X amount of an asset to reserve appchain A, then the steps are: appchain B burns the derived form of the asset locally and sends an XCM message to appchain A, with instructions to transfer the assets from appchain B's sovereign account to appchain's A destination account. Even if the non-reserve appchain mints derived tokens in excess (or doesn't burn tokens when transferring), these tokens will have no real value because they are not backed one-to-one in the reserve chain

The associated fees for executing transfers are typically deducted from the transferred amount, so the recipient receives the intended amount minus the fees.

### Remote Execution {: #remote-execution }

The native interoperability XCM provides allows an appchain to send a message to another triggering some action. For example, If the destination chain is EVM-compatible, appchain A can call a smart contract deployed on appchain B.

As mentioned in the [fees section](#fees), to get any on-chain request executed it is necessary to cover its associated fees. On XCM, remote execution can be bought with two steps:

1. Reserve some assets using the *WithdrawAsset* XCM instruction, which takes funds from the call origin and puts them in a holding register
2. Pay for the on-chain execution, using the *BuyExecution* XCM instruction, which uses the previously withdrawn assets

!!! note
    When an appchain sends an XCM message, its default source on the receiving end is the origin appchain's Sovereign account. The sender appchain can add an XCM instruction called *DescendOrigin* to the message, changing the origin account to match the signing user's account, ensuring execution occurs on behalf of the same entity initiating the XCM message on the source chain, and avoiding a potentially unsafe scenario.

Finally, the execution takes place on the destination chain, calling a smart contract or any other transaction using the XCM instruction called *Transact*.

The general flow for remote execution is represented in the following diagram:

![Remote Execution Flow](/images/learn/framework/xcm/dark-xcm-1.webp#only-dark)
![Remote Execution Flow](/images/learn/framework/xcm/light-xcm-1.webp#only-dark#only-light)

## Establishing Cross-Chain Communication {: #channel-registration }

Before two chains can communicate, a messaging channel must be established. Channels are unidirectional, which means that separate channels are needed to send messages from chain A to chain B and B to A.

For chain A to communicate with chain B, chain A must send an open channel transaction to the relay chain requesting a channel be opened with chain B. Chain B must then accept the request by sending a corresponding XCM message to the relay chain. Only when both chains agree is the channel opened in the next epoch. The same process is required to establish a channel from chain B to chain A.

It is important to note that a channel between an appchain and the relay chain is automatically opened upon appchain registration and onboarding.

![XCM Channel Registration Overview](/images/learn/framework/xcm/dark-xcm-2.webp#only-dark)
![XCM Channel Registration Overview](/images/learn/framework/xcm/light-xcm-2.webp#only-dark#only-light)

Once the channel is established, cross-chain messages can be sent between appchains. For asset transfers, assets will also need to be registered before being transferred.

!!! note
    XCM is a versioned ever-evolving language. When two communicating appchains are using different XCM versions, they must use the latest version supported by the less upgraded side. To find out the latest XCM version an appchain can work with, other appchains can query it and subscribe for updates whenever this changes.

## Message Destinations {: #message-destinations }

To compose meaningful messages in a multichain environment it is necessary to have a precise yet abstract way of referencing resources located in different consensus systems. A concept called *multilocation* is used to serve this purpose and target a specific chain or any of its inner elements, such as an account, an asset, or a smart contract.

XCM's destination elements are organized in a hierarchical architecture, where elements are contained within other components. For example, a smart contract is an element contained within an appchain, and the same can be said for an account or an ERC20 asset. Appchains are contained by the relay chain, which plays a crucial role in the cross-chain messaging process, relaying messages from one appchain to another.

Multilocations are not a universal resource locator. They refer to elements from the sender's perspective and are composed of two components: `parents` and `interior`. Parents is a property that indicates if the route must "move up" in the hierarchy, i.e., from an appchain to the relay chain. Interior is a list of junctions that define how to locate the destination. Here are some examples of multilocations:

- **Appchain A references a smart contract in appchain B** - from the point of view of appchain A, to reach a smart contract in appchain B it is necessary to move up in the hierarchy (to the relay chain) and then descend to appchain B to, once there, reference the smart contract's address. The *multilocation* is therefore defined with a `parents` value set to `1`, which moves up, and two junctions, one defining which appchain should receive the message, and the other defining the H160 address of the smart contract that will be called

![Smart Contract Multilocation Example](/images/learn/framework/xcm/dark-xcm-3.webp#only-dark)
![Smart Contract Multilocation Example](/images/learn/framework/xcm/light-xcm-3.webp#only-light)

- **Appchain A references an account in the relay chain** - from the point of view of appchain A, to reference an account in the relay chain, it is necessary to move up and then reference the account. The *multilocation* is defined with a `parents` value set to `1`, which moves up to the relay chain, and one junction that references the substrate type destination address 

![Account Multilocation Example](/images/learn/framework/xcm/dark-xcm-4.webp#only-dark)
![Account Multilocation Example](/images/learn/framework/xcm/light-xcm-4.webp#only-light)