---
title: Interacting with Tanssi-powered EVM appchains Using Ledger
description: Learn to set up and use Ledger hardware wallets with Tanssi-powered EVM appchains for secure offline key storage and transaction signing.
icon: material-wallet-outline 
---

# Interacting with Tanssi-powered EVM appchains Using Ledger

## Introduction {: #introduction }

Developers and users of Tanssi-powered EVM appchains, such as the [Tanssi demo](https://apps.tanssi.network/demo){target=\_blank} EVM appchain, have a variety of options when it comes to wallets. Regarding cold wallets, which store your private keys in a secure, offline environment, [Ledger](https://www.ledger.com/){target=\_blank} is one of the most popular options. Ledger provides full support for Substrate blockchains, such as the Tanssi network.

Ledger devices are hardware wallets designed to store the private keys offline. They are used to verify and sign the transactions, but they still need a software layer to provide the UI that interacts with the networks, builds the transactions, and sends the signed transactions back to the network once the user has verified them.

This guide takes you through all the necessary steps to use your Ledger device with Tanssi-powered EVM appchains.

## Setting Up Your Ledger Device {: #setting-up-ledger-device }

If you have a brand new Ledger device, refer to the [official website](https://support.ledger.com/article/4404389503889-zd){target=\_blank} for a guide on getting it started with the initial setup.

Now, with your Ledger already initiated, install the _Ethereum_ app taking the following steps:

1. Open the Ledger Live App on your computer.
2. Go to My Ledger.
3. Connect and unlock the device.

Finally, search for the _Ethereum (ETH)_ app in Ledger Live and install it on your device.

![Install Ethereum in Ledger Live](/images/builders/toolkit/ethereum-api/wallets/ledger/ledger-1.webp)

And that's it. Your device now has an Ethereum account and is able to sign transactions on any Tanssi-powered EVM appchain.

## Adding the Ledger to a Software Wallet {: #adding-Ledger--software-wallet }

As presented in the [introduction](#introduction), a Ledger hardware wallet provides secure, offline storage for private keys, allowing users to verify and sign transactions. However, by design, it can't interact with blockchains or dApps by itself, nor does it offer a UI for managing assets. To complement the device, a software wallet is required. The user can choose any Ethereum-compatible wallet.

For demonstration purposes, we'll show how to configure [Metamask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank} to work with your hardware wallet. To follow along with the steps, make sure you have Metamask installed in your browser, then open the extension and click on the dropdown icon, next to the account name.

![Connect Ledger](/images/builders/toolkit/ethereum-api/wallets/ledger/ledger-2.webp)

Now click on the **+ Add account or hardware wallet** button.

![Connect Ledger](/images/builders/toolkit/ethereum-api/wallets/ledger/ledger-3.webp)

Select **Hardware wallet** from the available options.

![Connect Ledger](/images/builders/toolkit/ethereum-api/wallets/ledger/ledger-4.webp)

On the following screen:

1. Select the **LEDGER** box. You'll be prompted to connect your ledger, unlock it, and open the Ethereum app.
2. Click on **Continue**.

![Connect Ledger](/images/builders/toolkit/ethereum-api/wallets/ledger/ledger-5.webp)

Finally, will be presented with a list of derived accounts. Select the first one, click **Unlock**, and that's all! Your Metamask wallet can now sign transactions using your ledger device.

--8<-- 'text/_disclaimers/third-party-content.md'
