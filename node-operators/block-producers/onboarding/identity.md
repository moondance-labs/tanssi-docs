---
title: Set an Identity as a Block Producer
description: Follow these step-by-step instructions to establish an identity including a name and info so you can be more easily recognizable as a block producer on Tanssi.
---

# Set Up an Identity

## Introduction {: #introduction }

The [Substrate](/learn/platform/technology/#substrate-framework){target=\_blank} Identity pallet is an out-of-the-box solution for adding personal information to your on-chain account. Establishing an identity as a Tanssi block producer boosts visibility and ensures that your display name is automatically populated when users input your block producer address.

The identity you configure goes beyond a simple display name. Personal information can include default fields such as your legal name, display name, website, Twitter handle, Discord, Riot (now known as Element) name. You can also take advantage of custom fields to include any other relevant information.

This guide will demonstrate how to set up an identity complete with a display name and additional parameters, enhancing your visibility and recognizability as a block producer

## General Definitions {: #general-definitions }

To store your information on-chain, you must bond some funds, which eventually will be returned once the identity has been cleared. There are two categories of fields: default and custom. There is a basic deposit amount reserved upon identity creation and a storage deposit for each additional byte of data stored on-chain.

- **Default fields include** - your legal name, display name, website, Twitter handle, Discord, Riot (now known as Element) name

- **Custom fields include** - any other relevant information.

- **Subaccounts** - You can link subaccounts underneath a primary account. This may be useful, for example, if a block producer service is running multiple different block producer nodes

    |       Variable        |                               Definition                                |                      Value                      |
    |:---------------------:|:-----------------------------------------------------------------------:|:-----------------------------------------------:|
    |     Basic deposit     |           The amount held on deposit for setting an identity            | {{ networks.dancebox.identity.basic_deposit }} DANCE |
    |     Deposit per byte     | The amount held on deposit per byte of on-chain storage used setting an identity | {{ networks.dancebox.identity.per_byte_deposit }} DANCE |
    | Max additional fields |     Maximum number of additional fields that may be stored in an ID     |   {{ networks.dancebox.identity.max_fields }}   |
    | Max Subaccounts |     Maximum number of subaccounts that can be defined under an account identity    |   {{ networks.dancebox.identity.max_subaccounts }}   |


## Checking Prerequisites { : #checking-prerequisites }

For this guide, you will need the following:

To follow along with this tutorial, you will need to have:

- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/accounts){target=\_blank} open and connected to the Tanssi Dancebox TestNet
- At least one account funded with `DANCE` tokens

If you need help importing your accounts into Polkadot.js Apps, please check out the [Connecting to Polkadot.js](/builders/interact/substrate-api/wallets/talisman/#connecting-to-polkadotjs){target=\_blank} guide.

## Get Started {: #get-started }

There are a couple different ways to set and clear an identity using the Polkadot.js Apps, depending on the information to be included. If you intend to register your identity using only the default fields, you can follow the instructions for [Managing an Identity via the Accounts UI](#manage-via-accounts). **This is the recommended way to set and manage your identity**.

If you are looking for a more customizable experience and want to add custom fields beyond the default fields, you can follow the instructions for [Managing an Identity via the Extrinsics UI](#manage-via-extrinsics).

!!! note
    Please note that it is recommended to use the **Accounts** UI on Polkadot.js Apps to manage your identity as it provides an easy-to-use interface that enforces character limits. If you use the **Extrinsics** UI, please be aware that your input for each field (i.e, name, email, etc.) must be 32 characters or less, otherwise, your information will be cut off.

## Manage an Identity via Accounts {: #manage-via-accounts }

### Set an Identity {: #set-identity-accounts }

To get started with setting an identity using the Accounts UI, head to the [Accounts tab](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/accounts){target=\_blank} on the Polkadot.js Apps explorer.

You should already have an account connected, so you can go ahead and click on your account name to verify and take note of your balances. After you send the transaction to set an identity, the deposit(s) you submitted will be moved from your transferable balance to your reserved balance.

![Starting account balances](/images/node-operators/block-producers/onboarding/identity/identity-1.webp)

To set your identity, you'll need to:

1. Click on the 3 vertical dots next to the account you would like to set an identity for
2. A menu will pop up. Click **Set on-chain identity**

![Set on-chain identity](/images/node-operators/block-producers/onboarding/identity/identity-2.webp)

Next, the menu to register and set your identity will pop-up and you can start filling in your information. You are not required to enter information for every single field, you can choose to fill in just one field or all of them, it's up to you. For this example:

1. Set your display name
2. Click on the **include field** toggle for email and then enter in your email
3. Click on the **include field** toggle for web and then enter in your website URL
4. Click on the **include field** toggle for Twitter and then enter in your Twitter handle
5. After you're done filling in your information and the deposit amount looks alright to you, click **Set Identity**

![Set your identity](/images/node-operators/block-producers/onboarding/identity/identity-3.webp)

You will then be prompted to sign the transaction. If everything looks good, you can enter your password and click **Sign and Submit** to sign and send the transaction.

You should see status notifications pop-up in the top right hand corner. Once the transaction has been confirmed, you can click on your account name again and the panel will slide out on the right side of the page. Your balances will have changed, and you’ll also see your new identity information.

![Updated account balances](/images/node-operators/block-producers/onboarding/identity/identity-4.webp)

If the identity information matches what you entered, you’ve successfully set an identity!

Once you clear your identity, the deposit in your reserved balance will get transferred back to your transferable balance. If you need to make changes to your identity, you can go through the process of setting your identity again. Please note that you will need to ensure all fields are re-entered, even if only one field needs to be changed, or they will be overwritten. You will not need to pay another deposit, unless custom fields are used, but you will need to pay gas fees.

## Manage an Identity via Extrinsics {: #manage-via-extrinsics }

### Set an Identity {: #set-identity-extrinsics }

To register an identity using the extrinsics UI, navigate to the [Extrinsics page](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/extrinsics){target=\_blank} on Polkadot.js Apps. Please ensure that for each identity field, your input does not exceed 32 characters. To complete your identity, take the following steps:

1. Select your account
2. Select identity from the **submit the following extrinsic** dropdown
3. Then select the **setIdentity(info)** function
4. Select **Raw** as the data format to enter your **Display Name**
5. Enter the data for **Display** in the selected format 
6. Select **Raw** as the data format to enter your web address
7. Enter your website URL in the selected format 
8. Select **Raw** as the data format to enter your email
9. Enter your email address in the selected format 
10. Select **Raw** as the data format to enter your Twitter handle
11. Enter your Twitter in the selected format. Enter the username only, starting with the `@` symbol
12. Review the prepared fields and press **Submit Transaction**

![Set on-chain identity](/images/node-operators/block-producers/onboarding/identity/identity-5.webp)

Optionally, if you would like to enter custom fields, take the following steps:

1. Scroll to the top and click on **Add item**
2. Two fields will appear: the first for the field name and the second for the value. Select **Raw** as the data format to enter the field name
3. Enter the field name in the specified format
4. Select **Raw** as the data format to enter the custom value
5. Enter the custom value in the specified format

![Add custom fields](/images/node-operators/block-producers/onboarding/identity/identity-6.webp)

Finally, once all of your identity information has been added, you can scroll to the bottom of the page and click **Submit Transaction**.

You will then be prompted to sign the transaction. Remember, there is an additional deposit required for each additional custom field. If everything looks good, you can enter your password and click **Sign and Submit** to sign and send the transaction.

You should see status notifications pop-up in the top right hand corner confirming the transaction. If successful, you’ve set an identity! Congratulations! To make sure everything went through and your identity information looks good, next you can confirm your identity.

### Confirm an Identity {: #confirm-identity-extrinsics }

To verify the addition of your identity information, you can click on the **Developer** tab and then navigate to [Chain state](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/chainstate){target=\_blank}.

On the **Chain State** UI, make sure **Storage** is selected. Then you can start to request your identity information:

1. Set **selected state query** to **identity**
2. Select the **identityOf(AccountId)** function
3. Select your account
4. Click the **+** button to get your identity information

![Request identity information](/images/node-operators/block-producers/onboarding/identity/identity-7.webp)

You can see now that you’ve successfully set an identity! Once you clear your identity, the deposit in your reserved balance will get transferred back to your transferable balance. If you need to make changes to your identity, you can go through the process of setting your identity again. Please note that you will need to ensure all fields are re-entered, even if only one field needs to be changed, or they will be overwritten. You will not need to pay another deposit, unless custom fields are used, but you will need to pay gas fees.