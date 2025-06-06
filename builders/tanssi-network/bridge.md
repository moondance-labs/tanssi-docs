---
title: Bridging Tokens Using the Tanssi DApp
description: Tanssi offers built-in trustless bridging capabilities to move liquidity to and from Ethereum with an easy-to-use user interface available on the Tanssi dApp.
icon: octicons-share-android-24
---

# Bridging Tokens Using the Tanssi DApp

## Introduction {: #introduction }

As presented in the [Tanssi-Ethereum bridge](/learn/tanssi/tanssi-ethereum-bridge/){target=\_blank} article from the learn section, Tanssi allows secure and trustless asset transfers between Tanssi and Ethereum through its built-in bridge. Based on [Snowbridge](https://docs.snowbridge.network/){target=\_blank}, the Tanssi-Ethereum bridge operates as a decentralized protocol that eliminates single points of failure while maintaining the highest security standards.

There are two different representations for the $TANSSI token:

- $TANSSI (Substrate), which lives on the Tanssi network
- $TANSSI (ERC20), which is standard ERC20 token on Ethereum

Both representations have utility, and depending on what the intent is (staking on sequencers, staking on operators, participating in governance, and others), you might need to bridge the tokens over.

In this guide, you'll learn how to execute token transfers using the Tanssi dApp. Whether you're moving assets from Ethereum to Tanssi network or vice versa, you'll discover how the Tanssi dApp enables powerful capabilities through a user-friendly interface that abstracts away the complex underlying architecture while maintaining full trustlessness.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

- A Tanssi account
- An Ethereum account
- When transferring tokens from Tanssi to Ethereum, Tanssi tokens to transfer and pay the fees
- When transferring tokens from Ethereum to Tanssi, ERC20 Tanssi tokens to transfer and sufficient ETH to pay the fees

## Transfer Tokens From Tanssi to Ethereum {: #tranfer-tanssi-ethereum }

Transferring tokens from the Tanssi network to Ethereum allows you to swap your tokens representation from substrate to ERC20.
To execute this transfer, head to the Tanssi dApp, and click on the **bridge** menu item, an then take the following steps:

1. Make sure to select **Tanssi** in the from field
2. Connect your wallet
3. Insert the destination address. This account is an Ethereum ECDA type
4. Set the balance you want to bridge over to Ethereum
5. Click on **Send** and sign the transaction

And that's it! Your tokens will be transferred upon the next session's start

## Transfer Tokens From Ethereum to Tanssi {: #tranfer-tanssi-ethereum }

Transferring tokens from Ethereum to the Tanssi network allows you to swap your tokens representation from ERC20 to substrate.
To execute this transfer, head to the Tanssi dApp, and click on the **bridge** menu item, an then take the following steps:

1. Make sure to select **Ethereum** in the from field
2. Connect your wallet
3. Insert the destination address. This account is a substrate type
4. Set the balance you want to bridge over to Tanssi
5. Click on **Send** and sign the transaction

And that's it! Your tokens will be transferred upon the next session's start