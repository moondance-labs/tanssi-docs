---
title: Set Up a Block Producer Proxy Account
description: Follow these step-by-step instructions to configure a proxy account to manage block producer activities on behalf of your primary block producer account.
---

# Set Up a Proxy Account

## Introduction {: #introduction }

Proxy accounts can be set up to perform a limited number of actions on behalf of primary accounts and help keep the underlying accounts safe. As a block producer on Tanssi, it's a good idea to take advantage of proxy accounts to interact with the network in place of your block producer account.

The staking proxy type conveniently allows the proxy account to manage staking activities, such as delegating and rotating session keys, on behalf of the primary block producer account, effectively transforming it into a "hot wallet" for performing regular maintenance duties on behalf of your "cold wallet" block producer account. For added safety, you can regularly rotate the proxy account.

Proxy accounts can also help you implement the principle of least privilege for access control. For example, if you have multiple team members, you can give them the minimum access required to carry out their duties via a specific proxy account.

This tutorial will walk you through configuring a staking proxy account on the Tanssi Dancebox TestNet specifically for operations as a block producer. Then, it will demonstrate initiating a delegation using the newly created staking proxy.

## Checking Prerequisites {: #checking-prerequisites }

To follow along with this tutorial, you will need to have:

- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/accounts){target=\_blank} open and connected to the Tanssi Dancebox TestNet
- Create or have two accounts accessible in Polkadot.js Apps
- Both accounts will need to be funded with `DANCE` tokens, and the block producer account will need at least `{{ networks.dancebox.block_producers.min_self_del.dance }}` `DANCE`

If you need help importing your accounts into Polkadot.js Apps, please check out the [Connecting to Polkadot.js](/dapp-developers/developer-toolkit/substrate-api/wallets/talisman#connecting-to-polkadotjs){target=\_blank} guide.

## Creating a Staking Proxy Account {: #creating-a-staking-proxy-account }

There are a couple of ways you can create proxy accounts in [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/accounts){target=\_blank}, either from the **Extrinsics** page or the **Accounts** page. However, to create a time-delayed proxy, you will need to use the **Extrinsics** page. A time delay provides an additional layer of security to proxies by specifying a delay period based on the number of blocks. This will prevent the proxy account from executing a transaction until the delay period ends. The delay allows time for the primary account that controls the proxy to review pending transactions and provides a limited period of time to cancel any actions.

You also have the option of creating a proxy of type **Any** which grants the proxy account full and unrestricted control over the primary account. This means that the proxy account can transfer funds, and perform any arbitrary action. The following demo will showcase configuring a **Staking** proxy, which is more restrictive than an **Any** proxy, as it limits functions to activities that pertain to staking, such as delegating, undelegating, and mapping session keys.

To get started creating your proxy account, head to the **Developer** tab and select [**Extrinsics**](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/extrinsics){target=\_blank} from the dropdown. Next, you will need to take the following steps:

1. Select the primary account
2. From the **submit the following extrinsic** dropdown, select **proxy**
3. Choose the **addProxy** extrinsic
4. Choose **Id** from the **AccountIdLookupOf** dropdown
5. Select the **delegate** account for the proxy
6. From the **proxyType** dropdown, choose **Staking**
7. Optionally, you can add a time delay using a specified number of blocks to add an additional layer of security for the primary account to review the pending transaction
8. Click **Submit Transaction**

![Add a proxy account from the Extrinsics page of Polkadot.js Apps.](/images/node-operators/block-producers/onboarding/proxy-accounts/proxy-1.webp)

You will then be prompted to authorize and sign the transaction. Click **Sign and Submit** to create the proxy relationship. Once the transaction has been successfully submitted, you will receive some notifications confirming the transaction.

As previously mentioned, you can also create a proxy from the **Accounts** page. To do so, navigate to the **Accounts** page and take the following steps:

1. Select the three vertical dots next to the primary account
2. Select **Add proxy**

![Select the Add proxy menu item from the Accounts page of Polkadot.js Apps.](/images/node-operators/block-producers/onboarding/proxy-accounts/proxy-2.webp)

!!! note
    If the account already has a proxy, **Manage proxies** will be displayed as an option instead of **Add proxy**.

A pop-up will appear and you can enter the required information, such as the proxied/primary account, the proxy account, and the type of proxy to create a proxy account. First, click **Add proxy**.

![Add a proxy account from the Accounts page of Polkadot.js Apps](/images/node-operators/block-producers/onboarding/proxy-accounts/proxy-3.webp)

Then, take the following steps:

1. Select the account you would like to set as a proxy
2. Select the proxy type
3. Click **Submit** and sign the transaction

![Add the details of the proxy account, including the proxy account and type.](/images/node-operators/block-producers/onboarding/proxy-accounts/proxy-4.webp)

In the next section, you will learn how to verify that your proxy account was set up successfully.

## Verifying Your Proxy Account {: #verifying-your-proxy-account }

You can verify that your proxy account has been successfully set up in a couple of ways: either through the **Accounts** page or via the **Chain state** page.

To check your proxy accounts from the [**Chain state** page](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/chainstate){target=\_blank}, you can take the following steps:

1. From the **selected state query** dropdown, select **proxy**
2. Choose the **proxies** extrinsic
3. Select your primary/proxied account
4. Click on the **+** button to send the query

![Verify your proxy accounts via the Extrinsics page of Polkadot.js Apps.](/images/node-operators/block-producers/onboarding/proxy-accounts/proxy-5.webp)

The result will appear on the page showing you information about all of your proxies, including the delegate/proxy account address, the proxy type, the delay period if one was specified, and the total bond amount for all of your proxies in Planck.

You can also check your proxy accounts from the **Accounts** page. To do so, navigate to the **Accounts** page, and there should be a Proxy symbol next to the primary account. Hover over the icon and click on **Manage proxies** to review your proxies.

![Hover over the proxy icon to manage your proxies via the Accounts page of Polkadot.js Apps.](/images/node-operators/block-producers/onboarding/proxy-accounts/proxy-6.webp)

A pop-up will appear where you can see an overview of all of your proxy accounts.

![Review your proxy accounts.](/images/node-operators/block-producers/onboarding/proxy-accounts/proxy-7.webp)

## Executing a Proxy Transaction {: #executing-a-proxy-transaction }

Now that you have created a proxy account and verified that it was successfully set up, you can execute a transaction using the staking proxy account on behalf of your block producer account, also known as the primary account or the account that is being proxied. The following example will demonstrate initiating a self-delegation. The proxy configuration shown is a realistic example of how you might have your own proxy configured for your block producer primary account.

To execute a transaction, you can navigate back to the [**Extrinsics** page](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/extrinsics){target=\_blank} and take the following steps:

1. Select the proxy account to submit the transaction from the **using the select account** dropdown
2. From the **submit the following extrinsic** menu, select **proxy**
3. Choose the **proxy** extrinsic
4. Choose **Id** from the **AccountIdLookupOf** dropdown
5. Select the primary account from the **real** dropdown
6. Select the **pooledStaking** call
7. Choose the **requestDelegate** extrinsic
8. Enter the **candidate** address, which is the block producer account
9. Select **AutoCompounding** or **ManualRewards** for the **pool** field
10. Enter the amount to stake. This amount must meet the minimum, which is {{ networks.dancebox.block_producers.min_self_del.dance }} DANCE tokens. You'll need to submit the value in [Planck](https://wiki.polkadot.network/docs/learn-DOT#the-planck-unit){target=\_blank}, so for {{ networks.dancebox.block_producers.min_self_del.dance }}, you'll need to enter `{{ networks.dancebox.block_producers.min_self_del.planck }}`
11. Click **Submit Transaction**

![Execute a proxy transaction from the Extrinsics page of Polkadot.js Apps.](/images/node-operators/block-producers/onboarding/proxy-accounts/proxy-8.webp)

A pop-up will appear for you to authorize and sign the transaction. Enter your password for the proxy account and click **Sign and Submit**. To confirm the delegation request, you'll need to execute the pending request after two sessions have passed. Please refer to the instructions for [executing pending requests](/node-operators/block-producers/onboarding/account-setup/#execute-pending-request){target=\_blank} for a step-by-step guide. You can also [map your session keys to your block producer account](/node-operators/block-producers/onboarding/account-setup/#map-session-keys){target=\_blank} via proxy.

After you've mapped your session keys and executed the pending delegation request, you can [verify that your block producer is in the list of eligible candidates](/node-operators/block-producers/onboarding/account-setup/#verify){target=\_blank}.

That's it! You've successfully executed a transaction using a proxy account on behalf of your primary block producer account.

--8<-- 'text/_disclaimers/third-party-content.md'
