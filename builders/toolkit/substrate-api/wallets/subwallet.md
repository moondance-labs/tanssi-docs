---
title: How to Connect SubWallet to Tanssi Substrate
description: This guide walks you through how to connect SubWallet, a comprehensive Polkadot, Substrate, and Ethereum wallet, to your Tanssi-powered Substrate network.
icon: material-wallet-outline
categories: Substrate-Template
---

# Interacting with Your Tanssi Substrate Network Using SubWallet

## Introduction {: #introduction }

Developers and users of Tanssi-powered Substrate networks have a variety of options when it comes to wallets. SubWallet is a comprehensive Web3 wallet that natively supports Substrate (Polkadot) and Ethereum accounts. This tutorial centers on the Substrate API, but you can check out a similar [tutorial for interacting with SubWallet using the Ethereum API](/builders/toolkit/ethereum-api/wallets/subwallet/){target=\_blank}.

The SubWallet wallet browser extension [can be downloaded](https://www.subwallet.app/download.html){target=\_blank} for all supported browsers, including Chrome, Brave, Firefox, and MS Edge. SubWallet also has a mobile app for both iOS and Android, but that is beyond the scope of this guide. A complete online asset dashboard is accessible at [web.subwallet.app](https://web.subwallet.app){target=\_blank}.

This guide takes you through all the necessary steps, from installing SubWallet to setting up a wallet, connecting it to your Tanssi Substrate network, and sending funds.

## Creating Your First Substrate Account {: #creating-your-first-substrate-account }

First, download and install the [SubWallet extension](https://www.subwallet.app/download.html){target=\_blank}. Creating a new account will generate a seed phrase that can derive multiple Ethereum and Substrate accounts. By default, SubWallet will generate a single Ethereum and a single Substrate account, but you can easily derive more from the same seed phrase. Click **Create a new account** to get started.

![Get started with SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-1.webp)

On the following screen, you'll be prompted to create a password to secure your new wallet.

![Create a password for SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-2.webp)

You'll then be prompted to back up your seed phrase. This is an important step, especially because you have the option to later derive additional accounts from this seed phrase.

![Back up your seed phrase in SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-3.webp)

!!! note
    You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.

## Importing an Existing Substrate Account {: #importing-an-existing-substrate-account }

Of course, you can import an existing Substrate account into SubWallet. To get started, take the following steps:

1. Press the **All accounts** button at the top
2. Press the **Import account** icon

![Import account part 1](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-4.webp)

On the following screen, select the method by which you would like to import the existing account. If you're importing a Substrate account, you can choose from the seed phrase, Polkadot.js (JSON), or QR code options.

![Import existing account part 2](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-5.webp)

On the following screen, you'll be able to provide the relevant seed phrase, JSON file, or QR code, and you can begin using your new account right away.

## Connecting SubWallet to the Tanssi Dancelight TestNet {: #connecting-Subwallet-to-the-tanssi-dancelight-testnet }

SubWallet comes pre-configured with support for the Tanssi Dancelight TestNet, but it may not be enabled by default. You just need to head to the **Manage networks** page to toggle it on. Remember that the Tanssi Dancelight TestNet itself is the Substrate-based network that orchestrates and manages the launch of Tanssi-powered networks. To configure your SubWallet to work with Dancelight, press the **More Options** icon in the upper left corner. Then click **Manage networks** and take the following steps:

1. Search for **Dancelight**
2. Toggle the slider on to enable support for Dancelight

![Toggle support for the Dancelight TestNet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-6.webp)

If you have a balance of Dancelight tokens, you'll see your account balance on the homepage of the SubWallet wallet. By default, all balances are hidden in SubWallet, but if you press the eye icon, you can toggle balance visibility.

![See your TestNet account balances in SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-7.webp)

## Connecting SubWallet to Your Substrate Network {: #connecting-Subwallet-to-your-substrate-network }

To configure SubWallet for your Substrate network, press the **More Options** icon in the upper left corner. Then click **Manage networks**. Press the **+** icon. On the following page, you'll then be prompted to enter the network details for your Tanssi network. For demonstration purposes, the Tanssi Dancelight Parachain is used here, but you can substitute these details for your own Tanssi network. To add your Tanssi network to SubWallet, take the following steps:

1. Paste in the WSS URL of your Tanssi network. Other parameters like the parachain ID and token decimals may be auto-populated
2. Provide a name for your Tanssi network
3. Press **Save**

![Add Network in SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-8.webp)

## Connecting to Polkadot.js {: #connecting-to-polkadotjs}

To connect your Tanssi Substrate network to Polkadot.js Apps, first head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\_blank}. In this example, Polkadot.js Apps is connected to the Dancelight TestNet, but you can point Polkadot.js to your Tanssi network by clicking on the network dropdown and filling in the WSS endpoint of your Tanssi network in the **custom endpoint** field.

![Connect to Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-9.webp)

The SubWallet extension will prompt you to select the accounts you'd like to use with Polkadot.js Apps. If it doesn't automatically pop up, you can open the SubWallet extension and click on the **Connected** icon next to your account at the top. To configure SubWallet to correctly interface with your Tanssi network on Polkadot.js Apps, you should take the following steps:

1. Select the Substrate account(s) that you'd like to use with Polkadot.js Apps
2. Press **Connect**

![Connect SubWallet to Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-10.webp)

Your SubWallet wallet is now connected to Polkadot.js Apps. After refreshing Polkadot.js Apps, you should see your SubWallet account in the [Accounts page of Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\_blank} underneath the **extension** heading.

## Sending a Transaction {: #sending-a-transaction}

To send a transaction through the Substrate API, click **Send** next to your account on Polkadot.js Apps. Then, take the following steps:

1. Input the **send to address**
2. Enter the **amount**
3. Press **Make Transfer** and confirm the transaction in the resulting Polkadot.js pop-up
4. Press **View Details** if you'd like to inspect the contents of the transaction
5. Press **Approve** to submit the transaction

![Send funds through Substrate API with Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-11.webp)

You can also send a transaction through the Substrate API directly from the SubWallet extension without using Polkadot.js Apps. To do so, press the **Send** icon and take the following steps:

1. Specify the asset to send
2. Specify the destination chain (in this case, the same chain that you're sending from)
3. Enter the destination address
4. Enter the number of tokens to send
5. Look over the transaction details, then press **Transfer** and subsequently **Approve**

![Send funds through Substrate API directly in SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-12.webp)

This guide focused specifically on configuring SubWallet to work with your Tanssi Substrate network, but SubWallet is also a full-featured wallet for EVM accounts. Under the Ethereum API section, you'll find a [similar guide for configuring SubWallet for use with your Tanssi EVM network](/builders/toolkit/ethereum-api/wallets/subwallet/){target=\_blank}.

--8<-- 'text/_disclaimers/third-party-content.md'
