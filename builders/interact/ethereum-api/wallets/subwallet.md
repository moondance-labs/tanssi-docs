---
title: How to Connect Subwallet to Tanssi
description: This guide walks you through how to connect Subwallet, a comprehensive Polkadot, Substrate, and Ethereum wallet, to your Tanssi EVM ContainerChain. 
---

# Interacting with Your Tanssi EVM ContainerChain Using Subwallet

## Introduction {: #introduction }

Developers and users of Tanssi EVM ContainerChains have a variety of options when it comes to wallets. Thanks to their seamless Ethereum compatibility, Tanssi EVM ContainerChains support a great variety of popular wallets, including Subwallet. 

Subwallet is a comprehensive Web3 wallet that natively supports Substrate (Polkadot) and Ethereum accounts. This tutorial centers on the Ethereum API, but you can check out a similar [tutorial for interacting with Subwallet using the Substrate API](/builders/interact/substrate-api/wallets/talisman){target=_blank}. The Subwallet wallet browser extension [can be downloaded here](https://www.subwallet.app/download.html){target=_blank} for all supported browsers including Chrome, Brave, Firefox, and MS Edge. Subwallet also has a mobile app for both iOS and Android, but that is beyond the scope of this guide. A complete online asset dashboard is accessible at [web.subwallet.app](https://web.subwallet.app/){target=_blank}

This guide takes you through all the necessary steps, from installing Subwallet to setting up a wallet, connecting it to your Tanssi EVM ContainerChain, and sending funds.

## Setting Up Subwallet {: #setting-up-subwallet }

First, download and install the [Subwallet extension](https://www.subwallet.app/download.html){target=_blank}. This guide will first cover creating a new wallet and then address importing an existing one.

![Get started with Talisman](/images/builders/interact/ethereum-api/wallets/talisman/talisman-1.png)

On the following screen, you'll be prompted to create a password to secure your new wallet. 

![Enter password for Talisman Wallet](/images/builders/interact/ethereum-api/wallets/talisman/talisman-2.png)

## Creating an Ethereum Account {: #creating-an-ethereum-account }

To create your first Ethereum account, take the following steps:

1. Select the **Ethereum** option
2. Give your account a name
3. Press **Create**

![Create your first Ethereum account in Talisman](/images/builders/interact/ethereum-api/wallets/talisman/talisman-3.png)

After creating your first account, you'll be prompted to back up your seed phrase. This is an important step, especially because you have the option to later derive additional accounts from this seed phrase. 

![Back up your seed phrase](/images/builders/interact/ethereum-api/wallets/talisman/talisman-4.png)

!!! note
    You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.

## Importing an Existing EVM Account {: #importing-an-existing-evm-account }

Of course, you can import an existing EVM account into Talisman. To do so, take the following steps:

1. Press **Add Account**
2. Press **Import**
3. Select **Import via Recovery Phrase** (note, this works for both seeds and private keys)

![Import existing account setup](/images/builders/interact/ethereum-api/wallets/talisman/talisman-9.png)

On the following screen, take the following steps: 

1. Select the **Ethereum** account type
2. Provide a name for your account
3. Paste in your seed or private key
4. If you imported a mnenomic seed phrase in the prior step, select which accounts you'd like to import 
5. Press **Import**

![Import existing account final steps](/images/builders/interact/ethereum-api/wallets/talisman/talisman-10.png)

## Configuring Talisman for Your EVM ContainerChain {: #configuring-talisman-for-your-evm-containerchain }

To configure Talisman for your EVM ContainerChain, open the Talisman extension and click on the **More Options** tab. Then, take the following steps: 

1. Select **Settings**
2. Check the **Enable testnets** box
3. Press **Add Network**

![Add Network in Talisman](/images/builders/interact/ethereum-api/wallets/talisman/talisman-6.png)

On the following page, you'll then be prompted to enter the network details for your ContainerChain. For demonstration purposes, the demo EVM ContainerChain is used here, but you can substitute these details for your own ContainerChain. To add your ContainerChain to Talisman, take the following steps: 

1. Paste in the RPC URL of your ContainerChain. The demo EVM ContainerChain's RPC URL is `https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network/`. Other parameters will be autopopulated
2. Paste in the block explorer URL of your ContainerChain. The demo EVM ContainerChain's block explorer URL is `https://tanssi-evmexplorer.netlify.app/`
3. Check the **This is a testnet** box if applicable
4. Press **Add Network**

![Add your ContainerChain Network Details](/images/builders/interact/ethereum-api/wallets/talisman/talisman-7.png)

If you hold a balance of tokens in your newly created account for your ContainerChain, you'll see the balance in the Talisman dashboard. 

## Sending Assets on Your EVM ContainerChain {: #sending-assets-on-your-evm-containerchain }

To transfer the native token of your ContainerChain, take the following steps:

1. Click on the **Send** icon
2. Click the desired **Send from** account
3. Enter the destination address
4. Enter the amount of tokens to send
5. Look over the transaction details, then press **Review** and subsequently **Confirm**

![Send funds on your EVM ContainerChain](/images/builders/interact/ethereum-api/wallets/talisman/talisman-8.png)


This guide focused specifically on configuring Talisman to work with your EVM ContainerChain, but Talisman is also a full-featured wallet for Substrate (Polkadot) accounts. Under the Substrate API section, you'll find a similar tutorial for configuring Talisman to work with Substrate-based chains.

--8<-- 'text/disclaimers/third-party-content.md'