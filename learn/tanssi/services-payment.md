---
title: Block Production Services Payment
description: Appchains deployed through Tanssi benefit from block production services provided by a set of node operators, who are compensated through staking rewards.
---

# Services Payments {: #technical-features-of-tanssi }

## Introduction {: #introduction }

As presented in the [Overview](/learn/tanssi/overview/){target=\_blank} article, Tanssi is an infrastructure protocol that addresses the complexities and high costs associated with setting up and maintaining blockchain infrastructure, streamlining the deployment of appchains. This protocol brings benefits for both participants:

- **Appchains** - teams can focus on the core logic of their product, the UX, and the UI without dealing with the challenges of infrastructure bootstrapping and its management
- **Node operators** - bearing with the responsibility of keeping their hardware and software configuration in optimal conditions, they are incentivized to execute transactions and produce blocks on behalf of Tanssi and Tanssi appchains

The [block production as a service](/learn/tanssi/technical-features/#block-production-as-a-service){target=\_blank} mechanism randomly selects a subset of a decentralized set of nodes and assigns them to provide services to Tanssi and the Tanssi-powered appchains for a limited period, that is, the next session (a set number of blocks). Once an ongoing session ends, the Tanssi protocol rotates the set of block producers needed to serve Tanssi and all the active Tanssi appchains, and they automatically start serving the chain they were assigned to.

All this operation carries costs that must be covered by the appchains that want to obtain the services. This article covers the general aspects of those costs and associated service payments.

## Costs to Cover  {: #costs-to-cover }

There are three main costs associated with block production as a service that any appchain must cover using Tanssi tokens to deploy successfully and get the block production services:

- **Registration deposit** - is the initial deposit that is locked from the account that signs the appchain registration transaction
- **Block producers assignment** - every time the Tanssi protocol assigns block producers, which happens once per session, a fixed fee is charged. This discourages a faulty or malicious appchain (one whose runtime logic fails to produce valid transitions and, therefore, a valid block) that cannot generate valid blocks from requesting node assignments 
- **Block production** - appchains need to pay for each block that is produced on their behalf. Since the protocol selects and assigns the block producers on a per-session basis, appchains must have enough funds to cover all the blocks to be produced in an entire session to be served

The current configuration is set as follows:

=== "Dancebox"
    |         Variable          |                                   Value                                   |
    |:-------------------------:|:-------------------------------------------------------------------------:|
    |   Registration deposit    |         {{ networks.dancebox.costs.registration_deposit }} DANCE          |
    | Block producer assignment | {{ networks.dancebox.costs.cost_per_assignment }} x 10<sup>-6</sup> DANCE per session |
    |     Block production      |    {{ networks.dancebox.costs.cost_per_block }} x 10<sup>-6</sup> DANCE per block     |

To ensure block production in the next session, the total balance must be at least enough to cover the block producer assignment cost plus the cost to produce the {{ networks.dancebox.session.blocks }} blocks that comprise an entire session.

!!! note
    Although these costs are currently fixed, as protocol development progresses, they might become dynamic, varying in response to the network's workload.

## Tipping {: #tipping }

Besides the regular costs presented in the previous section, there is an additional and optional fee: the tipping mechanism. Appchains are free to offer a tip to be served with priority over the rest, which, in times when the network is experiencing a high demand that can not be met with the available resources, could be the difference between producing blocks or stalling for an entire session at least.  

As explained in the [block producers](/block-producers/onboarding/account-setup/#verify){target=\_blank} section, when there are more available block producers than the required to provision Tanssi and all the Tanssi appchains, then those who have more tokens staked are the ones selected to participate in the block production for the next session, leaving those with fewer funds staked on hold. Similarly, when there are more appchains to serve than block producers to assign, the appchains that can be served with the available block producers will be selected according to the priority given by the tips they offer.