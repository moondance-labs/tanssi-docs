---
title: Ethereum with Symbiotic
description: Tanssi's design allows developers to choose and connect to the Symbiotic restaking protocol, benefiting from Ethereum-grade security right from the start.
---

# Ethereum with Symbiotic {: #ethereum-symbiotic }

## Introduction {: #introduction }

The Tanssi protocol takes care of critical infrastructural components, making it easy for developers to launch their networks in a few minutes. In addition to block production, data retrievability, and integrations with essential tools such as wallets, RPC endpoints, block explorers, and others, another major task to tackle is providing security to the network.

Tanssi is designed to offer developers a shared security model, alleviating them from having to source enough economic security or negotiating with operators to run nodes opting-in for their appchains. By deploying appchains through Tanssi, and by choosing [Symbiotic](https://symbiotic.fi/){target=\_blank} as a security provider, developers benefit from Ethereum-grade security, tapping into billions of dollars in shared security from staked ETH.

The following sections describe how the Symbiotic protocol works.

## Ethereum-Grade Security with Symbiotic {: #symbiotic }

[Symbiotic](https://symbiotic.fi/){target=\_blank} is a restaking protocol designed to be permissionless, multi-asset, and network-agnostic. It fosters capital efficiency by allowing users to extend the functionality of their staked assets to secure other networks while providing additional utility.

There are three main components of the protocol:

- **Vaults** - are the economic backbone of the protocol, receiving the liquidity from restakers, connecting operators and networks, and distributing rewards to restakers and operators
- **Operators** - are the computational component validating the transactions of the networks
- **Networks** - are the actively validated services or appchains. These application-specific blockchains can be a use case from a wide range of industries, such as Gaming, Defi, RWAs, and others, and are the platforms that, through dApps, the end users interact with

Around these components, different actors participate:

- **Restakers** - are the ones providing liquidity to the vaults, obtaining rewards. Restakers choose which vaults they restake to, provided that the vault accepts their assets and they agree with the networks the vault works with and the general setup
- **Vault Curators** - are responsible for the vault administration. Curators decide which networks the vault works with, which operators are whitelisted to participate in securing the networks, which assets are accepted as collaterals and the slashing and rewarding mechanisms
- **Resolvers** - are responsible for resolving veto-slashing events in the vault. Veto slashing events are a particular type of event that requires the participation of resolvers, who have the authority to revoke the slashing request
- **Node Operators** - are the ones running the actual operators, which validate the networks' transactions. Node operators are responsible for the configuration and hardware of the nodes. They apply to offer their services in both vaults and networks and have to be accepted and whitelisted by both before starting to validate networks and get rewards
- **Developers** - are the ones building appchains

### Tanssi with Symbiotic {: #tanssi-symbiotic }

Developers launching appchains through Tanssi benefit from [block production services](/learn/tanssi/appchain-services/block-production/){target=\_blank} and the shared security model derived from every vault opting-in to support the Tanssi protocol. This eliminates the hurdle of dealing with infrastructural components developers would need to take on otherwise.

Curators running vaults can apply to offer the restaked collaterals as economic security for the Tanssi network, regardless of how many appchains are running through the Tanssi protocol.

Operators in the vault run the same setup to provide block production to the Tanssi network and validation services to every appchain deployed through Tanssi. This unique architecture facilitates all the tasks related to running and maintaining the operators since there is only one setup.

 All things combined shape a functional and elegant ecosystem where developers can focus on creating and innovating. Tanssi handles the infrastructural components, guaranteeing liveness and performance, and Symbiotic provides the economic safeguards to ensure the validity of the operations.

### Slashing and Rewards {: #slashing-rewards }

Well-behaved operators and restakers receive rewards for their participation in TANSSI tokens. Reward payments are managed through the vault.

The Tanssi protocol also penalizes bad actors' misbehavings. These are the actions that cause slashing events:

1. Producing Invalid Blocks (blocks including invalid transactions, for example)
2. Invalid Validation (double-signing or breaking protocol rules, for example).
3. Downtime or Unavailability
4. Consensus Violations

In those cases, a veto-slashing event is triggered. The authorities designated as resolvers can revert this kind of slashing event.
