---
title: Using the Built-In Tanssi Bridge
description: Learn how to use the built-in Tanssi bridge that connects Tanssi and Ethereum to convert TANSSI tokens between their native form and ERC-20 and vice versa.
icon: octicons-arrow-switch-24
---

# Using the Built-In Tanssi Bridge

## Introduction {: #introduction }

The Tanssi protocol orchestrates infrastructure components, allowing developers to launch their customized appchains in minutes and providing them with out-of-the-box Ethereum-grade economic security. To make the whole process easy for developers, a [top-of-class architecture](/learn/tanssi/overview/#tanssi-architecture){target=\_blank} was designed and implemented.

The [TANSSI token](/builders/tanssi-network/tanssi-token/){target=\_blank} is the engine that enables the integration of different infrastructural components with [external security providers](/learn/tanssi/external-security-providers/symbiotic/){target=\_blank} and aligns incentives across various actors, including token holders, node operators, and appchain builders. To serve different use cases, the token has two versions: the Tanssi network's native currency, TANSSI (Substrate), and its ERC-20 version, on Ethereum.

Users can convert from one version to the other of the token using a [Tanssi built-in trustless bridge](/learn/tanssi/tanssi-ethereum-bridge/){target=\_blank}.

In this guide, you'll learn how to move your assets from Tanssi to Ethereum and vice versa through a secure and user-friendly web interface available at the [Tanssi dApp](https://apps.tanssi.network/bridge){target=\_blank}, making cross-chain transfers accessible for everyone.

## Prerequisites {: #prerequisites }

Before using the Tanssi bridge, ensure you have:

For bridging from Tanssi to Ethereum:

- A [Substrate-compatible wallet](/builders/toolkit/substrate-api/wallets/){target=\_blank}, such as [Talisman](/builders/toolkit/substrate-api/wallets/talisman/){target=\_blank}.
- TANSSI (Substrate) balance to transfer and pay the bridging fees.
- The Ethereum-type destination account.

For bridging from Ethereum to Tanssi:

- An [Ethereum-compatible wallet](/builders/toolkit/ethereum-api/wallets/){target=\_blank}, such as [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.
- TANSSI (ERC-20) balance to transfer.
- ETH balance to pay the bridging fees.
- The Substrate-type destination account.

## Bridging TANSSI Tokens to Ethereum {: #bridge-to-ethereum }

If you want to convert your TANSSI (Substrate) tokens to TANSSI (ERC-20) on Ethereum, head to the Tanssi dApp, open the [bridge section](https://apps.tanssi.network/bridge){target=\_blank}, and then follow these steps:

1. Select **Tanssi Network** from the **From** dropdown.
2. Click on **Connect Wallet**. A pop-up will appear, allowing you to select your preferred Substrate wallet and choose the corresponding account.

![Select Tanssi Network and Connect the Wallet](/images/builders/interoperability/built-in-bridge/built-in-bridge-1.webp)

Now, with your wallet connected:

1. Select the destination account from the **Select recipient address** dropdown, or choose the **Enter a custom address** item and enter the account where you want to receive the ERC-20 tokens manually.
2. Enter the amount to bridge in the **Balance** field. The estimated bridge and transaction fees will be displayed along with the amount the destination account will receive.
3. Click on **Send** and sign the transaction.

![Execute the Transaction](/images/builders/interoperability/built-in-bridge/built-in-bridge-2.webp)

And that's it! Your tokens will be bridged when the next session starts. You can see how much time remains in the current session in the progress bar.

## Bridging ERC-20 TANSSI to Tanssi Network {: #bridge-to-tanssi }

If you want to convert your TANSSI (ERC-20) tokens to TANSSI (Substrate) native on the Tanssi network, head to the Tanssi dApp, open the [bridge section](https://apps.tanssi.network/bridge){target=\_blank}, and then follow these steps:

1. Select **Ethereum** from the **From** dropdown.
2. Click on **Connect Wallet**, select your preferred Ethereum wallet, and choose the account.

![Select Ethereum and Connect the Wallet](/images/builders/interoperability/built-in-bridge/built-in-bridge-3.webp)

Now, with your wallet connected:

1. Enter the Substrate destination account in the **Recipient** field.
2. Enter the amount to bridge in the **Balance** field. The estimated bridge and transaction fees will be displayed along with the amount the destination account will receive.
3. Click on **Send** and sign the transaction.

![Execute the Transaction](/images/builders/interoperability/built-in-bridge/built-in-bridge-4.webp)

And that's it! Your tokens will be bridged when the next session starts. You can see how much time remains in the current session in the progress bar.

!!! note
    Fees might fluctuate over time and must be paid using ETH.
