---
title: Deploy Smart Contracts with Remix
description: Learn how to use one of the most popular Ethereum developer tools, the Remix IDE, to interact with your Tanssi EVM ContainerChain.
---

# Using Remix to Deploy to your Tanssi EVM ContainerChain

## Introduction {: #introduction } 

Developers building dApps on top of Tanssi EVM ContainerChains can use [Remix](https://remix.ethereum.org/){target=_blank}, one of the most popular Ethereum development environments, to build, compile, and deploy their smart contracts. 

This guide walks through the process of creating and deploying a Solidity-based smart contract to the Tanssi Dancebox TestNet using the Remix IDE. This guide can be adapted for your own Tanssi EVM ContainerChain by simply changing the endpoint.

## Checking Prerequisites {: #checking-prerequisites } 

For the purposes of this guide, you'll need to have MetaMask installed and configured to work with the Tanssi Dancebox TestNet. You can follow [this guide to configuring MetaMask for Tanssi](/builders/interact/ethereum-api/wallets/metamask/){target=_blank}.


## Getting Started with Remix {: #getting-started-with-remix } 

Now, you can head to [Remix](https://remix.ethereum.org/){target=_blank} to get started. In the main screen, under **Featured Plugins**, select **SOLIDITY** to configure Remix for Solidity development, then navigate to the **File Explorers** view.

![File explorer](/images/builders/interact/ethereum-api/dev-env/remix/using-remix-3.png)

You will create a new file to save the Solidity smart contract. Hit the **+** button under **File Explorers** and enter the name `MyToken.sol` in the pop-up.

![Create a new file for your Solidity contract](/images/builders/interact/ethereum-api/dev-env/remix/using-remix-4.png)

Next, paste the following smart contract into the editor tab:

```solidity
--8<-- 'code/remix-local/contract.md'
```

![Paste the contract into the editor](/images/builders/interact/ethereum-api/dev-env/remix/using-remix-5.png)

This is a simple ERC-20 contract based on the current OpenZeppelin ERC-20 template. It creates `MyToken` with symbol `MYTOK` and mints the entirety of the initial supply to the creator of the contract.

Now, navigate to the **Compile** sidebar option and press the **Compile MyToken.sol** button.

![Compile MyToken.sol](/images/builders/interact/ethereum-api/dev-env/remix/using-remix-6.png)

You will see Remix download all of the OpenZeppelin dependencies and compile the contract.


--8<-- 'text/disclaimers/third-party-content.md'