---
title: Block Production Services Payment
description: Networks deployed through Tanssi benefit from block production services provided by a set of node operators, which are compensated with Tanssi tokens.
icon: octicons-server-24
---

# Block Production Services Payment

## Introduction {: #introduction }

As presented in the [Block Production as a Service](/learn/tanssi/network-services/block-production/#block-production-fees){target=_\blank} article, there are two main costs associated that the network governor must cover: 

- **Sequencers assignment** - for the assignment of sequencers by the Tanssi protocol, which happens once per session
- **Block production** - for each block that is produced on the network's behalf

In this guide, you'll learn how to use the [Tanssi dApp](https://apps.tanssi.network){target=\_blank} to top-up your account and keep your network's liveness.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

- A Tanssi-powered network (Quick Trial or Dedicated)
- The account you used when registering the network, imported in any of the [supported wallets](/builders/deploy/dapp/#supported-wallets){target=\_blank}

--8<-- 'text/builders/manage/dapp/locate-registration-account.md'

## Topping-Up Your Network's Credits {: #topping-up }

Following a pay-as-you-go model, the networks must have funds allocated to pay for the services, which, over time, will be deducted and burned by the Tanssi protocol upon every session change for the cost of the sequencer's assignment and for every block for the cost of producing the block.

You can check your network's current balance and top it up using the Tanssi dApp. To do so, head to the [Tanssi dApp](https://apps.tanssi.network/){target=\_blank} and connect the network's registration account to the dApp. The site will display a card showing your network status. This card includes the projected liveness forecast underneath the **Block Production** section and the **Top Up** button.

![Top-up action button in the dApp](/images/builders/manage/dapp/services-payment/services-payment-1.webp)

Clicking on the **Top Up** button displays a sidebar where the following information can be seen:

- **Current balance** - the current balance allocated for the network's block production service
- **Available balance** - the balance available in the network's registration account, which is connected to the dApp
- **Current cost** - current cost per sequencer's assignment and cost per block
- **Projected forecast** - the estimated day when the network runs out of funds and stops being served

To extend the network's projected runway, take the following actions:

1. Insert the amount of tokens to buy block production services
2. Click **Top Up**

![Top-up sidebar](/images/builders/manage/dapp/services-payment/services-payment-2.webp)

You will be asked to sign the transaction, and after it's gone through, your network will benefit from an extended horizon of liveness.

!!! warning
    If your network doesn't have enough funds to cover the sequencer's assignment and one session's worth of blocks, it will stall.