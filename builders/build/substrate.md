---
title: Basic Substrate
description: Substrate is a powerful and modular blockchain framework built in Rust that is used to build Polkadot's relay chain, the Tanssi network and the ContainerChains.
---

# Basic Substrate {: #basic-substrate } 

## Introduction {: #introduction }

Substrate is a software development kit (SDK) for building blockchains. This framework is the foundation and engine powering the Polkadot's relay chain, the parachains (such as the Tanssi network itself), and the ContainerChains deployed through Tanssi. 

Written in the Rust Language and designed with a modular architecture, Substrate is extremely performant, flexible, and highly customizable, making it the best choice for developing blockchains.

In this article, the architecture of Substrate and how to add modules to the runtime is covered.

## Architecture {: #architecture }

The Substrate framework is designed for maximum customizability, providing a fully functional implementation for every important internal aspect of a blockchain. It allows developers to focus on the specifics of the use case and the runtime characteristics and to change any of the default features (should the need arise).

The architecture of a Substrate node contains two main components:

- **Core Client** - handles the communication with the outer world (other nodes, DApps, etc.), and many other internal responsibilities, such as storage and communication
- **Runtime** - implements the custom logic of the Appchain, executes transactions, and manages the state transitions

The end users can interact with the Appchain using the DApps (or directly via the node RPC endpoints) and get data or send transactions, which will remain queued until execution in the runtime.

![Basic substrate node architecture](/images/builders/substrate/substrate-1.png )

## The Core Client {: #core-client }

The core client comprises components responsible for everything in the operation of a node in the network except for what happens in the runtime. 

Some of the main components are: 

- **Networking** - this component handles the communication with the peers in the network (synchronizing blocks, propagating transactions, and so on) and exposes the endpoints that allow DApps to integrate and interact with the Appchain
- **Storage** - this component manages the state storage of the Appchain in a highly efficient key-value database
- **Consensus** - this component ensures that all the participants in the network agree on the state of the blockchain, validating transactions, state transitions, and the resulting blocks

The default configuration of a Substrate node and the implementations of the components are usually the best choice for most use cases. Still, teams are welcome to innovate and change or replace any piece of what constitutes the node.

## The Runtime {: #runtime }

The runtime plays a crucial role in the operation of the Appchain. It contains the core logic and rules to meet the requirements of the use case the developers are building, and, therefore, it is responsible for validating the transactions and executing the state transitions.

In Substrate architecture, an important decision has been made regarding the format for the runtime: it is compiled to WebAssembly (Wasm) byte code. 

The wasm format offers many advantages to a ContainerChain, including:

- **Portability** - the wasm format is platform-independent, meaning that the same binary can be distributed and run in different nodes using different hardware architectures and operating systems
- **Deterministic Execution** - the wasm format ensures deterministic execution of code, which means that the same input will always produce the same output. Determinacy is a critical aspect in blockchains to obtain the same state transitions across every node in the network
- **Forkless Upgradeability** - Substrate stores the runtime wasm blob on-chain, meaning that the runtime itself becomes part of the state. This design allows upgrading the runtime logic in a forkless way using a transaction

### Adding a Module to the Runtime {: #adding-a-module }

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
