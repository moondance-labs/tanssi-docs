---
title: How to Connect Subwallet to Tanssi Substrate
description: This guide walks you through how to connect Subwallet, a comprehensive Polkadot, Substrate, and Ethereum wallet, to your Tanssi Substrate ContainerChain. 
---

# Interacting with Your Tanssi Substrate ContainerChain Using Subwallet

## Introduction {: #introduction }

Developers and users of Tanssi Substrate ContainerChains have a variety of options when it comes to wallets. Subwallet is a comprehensive Web3 wallet that natively supports Substrate (Polkadot) and Ethereum accounts. This tutorial centers on the Substrate API, but you can check out a similar [tutorial for interacting with Subwallet using the Ethereum API](/builders/interact/ethereum-api/wallets/subwallet){target=_blank}. 

The Subwallet wallet browser extension [can be downloaded](https://www.subwallet.app/download.html){target=_blank} for all supported browsers, including Chrome, Brave, Firefox, and MS Edge. Subwallet also has a mobile app for both iOS and Android, but that is beyond the scope of this guide. A complete online asset dashboard is accessible at [web.subwallet.app](https://web.subwallet.app/){target=_blank}.

This guide takes you through all the necessary steps, from installing Subwallet to setting up a wallet, connecting it to your Tanssi Substrate ContainerChain, and sending funds.

## Creating your first Substrate Account {: #creating-your-first-ethereum-account }

First, download and install the [Subwallet extension](https://www.subwallet.app/download.html){target=_blank}. Creating a new account will generate a seed phrase that can derive multiple Ethereum and Substrate accounts. By default, Subwallet will generate a single Ethereum and a single Substrate account, but you can easily derive more from the same seed phrase. Click **Create a new account** to get started. 

![Get started with Subwallet](/images/builders/interact/substrate-api/wallets/subwallet/subwallet-1.png)

On the following screen, you'll be prompted to create a password to secure your new wallet. 

![Create a password for Subwallet](/images/builders/interact/substrate-api/wallets/subwallet/subwallet-2.png)

You'll then be prompted to back up your seed phrase. This is an important step, especially because you have the option to later derive additional accounts from this seed phrase. 

![Back up your seed phrase in Subwallet](/images/builders/interact/substrate-api/wallets/subwallet/subwallet-3.png)

!!! note
    You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.

## Importing an Existing Substrate Account {: #importing-an-existing-substrate-account }

Of course, you can import an existing Substrate account into Subwallet. To get started, take the following steps:

1. Press the **All accounts** button at the top
2. Press the **Import account** icon

![Import account part 1](/images/builders/interact/substrate-api/wallets/subwallet/subwallet-4.png)

On the following screen, select the method by which you would like to import the existing account. If you're importing a Substrate account, you can choose from the seed phrase, Polkadot.js (JSON), or QR code options. 

![Import existing account part 2](/images/builders/interact/substrate-api/wallets/subwallet/subwallet-5.png)

On the following screen you'll be able to provide the relevant seed phrase, JSON file, or QR code, and you can begin using your new account right away. 

## Connecting Subwallet to the Tanssi Dancebox TestNet {: #connecting-Subwallet-to-the-tanssi-dancebox-testnet }

Subwallet comes pre-configured with support for the Tanssi Dancebox Testnet, but it may not be enabled by default. You just need to head to the **Manage networks** page to toggle it on. Remember that the Tanssi Dancebox Testnet itself is not a ContainerChain; it is the Substrate-based parachain that orchestrates and manages the launch of Tanssi ContainerChains. To configure your Subwallet to work with Dancebox, press the **More Options** icon in the upper left corner. Then click **Manage networks**, and take the following steps:

1. Search for `Dancebox`
2. Toggle the slider on to enable support for Dancebox

![Toggle support for the Dancebox Testnet](/images/builders/interact/substrate-api/wallets/Subwallet/Subwallet-6.png)

If you have a balance of Dancebox tokens, you'll see your account balance on the homepage of the Subwallet wallet. By default, all balances are hidden in Subwallet, but if you press the eye icon you can toggle balance visibility.

![See your testnet account balances in Subwallet](/images/builders/interact/substrate-api/wallets/Subwallet/Subwallet-7.png)

## Connecting Subwallet to Your Substrate ContainerChain {: #connecting-Subwallet-to-your-substrate-containerchain }

To configure Subwallet for your Substrate ContainerChain, press the **More Options** icon in the upper left corner. Then click **Manage networks**. Press the **+** icon. On the following page, you'll then be prompted to enter the network details for your ContainerChain. For demonstration purposes, the Tanssi Dancebox Parachain is used here, but you can substitute these details for your own ContainerChain. To add your ContainerChain to Subwallet, take the following steps: 

1. Paste in the WSS URL of your ContainerChain. Other parameters like the parachainId and token decimals may be auto populated
2. Provide a name for your ContainerChain
3. Press **Save**

![Add Network in Subwallet](/images/builders/interact/substrate-api/wallets/Subwallet/Subwallet-8.png)

## Connecting to Polkadot.js {: #connecting-to-polkadotjs}

To connect your Substrate ContainerChain to Polkadot.js Apps, first head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/accounts){target=_blank}. In this example, Polkadot.js Apps is connected to the Dancebox TestNet, but you can point Polkadot.js to your ContainerChain by clicking on the network dropdown and filling in the WSS endpoint of your ContainerChain in the **custom endpoint** field.

![Connect to Polkadot.js Apps](/images/builders/interact/substrate-api/wallets/Subwallet/Subwallet-9.png)

The Subwallet extension will prompt you to select the accounts you'd like to use with Polkadot.js Apps. If it doesn't automatically pop up, you can open the Subwallet extension and click on the **Connected / Disconnected** icon next to your account at the top. To configure Subwallet to correctly interface with your ContainerChain on Polkadot.js Apps, you should take the following steps:

1. Select the Substrate account(s) that you'd like to use with Polkadot.js Apps
2. Press **Connect**

![Connect Subwallet to Polkadot.js Apps](/images/builders/interact/substrate-api/wallets/Subwallet/Subwallet-10.png)

Your Subwallet wallet is now connected to Polkadot.js Apps. After refreshing Polkadot.js Apps, you should see your Subwallet account in the [Accounts page of Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/accounts){target=_blank} underneath the **extension** heading. 

## Sending a Transaction {: #sending-a-transaction}

To send a transaction through the Substrate API, click **Send** next to your account on Polkadot.js Apps. Then, take the following steps:

1. Input the **send to address**
2. Enter the **amount**
3. Press **Make Transfer** and confirm the transaction in the resulting Polkadot.js pop-up
4. Press **View Details** if you'd like to inspect the contents of the transaction
5. Press **Approve** to submit the transaction

![Send funds through Substrate API with Polkadot.js Apps](/images/builders/interact/substrate-api/wallets/Subwallet/Subwallet-11.png)

You can also send a transaction through the Substrate API directly from the Subwallet extension, without using Polkadot.js Apps. To do so, press the **Send** icon, and take the following steps:

1. Specify the asset to send
2. Specify the destination chain (in this case, the same chain that you're sending from)
3. Enter the destination address
4. Enter the amount of tokens to send
5. Look over the transaction details, then press **Transfer** and subsequently **Approve**

![Send funds through Substrate API directly in Subwallet](/images/builders/interact/substrate-api/wallets/Subwallet/Subwallet-12.png)


This guide focused specifically on configuring Subwallet to work with your Substrate ContainerChain, but Subwallet is also a full-featured wallet for EVM accounts. Under the Ethereum API section, you'll find a [similar guide for configuring Subwallet for use with your EVM ContainerChain](/builders/interact/ethereum-api/wallets/Subwallet){target=_blank}. 

--8<-- 'text/disclaimers/third-party-content.md'