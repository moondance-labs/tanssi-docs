---
title: Prerequisites for building a ContainerChain
description: Install the basic set of tools and software to set up a local development environment and be able to compile, run, and test your ContainerChain.
---

# Prerequisites for Building a ContainerChain {: #prerequisites } 

## Introduction {: #introduction } 

Deploying a ContainerChain through Tanssi is a fairly straightforward step, where the only requirement is to have a valid [chain specification](https://docs.substrate.io/build/chain-spec/){target=_blank} to upload to the Tanssi network and make it go live.

Even though Tanssi provides chain specifications for the available templates, it could be necessary to generate a new one to match any changes the use case might need to be implemented in the runtime.

The following sections of this article will cover the minimal required software and its installation process to get a suitable development environment to compile a Substrate node and generate the chain specification.

## Installing Rust {: #installing-rust } 

[Rust](/learn/framework/overview/#rust-programming-language) is a modern, portable, and performant programming language that is the base of the Substrate blockchain development framework.  

To compile the Appchain, the rust compiler, `rustc`, and the package manager, `cargo`, must be installed on the system. 


In accordance with the instructions described in the [official Rust documentation](https://www.rust-lang.org/tools/install){target=_blank}, for any system running Linux or MacOS, the following command will do:

=== "Linux"
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```
=== "MacOS"
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

When the installation process is completed, running the following command verifies that the newly installed compiler works correctly by showing the version number:

=== "Linux"
    ```bash
    rustc --version
    ```
=== "MacOS"
    ```bash
    rustc --version
    ```

There are other methods to install Rust, such as using a package manager. Other options can be found on the [Rust official site](https://forge.rust-lang.org/infra/other-installation-methods.html){target=_blank}.

## Installing Git {: #installing-git } 

[Git](https://git-scm.com/){target=_blank} is recommended to clone the [code repository](https://github.com/moondance-labs/tanssi){target=_blank} of Tanssi, where the node templates can be found. Git is likely shipped within the default OS installation configuration or included in other tools, such as Xcode in MacOS.

If Git is not present on the system, the following command will install it using a package manager:

=== "Linux (Ubuntu/Debian)"

    ```bash
    apt-get install git
    ```     
=== "MacOS"

    ```bash
    brew install git
    ```     

## Verifying the Development Environment {: #verifying-dev-environment} 

With these essential tools installed, the development environment should be ready to work with Substrate and generate new custom chain specifications. To check whether your local development environment is good to go, you can try compiling the Tanssi node or one of the [included templates](/learn/tanssi/included-templates).

The following commands build the EVM-compatible template and generate the chain specification:

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