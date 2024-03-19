---
title: Upgrade Your Appchain's Runtime
description: Learn how to use the Sudo key to manage your appchain by performing the privileged action of upgrading the runtime of your Tanssi appchain.
---

# Upgrading your Appchain Runtime with Sudo

## Introduction {: #introduction }

[Sudo](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/index.html){target=\_blank} is a module that enables privileged runtime calls to be dispatched when called from the Sudo account. Sudo is sometimes colloquially referred to as a superuser or god-like account. This enables you to perform privileged actions in the course of managing your appchain, such as upgrading your Tanssi appchain's runtime. 

In this guide, you'll learn how to use Sudo to upgrade your Tanssi appchain's runtime. With Sudo access, upgrading your chain is a quick and easy process. Note that appchain teams in production will have the option to phase out sudo access and rely on governance to process runtime upgrades. 

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - A Tanssi appchain (Snap or Dedicated)
 - Your appchain's Sudo account connected to your appchain's Polkadot.js Apps. You can refer to the [Managing Sudo guide](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps){target=\_blank} for instructions on injecting your Sudo account into Polkadot.js Apps

If you're unsure what your Tanssi appchain's Sudo account is, you can find it in your [Tanssi Dashboard](https://apps.tanssi.network/){target=\_blank} underneath the **Properties** section.

![Locating your Sudo address on apps.tanssi.network](/images/builders/manage/sudo/upgrade/upgrade-1.webp)

!!! warning
    You should always protect your Sudo account key with the utmost security precautions, as it grants privileged access to your Tanssi appchain.

## Upgrading Your Runtime {: #upgrading-your-runtime }

To get started, head to Polkadot.js Apps for your Tanssi appchain. The Polkadot.js Apps link for your Tanssi appchain can be found in your [Tanssi Dashboard](https://apps.tanssi.network/){target=\_blank} underneath the **Tooling** section.

![Locating your Polkadot.js Apps Link on apps.tanssi.network](/images/builders/manage/sudo/upgrade/upgrade-2.webp)

Prior to the upgrade, you'll need to have the [Wasm runtime](/learn/framework/architecture/#runtime){target=\_blank} ready to upload. You'll also need to have your [Sudo account accessible in Polkadot.js Apps](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps){target=\_blank}. Then, take the following steps:

1. Navigate to the **Developer** Tab of Polkadot.js Apps for your Tanssi appchain
2. Click on **Sudo**. If you do not see **Sudo** in this menu, then you have not associated the Sudo account with Polkadot.js Apps. Make sure that your Sudo account is injected by your wallet and connected to Polkadot.js Apps
3. Select the **system** pallet
4. Select **setCode**
5. Toggle the **fileUpload** switch to enable uploading your Wasm runtime file
6. Upload your Wasm runtime
7. Press **Submit Sudo** and confirm the transaction in your wallet

![Upgrading your Runtime on Polkadot.js Apps](/images/builders/manage/sudo/upgrade/upgrade-3.webp)

You can verify that your runtime upgrade was successful by checking the runtime version in the upper left-hand corner. In this case, we can see that the Tanssi appchain's runtime was successfully upgraded to version `400`.

![Check Runtime version on Polkadot.js Apps](/images/builders/manage/sudo/upgrade/upgrade-4.webp)

And that's it! The [Using Sudo](/builders/manage/sudo/) section has plenty more guides on how you can use the Sudo account to manage your Tansi appchain.

--8<-- 'text/_disclaimers/third-party-content.md'
