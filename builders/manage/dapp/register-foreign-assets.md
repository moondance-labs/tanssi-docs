---
title: Register Foreign Assets
description: Tanssi appchains benefit from native cross-chain communication, enabling smooth and fast token transfers between the token’s native chain and other chains.
---

# Register Foreign Assets

## Introduction {: #introduction }

Cross-chain asset transfer is crucial because it enables the seamless movement of digital assets across different appchains, enhancing interoperability, liquidity, and user experience. To enable asset transfers to and from two appchains, first, a bidirectional channel must be open between them. Thanks to the Tanssi dApp, opening a channel is an easy and quick task. Please refer to the [Manage Cross-Chain Communication Channels](/builders/manage/dapp/xcm-channels/){target=\_blank} article to know how to do it.

!!! note
    Opening a bidirectional communication channel requires approval from both appchains governors.

Once your appchain's communication channels are established, you can register other chain's assets (foreign assets) to start operating. This guide will walk you through the process of registering foreign assets using the [Tanssi dApp](https://apps.tanssi.network){target=\_blank}.

--8<-- 'text/builders/manage/dapp/prerequisites.md'

## Accessing the Foreign Assets Registration Panel {: #accesing-foreign-assets-management-panel }

--8<-- 'text/builders/manage/dapp/cross-chain-config-panel.md'

The panel will show your appchain's cross-chain configuration along with several available actions. Regarding foreign assets, the relevant elements you are presented with are:

1. **Registered Assets panel** - this section will group and present to you all registered assets your appchain already has available
2. **Registered Assets List** - already registered foreign assets will be displayed in this section, along with their associated information such as asset name, symbol, ID, total supply, and appchain ID where it is native
3. **Asset Registration** - this option allows you to select other available foreign assets and register them. The [following section](#register-foreign-asset) explains how to do it

![The cross-chain management panel](/images/builders/manage/dapp/register-foreign-assets/register-foreign-assets-1.webp)

## Register a Foreign Asset {: #register-foreign-asset }

Provided your appchain has already established bidirectional communicaction channels with another appchain, the appchain governor can register foreign assets.

To do so, click on **Asset Registration** and then:

1. Select at least one of the available assets from the list
2. Click on **Register**

You'll be asked to sign the transaction, and once it's gone through, the foreign asset will be available locally. 

![Asset registration](/images/builders/manage/dapp/register-foreign-assets/register-foreign-assets-2.webp)

!!! note
    The dApp only presents well-known assets from well-known appchains of the ecosystem. If the asset you need to register is not listed, you'll have to do it using the developer portal.