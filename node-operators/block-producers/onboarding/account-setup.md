---
title: Setup an Account to Produce Blocks
description: Follow these step-by-step instructions on becoming eligible to produce blocks on Tanssi-powered networks and setting up your account for rewards payouts.
---

# Set Up Your Account to Produce Blocks on Tanssi

## Introduction {: #introduction }

Before you can start producing blocks on Tanssi-powered networks, you'll need to set up your account and establish your eligibility.

You must have spun up a [block-producing node](/node-operators/block-producers/onboarding/run-a-block-producer/){target=\_blank} to tackle the account setup steps in this guide.

You'll need to set up your account by generating [session keys](https://wiki.polkadot.network/docs/learn-keys#session-keys){target=\_blank} and mapping those session keys to your account.  This account is the one to which delegators will choose to delegate and where your rewards will be distributed. You can optionally [establish a proxy account](/node-operators/block-producers/operational-tasks/proxy-accounts/){target=\_blank} for additional security. 

To establish eligibility, you must delegate yourself as a block producer and meet the minimum bond requirements.

By following the steps outlined in this guide, you'll learn everything you need to know to get started producing blocks within the Tanssi ecosystem.

## Important Variables {: #important-variables }

When establishing eligibility to produce blocks, there are a couple of variables to be aware of:

- **Minimum self-delegation** - there is a minimum amount you must self-delegate to be considered eligible
- **Session** - a period that has a constant set of block producers
- **Tanssi block producers per session** - the number of block producers assigned to Tanssi per session
- **Network block producers per session** - the number of block producers assigned to a Tanssi-powered network per session

|               Variable               |                                                              Value                                                               |
|:------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------:|
|       Minimum self-delegation        |                                 {{ networks.dancebox.block_producers.min_self_del.dance }} DANCE                                 |
|               Session                |                                          {{ networks.dancebox.session.blocks }} blocks                                           |
|  Tanssi block producers per session  | {{ networks.dancebox.block_producers.tanssi.min.num }} to {{ networks.dancebox.block_producers.tanssi.max.num }} block producers |
| Network block producers per session |                               {{ networks.dancebox.block_producers.appchain.num }} block producers                               |

## Map an Account to Your Block Producer Node {: #map-account }

The first step is a two-step process that generates [session keys](https://wiki.polkadot.network/docs/learn-keys#session-keys){target=\_blank} and maps the session keys to your account. Session keys are used to perform network operations, such as signing blocks, whereas your account holds the staked funds and has an on-chain identity. By mapping the session key to your account, you create an association between your account and your block-producing node.

You will need to create session keys for your primary and backup servers. Each of your servers, your primary and backup, should have its own unique keys. Since the keys never leave your servers, you can consider them a unique ID for that server.

### Generate Session Keys {: #generate-session-keys }

Before generating session keys, you must be [running a block-producing node](/node-operators/block-producers/onboarding/run-a-block-producer/){target=\_blank}.

To generate session keys, you'll send an RPC call, using the `author_rotateKeys` method, to your node's HTTP endpoint. For reference, if your block producer's HTTP endpoint is at port `9944`, the JSON-RPC call might look like this:

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

To perform the next step and map your session keys to your account, head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancebox.dns_name }}#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Extrinsics** from the dropdown, and take the following steps:

1. Select your account, which should be the same account that you previously self-delegated
2. Select the **session** module and the **setKeys** extrinsic
3. For **keys**, enter your session keys
4. For **proof**, enter `0x`
5. Click **Submit Transaction** and sign and send the transaction from your wallet

![Create and submit an extrinsic to set session keys on Polkadot.js Apps](/images/node-operators/block-producers/onboarding/account-setup/setup-1.webp)

Using the `session.keyOwner` method, you can verify that your session keys have been mapped to your account as expected. To do this on [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancebox.dns_name }}#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **session** module and the **keyOwner** query
2. Enter `nmbs` in the **SpCoreCryptoKeyTypeId** field
3. For **Bytes**, enter your hex-encoded session keys
4. Click the **+** button next to the extrinsic field
5. The account associated with the session keys, which should be your account, will be displayed at the bottom of the page

![Create and submit query to verify session keys on Polkadot.js Apps](/images/node-operators/block-producers/onboarding/account-setup/setup-2.webp)

## Submit Self-Delegation {: #submit-self-delegation }

The next step towards becoming eligible to produce blocks on Tanssi-powered networks is to delegate to your own account. To do this, you'll be required to submit a minimum of {{ networks.dancebox.block_producers.min_self_del.dance }} DANCE tokens.

After you've submitted the request to delegate, you'll need to wait for a minimum of {{ networks.dancebox.staking.joining_delay_sessions_text }} sessions before you can execute the pending request. There are {{ networks.dancebox.session.blocks }} blocks in a session. So, {{ networks.dancebox.staking.joining_delay_sessions_text }} sessions are {{ networks.dancebox.staking.joining_delay_blocks }} blocks, which can take around {{ networks.dancebox.staking.joining_delay_hours_text }} hours.

Block producers are assigned upon each session, requiring {{ networks.dancebox.block_producers.appchain.display }} per network and a minimum of {{ networks.dancebox.block_producers.tanssi.min.display }} to {{ networks.dancebox.block_producers.tanssi.max.display }} for Tanssi. The block producers participating in the session are picked from the list of candidates ordered by total stake until the total number of block producers required is covered. So, you'll need to ensure that your total stake is enough to fill one of the slots, which may require more than {{ networks.dancebox.block_producers.min_self_del.dance }} DANCE tokens.

### Request Delegate {: #request-delegate }

Head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancebox.dns_name }}#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Extrinsics** from the dropdown, and take the following steps:

1. Select the account from which you want to send the extrinsic. This account must be the same account that you are delegating to and is the account that you want to become a block producer
2. Select the **pooledStaking** module and the **requestDelegate** extrinsic
3. Enter your account, which is, again, the same account you are sending the extrinsic from and the account you want to become a block producer
4. Choose the target pool. The pool can either be the auto-compounding pool, which auto-compounds delegation rewards, or the manual rewards pool, in which all actions related to rewards are manual
5. Enter the amount to stake. This amount must meet the minimum, which is {{ networks.dancebox.block_producers.min_self_del.dance }} DANCE tokens. You'll need to submit the value in [Planck](https://wiki.polkadot.network/docs/learn-DOT#the-planck-unit){target=\_blank}, so for {{ networks.dancebox.block_producers.min_self_del.dance }}, you'll need to enter `{{ networks.dancebox.block_producers.min_self_del.planck }}`
6. Click **Submit Transaction** and sign and send the transaction from your wallet

![Create and submit an extrinsic to self-delegate on Polkadot.js Apps](/images/node-operators/block-producers/onboarding/account-setup/setup-3.webp)

### Execute the Pending Request {: #execute-pending-request }

Before executing the pending request, you'll need to retrieve the session at which you submitted the request to delegate. To do so, head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancebox.dns_name }}#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **pooledStaking** module and the **pendingOperations** query
2. Enter your account
3. Toggle the **include option** slider off
4. Click the **+** button next to the extrinsic field
5. The pending request will be displayed at the bottom of the page

![Query the pending self-delegation request on Polkadot.js Apps](/images/node-operators/block-producers/onboarding/account-setup/setup-4.webp)

In the example in the above image, the delegate request to join the auto-compounding pool was submitted during session 4,829. So, the request can be executed starting at session 4,831.

Take note of the operation and the session number at which you submitted the request, as you'll need both values to execute the pending request.

You can run another query from the **Chain state** page to check the current session. To do so, you can:

1. Select the **session** module and the **currentIndex** query
2. Click the **+** button next to the extrinsic field
3. The current session will be displayed at the bottom of the page

![Query the current session index on Polkadot.js Apps](/images/node-operators/block-producers/onboarding/account-setup/setup-5.webp)

If the request can be executed, select **Extrinsics** from the **Developer** dropdown and take the following steps:

1. Select the account from which you want to send the extrinsic
2. Select the **pooledStaking** module and the **executePendingOperations** extrinsic
3. For **delegator**, enter your account, which is the same account you sent the self-delegate request from
4. For **operation**, select the type of operation to execute. This should be either **JoiningAutoCompounding** or **JoiningManualRewards**, depending on the target pool you selected at the time of submitting the self-delegation request
5. For **candidate**, enter the same account as you did in the **delegator** field
6. For **at**, enter the session id at which you submitted the delegate request
7. Click **Submit Transaction** and sign and send the transaction from your wallet

![Create and submit an extrinsic to execute the pending self-delegation request on Polkadot.js Apps](/images/node-operators/block-producers/onboarding/account-setup/setup-6.webp)

Now, you have completed all of the necessary account setup to be eligible to produce blocks!

## Verify That Your Account Is in the List of Eligible Candidates {: #verify }

If you've followed all of the steps in this guide and have fully synced your block-producing node, you are now eligible to produce blocks. To verify that you are in the list of eligible candidates, you can go to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancebox.dns_name }}#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **pooledStaking** module and the **sortedEligibleCandidates** query
2. Click the **+** button next to the extrinsic field
3. A list of the eligible candidates and their stake will be displayed at the bottom of the page. You can search for your address to ensure you are eligible to produce blocks

![Query the current list of eligible candidates on Polkadot.js Apps](/images/node-operators/block-producers/onboarding/account-setup/setup-7.webp)

Remember that you'll need to be in the top candidates by total stake to produce blocks, and this is based on the number of [block producers required for each network and Tanssi](#important-variables).
