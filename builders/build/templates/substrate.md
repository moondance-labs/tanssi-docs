---
title: Baseline Appchain Template
description: The Tanssi repository includes a basic Substrate-oriented template that provides the necessary configuration to kick-start the development of an Appchain.
---

# Baseline Appchain Template {: #baseline-appchain-template }

## Introduction {: #introduction }

The Tanssi repository includes a bare minimum Substrate template that provides the necessary configuration to support the Tanssi protocol and some essential modules, such as the one that allows handling the Tanssi Appchain's currency.

This section covers this basic template, what it includes, and some aspects to consider when adding external dependencies.

## Baseline Appchain Template {: #baseline-appchain-template }

Developing a Substrate-based runtime typically involves two primary steps:

1. [Incorporating pre-existing Substrate built-in modules](/builders/build/customize/adding-built-in-module/){target=\_blank} into the runtime
2. [Creating custom modules](/builders/build/customize/adding-custom-made-module/){target=\_blank} tailored to your specific application needs

Since the provided template already includes the essential configurations for seamless integration into the Polkadot ecosystem and compatibility with the Tanssi protocol, teams interested in constructing an innovative Tanssi Appchain can use this template as a starting point for adding their custom logic.

Here are some of the features that come with this template:

- Utilize Tanssi's [block production as a service](/learn/tanssi/technical-features/#block-production-as-a-service){target=\_blank}
- Use [Polkadot's finality gadget](https://wiki.polkadot.network/docs/learn-consensus#finality-gadget-grandpa){target=\_blank}
- Benefit from [Polkadot's shared security model](https://wiki.polkadot.network/docs/learn-parachains#shared-security){target=\_blank}
- Use the [Polkadot.js API](/builders/interact/substrate-api/polkadot-js-api){target=\_blank} to interact with the Substrate API

By leveraging these features in the template, you can kickstart your Tanssi Appchain development and customize it to meet your specific requirements and innovations.

## Included Modules {: #included-modules }

Some of the included modules are necessary for supporting the operation of the Tanssi Appchain as part of the broader Polkadot ecosystem, some other modules are included to enable the Tanssi protocol and its block production mechanism, and some other modules provide functional behavior that the users can interact with. 

These are some of the functional modules exposing a behavior to the users that are included and ready to use:

- **[pallet_balances](https://paritytech.github.io/substrate/master/pallet_balances/index.html){target=\_blank}** - the Balances pallet provides functions for handling accounts and balances for the Tanssi Appchain native currency
- **[pallet_utility](https://paritytech.github.io/polkadot-sdk/master/pallet_utility/index.html){target=\_blank}** - the Utility pallet provides functions to execute multiple calls in a single dispatch. Besides batching transactions, this module also allows the execution of a call from an alternative signed origin
- **[pallet_proxy](https://paritytech.github.io/polkadot-sdk/master/pallet_proxy/index.html){target=\_blank}** - the Proxy pallet provides functions to delegate to other accounts (proxies) the permission to dispatch calls from a proxied origin
- **[pallet_maintenance_mode](https://github.com/moondance-labs/moonkit/blob/tanssi-polkadot-v1.3.0/pallets/maintenance-mode/src/lib.rs){target=\_blank}** - the Maintenance Mode pallet allows the Tanssi Appchain to be set to a mode where it doesn't execute balance/asset transfers or other transactions, such as XCM calls. This could be useful when upgrading the runtime in an emergency, when executing large storage migrations, or when a security vulnerability is discovered
- **[pallet_tx_pause](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/tx-pause/src/lib.rs){target=\_blank}** - the Tx Pause pallet allows a valid origin (typically Root) to pause (and unpause) an entire module or a single transaction. A paused transaction (or all the transactions included in a paused pallet) will fail when called until it is unpaused. This module provides a higher degree of granularity compared to maintenance mode, making it particularly useful when a faulty or vulnerable transaction is identified in the runtime

## Adding Extra Dependencies {: #adding-extra-dependencies }

The Substrate Appchain template is meant to be built on top of, as the included modules are just for basic functionality and to ensure it is compatible with Tanssi.

To learn how to add new functionalities to your runtime, check the [customize runtime](/builders/build/customize/){target=\_blank} section.