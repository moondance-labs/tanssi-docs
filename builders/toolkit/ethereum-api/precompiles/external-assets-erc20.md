---
title: External Assets as ERC-20
description: Learn how to access and interact with an ERC-20 representation of any external assets on Tanssi EVM networks through the precompiled ERC-20 Interface.
keywords: solidity, ethereum, native, token, moonbeam, precompiled, contracts, assets, erc20
categories: EVM-Template
---

# External Assets as ERC-20

## Introduction {: #introduction }

As presented in the [Native Cross-Chain Communication](/learn/framework/xcm/){target=\_blank} article, networks deployed through Tanssi can communicate and interoperate with any other network in the ecosystem. This multi-chain environment leads to a multi-asset world, where seamless transfer of assets, data, and value across different networks widens the possibilities to build use cases across diverse industries such as finance (DeFi), real-world assets (RWAs), and others.

External assets are tokens native to another blockchain, or, in other words, assets whose reserve chain is not the chain you are interacting with. Tanssi networks can register external assets to enable their inflow. To do so, it is necessary to [establish an XCM channel](/learn/framework/xcm/#channel-registration){target=\_blank} with the other chain and then register one of its native assets as an external asset. Registered external assets behave, to some extent, the same way as local ones.

The [ERC-20 assets precompile](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20Instance.sol){target=\_blank} allows networks based on the [Tanssi EVM template](/builders/build/templates/evm/){target=\_blank} to access any registered external asset through the standard ERC-20 interface. Consequently, smart contracts deployed to the network can interact with such assets as they would with any other regular ERC-20.

The address representing the ERC-20 contract is formed with the first thirty-six positions (eighteen bytes) set to the maximum value and the last four positions (two bytes) replaced with the hexadecimal representation of the registered asset identifier:

```text
{{networks.demo_evm.precompiles.external_assets_erc20}}
```

For example, for the asset whose ID is `1`, the last four positions must be replaced with `0001`, and for an asset with an ID of `10`, those four positions must be replaced with `000A`.

--8<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'

## Prerequisites {: #prerequisites }

 Tto follow along with the contents in this guide, you'll need:
 
- Access to a Tanssi EVM network running [runtime 500](https://github.com/moondance-labs/tanssi/releases/tag/runtime-500){target=\_blank} or above
- An established bidirectional XCM channel to another chain. To manage your network's channels, refer to the [Manage Cross-Chain Communication Channels](/builders/manage/dapp/xcm-channels/){target=\_blank} article
- A registered external asset. Once the XCM channels are open, asset registration can be easily done using the [dApp](https://apps.tanssi.network/){target=\_blank} as explained in the [Register External Assets](/builders/manage/dapp/register-external-assets/){target=\_blank} guide
- Finally, you'll need an [EVM-compatible wallet](/builders/toolkit/ethereum-api/wallets/){target=\_blank} configured to work with your network. You can also connect your wallet to the [demo EVM network](https://apps.tanssi.network/demo){target=\_blank}.

The examples in this guide are based on the Tanssi demo EVM network, which already has open channels to other networks and registered external assets, as the following picture shows:

1. The registered external asset (UNIT) which will be used in the following sections
2. Other available external assets not yet registered

![Tanssi EVM demo network registered external Assets](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-1.webp)

## The ERC-20 Solidity Interface {: #the-erc20-interface }

The [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank} interface on Tanssi EVM networks follows the [EIP-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20){target=\_blank}, which is the standard API interface for tokens within smart contracts. The standard defines the required functions and events a token contract must implement to be interoperable with different applications.

??? code "ERC20.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/erc20/erc20.sol'
    ```

!!! note
    The external assets ERC-20 precompile does not include `deposit` and `withdraw` functions and subsequent events expected from a wrapped token contract, such as WETH.

## Add Token to an EVM Wallet {: #add-token-to-evm-wallet }

If you want to interact with your network's registered external assets like you would with an ERC-20, you can add them to your wallet using the precompile address prefix and the asset ID. This section will walk you through adding an external asset to [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

To get started, open up MetaMask and make sure you are connected to your network and:

1. Switch to the **Tokens** tab
2. Click on **Import tokens**

    ![Import Tokens from Tokens Tab in MetaMask](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-2.webp)

Before continuing, you'll need the token's address, which, considering that in this example the external asset has an ID of `1`, will be:

```text
{{networks.demo_evm.precompiles.external_assets_erc20_example}}
```

1. Enter the precompile address for the token contract address. When you enter the address, the **Token Symbol** and **Token Decimal** fields should automatically populate. If they do not, you can enter `UNIT` for the symbol and `12` for the decimal places
2. Click **Next**

![Add External Asset](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-3.webp)

MetaMask will prompt you to confirm the import. You can review the token details and click **Import Tokens** to import UNIT tokens into your wallet.

![Confirm and Import Tokens](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-4.webp)

And that's it! You've successfully added the UNIT token external asset as a custom ERC-20 token on the Tanssi demo EVM network.

## Interact with the Solidity Interface via Remix {: #interact-with-the-solidity-interface-via-remix }

### Remix Set Up {: #remix-set-up }

You can interact with the external assets ERC-20 precompile using [Remix](https://remix.ethereum.org){target=\_blank}. To add the precompile to Remix, you will need to:

1. Get a copy of [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank}
2. Paste the file contents into a Remix file named `IERC20.sol`

### Compile the Contract {: #compile-the-contract }

Next, you will need to compile the interface in Remix:

1. Click on the **Compile** tab, second from top
2. Compile the interface by clicking on **Compile IERC20.sol**

![Compiling IERC20.sol](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-5.webp)

When compilation is completed, you will see a green checkmark next to the **Compile** tab.

### Access the Contract {: #access-the-contract }

Instead of deploying the smart contract, you will access the interface through the address of external asset precompile:

1. Click on the **Deploy and Run** tab directly below the **Compile** tab in Remix. Please note that the precompiled contracts are already accessible at their respective addresses. Therefore, there is no deployment step
2. Make sure **Injected Web3** is selected in the **ENVIRONMENT** dropdown. Once you select **Injected Web3**, you may be prompted by MetaMask to connect your account to Remix if it's not already connected
3. Make sure the correct account is displayed under **ACCOUNT**
4. Ensure **IERC20 - IERC20.sol** is selected in the **CONTRACT** dropdown. Given that it is a precompiled contract, there is no deployment step. Instead, you are going to provide the address of the precompile in the **At Address** field
5. Provide the address of the ERC-20 precompile (which is `{{networks.demo_evm.precompiles.external_assets_erc20_example}}` in this example) and click **At Address**
6. The **IERC20** precompile will appear in the list of **Deployed Contracts**

![Access the address](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-6.webp)

### Get Basic Token Information {: #get-basic-token-information }

The ERC-20 interface lets you quickly obtain token information, including the token's total supply, name, symbol, and decimal places. You can retrieve this information by following these steps:

1. Expand the **IERC20** contract under **Deployed Contracts**
2. Click **decimals** to get the decimal places of your network's native protocol token
3. Click **name** to get the name of the token
4. Click **symbol** to get the symbol of the token
5. Click **totalSupply** to obtain the total supply of native tokens on your network

![Get basic token information](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-7.webp)

The results of each function call are displayed under the respective functions.

### Get Account Balance {: #get-account-balance }

You can check the balance of any address on your network by calling the `balanceOf` function and passing in an address:

1. Expand the **balanceOf** function
2. Enter an address you would like to check the balance of for the **owner**
2. Click **call**

![Get Balance of an Account](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-8.webp)

Your balance will be displayed under the `balanceOf` function.

### Send Transfer {: #send-transfer }

To send tokens from your account directly to another account, you can call the `transfer` function by following these steps:

1. Expand the **transfer** function
2. Enter the address to send UNIT tokens to
3. Enter the amount of UNIT tokens to send. For this example, you can send 1 UNIT token (`1000000000000`)
4. Click **transact**
5. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Send Standard Transfer](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-9.webp)

Once the transaction is complete, you can [check your balance](#get-account-balance) using the `balanceOf` function or by looking at MetaMask. You'll notice that your balance has decreased by 1 UNIT token. You can also use the `balanceOf` function to ensure that the recipients balance has increased by 1 UNIT token as expected.

And that's it! You've successfully interacted with the external assets ERC-20 precompile using MetaMask and Remix!

--8<-- 'text/_disclaimers/third-party-content.md'