---
title: How to Connect SubWallet to Tanssi
description: This guide walks you through how to connect SubWallet, a comprehensive Polkadot, Substrate, and Ethereum wallet, to your Tanssi EVM ContainerChain. 
---

# Interacting with Your Tanssi EVM ContainerChain Using SubWallet

## Introduction {: #introduction }

Developers and users of Tanssi EVM ContainerChains have a variety of options when it comes to wallets. Thanks to their seamless Ethereum compatibility, Tanssi EVM ContainerChains support a great variety of popular wallets, including SubWallet. 

SubWallet is a comprehensive Web3 wallet that natively supports Substrate (Polkadot) and Ethereum accounts. This tutorial centers on the Ethereum API, but you can check out a similar [tutorial for interacting with SubWallet using the Substrate API](/builders/interact/substrate-api/wallets/subwallet){target=_blank}. The SubWallet wallet browser extension [can be downloaded](https://www.subwallet.app/download.html){target=_blank} for all supported browsers, including Chrome, Brave, Firefox, and MS Edge. SubWallet also has a mobile app for both iOS and Android, but that is beyond the scope of this guide. A complete online asset dashboard is accessible at [web.subwallet.app](https://web.subwallet.app/){target=_blank}.

This guide takes you through all the necessary steps, from installing SubWallet to setting up a wallet, connecting it to your Tanssi EVM ContainerChain, and sending funds.

## Creating Your First Ethereum Account {: #creating-your-first-ethereum-account }

First, download and install the [SubWallet extension](https://www.subwallet.app/download.html){target=_blank}. Creating a new account will generate a seed phrase that can derive multiple Ethereum and Substrate accounts. By default, SubWallet will generate a single Ethereum and a single Substrate account, but you can easily derive more from the same seed phrase. Click **Create a new account** to get started. 

![Get started with SubWallet](/images/builders/interact/ethereum-api/wallets/subwallet/subwallet-1.png)

On the following screen, you'll be prompted to create a password to secure your new wallet. 

![Create a password for SubWallet](/images/builders/interact/ethereum-api/wallets/subwallet/subwallet-2.png)

You'll then be prompted to back up your seed phrase. This is an important step, especially because you have the option to later derive additional accounts from this seed phrase. 

![Back up your seed phrase in SubWallet](/images/builders/interact/ethereum-api/wallets/subwallet/subwallet-3.png)

!!! note
    You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.

## Importing an Existing EVM Account {: #importing-an-existing-evm-account }

Of course, you can import an existing EVM account into SubWallet. To get started, take the following steps:

1. Press the **All accounts** button at the top
2. Press the **Import account** icon

![Import account part 1](/images/builders/interact/ethereum-api/wallets/subwallet/subwallet-4.png)

On the following screen, select the method by which you would like to import the existing account.

![Import existing account part 2](/images/builders/interact/ethereum-api/wallets/subwallet/subwallet-5.png)

On the following screen, you'll be able to provide the relevant seed phrase, private key, JSON file, or QR code, and you can begin using your new account right away. 

## Configuring SubWallet for Your EVM ContainerChain {: #configuring-subwallet-for-your-evm-containerchain }

To configure SubWallet for your EVM ContainerChain, press the **More Options** icon in the upper left corner. Then click **Manage networks**. Press the **+** icon. On the following page, you'll then be prompted to enter the network details for your ContainerChain. For demonstration purposes, the demo EVM ContainerChain is used here, but you can substitute these details for your own ContainerChain. To add your ContainerChain to SubWallet, take the following steps: 

1. Paste in the HTTPS RPC URL of your ContainerChain. The demo EVM ContainerChain's RPC URL is `https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network/`. Other parameters will be auto-populated
2. Paste in the block explorer URL of your ContainerChain. The demo EVM ContainerChain's block explorer URL is `https://tanssi-evmexplorer.netlify.app/`
3. Press **Save**

![Add your ContainerChain Network Details in SubWallet](/images/builders/interact/ethereum-api/wallets/subwallet/subwallet-6.png)

By default, all balances are hidden in SubWallet, but if you press the eye icon, you can toggle balance visibility.

## Sending Assets on Your EVM ContainerChain {: #sending-assets-on-your-evm-containerchain }

To transfer the native token of your ContainerChain, take the following steps:

1. Specify the asset to send
2. Specify the destination chain (in this case, the same chain that you're sending from)
3. Enter the destination address
4. Enter the amount of tokens to send
5. Look over the transaction details, then press **Transfer** and subsequently **Approve**

![Send funds on your EVM ContainerChain](/images/builders/interact/ethereum-api/wallets/subwallet/subwallet-7.png)

This guide focused specifically on configuring SubWallet to work with your EVM ContainerChain, but SubWallet is also a full-featured wallet for Substrate (Polkadot) accounts. Under the Substrate API section, you'll find a [similar guide for configuring SubWallet for use with your Substrate ContainerChain](/builders/interact/substrate-api/wallets/Subwallet){target=_blank}. 

--8<-- 'text/disclaimers/third-party-content.md'