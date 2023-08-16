---
title: Templates
description: Tanssi includes templates to kick-start the development of an Appchain, one for a Substrate-oriented runtime and another featuring full EVM (Ethereum) support.
---

# Templates {: #templates } 

## Introduction {: #introduction }

ContainerChains deployed through Tanssi are essentially parachains that are capable of interacting with the relay chain and also contain the necessary functionalities to support the Tanssi protocol and the custom logic that applies to the specific use case the developers are addressing.

To jumpstart the development process, Tanssi includes two templates:

- **Baseline Appchain template**
- **Baseline EVM (Ethereum Virtual Machine) Template**

Both templates implement the standard base setup to work as a parachain in the Polkadot ecosystem and to support the Tanssi protocol.

## Base Setup {: #base-setup }

To integrate into the Polkadot ecosystem, the templates implement the [Cumulus SDK](https://github.com/paritytech/cumulus){target=_blank}, which manages many aspects, including: 

- **Consensus** - Cumulus adds the necessary functionality to allow the collators to produce, gossip and validate the blocks, and coordinate with the relay chain to get notified about the block's finality 
- **XCM** - handles the ingestion and dispatch of incoming downward and lateral messages
- **Runtime Upgrades** - a runtime upgrade in a ContainerChain must be informed to the relay chain to allow its validators to check on the blocks produced by the collators of the ContainerChains. Cumulus notifies the upgrade to the relay chain and waits the required amount of time (blocks) before enacting the change

Besides Cumulus, a ContanerChain implements the Tanssi modules to support the protocol:

- **Authorities Noting** - registers the set of collators assigned to the ContainerChain by Tanssi
- **Author Inherent** - Allows the collator authoring the block to include its identity to get validated and rewarded

This base setup is configured in the templates and requires no attention from developers building their Appchain.

## Baseline Appchain Template {: #baseline-appchain-template }

Teams willing to build a substrate runtime can start composing the built-in modules and their custom-made logic with this template, which includes a runtime containing only the minimum required references to other modules.

```rust
construct_runtime!(
    pub enum Runtime where
        Block = Block,
        NodeBlock = opaque::Block,
        UncheckedExtrinsic = UncheckedExtrinsic,
    {
        ...

        // Monetary stuff.
        Balances: pallet_balances = 10,

        // ContainerChain Author Verification
        AuthoritiesNoting: pallet_cc_authorities_noting = 50,
        AuthorInherent: pallet_author_inherent = 51,
        
        // Add your custom logic here
        ...

    }
);
```

## Baseline EVM (Ethereum Virtual Machine) Template {: #baseline-evm-template }

Teams building smart contracts on top of an EVM can use this template as a boilerplate, containing all the necessary references to add the extra layer of Ethereum compatibility to a Substrate node: 

- **EVM** - this module adds the execution layer for Ethereum apps
- **Ethereum** - this module adds the Ethereum block production emulation, so RPC nodes (and DApps) can run without any modification
- **EVMChainId** - stores the chain id that identifies the Ethereum network

If the use case requires only running on top of an EVM, this template requires no additional changes in the runtime and is ready to build and deploy through Tanssi.
