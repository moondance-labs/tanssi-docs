---
title: Accounts in the Tanssi Protocol
description: Overview of the cryptographic keys essential for the Tanssi protocol, detailing the account types used and their general functions.
icon: octicons-key-24
categories: Basics
---

# Accounts in the Tanssi Protocol

## Introduction {: #introduction }

Blockchain technology relies on [public-private](https://en.wikipedia.org/wiki/Public-key_cryptography){target=\_blank} key cryptography for secure asset ownership and transaction verification. Private keys authorize transactions, while public keys serve as addresses for verification. Due to the Tanssi protocol's hybrid [Substrate](/learn/framework/overview/#substrate-framework){target=\_blank} and Ethereum nature, understanding the different account types is crucial for users and operators.

## Account Types in the Tanssi Protocol {: #key-types-in-tanssi-protocol }

| **Account Type** | **Underlying Algorithm** | **Primary Use in Tanssi** |
| --- | --- | --- |
| [Sr25519](https://wiki.polkadot.network/learn/learn-cryptography/){target=_blank} | Schnorr signatures on the Ristretto group | Default signature scheme for Substrate-based transactions and operator identity. |
| [Ed25519](https://wiki.polkadot.network/learn/learn-cryptography/){target=_blank} | EdDSA using Curve25519 | Used for specific consensus roles (e.g., block production, finality) within the Substrate framework. |
| [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm){target=_blank} | Elliptic Curve Digital Signature Algorithm | Receiving rewards through the Ethereum-based Symbiotic protocol for operators. |

## Identity and Operations { : #identity-and-operations }

Tanssi, built with the Substrate framework, utilizes distinct cryptographic schemes for different functions, primarily _Sr25519_ and _Ed25519_. These account types are crucial for interacting with the protocol's Substrate components by signing transactions.

**Sr25519 (Schnorrkel/Ristretto x25519)** - is the primary account type used for most user-facing operations within Tanssi. Its strengths lie in security and efficiency. **Sr25519 accounts serve as your on-chain identity, used for holding tokens, participating in governance, paying transaction fees, and other general interactions with the network.** When you create a wallet to interact with Tanssi as a regular user, you will create and use an Sr25519 account.

**Ed25519 (Edwards-curve Digital Signature Algorithm)** - while Sr25519 handles general identity and transactions, Ed25519 is specifically leveraged for its high performance in cryptographic signing, making it ideal for consensus-related operations. **Within Tanssi, Ed25519 accounts are used by node operators for critical consensus mechanisms, such as block production and finality.** Regular users will typically not create or directly use an Ed25519 account. However, these accounts are fundamental for the security and operation of the network, managed by those running nodes.

Node operators on Tanssi require a Substrate account to record their activities, including operators who secure the network and sequencers who produce blocks. This account also tracks rewards, with session keys mapped to it for enhanced security.

## Security and Rewards on Ethereum { : #security-and-rewards-on-ethereum }

The Elliptic Curve Digital Signature Algorithm (ECDSA) is fundamental to Ethereum and is used by Tanssi to integrate with the Ethereum network via Symbiotic. This partnership leverages Ethereum's security for Tanssi-powered networks.

Tanssi operators need an ECDSA account to receive rewards distributed on Ethereum, likely through the Symbiotic protocol. The necessity of both Substrate and ECDSA accounts highlights Tanssi's hybrid design, where operations are Substrate-based, and security and rewards are linked to Ethereum.

## Account Mappings in Tanssi { : #account-mappings-in-tanssi}

### Internal Key Binding (_Sr25519_ and _Ed25519_)

Within Tanssi's Substrate-based protocol, an operator’s primary _Sr25519_ identity links to specific _Ed25519_ keys used for consensus tasks (like block production). Operators create this binding with an on-chain transaction. This transaction maps their internal public keys ("session keys") with the stash account. This on-chain registration ensures the network correctly attributes all actions from the session keys to the operator's primary identity.

### Cross-Ecosystem Reward Mapping (_Sr25519_ and _ECDSA_)

For rewards on Ethereum (e.g., via [Symbiotic](/learn/tanssi/external-security-providers/symbiotic/){target=\_blank}), an operator's Tanssi _Sr25519_ identity maps to an Ethereum _ECDSA_ address. Operators inform both accounts, which are then linked through the Tanssi middleware. This trusted link ensures that rewards from the operator's node work on the Tanssi network are routed to the operator's designated Ethereum account.
