---
title: Baseline Appchain Template
description: The Tanssi repository includes a basic Substrate-oriented template that provides the necessary configuration to kick-start the development of an appchain.
---

# Baseline Appchain Template {: #baseline-appchain-template }

## Introduction {: #introduction }

The Tanssi repository includes a bare minimum Substrate template that provides the necessary configuration to support the Tanssi protocol and some essential modules, such as the one that allows handling the Tanssi appchain's currency.

This section covers this basic template, what it includes, and some aspects to consider when adding external dependencies.

## Baseline Appchain Template {: #baseline-appchain-template }

Developing a Substrate-based runtime typically involves two primary steps:

1. [Incorporating pre-existing Substrate built-in modules](/builders/build/customize/adding-built-in-module/){target=\_blank} into the runtime
2. [Creating custom modules](/builders/build/customize/adding-custom-made-module/){target=\_blank} tailored to your specific application needs

Since the provided template already includes the essential configurations for seamless integration into the Polkadot ecosystem and compatibility with the Tanssi protocol, teams interested in constructing an innovative Tanssi appchain can use this template as a starting point for adding their custom logic.

Here are some of the features that come with this template:

- Utilize Tanssi's [block production as a service](/learn/tanssi/technical-features/#block-production-as-a-service){target=\_blank}
- Use [Polkadot's finality gadget](https://wiki.polkadot.network/docs/learn-consensus#finality-gadget-grandpa){target=\_blank}
- Benefit from [Polkadot's shared security model](https://wiki.polkadot.network/docs/learn-parachains#shared-security){target=\_blank}
- Use the [Polkadot.js API](/builders/toolkit/substrate-api/libraries/polkadot-js-api){target=\_blank} to interact with the Substrate API

By leveraging these features in the template, you can kickstart your Tanssi appchain development and customize it to meet your specific requirements and innovations.

## Adding Extra Dependencies {: #adding-extra-dependencies }

The Substrate appchain template includes all the required modules and configurations that make it compatible with the Tanssi protocol, and also [many other modules](/builders/build/templates/overview/#included-modules){target=\_blank} that provide basic functionalities.

This template is meant to be built on top of it, as most use cases require expanded capabilities, adding existing or custom modules. To learn how to add new functionalities to your runtime, check the [customize runtime](/builders/build/customize/){target=\_blank} section.