---
title: How to Connect Talisman to Tanssi
description: This guide walks you through how to connect Talisman, a Polkadot, Substrate, and Ethereum wallet, to your Tanssi-powered Substrate decentralized network.
icon: material-wallet-outline
categories: Substrate-Template, EVM-Template
---

# Interacting with your Tanssi Substrate Network Using Talisman

## Introduction {: #introduction }

Developers and users of Tanssi-powered Substrate networks have a variety of options when it comes to wallets. Talisman is a great option, as it provides full native support for both Substrate and Ethereum accounts. This guide focuses on the Substrate API. You can also check out a [similar guide for configuring Talisman for use with your Tanssi EVM network](/builders/toolkit/ethereum-api/wallets/talisman/){target=\_blank}.

Talisman is a Web3 wallet that natively supports Substrate (Polkadot) and Ethereum accounts. The Talisman wallet browser extension is available on [Google Chrome](https://chromewebstore.google.com/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld){target=\_blank} and [Brave](https://chromewebstore.google.com/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld){target=\_blank}, and a corresponding asset dashboard is accessible at [app.talisman.xyz](https://app.talisman.xyz){target=\_blank}

This guide takes you through all the necessary steps, from installing Talisman to setting up a wallet, connecting it to your Tanssi Substrate network, and sending funds.

## Setting Up Talisman {: #setting-up-talisman }

First, download and install the [Talisman extension](https://talisman.xyz/){target=\_blank}. This guide will first cover creating a new wallet and later address importing an existing one. Review the terms and conditions, then press **Get Started**.

![Get started with Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-1.webp)

On the following screen, you'll be prompted to create a password to secure your new wallet.

![Enter password for Talisman Wallet](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-2.webp)

## Create a Substrate Account {: #create-a-substrate-account }

To create your first Polkadot account in Talisman, take the following steps:

1. Select the **Polkadot** option
2. Give your account a name
3. Press **Create**

![Create your first Polkadot account in Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-3.webp)

After creating your first account, you'll be prompted to back up your seed phrase. This is an important step, especially because you have the option to later derive additional accounts from this seed phrase.

![Back up your seed phrase](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-4.webp)

!!! note
    You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.

## Importing an Existing Substrate Account {: #importing-an-existing-substrate-account }

Of course, you can import an existing Substrate account into Talisman. To do so, take the following steps:

1. Press **Add Account**
2. Press **Import**
3. Select **Import via Recovery Phrase**

![Import existing account setup](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-12.webp)

On the following screen, take the following steps:

1. Select the **Polkadot** account type
2. Provide a name for your account
3. Paste in your seed
4. Select which accounts you'd like to import
5. Press **Import**

![Import existing account final steps](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-13.webp)

## Connecting Talisman to the Tanssi Dancelight TestNet {: #connecting-talisman-to-the-tanssi-dancelight-testnet }

Talisman already comes pre-configured with support for the Tanssi Dancelight TestNet. You just need to first ensure that you have enabled support for TestNets on Talisman. Remember that the Tanssi Dancelight TestNet itself is not a network; it is the Substrate-based parachain that orchestrates and manages the launch of Tanssi networks. To configure your Talisman to work with Dancelight, take the following steps:

1. Open the Talisman extension and click on the Talisman logo
2. Select **Settings**
3. Ensure that **Enable testnets** is checked

![See your TestNet account balances in Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-5.webp)

If you have a balance of Dancelight tokens, you'll see your account balance on the homepage of the Talisman wallet. If you don't have a balance of Dancelight tokens, the network will be omitted from your list of assets.

![See your TestNet account balances in Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-6.webp)

## Connecting Talisman to Your Substrate Network {: #connecting-talisman-to-your-substrate-network }

To configure Talisman for your Tanssi Substrate network, open the Talisman extension and click on the **More Options** tab. Click on **Settings** > **Networks & Tokens** > **Manage Networks**.

1. Slide the network slider to **Polkadot**
2. Check the **Enable testnets** box
3. Press **Add Network**

![Add Network in Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-7.webp)

On the following page, you'll then be prompted to enter the network details for your Tanssi network. For demonstration purposes, the Dancelight TestNet is used here, but you can substitute these details for your own Tanssi network. To add your Tanssi network to Talisman, take the following steps:

1. Paste in the RPC URL of your Tanssi network. Other parameters will be auto-populated
2. Optionally, enter the block explorer URL of your Tanssi network, if applicable
3. Check the **This is a testnet** box if applicable
4. Press **Add Network**

![Add your Tanssi-Powered Network Details](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-8.webp)

## Connecting to Polkadot.js {: #connecting-to-polkadotjs}

To connect your Tanssi Substrate network to Polkadot.js Apps, first head to [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\_blank}. In this example, Polkadot.js Apps is connected to the Dancelight TestNet, but you can point Polkadot.js to your Tanssi network by clicking on the network dropdown and filling in the WSS endpoint of your Tanssi network in the **custom endpoint** field.

![Connect to Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-9.webp)

The Talisman extension will prompt you to select the accounts you'd like to use with Polkadot.js Apps. If it doesn't automatically pop up, you can open the Talisman extension and click on the **polkadot.js.org** heading at the top. To configure Talisman to correctly interface with your Tanssi network on Polkadot.js Apps, you should take the following steps:

1. Select the Substrate account(s) that you'd like to use with Polkadot.js Apps
2. Press **Connect 1**. The value will change depending on the number of accounts you are connecting

![Connect Talisman to Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-10.webp)

Your Talisman wallet is now connected to Polkadot.js Apps. After refreshing Polkadot.js Apps, you should see your Talisman account in the [Accounts page of Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\_blank} underneath the **extension** heading.

## Sending a Transaction {: #sending-a-transaction}

To send a transaction through the Substrate API, click **Send** next to your account on Polkadot.js Apps. Then, take the following steps:

1. Input the **send to address**
2. Enter the **amount**
3. Press **Make Transfer** and confirm the transaction in the resulting Polkadot.js pop-up
4. Press **View Details** if you'd like to inspect the contents of the transaction
5. Press **Approve** to submit the transaction

![Send funds through Substrate API with Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-11.webp)

This guide focused specifically on configuring Talisman to work with your Tanssi Substrate network, but Talisman is also a full-featured wallet for EVM accounts. Under the Ethereum API section, you'll find a [similar guide for configuring Talisman for use with your Tanssi EVM network](/builders/toolkit/ethereum-api/wallets/talisman/){target=\_blank}.

--8<-- 'text/_disclaimers/third-party-content.md'
