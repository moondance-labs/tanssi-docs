---
title: Pausing Transactions
description: Learn how to use Sudo to temporarily pause hand-picked transactions, preventing their execution while allowing all other transactions to proceed as usual.
---

# Pausing Transactions

## Introduction {: #introduction }

The [Transaction Pause module](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/tx-pause/src/lib.rs){target=\_blank} is one of the [built-in modules](/learn/framework/modules/#built-in-modules){target=\_blank} included in the Polkadot SDK, and it is available in any Tanssi appchain based on the [official templates](/builders/build/templates/overview/){target=\_blank} version [400](https://github.com/moondance-labs/tanssi/releases/tag/runtime-400-templates){target=\_blank} or higher.

This module allows an appchain governor to temporarily avoid executing a set of hand-picked transactions while the rest of the transactions carry on as usual. This feature is helpful in several scenarios, such as disabling functionality in which a security threat has been discovered, enabling seasonal functionality only when needed, and enabling a set of transactions exactly on a launch date.

In an emergency scenario, when a critical exploit is discovered, this module allows the appchain to isolate and stop only the affected functionality, effectively minimizing the overall impact. 

!!! warning
    At the time of this writing, this module hasn't yet been audited; therefore, it is not recommended for production use. 

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - A Tanssi appchain (Snap or Dedicated) featuring the Transaction Pause module. Any new appchain deployment based on one of the templates will do; otherwise, make sure to [include the module](/builders/build/customize/adding-built-in-module/){target=\_blank} in your custom-made appchain runtime
 - Your appchain's Sudo account connected to your appchain's Polkadot.js Apps. You can refer to the [Managing Sudo guide](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} for instructions on injecting your Sudo account into Polkadot.js Apps

--8<-- 'text/builders/manage/locate-sudo-account.md'

## Module and Transaction Names {: #modules-transaction-names }

The [Transaction Pause module](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/tx-pause/src/lib.rs){target=\_blank} works by filtering the execution of specific transactions contained in the modules included in the appchain runtime. To do so, it keeps an internal list of the banned transactions identified by module and transaction name. This list is case-sensitive and works only when there is an exact match between one item in the paused transactions list and the transaction being processed. Therefore, using the exact names of the modules and the transactions is crucial.

To find out the names of the modules available in your runtime, you need to read the `construct_runtime!()` section in the `lib.rs` file of your appchain runtime in your project repository. If your appchain is based on one of the official templates, you'll find the file in the [Tanssi repository](https://github.com/moondance-labs/tanssi){target=\_blank}:

- For appchains based on the EVM template: [the lib.rs file](https://github.com/moondance-labs/tanssi/blob/master/container-chains/runtime-templates/frontier/src/lib.rs){target=\_blank}
- For appchains based on the Substrate template: [the lib.rs file](https://github.com/moondance-labs/tanssi/blob/master/container-chains/runtime-templates/simple/src/lib.rs){target=\_blank}

The following snippet is an example of how the `construct_runtime!()` section looks like. The module names are those located to the left of the colon.

```rust
construct_runtime!(
    pub enum Runtime
    {
        ...
        Migrations: pallet_migrations = 7,
        MaintenanceMode: pallet_maintenance_mode = 8,
        TxPause: pallet_tx_pause = 9,
        Balances: pallet_balances = 10,
        Multisig: pallet_multisig = 16,      
        ...
   }
```

To identify the transaction names included in a module, you need to refer to its source code. Modules built in [Substrate](/learn/framework/overview/#substrate-framework){target=\_blank} identify their transactions using a macro `#[pallet::call_index(INDEX)]`, where `INDEX` is a number. In the case of a [built-in module](/builders/build/customize/adding-built-in-module/){target=\_blank}, the code is located within the [FRAME folder](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame){target=\_blank} of the Polkadot-SDK repository. For example, if you want to know about the transaction names in the `Balances` module, refer to its [lib.rs](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/balances/src/lib.rs){target=\_blank} file and look for the function names below the `#[pallet::call_index(INDEX)]` macros. The following snippet is the transaction `transfer_allow_death` of the module `Balances`, which is the one used as an example in this guide:

```rust
#[pallet::call_index(0)]
pub fn transfer_allow_death(
    origin: OriginFor<T>,
    dest: AccountIdLookupOf<T>,
    #[pallet::compact] value: T::Balance,
) -> DispatchResult {
    // Code
    Ok(())
}
```

### Some Frequently Used Modules and Transactions {: #frequently-used-modules-transactions }

When using any of the built-in Substrate modules, the name with which it's referenced within the runtime is entirely up to the developer, but the transaction names aren't customizable. Here is a list of some of the most commonly used modules with the most commonly used transactions they contain. Those are the transaction names to be used in this Transaction Pause module.

???+ function "[**pallet-ethereum**](https://github.com/polkadot-evm/frontier/blob/master/frame/ethereum/src/lib.rs){target=\_blank} — This module, along with the EVM module, provides full Ethereum compatibility to the appchain"

    | Transaction Name |        Description        |
    |:----------------:|:-------------------------:|
    |    `transact`    | Executes an Ethereum call |

??? function "[**pallet_balances**](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/balances/src/lib.rs){target=\_blank} — This module provides functionality for handling accounts and balances for the Tanssi appchain native currency"

    |    Transaction Name    |                                                                 Description                                                                  |
    |:----------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|
    | `transfer_allow_death` |      Executes a balance transfer, deleting the sender's account when its final balance goes below the minimal requirement for existence      |
    | `transfer_keep_alive`  | Executes a balance transfer, keeping the sender's account alive even when its final balance goes below the minimal requirement for existence |
    |     `transfer_all`     |                                              Transfer all non-locked balances to a destination                                               |
    |         `burn`         |                                     Burns balance from the origin's account, reducing the total issuance                                     |

??? function "[**pallet_assets**](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/assets/src/lib.rs){target=\_blank} — This module provides functionality for handling fungible tokens"

    |   Transaction Name    |                                                                Description                                                                 |
    |:---------------------:|:------------------------------------------------------------------------------------------------------------------------------------------:|
    |       `create`        |                                                   Issues a new class of fungible assets                                                    |
    |    `start_destroy`    |                                          Starts the process of destroying a fungible asset class                                           |
    |  `destroy_accounts`   |                       Destroys all accounts associated with a given asset for which the destroy process was started                        |
    |  `destroy_approvals`  |                       Destroys all approvals associated with a given asset for which the destroy process was started                       |
    |   `finish_destroy`    |                          Completes the destroy process of a given asset for which the destroy process was started                          |
    |        `mint`         |                                                                Mints assets                                                                |
    |        `burn`         |                                                                Burns assets                                                                |
    |      `transfer`       |      Executes an asset transfer deleting the sender's account when its final balance goes below the minimal requirement for existence      |
    | `transfer_keep_alive` | Executes an asset transfer keeping the sender's account alive even when its final balance goes below the minimal requirement for existence |
    |       `freeze`        |                                          Disallows transfers of an asset from a specific account                                           |
    |        `thaw`         |                                         Allows again transfers of an asset from a specific account                                         |
    |    `freeze_asset`     |                                                      Disallows transfers of an asset                                                       |
    |     `thaw_asset`      |                                                     Allows again transfers of an asset                                                     |
    |    `set_metadata`     |                                                       Sets the metadata for an asset                                                       |
    |   `clear_metadata`    |                                                      Clears the metadata for an asset                                                      |
    
??? function "[**pallet_nfts**](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/nfts/src/lib.rs){target=\_blank} — This module provides functions for handling non-fungible tokens"

    |      Transaction Name       |                        Description                         |
    |:---------------------------:|:----------------------------------------------------------:|
    |          `create`           |       Issues a new collection of non-fungible items        |
    |          `destroy`          |        Destroys a collection of non-fungible items         |
    |           `mint`            |            Mints an item in an NFT collection              |
    |           `burn`            |          Destroys an item from an NFT collection           |
    |         `transfer`          |                      Transfers an NFT                      |
    |    `lock_item_transfer`     |              Disallow the transfer of an item              |
    |   `unlock_item_transfer`    |         Allows again the transfer of a locked item         |
    |       `set_attribute`       |     Sets an attribute for an NFT collection or an item     |
    |      `clear_attribute`      |    Clears an attribute for an NFT collection or an item    |
    |       `set_metadata`        |               Sets the metadata for an item                |
    |      `clear_metadata`       |              Clears the metadata for an item               |
    |  `set_collection_metadata`  |  Sets the metadata for a collection of non-fungible items  |
    | `clear_collection_metadata` | Clears the metadata for a collection of non-fungible items |
    |         `set_price`         |                 Sets the price for an item                 |
    |         `buy_item`          |        Buy an item, provided that it's up for sale         |

??? function "[**pallet_multisig**](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/multisig/src/lib.rs){target=\_blank} — This module provides functions for dealing with multi-signature schemas"

    |    Transaction Name    |                                                                 Description                                                                  |
    |:----------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|
    | `as_multi_threshold_1` |                                           Registers a multi-signature call with a single approval                                            |
    |       `as_multi`       | Registers a multi-signature call to be made from a composite account if approved by the specified minimum threshold of the other signatories |
    |   `approve_as_multi`   |              Registers approval for a multi-signature call and dispatches the call when the threshold of signatories is reached              |
    |   `cancel_as_multi`    |                                         Cancels a pre-existing, ongoing multi-signature transaction                                          |

## Pausing Transactions {: #pausing-transactions }

As you know, the Sudo account [can perform privileged actions](/builders/manage/developer-portal/sudo/){target=\_blank}, such as appchain upgrades, minting new tokens, and, in this case, pausing and unpausing transactions.

To pause a transaction, navigate to the **Developer** tab of Polkadot.js Apps for your Tanssi appchain and click on **Sudo**. If you do not see **Sudo** in this menu, you have not associated the Sudo account with Polkadot.js Apps. Make sure that your [Sudo account is injected by your wallet and connected to Polkadot.js Apps](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}. Then, take the following steps:

1. Select the **txPause** module
2. Select the **pause** method
3. Insert the **module** name that contains the transaction that will be paused
4. Insert the **transaction** name that will be paused
5. Press **Submit Sudo** and confirm the transaction in the resulting pop-up

In this example, the transaction paused is `transfer_allow_death` from the `Balances` module:

![Pause transaction](/images/builders/manage/developer-portal/pause-transactions/pause-transactions-2.webp)

To verify that the transaction has been effectively paused, try executing it. You should get an error.

![Check that the transaction is paused](/images/builders/manage/developer-portal/pause-transactions/pause-transactions-3.webp)

!!! warning
    The `pause` transaction doesn't verify the module or transaction names and is case-sensitive, so any misspelling will go unnoticed, and the transaction will execute successfully. You should always verify that the transaction has been effectively paused.

## Unpausing Transactions {: #unpausing-transactions }

To unpause a transaction and return it to normal operation, navigate to the **Developer** tab of Polkadot.js Apps for your Tanssi appchain and click on **Sudo**. If you do not see **Sudo** in this menu, you have not associated the Sudo account with Polkadot.js Apps. Make sure that your [Sudo account is injected by your wallet and connected to Polkadot.js Apps](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}. Then, take the following steps:

1. Select the **txPause** module
2. Select the **unpause** method
3. Insert the **module** name that contains the transaction that will be unpaused
4. Insert the **transaction** name that will be unpaused
5. Press **Submit Sudo** and confirm the transaction in the resulting pop-up

In this example, the transaction to unpause is `transfer_allow_death` from the `Balances` module:

![Unpause transaction](/images/builders/manage/developer-portal/pause-transactions/pause-transactions-4.webp)

The `unpause` transaction executes successfully only if the module and transaction parameters have been previously paused; otherwise, it fails. After the successful unpausing, the transaction can be called and executed again.

And that's it! The [Developer Portal](/builders/manage/developer-portal/) section has plenty more guides on how to manage your Tanssi appchain.

--8<-- 'text/_disclaimers/third-party-content.md'
