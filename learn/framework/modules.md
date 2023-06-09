---
title: Appchain Modules (Pallets) for your Runtime
description: Substrate is a blockchain development framework that provides modules (pallets) ready to be composed with the developer's custom logic in the Appchain Runtime.
---

# Appchain Framework Modules {: #appchain-framework-modules } 

## Introduction {: #introduction } 

Substrate Framework provides complete and ready-to-use implementations of the main functions an Appchain needs to work properly, including cryptography, consensus, governance, and so on. These implementations are fully customizable and could be replaced with custom logic if needed.

When it comes to building the Runtime, which is essentially the heart of a Substrate-based blockchain, the desired state transition rules must be defined, reflecting the intended behavior and features of the blockchain. 

To build the Runtime, Substrate provides many built-in modules (called pallets) that can be freely used as building blocks to compose and interact with any other custom-made modules, allowing teams to create unique behaviors according to the specific requirements of their Appchain.

![Built-in modules](/images/learn/framework/modules/modules-1.png)

## Built-in Modules {: #built-in-modules } 

There are three categories for the included modules in the development framework:

- **System Pallets** - provide core functionality to the runtime and other pallets
- **Parachain Pallets** - provide specific functionality to Appchains willing to connect to the relay chain
- **Functional Pallets** - provide implementations for general use cases to build upon

When designing and writing the rules of the Appchain, the available set of functional pallets bring a solution to many of the coding requirements that would otherwise need to be developed from scratch.

Here is a list of some of the most used modules, but there are many more on the [Substrate Rustdocs website](https://paritytech.github.io/substrate/){target=_blank}:

- **[pallet_balances](https://paritytech.github.io/substrate/master/pallet_balances/index.html){target=_blank}** - the Balances pallet provides functions for handling accounts and balances for the Appchain native currency
- **[pallet_assets](https://paritytech.github.io/substrate/master/pallet_assets/index.html){target=_blank}** - the Assets pallet provides functions for handling any type of fungible tokens
- **[pallet_nfts](https://paritytech.github.io/substrate/master/pallet_nfts/index.html){target=_blank}** - the NFTs pallet provides functions for dealing with non-fungible tokens
- **[pallet_democracy](https://paritytech.github.io/substrate/master/pallet_democracy/index.html){target=_blank}** - the Democracy pallet provides functions to manage and administer general stakeholder voting
- **[pallet_multisig](https://paritytech.github.io/substrate/master/pallet_multisig/index.html){target=_blank}** - the Multisig pallet provides functions for multi-signature dispatch
- **[pallet_recovery](https://paritytech.github.io/substrate/master/pallet_recovery/index.html){target=_blank}** - the Recovery pallet provides functions to allow users to regain access to their accounts when the private key is lost. This works by granting other accounts the right to sign transactions on behalf of the lost account (note that it is necessary to have previously chosen the authorized accounts)
- **[pallet_staking](https://paritytech.github.io/substrate/master/pallet_staking/index.html){target=_blank}** - the Staking pallet provides functions to administer staked tokens, support rewarding, slashing, depositing, withdrawing, and so on

In addition to those previously listed, other modules like [identity](https://paritytech.github.io/substrate/master/pallet_identity/index.html){target=_blank}, [smart contracts](https://paritytech.github.io/substrate/master/pallet_contracts/index.html){target=_blank}, [vesting](https://paritytech.github.io/substrate/master/pallet_vesting/index.html){target=_blank}, and many others that are freely available can speed up the development of the Appchain and, consequently, the time to market.

