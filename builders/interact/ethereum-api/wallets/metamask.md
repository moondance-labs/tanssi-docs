---
title: How to Connect MetaMask
description: This guide walks you through how to connect MetaMask, a browser-based Ethereum wallet, to your Tanssi EVM ContainerChain and how to transfer funds.
---

# Interacting with your Tanssi EVM ContainerChain Using MetaMask

## Introduction {: #introduction }

Developers building dApps on top of Tanssi EVM ContainerChains can leverage their Ethereum compatibility features by integrating known Ethereum wallets, such as [MetaMask](https://metamask.io/){target=\_blank}. By doing so, they can use the injected library MetaMask provides to interact with the Tanssi EVM ContainerChain.

This guide takes you through all the necessary steps: from installing Metamask, to setting up a wallet, and finally connecting it to your Tanssi EVM ContainerChain.

!!! note
    You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.

## Install the MetaMask Extension {: #install-the-metamask-extension }

First, you'll start with a fresh and default [MetaMask](https://metamask.io/){target=\_blank} installation from the Chrome store. After downloading, installing, and initializing the extension, follow the **Get Started** steps to [setup the wallet](#setup-a-wallet). In there, you need to create a wallet, set a password, and store your secret backup phrase (this gives direct access to your funds, so make sure to store these in a secure place).

!!! note
    The Metamask browser extension is compatible with Chrome, Chromium based browsers (such as Microsoft Edge and Opera), and Firefox. Metamask is also available as a mobile app for iOS and Android devices.

## Setup a Wallet {: #setup-a-wallet }

After installing [MetaMask](https://metamask.io){target=\_blank}, the setup will automatically open a new task with a welcome screen. Here, you are offered two options:

- **Create a new wallet** - you'll go through some steps to get a new seed phrase. Ensure you store this phrase securely and you don't share it publicly
- **Import an existing wallet** - you already have a seed phrase stored, and you want to restore an account from that recovery phrase

![Metamask Setup Interface](/images/builders/interact/ethereum-api/wallets/metamask/metamask-1.png)

Once you've clicked on the option that adapts to your needs, follow the steps, and you should be all setup.

!!! note
    Multiple accounts can be derived from a seed phrase by changing what is known as the address index. By default, when creating or importing an account from the seed phrase, you get the account with the address index 0. You can get the other indexes by just adding new accounts in the main Metamask screen.

## Import Accounts {: #import-accounts }

Once you've created a wallet or imported an existing one, you can also import any account into MetaMask if you hold the private keys.

For this example, you'll use private keys from the development account. Click the account switcher button to import an account using its private keys. That is where it says **Account 1**.

![Importing account from private key metamask menu](/images/builders/interact/ethereum-api/wallets/metamask/metamask-2.png)

Next, click on **Import Account**.

![Importing account from private key account switcher menu](/images/builders/interact/ethereum-api/wallets/metamask/metamask-3.png)

Finally, enter the private keys of the account you are trying to import. Once you've entered the private key, click on **Import**.

![Paste your account key into MetaMask](/images/builders/interact/ethereum-api/wallets/metamask/metamask-4.png)

You should end up with an imported **Account 2** that looks like this:

![MetaMask displaying your new Account 2](/images/builders/interact/ethereum-api/wallets/metamask/metamask-5.png)

## Connect MetaMask to your Tanssi EVM ContainerChain {: #connect-metamask-to-evm-containerchain }

Once you have [MetaMask](https://metamask.io/){target=\_blank} installed and have created or imported an account, you can connect it to your Tanssi EVM ContainerChain. To do so, take the following steps:

1. Click in the upper left network selector menu
2. Select **Add Network**

![Add new network in Metamask menu](/images/builders/interact/ethereum-api/wallets/metamask/metamask-6.png)

Next, go to the bottom of the page and click on **Add network manually**:

![Add network manually in Metamask](/images/builders/interact/ethereum-api/wallets/metamask/metamask-7.png)

Here, you can configure MetaMask for the following networks:

|         Variable          |                           Value                            |
|:-------------------------:|:----------------------------------------------------------:|
|       Network Name        |               `EVM ContainerChain Dancebox`                |
|          RPC URL          | `https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network` |
|         Chain ID          |                           `5678`                           |
|     Symbol (Optional)     |                           `UNIT`                           |
| Block Explorer (Optional) |                           `N/A`                            |

To do so, fill in the following information:

1. **Network name** - name that represents the network you are connecting to
2. **RPC URL** - RPC endpoint of the network
3. **Chain ID** - chain ID of the Ethereum compatible network
4. **Symbol** - (optional) symbol of the native token of the network
5. **Block Explorer** - (optional) URL of the block explorer
6. Once you've verified all the information, click on **Save**

![Add network in Metamask](/images/builders/interact/ethereum-api/wallets/metamask/metamask-8.png)

Once you've added the network, you'll be redirected to a screen stating that you've successfully added a network. Furthermore, you'll be prompted to **Switch to EVM ContainerChain Dancebox**, the network added in this example.

![Successfully added a network in Metamask](/images/builders/interact/ethereum-api/wallets/metamask/metamask-9.png)

## Interact with the Network {: #interact-with-network }

Once you've [connected Metamask](#connect-metamask-to-evm-containerchain) to your Tanssi EVM ContainerChain, you can start using your wallet by:

- Sending a token transfer to another address
- Adding ERC-20s to Metamask and interacting with them
- Adding ERC-721s to Metamask and interacting with them

--8<-- 'text/_disclaimers/third-party-content.md'
