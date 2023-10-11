---
title: Deploy Smart Contracts with Remix
description: Learn how to use one of the most popular Ethereum developer tools, the Remix IDE, to interact with your Tanssi EVM ContainerChain.
---

# Using Remix to Deploy to your Tanssi EVM ContainerChain

## Introduction {: #introduction } 

Developers building dApps on top of Tanssi EVM ContainerChains can use [Remix](https://remix.ethereum.org/){target=_blank}, one of the most popular Ethereum development environments, to build, compile, and deploy their smart contracts. Remix can be used with any EVM ContainerChain, thanks to the seamless compatibility of Tanssi EVM ContainerChains. 

This guide walks through the process of creating and deploying a Solidity-based smart contract to the Tanssi Dancebox TestNet using the Remix IDE. This guide can be adapted for your own Tanssi EVM ContainerChain by simply adding the RPC URL of your ContainerChain to your EVM Wallet and switching networks to it.  

## Checking Prerequisites {: #checking-prerequisites } 

For the purposes of this guide, you'll need to have MetaMask installed and configured to work with the Tanssi Dancebox TestNet. You can follow [this guide to configuring MetaMask for Tanssi](/builders/interact/ethereum-api/wallets/metamask/){target=_blank}.


## Getting Started with Remix {: #getting-started-with-remix } 

Now, you can head to [Remix](https://remix.ethereum.org/){target=_blank} to get started. In the main screen, under **Featured Plugins**, select **SOLIDITY** to configure Remix for Solidity development, then navigate to the **File Explorers** view.

![File explorer](/images/builders/interact/ethereum-api/dev-environments/remix/remix-1.png)

You will create a new file to save the Solidity smart contract. Press the **Create New File** button on the left hand side of **File Explorers** and enter the name `MyToken.sol` in the pop-up.

![Create a new file for your Solidity contract](/images/builders/interact/ethereum-api/dev-environments/remix/remix-2.png)

Next, paste the following smart contract into the editor tab:

```solidity
--8<-- 'code/ethereum-api/remix/erc20.sol'
```

![Paste the contract into the editor](/images/builders/interact/ethereum-api/dev-environments/remix/remix-3.png)

This is a simple ERC-20 contract based on the [current OpenZeppelin ERC-20 template](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol){target=_blank}. It creates `MyToken` with symbol `MYTOK` and mints the entirety of the initial supply to the creator of the contract.

Now, navigate to the **Solidity compiler** sidebar option and press the **Compile MyToken.sol** button.

![Compile MyToken.sol](/images/builders/interact/ethereum-api/dev-environments/remix/remix-4.png)

You will see Remix download all of the OpenZeppelin dependencies and compile the contract.

## Deploying a Contract to your ContainerChain Using Remix {: #deploying-a-contract-to-your-containerchain-using-remix }

Now you can deploy the contract by navigating to the **Deployment** sidebar option. You need to change the topmost **ENVIRONMENT** dropdown from **JavaScript VM** to **Injected Web3**. This tells Remix to use the MetaMask injected provider, which will point it to your EVM ContainerChain, so long as the selected network in your MetaMask is your EVM ContainerChain. If you need to change your network in MetaMask, you can easily do so, and Remix will update your account balances to reflecting the network change. 

As soon as you select **Injected Web3**, you will be prompted to allow Remix to connect to your MetaMask account.

![Replace](/images/builders/interact/ethereum-api/dev-environments/remix/remix-5.png)

Press **Next** in MetaMask to allow Remix to access the selected account.

Back on Remix, you should see that the account you wish to use for deployment is now managed by MetaMask. Next to the **Deploy** button, specify an initial supply of 8M tokens. Since this contract uses the default of 18 decimals, the value to put in the box is `8000000000000000000000000`.

Once you have entered this value, select **Deploy**. You will be prompted in MetaMask to confirm the contract deployment transaction.

![Enter an token balance and deploy](/images/builders/interact/ethereum-api/dev-environments/remix/remix-6.png)

After you press **Confirm** and the deployment is complete, you will see the transaction listed in MetaMask. The contract will appear under **Deployed Contracts** in Remix.

![Confirmed label on a transaction](/images/builders/interact/ethereum-api/dev-environments/remix/remix-7.png)

Once the contract is deployed, you can interact with it from within Remix.

Drill down on the contract under **Deployed Contracts**. Clicking on **name**, **symbol**, and **totalSupply** should return `MyToken`, `MYTOK`, and `8000000000000000000000000` respectively. If you copy the address from which you deployed the contract and paste it into the **balanceOf** field, you should see the entirety of the balance of the ERC-20 as belonging to that user. Copy the contract address by clicking the button next to the contract name and address.

![Interact with the contract from Remix](/images/builders/interact/ethereum-api/dev-environments/remix/remix-8.png)

## Interacting with an ERC-20 on your ContainerChain from MetaMask {: #interacting-with-an-erc-20-on-your-containerchain-from-metamask }

Now, open MetaMask to add the newly deployed ERC-20 tokens. Before doing so, make sure you have copied the contract's address from Remix. Back in MetaMask, click on the **Tokens** Tab as shown below. Then press **Import tokens**. Make sure you are connected to the account that deployed the token contract.

![Add a token](/images/builders/interact/ethereum-api/dev-environments/remix/remix-9.png)

Paste the copied contract address into the **Token contract address** field. The **Token symbol** and **Token decimals** fields should be automatically populated.

![Paste the copied contract address](/images/builders/interact/ethereum-api/dev-environments/remix/remix-10.png)

After clicking **Next**, you will need to confirm that you want to add these tokens to your MetaMask account. Click **Import** and you should see a balance of 8M MyTokens in MetaMask:

![Add the tokens to your MetaMask account](/images/builders/interact/ethereum-api/dev-environments/remix/remix-11.png)

Now you can send some of these ERC-20 tokens to the other account that you have set up in MetaMask. Click **Send** to initiate the transfer of 500 MyTokens and select the destination account.

After clicking **Next**, you will be asked to confirm (similar to what is pictured below).

![Confirmation of the token transfer](/images/builders/interact/ethereum-api/dev-environments/remix/remix-12.png)

Click **Confirm** and, after the transaction is complete, you will see a confirmation and a reduction of the MyToken account balance from the sender account in MetaMask:

![Verify the reduction in account balance](/images/builders/interact/ethereum-api/dev-environments/remix/remix-13.png)

You can also look up the transaction on [your ContainerChain's explorer](https://tanssi-evmexplorer.netlify.app/){target=_blank} to verify the transaction status. 

![Check transaction status on block explorer for your ContainerChain](/images/builders/interact/ethereum-api/dev-environments/remix/remix-14.png)

--8<-- 'text/disclaimers/third-party-content.md'