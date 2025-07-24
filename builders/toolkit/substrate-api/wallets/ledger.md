---
title: Using Ledger With Your Substrate Appchain
description: This guide walks you through setting up and using a Ledger device to interact with the Tanssi network or any of the Tanssi-powered Substrate appchains.
icon: material-wallet-outline 
categories: Substrate-Template
---

# Interacting with Substrate Tanssi Chains Using Ledger

## Introduction {: #introduction }

Developers and users of Substrate networks, such as the Tanssi network or non-EVM Tanssi-powered appchains, have a variety of options when it comes to wallets. Regarding cold wallets, which store your private keys in a secure, offline environment, [Ledger](https://www.ledger.com/){target=\_blank} is one of the most popular options. Ledger provides full support for Substrate blockchains, such as the Tanssi network.

Ledger devices are hardware wallets designed to store the private keys offline. They are used to verify and sign the transactions, but they still need a software layer to provide the UI that interacts with the networks, builds the transactions, and sends the signed transactions back to the network once the user has verified them.

This guide takes you through all the necessary steps to use your Ledger device with Substrate Tanssi chains.

## Setting Up Your Ledger Device {: #setting-up-ledger-device }

If you have a brand new Ledger device, refer to the [official website](https://support.ledger.com/article/4404389503889-zd){target=\_blank} for a guide on getting it started with the initial setup.

Now, with your Ledger already initiated, install the _Polkadot_ app taking the following steps:

1. Open the Ledger Live App on your computer.
2. Go to My Ledger.
3. Connect and unlock the device.

Finally, search for **Polkadot (DOT)** app in Ledger Live and install it on your device.

!!! note
    Why Polkadot? Tanssi is built using Substrate, the same framework that powers Polkadot. As a result, even though Tanssi and Polkadot are separate networks, they share the same cryptographic signature schema. This means that the Ledger app named **Polkadot (DOT)** is fully compatible with Tanssi.

![Install Polkadot in Ledger Live](/images/builders/toolkit/substrate-api/wallets/ledger/ledger-1.webp)

And that's it. Your device now has a Substrate account and is able to sign transactions on Tanssi and any non-EVM Tanssi-powered appchain.

## Adding the Ledger to a Hot Wallet {: #adding-Ledger-hot-wallet }

As presented in the [introduction](#introduction), a Ledger hardware wallet provides secure, offline storage for private keys, allowing users to verify and sign transactions. However, by design, it can't interact with blockchains or dApps by itself, nor does it offer a UI for managing assets. To complement the device, a hot wallet is required. The user can choose any Substrate wallet, such as [Talisman](/builders/toolkit/substrate-api/wallets/talisman/){target=\_blank} or [SubWallet](/builders/toolkit/substrate-api/wallets/subwallet/){target=\_blank}.

For demonstration purposes, we'll show how to configure Talisman to work with your hardware wallet, but these steps are generally applicable to any other Substrate-enabled wallet that supports Ledger. To follow along with the steps, make sure you have [Talisman installed](/builders/toolkit/substrate-api/wallets/talisman/#setting-up-talisman){target=\_blank} in your browser, then open the extension and:

1. Press the **+** icon (Add Account).
2. Click on the **Connect** tab.
3. Select **Connect Ledger**.

![Connect Ledger](/images/builders/toolkit/substrate-api/wallets/ledger/ledger-2.webp)

On the following screen, take the following steps:

1. Select **Polkadot**. Other options will be presented below.
2. Select **Polkadot** from the dropdown.
3. Select **Polkadot App** from the box. You'll be prompted to connect your ledger and open the Polkadot app.
4. Make sure that your ledger is successfully connected.
5. Click on **Continue**.

![Connect Ledger](/images/builders/toolkit/substrate-api/wallets/ledger/ledger-3.webp)

In the next step, you will be presented with a list of derived accounts. Select the one you want to import, click **Continue**, and that's all! Your Talisman wallet can now sign transactions using your Ledger device.

--8<-- 'text/_disclaimers/third-party-content.md'
