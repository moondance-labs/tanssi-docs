---
title: Basic Substrate
description: Substrate is a powerful and modular blockchain framework built in Rust that is used to build Polkadot's relay chain, the Tanssi network and the ContainerChains.
---

# Basic Substrate {: #basic-substrate } 

## Introduction {: #introduction }



What is a module, what it means to add modules to the runtime

adding a buit-in module to the runtime, explain every thing involved
loose and toght coupling

Adding a custom module 
creating the file, implememting macros reference 

compiling the runtime and generating the chain spec
explain cargo


## Adding a Module to the Runtime {: #adding-a-module }

As the [modularity](learn/framework/modules) article covers, building a Substrate runtime is about composing modules, mixing some of the already provided and ready-to-use and custom-made modules that implement any logic specific to the use case.

In the following example, the module called *pallet-assets* will be added to the runtime of the EVM template found in the [Tanssi repository](https://github.com/moondance-labs/tanssi){target=_blank}:

1. Open the *Cargo.toml* file located in the folder *container-chains/templates/frontier/runtime/* with a text editor and add the dependency 
```toml
[dependencies]
...
pallet-assets = { git = "https://github.com/moondance-labs/substrate", branch = "tanssi-polkadot-v0.9.43", default-features = false }
...
```
And also in the features section, add the features of the module to the standard runtime binary
```toml
[features]
default = [
	"std",
]
std = [
	...,
	"pallet-assets/std",
   ...
]
```
2. Open the *lib.rs* file, located in the folder *container-chains/templates/frontier/runtime/src* with a text editor and configure the module
```rust
...
parameter_types! {
	pub const AssetDeposit: Balance = 100;
	pub const ApprovalDeposit: Balance = 1;
	pub const StringLimit: u32 = 50;
	pub const MetadataDepositBase: Balance = 10;
	pub const MetadataDepositPerByte: Balance = 1;
}

impl pallet_assets::Config for Runtime {
	type RuntimeEvent = RuntimeEvent;
	type Balance = u128;
	type AssetId = u64;
	type AssetIdParameter = u64;
	type Currency = Balances;
	type CreateOrigin = frame_support::traits::AsEnsureOriginWithArg<frame_system::EnsureSigned<AccountId>>;
	type ForceOrigin = EnsureRoot<AccountId>;
	type AssetDeposit = AssetDeposit;
	type AssetAccountDeposit = frame_support::traits::ConstU128<1>;
	type MetadataDepositBase = MetadataDepositBase;
	type MetadataDepositPerByte = MetadataDepositPerByte;
	type ApprovalDeposit = ApprovalDeposit;
	type StringLimit = StringLimit;
	type Freezer = ();
	type Extra = ();
	type WeightInfo = pallet_assets::weights::SubstrateWeight<Runtime>;
	type RemoveItemsLimit = frame_support::traits::ConstU32<1000>;
	#[cfg(feature = "runtime-benchmarks")]
	type BenchmarkHelper = ();
   type CallbackHandle = ();
}
...
```
And add the pallet into the runtime construction:
```rust
construct_runtime!(
   pub enum Runtime where
      Block = Block,
      NodeBlock = opaque::Block,
      UncheckedExtrinsic = UncheckedExtrinsic,
   {
      // System support stuff.
      System: frame_system = 0,
      ParachainSystem: cumulus_pallet_parachain_system = 1,
      Timestamp: pallet_timestamp = 2,
      ParachainInfo: parachain_info = 3,
      Sudo: pallet_sudo = 4,
      Utility: pallet_utility = 5,
      ...
      Balances: pallet_balances = 10,
      Assets: pallet_assets = 11,
      ...
   }
```
3. Finally, add the configuration in the chain specification for the genesis, in the file *chain_spec* located in *container-chains/templates/frontier/node/src*
```rust
fn testnet_genesis(
   endowed_accounts: Vec<AccountId>,
   id: ParaId,
   root_key: AccountId,
) -> container_chain_template_frontier_runtime::GenesisConfig {
   container_chain_template_frontier_runtime::GenesisConfig {
      system: container_chain_template_frontier_runtime::SystemConfig {
         code: container_chain_template_frontier_runtime::WASM_BINARY
               .expect("WASM binary was not build, please build it!")
               .to_vec(),
      },
      ...
      assets: Default::default()
      ...
   }
}
```

With the module included, this new runtime version has unlocked a new set of functionalities ready to be composed with even more of the Substrate built-in modules or the custom-made ones.

## Creating a Custom Module 

## Compiling and generating the chain specification