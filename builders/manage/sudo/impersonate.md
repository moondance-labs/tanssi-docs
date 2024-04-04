---
title: Impersonating Other Accounts With Sudo 
description: Learn how to use the Sudo key to dispatch calls by signing a transaction as if it came from a different account.
---

# Using Sudo to Impersonate Other Accounts

## Introduction {: #introduction }

[Sudo](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/index.html){target=\_blank} is a module that enables privileged runtime calls to be dispatched when called from the Sudo account. Sudo is sometimes colloquially referred to as a superuser or god-like account. This allows you to perform privileged actions while managing your appchain, such as impersonating other accounts. 

In this guide, you'll learn how to use Sudo to impersonate other accounts. As an example, this guide will use the Sudo account to pose as an arbitrary account and transfer funds from said account.

!!! warning
    The balance transfer demonstrated in this guide is dubious, shown only as an example of using Sudo. 

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - A Tanssi appchain (Snap or Dedicated)
 - Your appchain's Sudo account connected to your appchain's Polkadot.js Apps. You can refer to the [Managing Sudo guide](/builders/manage/sudo/sudo/#configuring-polkadotjs-apps){target=\_blank} for instructions on injecting your Sudo account into Polkadot.js Apps

If you're unsure what your Tanssi appchain's Sudo account is, you can find it in your [Tanssi Dashboard](https://apps.tanssi.network/){target=\_blank} underneath the **Properties** section.

![Locating your Sudo address on apps.tanssi.network](/images/builders/manage/sudo/impersonate/impersonate-1.webp)

!!! warning
    You should always protect your Sudo account key with the utmost security precautions, as it grants privileged access to your Tanssi appchain.

## Using Sudo As {: #using-sudo-as }

As you know, the Sudo account can perform privileged functions, including impersonating other accounts. When submitting a call via `sudoAs`, the runtime will first authenticate the Sudo key and then dispatch the desired function call with the `Signed` origin from a given account. In the following example, we'll use `sudoAs` to send some tokens to another account. While the result is similar to using sudo with a `forceBalanceTransfer` call, the following example uses a regular balance transfer call where the origin is the sender's account rather than the sudo account. 

To make a `sudoAs` call to impersonate another account, navigate to the **Developer** Tab of Polkadot.js Apps for your Tanssi appchain and click on **Sudo**. If you do not see **Sudo** in this menu, then you have not associated the Sudo account with Polkadot.js Apps. Make sure that your Sudo account is injected by your wallet and connected to Polkadot.js Apps. Then, take the following steps:

1. Select the **sudo** pallet
2. Select the **sudoAs** method
3. Select or paste in the desired account to impersonate
4. Select the desired pallet for the call to submit. In this case, it is the **balances** pallet
5. Select the **transferAllowDeath** method 
6. Specify the destination account for the balance transfer
7. Specify the number of tokens to send
8. Press **SubmitSudo** and confirm the resulting pop-up

![Make a sudo as call](/images/builders/manage/sudo/impersonate/impersonate-2.webp)

The other account had a starting balance of `1,000` tokens prior to the call, and has subsequently dropped to `995` as expected. 

![Check balances on Polkadot.js Apps](/images/builders/manage/sudo/impersonate/impersonate-3.webp)

## Using Sudo and Dispatch As Utility {: #using-sudo-and-dispatch-as-utility }

The following section will demonstrate using sudo to dispatch calls from an arbitrary origin. When submitting a call in this manner, the runtime will first authenticate the sudo key and then dispatch the call using the `utility` pallet and the `dispatchAs` function, allowing the transaction's origin to be exactly what you'd like.  

To do so, navigate to the **Developer** Tab of Polkadot.js Apps for your Tanssi appchain and click on **Sudo**. If you do not see **Sudo** in this menu, then you have not associated the Sudo account with Polkadot.js Apps. Make sure that your Sudo account is injected by your wallet and connected to Polkadot.js Apps. Then, take the following steps:

1. Select the **sudo** pallet
2. Select the **sudo** method
4. Select the desired pallet for the call to submit. In this case, it is the **utility** pallet
5. Select the **dispatchAs** method 
6. Select **system** from the dropdown
7. Select the **signed** origin. This indicates we want the origin of the transaction to be the account we specify rather than root
8. Select the desired pallet for the call to submit. In this case, it is the **balances** pallet
9. Select the **transferAllowDeath** method 
10. Specify the destination account for the balance transfer
11. Specify the number of tokens to send
12. Press **SubmitSudo** and confirm the resulting pop-up

![Use Sudo Dispatch As on Polkadot.js Apps](/images/builders/manage/sudo/impersonate/impersonate-4.webp)

The other account had a starting balance of `995` tokens prior to the call, and has subsequently dropped to `990` as expected. 

![Check balances on Polkadot.js Apps](/images/builders/manage/sudo/impersonate/impersonate-5.webp)

And that's it! The [Using Sudo](/builders/manage/sudo/) section has plenty more guides on how you can use the Sudo account to manage your Tanssi appchain.

--8<-- 'text/_disclaimers/third-party-content.md'