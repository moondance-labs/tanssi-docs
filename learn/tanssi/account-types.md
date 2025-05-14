---
title: Accounts in the Tanssi Protocol
description: Overview of the cryptographic keys essential for the Tanssi protocol, detailing the account types used and their general functions.
icon: octicons-key-24
---

# Accounts in the Tanssi Protocol

## Introduction {: #introduction }

Blockchain technology relies on [public-private](https://en.wikipedia.org/wiki/Public-key_cryptography){target=\_blank} key cryptography for secure asset ownership and transaction verification. Private keys authorize transactions, while public keys serve as addresses for verification. Due to the Tanssi protocol's hybrid [Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk){target=\_blank} and Ethereum nature, understanding the different accounts types is crucial for users and operators.

## Account Types in the Tanssi Protocol {: #key-types-in-tanssi-protocol }

| **Account Type** | **Underlying Algorithm** | **Primary Use in Tanssi** | **Associated Wallet(s)** |
| --- | --- | --- | --- |
| [Sr25519](https://wiki.polkadot.network/learn/learn-cryptography/){target=\_blank} | Schnorr signatures on the Ristretto group | Default signature scheme for Substrate-based transactions and operator identity. | [Talisman](https://docs.tanssi.network/builders/toolkit/substrate-api/wallets/talisman){target=\_blank}, [SubWallet](https://docs.tanssi.network/builders/toolkit/substrate-api/wallets/subwallet){target=\_blank} |
| [Ed25519](https://wiki.polkadot.network/learn/learn-cryptography/){target=\_blank} | EdDSA using Curve25519 | Potentially used for specific consensus roles within the Substrate framework. | [Talisman](https://docs.tanssi.network/builders/toolkit/substrate-api/wallets/talisman){target=\_blank}, [SubWallet](https://docs.tanssi.network/builders/toolkit/substrate-api/wallets/subwallet){target=\_blank} |
| [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm){target=\_blank} | Elliptic Curve Digital Signature Algorithm | Receiving rewards through the Ethereum-based Symbiotic protocol for operators. | [MetaMask](https://docs.tanssi.network/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}, [Talisman](https://docs.tanssi.network/builders/toolkit/ethereum-api/wallets/talisman){target=\_blank} (for EVM compatibility), [SubWallet](https://docs.tanssi.network/builders/toolkit/ethereum-api/wallets/subwallet/){target=\_blank} (for EVM compatibility) |

## Identity and Operations { : #identity-and-operations }

Tanssi is built with the Substrate framework, which supports cryptographic schemes like Sr25519 and Ed25519. Sr25519 is known for security and efficiency, while Ed25519 excels in speed. Within Tanssi, Substrate accounts, identified by public keys, are essential for participants to sign transactions and interact with the protocol's Substrate components.

Node operators on Tanssi require a Substrate account to record their activities, including operators who secure the network and sequencers who produce blocks. This account also tracks rewards, with session keys mapped to it for enhanced security.

## Security and Rewards on Ethereum { : #security-and-rewards-on-ethereum }

The Elliptic Curve Digital Signature Algorithm (ECDSA) is fundamental to Ethereum and is used by Tanssi to integrate with the Ethereum network via Symbiotic. This partnership leverages Ethereum's security for Tanssi-powered networks.

Tanssi operators need an ECDSA account to receive rewards distributed on the Ethereum side, likely through the Symbiotic protocol. The necessity of both Substrate and ECDSA accounts highlights Tanssi's hybrid design, where operations are Substrate-based, and security and rewards are linked to Ethereum.

## Conclusion {: #conclusion }

Tanssi protocol integrates Substrate accounts for operator identity and operational activities with ECDSA accounts for receiving Ethereum-based rewards. Secure management of both key types is crucial for all participants.

Tanssi employs [Middleware](https://docs.tanssi.network/learn/tanssi/external-security-providers/symbiotic/#tanssi-ethereum-communication){target=\_blank} to connect its Substrate core with the Ethereum-based security and reward systems. This Middleware maps Substrate accounts to corresponding Ethereum accounts for operators.

This mapping allows operators to use their Substrate account for network operations and receive [rewards](https://docs.tanssi.network/learn/tanssi/external-security-providers/symbiotic/#rewards){target=\_blank} in their Ethereum account. This dual-account system streamlines interaction and leverages the strengths of both ecosystems.
