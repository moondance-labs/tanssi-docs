---
title: Block Production Services
description: Tanssi provides block production services assigning block producers to the appchains, requiring minimal changes to the code for appchains to be deployed.
---

# Technical Features of Tanssi {: #technical-features-of-tanssi }

## Introduction {: #introduction }

As presented in the [Overview](/learn/tanssi/overview/){target=\_blank} article, Tanssi is an appchain infrastructure protocol that streamlines the deployment of blockchains with custom logic specific to a wide range of use cases, including DeFi, NFTs, Gaming, and any other use case development teams may want to address.

Infrastructure poses a huge challenge for developers who would need to bootstrap block producers, data preservers, and RPC endpoints, and deal with integrations and interoperability, assigning precious effort and resources and losing focus on what is important: the appchain Runtime, the UX, and the value proposition to the users.

In Tanssi terms, application chains are called appchains, allowing teams to focus on the product while alleviating deployment-related issues. In this analogy, the Tanssi network resembles [Kubernetes](https://kubernetes.io){target=\_blank}, in its role as orchestrator, managing resources to guarantee the liveness and performance of the appchains.

In this article, the necessary aspects to consider when building and deploying your own modular blockchain are covered, and also the following technical aspects of the Tanssi protocol:

- **Block production as a service**
- **Consensus on demand**

## Block Production as a Service {: #block-production-as-a-service }

Polkadot is a heterogeneous multi-chain ecosystem, where multiple parallel blockchains connect to a central blockchain called the relay chain. To provide block production as a service, the Tanssi protocol masterfully orchestrates and designs the interaction between the Tanssi network, the appchains, and Polkadot's relay chain.

In the Polkadot ecosystem, the parachains connected to the relay chain are fully sovereign blockchains, having their own rules, consensus mechanisms, and so forth, and this is the case for the Tanssi network and the appchains deployed through Tanssi as well.

The Tanssi network and the appchains can be considered sibling chains, meaning that there is no hierarchical dependency whatsoever. Nevertheless, the Tanssi network and its appchains share the relay chain as a common point.

![Sibling Chains](/images/learn/tanssi/technical/light-technical-1.webp#only-light)
![Sibling Chains](/images/learn/tanssi/technical/dark-technical-1.webp#only-dark)

Their responsibility and how they interact with each other through the relay chain will be covered in the following sections.

### Block Producer Selection Process {: #block-producer-selection-process}

At any given time, Tanssi and all Tanssi Appchains require a certain amount of block producers that depends on the number of Appchains and the current block production configuration set in Tanssi. The configuration sets the maximum number of total block producers, the minimum and maximum numbers of block producers required for Tanssi itself, and the number of block producers each Appchain has assigned.

=== "Dancebox"
    |              Variable              |                                         Value                                          |
    |:----------------------------------:|:--------------------------------------------------------------------------------------:|
    |     Max. # of Block Producers      |       {{ networks.dancebox.block_producers.configuration.max_block_producers }}        |
    | Min. # of Block Producers (Tanssi) | {{ networks.dancebox.block_producers.configuration.min_orchestrator_block_producers }} |
    | Max. # of Block Producers (Tanssi) | {{ networks.dancebox.block_producers.configuration.max_orchestrator_block_producers }} |
    |  # of Block Producers (Appchains)  |   {{ networks.dancebox.block_producers.configuration.block_producer_per_container }}   |

Once the required number of block producers for a given session is known, Tanssi uses two mechanisms to decide the actual set of block producers that will be distributed among all chains (Tanssi and appchains). The first mechanism is through the Invunerables module, which sets a list of fixed block producers prioritized by the protocol and serves as a way to ensure block production stability in certain scenarios like TestNets. The second mechanism is through the [Tanssi staking module](/learn/tanssi/network-features/staking/){target=\_blank}.

The Tanssi staking module helps create a decentralized set of block producers for Tanssi and all Tanssi appchains by providing the protocol a sorted list of block producers by staked amount. Then, Tanssi appends the sorted list to the invulnerable block producers (if exists) and starts the block producer assignation process.

### Block Producers Assignment {: #block_producers-assignment }

Once the block production set is known, Tanssi assigns them to provide block production services to the active Tanssi Appchains and the Tanssi network itself.

The assignment algorithm will start distributing the available block producers, serving first the Tanssi network and then the appchains, ordered by the registration date, on a first-come, first-served basis. Once the assignment is made, it will be upheld for at least one session, which represents a period measured in blocks that has a constant set of block producers. In Dancebox, the Tanssi TestNet, the default session duration is set to {{ networks.dancebox.session.blocks }} blocks, which, with an average block time of six seconds, translates to (roughly) {{ networks.dancebox.session.display }} hour.

Every new assignment works intentionally with a one-session delay, so the block producers may know in advance if they are assigned to serve the Tanssi network or which one of the appchains. Block producers will start syncing the new appchain they'll have to serve in the next session with a special type of syncing mechanism called [warp sync](https://spec.polkadot.network/chap-sync#sect-sync-warp){target=\_blank}. Warp sync allows the block producers to swiftly sync the new appchain without acting as an archive node.

When a new session starts, the Tanssi protocol will put the queued assignment into effect. Block producers will automatically change and start producing blocks in the new Tanssi appchain they've been assigned while discarding the chain state from the previous assignment. Tanssi will also calculate the new assignment, considering changes in Tanssi appchains that might have been activated or deactivated and block producers that might have been added or removed from the pool. This new assignment will be queued for the next session.

![Sessions](/images/learn/tanssi/technical/technical-2.webp)

The following picture shows an example of how the algorithm distributes ten available block producers, with a minimum threshold of three block producers for the Tanssi network and two block producers for each of the appchains.

![Block Producers Assignment Algorithm](/images/learn/tanssi/technical/light-technical-3.webp#only-light)
![Block Producers Assignment Algorithm](/images/learn/tanssi/technical/dark-technical-3.webp#only-dark)

### The Role of the Relay Chain {: #relay-chain }

Among many other responsibilities, the relay chain validates and finalizes the blocks produced by any chain participating in the ecosystem (including the appchains and the Tanssi network), storing a small representation of the most recent proof of validity for each block of each chain. This small representation of the proof of validity to be included in the relay chain block is called [candidate receipt](https://polkadot.network/blog/the-path-of-a-parachain-block#candidate-receipts){target=\_blank} and is composed of a set of values, including the state root, which can be used to verify state proofs.

![Relay chain](/images/learn/tanssi/technical/technical-4.webp)

As mentioned, the Tanssi network and the appchains are sibling chains with no hierarchical dependency. They communicate via the relay chain, and therefore, the relay chain plays a key role in the protocol.

The block producers that Tanssi assigns to serve the different appchains also run a Tanssi node, hence, by accessing the data stored in the finalized blocks of the relay chain and cross-referencing headers, they can learn their assignation for the session, the Tanssi appchains can confirm that a certain group of block producers from Tanssi has been assigned to them, and Tanssi can verify that the author of an appchain block was the expected one and reward accordingly.

The Tanssi protocol relies on the relay chain as a means to provide the necessary data to both, Tanssi and its appchains, allowing them to collaborate and validate the correctness of the block production service.

### The Role of the Tanssi Network {: #tanssi-newtwork }

As previously discussed, the Tanssi protocol assigns block producers to the Tanssi network itself and the Tanssi appchains, and the result of this assignment is stored within the chain state.

Another important piece of information that Tanssi stores is the latest header for every Tanssi appchain. This data is read from the relay chain and, being stored in every Tanssi block, it allows the protocol to keep track of the state in every chain and also to identify and reward accordingly the block producer that produced their last block.

![Tanssi Network](/images/learn/tanssi/technical/technical-5.webp)

### The Role of the Appchain {: #appchain }

As a block producer node assigned to a Tanssi appchain deployed in Tanssi has built-in Tanssi node functionality, it is technically feasible to read the state from the Tanssi network and the blocks from the relay chain.

Leveraging this ability to access the states, the current block producer with the authority to produce a block will read the latest block produced in the relay chain, which contains the state root of the latest block produced in Tanssi. With this state root, it will proceed to read the state in Tanssi and include in the block of the appchain the latest state root of the Tanssi network, the current set of block producers assigned to the appchain, and its public signature, allowing Tanssi to know who produced the block and reward the block producer.

Once the block is completed with the Tanssi appchain transactions, it will be proposed as a candidate and handed over to the relay chain validators, which will ensure that the included state proofs match the state proofs from the latest state of Tanssi (preventing unauthorized block production) and that the transactions produced valid state transitions. Having verified the work of the block producer, the relay chain will finalize the proposed block, including its candidate receipt in the relay chain block.

![Tanssi appchain block production](/images/learn/tanssi/technical/technical-6.webp)

## Costs of Block Production Services {: #block-production-costs }

As presented in the [Introduction](#introduction), Tanssi is an infrastructure protocol that addresses the complexities and high costs associated with setting up and maintaining blockchain infrastructure, streamlining the deployment of appchains. This protocol brings benefits for both participants:

- Appchains - teams can focus on the core logic of their product, the UX, and the UI without dealing with the challenges of infrastructure bootstrapping and its management
- Node operators - bearing with the responsibility of keeping their hardware and software configuration in optimal conditions, they are incentivized to execute transactions and produce blocks on behalf of Tanssi and Tanssi appchains

[Block production as a service](#block-production-as-a-service) carries an associated cost that must be covered by the appchains that want to leverage Tanssi for such a purpose. The following sections cover the general aspects of those costs and associated service payments.

### Costs to Cover  {: #costs-to-cover }

There are three main costs associated with block production as a service that any appchain must cover using Tanssi tokens to deploy successfully and get the block production services:

- **Registration deposit** - the initial deposit that is locked from the account that signs the appchain registration transaction
- **Block producers assignment** - every time the Tanssi protocol assigns block producers, which happens once per session, a fixed fee is charged. This fee gives appchains the right to be assigned block producers, and should discourage appchains whose runtime logic fails to produce valid transactions or blocks.
- **Block production** - appchains need to pay for each block that is produced on their behalf. Since the protocol selects and assigns the block producers on a per-session basis, appchains must have enough funds to cover all the blocks to be produced in an entire session to be served

The current configuration is set as follows:

=== "Dancebox"
    |         Variable          |                                   Value                                   |
    |:-------------------------:|:-------------------------------------------------------------------------:|
    |   Registration deposit    |         {{ networks.dancebox.costs.registration_deposit }} DANCE          |
    | Block producer assignment | {{ networks.dancebox.costs.cost_per_assignment }} x 10<sup>-6</sup> DANCE per session |
    |     Block production      |    {{ networks.dancebox.costs.cost_per_block }} x 10<sup>-6</sup> DANCE per block     |

To ensure block production in the next session, the total balance must be at least enough to cover the block producer assignment cost plus the cost to produce the {{ networks.dancebox.session.blocks }} blocks that comprise an entire session.

!!! note
    Although these costs are currently fixed, as protocol development progresses, they might become dynamic, varying in response to the network's workload.

### Tipping {: #tipping }

On some occasions, Tanssi might experience a high demand for its block production services that can not be met with the available resources. For example, if there are ten active appchains for the next session and Tanssi can only serve eight, two appchains will stall for the entire session duration.

To deal with these high-workload periods, the Tanssi protocol implements a tipping mechanism that allows appchains to compete for a higher priority over the rest. Similar to Ethereum-compatible networks, where a priority fee can be set to outbid competing transactions and obtain preferential execution treatment, the Tanssi appchains will be served according to the priority given by the tips they offer. Following the previous example, if there are ten active appchains for the next session and Tanssi can only serve eight, then only the eight highest bidding appchains will get block producers assigned.