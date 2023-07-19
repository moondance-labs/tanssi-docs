---
title: Technical Features
description: Tanssi is an Appchain protocol that eases the process of deploying Appchains so that developers can focus on their custom logic.
---

# Technical features of Tanssi {: #technical-features-of-tanssi } 

## Introduction {: #introduction } 

As presented in the [Overview](/learn/tanssi/overview) article, Tanssi is an Appchain infrastructure protocol that streamlines the deployment of blockchains with custom logic specific to a wide range of use cases, including DeFi, NFTs, Gaming, and any other the developer teams may want to address.

Infrastructure poses a huge challenge for developers, who would need to bootstrap collators for block production, data preservers, RPC endpoints, and deal with integrations and interoperability assigning precious effort and resources and losing focus on what is really important: the Appchain Runtime, the UX, and the value proposition to the users.

In Tanssi terms, Appchains are called ContainerChains, similar to the concept coined in [Docker](https://www.docker.com){target=blank}, allowing teams to focus on the product while alleviating deployment-related issues.

In this article, we discuss the following technical aspects of how Tanssi works:

- **Collators Assignment**
- **Block Production**
- **Implementing Tanssi Protocol in your ContainerChain**
- **Deploy a new ContainerChain**

## Collators Assignment {: #collators-assignment } 

Tanssi Protocol manages a set of collators and assigns them to provide block production services to the active ContainerChains and the Tanssi Network itself.

The assignment algorithm will start distributing the available collators, serving first the Tanssi Network and then the ContainerChains, ordered by the registration date, being served on a first come first served basis. Once the assignment is made, it will be upheld for at least one session.

Every new assignment works intentionally with a one-session delay, so collators may know in advance if they are assigned to serve Tanssi Network, or which of the ContainerChains they are bound to.

When a new session starts, Tanssi Protocol will put into effect the queued assignment. It will also calculate the new assignment, considering changes in ContainerChains that might have been activated or deactivated and collators that might have been added or removed from the pool. This new assignment will be queued for the next session.

The following picture shows an example of how the algorithm works by distributing ten available collators, with a minimum threshold of three collators for the Tanssi Network and two collators for the ContainerChains.

![Collators Assignment Algorithm](/images/learn/tanssi/technical/light-technical-1.png#only-light)
![Collators Assignment Algorithm](/images/learn/tanssi/technical/dark-technical-1.png#only-dark)

## Block Production {: #block-production } 

Polkadot is a heterogeneous multi-chain ecosystem, where multiple parallel blockchains connect to a central blockchain called the relay chain. To provide block production as a service, Tanssi Protocol masterfully orchestrates and designs the interaction between Tanssi Network, the ContainerChains, and Polkadot's relay chain.

In the Polkadot ecosystem, the Appchains connected to the relay chain are fully sovereign blockchains, having their own rules, consensus mechanisms, and so forth, and this is the case for Tanssi Network and the Appchains deployed through Tanssi as well. 

We can consider Tanssi Network and the ContainerChains as sibling chains, meaning that there is no hierarchical dependency whatsoever, and we will discuss their responsibility and how they interact with each other through the relay chain in the following sections.

![Sibling Chains](/images/learn/tanssi/technical/light-technical-2.png#only-light)
![Sibling Chains](/images/learn/tanssi/technical/dark-technical-2.png#only-dark)

### Relay Chain {: #relay-chain } 

Among many other responsibilities, the relay chain validates and finalizes the blocks produced by any chain participating in the ecosystem (including the ContainerChains and Tanssi Network), storing the most recent headers for each block of each chain.

Tanssi Protocol leverages this feature, relying on the relay chain as a means to provide the necessary data to both, Tanssi and its ContainerChains, allowing them to collaborate and validate the correctness of the block production service.

### Tanssi Network {: #tanssi-newtwork } 

As previously discussed, Tanssi Protocol assigns collators to Tanssi Network itself and the ContainerChains, and the result of this assignment is stored within the chain state.

Another important piece of information that Tanssi stores is the latest header for every ContainerChain. This data is read from the relay chain and, being stored in every Tanssi block, it allows the protocol to keep track of the state in every chain and also to identify and reward accordingly the collator that produced their last block.

### ContainerChain {: #containerchain } 

As a collator node assigned to a ContainerChain deployed in Tanssi, and having a built-in Tanssi node functionality, it is technically feasible to read the state from the relay chain and the state from the Tanssi Network.

Leveraging this ability to access the states, the current collator with the authority to produce a block will read the latest block produced in the relay chain which contains the state root of the latest block produced in Tanssi. With this state root, it will proceed to read the state in Tanssi, and include in the block of the ContainerChain the latest state root of Tanssi Network, the current set of collators assigned to the ContainerChain, and its public signature, to allow Tanssi to know who produced the block and reward the collator.

Once the block is completed with the ContainerChain transactions, it will be proposed, validated, and finalized by the relay chain, which will include the block's header in the relay chain block.

## Implementing Tanssi Protocol in your ContainerChain 

To make your Appchain Tanssi compliant and ready to become a deployed ContainerChain, referencing the following two pallets is needed:

-**Authorities Noting pallet** - this pallet has the objective of implementing the necessary logic to read and include in the ContainerChain block the set of collators assigned to provide block production services in the current session

-**Author Inherent pallet** - this pallet is necessary to allow the collator to include in the block its identity and be recognized and awarded as the block producer

It is important to note that both pallets include the information using Inherents, which are a special form of transaction that only the block producer can include.

## Deploy a ContainerChain {: #deploy-a-containerchain } 

After building on top of one of the provided [Appchain Templates]() and finishing the development process, developers are ready to deploy in Tanssi.

This a fairly straightforward step, where the teams need only to generate and upload the [chain specification](https://docs.substrate.io/build/chain-spec/){target=blank} to the Tanssi orchestrator.

The Tanssi orchestrator will then assign a set of collators to the newly added ContainerChain that will start producing blocks in the next session, setting the network alive and making it able to receive and execute transactions.
