---
title: Utility Token
description: Learn about the two versions of the Tanssi token - the native Substrate token and the ERC-20 representation on Ethereum, their utilities, and use cases.
icon: octicons-ruby-24
---

# Utility Token {: #utility-token }

## Introduction {: #introduction }

The Tanssi network token is the utility token that powers the Tanssi protocol. Considering [Tanssi's architecture](/learn/tanssi/overview/#tanssi-architecture){target=\_blank}, the token exists in two distinct yet interconnected representations: native substrate and Ethereum ERC20. The two versions can be bridged between each other through the [Tanssi-Ethereum bridge](/learn/tanssi/tanssi-ethereum-bridge/){target=\_blank}.

In this guide the token's utility and the differences between its two representations are covered, which is crucial for network operators, stakers, appchain managers, and general users who want to participate in the Tanssi ecosystem.

## Token Utility {: #token-utility }

Tanssi is a decentralized infrastructure protocol that makes deploying appchains with custom logic easy. It allows developer to focus on the use case instead of diverting time and energy to deal with the [many components required](/learn/tanssi/overview/#what-tanssi-provides){target=\_blank} for a network to run.

Running a healthy decentralized protocol requires alignining incentives and coordinating bewteen several actors of the ecosystem, like Appchain developers, node operators, sequencer operators, data and RPC services providers, and general users, and the Tanssi token is the backbone providing the economic mechanisms necessary to coordinate, incentivize proper behavior, and secure the entire ecosystem.

The token has different utilities, depending how you participate in the ecosystem:

- **Appchain developers** - use the token to launch your network, and pay for block production services keeping your network live
- **Sequencer operators** - get tokens as rewards for your block production services, and use the token self-stake the minimum required bond to participate in the protocol
- **Node operators** - get tokens as rewards for your validation services
- **General users** - use the token to stake on sequencers, stake on operators, or participate in governance decisions

!!! note
    All the transactions fees happening on Tanssi are paid using the token, which full amount goes straight to fun protocol's treasury account. This account can only spend its funds spent via governance.

## Token Representations {: #token-representations }

The Tanssi network is built using Substrate framework, leveraging its modular architecture and high performance. Therefore, the native token is a Substrate type.

Also, the Tanssi protocol relies on [external security providers](/learn/tanssi/external-security-providers/){target=\_blank}, such as [Symbiotic](/learn/tanssi/external-security-providers/symbiotic/){target=\_blank}, to secure the ecosystem through restaked assets. This restaking mechanism is implemented on Ethereum, therefore, an ERC20 version of the token also exists to cover user cases on the Etherereum side.

The protocol's minting and burning mechanisms happen on the Tanssi network side, or, in other words, happen on the Substrate token representation. 

Leveraging Tanssi's [built-in bridging capabilities](/builders/tanssi-network/bridge/){target=\_blank}, the token can be converted to (and from) the ERC20  representation on Ethereum. When the token is bridged over to Ethereum, the tokens are locked in the bridge's sovereign account, and a message is sent to the Ethereum contract to mint the equivalent amount in ERC20. This means that the ERC20 version is created through the trustless bridging mechanism and maintains a 1:1 relationship with the native token.

### Tanssi(Substrate) - Native Token {: #tanssi-substrate }

The native Tanssi token exists on the Tanssi network as a Substrate-based asset. This is the original form of the token that powers the core protocol operations.

This token uses as [Sr25519 subtrate type account](/learn/tanssi/account-types/#key-types-in-tanssi-protocol){target=\_blank}, so it requires a wallet such as [Talisman](/builders/toolkit/substrate-api/wallets/talisman/){target=\_blank} or any other [substrate-compatible wallet](/builders/toolkit/substrate-api/wallets/){target=\_blank}.

With this version of the token you can:

- Pay fees when interacting with the Tanssi network
- Pay to launch your network
- Pay for block production services
- Stake on sequencers to participate in the protocol
- Get rewards for your block production services, should you run sequencers
- Participate in governance decisions

!!! note
    This token has twelve decimal places.

### Tanssi(ERC20) - Ethereum Representation {: #tanssi-erc20 }

The ERC-20 version of TANSSI is a standard Ethereum token that represents the native TANSSI token on the Ethereum network. This version is created through the trustless bridging mechanism and maintains a 1:1 relationship with the native token.

This token, as any other Ethereum asset, uses an [ECDSA account](/learn/tanssi/account-types/#key-types-in-tanssi-protocol){target=\_blank}, so it requires a wallet such as [Metamask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank} or any other [Ethereum compatible wallet](/builders/toolkit/ethereum-api/wallets/){target=\_blank}.

With this version of the token you can:

- Get rewards for your validation services, should you run an operator
- When enabled, stake on vaults accepting the token as a valid collateral

!!! note
    This token has twelve decimal places, and not eighteen.
