---
title: Manage Your Chain Using a Multisig
description: Learn how the configure and use a Multisig to manage your chain and execute privileged actions, such as upgrading the runtime, minting tokens, and more.
icon: octicons-key-24
categories: Appchain
---

# Manage Your Chain Using a Multisig

## Introduction {: #introduction }

Appchains deployed through Tanssi are sovereign. This means that the appchain governor is free to define and manage the appchain's critical aspects, such as tokenomics, runtime logic, gas dynamics, and others.

Those critical actions can be performed by a special account called [sudo](/builders/manage/developer-portal/sudo/){target=\_blank}. This account must be protected with the utmost precautions, because losing access or a malicious actor gaining access to it could be catastrophic, and the chain might not recover from the event.

A multisig is one way to make your appchain's management safer. It allows defining an M-of-N threshold, requiring at least M valid signatures from N designated accounts to execute privileged transactions. Using a multisig increases the security of your appchain governance by: 

- Completely removing the single point of failure: Losing one account doesn't mean losing the appchain. Also, a compromised account is not enough to execute malicious actions. 
- Reducing the human error factor: Transactions must be reviewed and approved by at least one other person, thereby reducing the risk of executing a wrong transaction, an unintended update, sending funds to the wrong address, and other common mistakes.

For appchains where the sudo account is not disabled in favor of another governance mechanism, setting up a multisig is strongly advised. This article shows how to set it up and execute multisig transactions.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you can either set the multisig during the registration process or, if you already have a Tanssi-powered network (Quick Trial or Dedicated), you will need to have the following:

- The accounts included in the multisig setup, imported into any of the [supported wallets](/builders/deploy/dapp/#supported-wallets){target=\_blank}
--8<-- 'text/builders/manage/dapp/prerequisites.md'

## Setting Up a Multisig for a New Appchain  {: #multisig-new-appchain }

In the first step to [deploy a new Tanssi-powered appchain](/builders/deploy/dapp/){target=\_blank}, you must define the account that will have sudo privileges in the **Accounts** section.

![Accounts section](/images/builders/manage/dapp/multisig/multisig-1.webp)

In the **Sudo Address** field, you can enter any account, though when you select it, a menu with the option **Create Multisig** Account will appear.

![Accounts section](/images/builders/manage/dapp/multisig/multisig-2.webp)

--8<-- 'text/builders/manage/dapp/multisig/create-multisig.md'

Your multisig is now saved and can be used as sudo for your new chain.

![Accounts section](/images/builders/manage/dapp/multisig/multisig-4.webp)

!!! note
    Your multisig has a unique address derived from the addresses in the signing set. Hence, you'll see a different account in the **Sudo Address**.

## Going Multisig on an Already Live Appchain  {: #multisig-live-appchain }

If you already have a live Tanssi-powered appchain, you can easily transfer the sudo rights to a multisig setup. To do so, head to the [dashboard](https://apps.tanssi.network/dashboard){target=\_blank} and on your appchain's card:

1. Click on **Manage**.
2. Click **Transfer Sudo** button in the panel on the right.

![Transfer Sudo](/images/builders/manage/dapp/multisig/multisig-5.webp)

The **Transfer Sudo** panel will be presented.

![Transfer Sudo](/images/builders/manage/dapp/multisig/multisig-6.webp)

When you select the **New Sudo Address** field, a menu will show displaying the following entries: the multisigs you might have already created, the accounts you have connected to the dApp, and the **Create Multisig Account** action. 

![Transfer Sudo](/images/builders/manage/dapp/multisig/multisig-7.webp)

--8<-- 'text/builders/manage/dapp/multisig/create-multisig.md'

Your multisig is now saved and can be used as sudo for your new chain.. Select your newly created multisig, click on **Transfer Sudo**, sign the transaction, and that's it!

![Accounts section](/images/builders/manage/dapp/multisig/multisig-8.webp)

## Executing Privileged Actions With a Multisig Setup {: #multisig-transactions }

The dApp's management panel allows you to dispatch privileged transactions through a user-friendly interface. Among those privileged actions, we can find some related to token management (such as minting tokens or changing the gas dynamics), dispatching runtime upgrades, opening interoperability channels, and others.

When appchain management is configured with a multisig account as sudo, the process involves several steps because the transaction will be executed only when the threshold of valid signatures is met.

The smallest multisig that can be configured is a two-out-of-three. In this setup, the user creating the transaction provides one valid signature, and a second user, holding any of the remaining two valid addresses, signs and executes the transaction, completing the multisig flow.

In the following sections, an example of how to create and execute a privileged transaction is shown.

!!! note
    A multisig transaction created through the Tanssi dApp's UI can only be completed using the Tanssi dApp's UI. Similarly, a multisig transaction created with an external tool will not be shown and cannot be completed in the Tanssi dApp.

### Creating a Multisig Transaction {: #create-multisig-transaction }

To create a privileged transaction, head to the [Tanssi dApp](https://apps.tanssi.network/dashboard){target=\_blank} and connect one of the multisig addresses.

With a multisig participant address connected to the dApp, the **Manage** button will be visible, granting you access to the management panel, where you can initiate privileged transactions.

![Manage access](/images/builders/manage/dapp/multisig/multisig-9.webp)

In this example, the appchain's runtime is outdated, and an upgrade is available. We start the runtime upgrade by clicking on the **Upgrade** button and signing the transaction.

![Upgrade runtime](/images/builders/manage/dapp/multisig/multisig-10.webp)

Once the multisig is created, your dashboard will show that there's a new ongoing multisig transaction. Click on **View Details** to check the multisig's details in the right panel.

![Multisig created](/images/builders/manage/dapp/multisig/multisig-11.webp)

!!! note
    The **Approve** button is disabled for the multisig transaction creator, since their signature has already been submitted.

### Signing a Multisig Transaction {: #sign-multisig-transaction }

With a multisig participant address connected to the dApp, your dashboard will display the multisig transactions that are awaiting your review & approval. Click on the **View Details** button, review the transaction details, and sign it.

![Multisig approved](/images/builders/manage/dapp/multisig/multisig-12.webp)

After signing the transaction and reaching the multisig minimum threshold, it is executed immediately, completing the action.