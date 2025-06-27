---
title: Decommissioning Your Sequencer
description: In these step-by-step instructions, learn how to properly offboard as a Tanssi sequencer, including unmapping your session keys and unstaking your bond.
icon: octicons-arrow-down-right-24
---

# Offboard as a Tanssi Sequencer

## Introduction {: #introduction }

As a sequencer, there may come a time when you need to gracefully exit the network. Decommissioning your account involves a two-step process to ensure that your node is properly disassociated from your account and that you receive your bond back.

This guide will show you how to wind down your operations as a Tanssi sequencer properly. This includes undelegating your self-delegation to reclaim your bond and unmapping your session keys to sever the connection between your node and your account. Naturally, this guide assumes that you're an existing Tanssi sequencer with a [sequencer node](/node-operators/sequencers/onboarding/run-a-sequencer/){target=\_blank} and mapped [session keys](https://wiki.polkadot.network/general/web3-and-polkadot/#session-keys){target=\_blank}.

## Request Undelegation {: #request-undelegation }

When you set up your Tanssi sequencer, you had to submit a delegation bond of at least `{{ networks.dancebox.block_producers.min_self_del.dance }}` DANCE. To get that back and remove your sequencer from the list of eligible candidates, you'll need to take steps similar to those in the onboarding process.

### View Existing Stake {: #viewing-existing-stake }

Before undelegating, it is helpful first to see how much you have staked, as you'll need to provide this figure later. To do so, head to the [developer portal](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/chainstate){target=\_blank}, click on the **Developer** tab, select **Chain State** from the dropdown, and take the following steps:

1. Select the **pooledStaking** module
2. Select the **pools** query
3. Enter your sequencer account
4. Ensure that the **include option** slider is toggled on
5. In the **option** field, you select **JoiningShares**
6. Click the **+** button next to the extrinsic field

![Check existing stake on the developer portal](/images/node-operators/sequencers/offboarding/account/account-1.webp)

Note, **JoiningShares** returns only the initial amount you delegated when configuring your sequencer. To get your total amount staked, you'll need to repeat the above steps for either **ManualRewardShares** or **ManualRewardSharesHeldStake** if you didn't select Autocompounding, and either **AutoCompoundingShares** or **AutoCompoundingSharesHeldStake** if you configured Autocompounding. Then add your autocompounding or manual shares value to **JoiningShares** to get your total delegation outstanding.

As an example, the total stake of an autocompounding sequencer can be calculated by adding **JoiningShares** to **AutoCompoundingShares**. Note this amount, as you'll need it in the next section.

### Submit Undelegation Request {: #submit-undelegation-request }

Head to the [developer portal](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Extrinsics** from the dropdown, and take the following steps:

1. Select the account from which you want to send the transaction. This account must be your existing sequencer account that you initially delegated from
2. Select the **pooledStaking** module
3. Select the **requestUndelegate** extrinsic
4. Enter your account, which is, again, the same account you are sending the extrinsic from and the account you want to decommission as a sequencer
5. Choose the target pool that you originally used when configuring your delegation (either **Autocompounding** or **Manual**)
6. Select **Stake** or **Shares** from the dropdown
7. Enter the amount to unstake. If you selected **Shares**, simply enter the number of Shares. If you selected **Stake**, you'll need to submit the value in [Planck](https://wiki.polkadot.network/learn/learn-dot/#the-planck-unit){target=\_blank}. As a reminder, the minimum stake amount is `{{ networks.dancebox.block_producers.min_self_del.dance }}` DANCE. If you delegated the minimum amount and didn't accumulate additional rewards, you'll need to enter `{{ networks.dancebox.block_producers.min_self_del.planck }}` Planck
8. Click **Submit Transaction** and sign and send the transaction from your wallet

![Create and submit an extrinsic to un-delegate on the developer portal](/images/node-operators/sequencers/offboarding/account/account-2.webp)

### Execute the Pending Request {: #execute-pending-request }

You'll need to wait at least {{ networks.dancebox.staking.leaving_delay_sessions_text }} sessions before executing the pending request. Each session is comprised of `{{ networks.dancebox.session.blocks }}` blocks and translates to about {{ networks.dancebox.session.hours }} hour per session. So, {{ networks.dancebox.staking.leaving_delay_sessions_text }} sessions correspond to approximately {{ networks.dancebox.staking.leaving_delay_hours_text }} hours.

Before executing the pending request, you'll need to retrieve the session at which you submitted the request to delegate. To do so, head to the [developer portal](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/chainstate){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **pooledStaking** module
2. Select the **pendingOperations** query
3. Enter your sequencer account
4. Toggle the **include option** slider off
5. Click the **+** button next to the extrinsic field
6. The pending request will be displayed at the bottom of the page

![Query the pending undelegation request on the developer portal](/images/node-operators/sequencers/offboarding/account/account-3.webp)

In the example in the above image, the undelegate request to leave the auto-compounding pool was submitted during session `5,037`. So, the request can be executed starting at session `5,039`. Take note of the operation and the session index at which you submitted the request, as you'll need both values to execute the pending request.

You can run another query from the **Chain state** page to check the current session. To do so, you can:

1. Select the **session** module
2. Select the **currentIndex** query
3. Click the **+** button next to the extrinsic field
4. The current session will be displayed at the bottom of the page

![Query the current session index on the developer portal](/images/node-operators/sequencers/offboarding/account/account-4.webp)

If at least two sessions have passed from the session you submitted the extrinsic, the request is ready to be executed. To do so, select **Extrinsics** from the **Developer** dropdown and take the following steps:

1. Select the account from which you want to send the extrinsic
2. Select the **pooledStaking** module
3. Select the **executePendingOperations** extrinsic
4. For **delegator**, enter your account, which is the same account you sent the self-delegate request from
5. For **operation**, select **Leaving**
6. For **candidate**, enter the same account as you did in the **delegator** field
7. For **at**, enter the session index at which you submitted the delegate request
8. Click **Submit Transaction** and sign and send the transaction from your wallet

![Create and submit an extrinsic to execute the pending self-delegation request on the developer portal](/images/node-operators/sequencers/offboarding/account/account-5.webp)

### Verify That Your Account Is Not in the List of Eligible Candidates {: #verify }

If you'd like, you can verify that your sequencer is no longer in the list of eligible candidates. To do so, go to the [developer portal](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **pooledStaking** module and the **sortedEligibleCandidates** query
2. Click the **+** button next to the extrinsic field
3. A list of the eligible candidates and their stakes will be displayed at the bottom of the page. You can search for your address to ensure that it does not exist in the list

![Query the current list of eligible candidates on the developer portal](/images/node-operators/sequencers/offboarding/account/account-6.webp)

## Unmap Session Keys {: #unmap-session-keys }

Session keys are used to perform network operations, such as signing blocks, whereas your sequencer account holds the staked funds and has an on-chain identity. By unmapping the session key to your account, you sever the association between your sequencer account and your sequencer node.

The unmapping step is taken only as part of the offboarding process. If you need to rotate/change your session keys, you'll need to follow the [generating and mapping new session keys](/node-operators/sequencers/onboarding/account-setup/#map-session-keys){target=\_blank}. You should not purge your keys during the session key rotation process.

To unmap your session keys, head to the [developer portal](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Extrinsics** from the dropdown, and take the following steps:

1. Select your Tanssi sequencer account
2. Select the **session** module
3. Select **purgeKeys** extrinsic
4. Click **Submit Transaction** and sign and send the transaction from your wallet

![Unmap session keys on the developer portal](/images/node-operators/sequencers/offboarding/account/account-7.webp)

Using the `session.keyOwner` method, you can verify that your session keys have been unmapped from your account as expected. To do this on the [developer portal](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/chainstate){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **session** module
2. Select the **keyOwner** query
3. Enter `nmbs` in the **SpCoreCryptoKeyTypeId** field
4. For **Bytes**, enter your hex-encoded session keys
5. Click the **+** button next to the extrinsic field
6. The query should return none

![Verifying Unmapping was successful](/images/node-operators/sequencers/offboarding/account/account-8.webp)

And that's it! You have successfully offboarded a Tanssi sequencer. If you change your mind at any point and want to onboard back as a Tanssi sequencer, you can follow the steps in the [onboarding guide](/node-operators/sequencers/onboarding/account-setup/){target=\_blank}.
