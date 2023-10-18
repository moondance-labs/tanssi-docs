---
title: How to Connect Talisman to Tanssi
description: This guide walks you through how to connect Talisman, a comprehensive Polkadot, Substrate, and Ethereum wallet, to your Tanssi EVM ContainerChain. 
---

# Interacting with Your Tanssi EVM ContainerChain Using Talisman

## Introduction {: #introduction }

Developers and users of Tanssi EVM ContainerChains have a variety of options when it comes to wallets. Thanks to their seamless Ethereum compatibility, Tanssi EVM ContainerChains support a great variety of popular wallets such as Talisman. 

Talisman is a Web3 wallet that natively supports Substrate (Polkadot) and Ethereum accounts. This tutorial centers on the Ethereum API, but you can check out a similar [tutorial for interacting with Talisman using the Substrate API](/builders/interact/substrate-api/wallets/talisman){target=_blank}. The Talisman wallet browser extension is available on [Google Chrome](https://chrome.google.com/webstore/detail/talisman-polkadot-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld){target=_blank}, [Brave](https://chrome.google.com/webstore/detail/talisman-polkadot-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld){target=_blank}, and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/talisman-wallet-extension/){target=_blank}, and a corresponding asset dashboard is accessible at [app.talisman.xyz](https://app.talisman.xyz/){target=_blank}

This guide takes you through all the necessary steps, from installing Talisman to setting up a wallet, connecting it to your Tanssi EVM ContainerChain, and sending funds.

## Setting Up Talisman {: #setting-up-talisman }

First, download and install the [Talisman extension](https://www.talisman.xyz/){target=_blank}. This guide will first cover creating a new wallet and later address importing an existing one. Review the terms and conditions, then press **Get Started**. 

![Get started with Talisman](/images/builders/interact/ethereum-api/wallets/talisman/talisman-1.png)

On the following screen you'll be prompted to create a password to secure your new wallet. 

![Enter password for Talisman Wallet](/images/builders/interact/ethereum-api/wallets/talisman/talisman-2.png)

To create your first Ethereum account, take the following steps:

1. Select the **Ethereum** option
2. Give your account a name
3. Press **Create**

![Create your first Ethereum account in Talisman](/images/builders/interact/ethereum-api/wallets/talisman/talisman-3.png)

After creating your first account, you'll be prompted to back up your seed phrase. This is an important step, especially because you have the option to later derive additional accounts from this seed phrase. 

![Back up your seed phrase](/images/builders/interact/ethereum-api/wallets/talisman/talisman-4.png)

!!! note
    You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.


## Configuring Talisman for your EVM ContainerChain {: #configuring-talisman-for-your-evm-containerchain }

To configure Talisman for your EVM ContainerChain, open the Talisman Extension and click on the **More Options** tab. Then, take the following steps: 

1. Select **Settings**
2. Check the **Enable Testnets** box
3. Press **Add Network**

![Add Network in Talisman](/images/builders/interact/ethereum-api/wallets/talisman/talisman-6.png)

On the following page, you'll then be prompted to enter the network details for your ContainerChain. For demonstration purposes, the Demo EVM ContainerChain is used here, but you can substitute these details for your own ContainerChain. To add your ContainerChain to Talisman, take the following steps: 

1. Paste in the RPC URL of your ContainerChain. The demo EVM ContainerChain's RPC URL is `https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network/`. Other parameters will be autopopulated.
2. Paste in the block explorer URL of your ContainerChain. The demo EVM ContainerChain's block explorer URL is `https://tanssi-evmexplorer.netlify.app/`
3. Check the **This is a testnet** box if applicable
4. Press **Add Network**

![Add your ContainerChain Network Details](/images/builders/interact/ethereum-api/wallets/talisman/talisman-7.png)

If you hold a balance of tokens in your newly created account for your ContainerChain, you'll see the balance in the Talisman dashboard. 

## Sending and Receiving Assets on your EVM ContainerChain {: #sending-and-receiving-assets-on-your-evm-containerchain }

To transfer the native token of your ContainerChain, take the following steps:

1. Click on the **Send** icon
2. Click the desired **Send from** account
3. Enter the destination address
4. Enter the amount of tokens to send
5. Press **Review** and look over the transaction details
6. Press **Confirm** to send the transaction

![Send funds on your EVM ContainerChain](/images/builders/interact/ethereum-api/wallets/talisman/talisman-8.png)


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

This guide focused specifically on configuring Talisman to work with your EVM ContainerChain, but Talisman is also a full featured wallet for Substrate (Polkadot) accounts. Under the Substrate API section you'll find a similar tutorial for configuring Talisman to work with Substrate-based chains. 

--8<-- 'text/disclaimers/third-party-content.md'
