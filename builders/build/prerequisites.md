---
title: Prerequisites
description: Install the basic set of tools and software to set up a local development environment and be able to compile, run and test your ContainerChain.
---

# Prerequisites {: #prerequisites } 

## Introduction {: #introduction } 

Deploying a ContainerChain through Tanssi is a fairly straightforward step, where the only requirement is to have a valid [chain specification](https://docs.substrate.io/build/chain-spec/){target=_blank} to upload to the Tanssi network and make it go live.

To generate a Substrate chain specification, it is necessary to have a development environment where a substrate node can be compiled, and, to do so, the minimal required software and its installation process will be covered in the next sections of this article.

## Rust {: #rust } 

[Rust](/learn/framework/overview/#rust-programming-language) is a modern, portable, and performant programming language that is the base of the Substrate blockchain development framework.  

To compile the Appchain, the rust compiler *rustc*, and the package manager *cargo* must be installed in the system. 

### Installing Rust via *rustup* {: #install-via-rustup } 

For any system running Linux or MacOS, the following command will do:

=== "Linux & MacOS"

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```     

When the installation process is completed, running the following command verifies that the newly installed compiler works correctly by showing the version number:

=== "Linux & MacOS"

```bash
rustc --version
```     

There are other methods to install Rust, such as using a package manager. Other options can be found on the [Rust official site](  https://forge.rust-lang.org/infra/other-installation-methods.html){target=_blank}.

## Installing Git {: #installing-git } 

Git is recommended to clone the [code repository](https://github.com/moondance-labs/tanssi){target=_blank} of Tanssi, where the node templates can be found. Git is likely shipped within the default OS installation configuration, or included in other tools, such as Xcode in MacOS.

If Git is not present in the system, the following command will install it using a package manager:

=== "Linux (Ubuntu/Debian)"

    ```bash
    apt-get install git
    ```     
=== "MacOS"

    ```bash
    brew install git
    ```     

## Checking the installation {: #checking-installation } 

With these essential tools installed, the development environment is ready to compile the Tanssi node or one of the included templates.

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

After completing these steps, open the *chain_spec.json* file with your preferred text editor.