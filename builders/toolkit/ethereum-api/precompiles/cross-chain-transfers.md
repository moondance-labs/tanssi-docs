---
title: Native Cross-Chain Token Transfers
description: Learn how to use the XCM interface precompile to transfer tokens from any Tanssi-powered EVM network, leveraging their inherent native cross-chain capabilities.
categories: EVM-Template
---

# Native Cross-Chain Token Transfers

## Introduction {: #introduction }

As presented in the [Native Cross-Chain Communication](/learn/framework/xcm/){target=\_blank} article from the Learn section, Tanssi-powered networks benefit from an inherent capability to communicate and interoperate with any other network in the ecosystem. This native cross-chain communication allows safe and fast token transfers leveraging the Cross-Consensus Message format (XCM for short), which facilitates communication between different consensus systems.

The communication protocol enabling token transfers is built on [Substrate](/learn/framework/overview/#substrate-framework){target=\_blank} and runs on a lower level than the EVM, making it harder for EVM developers to access.

Nevertheless, EVM networks have an XCM precompile that fills the gap between execution layers, exposing a smart contract interface that abstracts away the underlying complexities, making the execution of cross-chain token transfers as easy as any other smart contract call.

This guide will show you how to interact with the [XCM Interface](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/XcmInterface.sol){target=\_blank} precompile to execute cross-chain token transfers through the Ethereum API.

The XCM precompile is located at the following address:

```text
{{networks.demo_evm.precompiles.xcm_interface }}
```

--8<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'

## The XCM Solidity Interface {: #the-xcm-solidity-interface }

The [`XCMInterface.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/XcmInterface.sol){target=\_blank} interface on Tanssi EVM networks is a Solidity interface that allows developers to interact with the precompile's functions.

??? code "XCMInterface.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/xcm-interface/XcmInterface.sol'
    ```

The interface includes the necessary data structures along with the following functions:

???+ function "**transferAssetsToPara20**(_paraId, beneficiary, assets, feeAssetItem, weight_) — sends assets to another EVM-compatible network using the underlying `transfer_assets()` transaction included in the XCM pallet module"

    === "Parameters"

        - `paraId` ++"uint32"++ - the destination's network ID
        - `beneficiary` ++"address"++ - the ECDSA-type account in the destination chain that will receive the tokens
        - `assets` ++"AssetAddressInfo[] memory"++ - an array of assets to send
        - `feeAssetItem` ++"uint32"++ - the index of the asset that will be used to pay fees
        - `weight` ++"Weight memory"++- the maximum gas to use in the whole operation. Setting uint64::MAX to `refTime` acts in practice as *unlimited weight*

    === "Example"

        - `paraId` - 888
        - `beneficiary` - 0x3f0Aef9Bd799F1291b80376aD57530D353ab0217
        - `assets` - [["0x0000000000000000000000000000000000000800", 1000000000000000000]]
        - `feeAssetItem` - 0
        - `weight` - [9223372036854775807, 9223372036854775807]

??? function "**transferAssetsToPara32**(_paraId, beneficiary, assets,feeAssetItem, weight_) — sends assets to a Substrate network using the underlying `transfer_assets()` transaction included in the XCM pallet module"

    === "Parameters"

        - `paraId` ++"uint32"++ - the destination's network ID
        - `beneficiary` ++"bytes32"++ - the Substrate's SR25519-type account in the destination chain that will receive the tokens
        - `assets` ++"AssetAddressInfo[] memory"++ - an array of assets to send
        - `feeAssetItem` ++"uint32"++ - the index of the asset that will be used to pay fees
        - `weight` ++"Weight memory"++ - the maximum gas to use in the whole operation. Setting uint64::MAX to `refTime` acts in practice as *unlimited weight*

    === "Example"

        - `paraId` - 888
        - `beneficiary` - 0xf831d83025f527daeed39a644d64d335a4e627b5f4becc78fb67f05976889a06
        - `assets` - [["0x0000000000000000000000000000000000000800", 1000000000000000000]]
        - `feeAssetItem` - 0
        - `weight` - [9223372036854775807, 9223372036854775807]

??? function "**transferAssetsToRelay**(_beneficiary, assets, feeAssetItem, weight_) — sends assets to the relay chain using the underlying `transfer_assets()` transaction included in the XCM pallet module"

    === "Parameters"

        - `beneficiary` ++"bytes32"++ - the Substrate's sr25519-type account in the relay chain that will receive the tokens
        - `assets` ++"AssetAddressInfo[] memory"++ - an array of assets to send
        - `feeAssetItem` ++"uint32"++ - the index of the asset that will be used to pay fees
        - `weight` ++"Weight memory"++ - the maximum gas to use in the whole operation. Setting uint64::MAX to `refTime` acts in practice as *unlimited weight*

    === "Example"

        - `beneficiary` - 0xf831d83025f527daeed39a644d64d335a4e627b5f4becc78fb67f05976889a06
        - `assets` - [["0x0000000000000000000000000000000000000800", 1000000000000000000]]
        - `feeAssetItem` - 0
        - `weight` - [9223372036854775807, 9223372036854775807]

??? function "**transferAssetsLocation**(_dest, beneficiary, assets, feeAssetItem, weight_) — sends assets using the underlying `transfer_assets()` transaction included in the XCM pallet module"

    === "Parameters"
        - `dest` ++"Location memory"++ - the destination chain
        - `beneficiary` ++"Location memory"++ - the account in the destination chain that will receive the tokens
        - `assets` ++"AssetLocationInfo[] memory"++ - an array of assets to send
        - `feeAssetItem` ++"uint32"++ - the index of the asset that will be used to pay fees
        - `weight` ++"Weight memory"++ - the maximum gas to use in the whole operation. Setting uint64::MAX to `refTime` acts in practice as *unlimited weight*

    === "Example"
        - `dest` - ["1",[]]
        - `beneficiary` - [0, ["0x01f831d83025f527daeed39a644d64d335a4e627b5f4becc78fb67f05976889a0600"]]
        - `assets` - [[[1, ["0x010000000000000000000000000000000000000800"]], 1000000000000000000]]
        - `feeAssetItem` - 0
        - `weight` - [9223372036854775807, 9223372036854775807]
    
## Interact with the Solidity Interface {: #interact-with-the-solidity-interface }

### Checking Prerequisites {: #checking-prerequisites }

To follow along with this tutorial, you will need to have your wallet configured to work with your EVM network and an account funded with native tokens. You can add your EVM network to MetaMask with one click on the [Tanssi dApp](https://apps.tanssi.network){target=\_blank}. Or, you can [configure MetaMask for Tanssi with the demo EVM network](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

!!! note
    It is necessary to have previously established communication channels with the destination chain before using this precompile's functionality. To do so, refer to the [Manage Cross-Chain Communication Channels](/builders/manage/dapp/xcm-channels/){target=\_blank} guide.
    Also, if the token being transferred is native to your network, the destination chain must have registered the foreign asset.

### Remix Set Up {: #remix-set-up }

You can interact with the XCM Interface precompile using [Remix](https://remix.ethereum.org){target=\_blank}. To add the precompile to Remix, you will need to:

1. Get a copy of [`XCMInterface.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/XcmInterface.sol){target=\_blank}
2. Paste the file contents into a Remix file named `XcmInterface.sol`

### Compile the Contract {: #compile-the-contract }

Next, you will need to compile the interface in Remix:

1. Click on the **Compile** tab, second from top
2. Compile the interface by clicking on **Compile XCMInterface.sol**

![Compiling XcmInterface.sol](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-1.webp)

When the compilation is completed, you will see a green checkmark next to the **Compile** tab.

### Access the Contract {: #access-the-contract }

Instead of deploying the precompile, you will access the interface given the address of the precompiled contract:

1. Click on the **Deploy and Run** tab directly below the **Compile** tab in Remix. Please note that the precompiled contracts are already accessible at their respective addresses. Therefore, there is no deployment step
2. Make sure **Injected Provider - Metamask** is selected in the **ENVIRONMENT** dropdown. Once you select **Injected Provider - Metamask**, you may be prompted by MetaMask to connect your account to Remix if it's not already connected
3. Make sure the correct account is displayed under **ACCOUNT**
4. Ensure **XCM - XCMInterface.sol** is selected in the **CONTRACT** dropdown. Given that it is a precompiled contract, there is no deployment step. Instead, you are going to provide the address of the precompile in the **At Address** field
5. Provide the address of the precompile: `{{networks.demo_evm.precompiles.xcm_interface}}` and click **At Address**

![Access the address](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-2.webp)

The **XCM Interface** precompile will appear in the list of **Deployed Contracts**.

### Send Tokens Over to Another EVM-Compatible Network {: #transfer-to-evm-chains }

To send tokens over to an account in another EVM-compatible network, please follow these steps:

1. Expand the **transferAssetsToPara20** function
2. Enter the network ID (paraId)
3. Enter the 20-bytes (Ethereum-like) destination account (beneficiary)
4. Specify the tokens to be transferred. Note that this parameter is an array that contains at least one asset. Each asset is specified by its address and the total amount to transfer

    --8<-- 'text/builders/toolkit/ethereum-api/precompiles/xcm-interface/erc-20-note.md'

5. Enter the index of the asset that will be used to pay the fees. This index is zero-based, so the first element is `0`, the second is `1`, and so on 
6. Enter the maximum gas to pay for the transaction. This gas is derived from two parameters, the processing time (`refTime`) and the proof size (`proofSize`). In practice, setting refTime to `uint64::MAX` is equal to *unlimited weight*
7. Click **transact**
8. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-3.webp)

After the transaction is confirmed, wait for a few blocks for the transfer to reach the destination chain and reflect the new balance.

### Send Tokens Over to a Substrate Network {: #transfer-to-substrate-chains }

To send tokens over to an account in a Substrate network, please follow these steps:

1. Expand the **transferAssetsToPara32** function
2. Enter the network ID (`paraId`)
3. Enter the sr25519-type destination account (beneficiary)
4. Specify the tokens to be transferred. Note that this parameter is an array that contains at least one asset. Each asset is specified by its address and the total amount to transfer
    
    --8<-- 'text/builders/toolkit/ethereum-api/precompiles/xcm-interface/erc-20-note.md'

5. Enter the index of the asset that will be used to pay the fees. This index is zero-based, so the first element is `0`, the second is `1`, and so on 
6. Enter the maximum gas to pay for the transaction. This gas is derived from two parameters, the processing time (refTime) and the proof size (proofSize). In practice, setting refTime to `uint64::MAX` is equal to *unlimited weight*
7. Click **transact**
8. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-4.webp)

After the transaction is confirmed, wait for a few blocks for the transfer to reach the destination chain and reflect the new balance.

### Send Tokens Over to the Relay Chain {: #transfer-to-relay-chain }

To send tokens over to an account in the relay chain, please follow these steps:

1. Expand the **transferAssetsToRelay** function
2. Enter the sr25519-type destination account (beneficiary)
3. Specify the tokens to be transferred. Note that this parameter is an array that contains at least one asset. Each asset is specified by its address and the total amount to transfer
    
    --8<-- 'text/builders/toolkit/ethereum-api/precompiles/xcm-interface/erc-20-note.md'

4. Enter the index of the asset that will be used to pay the fees. This index is zero-based, so the first element is `0`, the second is `1`, and so on 
5. Enter the maximum gas to pay for the transaction. This gas is derived from two parameters, the processing time (refTime) and the proof size (proofSize). In practice, setting refTime to `uint64::MAX` is equal to *unlimited weight*
6. Click **transact**
7. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-5.webp)

After the transaction is confirmed, wait for a few blocks for the transfer to reach the destination chain and reflect the new balance.

### Send Tokens Over Specific Locations {: #transfer-locations }

This function is more generic than the others, allowing the destination chain, destination account, and assets to be specified using [XCM Multilocations](/learn/framework/xcm/#message-destinations){target=\_blank}.
To send tokens to specific locations, please follow these steps:

1. Expand the **transferAssetsLocation** function
2. Enter the multilocation that specifies the destination chain. Note that any chain can be specified, regardless of its configuration or type
3. Enter the Multilocation that specifies the destination account. Note that any account can be specified, regardless of its type (ECDSA, sr25519, or any other)
4. Specify the tokens to be transferred. Note that this parameter is an array that contains at least one asset and each asset is specified by its Multilocation and the total amount to transfer
    
    --8<-- 'text/builders/toolkit/ethereum-api/precompiles/xcm-interface/erc-20-note.md'

5. Enter the index of the asset that will be used to pay the fees. This index is zero-based, so the first element is `0`, the second is `1`, and so on 
6. Enter the maximum gas to pay for the transaction. This gas is derived from two parameters, the processing time (refTime) and the proof size (proofSize). In practice, setting refTime to `uint64::MAX` is equal to *unlimited weight*
7. Click **transact**
8. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-6.webp)

After the transaction is confirmed, wait for a few blocks for the transfer to reach the destination chain and reflect the new balance.

--8<-- 'text/_disclaimers/third-party-content.md'