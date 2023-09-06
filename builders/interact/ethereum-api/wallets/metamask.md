---
title: How to Connect MetaMask
description: This guide walks you through how to connect MetaMask, a browser-based Ethereum wallet, to your Tanssi EVM ContainerChain and how to transfer funds.
---

# Interacting with your Tanssi EVM ContainerChain Using MetaMask

## Introduction {: #introduction } 

Developers building dApps on top of Tanssi EVM ContainerChains can leverage their Ethereum compatibility features integrate known Ethereum wallets, such as [MetaMask](https://metamask.io/){target=_blank}. By doing so, they can use the injected library MetaMask provides to interact with the Tanssi EVM ContainerChain.

## Install the MetaMask Extension {: #install-the-metamask-extension } 

First, you'll start with a fresh and default [MetaMask](https://metamask.io/){target=_blank} installation from the Chrome store. After downloading, installing, and initializing the extension, follow the **Get Started** guide. In there, you need to create a wallet, set a password, and store your secret backup phrase (this gives direct access to your funds, so make sure to store these in a secure place). 

## Create a Wallet {: #create-a-wallet } 

After installing [MetaMask](https://metamask.io){target=_blank}, the setup will automatically open a new task with a welcome screen. Click **Get Started** to begin the setup process.

![MetaMask1](/images/tokens/connect/metamask/metamask-1.png)

When prompted, you are given the option to import a wallet using a recovery seed phrase. For this exercise, set up a new wallet.

![MetaMask2](/images/tokens/connect/metamask/metamask-2.png)

## Import Accounts {: #import-accounts } 

Instead of creating an account, you also have the option of importing any account into MetaMask you hold the private keys to. For this example, you'll import a development account.

![Import dev account into MetaMask](/images/tokens/connect/metamask/metamask-3.png)

The details for the development accounts that comes pre-funded for this development node are as follows:

--8<-- 'code/setting-up-node/dev-accounts.md'

--8<-- 'code/setting-up-node/dev-testing-account.md'

On the import screen, select **Private Key** and paste in one of the keys listed above. For this example we'll use Gerald's key:

![Paste your account key into MetaMask](/images/tokens/connect/metamask/metamask-4.png)

You should end up with an imported **Account 2** that looks like this:

![MetaMask displaying your new Account 2](/images/tokens/connect/metamask/metamask-5.png)

## Connect MetaMask to Moonbeam {: #connect-metamask-to-moonbeam } 

Once you have [MetaMask](https://metamask.io/){target=_blank} installed and have created or imported an account, you can connect it to Moonbeam by clicking on the network dropdown and selecting **Add Network**.

![MetaMask3](/images/tokens/connect/metamask/metamask-6.png)

Here you can configure MetaMask for the following networks:

=== "Moonbeam"
    |         Variable          |   Value    |
    |:-------------------------:|:----------:|
    |       Network Name        | `Moonbeam` |
    |          RPC URL          |    XXX     |
    |          ChainID          |    XXX     |
    |     Symbol (Optional)     |   `GLMR`   |
    | Block Explorer (Optional) |    XXX     |

![MetaMask5](/images/tokens/connect/metamask/metamask-7.png)

## Initiate a Transfer {: #initiate-a-transfer } 

You can also try sending some tokens with MetaMask. You will need two accounts for this example, so if you need to create another one you can do so now. Once you have two accounts, click **Send** to initiate the transfer. Select the **Transfer between my accounts** option, transfer 100 tokens, and leave all other settings as they are:

![Initiating a token transfer](/images/tokens/connect/metamask/metamask-8.png)

Once you have submitted the transaction, you will see it **pending** until it is confirmed, as shown in the following image:

![Transaction confirmation](/images/tokens/connect/metamask/metamask-9.png)

Note that the Account 2 balance has been decreased by the sent amount + gas fees. Flipping over to Account 1, you can see the 100 sent tokens have arrived:

![New balance in Account 1](/images/tokens/connect/metamask/metamask-10.png)

If you head back over to your terminal where you have your Moonbeam node running, you will begin to see blocks being authored as transactions arrive:

![Moonbeam Development Node](/images/tokens/connect/metamask/metamask-11.png)

!!! note
    If you end up resetting your development node using the Substrate purge-chain command, you will need to reset your MetaMask genesis account. To do so click on the colored circle in the top right corner and from the menu click on **Settings**. Then click on **Advanced**, and **Reset Account**. This will clear the transaction history from your accounts and reset the nonce. Make sure you don’t erase anything that you want to keep!
 
--8<-- 'text/disclaimers/third-party-content.md'