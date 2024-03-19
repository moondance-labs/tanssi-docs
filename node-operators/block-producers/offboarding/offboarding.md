---
title: Offboarding
description: In these step-by-step instructions, learn how to properly offboard as a Tanssi block producer, including unmapping your session keys and unstaking your bond.
---

# Offboard as a Tanssi Block Producer

## Introduction {: #introduction }

This guide will show you how to properly wind down your operations as a Tanssi block producer. Naturally, this guide assumes that you're an existing Tanssi block producer with a [block-producing node](/node-operators/block-producers/onboarding/run-a-block-producer){target=\_blank} and mapped [session keys](https://wiki.polkadot.network/docs/learn-keys#session-keys){target=\_blank}. By following the steps outlined in this guide, you can properly cease operations as a Tanssi block producer. 

## Request Undelegation {: #request-undelegation }

When you set up your Tanssi block producer node, you had to submit a delegation bond of at least {{ networks.dancebox.block_producers.min_self_del.dance }} DANCE. To get that back and remove your block producer from the list of eligible candidates, you'll need to take steps similar to those in the onboarding process.

Head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-rpc.a.dancebox.tanssi.network#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Extrinsics** from the dropdown, and take the following steps:

1. Select the account from which you want to send the extrinsic. This account must be your existing block producer account that you initially delegated from
2. Select the **pooledStaking** module 
3. Select the **requestUndelegate** extrinsic
4. Enter your account, which is, again, the same account you are sending the extrinsic from and the account you want to decommission as a block producer
5. Choose the target pool that you originally used when configuring your delegation (either **Autocompounding** or **Manual**)
6. Select **Stake** from the dropdown
7. Enter the amount to unstake. You'll need to submit the value in [Planck](https://wiki.polkadot.network/docs/learn-DOT#the-planck-unit){target=\_blank}. As a reminder, the minimum stake amount is {{ networks.dancebox.block_producers.min_self_del.dance }}. Therefore, if you delegated the minimum amount without autocompounding, you'll need to enter `{{ networks.dancebox.block_producers.min_self_del.planck }}`
8. Click **Submit Transaction** and sign and send the transaction from your wallet

![Create and submit an extrinsic to un-delegate on Polkadot.js Apps](/images/node-operators/block-producers/offboarding/offboarding/offboarding-1.webp)

### Execute the Pending Request {: #execute-pending-request }

Before executing the pending request, you'll need to retrieve the session at which you submitted the request to delegate. To do so, head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-rpc.a.dancebox.tanssi.network#/chainstate){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **pooledStaking** module.
2. Select the **pendingOperations** query
3. Enter your block producer account
4. Toggle the **include option** slider off
5. Click the **+** button next to the extrinsic field
6. The pending request will be displayed at the bottom of the page

![Query the pending undelegation request on Polkadot.js Apps](/images/node-operators/block-producers/offboarding/offboarding/offboarding-2.webp)

In the example in the above image, the undelegate request to leave the auto-compounding pool was submitted during session `5,037`. So, the request can be executed starting at session `5,039`. Take note of the operation and the session number at which you submitted the request, as you'll need both values to execute the pending request.

You can run another query from the **Chain state** page to check the current session. To do so, you can:

1. Select the **session** module
2. Select the **currentIndex** query
3. Click the **+** button next to the extrinsic field
4. The current session will be displayed at the bottom of the page

![Query the current session index on Polkadot.js Apps](/images/node-operators/block-producers/offboarding/offboarding/offboarding-3.webp)

If at least two sessions have passed from the session you submitted the extrinsic, the request is ready to be executed. To do so, select **Extrinsics** from the **Developer** dropdown and take the following steps:

1. Select the account from which you want to send the extrinsic
2. Select the **pooledStaking** module
3. Select the **executePendingOperations** extrinsic
4. For **delegator**, enter your account, which is the same account you sent the self-delegate request from
5. For **operation**, select **Leaving**
6. For **candidate**, enter the same account as you did in the **delegator** field
7. For **at**, enter the session number at which you submitted the delegate request
8. Click **Submit Transaction** and sign and send the transaction from your wallet

![Create and submit an extrinsic to execute the pending self-delegation request on Polkadot.js Apps](/images/node-operators/block-producers/offboarding/offboarding/offboarding-4.webp)

## Verify That Your Account Is Not in the List of Eligible Candidates {: #verify }

If you'd like, you can verify that your block-producing node is no longer in the list of eligible candidates. To do so, go to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-rpc.a.dancebox.tanssi.network#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **pooledStaking** module and the **sortedEligibleCandidates** query
2. Click the **+** button next to the extrinsic field
3. A list of the eligible candidates and their stakes will be displayed at the bottom of the page. You can search for your address to ensure that it does not exist in the list

![Query the current list of eligible candidates on Polkadot.js Apps](/images/node-operators/block-producers/offboarding/offboarding/offboarding-5.webp)

## Unmap Session Keys {: #unmap-session-keys }

Session keys are used to perform network operations, such as signing blocks, whereas your block producer account holds the staked funds and has an on-chain identity. By unmapping the session key to your account, you sever the association between your block producer account and your block-producing node. 

The unmapping step is taken only as part of the offboarding process. If you need to rotate/change your session keys, you'll need to follow the [instructions for mapping (rotating) your session keys](/node-operators/block-producers/onboarding/account-setup/#map-session-keys){target=\_blank}. You should not purge your keys during the session key rotation process.

To unmap your session keys, head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-rpc.a.dancebox.tanssi.network#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Extrinsics** from the dropdown, and take the following steps:

1. Select your Tanssi block producer account
2. Select the **session** module 
3. Select **purgeKeys** extrinsic
4. Click **Submit Transaction** and sign and send the transaction from your wallet

![Unmap session keys on Polkadot.js Apps](/images/node-operators/block-producers/offboarding/offboarding/offboarding-6.webp)

Using the `session.keyOwner` method, you can verify that your session keys have been unmapped from your account as expected. To do this on [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-rpc.a.dancebox.tanssi.network#/chainstate){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **session** module
2. Select the **keyOwner** query
3. Enter `nmbs` in the **SpCoreCryptoKeyTypeId** field
4. For **Bytes**, enter your hex-encoded session keys
5. Click the **+** button next to the extrinsic field
6. The query should return none

![Verifying Unmapping was successful](/images/node-operators/block-producers/offboarding/offboarding/offboarding-7.webp)

And that's it! You have successfully offboarded a Tanssi Block producer. If you change your mind at any point and want to onboard back as a Tanssi Block producer, you can follow the steps in the [onboarding guide](node-operators/block-producers/onboarding/account-setup/){target=\_blank}. 