---
title: Glossary
description: The Tanssi network's architecture is rich and complex. Here's a technical glossary for understanding Tanssi, including key terms, concepts, and definitions.
icon: octicons-key-24
---

# Glossary

## Introduction {: #introduction }

The Tanssi protocol offers a wide range of features and a layered architecture, making it both rich and complex. There's a great deal of terminology specific to Tanssi, Appchains, Symbiotic, and the web3 space in general. We've compiled a list of terms you'll want to know as you review the Tanssi documentation.

## Appchain {: #appchain }

A customizable application-specific blockchain deployed through Tanssi that goes live in minutes benefiting from shared security, block production services, built-in bridging, and other services.

## BEEFY {: #beefy }

BEEFY stands for _Bridge Efficiency Enabling Finality Yielder_. It is a consensus protocol that Tanssi utilizes for efficient, trustless bridging to Ethereum.

## Bridge {: #bridge }

A bridge in the web3 context connects two different blockchains. Tanssi offers a built-in bridge based on Snowbridge connecting the Tanssi network to Ethereum in a decentralized and trustless way.

## Dancebox {: #dancebox }

Tanssi's official TestNet for rapid network deployment and experimentation.

## Data Preservers {: #data-preservers }

Full archive nodes that ensure data availability and provide RPC infrastructure for Tanssi and Tanssi-powered networks.

## ECDSA {: #ecdsa }

ECDSA stands for _Elliptic Curve Digital Signature Algorithm_, which is the cryptographic scheme used for Ethereum accounts.

## Ed25519 {: #ed25519 }

It is the cryptographic scheme for producing digital signatures used by node operators for consensus mechanisms like block production.

## Gateway Contract {: #gateway }

One of the components of the Tanssi-Ethereum bridge, serving as Ethereum's central messaging point that receives and validates messages from Tanssi.

## Light Client {: #light-client }

One of the components of the Tanssi-Ethereum bridge, serving as an on-chain verifier for data legitimacy in a network.

## Merkle Root {: #merkle-root }

A single cryptographic hash that allows to verify an entire set of data, such as all the transactions in a block on a blockchain.

## Operator {: #operator }

A node that validates transactions, providing security through a restaking protocol to Tanssi and all Tanssi-powered appchains.

## Relayer {: #relayer }

A stateless component that transports messages and proofs between different blockchain networks, such as Tanssi and Ethereum.

## Restaking {: #restaking }

The practice of using already-staked tokens to secure additional protocols or services.

## Sequencer {: #sequencer }

A node responsible for executing transactions and producing blocks for Tanssi-powered appchains.

## Session {: #session }

A period of time during which the same set of authorities (sequencers or validators) are active.

## Sr25519 {: #sr25519 }

The primary signature scheme used for most user-facing operations within the Tanssi network.

## Substrate {: #substrate }

A modular and performant blockchain development framework used to build Tanssi and Tanssi appchains.

## Symbiotic {: #symbiotic }

A restaking protocol based on Ethereum, providing restaking services and economic security to Tanssi and Tanssi-powered appchains.

## $TANSSI(Substrate) {: #tanssi-substrate }

The native utility token of the Tanssi protocol used for staking, governance, network operations, and more.

## $TANSSI(ERC20) {: #tanssi-erc20 }

The ERC20 Ethereum representation of the Tanssi token, used for paying rewards to operators, and more.

## Trustless {: #trustless }
 
As with a _trustless bridge_, it enables operation without requiring trust in centralized intermediaries, relying instead on cryptographic proofs.

## Vault {: #vault }

A Symbiotic component that receives and manages restaked collateral, delegating to operators and providing economic security to networks.

## Verifier {: #verifier }

Component that validates cryptographic proofs, implemented as on-chain light clients.
