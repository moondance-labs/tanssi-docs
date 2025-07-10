---
title: Manage Cross-Chain Communication Channels
description: Tanssi networks benefit from native cross-chain communication, which allows fast and secure bridging leveraging the architecture they are built on top of.
categories: Appchain
---

# Manage Cross-Chain Communication Channels

## Introduction {: #introduction }

As presented in the [Native Cross-Chain Communication](/learn/framework/xcm/){target=\_blank} article from the Learn section, all Tanssi-powered networks have an inherent capability to communicate and interoperate with any other network in the ecosystem. This native cross-chain communication feature is possible thanks to the unique infrastructure the networks are built on top of, leveraging the Cross-Consensus Message format (XCM for short), which facilitates communication between different consensus systems.

The first step to enable communication between networks is [opening a channel](/learn/framework/xcm/#channel-registration){target=\_blank}. The process of opening a channel starts by sending a request to the network you want to establish communications with. Once the request has been accepted by the destination chain's governor, a channel will be opened. 

In this guide, you'll learn how to use the [Tanssi dApp](https://apps.tanssi.network){target=\_blank} to manage your network's cross-chain communication channels.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

- A Tanssi-powered network (Dedicated) running [runtime 500](https://github.com/moondance-labs/tanssi/releases/tag/runtime-500){target=\_blank} or above
--8<-- 'text/builders/manage/dapp/prerequisites.md'

## Accessing the Channel Management Panel {: #accesing-channel-management-panel }

--8<-- 'text/builders/manage/dapp/cross-chain-config-panel.md'

The panel will show your network's communication channels status along with several available actions. The elements you are presented with are:

1. **Sovereign account** - is a keyless account that belongs to the network in a different consensus system, the relay chain in this case. It can only be used by the network's governor. 

    Before opening a new channel, the network's sovereign account in the relay chain must be funded with enough tokens to be locked as a channel deposit.

    In this section, you can see your network's sovereign account balance, copy its address, and deposit tokens

2. **Incoming/Outgoing channel requests** - every channel request needs to be accepted by the counterpart before any message can be sent. 

    In this section, you can see the list of pending outgoing requests and cancel them. You can also see any incoming channel requests your network might have received and accept the channel

3. **Established channels** - Once the destination chain's governor has accepted the channel request, the channel becomes open and available for message transmission.

    In this section, you can see the list of accepted channels your network has, the direction in which the messages flow through the channel, and cancel the channel

4. **Request to open new channels** - this option allows you to select an existing network within the ecosystem and request a channel to be opened. The [next section](#request-new-channel) explains how to do it

![The channel management panel](/images/builders/manage/dapp/xcm-channels/xcm-channels-1.webp)

## Request to Open New Channel {: #request-new-channel }

Provided that your network has enough funds for the deposit in its relay chain's sovereign account, the network governor can request to open a new channel with any other network. 

To do so, click on **HRMP Channels** and then:

1. Select the network you want to establish a channel with
2. Click on **Request Channel**

You'll be asked to sign the transaction, and once it's gone through, the destination chain will receive the request. 

![Channel opening request](/images/builders/manage/dapp/xcm-channels/xcm-channels-2.webp)
