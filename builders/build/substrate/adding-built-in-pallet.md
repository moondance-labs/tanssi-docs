---
title: Basic Substrate
description: Substrate is a modular blockchain framework that includes many ready-to-use modules covering a wide range of common functionalities to include in your runtime.
---

# Adding a Built-In Module {: #adding-builtin-module } 

## Introduction {: #introduction }

Substrate is a powerful and modular software development framework included in the Polkadot SDKs for building blockchains. It provides a comprehensive set of tools and libraries that abstract complex blockchain functionalities, allowing developers to focus on building innovative features and applications by focusing on the runtime, which contains the core logic and the rules of the state transition for the use case. 

What sets Substrate apart is its modular architecture, which enables the seamless integration of pre-built modules and the creation of custom ones, facilitating the development of blockchain protocols. 

If the use case requires only EVM (Ethereum virtual machine) compatibility, then the provided template included in the [Tanssi repository](https://github.com/moondance-labs/tanssi#container-chain-templates){target=_blank} will meet the requirements and need no additional changes, but, teams willing to build a Substrate Appchain will need to add and compose the built-in modules and the custom-made ones into the runtime, compile and generate the chain specification and, finally, deploying through Tanssi protocol to evolve into a live ContainerChain.

In this article, the necessary steps involved when adding a built-in module are covered.

## Adding a Built-in Module to the Runtime {: #adding-a-built-in-module }

As introduced in the [modularity](/learn/framework/modules) article, the Substrate framework already includes many built-in modules addressing a wide range of functionalities ready to use in your runtime.

Modules are meant to provide the functionality needed in very different use cases such as DeFi, NFTs, or any other, and, therefore, they are basic building blocks inherently abstract that can be configured according to the specific needs of the Appchain.

To add a module, the following steps are necessary:

1. Make the dependency available within the project by declaring it in [Cargo](https://doc.rust-lang.org/cargo/){target=_blank}, the Rust language package manager
2. Make the standard (`std`) features of the module available to the compiler
3. Configure the module
4. Add the module to the runtime
5. Add default configuration in the chain specification

In the following example, the very popular Substrate module `pallet-assets` will be added to the runtime of the provided EVM template, found in the [Tanssi repository](https://github.com/moondance-labs/tanssi){target=_blank}, specifically in the folder `container-chains/templates/frontier/`.

### Declare the dependency {: #declare-dependency }

Every package contains a manifest file named `Cargo.toml` stating, among other things, all the dependencies the package relies on, and the ContainerChain runtime is no exception. 

To declare the dependency and make it available to the runtime, open the `Cargo.toml` file located in the folder `runtime` with a text editor and add the module, referencing the code in the official repository of the Polkadot SDK:

```toml
[dependencies]
...
pallet-assets = { git = "https://github.com/paritytech/polkadot-sdk", branch = "master", default-features = false }
...
```

### Make the standard features available to the compiler {: #standard-features }

In Cargo, the “features” flags provide a mechanism to tell the compiler to include or leave out certain portions of code, which is a useful mechanism to optimize compile time, minimize binary file sizes, or disable certain behavior (for example, not including unit testing or benchmarking functionality in the runtime intended for production). 

To compile the standard features for the Assets module within the runtime, the same `Cargo.toml` file located in the `runtime` folder must be edited, enabling the flag. Everything listed in this section will ensure that it is available to the compiler when building the runtime binary, which is ultimately the file that contains all the information to run (initially) your ContainerChain.

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

With the dependency declared, now the module can be configured and added to the runtime to use it. To do so, you need to edit the `lib.rs` file that is located in the folder:

CODE SNIPPET 
 */runtime/src/lib.rs


The following code snippet is a basic example that configures the module with types, constants and default values. These values must be adjusted to the specific requirements of the use case.

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

In the same `lib.rs` file referenced in the previous section, there is a segment enclosed in the macro 'construct_runtime!()', this is where the pallet must be added to make the compiler include it within the runtime:

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

### Configure the Module in the Chain Specification {: #configure-chain-specs }

Finally, add the default configuration in the chain specification for the genesis, in the file `chain_spec.rs` located in:

CODE SNIPPET
*/container-chains/templates/frontier/node/src/chain_spec.rs


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
