---
title: Enabling Maintenance Mode 
description: Learn how to use Sudo to turn on and off maintenance mode, which effectively pauses your appchain while still producing blocks and allowing select calls.
---

# Enabling Maintenance Mode

## Introduction {: #introduction }

The [Maintenance pallet](https://moonbeam.network/blog/maintenance-mode/){target=\_blank} is a module that is designed for use only in emergencies that present existential threats to the network. Enabling maintenance mode on your appchain will suspend the processing of all regular transactions, including EVM interactions. Block production continues at a regular cadence and allows governance and staking functions to continue. 

Maintenance mode filters (ignores) all calls outside of governance and staking. Once maintenance mode is exited, your chain will process any pending transactions that queued up while your chain was in maintenance mode. Maintenance mode is intended to be used only as a temporary, emergency measure. 

For example, imagine discovering a critical exploit on your appchain that could result in significant financial losses if malicious actors exploit it. While you can address the issue by implementing a runtime upgrade, the process takes time—precious time during which your appchain remains vulnerable to attack. One potential solution is to activate maintenance mode on your appchain, complete the runtime upgrade, and exit maintenance mode once the fix has been verified.

!!! warning
    Enabling maintenance mode on a production network can significantly impact the contracts on your chain. While maintenance mode is enabled, no smart contract transactions are processed, so it's critical to consider the potential ramifications before activating it. 

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - A Tanssi appchain (Snap or Dedicated)
 - Your appchain's Sudo account connected to your appchain's Polkadot.js Apps. You can refer to the [Managing Sudo guide](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps/){target=\_blank} for instructions on injecting your Sudo account into Polkadot.js Apps

If you're unsure what your Tanssi appchain's Sudo account is, you can find it in your [Tanssi Dashboard](https://apps.tanssi.network/){target=\_blank} underneath the **Properties** section.

![Locating your Sudo address on apps.tanssi.network](/images/builders/manage/sudo/maintenance/maintenance-1.webp)

!!! warning
    It's critical to protect your Sudo account key with the utmost security precautions, as it grants privileged access to your Tanssi appchain.

## Enabling Maintenance Mode {: #enabling-maintenance-mode }

As you know, the Sudo account can perform privileged functions, such as enabling and disabling maintenance mode. To enter maintenance mode and stop regular transaction processing, navigate to the **Developer** tab of Polkadot.js Apps for your Tanssi appchain and click on **Sudo**. If you do not see **Sudo** in this menu, you have not associated the Sudo account with Polkadot.js Apps. Make sure that your [Sudo account is injected by your wallet and connected to Polkadot.js Apps](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps/){target=\_blank}. Then, take the following steps:

1. Select the **maintenanceMode** pallet
2. Select the **enterMaintenanceMode** method
3. Press **Submit Sudo** and confirm the transaction in the resulting pop-up

![Enable maintenance mode](/images/builders/manage/sudo/maintenance/maintenance-2.webp)

To verify that maintenance mode has been enabled, you can check the **Explorer** section under the **Network** tab and review the recent events. 

![Check maintenance mode is enabled](/images/builders/manage/sudo/maintenance/maintenance-3.webp)

## Exiting Maintenance Mode {: #exiting-maintenance-mode }

To exit maintenance mode and return your appchain to normal operation, navigate to the **Developer** tab of Polkadot.js Apps for your Tanssi appchain and click on **Sudo**. If you do not see **Sudo** in this menu, you have not associated the Sudo account with Polkadot.js Apps. Make sure that your [Sudo account is injected by your wallet and connected to Polkadot.js Apps](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps/){target=\_blank}. Then, take the following steps:

1. Select the **maintenanceMode** pallet
2. Select the **resumeNormalOperation** method
3. Press **Submit Sudo** and confirm the transaction in the resulting pop-up

![Exit maintenance mode](/images/builders/manage/sudo/maintenance/maintenance-4.webp)

To verify that maintenance mode has been disabled, you can check in the **Explorer** section under the **Network** tab and review the recent events. 

![Check maintenance mode is disabled](/images/builders/manage/sudo/maintenance/maintenance-5.webp)

Remember that using maintenance mode is an emergency action that should only be activated when your chain is at dire risk. It may be worthwhile to establish a policy for your appchain that sets specific circuit breaker triggers to determine when maintenance mode will be enabled. Establishing a policy in advance will also streamline decision-making during a potential emergency.  

And that's it! The [Using Sudo](/builders/manage/sudo/) section has plenty more guides on using the Sudo account to manage your Tanssi appchain.

--8<-- 'text/_disclaimers/third-party-content.md'
