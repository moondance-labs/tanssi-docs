---
title: Baseline Appchain Template
description: The Tanssi repository includes a basic Substrate-oriented template that provides the necessary configuration to kick-start the development of an Appchain.
---

# Baseline Appchain Template {: #baseline-appchain-template }

## Introduction {: #introduction }

The Tanssi repository includes a bare minimum Substrate template that provides only the necessary configuration to support the Tanssi protocol and some essential modules, such as the one that allows handling the Appchain's currency.
This section covers this basic template, what it includes, and the considerations when adding external dependencies.

## Baseline Appchain Template {: #baseline-appchain-template }

Developing a Substrate-based runtime typically involves two primary steps:

1. [Incorporating pre-existing Substrate built-in modules](/builders/build/local/adding-built-in-pallet/){target=_blank} into the runtime
2. [Creating custom modules](/builders/build/local/adding-custom-made-module/){target=_blank} tailored to your specific application needs

Since the provided template already includes the essential configurations for seamless integration into the Polkadot ecosystem and compatibility with the Tanssi protocol, teams interested in constructing an innovative Appchain can use this template as a starting point for adding their custom logic.

Here are some of the features that come with this template:

- Utilize Tanssi's [block production as a service](/learn/tanssi/technical-features/#block-production-as-a-service){target=_blank}
- Use [Polkadot's finality gadget](https://wiki.polkadot.network/docs/learn-consensus#finality-gadget-grandpa){target=_blank}
- Benefit from [Polkadot's shared security model](https://wiki.polkadot.network/docs/learn-parachains#shared-security){target=_blank}
- Use the [Polkadot.js API](/builders/interact/substrate-api/polkadot-js-api){target=_blank} to interact with the Substrate API

By leveraging these features in the template, you can kickstart your Appchain development and customize it to meet your specific requirements and innovations.

## Included Modules {: #included-modules }

Some of the included modules are necessary for supporting the operation of the Appchain as part of the broader Polkadot ecosystem, some other modules are included to enable the Tanssi protocol and its block production mechanism, and some other modules provide functional behavior that the users can interact with. 

These are some of the functional modules exposing a behavior to the users that are included and ready to use:

- **[pallet_balances](https://paritytech.github.io/substrate/master/pallet_balances/index.html){target=_blank}** - the Balances pallet provides functions for handling accounts and balances for the Appchain native currency
- **[pallet_utility](https://paritytech.github.io/polkadot-sdk/master/pallet_utility/index.html){target=_blank}** - the Utility pallet provides functions to execute multiple calls in a single dispatch. Besides batching transactions, this module also allows the execution of a call from an alternative signed origin
- **[pallet_proxy](https://paritytech.github.io/polkadot-sdk/master/pallet_proxy/index.html){target=_blank}** - the Proxy pallet provides functions to delegate to other accounts (proxies) the permission to dispatch calls from a proxied origin.
- **pallet_maintenance_mode** - the Maintenance Mode pallet allows the Appchain to be set to a mode where it fails to execute balance/asset transfer and other transactions such as XCM calls. This could be useful when upgrading the runtime in an emergency, when executing large storage migrations, or when a security vulnerability is discovered.

## Adding External Dependencies {: #adding-external-dependencies }

The Tanssi repository and the templates take all the dependencies from the Polkadot SDK referencing [a fork](https://github.com/moondance-labs/polkadot-sdk){target=_blank} of the official Parity-owned repository. This fork is maintained by the Tanssi engineering team, which usually contributes actively to the Substrate development by fixing issues and enhancing functionalities, and, as a result, the fork repository frequently stays temporarily ahead of the official one.

A double reference issue may arise when adding an external dependency, such as a pallet from a third party. This happens if a Tanssi module references a dependency from the Polkadot SDK fork repository, and the third party references the same dependency from the official Polkadot SDK repository. To solve this issue, the references must be unified. 

To unify the references, the `Cargo.toml` file located in the root folder must include a patch section listing all the common dependencies that must be read from the overridden repository URL, like the following example:

```toml
[patch."https://github.com/paritytech/polkadot-sdk"]
sp-io = { 
    git = "https://github.com/moondance-labs/polkadot-sdk", 
    branch = "{{ repository.tanssi.release_branch }}" 
}
...
```

To easily handle the dependencies and their origins, check out the tool [diener](https://github.com/paritytech/diener){target=_blank}.
