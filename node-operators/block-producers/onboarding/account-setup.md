---
title: Setup an Account to Produce Blocks
description: Follow these step-by-step instructions on becoming eligible to produce blocks on Tanssi and Tanssi Appchains and setting up your account for rewards payouts.
---

# Set Up Your Account to Produce Blocks on Tanssi

## Introduction {: #introduction }

Before you can start producing blocks on Tanssi and Tanssi Appchains, you'll need to set up your account and establish your eligibility.

To establish your eligibility, you must [spin up a block-producing node](/node-operators/block-producers/onboarding/run-a-block-producer){target=\_blank}, meet the minimum bond requirements, and delegate yourself as a block producer.

Then, you'll need to set up your account by generating [session keys](https://wiki.polkadot.network/docs/learn-keys#session-keys){target=\_blank} and mapping those session keys to your account. This account is the account to which delegators will choose to delegate and where your rewards will be distributed.

By following the steps outlined in this guide, you'll learn everything you need to know to get started producing blocks within the Tanssi ecosystem.

## Submit Self-Delegation {: #TODO }

The first step of becoming eligible to produce blocks on Tanssi and Tanssi Appchains is to delegate to your own account. To do this, you'll be required to submit a minimum of 10,000 DANCE tokens.

Head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-rpc.a.dancebox.tanssi.network#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Extrinsics** from the dropdown, and take the following steps:

1. Select the account from which you want to send the extrinsic. This account must be the same account that you are delegating to and is the account that you want to become a block producer
2. Select the **pooledStaking** module and the **requestDelegate** extrinsic
3. Enter your account, which is, again, the same account you are sending the extrinsic from and the account you want to become a block producer
4. Choose the target pool. The auto-compounding pool
5. Enter the amount to stake. This amount must meet the minimum, which is 10,000 DANCE tokens. You'll need to submit the value in Planck, so for 10,000, you'll need to enter `10000000000000000`
6. Click **Submit Transaction** and sign and send the transaction from your wallet

![Create and submit an extrinsic to self-delegate on Polkadot.js Apps](/images/node-operators/block-producers/onboarding/account-setup/setup-1.webp)

After submitting your self-delegation, it will take a minimum of two sessions before you'll be eligible to produce blocks.

## Map an Account to Your Block Producer Node {: #map-account }

The next step is a two-step process that generates [session keys](https://wiki.polkadot.network/docs/learn-keys#session-keys){target=\_blank} and maps the session keys to your account. Session keys are used to perform network operations, such as signing blocks. By mapping the session key to your account, you create an association between your account and your block-producing node.

You will need to create session keys for your primary and backup servers. Each of your servers, your primary and backup, should have its own unique keys. Since the keys never leave your servers, you can consider them a unique ID for that server.

### Generate Session Keys {: #generate-session-keys }

Before generating session keys, you must be [running a block-producing node](/node-operators/block-producers/onboarding/run-a-block-producer){target=\_blank}.

To generate session keys, you'll send an RPC call, using the `author_rotateKeys` method, to your node's HTTP endpoint. For reference, if your collator's HTTP endpoint is at port `9944`, the JSON-RPC call might look like this:

```bash
curl http://127.0.0.1:9944 -H \
"Content-Type:application/json;charset=utf-8" -d \
  '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"author_rotateKeys",
    "params": []
  }'
```

Your hex-encoded session keys will be printed to the terminal in the `"result"` field.

--8<-- 'code/node-operators/block-producers/onboarding/account-setup/terminal/generate-session-keys.md'

Make sure you write down your session keys; you'll need to map your session keys to your account in the next section.

### Map Session Keys {: #map-session-keys }

To perform the final step and map your session keys to your account, head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-rpc.a.dancebox.tanssi.network#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Extrinsics** from the dropdown, and take the following steps:

1. Select your account, which should be the same account that you previously self-delegated
2. Select the **session** module and the **setKeys** extrinsic
3. For **keys**, enter your session keys
4. For **proof**, enter `0x`
5. Click **Submit Transaction** and sign and send the transaction from your wallet

![Create and submit an extrinsic to set session keys on Polkadot.js Apps](/images/node-operators/block-producers/onboarding/account-setup/setup-2.webp)

Using the `session.keyOwner` method, you can verify that your session keys have been mapped to your account as expected. To do this on [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-rpc.a.dancebox.tanssi.network#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **session** module and the **keyOwner** query
2. Enter `nmbs` in the **SpCoreCryptoKeyTypeId** field
3. For **Bytes**, enter your hex-encoded session keys
4. Click the **+** button next to the extrinsic field
5. The account associated with the session keys, which should be your account, will be displayed at the bottom of the page

![Create and submit query to verify session keys on Polkadot.js Apps](/images/node-operators/block-producers/onboarding/account-setup/setup-3.webp)
