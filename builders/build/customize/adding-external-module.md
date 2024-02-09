---
title: Adding External Modules
description: Learn how to manage and resolve double reference issues of dependencies when customizing your Tanssi Appchain template with a Rust-based tool called Diener.
---

# Adding an External Module {: #adding-external-module }

## Introduction {: #introduction }

Developers building on top of the [Templates offered by Tanssi](/builders/build/templates/){target=\_blank} might want to add some external modules/dependencies into their runtime to expand certain functionality.

The Tanssi repository and the templates take all the dependencies from [a fork](https://github.com/moondance-labs/polkadot-sdk){target=\_blank} of the official Polkadot SDK repository. This fork is maintained by the Tanssi engineering team, which usually contributes actively to Substrate development by fixing issues and enhancing functionalities, and, as a result, the fork repository frequently stays temporarily ahead of the official one.

A double reference issue may arise when adding an external dependency, such as a pallet from a third party. This happens if a Tanssi module references a dependency from the Polkadot SDK fork repository, and the third party references the same dependency from the official Polkadot SDK repository. To solve this issue, the references to the dependencies must be unified.

## Solving Dependencies Conflicts with Diener {: #solving-dependencies-conflicts-diener }

To efficiently handle the dependencies and their origins, you can check out the tool [diener](https://github.com/paritytech/diener){target=\_blank}. 

If the `diener` executable file, the cloned [Polkadot SDK repository](https://github.com/paritytech/polkadot-sdk){target=\_blank}, and your Tanssi fork are located in the same folder, step into the Tanssi fork folder and execute the following command:

```bash
../diener patch --crates-to-patch ../polkadot-sdk \
    --target https://github.com/paritytech/polkadot-sdk \
    --point-to-git https://github.com/moondance-labs/polkadot-sdk \
    --point-to-git-branch {{ repository.tanssi.release_branch }}
```

This command applies the changes to the `Cargo.toml` file, patching the dependencies, and solving the double reference issues.

You can visit the [diener documentation](https://docs.rs/crate/diener/latest){target=\_blank} to learn more about the tool and other extra functions it offers.

## Example of the Double Reference Issue {: #double-reference-issue }

To illustrate the situation, the following steps add a demo [external module](https://github.com/papermoonio/pallet-toggle.git){target=\_blank} to a custom runtime based on the [baseline Appchain template](/builders/build/templates/substrate/){target=\_blank}. One way to follow this tutorial is to clone the [Tanssi Github repository](https://github.com/moondance-labs/tanssi){target=\_blank}, which will act as the root repository of the project.

This tutorial will generate a multiple reference compile-time error. Finally, the steps will show you how to fix the compile error by patching the dependencies with the tool `diener`, the runtime will compile successfully and work as intended.

### Add a Third-Party Dependency {: #add-third-party-dependency }

Similarly to what is described in the [built-in module](/builders/build/customize/adding-built-in-module/#adding-a-built-in-module-to-runtime){target=\_blank} article, adding a third-party module requires the following steps:

1. Declare the dependency in the root `Cargo.toml` file
2. Make the standard features available to the compiler
3. Configure and add the module to the runtime

Should the third-party module reference any dependency already referenced from a distinct source or version, compilation will fail. 

The following diagram shows how two different references to the same dependency are being included in the runtime, causing the compilation to fail:

![Double reference](/images/builders/build/external-module/external-module-1.webp)

To resolve this issue, it will be necessary to apply a patch so that the references for the dependency are unified:

![Patched reference](/images/builders/build/external-module/external-module-2.webp)

### Declaring the Dependency {: #declaring-dependency }

The first step to reproduce the double reference issue is to declare the dependency in the `Cargo.toml` file located in the repository's root folder, under the section `[dependencies]`. For this example, a simple [toggle module](https://github.com/papermoonio/pallet-toggle.git){target=\_blank} is used. 

This `toggle` module, built for testing and educational purposes, adds basic logic to the runtime, allowing users to switch a state between true and false.

```toml
[dependencies]
...
pallet-toggle = { 
    git = "https://github.com/papermoonio/pallet-toggle.git", 
    default-features = false 
}
...
```

### Make the Standard Features Available to the Compiler {: #add-standard-features }

Having declared the module in the workspace `Cargo.toml` file, the dependency can now be added to the specific template `Cargo.toml` file, which, for this example that uses the Tanssi GitHub repo, is located in the folder `container-chains/templates/simple/runtime`.

```toml
[dependencies]
...
pallet-toggle = { workspace = true }
...
```

In the same `Cargo.toml` file, add the following features.

```toml
[features]
default = [
	"std",
]
std = [
	...,
	"pallet-toggle/std",
   ...
]
...
runtime-benchmarks = [
	...,
	"pallet-toggle/runtime-benchmarks",
]

try-runtime = [
	...,
	"pallet-toggle/try-runtime",
]
```

### Configure and Add the Module to the Runtime {: #configure-module-in-the-runtime }

Next, add the following snippet to the `lib.rs` file inside the runtime folder. This configures the module and adds the module within the `construct_runtime!` macro.

```rust
...
impl pallet_template::Config for Runtime {
	type RuntimeEvent = RuntimeEvent;
	type WeightInfo = pallet_template::weights::SubstrateWeight<Runtime>;
}

construct_runtime!(
    pub enum Runtime
    {
        ...
        ...
        Toggle: pallet_toggle,
    }
);
```

### Compile Runtime {: #compile-runtime }

After completing the preceding steps, the module is declared a dependency in the project, configured, and added to the runtime. 

Compile the template using the following command:

```bash
cargo build -p container-chain-template-simple-node --release
```

The terminal output will display an error, similar to the following, caused by different modules referencing different versions of the same dependency:

```bash
error: failed to select a version for `syn`.
```

### Patch Dependencies {: #patch-dependencies }

Finally, executing the `diener` [command](#solving-dependencies-conflicts-diener) will add a `patch` section to your workspace `Cargo.toml` file, overriding the dependencies and unifying origins and versions.

This is what the execution in the terminal looks like:

--8<-- 'code/builders/build/customize/adding-external-module/terminal/patching.md'

As shown in the terminal output, `diener` adds a patch for the dependencies, creating a `patch` section in your `toml` overriding their origin:

```toml
[patch."https://github.com/paritytech/polkadot-sdk"]
bridge-runtime-common = { git = "https://github.com/moondance-labs/polkadot-sdk" , branch = "tanssi-polkadot-v1.3.0" }
bp-header-chain = { git = "https://github.com/moondance-labs/polkadot-sdk" , branch = "tanssi-polkadot-v1.3.0" }
bp-runtime = { git = "https://github.com/moondance-labs/polkadot-sdk" , branch = "tanssi-polkadot-v1.3.0" }
...
```

Finally, compiling will succeed, and the module will be built into your runtime.