---
title: Deploy Your ContainerChain via the DApp
description: Learn how to spin up and deploy an Appchain on Tanssi in minutes using the Tanssi dApp, a no-code solution for onboarding into the Polkadot ecosystem.
---

# Deploy your ContainerChain via the Tanssi DApp

## Introduction {: #introduction }

Tanssi aims to lower the barrier to entry for building within the Polkadot ecosystem by streamlining the onboarding process and abstracting away the technical details of launching an Appchain. The Tanssi dApp facilitates this process, allowing you to spin up an Appchain and deploy it as a ContainerChain through Tanssi in minutes.

This guide will walk you through the steps required to launch an Appchain on Tanssi's TestNet, Dancebox, via the Tanssi dApp.

## Overview {: #overview }

Deploying an Appchain via the Tanssi dApp is accomplished as a single, streamlined flow consisting of five distinct steps:

1. Verify you have the minimum required balances in both Tanssi and the relay chain to launch a new Appchain
2. Select a [template](/builders/build/templates/overview){target=_blank} and configure it
3. Reserve your Appchain ID on the relay chain
4. Generate your Appchain files based on the template you selected and your Appchain ID
5. Register your Appchain on Tanssi and the relay chain

![A diagram mapping out the steps for deploying an Appchain with the Tanssi dApp.](/images/builders/deploy-manage/dapp/deploy/deploy-1.png)

For [Dancebox](/builders/tanssi-network/networks/dancebox){target=_blank}, the Tanssi team will manually complete verification, and once verified, the launch process will begin. For Tanssi, the process will be fully decentralized and permissionless.

## Supported Wallets {: #supported-wallets }

Since Tanssi is built with Substrate, you'll need to use a Substrate-supported wallet to deploy and manage your ContainerChain. Supported wallets include:

- [Polkadot.js extension](https://polkadot.js.org/extension/){target=_blank}
- [SubWallet](https://www.subwallet.app/){target=_blank}
- [Talisman](https://www.talisman.xyz/){target=_blank}

Please note that if you deploy an EVM ContainerChain, your users won't need to use a Substrate wallet. They will be able to interact with your ContainerChain using Ethereum-compatible wallets like [MetaMask](/builders/interact/ethereum-api/wallets/metamask){target=_blank}.

### Connect Your Wallet to the DApp {: #connect-wallet }

Upon navigating to the [Tanssi dApp](https://apps.tanssi.network/dancebox), you'll be required to connect your wallet. Depending on the wallet you're using, your wallet may pop up when first navigating to the Tanssi dApp. If so, feel free to follow the prompt, select the accounts you want to interact with, and connect your wallet.

Otherwise, to get started, you can:

1. Click **Connect Wallet**
2. Choose your account from the dropdown
3. You'll be prompted to sign a message, which will log you into the Tanssi dApp. Go ahead and sign the message

![Click on the Connect Wallet button to connect your wallet to the Tanssi dApp.](/images/builders/deploy-manage/dapp/deploy/deploy-2.png)

Once connected, you'll see your address in the top-right corner. If you've connected multiple accounts and would like to switch accounts, you can click on your address and choose an account from the dropdown menu.

## Balance Verification {: #balance-verification }

The first step in creating and deploying your Appchain is to ensure that you meet the minimum balance requirements. To deploy your Appchain on Dancebox, you'll need to have DANCE tokens, the native Dancebox token, and UNIT tokens, which are the native Alphanet relay chain tokens.

You'll need to meet the following balance requirements for the actions listed below:

=== "Dancebox"
    |              Action               | Balance Required |
    |:---------------------------------:|:----------------:|
    | Reserve Appchain ID (Relay Chain) |     10 UNIT      |
    |  Register Appchain (Relay Chain)  |     90 UNIT      |
    |    Register Appchain (Tanssi)     |    100 DANCE     |

On the **Balance Verification** page of the dApp, you can view your DANCE and UNIT token balances. Meeting the requirements results in a green checkmark next to each balance, while failing to meet them is indicated by a red X.

To claim DANCE tokens, you need to complete a [form on the Tanssi network website](https://www.tanssi.network/claim-dance-tokens){target=_blank} by providing basic information and your Substrate-based address. Within one business day, you'll receive the necessary DANCE and UNIT tokens for launching your Appchain.

If you have already reserved your Appchain ID, you can toggle the switch at the bottom of the **Balance Verification** page, and your balance requirements will change.

Once you meet the balance requirements, you can proceed to the next step of configuring your Appchain by clicking the Continue button at the bottom of the page.

![Verify you meet the balance requirements for launching your Appchain.](/images/builders/deploy-manage/dapp/deploy/deploy-3.png)

## Configure Your Appchain {: #configure-your-appchain }

Next, you'll be able to select a template for your Appchain and, based on the template, configure specific properties, like the token decimals and symbol, genesis smart contracts and accounts, and more.

You can choose from either the EVM or Substrate template or upload a raw specification file. To find out more information on the available templates, please refer to the [Templates](/builders/build/templates/overview){target=_blank} documentation.

### EVM Template {: #evm-template }

The [EVM template](/builders/build/templates/overview/#baseline-evm-template){target=_blank} provides all the necessary components to add an Ethereum compatibility layer to your Appchain.

Before getting started, you'll need to have an EVM chain ID. This needs to be a unique ID across all Ethereum-compatible chains. Once you have a chain ID you would like to use, you can easily search for it to see if it's already taken on [chainid.network](https://chainid.network/){target=_blank}. Then you'll need to open a pull request on the [`ethereum-lists/chains` GitHub repository](https://github.com/ethereum-lists/chains){target=_blank} to add your chain configuration details, including the chain ID, to the list to avoid chain ID collisions. This should be done before you continue the deployment process of your Appchain to avoid chain ID collisions.

To get started, make sure the **EVM** template is selected from the left-side menu. Then take the following steps:

1. Enter your unique chain ID
2. Enter the token decimals and symbol for your native token
3. Provide the Ethereum-style address of the account you want to be used as the sudo account. This account will be able to dispatch privileged functions that require Root permissions. There can only be one sudo account at a time. The sudo account can be changed at any time to a new one by the current sudo account. Once the Appchain is launched, you can easily migrate to a fully decentralized system using specific democracy-related modules
4. (Optional) You can add genesis accounts and balances. If you choose to skip this step, you can use the sudo account to create accounts and transfer funds at a later time
5. (Optional) Add genesis smart contracts by providing an address to use and the bytecode for the smart contract. When providing the bytecode, you'll need to remove the `0x` from the beginning of the bytecode
6. (Optional) You can adjust the gas configurations in the **Advanced** settings. You can choose to change the **Minimum Gas Price**, **Base fee per gas**, **Multiplier**, and **Elasticity**
7. Once you have configured the template for your Appchain, you can select **Continue** to proceed to the next step of the deployment process

![Create an EVM ContainerChain with the Tanssi dApp.](/images/builders/deploy-manage/dapp/deploy/deploy-4.png)

### Substrate Template {: #substrate-template }

The [Substrate template](/builders/build/templates/overview/#baseline-appchain-template){target=_blank} includes all of the necessary configurations for seamless integration with Tanssi and the Polkadot ecosystem. It can be used as the baseline specification to build a custom Appchain that is both Polkadot and Tanssi compatible.

To get started, make sure the **Substrate** template is selected from the left-side menu. Then take the following steps:

1. Enter the token decimals and symbol for your native token and the [SS58 address format](https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json){target=_blank}
2. Provide the Substrate-style address of the account you want to be used as the sudo account. This account will be able to dispatch privileged functions that require Root permissions. There can only be one sudo account at a time. The sudo account can be changed at any time to a new one by the current sudo account. Once the Appchain is launched, you can easily migrate to a fully decentralized system using specific democracy-related modules
3. (Optional) You can add genesis accounts and balances. If you choose to skip this step, you can use the sudo account to create accounts and transfer funds at a later time
4. Once you have configured the template for your Appchain, you can select **Continue** to proceed to the next step of the deployment process

![Create a baseline Substrate ContainerChain with the Tanssi dApp.](/images/builders/deploy-manage/dapp/deploy/deploy-5.png)

### Custom {: #custom }

If you already have a Substrate runtime built and have chosen to upload your own custom specification file, there are some requirements to be aware of that are necessary to ensure the runtime can evolve into a ContainerChain on Tanssi and run properly within the Polkadot ecosystem.

Your runtime must implement the following:

- The Cumulus SDK, as outlined in the [Base Setup to Connect to Polkadot](/builders/build/templates/overview/#base-setup-to-polkadot){target=_blank} section of the [Templates](/builders/build/templates/overview/){target=_blank} page
- Tanssi modules for block production, as outlined in the [Base Setup to Support the Tanssi Protocol](/builders/build/templates/overview/#base-setup-supporting-tanssi){target=_blank} section of the [Templates](/builders/build/templates/overview/){target=_blank} page

Other required changes in the runtime include:

- To verify the author's eligibility to produce a block, set the following type as shown in the snippet, in the `timestamp` module configuration section of the runtime:

    ```rust
    type OnTimestampSet = tp_consensus::OnTimestampSet<
        <Self as pallet_author_inherent::Config>::SlotBeacon,
        ConstU64<{ SLOT_DURATION }>,
    >;
    ```

- Remove all the modules related to block production and consensus (such as `Aura` and `Grandpa`), leaving Tanssi to take over the burden. If the starting point for your project was the parachain template, the following modules are included by default in the runtime and must be removed:

    ```rust
    Authorship: pallet_authorship = 20,
    CollatorSelection: pallet_collator_selection = 21,
    Session: pallet_session = 22,
    Aura: pallet_aura = 23,
    AuraExt: cumulus_pallet_aura_ext = 24,
    ```

Finally, [generate and edit](/builders/build/local/customizing-chain-specs/#editing-json-chain-specs){target=_blank} the chain specification paying special attention to: 

- `para_id` - within this custom flow, a pre-registered parachain id is required
- `is_ethereum` - to `true` if exposing Ethereum compatible RPC endpoints is needed

Now, you can upload your custom raw specification file by selecting the **Custom** template and adding your JSON specification file.

![Upload a custom raw specification file to the Tanssi dApp.](/images/builders/deploy-manage/dapp/deploy/deploy-6.png)

!!! note
    The file limit for a raw chain should not exceed 2Mb

## Reserve your Appchain ID {: #reserve-appchain-id }

If you haven't already done so, you'll need to reserve your Appchain ID, which will be required to register your Appchain on the relay chain and function within the Polkadot ecosystem.

To reserve your Appchain ID, you'll need to submit a transaction. Please make sure to use the account you plan to launch your Appchain with when submitting the transaction.

1. To initiate the transaction, click on **Reserve Appchain ID**
2. Your wallet will pop up, and you'll need to submit the transaction

![Reserve your Appchain ID via the Tanssi dApp.](/images/builders/deploy-manage/dapp/deploy/deploy-7.png)

Once the transaction has successfully gone through, your Appchain ID will be displayed on the dApp, and you'll be able to click **Continue** to proceed to the next step. You'll notice that on your Alphanet relay chain account, 20 UNIT tokens have been removed from your transferrable balance and are now reserved.

![Successfully reserved your Appchain ID via the Tanssi dApp.](/images/builders/deploy-manage/dapp/deploy/deploy-8.png)

## Generate Your Appchain Files {: #generate-appchain-files }

Before you can deploy your Appchain, you'll need to generate four configuration files:

- [The raw chain specification](/builders/build/local/customizing-chain-specs/#generating-raw-specs-file){target=_blank} - a compact version of the JSON specification file, which defines the initial settings and state that all nodes participating in the network must agree on to reach consensus and produce blocks
- [The genesis state](/builders/build/local/customizing-chain-specs/#genesis-state){target=_blank} - defines the initial state upon which all transactions and state transitions are executed
- [The genesis Wasm](/learn/framework/architecture/#runtime){target=_blank} - a WebAssembly (Wasm) blob that defines the runtime logic
- [The Tanssi genesis state](/builders/build/local/customizing-chain-specs/#genesis-state){target=_blank} - defines the genesis state to register in Tanssi

These files will automatically be generated for you based on your Appchain ID and your customized template configurations. All you need to do is click **Generate**, and the dApp will generate the required files for you.

![Generate your Appchain files with the click of a button on the Tanssi dApp.](/images/builders/deploy-manage/dapp/deploy/deploy-9.png)

Once the files have been generated, please click **Continue** to go on to the final step.

## Deploy Your Appchain {: #deploy-your-appchain }

You're finally ready to take your last step towards preparing your Appchain as it evolves into a ContainerChain deployed through Tanssi! For this final step, you'll need to submit two transactions: one to register your Appchain on the relay chain and another to register your Appchain on Tanssi.

To register your Appchain on the relay chain, take the following steps:

1. Click **Register** under the **Register Appchain in Relay** section
2. Confirm the transaction in your wallet

![Register your Appchain on the relay chain.](/images/builders/deploy-manage/dapp/deploy/deploy-10.png)

Once the transaction has gone through successfully, the dApp will update to show that you have successfully registered your Appchain under the **Register Appchain in Relay** section.

Lastly, to register your Appchain on Tanssi, take the following steps:

1. Click **Register** under the **Register Appchain in Tanssi** section
2. Confirm the transaction in your wallet

![Register your Appchain on Tanssi.](/images/builders/deploy-manage/dapp/deploy/deploy-11.png)

Once the transaction has gone through successfully, the dApp will update to show that you have successfully registered your Appchain under the **Register Appchain in Tanssi** section. You can click **Continue** to view the dashboard for your ContainerChain.

![Successful registration of your Appchain on the relay chain and Tanssi.](/images/builders/deploy-manage/dapp/deploy/deploy-12.png)

On the dashboard, you can check the status of your deployment and view relevant information such as the latest block information, RPC and WS endpoints, and more.

![The ContainerChain dashboard on the Tanssi dApp.](/images/builders/deploy-manage/dapp/deploy/deploy-13.png)

And that's it! You've successfully registered your Appchain! Once your Appchain has been verified by the Tanssi team, the launch process will automatically begin.
