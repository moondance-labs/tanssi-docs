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

You will also need to have an open communication channel with the destination chain and, if the token being transferred is native to your appchain, the destination chain will need to have registered the foreign asset.

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

### Send Tokens Over to Another EVM-compatible Appchain {: #sent-to-evm-chains }

To send tokens over to an account in another EVM-compatible appchain, please follow these steps:

1. Expand the **transferAssetsToPara20** function
2. Enter the appchain ID (paraId)
3. Enter the ECDSA destination account (beneficiary)
4. Specify the tokens to be transferred. Note that this parameter is an array that contains at least one asset. Each asset is specified by its address and the total amount to transfer
5. Enter the index of the asset that will be used to pay the fees. This index is zero-based, so the first element defined in the fourth step is `0`, the second is `1`, and so on 
2. Enter the maximum gas to pay for the transaction. This gas is derived from two parameters, the processing time (refTime) and the proof size (proofSize). In practice, setting refTime to `uint64::MAX` is equal to *unlimited weight*
4. Click **transact**
5. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-3.webp)

After the transaction is confirmed, wait for a few blocks for the transfer to reach the destination chain and reflect the new balance.


--8<-- 'text/_disclaimers/third-party-content.md'