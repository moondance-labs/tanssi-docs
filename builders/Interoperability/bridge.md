---
title: Bridge Tokens Using the Tanssi DApp
description: Tanssi offers built-in trustless bridging capabilities to move liquidity to and from Ethereum with an easy-to-use user interface available on the Tanssi dApp.
icon: octicons-arrow-switch-24
---

# Bridge Tokens Using the Tanssi DApp

## Introduction {: #introduction }

As presented in the [Tanssi-Ethereum bridge](/learn/tanssi/tanssi-ethereum-bridge/){target=\_blank} article from the learn section, Tanssi allows secure and trustless asset transfers between Tanssi and Ethereum through its built-in bridge. Based on [Snowbridge](https://docs.snowbridge.network/){target=\_blank}, the Tanssi-Ethereum bridge operates as a decentralized protocol that eliminates single points of failure while maintaining the highest security standards.

This bridge enables smooth transfers between the two representations of the [Tanssi token](/builders/tanssi-network/token/){target=\_blank}: the $TANSSI(Substrate), which lives on the Tanssi network, and  the $TANSSI (ERC20), which is standard ERC20 token on Ethereum. 

In this guide, you'll learn how to bridge the Tanssi token between the Tanssi network and Ethereum. Whether you're moving assets from Ethereum to Tanssi network or vice versa, you'll discover how the Tanssi dApp enables powerful capabilities through a user-friendly interface that abstracts away the complex underlying architecture while maintaining full trustlessness.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

- [A Tanssi account](/builders/toolkit/substrate-api/wallets/talisman/#create-a-substrate-account){target=\_blank}
- [An Ethereum account](/builders/toolkit/ethereum-api/wallets/talisman/#creating-an-ethereum-account){target=\_blank}
- Tansi tokens to transfer
- Enough funds to pay the fees. When transferring tokens from Tanssi, fees are paid in Tanssi tokens, and when transferring tokens from Ethereum, fees are paid in ETH

## Transfer Tokens From Tanssi to Ethereum {: #tranfer-tanssi-ethereum }

Transferring tokens from the Tanssi network to Ethereum allows you to swap your tokens' representation from substrate to ERC20. To execute this transfer, head to the [Tanssi dApp](https://apps.tanssi.network/){target=\_blank}, click on the **bridge** menu item, and then take the following steps:

1. Make sure to select **Tanssi** in the from field
2. Connect your wallet
3. Insert the destination address. This address must be of the Ethereum ECDA type
4. Set the balance you want to bridge over to Ethereum
5. Click on **Send** and sign the transaction

And that's it! Your tokens will be transferred upon the next session's start.

## Transfer Tokens From Ethereum to Tanssi {: #tranfer-tanssi-ethereum }

Transferring tokens from Ethereum to the Tanssi network allows you to swap your tokens' representation from ERC20 to substrate.
To execute this transfer, head to the [Tanssi dApp](https://apps.tanssi.network/){target=\_blank}, click on the **bridge** menu item, and then take the following steps:

1. Make sure to select **Ethereum** in the from field
2. Connect your wallet
3. Insert the destination address. This address must be of the substrate type
4. Set the balance you want to bridge over to Tanssi
5. Click on **Send** and sign the transaction

And that's it! Your tokens will be transferred upon the next session's start.