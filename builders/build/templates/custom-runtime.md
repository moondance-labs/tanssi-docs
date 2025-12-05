---
title: Custom Runtime
description: Any custom runtime can be adapted to be deployed through Tanssi, provided that specific modules are implemented and the required configurations are set.
icon: octicons-file-binary-24
categories: Custom-Runtime
---

# Custom Runtime

## Introduction {: #introduction }

For teams working on an existing Substrate framework project, it will be necessary to include some required modules and configurations into the runtime. This will ensure that the existing runtime can gracefully become a Tanssi network runtime, aligning with the [protocol rules](/builders/build/templates/overview/#base-setup-supporting-tanssi){target=\_blank}.

Failing to do so might lead to reduced interoperability and unnecessary exposure to vulnerabilities.

## Minimum Requirements

Already existing Substrate runtimes need to implement at least the [framework](#adding-cumulus-support) for communicating within the Tanssi ecosystem, along with [Tanssi-specific modules](#adding-tanssi-support).

Nevertheless, teams might have already implemented certain modules that can collide with some functionalities related to Tanssi, for example, block production, block authority assignment, and consensus.

The following modules are included by default in many popular templates and must be removed along with their configuration:

```rust
Authorship: pallet_authorship = 20,
CollatorSelection: pallet_collator_selection = 21,
Session: pallet_session = 22,
Aura: pallet_aura = 23,
AuraExt: cumulus_pallet_aura_ext = 24,
```

In any case, make sure to check your runtime and remove all the modules that might interfere with the block production as a service feature before starting the registration process.

## Integrating Your Stand-Alone Chain {: #adding-cumulus-support }

If your existing runtime is set up as a stand-alone chain, you'll need to add a consensus mechanism to integrate into the Tanssi ecosystem. Check any of the available templates in the [Tanssi repository](https://github.com/moondance-labs/tanssi){target=\_blank} for a reference setup or the [framework documentation](https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/polkadot_sdk/cumulus/index.html){target=\_blank}.

## Adding Tanssi Protocol Support {: #adding-tanssi-support }

To support the Tanssi protocol, it will be necessary to add two modules through the following steps:

1. Include the dependencies in the `Cargo.toml` manifesto (usually located in the root folder). Open the `Cargo.toml` file and add the modules in the `dependencies` section

    ```toml
    [dependencies]
    ...
    pallet-cc-authorities-noting = { 
        git = "https://github.com/moondance-labs/tanssi", 
        branch = "master", default-features = false 
    }
    pallet_authorities_noting = {
        git = "https://github.com/moondance-labs/moonkit",
        branch = "tanssi-polkadot-v0.9.43", default-features = false
    }
    ...
    ```

2. Configure the modules. Open the file `lib.rs` located in the folder `*/runtime/src` and add the configuration for both modules:

    ```rust
    impl pallet_author_inherent::Config for Runtime {
        type AuthorId = NimbusId;
        type AccountLookup = tp_consensus::NimbusLookUp;
        type CanAuthor = pallet_cc_authorities_noting::CanAuthor<Runtime>;
        type SlotBeacon = tp_consensus::AuraDigestSlotBeacon<Runtime>;
        type WeightInfo =
            pallet_author_inherent::weights::SubstrateWeight<Runtime>;
    }

    impl pallet_cc_authorities_noting::Config for Runtime {
        type RuntimeEvent = RuntimeEvent;
        type SelfParaId = parachain_info::Pallet<Runtime>;
        type RelayChainStateProvider =
            cumulus_pallet_parachain_system::RelaychainDataProvider<Self>;
        type AuthorityId = NimbusId;
        type WeightInfo =
            pallet_cc_authorities_noting::weights::SubstrateWeight<Runtime>;
    }
    ```

    Note that this configuration is agnostic from the use case

3. Declare the modules as part of the runtime. In the same `lib.rs` file, located in the folder `*/runtime/src`, add the modules to the construction of the runtime:

    ```rust
    construct_runtime!(
    pub enum Runtime where
        Block = Block,
        NodeBlock = opaque::Block,
        UncheckedExtrinsic = UncheckedExtrinsic,
    {
        ...
        // Tanssi network
        AuthoritiesNoting: pallet_cc_authorities_noting = 50,
        AuthorInherent: pallet_author_inherent = 51,
        ...
    }
    );
    ```

4. Make sure your Header is configured as follows:

    ```rust
    type Header = generic::Header<BlockNumber, BlakeTwo256>;
    /// An index to a block.
    pub type BlockNumber = u32; 
    ```

5. Add the block executor, to allow the operators in the Tanssi network to validate that the authors are the sequencers assigned by Tanssi (and not a malicious actor)

    ```rust
    cumulus_pallet_parachain_system::register_validate_block! {
        Runtime = Runtime,
        BlockExecutor = pallet_author_inherent::BlockExecutor::<Runtime, Executive>
        CheckInherents = CheckInherents,
    }
    ```
