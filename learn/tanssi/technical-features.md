---
title: Technical Features of Tanssi
description: Tanssi provides block production services assigning collators to the Appchains, requiring minimal changes to the code for Appchains to be deployed.
---

# Technical Features of Tanssi {: #technical-features-of-tanssi }

## Introduction {: #introduction }

As presented in the [Overview](/learn/tanssi/overview){target=\_blank} article, Tanssi is an Appchain infrastructure protocol that streamlines the deployment of blockchains with custom logic specific to a wide range of use cases, including DeFi, NFTs, Gaming, and any other use case development teams may want to address.

Infrastructure poses a huge challenge for developers who would need to bootstrap collators for block production, data preservers, and RPC endpoints, and deal with integrations and interoperability, assigning precious effort and resources and losing focus on what is important: the Appchain Runtime, the UX, and the value proposition to the users.

In Tanssi terms, application chains are called Appchains, allowing teams to focus on the product while alleviating deployment-related issues. In this analogy, the Tanssi network resembles [Kubernetes](https://kubernetes.io){target=\_blank}, in its role as orchestrator, managing resources to guarantee the liveness and performance of the Appchains.

In this article, the necessary aspects to consider when building and deploying your own modular blockchain are covered, and also the following technical aspects of the Tanssi protocol:

- **Block production as a service**
- **Consensus on demand**

## Block Production as a Service {: #block-production-as-a-service }

Polkadot is a heterogeneous multi-chain ecosystem, where multiple parallel blockchains connect to a central blockchain called the relay chain. To provide block production as a service, the Tanssi protocol masterfully orchestrates and designs the interaction between the Tanssi network, the Appchains, and Polkadot's relay chain.

In the Polkadot ecosystem, the Tanssi Appchains connected to the relay chain are fully sovereign blockchains, having their own rules, consensus mechanisms, and so forth, and this is the case for the Tanssi network and the Appchains deployed through Tanssi as well.

The Tanssi network and the Appchains can be considered sibling chains, meaning that there is no hierarchical dependency whatsoever. Nevertheless, the Tanssi network and its Appchains share the relay chain as a common point.

![Sibling Chains](/images/learn/tanssi/technical/light-technical-1.webp#only-light)
![Sibling Chains](/images/learn/tanssi/technical/dark-technical-1.webp#only-dark)

Their responsibility and how they interact with each other through the relay chain will be covered in the following sections.

### Collator Assignment {: #collators-assignment }

The Tanssi protocol manages a set of collators and assigns them to provide block production services to the active Tanssi Appchains and the Tanssi network itself.

The assignment algorithm will start distributing the available collators, serving first the Tanssi network and then the Appchains, ordered by the registration date, on a first-come, first-served basis. Once the assignment is made, it will be upheld for at least one session, which represents a period measured in blocks that has a constant set of collators. In the provided [templates](/learn/tanssi/included-templates){target=\_blank}, the default session duration is set to 1800 blocks, which, with an average block time of 12 seconds, translates to (roughly) six hours.

Every new assignment works intentionally with a one-session delay, so collators may know in advance if they are assigned to serve the Tanssi network or which one of the Appchains. Block producers will start syncing the new Appchain they'll have to serve in the next session with a special type of syncing mechanism called [warp sync](https://spec.polkadot.network/chap-sync#sect-sync-warp){target=\_blank}. Warp sync allows the block producers to swiftly sync the new Appchain without acting as an archive node.

When a new session starts, the Tanssi protocol will put the queued assignment into effect. Block producers will automatically change and start producing blocks in the new Tanssi Appchain they've been assigned while discarding the chain state from the previous assignment. Tanssi will also calculate the new assignment, considering changes in Tanssi Appchains that might have been activated or deactivated and collators that might have been added or removed from the pool. This new assignment will be queued for the next session.

![Sessions](/images/learn/tanssi/technical/technical-2.webp)

The following picture shows an example of how the algorithm distributes ten available collators, with a minimum threshold of three collators for the Tanssi network and two collators for each of the Appchains.

![Collators Assignment Algorithm](/images/learn/tanssi/technical/light-technical-3.webp#only-light)
![Collators Assignment Algorithm](/images/learn/tanssi/technical/dark-technical-3.webp#only-dark)

### The Role of the Relay Chain {: #relay-chain }

Among many other responsibilities, the relay chain validates and finalizes the blocks produced by any chain participating in the ecosystem (including the Appchains and the Tanssi network), storing a small representation of the most recent proof of validity for each block of each chain. This small representation of the proof of validity to be included in the relay chain block is called [candidate receipt](https://polkadot.network/blog/the-path-of-a-parachain-block#candidate-receipts){target=\_blank} and is composed of a set of values, including the state root, which can be used to verify state proofs.

![Relay chain](/images/learn/tanssi/technical/technical-4.webp)

As mentioned, the Tanssi network and the Appchains are sibling chains with no hierarchical dependency. They are communicated via the relay chain, and therefore, the relay chain plays a key role in the protocol.

The collators that Tanssi assigns to serve the different Appchains also run a Tanssi node, hence, by accessing the data stored in the finalized blocks of the relay chain and cross-referencing headers, they can learn their assignation for the session, the Tanssi Appchains can confirm that a certain group of collators from Tanssi has been assigned to them, and Tanssi can verify that the author of a container block was the expected one and reward accordingly.

The Tanssi protocol relies on the relay chain as a means to provide the necessary data to both, Tanssi and its Appchains, allowing them to collaborate and validate the correctness of the block production service.

### The Role of the Tanssi Network {: #tanssi-newtwork }

As previously discussed, the Tanssi protocol assigns collators to the Tanssi network itself and the Tanssi Appchains, and the result of this assignment is stored within the chain state.

Another important piece of information that Tanssi stores is the latest header for every Tanssi Appchain. This data is read from the relay chain and, being stored in every Tanssi block, it allows the protocol to keep track of the state in every chain and also to identify and reward accordingly the collator that produced their last block.

![Tanssi Network](/images/learn/tanssi/technical/technical-5.webp)

### The Role of the Appchain {: #appchain }

As a collator node assigned to a Tanssi Appchain deployed in Tanssi has built-in Tanssi node functionality, it is technically feasible to read the state from the Tanssi network and the blocks from the relay chain.

Leveraging this ability to access the states, the current collator with the authority to produce a block will read the latest block produced in the relay chain, which contains the state root of the latest block produced in Tanssi. With this state root, it will proceed to read the state in Tanssi and include in the block of the Appchain the latest state root of the Tanssi network, the current set of collators assigned to the Appchain, and its public signature, allowing Tanssi to know who produced the block and reward the collator.

Once the block is completed with the Tanssi Appchain transactions, it will be proposed as a candidate and handed over to the relay chain validators, which will ensure that the included state proofs match the state proofs from the latest state of Tanssi (preventing unauthorized collation) and that the transactions produced valid state transitions. Having verified the work of the collator, the relay chain will finalize the proposed block, including its candidate receipt in the relay chain block.

![Tanssi Appchain collation](/images/learn/tanssi/technical/technical-6.webp)

## Building a Modular Appchain Supporting Tanssi Protocol {: #modular-blockchain-supporting-tanssi }

To make your Appchain Tanssi compliant and ready to become a deployed Appchain, adding references to the following two modules is required:

-**Author Noting Pallet** - this pallet has the objective of implementing the necessary logic to read and include in the Tanssi Appchain block the set of collators assigned to provide block production services in the current session

-**Author Inherent Pallet** - this pallet is necessary to allow the collator to include in the block its identity and be recognized and awarded as the block producer

It is important to note that both pallets include the mentioned data in the block using Inherents, which are a special form of transaction that only the block producer can include.

## Deploy an Appchain {: #deploy-an-appchain }

After building on top of one of the provided [Tanssi Appchain Templates](/learn/tanssi/included-templates){target=\_blank} and finishing the development process, developers are ready to deploy their Appchain in Tanssi.

This is a fairly straightforward step, where the teams only need to generate and upload the [chain specification](https://docs.substrate.io/build/chain-spec/){target=\_blank} to the Tanssi network.

The Tanssi network will then assign a set of collators to the newly added Appchain that will start producing blocks in the next session, setting the network alive and making it able to receive and execute transactions.
