---
title: Minting Native Tokens with Sudo 
description: Learn how to use the Sudo key to manage your appchain and performing the privileged action of minting additional native tokens of your Tanssi appchain.
---

# Using Sudo to Mint Native Tokens

## Introduction {: #introduction }

[Sudo](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/index.html){target=\_blank} is a module that enables privileged runtime calls to be dispatched when called from the Sudo account. Sudo is sometimes colloquially referred to as a superuser or god-like account. This enables you to perform privileged actions in the course of managing your appchain, such as minting new native tokens. 

In this guide, you'll learn how to use Sudo to properly mint new native tokens. This comprehensive guide shows how to check the balance of an existing account prior to assigning it a new balance with Sudo access. 

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - A Tanssi appchain (Snap or Dedicated)
 - Your appchain's Sudo account connected to your appchain's Polkadot.js Apps. You can refer to the [Managing Sudo guide](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps){target=\_blank} for instructions on injecting your Sudo account into Polkadot.js Apps

If you're unsure what your Tanssi appchain's Sudo account is, you can find it in your [Tanssi Dashboard](https://apps.tanssi.network/){target=\_blank} underneath the **Properties** section.

![Locating your Sudo address on apps.tanssi.network](/images/builders/manage/sudo/minting/minting-1.webp)

!!! warning
    You should always protect your Sudo account key with the utmost security precautions, as it grants privileged access to your Tanssi appchain.

## Minting Tokens {: #minting-tokens }

As you know, the Sudo account has the ability to perform privileged functions, including minting additional tokens. When setting up your Tanssi appchain on the [Tanssi dApp](https://apps.tanssi.network/){target=\_blank}, you can specify genesis account balances. In other words, you have the ability to endow accounts with initial balances upon launching your Tanssi appchain. However, you can also mint new tokens after launch with the help of the Sudo account.

!!! note
    This tutorial demonstrates assigning arbitrary token balances on a TestNet appchain that has no value. You should carefully consider the ramifications of creating additional tokens on your own Tanssi appchain.

### Checking Existing Account Balance {: #checking-existing-account-balance }

The next section will demonstrate how to assign arbitrary token balances to accounts using the Sudo account. This process will overwrite the specified account's existing balance, so verifying the account is empty is a good practice before continuing. To check an account's balance, take the following steps:

1. Navigate to the **Developer** tab of [Polkadot.js Apps](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps) and click on **Chain State**
2. Select the **system** pallet to query
3. Select **account**
4. Paste in the account address or select it from the dropdown
5. Press **+** icon
6. You'll see the balance information returned at the bottom, including free, reserved, and frozen balances

![Check balances on Polkadot.js Apps](/images/builders/manage/sudo/minting/minting-2.webp)

### Assigning Balances with Sudo {: #assigning-balances-with-sudo }  

To assign an account balance to an account, make sure to have your Sudo account accessible in [Polkadot.js Apps](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps). Then, take the following steps:

1. Navigate to the **Developer** Tab of Polkadot.js Apps for your Tanssi appchain
2. Click on **Sudo**. If you do not see **Sudo** in this menu, then you have not associated the Sudo account with Polkadot.js Apps. Make sure that your Sudo account is injected by your wallet and connected to Polkadot.js Apps
3. Select the **balances** pallet
4. Select the **forceSetBalance** method
5. Paste in the account address to endow with tokens or select it from the dropdown
6. Enter the amount of tokens to endow the account with. In this example, we specify `9000000000000000000` for nine native tokens. Remember that Tanssi EVM appchains have 18 decimals, while Substrate or custom appchains configure the decimals when launching the chain. If you're unsure how many decimals your Tanssi appchain has, navigate to the **Settings** tab and click on **Metadata**
7. Press **Submit Sudo** and confirm the transaction in your wallet

![Force assign balances on Polkadot.js Apps](/images/builders/manage/sudo/minting/minting-3.webp)

And that's it! The [Using Sudo](/builders/manage/sudo/) section has plenty more guides on how you can use the Sudo account to manage your Tanssi appchain.

--8<-- 'text/_disclaimers/third-party-content.md'
