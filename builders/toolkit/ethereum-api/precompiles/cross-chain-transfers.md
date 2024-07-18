---
title: Native Cross-Chain Token Transfers
description: Learn how to use the XCM interface Precompile to transfer tokens from any Tanssi EVM appchain, leveraging their inherent native cross-chain capabilities.
---

# Native Cross-Chain Token Transfers

## Introduction {: #introduction }

As presented in the [Native Cross-Chain Communication](/learn/framework/xcm/){target=\_blank} article from the Learn section, Tanssi appchains benefit from an inherent capability to communicate and interoperate with any other appchain in the ecosystem. This native cross-chain communication allows safe and fast token transfers leveraging the Cross-Consensus Message format (XCM for short), which facilitates communication between different consensus systems.

The communication protocol enabling token transfers is built on [Substrate](/learn/framework/overview/#substrate-framework){target=\_blank} and runs on a lower level than the EVM, making it harder to access for EVM developers.

This precompile fills the gap between execution layers, exposing a smart contract that abstracts away the underlying complexities, making the execution of cross-chain token transfers as easy as any other smart contract call.

This guide will show you how to interact with the [XCM interface](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/XcmInterface.sol){target=\_blank} precompile to execute cross-chain token transfers.

The precompile is located at the following address:

```text
{{networks.dancebox.precompiles.xcmInterface }}
```

Keep in mind that it is still necessary to have previously established communication channels with the destination chain before starting to use this precompile's functionality. To do so, refer to the 
[Manage Cross-Chain Communication Channels](/builders/manage/dapp/xcm-channels/){target=\_blank} guide.

--8<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'

## The XCM Solidity Interface {: #the-xcm-solidity-interface }

The [`XCMInterface.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/XcmInterface.sol){target=\_blank} interface on Tanssi EVM appchains is a Solidity interface that allows developers to interact with the precompile's functions.

??? code "XcmInterface.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/xcm-interface/XcmInterface.sol'
    ```

The interface includes the necessary data structures along with the following functions:

???+ function "**transferAssetsLocation**(*Location memory* dest, *Location memory* beneficiary, *AssetLocationInfo[] memory* assets, *uint32* feeAssetItem, *Weight memory* weight) — sends assets using the underlying transfer_assets() transaction included in the module called pallet-xcm"

    === "Parameters"

        - `dest` - the destination chain
        - `beneficiary` - the account in the destination chain that will receive the tokens
        - `assets` - an array of assets to send
        - `feeAssetItem` - the index of the asset that will be used to pay fees
        - `weight` - the maximum gas to use in the whole operation. Setting uint64::MAX to `refTime` acts in practice as *unlimited weight*

??? function "**transferAssetsToPara20**(*uint32* paraId, *address* beneficiary, *AssetAddressInfo[] memory* assets, *uint32* feeAssetItem, *Weight memory* weight) — sends assets to another EVM-compatible appchain using the underlying transfer_assets() transaction included in the module called pallet-xcm"

    === "Parameters"

        - `paraId` - the destination's appchain ID
        - `beneficiary` - the ECDSA-type account in the destination chain that will receive the tokens
        - `assets` - an array of assets to send
        - `feeAssetItem` - the index of the asset that will be used to pay fees
        - `weight` - the maximum gas to use in the whole operation. Setting uint64::MAX to `refTime` acts in practice as *unlimited weight*

??? function "**transferAssetsToPara32**(*uint32* paraId, *bytes32* beneficiary, *AssetAddressInfo[] memory* assets, *uint32* feeAssetItem, *Weight memory* weight) — sends assets to a Substrate appchain using the underlying transfer_assets() transaction included in the module called pallet-xcm"

    === "Parameters"

        - `paraId` - the destination's appchain ID
        - `beneficiary` - the Substrate's sr25519-type account in the destination chain that will receive the tokens
        - `assets` - an array of assets to send
        - `feeAssetItem` - the index of the asset that will be used to pay fees
        - `weight` - the maximum gas to use in the whole operation. Setting uint64::MAX to `refTime` acts in practice as *unlimited weight*

??? function "**transferAssetsToRelay**(*bytes32* beneficiary, *AssetAddressInfo[] memory* assets, *uint32* feeAssetItem, *Weight memory* weight) — sends assets to the relay chain using the underlying transfer_assets() transaction included in the module called pallet-xcm"

    === "Parameters"

        - `beneficiary` - the Substrate's sr25519-type account in the relay chain that will receive the tokens
        - `assets` - an array of assets to send
        - `feeAssetItem` - the index of the asset that will be used to pay fees
        - `weight` - the maximum gas to use in the whole operation. Setting uint64::MAX to `refTime` acts in practice as *unlimited weight*

## Interact with the Solidity Interface {: #interact-with-the-solidity-interface }

### Checking Prerequisites {: #checking-prerequisites }

To follow along with this tutorial, you will need to have your wallet configured to work with your EVM appchain and an account funded with native tokens. You can add your EVM appchain to MetaMask with one click on the [Tanssi dApp](https://apps.tanssi.network){target=\_blank}. Or, you can [configure MetaMask for Tanssi with the demo EVM appchain](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

### Remix Set Up {: #remix-set-up }

You can interact with the XCM interface precompile using [Remix](https://remix.ethereum.org){target=\_blank}. To add the precompile to Remix, you will need to:

1. Get a copy of [`XcmInterface.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/XcmInterface.sol){target=\_blank}
2. Paste the file contents into a Remix file named `XcmInterface.sol`

### Compile the Contract {: #compile-the-contract }

Next, you will need to compile the interface in Remix:

1. Click on the **Compile** tab, second from top
2. Compile the interface by clicking on **Compile XcmInterface.sol**

![Compiling XcmInterface.sol](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-1.webp)

When the compilation is completed, you will see a green checkmark next to the **Compile** tab.

### Access the Contract {: #access-the-contract }

Instead of deploying the precompile, you will access the interface given the address of the precompiled contract:

1. Click on the **Deploy and Run** tab directly below the **Compile** tab in Remix. Please note that the precompiled contracts are already accessible at their respective addresses. Therefore, there is no deployment step
2. Make sure **Injected Provider - Metamask** is selected in the **ENVIRONMENT** dropdown. Once you select **Injected Provider - Metamask**, you may be prompted by MetaMask to connect your account to Remix if it's not already connected
3. Make sure the correct account is displayed under **ACCOUNT**
4. Ensure **XCM - XcmInterface.sol** is selected in the **CONTRACT** dropdown. Given that it is a precompiled contract, there is no deployment step. Instead, you are going to provide the address of the precompile in the **At Address** field
5. Provide the address of the precompile: `{{networks.dancebox.precompiles.xcmInterface}}` and click **At Address**

![Access the address](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-2.webp)

The **XCM Interface** precompile will appear in the list of **Deployed Contracts**.

### Get Basic Token Information {: #get-basic-token-information }

The ERC-20 interface lets you quickly obtain token information, including the token's total supply, name, symbol, and decimal places. You can retrieve this information by following these steps:

1. Expand the **IERC20** contract under **Deployed Contracts**
2. Click **decimals** to get the decimal places of your appchain's native protocol token
3. Click **name** to get the name of the token
4. Click **symbol** to get the symbol of the token
5. Click **totalSupply** to obtain the total supply of native tokens on your appchain

![Total Supply](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-6.webp)

The results of each function call are displayed under the respective functions.

### Get Account Balance {: #get-account-balance }

You can check the balance of any address on your appchain by calling the `balanceOf` function and passing in an address:

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