---
title:  Native Token ERC-20 Precompile
description: Learn how to access and interact with an ERC-20 representation of the native token on Tanssi-powered EVM networks through the precompiled ERC-20 Interface.
keywords: solidity, ethereum, native, token, moonbeam, precompiled, contracts
icon: material-circle-outline
categories: EVM-Template
---

#  Native Token ERC-20 Precompile

## Introduction {: #introduction }

The native token ERC-20 precompiled contract on Tanssi-powered EVM networks allows developers to interact with the native protocol token through an ERC-20 interface. Although your network's native token is not an ERC-20 token, now you can interact with it as if it was a vanilla ERC-20.

One of the main benefits of this precompile is that it removes the necessity of having a wrapped representation of the protocol token as an ERC-20 smart contract, such as WETH on Ethereum. Furthermore, it minimizes the need for multiple wrapped representations of the same protocol token. Consequently, dApps that need to interact with the protocol token via an ERC-20 interface can do so without needing a separate smart contract.

Under the hood, the [ERC-20 precompile](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank} executes specific Substrate actions related to the Substrate balances module, which is coded in Rust. The balances module provides functionality for handling the various types of balances.

This guide will show you how to interact with UNIT tokens, the native protocol tokens for quick trial networks on [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\_blank}, via the ERC-20 precompile. You can follow along and adapt this guide to interacting with your own network.

The precompile is located at the following address:

```text
{{networks.demo_evm.precompiles.erc20 }}
```

--8<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'

## The ERC-20 Solidity Interface {: #the-erc20-interface }

The [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank} interface on Tanssi EVM networks follows the [EIP-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20){target=\_blank}, which is the standard API interface for tokens within smart contracts. The standard defines the required functions and events a token contract must implement to be interoperable with different applications.

??? code "ERC20.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/erc20/erc20.sol'
    ```

!!! note
    The ERC-20 precompile does not include `deposit` and `withdraw` functions and subsequent events expected from a wrapped token contract, such as WETH.

## Interact with the Solidity Interface {: #interact-with-the-solidity-interface }

### Checking Prerequisites {: #checking-prerequisites }

To follow along with this tutorial, you will need to have your wallet configured to work with your Tanssi-powered EVM network and an account funded with native tokens. You can add your EVM network to MetaMask with one click on the [Tanssi dApp](https://apps.tanssi.network){target=\_blank}. Or, you can [configure MetaMask for Tanssi with the demo EVM network](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

### Add Token to an EVM Wallet {: #add-token-to-evm-wallet }

If you want to interact with your network's native token like you would with an ERC-20, you can add a custom token to your EVM-compatible wallet using the precompile address. This section will walk you through adding an external asset to [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

To get started, open up MetaMask and make sure you are connected to your network and:

1. Switch to the **Assets** tab
2. Click on **Import tokens**

![Import Tokens from Assets Tab in MetaMask](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-1.webp)

Now, you can create a custom token:

1. Enter the precompile address for the token contract address - `{{networks.demo_evm.precompiles.erc20 }}`. When you enter the address, the **Token Symbol** and **Token Decimal** fields should automatically populate. If they do not, you can enter `UNIT` for the symbol and `18` for the decimal places. Recall that the default number of decimals for Tanssi EVM networks is `18`, the same as Ethereum's token decimals
2. Click **Next**

![Add Custom Token](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-2.webp)

MetaMask will prompt you to confirm the import. You can review the token details and click **Import Tokens** to import UNIT tokens into your wallet.

![Confirm and Import Tokens](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-3.webp)

And that's it! You've successfully added the UNIT token as a custom ERC-20 token on your Tanssi EVM network.

### Remix Set Up {: #remix-set-up }

You can interact with the ERC-20 precompile using [Remix](https://remix.ethereum.org){target=\_blank}. To add the precompile to Remix, you will need to:

1. Get a copy of [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank}
2. Paste the file contents into a Remix file named `IERC20.sol`

### Compile the Contract {: #compile-the-contract }

Next, you will need to compile the interface in Remix:

1. Click on the **Compile** tab, second from top
2. Compile the interface by clicking on **Compile IERC20.sol**

![Compiling IERC20.sol](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-4.webp)

When compilation is completed, you will see a green checkmark next to the **Compile** tab.

### Access the Contract {: #access-the-contract }

Instead of deploying the ERC-20 precompile, you will access the interface given the address of the precompiled contract:

1. Click on the **Deploy and Run** tab directly below the **Compile** tab in Remix. Please note that the precompiled contracts are already accessible at their respective addresses. Therefore, there is no deployment step
2. Make sure **Injected Web3** is selected in the **ENVIRONMENT** dropdown. Once you select **Injected Web3**, you may be prompted by MetaMask to connect your account to Remix if it's not already connected
3. Make sure the correct account is displayed under **ACCOUNT**
4. Ensure **IERC20 - IERC20.sol** is selected in the **CONTRACT** dropdown. Given that it is a precompiled contract, there is no deployment step. Instead, you are going to provide the address of the precompile in the **At Address** field
5. Provide the address of the ERC-20 precompile: `{{networks.demo_evm.precompiles.erc20}}` and click **At Address**

![Access the address](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-5.webp)

The **IERC20** precompile will appear in the list of **Deployed Contracts**.

### Get Basic Token Information {: #get-basic-token-information }

The ERC-20 interface lets you quickly obtain token information, including the token's total supply, name, symbol, and decimal places. You can retrieve this information by following these steps:

1. Expand the **IERC20** contract under **Deployed Contracts**
2. Click **decimals** to get the decimal places of your network's native protocol token
3. Click **name** to get the name of the token
4. Click **symbol** to get the symbol of the token
5. Click **totalSupply** to obtain the total supply of native tokens on your network

![Total Supply](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-6.webp)

The results of each function call are displayed under the respective functions.

### Get Account Balance {: #get-account-balance }

You can check the balance of any address on your network by calling the `balanceOf` function and passing in an address:

1. Expand the **balanceOf** function
2. Enter an address you would like to check the balance of for the **owner**
2. Click **call**

![Get Balance of an Account](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-7.webp)

Your balance will be displayed under the `balanceOf` function.

### Approve a Spend {: #approve-a-spend }

To approve a token spend allowance, you'll need to provide an address for the spender and the number of tokens the spender is allowed to spend. The spender can be an externally owned account (EOA) or a smart contract. For this example, you can approve the spender with an allowance of 1 UNIT token. To get started, please follow these steps:

1. Expand the **approve** function
2. Enter the address of the spender. You should have created two accounts before starting, so you can use the second account as the spender
3. Enter the amount of tokens the spender can spend for the **value**. For this example, you can allow the spender to spend 1 UNIT token in Wei units (`1000000000000000000`)
4. Click **transact**
5. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-8.webp)

After the transaction is confirmed, you'll notice that the balance of your account has stayed the same. This is because you have only approved the allowance for the given amount, and the spender hasn't spent the funds. In the next section, you will use the `allowance` function to verify that the spender can spend 1 UNIT token on your behalf.

### Get Allowance of Spender {: #get-allowance-of-spender }

To check that the spender received the allowance approved in the [Approve a Spend](#approve-a-spend) section, you can:

1. Expand the **allowance** function
2. Enter your address for the **owner**
3. Enter the address of the **spender** that you used in the previous section
4. Click **call**

![Get Allowance of Spender](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-9.webp)

Once the call is complete, the allowance of the spender will be displayed, which should be equivalent to 1 UNIT token (`1000000000000000000`).

### Send Transfer {: #send-transfer }

To send tokens from your account directly to another account, you can call the `transfer` function by following these steps:

1. Expand the **transfer** function
2. Enter the address to send UNIT tokens to
3. Enter the amount of UNIT tokens to send. For this example, you can send 1 UNIT token (`1000000000000000000`)
4. Click **transact**
5. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Send Standard Transfer](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-10.webp)

Once the transaction is complete, you can [check your balance](#get-account-balance) using the `balanceOf` function or by looking at MetaMask. You'll notice that your balance has decreased by 1 UNIT token. You can also use the `balanceOf` function to ensure that the recipients balance has increased by 1 UNIT token as expected.

### Send Transfer From Specific Account {: #send-transferfrom }

So far, you have approved an allowance of 1 UNIT token for the spender and sent 1 UNIT token via the standard `transfer` function. The `transferFrom` function varies from the standard `transfer` function as it allows you to define the address to which you want to send the tokens. So you can specify an address with an allowance or your address as long as you have funds. For this example, you will use the spender's account to initiate a transfer of the allowed funds from the owner to the spender. The spender can send the funds to any account, but you can send the funds from the owner to the spender for this example.

First, you need to switch to the spender's account in MetaMask. Once you switch to the spender's account, you'll notice that the selected address in Remix under the **Accounts** tab is now the spender's.

![Switch accounts Remix](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-11.webp)

Next, you can initiate and send the transfer. To do so, take the following steps:

1. Expand the **transferFrom** function
2. Enter your address as the owner in the **from** field
3. Enter the recipient address, which should be the spender's address, in the **to** field
4. Enter the amount of UNIT tokens to send. Again, the spender is currently only allowed to send 1 UNIT token, so enter `1000000000000000000`
5. Click **transact**

![Send Standard Transfer](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-12.webp)

Once the transaction is complete, you can [check the balance](#get-account-balance) of the owner and spender using the `balanceOf` function. The spender's balance should have increased by 1 UNIT token, and their allowance should now be depleted. To verify that the spender no longer has an allowance, you can call the `allowance` function by passing in the owner and spender's addresses. You should receive a result of 0.

![Zero Allowance](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-13.webp)

And that's it! You've successfully interacted with the ERC-20 precompile using MetaMask and Remix!

--8<-- 'text/_disclaimers/third-party-content.md'