---
title: Technical Features
description: Tanssi is an Appchain protocol that eases the process of deploying Appchains so that developers can focus on their custom logic.
---

# Technical features of Tanssi {: #technical-features-of-tanssi } 

## Introduction {: #introduction } 

As presented in the [Overview](/learn/tanssi/overview) article, Tanssi is an Appchain infrastructure protocol that streamlines the deployment of blockchains with custom logic specific to a wide range of use cases, including DeFi, NFTs, Gaming, and any other the developer teams may want to address.

Infrastructure poses a huge challenge for developers, who would need to bootstrap collators for block production, data preservers, RPC endpoints, and deal with integrations and interoperability assigning precious effort and resources and losing focus on what is really important: the Appchain Runtime, the UX, and the value proposition to the users.

In Tanssi terms, Appchains are called ContainerChains, similar to the concept coined in [Docker](https://www.docker.com){target=blank}, allowing teams to focus on the product while alleviating the deployment-related responsibilities.

In this article, we discuss the following technical aspects on how Tanssi works:

- **Orchestration  Between Tanssi Network, the ContainerChain, and the Relay Chain**
- **Implementing Tanssi Protocol in your ContainerChain**
- **Deploy a new ContainerChain**
- **Block Production as a Service** 

## Interaction Between the ContainerChain, the Relay Chain and Tanssi Network




## Tanssi Pallets 

Describe de pallets to be implemented in the runtime to support the protocol

## Starting a New ContainerChain {: #starting-new-containerchain } 

After building on top of one of the provided [Appchain Templates]() and finishing the development process, developers are ready to deploy in Tanssi.

This a fairly straightforward step, where the teams need only generate and upload the [chain specification](https://docs.substrate.io/build/chain-spec/){target=blank} to the Tanssi orchestrator.

Tanssi orchestrator will assign a set of collators to the recently added ContainerChain that will start producing blocks and therefore, setting the network alive to receive and execute transactions.

## Block Production - How Tanssi Manages Collators {: #block-production } 

ContainerChains and Tanssi itself are to be sibling chains in the Polkadot ecosystem, either parachains or parathreads or on the new concept to be revealed of blockspace on demand.
With this architectural design, they are connected through the relay chain sharing information that the protocol needs to run

Steps to get the appchain working

register and activate the chain
Tanssi assigns collators to start producing blocks and writes this information in the block
The relay chain finalizes this information
Collators get to know which containerchain are assigned to through the relay chain
Collators start producing blocks, and register in every block the assignment and the block producer
The relay chain receives the block, and eventually finalizes it

## Block production 

Describe how blocks are produced and the relation with the relay chain


