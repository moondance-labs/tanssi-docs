---
title: How to Connect Talisman to Tanssi
description: This guide walks you through how to connect Talisman, a comprehensive Polkadot, Substrate, and Ethereum wallet, to your Tanssi-powered EVM-compatible network.
icon: material-wallet-outline
categories: EVM, Substrate
---

# Interacting with Your Tanssi EVM Network Using Talisman

## Introduction {: #introduction }

Developers and users of Tanssi-powered EVM networks have a variety of options when it comes to wallets. Thanks to their seamless Ethereum compatibility, Tanssi EVM networks support a great variety of popular wallets, such as Talisman.

Talisman is a Web3 wallet that natively supports Substrate (Polkadot) and Ethereum accounts. This tutorial centers on the Ethereum API, but you can check out a similar [tutorial for interacting with Talisman using the Substrate API](/builders/toolkit/substrate-api/wallets/talisman/){target=\_blank}. The Talisman wallet browser extension is available on [Google Chrome](https://chrome.google.com/webstore/detail/talisman-polkadot-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld){target=\_blank} and [Brave](https://chrome.google.com/webstore/detail/talisman-polkadot-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld){target=\_blank}, and a corresponding asset dashboard is accessible at [app.talisman.xyz](https://app.talisman.xyz){target=\_blank}

This guide takes you through all the necessary steps, from installing Talisman to setting up a wallet, connecting it to your Tanssi EVM network, and sending funds.

## Setting Up Talisman {: #setting-up-talisman }

First, download and install the [Talisman extension](https://www.talisman.xyz){target=\_blank}. This guide will first cover creating a new wallet and later address importing an existing one. Review the terms and conditions, then press **Get Started**.

![Get started with Talisman](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-1.webp)

On the following screen, you'll be prompted to create a password to secure your new wallet.

![Enter password for Talisman Wallet](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-2.webp)

## Creating an Ethereum Account {: #creating-an-ethereum-account }

To create your first Ethereum account, take the following steps:

1. Select the **Ethereum** option
2. Give your account a name
3. Press **Create**

![Create your first Ethereum account in Talisman](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-3.webp)

After creating your first account, you'll be prompted to back up your seed phrase. This is an important step, especially because you have the option to later derive additional accounts from this seed phrase.

![Back up your seed phrase](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-4.webp)

!!! note
    You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.

## Importing an Existing EVM Account {: #importing-an-existing-evm-account }

Of course, you can import an existing EVM account into Talisman. To do so, take the following steps:

1. Press **Add Account**
2. Press **Import**
3. Select **Import via Recovery Phrase** (note, this works for both seeds and private keys)

![Import existing account setup](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-9.webp)

On the following screen, take the following steps:

1. Select the **Ethereum** account type
2. Provide a name for your account
3. Paste in your seed or private key
4. If you imported a mnenomic seed phrase in the prior step, select which accounts you'd like to import
5. Press **Import**

![Import existing account final steps](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-10.webp)

## Configuring Talisman for Your EVM Network {: #configuring-talisman-for-your-evm-network }

To configure Talisman for your Tanssi EVM network, open the Talisman extension and click on the **More Options** tab. Then, take the following steps:

1. Select **Settings**
2. Check the **Enable testnets** box
3. Press **Add Network**

![Add Network in Talisman](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-6.webp)

On the following page, you'll then be prompted to enter the network details for your Tanssi-powered network. For demonstration purposes, the demo EVM network is used here, but you can substitute these details for your own network. To add your network to Talisman, take the following steps:

1. Paste in the RPC URL of your Tanssi-powered network. The demo EVM network's RPC URL is `{{ networks.dancelight.demo_evm_rpc_url }}`. Other parameters will be autopopulated
2. Paste in the block explorer URL of your Tanssi-powered network. The demo EVM network's block explorer URL is `{{ networks.dancelight.demo_evm_blockscout_url }}`
3. Check the **This is a testnet** box if applicable
4. Press **Add Network**

![Add your Tanssi-Powered Network Details](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-7.webp)

If you hold a balance of tokens in your newly created account for your network, you'll see the balance in the Talisman dashboard.

## Sending Assets on Your EVM Network {: #sending-assets-on-your-evm-network }

To transfer the native token of your Tanssi network, take the following steps:

1. Click on the **Send** icon
2. Click the desired **Send from** account
3. Enter the destination address
4. Enter the amount of tokens to send
5. Look over the transaction details, then press **Review** and subsequently **Confirm**

![Send funds on your EVM network](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-8.webp)

This guide focused specifically on configuring Talisman to work with your Tanssi-powered EVM network, but Talisman is also a full-featured wallet for Substrate (Polkadot) accounts. Under the Substrate API section, you'll find a similar tutorial for configuring Talisman to work with Substrate-based chains.

--8<-- 'text/_disclaimers/third-party-content.md'
