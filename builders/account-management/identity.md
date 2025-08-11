---
title: Set an Account Identity
description: Follow these step-by-step instructions to establish an identity, including a display name, so you can be more easily recognizable on Tanssi.
icon: octicons-person-24
categories: Basics, Appchain
---

# Set Up an Identity

## Introduction {: #introduction }

The [Substrate](/learn/framework/overview/#substrate-framework){target=\_blank} Identity pallet is an out-of-the-box solution for adding personal information to your on-chain account. Establishing an identity makes it easier for your account to be recognized by others, as your display name will automatically populate when someone pastes your address into a field in [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/accounts){target=\_blank}.

The identity you configure goes beyond a simple display name. Personal information can include default fields such as your legal name, display name, website, Twitter handle, Discord, and Riot (now known as Element) name. You can also use custom fields to include any other relevant information.

This guide will demonstrate setting up an identity with a display name and additional parameters, enhancing your visibility and recognizability.

## General Definitions {: #general-definitions }

To store your information on-chain, you must bond some funds, which will eventually be returned once the identity has been cleared. There are two categories of fields: default and custom. A basic deposit amount is reserved upon identity creation, and a storage deposit is required for each additional byte of data stored on-chain.

- **Default fields include** - your legal name, display name, website, Twitter handle, Discord, Riot (now known as Element) name

- **Custom fields include** - any other relevant information

- **Subaccounts** - You can link subaccounts underneath a primary account. As an example, a sequencer service that's running multiple different sequencer nodes can establish subaccounts to demonstrate an official link between the nodes

=== "Tanssi MainNet"

    |       Variable        |                                    Definition                                    |                                        Value                                         |
    |:---------------------:|:--------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------:|
    |     Basic deposit     |                The amount held on deposit for setting an identity                |  {{ networks.mainnet.identity.basic_deposit }} {{ networks.mainnet.token_symbol }}   |
    |   Deposit per byte    | The amount held on deposit per byte of on-chain storage used setting an identity | {{ networks.mainnet.identity.per_byte_deposit }} {{ networks.mainnet.token_symbol }} |
    | Max additional fields |         Maximum number of additional fields that may be stored in an ID          |                      {{ networks.mainnet.identity.max_fields }}                      |
    |    Max subaccounts    |   Maximum number of subaccounts that can be defined under an account identity    |                   {{ networks.mainnet.identity.max_subaccounts }}                    |

=== "Dancelight TestNet"

    |       Variable        |                                    Definition                                    |                                           Value                                            |
    |:---------------------:|:--------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------:|
    |     Basic deposit     |                The amount held on deposit for setting an identity                |  {{ networks.dancelight.identity.basic_deposit }} {{ networks.dancelight.token_symbol }}   |
    |   Deposit per byte    | The amount held on deposit per byte of on-chain storage used setting an identity | {{ networks.dancelight.identity.per_byte_deposit }} {{ networks.dancelight.token_symbol }} |
    | Max additional fields |         Maximum number of additional fields that may be stored in an ID          |                       {{ networks.dancelight.identity.max_fields }}                        |
    |    Max subaccounts    |   Maximum number of subaccounts that can be defined under an account identity    |                     {{ networks.dancelight.identity.max_subaccounts }}                     |

## Checking Prerequisites { : #checking-prerequisites }

For this guide, you will need the following:

- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/accounts){target=\_blank} open and connected to [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\_blank}.
- At least one account funded with `{{ networks.dancelight.token_symbol }}` tokens.

If you need help importing your accounts into Polkadot.js Apps, please check out the [Connecting to Polkadot.js](/builders/toolkit/substrate-api/wallets/talisman/#connecting-to-polkadotjs){target=\_blank} guide.

## Get Started {: #get-started }

Depending on the information to be included, there are a couple of different ways to set and clear an identity using Polkadot.js Apps. If you intend to register your identity using only the default fields, you can follow the instructions for [Managing an Identity via the Accounts UI](#manage-via-accounts). **This is the recommended way to set and manage your identity**.

If you want to add custom fields beyond the default fields, follow the instructions for [Managing an Identity via the Extrinsics UI](#manage-via-extrinsics).

!!! note
    Please note that using the **Accounts** UI on Polkadot.js Apps is recommended to manage your identity as it provides an easy-to-use interface that enforces character limits. If you use the **Extrinsics** UI, please be aware that your input for each field (i.e., name, email, etc.) must be 32 characters or less; otherwise, your information will be cut off.

## Manage an Identity via Accounts {: #manage-via-accounts }

### Set an Identity {: #set-identity-accounts }

To get started with setting an identity using the Accounts UI, head to the [**Accounts** tab](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/accounts){target=\_blank} on the Polkadot.js Apps explorer.

You should already have an account connected, so you can click on your account name to verify and note your balances. After you send the transaction to set an identity, the deposit(s) you submitted will be moved from your transferable balance to your reserved balance.

![Starting account balances](/images/builders/account-management/identity/identity-1.webp)

To set your identity, you'll need to:

1. Click on the three vertical dots next to the account you would like to set an identity for
2. A menu will pop up. Click **Set on-chain identity**

![Set on-chain identity](/images/builders/account-management/identity/identity-2.webp)

Next, the menu to register and set your identity will pop up, and you can start filling in your information. You are not required to enter information for every single field; you can choose to fill in just one field or all of them; it's up to you. For this example:

1. Set your display name
2. Click on the **include field** toggle for email and then enter in your email
3. Click on the **include field** toggle for web and then enter in your website URL
4. Click on the **include field** toggle for Twitter and then enter in your Twitter handle
5. Review the prior data fields and click **Set Identity**

![Set your identity](/images/builders/account-management/identity/identity-3.webp)

You will then be prompted to sign the transaction. If everything looks good, enter your password and click **Sign and Submit** to sign and send the transaction.

You should see status notifications pop up in the top right-hand corner. Once the transaction has been confirmed, you can click on your account name again, and the panel will slide out on the right side of the page. Your balances will have changed, and you'll also see your new identity information.

![Updated account balances](/images/builders/account-management/identity/identity-4.webp)

If the identity information matches what you entered, you've successfully set an identity!

Once you clear your identity, the deposit in your reserved balance will get transferred back to your transferable balance. If you need to change your identity, you can go through the process of setting your identity again. Please note that you must ensure all fields are re-entered, even if only one field needs to be changed, or they will be overwritten. You will not need to pay another deposit unless custom fields are used, but you will need to pay gas fees.

## Manage an Identity via Extrinsics {: #manage-via-extrinsics }

### Set an Identity {: #set-identity-extrinsics }

To register an identity using the extrinsics UI, navigate to the [**Extrinsics** page](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank} on Polkadot.js Apps. Please ensure your input does not exceed 32 characters for each identity field. To complete your identity, take the following steps:

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

![Set on-chain identity](/images/builders/account-management/identity/identity-5.webp)

Optionally, if you would like to enter custom fields, take the following steps:

1. Scroll to the top and click on **Add item**
2. Two fields will appear: the first for the field name and the second for the value. Select **Raw** as the data format to enter the field name
3. Enter the field name in the specified format
4. Select **Raw** as the data format to enter the custom value
5. Enter the custom value in the specified format

![Add custom fields](/images/builders/account-management/identity/identity-6.webp)

Finally, once all of your identity information has been added, you can scroll to the bottom of the page and click **Submit Transaction**.

You will then be prompted to sign the transaction. Remember, an additional deposit is required for each additional custom field. If everything looks good, enter your password and click **Sign and Submit** to sign and send the transaction.

You should see status notifications pop up in the top right-hand corner confirming the transaction. If successful, you've set an identity! Congratulations! To ensure everything went through and your identity information looks good, you can verify your identity.

### Confirm an Identity {: #confirm-identity-extrinsics }

To verify the addition of your identity information, you can click on the **Developer** tab and then navigate to [**Chain state**](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/chainstate){target=\_blank}.

On the **Chain State** UI, make sure **Storage** is selected. Then you can start to request your identity information:

1. Set **selected state query** to **identity**
2. Select the **identityOf(AccountId)** function
3. Select your account
4. Click the **+** button to get your identity information

![Request identity information](/images/builders/account-management/identity/identity-7.webp)

You can see now that you've successfully set an identity! Once you clear your identity, the deposit in your reserved balance will get transferred back to your transferable balance. If you need to change your identity, you can go through the process of setting your identity again. Please note that you must ensure all fields are re-entered, even if only one field needs to be changed, or they will be overwritten. You will not need to pay another deposit unless custom fields are used, but you will need to pay gas fees.

## Clear an Identity {: #confirm-identity-extrinsics }

To clear your identity, take the following steps from **Extrinsics** tab of the Polkadot.js Apps UI:

1. Select your account from the **using the selected account** dropdown
2. Select **identity** from the **submit the following extrinsic** dropdown
3. Then select the **clearIdentity()** function
4. Click **Submit Transaction**

![Clear an identity](/images/builders/account-management/identity/identity-8.webp)

You will then be prompted to sign the transaction. If everything looks good, enter your password and click **Sign and Submit** to sign and send the transaction. You should see status notifications in the top right-hand corner confirming the transaction.

To confirm that your identity information has been successfully removed, revisit the steps outlined in the [Confirm an Identity section](#confirm-identity-extrinsics). This time, instead of displaying your identity details, the response should indicate "none," confirming that no identity information is currently linked to your account. Additionally, when you check your balances, you will find that the deposit initially made for setting your identity has been credited back to your transferable balance. This completes the process of clearing your identity.

![Clear an identity confirmation](/images/builders/account-management/identity/identity-9.webp)
