---
title: Block Production Services
description: Tanssi provides block production services allowing developers to deploy decentralized networks (appchains) with Ethereum-grade security through Symbiotic
---

# Technical Features of Tanssi {: #technical-features-of-tanssi }

## Introduction {: #introduction }

As presented in the [Overview](/learn/tanssi/overview/){target=\_blank} article, Tanssi is an appchain infrastructure protocol that streamlines the deployment of blockchains with custom logic fitting a wide range of use cases, including DeFi, NFTs, Gaming, and any other use case development teams may want to address.

Infrastructure poses a huge challenge for developers, requiring them to bootstrap sequencers, data preservers, and RPC endpoints, while also managing integrations, interoperability, and security. This demands valuable time and resources, diverting focus from what truly matters: delivering value to their users.

Tanssi orchestrates resources, allowing developers to deploy decentralized networks (also known as actively validated services or AVSs) that are fully adaptable to any specific application or use case. In Tanssi terms, these application-specific blockchains are referred to as appchains. In this analogy, the Tanssi network resembles [Kubernetes](https://kubernetes.io){target=\_blank} in its role as an orchestrator, managing resources to guarantee the liveness and performance of the appchains.

The protocol also tackles the security front by allowing appchains to select and connect to external security providers (like [Symbiotic](https://symbiotic.fi/){target=\_blank}), ensuring Ethereum-grade security right from the start.

This article covers the necessary aspects to consider when building and deploying your own modular blockchain, along with the most relevant technical aspects of the Tanssi protocol.

## Block Production as a Service {: #block-production-as-a-service }

The Tanssi protocol provides block production as a service, orchestrating a decentralized and trustless set of sequencers, ensuring the appchains' liveness. To do so, the protocol bridges both ends:

- **Node operators** - who run sequencers, offering their block production services to get rewards
- **Appchains** - which require transactions to be executed and included in blocks, keeping the network's liveness

The protocol assigns a subset of sequencers to provide services to each appchain, rotating them after a period of time. The sequencers can serve any appchain, regardless of the custom logic they implement. On the other hand, appchains deployed through Tanssi can customize their runtime as much as they need to fit their use case and upgrade the logic at any moment in a forkless fashion without worrying about the sequencer's setup.

### Block Producer Selection Process {: #block-producer-selection-process}

At any given time, all Tanssi appchains require a certain number of sequencers, depending on the number of active appchains and the current block production configuration set in Tanssi. The configuration sets the maximum number of total sequencers in the set and the number of sequencers each Appchain has to have assigned.

=== "Dancelight"
    |          Variable           |                                       Value                                        |
    |:---------------------------:|:----------------------------------------------------------------------------------:|
    |    Max. # of Sequencers     |     {{ networks.dancebox.block_producers.configuration.max_block_producers }}      |
    | # of Sequencers (Appchains) | {{ networks.dancebox.block_producers.configuration.block_producer_per_container }} |

Once the required number of block producers for a given session is known, Tanssi uses two mechanisms to decide the actual set of sequencers that will be distributed among all networks. The first mechanism is through the *Invunerables* module, which sets a list of fixed sequencers prioritized by the protocol and serves as a way to ensure block production stability in certain scenarios like TestNets. The second mechanism is through the [Tanssi staking module](/learn/tanssi/network-features/staking/){target=\_blank}.

The Tanssi staking module helps create a decentralized set of sequencers for all Tanssi appchains by providing the protocol with a sorted list of sequencers by staked amount. Tanssi appends the sorted list by stake of sequencers to the invulnerable ones (if any), then takes from the list only the exact amount of sequencers needed, starting from the top, leaving out of the next session those sequencers that have less staked value, to finally begin the sequencer assignation process.

### Sequencers Assignment {: #block_producers-assignment }

Once the sequencer set that will participate in the next session is known, Tanssi shuffles the list and assigns them to provide block production services to the active Tanssi Appchains.

The assignment algorithm will start distributing the sequencers serving the appchains by the registration date on a first-come, first-served basis. Once the assignment is made, it will be upheld for at least one session, representing a period measured in blocks with a constant set of block producers. In Dancelight, the Tanssi TestNet, the default session duration is set to {{ networks.dancebox.session.blocks }} blocks, which, with an average block time of six seconds, translates to (roughly) {{ networks.dancebox.session.display }} hour.

Every new assignment works intentionally with a one-session delay, so the sequencers know in advance which one of the appchains they are assigned to. Sequencers will start syncing the new appchain they'll have to serve in the next session with a special syncing mechanism called [warp sync](https://spec.polkadot.network/chap-sync#sect-sync-warp){target=\_blank}. Warp sync allows the block producers to swiftly sync the new appchain without acting as an archive node.

When a new session starts, the Tanssi protocol will put the queued assignment into effect. Sequencers will automatically change and start producing blocks in the new Tanssi appchain they've been assigned to while discarding the chain state from the previous assignment. Tanssi will also calculate the new assignment, considering changes in Tanssi appchains that might have been activated or deactivated and block producers that might have been added or removed from the pool or changed the total staked value. This new assignment will be queued for the next session.

![Sessions](/images/learn/tanssi/technical/technical-2.webp)

The following picture shows an example of how the algorithm distributes ten available block producers, with a minimum threshold of three block producers for the Tanssi network and two block producers for each active appchain.

![Block Producers Assignment Algorithm](/images/learn/tanssi/technical/light-technical-3.webp#only-light)
![Block Producers Assignment Algorithm](/images/learn/tanssi/technical/dark-technical-3.webp#only-dark)

### The Role of the Tanssi Network {: #tanssi-newtwork }

As previously discussed, the Tanssi protocol assigns sequencers to the Tanssi appchains, and the result of this assignment is stored within the chain state.  Besides running the appchain node, the sequencers also run the Tanssi one. Hence, by accessing the data stored in the finalized blocks of the Tanssi network, they can learn their assignation for the session, and the Tanssi appchains can confirm that a certain group of sequencers have been assigned to them. 

As the Tanssi appchains produce blocks, those blocks need to be validated and finalized by the external security provider. Once an operator verifies a block, a small proof of validity is produced and stored in Tanssi, keeping track of the the proofs for each block of each chain. This small representation of the proof of validity is called [candidate receipt](https://polkadot.network/blog/the-path-of-a-parachain-block#candidate-receipts){target=\_blank} and is composed of a set of values, including the state root, which can be used to verify state proofs.

Finally, Tanssi can verify that the author of an appchain block was the expected one and reward accordingly.

### The Role of the Appchain {: #appchain }

As a sequencer assigned to a Tanssi appchain includes built-in Tanssi node functionality, it is technically feasible to read the state from the Tanssi network.

Leveraging this ability to access the states, the current sequencer with the authority to produce a block will read the state of the latest block produced in the Tanssi chain. It will proceed to include this state in the block of the appchain, the current set of sequencers assigned to the appchain, and its public signature, allowing Tanssi to know who produced the block and reward the node operator.

Once the block is filled with appchain transactions, it will be proposed as a candidate and handed over to the Tanssi chain, where the security provider's operators will ensure that the included state proofs match the state proofs from the latest state of Tanssi (preventing unauthorized block production) and that the transactions produced valid state transitions. Having verified the work of the sequencer, the operators will finalize the proposed block, including its candidate receipt in a Tanssi network block.

### Costs to Cover  {: #costs-to-cover }

As presented in the [Introduction](#introduction), Tanssi is an infrastructure protocol that addresses the complexities and high costs associated with setting up and maintaining blockchain infrastructure, streamlining the deployment of appchains. This protocol brings benefits for both participants:

- Appchains - teams can focus on the core logic of their product, the UX, and the UI without dealing with the challenges of infrastructure bootstrapping and its management
- Sequencers - bearing with the responsibility of keeping their hardware and software configuration in optimal conditions, they are incentivized to execute transactions and produce blocks on behalf of the Tanssi appchains

[Block production as a service](#block-production-as-a-service) carries associated costs that must be covered by the appchains that want to leverage Tanssi for such a purpose. The following sections cover the general aspects of those costs and associated service payments.

#### Service Payments {: #service-payments }

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

#### Tipping {: #tipping }

On some occasions, Tanssi might experience a high demand for its block production services that can not be met with the available resources. For example, if there are ten active appchains for the next session and Tanssi can only serve eight, two appchains will stall for the entire session duration.

To deal with these high-workload periods, the Tanssi protocol implements a tipping mechanism that allows appchains to compete for a higher priority over the rest. Similar to Ethereum-compatible networks, where a priority fee can be set to outbid competing transactions and obtain preferential execution treatment, the Tanssi appchains will be served according to the priority given by the tips they offer. Following the previous example, if there are ten active appchains for the next session and Tanssi can only serve eight, then only the eight highest bidding appchains will get block producers assigned.

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