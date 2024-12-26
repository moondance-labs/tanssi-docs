---
title: Baseline Network Template
description: The Tanssi repository includes a basic template that provides the necessary configuration to support the protocol and kick-start the development of a network.
---

# Baseline Network Template {: #baseline-network-template }

## Introduction {: #introduction }

The Tanssi repository includes a bare minimum template that provides the necessary configuration to support the Tanssi protocol and some essential modules, such as the one that allows handling the Tanssi network's currency.

This section covers this basic template, what it includes, and some aspects to consider when adding external dependencies.

## Baseline Network Template {: #baseline-network-template }

Developing a network runtime typically involves two primary steps:

1. [Incorporating pre-existing built-in modules](/builders/build/customize/adding-built-in-module/){target=\_blank} into the runtime
2. [Creating custom modules](/builders/build/customize/adding-custom-made-module/){target=\_blank} tailored to your specific application needs

Since the provided template already includes the essential configurations for seamless integration with the Tanssi protocol and the security provider (for example, [Symbiotic](https://symbiotic.fi/){target=\_blank} on Ethereum), teams interested in constructing an innovative Tanssi-powered network can use this template as a starting point for adding their custom logic.

Here are some of the features that come with this template:

- Utilize Tanssi's [block production as a service](/learn/tanssi/network-services/block-production/){target=\_blank}
- Choose the security provider that best fits your needs. For example, leverage Ethereum-grade security from [Symbiotic](https://symbiotic.fi/){target=\_blank}
- Get deterministic transaction finality in seconds
- Build dApps interacting with your network through an [API](/builders/toolkit/substrate-api/libraries/polkadot-js-api/){target=\_blank}

By leveraging these features in the template, you can kickstart your Tanssi network development and customize it to meet your specific requirements and innovations.

## Adding Extra Dependencies {: #adding-extra-dependencies }

The Substrate network template includes all the required modules and configurations that make it compatible with the Tanssi protocol, and also [many other modules](/builders/build/templates/overview/#included-modules){target=\_blank} that provide basic functionalities.

This template is designed to serve as a foundation to build upon, as most use cases require expanded capabilities, adding existing or custom modules. To learn how to add new functionalities to your runtime, check the [customize runtime](/builders/build/customize/){target=\_blank} section.
