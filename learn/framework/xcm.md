---
title: Native Cross-Chain Communication
description: Tanssi appchains benefit from XCM, a native cross-chain communication language, which allows fast and secure bridging guaranteed by Polkadot's relay chain.
---

# Native Cross-Chain Communication

## Introduction {: #introduction }

All the Tanssi appchains have an inherent capability that enables them to communicate and interoperate with any other appchain from the Polkadot ecosystem (be it Tanssi-powered or not). This native cross-chain communication feature is possible thanks to the Polkadot relay chain, which guarantees message delivery, and the XCM (Cross-Consensus Message) format, which provides a lingua franca.

XCM is a messaging language designed to be generic. It doesn't make any assumptions about the destination chain and It can communicate different intentions between different consensus systems. An XCM message is, in fact, a program holding one or more instructions, that will be relayed for execution to the destination chain.

In this article, we cover the basic concepts of the native cross-chain communication mechanism that allows fast and secure bridging within the ecosystem.

## Design Principles {: #design-principles }

Conceived with an abstract mindset, XCM is not coupled with either a specific use case or a specific destination appchain setup, thus minimizing the coupling effect. Its core design principles are:

- **Asynchronous** - similar to sending a postcard -but way faster- the sender will keep performing its duties as usual, without blocking itself or awaiting a response from the destination
- **Absolute** -  messages are guaranteed to be delivered to the intended destination, in order and in a timely fashion
- **Asymmetric** -  messages sent have no response counterpart. Any return values, if required, must be sent back from the destination to the sender with another message
- **Agnostic** -  there are no assumptions whatsoever about the configuration or properties of the appchains that are communicating. Two communicating appchains might differ in every other aspect than the ability to understand XCM. E.g., one chain could be EVM-compatible and the other not, one chain could be a DeFi appchain and the other a gaming appchain, etc

## Common Use Cases {: #common-use-cases }

Benefiting from the common ground and versatility XCM provides, many use cases can be covered. Two of the most recurrent ones are asset transfers and remote execution.

### Asset Transfers {: #asset-transfer }

Moving digital assets from one appchain to another is essential for creating a more dynamic, efficient, and interconnected blockchain ecosystem. The native cross-chain capability allows two main mechanism to transfer assets from one chain to another:

- **Teleport** - teleporting an asset is a simple and efficient mechanism, with a major caveat: it requires trust between the parties. In essence, when appchain A wants to send X amount of the assets to appchain B, it sends a message communicating appchain B that they must mint exactly X amount of the assets. After relaying the message, appchain A burns X amount of the assets, keeping the overall asset balance, and concluding the *teleport* action
- **Reserve transfer** - a reserve transfer involves a trusted third party acting as a reserve of value. When appchain A wants to send X amount of an asset to appchain B, it sends the instruction to the reserve, who transfers the assets from appchain A to appchain B reserve accounts. The process is completed when appchain A burns X amount of the assets and appchain B mints them. Note that regardless of appchain A not burning the assets or appchain B minting tokens in excess, since the wrongful tokens are not backed one-to-one by the reserve, they have no real value

### Remote Execution {: #remote-execution }

Another common use is remote execution, which is sending a message to an appchain and triggering some action. If the destination chain is an EVM-compatible one, this allows an appchain A to call a smart contract deployed on appchain B. 

## Establishing Cross-Chain Communication {: #channel-registration }

Before two chains can start communicating, a messaging channel must be opened. Channels are unidirectional, meaning that a channel from chain A to chain B will only pass messages from A to B. Therefore, two channels must be opened to send messages back and forth.

A channel between the appchain and the relay chain is automatically opened upon appchain registration and onboarding. However, when appchain A wants to open a communication channel with appchain B, appchain A must send an open channel transaction to its network. This transaction is an XCM message as well!

Having appchain A express its intentions of opening an XCM channel with appchain B is not enough as the latter must accept the request by sending another XCM message. Once both parachains have agreed, the channel is opened within the following epoch. The same process must be repeated to open a channel from appchain B to appchain A.

![XCM Channel Registration Overview](/images/learn/framework/xcm/dark-xcm-1.webp#only-dark)
![XCM Channel Registration Overview](/images/learn/framework/xcm/light-xcm-1.webp#only-dark#only-light)

Once the channel is established, cross-chain messages can be sent between appchains. For asset transfers, assets will also need to be registered before being transferred.

## Destinations and Assets {: #destination-and-assets }





## Fees {: #fees }

