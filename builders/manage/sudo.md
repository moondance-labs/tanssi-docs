---
title: Using Sudo
description: Learn how to use the Sudo key to perform privileged actions to manage your ContainerChain, including upgrading your runtime and minting tokens.
---

# Using Sudo to Manage your ContainerChain

## Introduction {: #introduction }

[Sudo](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/index.html){target=\_blank} is a module that enables privileged runtime calls to be dispatched when called from the Sudo account. Sudo is sometimes colloquially referred to as a superuser or god-like account. There can only be a single Sudo account at a time. However, the Sudo keys can be rotated to give Sudo privileges to a new account. 

All Tanssi ContainerChains come with the Sudo pallet by default, and you're required to designate an account as the Sudo address when launching your ContainerChain. This enables you to perform privileged actions to manage your chain, such as upgrading your runtime or minting new native tokens. While the Sudo pallet is required to launch your ContainerChain on the TestNet, you can decommission the Sudo pallet and transition to decentralized governance after the MainNet launch.

In this guide, you'll learn how to use Sudo to upgrade your ContainerChain's runtime and perform other privileged actions like minting tokens. 

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - A Tanssi ContainerChain (Snap or Dedicated)
 - Access to your ContainerChain's Sudo Account

If you're unsure what your ContainerChain's Sudo account is, you can find it in your [Tanssi Dashboard](https://apps.tanssi.network/){target=\_blank} underneath the **Properties** section. 

![Locating your Sudo address on apps.tanssi.network](/images/builders/manage/sudo/sudo-1.webp)

!!! note
    You should always protect your Sudo account key with the utmost security precautions, as it grants privileged access to your ContainerChain. 


## Upgrading Your Runtime {: #upgrading-your-runtime }

To get started, head to Polkadot.js Apps for your ContainerChain. The Polkadot.js Apps Link for your ContainerChain can be found in your [Tanssi Dashboard](https://apps.tanssi.network/){target=\_blank} underneath the **Tooling** section. 

![Locating your Polkadot.js Apps Link on apps.tanssi.network](/images/builders/manage/sudo/sudo-2.webp)

Prior to the upgrade, you'll need to have the Wasm runtime ready to upload. You'll also need to have your Sudo account accessible in Polkadot.js Apps. Then, take the following steps: 

1. Navigate to the **Developer** Tab of Polkadot.js Apps for your ContainerChain
2. Click on **Sudo**. If you do not see **Sudo** in this menu, then you have not associated the Sudo account with Polkadot.js Apps. Make sure that your Sudo account is injected by your wallet and connected to Polkadot.js Apps
3. Select the **system** pallet
4. Select **setCode**
5. Toggle the **fileUpload** switch to enable uploading your Wasm runtime file
6. Upload your Wasm runtime
7. Press **Submit Sudo** and confirm the transaction in your wallet

![Upgrading your Runtime on Polkadot.js Apps](/images/builders/manage/sudo/sudo-3.webp)

You can verify that your runtime upgrade was successful by checking the runtime version in the upper left-hand corner. In this case, we can see that the ContainerChain's runtime was successfully upgraded to version 400. 

![Check Runtime version on Polkadot.js Apps](/images/builders/manage/sudo/sudo-4.webp)

## Minting Tokens {: #minting-tokens }

As you know, the Sudo account has the ability to perform privileged functions, including minting additional tokens. When setting up your ContainerChain on [apps.tanssi.network](https://apps.tanssi.network/){target=\_blank}, you can specify genesis account balances. In other words, you have the ability to endow accounts with initial balances upon launching your ContainerChain. However, you can also mint new tokens after launch with the help of the Sudo account. 

!!! note
    This tutorial demonstrates assigning arbitrary token balances on a TestNet ContainerChain that has no value. You should carefully consider the ramifications of creating additional tokens on your own ContainerChain.

### Checking Existing Account Balance  {: #checking-existing-account-balance }   

The next section will demonstrate how to assign arbitrary token balances to accounts using the Sudo account. This process will overwrite the specified account's existing balance, so verifying the account is empty is a good practice before continuing. To check an account's balance, take the following steps:

1. Navigate to the **Developer** Tab of Polkadot.js Apps and click on **Chain State**
2. Select the **system** pallet to query
3. Select **account** 
4. Paste in the account address or select it from the dropdown
5. Press **+** icon
6. You'll see the balance information returned at the bottom, including free, reserved, and frozen balances

![Check balances on Polkadot.js Apps](/images/builders/manage/sudo/sudo-5.webp)

### Assigning Balances with Sudo  {: #assigning-balances-with-sudo }  

To assign an account balance to an account, make sure to have your Sudo account accessible in Polkadot.js Apps. Then, take the following steps: 

1. Navigate to the **Developer** Tab of Polkadot.js Apps for your ContainerChain
2. Click on **Sudo**. If you do not see **Sudo** in this menu, then you have not associated the Sudo account with Polkadot.js Apps. Make sure that your Sudo account is injected by your wallet and connected to Polkadot.js Apps
3. Select the **balances** pallet
4. Select the **forceSetBalance** method
5. Paste in the account address to endow with tokens or select it from the dropdown
6. Enter the amount of tokens to endow the account with. In this example, we specify `9000000000000000000` for nine native tokens. Remember that ContainerChains have 18 decimals by default. If you're unsure how many decimals your ContainerChain has, navigate to the **Settings** tab and Click on **Metadata**
7. Press **Submit Sudo** and confirm the transaction in your wallet

![Force assign balances on Polkadot.js Apps](/images/builders/manage/sudo/sudo-6.webp)

## Changing the Sudo Account {: #changing-the-sudo-account }

Changing your ContainerChain's Sudo account is a straightforward process. Also known as rotating your sudo keys, this process will remove sudo access from the existing sudo account and grant it to the new account. There can only be one sudo account at any time. However, you are free to change the sudo account as often as you would like.

Prior to getting started, make sure that you have your existing Sudo account accessible in Polkadot.js Apps. Then, take the following steps:

1. Navigate to the **Developer** Tab of Polkadot.js Apps for your ContainerChain
2. Click on **Sudo**. If you do not see **Sudo** in this menu, then you have not associated the Sudo account with Polkadot.js Apps. Make sure that your Sudo account is injected by your wallet and connected to Polkadot.js Apps
3. Select the **Set sudo key** heading
4. Select the new account you'll transfer sudo privileges to
5. Press **Reassign** and confirm the transaction in your wallet

![Change Sudo account on Polkadot.js Apps](/images/builders/manage/sudo/sudo-7.webp)

!!! note
    Ensure that you have access to the new sudo account. Once sudo is transferred, it cannot be undone without access to the current sudo key. 


--8<-- 'text/_disclaimers/third-party-content.md'
