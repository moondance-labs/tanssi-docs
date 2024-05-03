---
title: Adding Built-in Substrate Modules
description: Substrate is a modular blockchain framework that includes many ready-to-use modules covering a wide range of common functionalities to include in your runtime.
---

# Adding a Built-in Module {: #adding-builtin-module }

## Introduction {: #introduction }

Substrate is a powerful and modular software development framework included in the Polkadot SDKs for building blockchains. It provides a comprehensive set of tools and libraries that abstract complex blockchain functionalities, allowing developers to focus on building innovative features and applications by focusing on the runtime, which contains the core logic and the rules of the state transition for the use case.

What sets Substrate apart is its modular architecture, which enables the seamless integration of [built-in modules](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/){target=\_blank} and the creation of custom ones, facilitating the development of blockchain protocols.

For cases requiring only EVM (Ethereum Virtual Machine) compatibility, the template provided in the [Tanssi repository](https://github.com/moondance-labs/tanssi#container-chain-templates){target=\_blank} fulfills the requirements without further modifications. However, teams aiming to build a Substrate appchain must add and configure both built-in and custom modules within the runtime. This involves compiling, generating the chain specification, and deploying through the Tanssi protocol to transform it into a live Tanssi appchain.

This article focuses on the necessary steps for adding a built-in module to the EVM template.

## Checking Prerequisites {: #checking-prerequisites }

To follow the steps in this guide, you will need to have the following:

- A healthy development environment with the Rust compiler and Cargo package manager
- The [Tanssi repository](https://github.com/moondance-labs/tanssi/){target=\_blank}, cloned from GitHub

You can read more about how to install the required components in the [prerequisites article](/builders/build/customize/prerequisites/){target=\_blank}.

As this article is based on the EVM template, make sure that it compiles correctly before continuing by executing the following command:

```bash
cargo build -p container-chain-template-frontier-node --release
```

## Adding a Built-in Module to the Runtime {: #adding-a-built-in-module-to-runtime }

As introduced in the [modularity](/learn/framework/modules/){target=\_blank} article, the Substrate framework already includes many built-in modules addressing a wide range of functionalities, ready to be used in your runtime.

Modules are meant to provide the functionality needed in very different use cases such as DeFi, NFTs, or any other, and, therefore, they are basic building blocks that are inherently abstract and can be configured according to the specific needs of the Tanssi appchain.

To add a module, the following steps are necessary:

1. Make the dependency available within the project by declaring it in [Cargo](https://doc.rust-lang.org/cargo/){target=\_blank}, the Rust language package manager
2. Make the standard (`std`) features of the module available to the compiler
3. Configure the module
4. Add the module to the runtime
5. Add the default configuration to the chain specification

In the following example, the popular Substrate module `pallet-assets` is added to the runtime of the provided EVM template, found in the [Tanssi repository](https://github.com/moondance-labs/tanssi/){target=\_blank}, specifically in the folder `container-chains/templates/frontier/`.

### Declare the Dependency {: #declare-dependency }

Every package contains a manifest file named `Cargo.toml` stating, among other things, all the dependencies the package relies on, and the Tanssi appchain runtime is no exception.

Therefore, the first step, is to declare the dependency and make it available to the runtime, open the `Cargo.toml` file located in the folder `container-chains/templates/frontier/runtime` with a text editor and add the module, referencing the code in the Polkadot SDK:

```toml
[dependencies]
...
pallet-assets = { 
   git = "https://github.com/moondance-labs/polkadot-sdk", 
   branch = "{{ repository.tanssi.release_branch }}", 
   default-features = false 
}
...
```

!!! note
    Our engineering team actively contributes to the Substrate development by fixing issues and enhancing functionalities. As a result, the Tanssi fork repository frequently stays ahead of the official one. That is why this example references a built-in module from a Tanssi repository instead of the official one.

### Make the Standard Features Available to the Compiler {: #standard-features }

In Cargo, the “features” flags provide a mechanism to tell the compiler to include or leave out certain portions of code, which is a useful mechanism to optimize compile time, minimize binary file sizes, or disable certain behavior (for example, not including unit testing or benchmarking functionality in the runtime intended for production).

To compile the standard features for the Assets module within the runtime, the same `Cargo.toml` file in the `runtime` folder must be edited, enabling the flag. Everything listed in this section will ensure that it is available to the compiler when building the runtime binary, which is ultimately the file containing all the information to run your Tanssi appchain initially.

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

With the dependency declared in the project, the module can now be configured and added to the runtime. To do so, you need to edit the `lib.rs` file that is located at:

```text
container-chains/templates/frontier/runtime/src/lib.rs
```

The configuration of new modules requires implementing a configuration `trait` for the module (in this example, for Assets) in the runtime, expressed in Rust as follows:

```rust
// Implements pallet_assets::Config trait in the runtime
impl pallet_assets::Config for Runtime { ... }
```

[Traits](https://doc.rust-lang.org/book/ch10-02-traits.html){target=\_blank} are a way of defining shared behavior in Rust, and in this case, they allow a new runtime to benefit from the functionality the Assets module provides only by implementing its configuration trait and parameters.

Some of the parameters the trait needs to define might be constant values, in which case, they have to be defined and enclosed within the macro `parameter_types!`, which helps us to reduce the development effort by expanding the code and converting each of the constants into the correct struct type with functions that allow the runtime to read its type and values in a standardized way.

The following code snippet shows an example of the constant definitions to be used in the configuration of the module:

```rust
parameter_types! {
   // The amount of funds that must be reserved for an asset
	pub const AssetDeposit: Balance = 100;
   // The amount of funds that must be reserved when creating 
   // a new transfer approval
	pub const ApprovalDeposit: Balance = 1;
   // The basic amount of funds that must be reserved when adding metadata 
   // to your asset
	pub const MetadataDepositBase: Balance = 10;
   // The additional funds that must be reserved for the number of bytes 
   // you store in your metadata
	pub const MetadataDepositPerByte: Balance = 1;

   // Maximum lenght for the asset symbol and friendly name
   pub const StringLimit: u32 = 50;
}
```

It is important to note that every built-in module has a different purpose, and, therefore, each of them has different needs in terms of the parameters that must be configured. The following code snippet implements the trait and configures the module Assets, using types and the constants defined previously in the `parameter_types!` macro:

```rust
// Implementing the Assets config trait for the runtime
impl pallet_assets::Config for Runtime {
   
   // Stores the balances in an unsigned integer of 128bits
	type Balance = u128;
   // The id of an asset can be defined as an unsigned integer of 64 bits
	type AssetId = u64;
   // Uses module Balances as mechanism for currency operations
	type Currency = Balances;

   // Configure the module by referencing the previously
   // defined constants

	type AssetDeposit = AssetDeposit;
	type MetadataDepositBase = MetadataDepositBase;
	type MetadataDepositPerByte = MetadataDepositPerByte;
	type ApprovalDeposit = ApprovalDeposit;
	type StringLimit = StringLimit;
   
   // More configuration
   ...
}
```

??? code "View the complete script"

    ```rust
    --8<-- 'code/builders/build/customize/built-in-module/built-in-pallet-configuration.rs'
    ```

The complete configuration of the module contains more parameters, to view a detailed description of each of them, refer to the [official config trait for the Assets module documentation](https://paritytech.github.io/substrate/master/pallet_assets/pallet/trait.Config.html){target=\_blank}.

### Add the Module to the Runtime {: #add-module-to-runtime }

In the same `lib.rs` file referenced in the previous section, there is a segment enclosed in the macro `construct_runtime!()`. This is where the pallet must be added to be included in the runtime. Since the example is based on the EVM template, the runtime is already configured to include many modules, including the modules for system support, the modules to add the Ethereum compatibility layer, the modules to support the Tanssi protocol, balances, and now also Assets:

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
      // Assets module is added here
      Assets: pallet_assets = 11,
      ...
   }
```

### Configure the Module in the Chain Specification {: #configure-chain-specs }

Finally, add the configuration in the chain specification for the genesis state in the file `chain_spec.rs` located at:

```text
container-chains/templates/frontier/node/src/chain_spec.rs
```

The function `testnet_genesis`, presented in the following code snippet, defines the initial state for the modules included in the runtime (such as initial funded accounts, for example). After adding the Assets module, it is necessary to initialize it as well, and in the following example, its default values are defined.

More about the chain specification and how to configure it will be covered in the article [Customizing Chain Specifications](/builders/build/customize/customizing-chain-specs/){target=\_blank}.

```rust hl_lines="14"
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
      // Add the default state for this module in the genesis state
      assets: Default::default()
      ...
   }
}
```

With the module included, this new runtime version has unlocked a new set of functionalities ready to be composed with even more of the Substrate built-in modules or custom-made ones.