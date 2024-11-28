---
title: Ethereum with Symbiotic
description: Tanssi's design allows developers to choose and connect to the Symbiotic restaking protocol, benefiting from Ethereum-grade security right from the start.
---

# Ethereum with Symbiotic {: #ethereum-symbiotic }

## Introduction {: #introduction }

As presented in the [Overview](/learn/tanssi/overview/){target=\_blank} article, Tanssi is an appchain infrastructure protocol that streamlines the deployment of blockchains with custom logic fitting a wide range of use cases, including DeFi, NFTs, Gaming, and any other use case development teams may want to address.

Infrastructure poses a huge challenge for developers, requiring them to bootstrap sequencers, data preservers, and RPC endpoints, while also managing integrations, interoperability, and security. This demands valuable time and resources, diverting focus from what truly matters: delivering value to their users.

Tanssi orchestrates resources, allowing developers to deploy decentralized networks (also known as actively validated services or AVSs) that are fully adaptable to any specific application or use case. In Tanssi terms, these application-specific blockchains are referred to as appchains. In this analogy, the Tanssi network resembles [Kubernetes](https://kubernetes.io){target=\_blank} in its role as an orchestrator, managing resources to guarantee the liveness and performance of the appchains.

The protocol also tackles the security front by allowing appchains to select and connect to external security providers (like [Symbiotic](https://symbiotic.fi/){target=\_blank}), ensuring Ethereum-grade security right from the start.

This article covers the necessary aspects to consider when building and deploying your own modular blockchain, along with the most relevant technical aspects of the Tanssi protocol.

## External Security Providers {: #external-security-providers }

The Tanssi protocol takes care of critical infrastructural components, making it easy for developers to launch their networks in a few minutes. In addition to block production, data retrievability, and integrations with essential tools such as wallets, RPC endpoints, block explorers, and more, another major task to tackle is providing security to the network.

Tanssi is designed to offer developers a shared security model, alleviating them from having to source enough economic security or negotiating with operators to run nodes opting-in for their appchains. By deploying appchains through Tanssi, and by choosing [Symbiotic](https://symbiotic.fi/){target=\_blank} as a security provider, developers benefit from Ethereum-grade security, tapping into billions of dollars in shared security from staked ETH.

The following sections describe how the Symbiotic protocol works.

### Ethereum-Grade Security with Symbiotic {: #symbiotic }

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

#### Tanssi with Symbiotic {: #tanssi-symbiotic }

Developers launching appchains through Tanssi benefit from block production services and the shared security model derived from every vault opting-in to support the Tanssi protocol. This eliminates the hurdle of dealing with infrastructural components developers would need to take on otherwise.

Curators running vaults can apply to offer the restaked collaterals as economic security for the Tanssi network, regardless of how many appchains are running through the Tanssi protocol.

Operators in the vault run the same setup to provide block production to the Tanssi network and validation services to every appchain deployed through Tanssi. This unique architecture facilitates all the tasks related to running and maintaining the operators since there is only one setup.

 All things combined shape a functional and elegant ecosystem where developers can focus on creating and innovating. Tanssi handles the infrastructural components, guaranteeing liveness and performance, and Symbiotic provides the economic safeguards to ensure the validity of the operations.

#### Slashing and Rewards {: #slashing-rewards }

Well-behaved operators and restakers receive rewards for their participation in TANSSI tokens. Reward payments are managed through the vault.

The Tanssi protocol also penalizes bad actors' misbehavings. These are the actions that cause slashing events:

1. Producing Invalid Blocks (blocks including invalid transactions, for example)
2. Invalid Validation (double-signing or breaking protocol rules, for example).
3. Downtime or Unavailability
4. Consensus Violations

In those cases, a veto-slashing event is triggered. The authorities designated as resolvers can revert this kind of slashing event.

## Costs to Cover  {: #costs-to-cover }

As presented in the [Introduction](#introduction), Tanssi is an infrastructure protocol that addresses the complexities and high costs associated with setting up and maintaining blockchain infrastructure, streamlining the deployment of appchains. This protocol brings benefits for both participants:

- Appchains - teams can focus on the core logic of their product, the UX, and the UI without dealing with the challenges of infrastructure bootstrapping and its management
- Sequencers - bearing with the responsibility of keeping their hardware and software configuration in optimal conditions, they are incentivized to execute transactions and produce blocks on behalf of the Tanssi appchains

[Block production as a service](#block-production-as-a-service) carries associated costs that must be covered by the appchains that want to leverage Tanssi for such a purpose. The following sections cover the general aspects of those costs and associated service payments.

### Service Payments {: #service-payments }

There are three main costs associated with block production as a service that any appchain must cover using Tanssi tokens to deploy successfully and get the block production services:

- **Registration deposit** - the initial deposit that is locked from the account that signs the appchain registration transaction
- **Sequencers assignment** - every time the Tanssi protocol assigns sequencers, which happens once per session, a fixed fee is charged. This fee gives appchains the right to be assigned sequencers and discourages appchains whose runtime logic fails to produce valid transactions or blocks
- **Block production** - appchains must pay for each block produced on their behalf. Since the protocol selects and assigns the sequencers on a per-session basis, appchains must have enough funds to cover all the blocks to be produced in an entire session to be served

The current configuration is set as follows:

=== "Dancelight"
    |         Variable          |                                         Value                                         |
    |:-------------------------:|:-------------------------------------------------------------------------------------:|
    |   Registration deposit    |               {{ networks.dancebox.costs.registration_deposit }} DANCE                |
    | Block producer assignment | {{ networks.dancebox.costs.cost_per_assignment }} x 10<sup>-6</sup> DANCE per session |
    |     Block production      |    {{ networks.dancebox.costs.cost_per_block }} x 10<sup>-6</sup> DANCE per block     |

To ensure block production in the next session, the total balance must be at least enough to cover the block producer assignment cost plus the cost to produce the {{ networks.dancebox.session.blocks }} blocks that comprise an entire session.

!!! note
    Although these costs are currently fixed, as protocol development progresses, they might become dynamic, varying in response to the network's workload.

### Tipping {: #tipping }

On some occasions, Tanssi might experience a high demand for its block production services that can not be met with the available resources. For example, if there are ten active appchains for the next session and Tanssi can only serve eight, two appchains will stall for the entire session duration.

To deal with these high-workload periods, the Tanssi protocol implements a tipping mechanism that allows appchains to compete for a higher priority over the rest. Similar to Ethereum-compatible networks, where a priority fee can be set to outbid competing transactions and obtain preferential execution treatment, the Tanssi appchains will be served according to the priority given by the tips they offer. Following the previous example, if there are ten active appchains for the next session and Tanssi can only serve eight, then only the eight highest bidding appchains will get block producers assigned.