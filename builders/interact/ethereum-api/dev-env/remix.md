---
title: Deploy Smart Contracts with Remix
description: Learn how to use one of the most popular Ethereum developer tools, the Remix IDE, to interact with your Tanssi EVM ContainerChain.
---

# Using Remix to Deploy to Your Tanssi EVM ContainerChain

## Introduction {: #introduction }

Developers building dApps on top of Tanssi EVM ContainerChains can use [Remix](https://remix.ethereum.org/){target=\_blank}, one of the most popular Ethereum development environments, to build, compile, and deploy their smart contracts. Remix can be used with any EVM ContainerChain, thanks to the seamless compatibility of Tanssi EVM ContainerChains.

This guide walks through the process of creating and deploying a Solidity-based smart contract to the Tanssi Dancebox TestNet using the Remix IDE. This guide can be adapted for your own Tanssi EVM ContainerChain by simply adding the RPC URL of your ContainerChain to your EVM Wallet and switching networks to it.

## Checking Prerequisites {: #checking-prerequisites }

For the purposes of this guide, you'll need to have MetaMask installed and configured to work with your EVM ContainerChain. You can follow [this guide to configure MetaMask for Tanssi with the demo EVM ContainerChain](/builders/interact/ethereum-api/wallets/metamask/){target=\_blank}.

## Getting Started with Remix {: #getting-started-with-remix }

Now, you can head to [Remix](https://remix.ethereum.org/){target=\_blank} to get started. On the main screen, navigate to the **File Explorer** tab.

![File explorer](/images/builders/interact/ethereum-api/dev-environments/remix/remix-1.png)

Next, you can create a new file to save the Solidity smart contract. To do so, take the following steps:

1. Press the **Create New File** button on the left-hand side of **File Explorer**
2. Enter your desired filename, such as `MyToken.sol`

![Create a new file for your Solidity contract](/images/builders/interact/ethereum-api/dev-environments/remix/remix-2.png)

Next, paste the following smart contract into the editor tab:

```solidity
--8<-- 'code/ethereum-api/remix/erc20.sol'
```

![Paste the contract into the editor](/images/builders/interact/ethereum-api/dev-environments/remix/remix-3.png)

This is a simple ERC-20 contract based on the [current OpenZeppelin ERC-20 template](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol){target=\_blank}. It creates `MyToken` with symbol `MYTOK` and mints the entirety of the initial supply to the creator of the contract.

To compile your smart contract, take the following steps:

1. Navigate to the **Solidity compiler** tab
2. Press the **Compile MyToken.sol** button.

![Compile MyToken.sol](/images/builders/interact/ethereum-api/dev-environments/remix/remix-4.png)

Your contract is now compiled and ready to be deployed to your ContainerChain.

## Deploying a Contract to Your ContainerChain Using Remix {: #deploying-a-contract-to-your-containerchain-using-remix }

Now you can deploy the contract by navigating to the **Deployment** sidebar option. You need to change the topmost **ENVIRONMENT** dropdown from **JavaScript VM** to **Injected Web3**. This tells Remix to use the MetaMask injected provider, which will point it to your EVM ContainerChain, so long as the selected network in your MetaMask is your EVM ContainerChain. If you need to change your network in MetaMask, you can easily do so, and Remix will update your account balances to reflect the network change.

![Change environment to injected Web3](/images/builders/interact/ethereum-api/dev-environments/remix/remix-5.png)

As soon as you select **Injected Web3**, you will be prompted to allow Remix to connect to your MetaMask account. Then, take the following steps:

1. Select the account(s) that you would like to use with Remix
2. Press **Next**
3. Press **Connect**

![Select accounts to connect to Remix](/images/builders/interact/ethereum-api/dev-environments/remix/remix-6.png)

Back on Remix, you should see the account you wish to use for deployment is now managed by MetaMask. To deploy your token contract, take the following steps:

1. Next to the **Deploy** button, specify an initial supply of 8 million tokens. Since this contract uses the default of 18 decimals, the value to put in the box is `8000000000000000000000000`. Once you have entered this value, press **Deploy**
2. Confirm the contract deployment transaction in MetaMask.

![Enter an token balance and deploy](/images/builders/interact/ethereum-api/dev-environments/remix/remix-7.png)

After you press **Confirm** and the deployment is complete, you will see the transaction listed in MetaMask. The contract will appear under **Deployed Contracts** in Remix. You can access the address of the deployed contract by pressing the copy button.

![Confirmed label on a transaction](/images/builders/interact/ethereum-api/dev-environments/remix/remix-8.png)

Once the contract is deployed, you can interact with it from within Remix. To familiarize yourself with interacting with a smart contract from Remix, take the following steps:

1. Expand the contract under the **Deployed Contracts** section
2. Paste in your address (the address that deployed the token contract) next to the balanceOf method and press **balanceOf**. You should see the entirety of the balance of the ERC-20 belonging to that address.
3. Press **Decimals** to see the number of decimal points the token has
4. Press **Name** to see the name you assigned the token
5. Press **Symbol** to see the token symbol
6. Press **Initial Supply** and you should see `8000000000000000000000000`
7. Copy the contract address by clicking the button next to the contract name and address. You'll need it in the next section

![Interact with the contract from Remix](/images/builders/interact/ethereum-api/dev-environments/remix/remix-9.png)

## Interacting with an ERC-20 on Your ContainerChain from MetaMask {: #interacting-with-an-erc-20-on-your-containerchain-from-metamask }

Now, open MetaMask to add the newly deployed ERC-20 tokens. Make sure you are connected to the account that deployed the token contract. Additionally, make sure you have copied the contract's address from Remix.

To add the token to MetaMask, take the following steps:

1. Click on the **Tokens** tab as shown below
2. Press **Import tokens**

![Add a token](/images/builders/interact/ethereum-api/dev-environments/remix/remix-10.png)

Then, take the following steps:

1. Paste the copied contract address into the **Token contract address** field. The **Token symbol** and **Token decimal** fields should be automatically populated
2. Press **Next**

![Paste the copied contract address](/images/builders/interact/ethereum-api/dev-environments/remix/remix-11.png)

After clicking **Next**, you will need to confirm that you want to add these tokens to your MetaMask account. Click **Import** and you should see a balance of 8 million MyTokens in MetaMask:

![Add the tokens to your MetaMask account](/images/builders/interact/ethereum-api/dev-environments/remix/remix-12.png)

Now you can send some of these ERC-20 tokens to the other account that you have set up in MetaMask. Click **Send** to initiate the transfer of 500 MyTokens and select the destination account.

After clicking **Next**, you will be asked to confirm (similar to what is pictured below).

![Confirmation of the token transfer](/images/builders/interact/ethereum-api/dev-environments/remix/remix-13.png)

Click **Confirm** and, after the transaction is complete, you will see a confirmation and a reduction of the MyToken account balance from the sender account in MetaMask.

![Verify the reduction in account balance](/images/builders/interact/ethereum-api/dev-environments/remix/remix-14.png)

You can also look up the transaction on [your ContainerChain's explorer](https://tanssi-evmexplorer.netlify.app/){target=\_blank} to verify the transaction status.

![Check transaction status on block explorer for your ContainerChain](/images/builders/interact/ethereum-api/dev-environments/remix/remix-15.png)

--8<-- 'text/disclaimers/third-party-content.md'
