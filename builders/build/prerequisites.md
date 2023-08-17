---
title: Prerequisites for building a ContainerChain
description: Install the basic set of tools and software to set up a local development environment and be able to compile, run, and test your ContainerChain.
---

# Prerequisites for Building a ContainerChain {: #prerequisites }

## Introduction {: #introduction }

Deploying a ContainerChain through Tanssi is a fairly straightforward step, where the only requirement is to have a valid [chain specification](https://docs.substrate.io/build/chain-spec/){target=_blank} to upload to the Tanssi network and make it go live.

Even though Tanssi provides chain specifications for the [available templates](/learn/tanssi/included-templates), it could be necessary to generate a new one to match any changes the use case might need to be implemented in the runtime.

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

=== "Linux"

    ```bash
    apt-get install git
    ```

=== "MacOS"

    ```bash
    brew install git
    ```     

To check the correct installation of Git, running the following command in a terminal should display the Git version:

=== "Linux"

    ```bash
    git --version
    ```

=== "MacOS"

    ```bash
    git --version
    ```

## Verifying the Development Environment {: #verifying-dev-environment}

With these essential tools installed, the development environment should be ready to work with Substrate and generate new custom chain specifications.

To check whether your local development environment is good to go, you can try generating the chain specs file by following the steps described in the [basic Substrate](/builders/build/substrate#generating-the-chain-spec) article.
