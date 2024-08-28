---
title: Foreign Assets as ERC-20
description: Learn how to access and interact with an ERC-20 representation of any foreign assets on Tanssi EVM appchains through the precompiled ERC-20 Interface.
keywords: solidity, ethereum, native, token, moonbeam, precompiled, contracts, assets, erc20
---

# Foreign Assets as ERC-20

## Introduction {: #introduction }

As presented in the [Native Cross-Chain Communication](/learn/framework/xcm){target=\_blank} article, appchains deployed through Tanssi can communicate and interoperate with any other appchain in the ecosystem. This multi-chain environment leads to a multi-asset world, where seamless transfer of assets, data, and value across different networks widens the possibilities to build use cases across diverse industries such as finance (DeFi), real-world assets (RWAs), and others.

Foreign assets are tokens native to another blockchain, or, in other words, assets whose reserve chain is not the chain you are interacting with. Tanssi appchains can register foreign assets to enable their inflow. To do so, it is necessary to [establish an XCM channel](/learn/framework/xcm/#channel-registration){target=\_blank} with the other chain and then register one of its native assets as a foreign asset. Registered foreign assets behave, to some extent, the same way as local ones.

The [ERC-20 assets precompile](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20Instance.sol){target=\_blank} allows appchains based on the [Tanssi EVM template](/builders/build/templates/evm/){target=\_blank} to access any registered foreign asset through the standard ERC-20 interface. Consequently, smart contracts deployed to the appchain can interact with such assets as they would with any other regular ERC-20.

The address representing the ERC-20 contract is formed with the first thirty-six positions (eighteen bytes) set to the maximum value and the last four positions (two bytes) replaced with the hexadecimal representation of the registered asset identifier:

```text
{{networks.dancebox.precompiles.foreign_assets_erc20}}
```

For example, for the asset whose ID is `1`, the last four positions must be replaced with `0001`, and for an asset with an ID of `10`, those four positions must be replaced with `000A`.

--8<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'

## Prerequisites {: #prerequisites }

 Tto follow along with the contents in this guide, you'll need:
 
- Access to a Tanssi EVM appchain running [runtime 500](https://github.com/moondance-labs/tanssi/releases/tag/runtime-500){target=\_blank} or above
- An established bidirectional XCM channel to another chain. To manage your appchain's channels, refer to the [Manage Cross-Chain Communication Channels](/builders/manage/dapp/xcm-channels/){target=\_blank} article
- A registered foreign asset. Once the XCM channels are open, asset registration can be easily done using the [dApp](https://apps.tanssi.network/){target=\_blank}, in the `Asset Registration` menu entry from the `XCM` management section
- Finally, you'll need an [EVM-compatible wallet](/builders/toolkit/ethereum-api/wallets/){target=\_blank} configured to work with your appchain. You can also connect your wallet to the [demo EVM appchain](https://apps.tanssi.network/demo){target=\_blank}.

The examples in this guide are based on the Tanssi demo EVM appchain, which already has open channels to other appchains and registered foreign assets, as the following picture shows:

1. The registered foreign asset (UNIT) which will be used in the following sections
2. Other available foreign assets not yet registered

![Tanssi EVM demo appchain registered Foreign Assets](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-1.webp)

## The ERC-20 Solidity Interface {: #the-erc20-interface }

The [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank} interface on Tanssi EVM appchains follows the [EIP-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20){target=\_blank}, which is the standard API interface for tokens within smart contracts. The standard defines the required functions and events a token contract must implement to be interoperable with different applications.

??? code "ERC20.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/erc20/erc20.sol'
    ```

!!! note
    The foreign assets ERC-20 precompile does not include `deposit` and `withdraw` functions and subsequent events expected from a wrapped token contract, such as WETH.

## Interact with the Solidity Interface {: #interact-with-the-solidity-interface }

### Add Token to MetaMask {: #add-token-to-metamask }

If you want to interact with your appchain's registered foreign assets like you would with an ERC-20 in MetaMask, you can add them to your wallet using the precompile address prefix and the asset ID.

To get started, open up MetaMask and make sure you are [connected to your appchain](/builders/toolkit/ethereum-api/wallets/metamask/) and:

1. Switch to the **Tokens** tab
2. Click on **Import tokens**

    ![Import Tokens from Tokens Tab in MetaMask](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-2.webp)

Before continuing, you'll need the token's address, which, considering that in this example the foreign asset has an ID of `1`, will be:

```text
{{networks.dancebox.precompiles.foreign_assets_erc20_example}}
```

1. Enter the precompile address for the token contract address. When you enter the address, the **Token Symbol** and **Token Decimal** fields should automatically populate. If they do not, you can enter `UNIT` for the symbol and `12` for the decimal places.
2. Click **Next**

![Add Foreign Asset](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-3.webp)

MetaMask will prompt you to confirm the import. You can review the token details and click **Import Tokens** to import UNIT tokens into your wallet.

![Confirm and Import Tokens](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-4.webp)

And that's it! You've successfully added the UNIT token foreign asset as a custom ERC-20 token on the Tanssi demo EVM appchain.

### Remix Set Up {: #remix-set-up }

You can interact with the foreign assets ERC-20 precompile using [Remix](https://remix.ethereum.org){target=\_blank}. To add the precompile to Remix, you will need to:

1. Get a copy of [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank}
2. Paste the file contents into a Remix file named `IERC20.sol`

### Compile the Contract {: #compile-the-contract }

Next, you will need to compile the interface in Remix:

1. Click on the **Compile** tab, second from top
2. Compile the interface by clicking on **Compile IERC20.sol**

![Compiling IERC20.sol](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-5.webp)

When compilation is completed, you will see a green checkmark next to the **Compile** tab.

### Access the Contract {: #access-the-contract }

Instead of deploying the smart contract, you will access the interface through the address of foreign asset precompile:

1. Click on the **Deploy and Run** tab directly below the **Compile** tab in Remix. Please note that the precompiled contracts are already accessible at their respective addresses. Therefore, there is no deployment step
2. Make sure **Injected Web3** is selected in the **ENVIRONMENT** dropdown. Once you select **Injected Web3**, you may be prompted by MetaMask to connect your account to Remix if it's not already connected
3. Make sure the correct account is displayed under **ACCOUNT**
4. Ensure **IERC20 - IERC20.sol** is selected in the **CONTRACT** dropdown. Given that it is a precompiled contract, there is no deployment step. Instead, you are going to provide the address of the precompile in the **At Address** field
5. Provide the address of the ERC-20 precompile (which is `{{networks.dancebox.precompiles.foreign_assets_erc20_example}}` in this example) and click **At Address**
6. The **IERC20** precompile will appear in the list of **Deployed Contracts**.

![Access the address](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-6.webp)

### Get Basic Token Information {: #get-basic-token-information }

The ERC-20 interface lets you quickly obtain token information, including the token's total supply, name, symbol, and decimal places. You can retrieve this information by following these steps:

1. Expand the **IERC20** contract under **Deployed Contracts**
2. Click **decimals** to get the decimal places of your appchain's native protocol token
3. Click **name** to get the name of the token
4. Click **symbol** to get the symbol of the token
5. Click **totalSupply** to obtain the total supply of native tokens on your appchain

![Get basic token information](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-7.webp)

The results of each function call are displayed under the respective functions.

### Get Account Balance {: #get-account-balance }

You can check the balance of any address on your appchain by calling the `balanceOf` function and passing in an address:

1. Expand the **balanceOf** function
2. Enter an address you would like to check the balance of for the **owner**
2. Click **call**

![Get Balance of an Account](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-8.webp)

Your balance will be displayed under the `balanceOf` function.

### Approve a Spend {: #approve-a-spend }

To approve a token spend allowance, you'll need to provide an address for the spender and the number of tokens the spender is allowed to spend. The spender can be an externally owned account (EOA) or a smart contract. For this example, you can approve the spender with an allowance of 1 UNIT token. To get started, please follow these steps:

1. Expand the **approve** function
2. Enter the address of the spender. You should have created two accounts before starting, so you can use the second account as the spender
3. Enter the amount of tokens the spender can spend for the **value**. For this example, you can allow the spender to spend 1 UNIT token (`1000000000000`)
4. Click **transact**
5. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-9.webp)

After the transaction is confirmed, you'll notice that the balance of your account has stayed the same. This is because you have only approved the allowance for the given amount, and the spender hasn't spent the funds. In the next section, you will use the `allowance` function to verify that the spender can spend 1 UNIT token on your behalf.

### Get Allowance of Spender {: #get-allowance-of-spender }

To check that the spender received the allowance approved in the [Approve a Spend](#approve-a-spend) section, you can:

1. Expand the **allowance** function
2. Enter your address for the **owner**
3. Enter the address of the **spender** that you used in the previous section
4. Click **call**

![Get Allowance of Spender](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-10.webp)

Once the call is complete, the allowance of the spender will be displayed, which should be equivalent to 1 UNIT token (`1000000000000`).

### Send Transfer {: #send-transfer }

To send tokens from your account directly to another account, you can call the `transfer` function by following these steps:

1. Expand the **transfer** function
2. Enter the address to send UNIT tokens to
3. Enter the amount of UNIT tokens to send. For this example, you can send 1 UNIT token (`1000000000000`)
4. Click **transact**
5. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Send Standard Transfer](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-11.webp)

Once the transaction is complete, you can [check your balance](#get-account-balance) using the `balanceOf` function or by looking at MetaMask. You'll notice that your balance has decreased by 1 UNIT token. You can also use the `balanceOf` function to ensure that the recipients balance has increased by 1 UNIT token as expected.

### Send Transfer From Specific Account {: #send-transferfrom }

So far, you have approved an allowance of 1 UNIT token for the spender and sent 1 UNIT token via the standard `transfer` function. The `transferFrom` function varies from the standard `transfer` function as it allows you to define the address to which you want to send the tokens. So you can specify an address with an allowance or your address as long as you have funds. For this example, you will use the spender's account to initiate a transfer of the allowed funds from the owner to the spender. The spender can send the funds to any account, but you can send the funds from the owner to the spender for this example.

First, you need to switch to the spender's account in MetaMask. Once you switch to the spender's account, you'll notice that the selected address in Remix under the **Accounts** tab is now the spender's.

![Switch accounts Remix](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-12.webp)

Next, you can initiate and send the transfer. To do so, take the following steps:

1. Expand the **transferFrom** function
2. Enter your address as the owner in the **from** field
3. Enter the recipient address, which should be the spender's address, in the **to** field
4. Enter the amount of UNIT tokens to send. Again, the spender is currently only allowed to send 1 UNIT token, so enter `1000000000000`
5. Click **transact**

![Send Standard Transfer](/images/builders/toolkit/ethereum-api/precompiles/foreign-assets-erc20/foreign-assets-erc20-13.webp)

Once the transaction is complete, you can [check the balance](#get-account-balance) of the owner and spender using the `balanceOf` function. The spender's balance should have increased by 1 UNIT token, and their allowance should now be depleted. To verify that the spender no longer has an allowance, you can call the `allowance` function by passing in the owner and spender's addresses. You should receive a result of 0.

And that's it! You've successfully interacted with the foreign assets ERC-20 precompile using MetaMask and Remix!

--8<-- 'text/_disclaimers/third-party-content.md'