---
title: Appchain Modules for your Runtime
description: Substrate is a modular blockchain development framework with an extensive set of ready-to-use components to bundle with custom logic into the appchain Runtime.
---

# Appchain Framework Modules {: #appchain-framework-modules }

## Introduction {: #introduction }

Substrate Framework provides complete and ready-to-use implementations of the main functions a Tanssi appchain needs to work properly, including cryptography, consensus, governance, and so on. These implementations are fully customizable and could be replaced with custom logic if needed.

When it comes to building the Runtime, which is essentially the heart of a Tanssi appchain, the desired state transition rules must be defined, reflecting the intended behavior and features of the blockchain.

To build the Runtime, Substrate provides many built-in modules (AKA pallets) that can be freely used as building blocks to compose and interact with any other custom-made modules, allowing teams to create unique behaviors according to the specific requirements of their Tanssi appchain.

![Built-in modules](/images/learn/framework/modules/modules-1.webp)

## Built-in Modules {: #built-in-modules }

When designing and writing the rules of a Tanssi appchain, the available set of functional modules brings a solution to many of the coding requirements that would otherwise need to be built from scratch.

Here is a list of some of the most popular modules:

- **[pallet_balances](https://paritytech.github.io/substrate/master/pallet_balances/index.html){target=\_blank}** - the Balances modules provides functions for handling accounts and balances for the Tanssi appchain native currency
- **[pallet_assets](https://paritytech.github.io/substrate/master/pallet_assets/index.html){target=\_blank}** - the Assets module provides functions for handling any type of fungible tokens
- **[pallet_nfts](https://paritytech.github.io/substrate/master/pallet_nfts/index.html){target=\_blank}** - the NFTs module provides functions for dealing with non-fungible tokens
- **[pallet_democracy](https://paritytech.github.io/substrate/master/pallet_democracy/index.html){target=\_blank}** - the Democracy module provides functions to manage and administer general stakeholder voting
- **[pallet_multisig](https://paritytech.github.io/substrate/master/pallet_multisig/index.html){target=\_blank}** - the Multisig module provides functions for multi-signature dispatch
- **[pallet_recovery](https://paritytech.github.io/substrate/master/pallet_recovery/index.html){target=\_blank}** - the Recovery module provides functions to allow users to regain access to their accounts when the private key is lost. This works by granting other accounts the right to sign transactions on behalf of the lost account (note that it is necessary to have previously chosen the authorized accounts)
- **[pallet_staking](https://paritytech.github.io/substrate/master/pallet_staking/index.html){target=\_blank}** - the Staking module provides functions to administer staked tokens, support rewarding, slashing, depositing, withdrawing, and so on

In addition to those previously listed, other modules like [identity](https://paritytech.github.io/substrate/master/pallet_identity/index.html){target=\_blank}, [smart contracts](https://paritytech.github.io/substrate/master/pallet_contracts/index.html){target=\_blank}, [vesting](https://paritytech.github.io/substrate/master/pallet_vesting/index.html){target=\_blank}, and many others that are freely available can speed up the development of the Tanssi appchain and, consequently, the time to market.

!!! note
    The framework also includes other modules that provide core protocol functionality, such as consensus and low-level data encoding.

## Custom-Made Modules {: #custom-modules }

Developers creating new modules enjoy complete freedom to express any desired behavior in the core logic of the blockchain, like exposing new transactions, storing sensible information, and validating and enforcing business logic.

As explained in the [Architecture](/learn/framework/architecture/#client-runtime-communication){target=\_blank} article, a module needs to be able to communicate with the core client by exposing and integrating with a very specific API that allows the runtime to expose transactions, access storage, and code and decode information stored on-chain. It also needs to include many other required wiring codes that make the module work in the node.

To improve developer experience when writing modules, Substrate relies heavily on [Rust macros](https://doc.rust-lang.org/book/ch19-06-macros.html){target=\_blank}. Macros are special instructions that automatically expand to Rust code just before compile-time, allowing modules to keep up to seven times the amount of code out of sight of the developers. This allows developers to focus on the specific functional requirements when writing modules instead of dealing with technicalities and the necessary scaffolding code.

All modules in Substrate, including custom-made ones, implement these attribute macros, of which the first three are mandatory:

--8<-- 'text/builders/build/customize/custom-made-module/pallets-macros-descriptions.md'

All these macros act as attributes that must be applied to the code just above Rust modules, functions, structures, enums, types, etc., allowing the module to be built and added to the runtime, which, in time, will expose the custom logic to the outer world, as exposed in the following section.

### Custom Module Example { #custom-module-example }

As an example of a custom module, the following code (not intended for production use) showcases the use of the previously mentioned macros by presenting a simple lottery with minimal functionality, exposing two transactions:

- **buy_ticket** - this transaction verifies that the user signing the request has not already bought a ticket and has enough funds to pay for it. If everything is fine, the module transfers the ticket price to a special account and registers the user as a participant for the prize

- **award_prize** - this transaction generates a random number to pick the winner from the list of participants. The winner gets the total amount of the funds transferred to the module's special account

```rust
--8<-- 'code/builders/build/customize/custom-made-module/lottery-example.rs'
```

For more information about the step-by-step process of creating a custom-made module to the runtime, please refer to the [Adding a Custom-Made Module](/builders/build/customize/adding-custom-made-module/){target=\_blank} in the Builder's section.
