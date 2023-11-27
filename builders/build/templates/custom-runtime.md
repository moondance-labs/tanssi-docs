---
title: Custom Runtime
description: Any custom runtime can be adapted to be deployed through Tanssi, provided that specific modules are implemented, and the required configurations are set.
---

# Adapting an Existing Runtime {: #adapting-existing-runtime }


## Introduction {: #introduction }

For teams that already have a Substrate runtime built, it will be necessary to implement the required modules and configurations into the runtime. This will ensure that the runtime can evolve into a ContainerChain that can be successfully [deployed through Tanssi](#/builders/build/templates/overview/#base-setup-supporting-tanssi
){target=_blank} and [run properly within Polkadot](#/builders/build/templates/overview/#base-setup-to-polkadot){target=_blank}.

Failing to do so might lead to reduced interoperability within the ecosystem and unnecessary exposure to vulnerabilities.

## Adding Cumulus Support {: #adding-cumulus-support }

If the runtime is set up as a solo chain, check the official [Cumulus template](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus/parachain-template){target=_blank} or any of the templates available in the [Tanssi repository](https://github.com/moondance-labs/tanssi){target=_blank} for a reference setup.

## Adding Tanssi Protocol Support {: #adding-tanssi-support }

To support the Tanssi protocol, it will be necessary to add [the modules](#base-setup-supporting-tanssi) through the following steps:

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
        // ContainerChain
        AuthoritiesNoting: pallet_cc_authorities_noting = 50,
        AuthorInherent: pallet_author_inherent = 51,
        ...
    }
    ```

4. Make sure your Header is configured as follows:

    ```rust
    type Header = generic::Header<BlockNumber, BlakeTwo256>;
    /// An index to a block.
    pub type BlockNumber = u32; 
    ```

5. Add the block executor, to allow the validators in the relay chain to check that the authors are the collators assigned by Tanssi (and not a malicious actor)

    ```rust
    cumulus_pallet_parachain_system::register_validate_block! {
        Runtime = Runtime,
        BlockExecutor = pallet_author_inherent::BlockExecutor::<Runtime, Executive>
        CheckInherents = CheckInherents,
    }
    ```