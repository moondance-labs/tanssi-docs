---
title: Basic Substrate
description: Substrate is a powerful and modular blockchain framework built in Rust that is used to build Polkadot's relay chain, the Tanssi network and the ContainerChains.
---

# Basic Substrate {: #basic-substrate } 

## Introduction {: #introduction }

Substrate is a powerful and modular software development framework (SDK) for building blockchains. It provides a comprehensive set of tools and libraries that abstract complex blockchain functionalities, allowing developers to focus on building innovative features and applications by focusing on the runtime, which contains the core logic and the rules of the state transition for the use case. 

What sets Substrate apart is its modular architecture, which enables the seamless integration of pre-built modules and the creation of custom ones, facilitating the development of blockchain protocols. 

If the use case requires only EVM (Ethereum virtual machine) compatibility, then the provided template will meet the requirements and require no additional changes, but, teams willing to build a Substrate Appchain will need to add and compose the built-in modules and the custom-made ones into the runtime, compile and generate the chain specification and, finally, deploying through Tanssi protocol to evolve into a live ContainerChain.

In this article, what adding a module involves and how to compile and generate the chain specifications will be covered.

## Adding a Built-in Module to the Runtime {: #adding-a-built-in-module }

As the [modularity](learn/framework/modules) article covers, the Substrate framework already includes many built-in modules addressing a wide range of functionalities ready to use in your runtime.

To add a module, it will be necessary:

1. Declare the module dependency for Cargo, the Rust language package manager, in the file `Cargo.toml`
2. Make the standard (`std`) features of the module available to the compiler
3. Configure the module
4. Add the module to the runtime

In the following example, the very popular Substrate module *pallet-assets* will be added to the runtime of the provided EVM template, found in the [Tanssi repository](https://github.com/moondance-labs/tanssi){target=_blank}, specifically in the folder `container-chains/templates/frontier/`.

### Declare the dependency {: #declare-dependency }

To declare the dependency, open the `Cargo.toml` file located in the folder `runtime` with a text editor and add the module, referencing the code in the official repository of Substrate:

```toml
[dependencies]
...
pallet-assets = { git = "https://github.com/paritytech/substrate.git", branch = "polkadot-v0.9.43", default-features = false }
...
```

### Make the standard features available to the compiler {: #standard-features }

In the `Cargo.toml` file there is a features section where the features from the module marked as standard must be added, to make them available to the compiler to build the runtime binary:

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
### Configure the Module {: #configure-the-module }

With the dependency declared, now the module can be configured and added to the runtime to use it. It is done in the `lib.rs` file that is located in the folder */runtime/src*:

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

It is important to note that every built-in module has a different purpose, and therefore, have different needs in term of what must be configured.

### Add the module to the runtime {: #add-module-to-runtime }

In the same `lib.rs` file, located in the folder */runtime/src* there is a section enclosed in the macro 'construct_runtime!()', this is where the pallet must be added to make the compiler include it within the runtime:

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



```bash

```


## Compiling and generating the chain specification {: #compiling-generating-chain-specs }

The following commands will build and generate the chain specification for EVM-compatible template:

1. Clone the Tanssi code hosted on GitHub
```bash
git clone https://github.com/moondance-labs/tanssi
```
2. Step into the project folder
```bash
cd tanssi
```
3. Build the EVM-compatible Appchain template
```bash
cargo build -p container-chain-template-frontier-node --release
```
4. Generate the chain specification
```bash
./target/release/container-chain-template-frontier-node build-spec > chain_spec.json
```

If everything was correctly installed, the file `chain_spec.json` should have been created. The file can be opened with any text editor. More information about the chain specification and how to change it before deployment will be covered in the article [Modifying your ContainerChain](/builders/build/modifying).
