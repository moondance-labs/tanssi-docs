---
title: Pausing Transactions or Modules
description: Learn how to use Sudo to pause hand-picked transactions (or even entire modules), preventing their execution while all the other transactions work normally.
---

# Pausing Transactions or Modules

## Introduction {: #introduction }

The [Tx-pause module](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/tx-pause/src/lib.rs){target=\_blank} is one of the [built-in modules](/learn/framework/modules/#built-in-modules){target=\_blank} included in the Polkadot SDK and became available in any Tanssi appchain based on a template version [400](https://github.com/moondance-labs/tanssi/releases/tag/runtime-400-templates){target=\_blank} or higher.

This module allows an appchain to avoid momentarily the execution of a set of hand-picked transactions, or even disable complete modules along with their included transactions while the rest of the transactions can keep working and being called as usual. This feature is useful in several scenarios, such as disabling functionality in which a security threat has been discovered, enabling seasonal functionality disabling it when it is no longer needed, enabling a set of transactions exactly on a launch date, and so on.

In an emergency scenario, when a critical exploit is discovered, this module allows the appchain to isolate and stop only the affected functionality, effectively minimizing the impact. 

!!! warning
    At the time of the writing this module hasn't yet been audited, therefore, It is not recommended for production use. 

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - A Tanssi appchain (Snap or Dedicated)
 - Your appchain's Sudo account connected to your appchain's Polkadot.js Apps. You can refer to the [Managing Sudo guide](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps){target=\_blank} for instructions on injecting your Sudo account into Polkadot.js Apps

If you're unsure what your Tanssi appchain's Sudo account is, you can find it in your [Tanssi Dashboard](https://apps.tanssi.network/){target=\_blank} underneath the **Properties** section.

![Locating your Sudo address on apps.tanssi.network](/images/builders/manage/sudo/maintenance/maintenance-1.webp)

!!! warning
    It's critical to protect your Sudo account key with the utmost security precautions, as it grants privileged access to your Tanssi appchain.

## Pausing Transactions {: #pausing-transactions }

As you know, the Sudo account can perform privileged functions, such as pausing and unpausing transactions. To pause a transaction, navigate to the **Developer** tab of Polkadot.js Apps for your Tanssi appchain and click on **Sudo**. If you do not see **Sudo** in this menu, you have not associated the Sudo account with Polkadot.js Apps. Make sure that your [Sudo account is injected by your wallet and connected to Polkadot.js Apps](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps){target=\_blank}. Then, take the following steps:

1. Select the **txPause** pallet
2. Select the **pause** method
3. Insert the **transaction** that will be paused, in this example, `transferAllowDeath` from the `balances` module
4. Press **Submit Sudo** and confirm the transaction in the resulting pop-up

![Pause transaction](/images/builders/manage/sudo/maintenance/maintenance-2.webp)

To verify that the transaction has been effectively paused, you can try executing it and you should see an error.

![Check transaction is paused](/images/builders/manage/sudo/maintenance/maintenance-3.webp)

## Unpausing Transactions {: #unpausing-transactions }

To unpause a transaction and return it to normal operation, navigate to the **Developer** tab of Polkadot.js Apps for your Tanssi appchain and click on **Sudo**. If you do not see **Sudo** in this menu, you have not associated the Sudo account with Polkadot.js Apps. Make sure that your [Sudo account is injected by your wallet and connected to Polkadot.js Apps](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps){target=\_blank}. Then, take the following steps:

1. Select the **txPause** pallet
2. Select the **unpause** method
3. Select the **unpause** method
4. Press **Submit Sudo** and confirm the transaction in the resulting pop-up

![Exit maintenance mode](/images/builders/manage/sudo/maintenance/maintenance-4.webp)

To verify that maintenance mode has been disabled, you can check in the **Explorer** section under the **Network** tab and review the recent events. 

![Check maintenance mode is disabled](/images/builders/manage/sudo/maintenance/maintenance-5.webp)

Remember that using maintenance mode is an emergency action that should only be activated when your chain is at dire risk. It may be worthwhile to establish a policy for your appchain that sets specific circuit breaker triggers to determine when maintenance mode will be enabled. Establishing a policy in advance will also streamline decision-making during a potential emergency.  

And that's it! The [Using Sudo](/builders/manage/sudo/) section has plenty more guides on using the Sudo account to manage your Tanssi appchain.

--8<-- 'text/_disclaimers/third-party-content.md'
