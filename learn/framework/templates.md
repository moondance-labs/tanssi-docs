---
title: Templates Included in Tanssi
description: Tanssi protocol provides useful templates for building your Appchain, including a ready-to-use EVM template for Ethereum compatibility.
---

# Templates {: #templates } 

## Start building an Appchain {: #star-building } 

To start building an Appchain, there are some useful templates to kick-start the development process:

- **[Node Template](https://github.com/substrate-developer-hub/substrate-parachain-template){target=_blank}** - this node template contains a default configuration to quickly run and operate what would represent a single node in a blockchain
- **[Frontend Template](https://github.com/substrate-developer-hub/substrate-parachain-template){target=_blank}** - this template contains a web client developed using [React](https://react.dev/){target=_blank} and [Polkadot.js API](https://polkadot.js.org/docs/api/){target=_blank} to interact with your Appchain with an easy-to-grasp UI
- **[Appchain Template](https://github.com/substrate-developer-hub/substrate-parachain-template){target=_blank}** - this template contains a default configuration to run an Appchain (a parachain within the Polkadot ecosystem)

## Running and Testing the Network {: #running-and-testing-the-network } 

Becoming a Tanssi ContainerChain brings along the benefits of being part of a mature ecosystem, leveraging the inherited security of the relay chain and the ability to communicate and share assets and data with other siblings ContainerChains and parachains.

The template for an Appchain is a good starting point, as it is [Cumulus](https://github.com/paritytech/cumulus/){target=blank}-based and includes the additional behavior for parachains to be able to collate and communicate with the relay chain to propose blocks for finalization.

To test an Appchain, It is needed to get a relay chain instance and the parachain collators up and running, but though it seems hard, there is a great tool to spin up and run a complete network to perform integration tests: [Zombienet](https://github.com/paritytech/zombienet){target=blank}.

With the template Appchain node and the right tools to run tests and assert that everything is working as intended, the Appchain will be ready to be deployed as a Tanssi ContainerChain.
