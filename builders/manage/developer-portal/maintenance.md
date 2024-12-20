---
title: Enabling Maintenance Mode 
description: Learn how to use Sudo to turn on and off maintenance mode, which effectively pauses your network while still producing blocks and allowing select calls.
icon: octicons-stop-24
---

# Enabling Maintenance Mode

## Introduction {: #introduction }

The [Maintenance pallet](https://moonbeam.network/blog/maintenance-mode){target=\_blank} is a module that is designed for use only in emergencies that present existential threats to the network. Enabling maintenance mode on your network will suspend the processing of all regular transactions, including EVM interactions. Block production continues at a regular cadence and allows governance and staking functions to continue. 

Maintenance mode filters (ignores) all calls outside of governance and staking. Once maintenance mode is exited, your chain will process any pending transactions that queued up while your chain was in maintenance mode. Maintenance mode is intended to be used only as a temporary, emergency measure. 

For example, imagine discovering a critical exploit on your network that could result in significant financial losses if malicious actors exploit it. While you can address the issue by implementing a runtime upgrade, the process takes time—precious time during which your network remains vulnerable to attack. One potential solution is to activate maintenance mode on your network, complete the runtime upgrade, and exit maintenance mode once the fix has been verified.

!!! warning
    Enabling maintenance mode on a production network can significantly impact the contracts on your chain. While maintenance mode is enabled, no smart contract transactions are processed, so it's critical to consider the potential ramifications before activating it. 

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - A Tanssi-powered network (Quick Trial or Dedicated)
 - Your network's Sudo account connected to your network's Polkadot.js Apps. You can refer to the [Managing Sudo guide](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} for instructions on injecting your Sudo account into Polkadot.js Apps

--8<-- 'text/builders/manage/locate-sudo-account.md'

## Enabling Maintenance Mode {: #enabling-maintenance-mode }

As you know, the Sudo account can perform privileged functions, such as enabling and disabling maintenance mode. To enter maintenance mode and stop regular transaction processing, navigate to the **Developer** tab of Polkadot.js Apps for your Tanssi-powered network and click on **Sudo**. If you do not see **Sudo** in this menu, you have not associated the Sudo account with Polkadot.js Apps. Make sure that your [Sudo account is injected by your wallet and connected to Polkadot.js Apps](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}. Then, take the following steps:

1. Select the **maintenanceMode** pallet
2. Select the **enterMaintenanceMode** method
3. Press **Submit Sudo** and confirm the transaction in the resulting pop-up

![Enable maintenance mode](/images/builders/manage/developer-portal/maintenance/maintenance-2.webp)

To verify that maintenance mode has been enabled, you can check the **Explorer** section under the **Network** tab and review the recent events. 

![Check maintenance mode is enabled](/images/builders/manage/developer-portal/maintenance/maintenance-3.webp)

## Exiting Maintenance Mode {: #exiting-maintenance-mode }

To exit maintenance mode and return your network to normal operation, navigate to the **Developer** tab of Polkadot.js Apps for your Tanssi-powered network and click on **Sudo**. If you do not see **Sudo** in this menu, you have not associated the Sudo account with Polkadot.js Apps. Make sure that your [Sudo account is injected by your wallet and connected to Polkadot.js Apps](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}. Then, take the following steps:

1. Select the **maintenanceMode** pallet
2. Select the **resumeNormalOperation** method
3. Press **Submit Sudo** and confirm the transaction in the resulting pop-up

![Exit maintenance mode](/images/builders/manage/developer-portal/maintenance/maintenance-4.webp)

To verify that maintenance mode has been disabled, you can check in the **Explorer** section under the **Network** tab and review the recent events. 

![Check maintenance mode is disabled](/images/builders/manage/developer-portal/maintenance/maintenance-5.webp)

Remember that using maintenance mode is an emergency action that should only be activated when your chain is at dire risk. It may be worthwhile to establish a policy for your network that sets specific circuit breaker triggers to determine when maintenance mode will be enabled. Establishing a policy in advance will also streamline decision-making during a potential emergency.  

And that's it! The [Developer Portal](/builders/manage/developer-portal/) section has plenty more guides on how to manage your Tanssi-powered network.

--8<-- 'text/_disclaimers/third-party-content.md'
