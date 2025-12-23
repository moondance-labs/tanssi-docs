---
title: Manage Your Chain Using a Multisig
description: Learn how the configure and use a Multisig to manage your chain and execute privileged actions, such as upgrading the runtime, minting tokens, and more.
icon: octicons-key-24
categories: Appchain
---

# Manage Your Chain Using a Multisig

## Introduction {: #introduction }

Any appchain deployed through Tanssi is sovereign, meaning that the appchain governor is free to define and manage critical aspects, such as the chain's tokenomics, its runtime logic, the gas dynamics, and others.

Those critical actions can be performed by a special account called [sudo](/builders/manage/developer-portal/sudo/){target=\_blank}, which must be protected with the utmost precautions. Loosing access to the sudo account, or if a malicious actor gains access to this account could be catastrophic and the chain might not recover the event.

A multisig is one way to make your appchain's management safer. It allows to define a M-of-N threshold, requiring at least M valid signatures from the N designated accounts to execute a privileged transactions. Using a multisig increases the security of your appchain governances by: 

- Completely removing the single point of failure: Losing one account doesn't mean losing the appchain. Also, a compromised account is not enough to execute malicious actions. 
- Decreasing the human error factor: Transactions must be reviewed and approved by at least one other person besides the one proposing them, which reduces the probability of executing a wrong transaction, an unintended update, sending funds to the wrong address, and other mistakes.

For those appchains on which the sudo account is not disabled in favor of a community oriented governance mechanism, setting up a multisig is strongly advised, and this article will show you how to setup and execute transactions.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you can either set the multisig during the registration process or, if you already have a Tanssi-powered network (Quick Trial or Dedicated), you will need to have the following:

--8<-- 'text/builders/manage/dapp/prerequisites.md'

## Setting Up a Multisig for a New Appchain  {: #multisig-new-appchain }

In the first step to [deploy a new Tanssi-powered appchain](/builders/deploy/dapp/){target=\_blank} you are required to define the account that will have sudo privileges in the **Accounts** section.

![Accounts section](/images/builders/manage/dapp/multisig/multisig-1.webp)

In the **Sudo Address** field you can insert any account, although when selecting the field a menu with an option **Create Multisig Account** will be shown.

![Accounts section](/images/builders/manage/dapp/multisig/multisig-2.webp)

Upon clicking the **Create Multisig Account** meny entry, a modal window to set up your multisig will appear. 

1. Set your multisig's name.
2. Insert the addresses that will be part of the signing set.
3. Add or remove addresses from the set. The minimum addressess for a set is two.
4. Define the threshold of signatures to approve the transaction. The minimum threshold is two.
5. Click on **Create**.

![Accounts section](/images/builders/manage/dapp/multisig/multisig-3.webp)

Now your nultisig is stored and can now be used as the sudo for your new chain.

![Accounts section](/images/builders/manage/dapp/multisig/multisig-4.webp)

!!! note
    Your multisig has a unique address calculated with the addressess that are part of the signing set. Hence, you'll see a different account in the **Sudo Address**.

## Going Multisig on an Already Live Appchain  {: #multisig-live-appchain }

If you already have a live chain you can easily transfer the sudo rights to a multisig setup. To do so, head to the [dashboard](https://apps.tanssi.network/dashboard){target=\_blank} and on your appchain's card:

1. click on **Manage**
2. Click **Transfer Sudo** button in the panel on the right.

![Transfer Sudo](/images/builders/manage/dapp/multisig/multisig-5.webp)

The **Transfer Sudo** panel will be presented.

![Transfer Sudo](/images/builders/manage/dapp/multisig/multisig-6.webp)

When you click on the **New Sudo Address** field, a menu will be displayed showing several entries representing: the multisigs you might have already created, the accounts you have connected, and the **Create Multisig Account** action. 

![Transfer Sudo](/images/builders/manage/dapp/multisig/multisig-7.webp)

To create a new multisig, click on the **Create Multisig Account** button. A modal windows will show up

1. Set your multisig's name.
2. Insert the addresses that will be part of the signing set.
3. Add or remove addresses from the set. The minimum addressess for a set is two.
4. Define the threshold of signatures to approve the transaction. The minimum threshold is two.
5. Click on **Create**.

![Accounts section](/images/builders/manage/dapp/multisig/multisig-3.webp)

Now your nultisig is stored and can now be used as the sudo for your new chain. Select your newly created multisig, click on **Transfer Sudo**, sign the transaction, and that's it!

![Accounts section](/images/builders/manage/dapp/multisig/multisig-8.webp)

## Executing Privileged Transactions With a Multisig Setup {: #multisig-transactions }

The dApp's manage panel allows you to dispatch privileged transactions through a user friendly interface. Among those provileged actions we can find some that are related to the token management (such as minting tokens or changing the gas dinamycs), dispatching runtime upgrades, opening interoperability channels, and others.

When the appchain management is configured with a multisig account to act as sudo, the process involves several steps, because the transaction will only be executed when the threshold of valid signatures is met.

In the following example, a transaction to mint native tokens will be created, and then completed by another multisig participant. The multisig is configured as a two out of three, meaning that the first user that created the transaction will provide one valid signature, and a second user holding one of the remaining two valid addresses will sign and execute the transaction, completing the multisig flow.

!!! note
    To create a privileged transaction, or to sign a multisig transaction created by other user, you must hold an address included in the multisig setup and have it connected to the dApp. 

