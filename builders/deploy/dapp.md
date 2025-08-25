---
title: Deploy Your Appchain via the DApp
description: Learn how to spin up and deploy an appchain on Tanssi using the Tanssi dApp, a no-code solution for onboarding and launching decentralized appchains in minutes.
icon: octicons-browser-24
categories: Appchain
---

# Deploy Your Appchain via the Tanssi DApp

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/W40oqavpZJ8' frameborder='0' allowfullscreen></iframe></div>
<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>

## Introduction {: #introduction }

Tanssi aims to lower the barrier to entry for building decentralized appchains by streamlining the onboarding process and abstracting away the technical details of launching a Tanssi-powered appchain. The [Tanssi dApp](https://apps.tanssi.network){target=\_blank} allows you to spin up an appchain in just minutes. This guide will walk you through the steps required to launch an appchain on Dancelight, the Tanssi TestNet, via the Tanssi dApp.

## Quick Trials vs. Dedicated appchains {: #quick-trial-vs-dedicated-appchains }
 
[The Tanssi dApp](https://apps.tanssi.network){target=\_blank} supports the creation of two different types of appchains, namely:

- Quick trial - a temporary appchain that self-destructs after 48 hours
- Dedicated - a long-lasting appchain for Tanssi ecosystem builders

Both types of Tanssi appchains behave identically, with the only difference being the ephemeral nature of the quick trials. Generally speaking, quick trial appchains are best for most builders who want to test out a Tanssi-powered appchain. However, if you require a long-lasting test environment, the Tanssi team will happily assist you with setting up a dedicated appchain. 

The screenshots and content in this guide will showcase quick trial appchains, but you can follow the same process to configure a dedicated Tanssi appchain.

![A screenshot showing the initial dashboard of apps.tanssi.network.](/images/builders/deploy/dapp/dapp-1.webp)

## Prerequisites {: #prerequisites }

### Supported Wallets {: #supported-wallets }

Since Tanssi is built with Substrate, you'll need to use a Substrate-compatible wallet to deploy and manage your Tanssi appchain. Supported wallets include:

- [Talisman](https://talisman.xyz/){target=\_blank}
- [SubWallet](https://www.subwallet.app){target=\_blank}
- [Enkrypt](https://www.enkrypt.com){target=\_blank}
- [Polkadot.js extension](https://polkadot.js.org/extension){target=\_blank}

If you deploy a Tanssi-powered EVM appchain, your users won't need a Substrate wallet. They can interact with your Tanssi appchain using Ethereum-compatible wallets like [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

![Connection screen for various Substrate wallets](/images/builders/deploy/dapp/dapp-2.webp)

### Connect Your Wallet to the DApp {: #connect-wallet }

To connect your wallet to the Tanssi dApp, click **Connect Wallet** in the upper-right corner. Select the desired wallet type. Then, take the following steps:

1. Choose your account from the dropdown
2. You'll be prompted to sign a message to log you into the Tanssi dApp. Go ahead and sign the message

![Click on the Connect Wallet button to connect your wallet to the Tanssi dApp.](/images/builders/deploy/dapp/dapp-3.webp)

Once connected, you'll see your address in the top-right corner. If you've connected multiple accounts and want to switch accounts, you can click on your address and choose an account from the dropdown menu.

## Configure Your Appchain {: #configure-your-appchain }

On the dApp [Home page](https://apps.tanssi.network/){target=\_blank}, click the **Start Building** button in the **Launch Network** block to start configuring your Tanssi appchain immediately. You have to choose between a **Quick Trial** or a **Dedicated** appchain. You can read more about [the differences between these two available types on the Tanssi Testnet](#quick-trial-vs-dedicated-appchains).

![A screenshot showing the Launch Network section of apps.tanssi.network.](/images/builders/deploy/dapp/dapp-1.webp)

Next, select a template that best fits your use case and configure your Tanssi appchain's properties accordingly. You can choose from the EVM or Substrate template or upload a raw specification file. Please refer to the [Templates](/builders/build/templates/overview/){target=\_blank} documentation to learn more about the available templates.

### EVM Template {: #evm-template }

The [EVM template](/builders/build/templates/evm/){target=\_blank} provides all the necessary components to add an Ethereum compatibility layer to your Tanssi appchain. 

As part of the setup process, you'll need a unique EVM chain ID ([EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md){target=\_blank}) that is distinct from all other EVM chains. You can verify that another chain does not already use your EVM chain ID on [Chainlist](https://chainid.network){target=\_blank}. When launching your Tanssi appchain in production, it's critical that you open a PR to reserve your chain ID on the [`ethereum-lists/chains` GitHub repository](https://github.com/ethereum-lists/chains){target=\_blank} immediately after your RPC endpoint spins up. This is part of the validation process and is required for the PR to be accepted and merged.

!!! note
    A registered EVM chain ID is only necessary for Tanssi appchains deployed on the MainNet. When testing or deploying on the TestNet, you can choose any available ID and move forward.

To get started, select the **EVM** template from the left-side menu. Then take the following steps:

1. In the **Network Details** section, provide your project's name, your unique EVM chain ID, and select the category that best fits your use case
2. In the **Gas Token** section, enter the symbol of your appchain's native token. Decimal places are fixed to 18 digits, the same as Ether, to preserve compatibility across EVM tooling
3. (Optional) You can adjust the [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} configurations in the **Advanced** settings. You can choose to change the **Base fee per gas** and **Max base fee change**
4. In the **Accounts** section, provide the Ethereum-style address of the account you want to use as the sudo account and its corresponding initial balance. This account will be able to dispatch privileged functions that require Root permissions. There can only be one sudo account at a time. The sudo account can be changed at any time to a new one by the current sudo account. Once the Tanssi appchain is launched, you can easily migrate to a fully decentralized system using specific democracy-related modules
5. (Optional) In the **Advanced** section, click on **Add** to add genesis accounts and balances. If you choose to skip this step, you can use the sudo account to create accounts and transfer funds at a later time
6. (Optional) In the **Genesis Smart Contracts**, click on **Add** to add genesis smart contracts by providing an address to use and the bytecode for the smart contract. When providing the bytecode, you'll need to remove the `0x` from the beginning of the bytecode
7. Once you have configured the template for your Tanssi appchain, select **Continue** and proceed to the [Check Balances section](#check-balances)

![Create a Tanssi EVM Appchain with the Tanssi dApp.](/images/builders/deploy/dapp/dapp-4.webp)

### Substrate Template {: #substrate-template }

The [Substrate template](/builders/build/templates/overview/#baseline-network-template){target=\_blank} includes all the configurations for seamless integration with Tanssi. It can be used as the baseline specification to build a custom Tanssi-powered appchain leveraging the modularity and scalability of the Substrate framework.

To get started, select the **Substrate** template from the left-side menu. Then take the following steps:

1. In the **Network Details** section, enter your project's name and select the category that best fits your use case
2. In the **Gas Token** section, enter the token decimals, symbol, and the [SS58 address format](https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json){target=\_blank}
3. In the **Accounts** section, provide the Substrate-style address of the account you want to use as the sudo account and its initial balance. This account will be able to dispatch privileged functions that require Root permissions. There can only be one sudo account at a time. The sudo account can be changed at any time to a new one by the current sudo account. Once the appchain is launched, you can easily migrate to a fully decentralized system using specific democracy-related modules
4. (Optional) In the **Advanced** section, click on **Add** to add genesis accounts and balances. If you choose to skip this step, you can use the sudo account to create accounts and transfer funds at a later time
5. Once you have configured the template for your Tanssi appchain, you can select **Continue** to proceed to the [Check Balances section](#check-balances)

![Create a baseline Substrate Appchain with the Tanssi dApp.](/images/builders/deploy/dapp/dapp-5.webp)

### Custom {: #custom }

If you already have a Substrate runtime built and have chosen to upload your own custom specification file, there are some requirements you should be aware of to ensure the runtime can evolve into a Tanssi-powered appchain and run properly.

Your runtime must implement the following:

- The Cumulus SDK, as outlined in the [Base Setup to Connect to Polkadot](/builders/build/templates/overview/#base-setup-to-polkadot){target=\_blank} section of the [Templates](/builders/build/templates/overview/){target=\_blank} page
- Tanssi modules for block production, as outlined in the [Base Setup to Support the Tanssi Protocol](/builders/build/templates/overview/#base-setup-supporting-tanssi){target=\_blank} section of the [Templates](/builders/build/templates/overview/){target=\_blank} page

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
    // Collator support. The order of these 4 are important and shall not change.
	#[runtime::pallet_index(20)]
	pub type Authorship = pallet_authorship;
	#[runtime::pallet_index(21)]
	pub type CollatorSelection = pallet_collator_selection;
	#[runtime::pallet_index(22)]
	pub type Session = pallet_session;
	#[runtime::pallet_index(23)]
	pub type Aura = pallet_aura;
	#[runtime::pallet_index(24)]
	pub type AuraExt = cumulus_pallet_aura_ext;
    ```

Finally, [generate and edit](/builders/build/customize/customizing-chain-specs/#editing-json-chain-specs){target=\_blank} the chain specification paying special attention to:

- `para_id` - within this custom flow, a pre-registered appchain id is required. You can get an appchain ID moving forward with the registration to the **Reserve your Network ID** step. After you reserve the ID, start over the process to get back to this point
- `is_ethereum` - to `true` if exposing Ethereum compatible RPC endpoints is needed

And, depending on whether you are deploying a quick trial appchain or a dedicated one, also adjust these attributes:

=== "Quick Trial Appchain"

    ```json
    {
        ...
        "relay_chain": "rococo_flashbox_relay_testnet",
        "chainType": "Live",
        "genesis": {
            "runtime": {
                ...
                "authoritiesNoting": {
                    "orchestratorParaId": 1000
                },
                ...
            }
        }
        ...
    }
    ```

=== "Dedicated Appchain"

    ```json
    {
        ...
        "relay_chain": "rococo-local",
        "chainType": "Live",
        "genesis": {
            "runtime": {
                ...
                "authoritiesNoting": {
                    "orchestratorParaId": 0
                },
                ...
            }
        }
        ...
    }
    ```

Now, you can upload your custom raw specification file by selecting the **Custom** template and adding your JSON specification file.

![Upload a custom raw specification file to the Tanssi dApp.](/images/builders/deploy/dapp/dapp-6.webp)

!!! note
    The size of a raw chain specifications file should not exceed 2MB.

## Check Balances {: #check-balances }

Next, you'll need to verify that you have sufficient balance. If you don't, you can press **Request Tokens** and complete the following login with GitHub or Google. You'll need to complete a few quick onboarding questions, and then you'll be able to press **Request Tokens** again, and they will be delivered to your connected wallet. 

![Request tokens](/images/builders/deploy/dapp/dapp-7.webp)

If you're setting up a dedicated Tanssi appchain, you'll need to fill out an [application form](https://www.tanssi.network/dedicated-chain-testnet-form){target=\_blank}. The Tanssi team will review your application and send the necessary tokens within one business day. 

The required minimum balances to launch a Tanssi appchain are as follows:

=== "Quick Trial Appchain"
    |        Chain        | Balance Required |
    |:-------------------:|:----------------:|
    | Orchestration layer |     70 UNIT      |
    |   Tanssi TestNet    |     100 SNAP     |

=== "Dedicated Appchain"
    |            Chain             | Balance Required |
    |:----------------------------:|:----------------:|
    |  Tanssi TestNet   |    100 STAR     |

!!! note
    Quick trial appchains use an additional orchestration layer, therefore two different tokens, SNAP and UNIT, will be sent to your account. For dedicated appchains only STAR tokens are required.

## Reserve your Appchain ID {: #reserve-appchain-id }

If you haven't already done so, you must to reserve your Tanssi appchain ID, which will identify your chain within the Tanssi ecosystem.

To reserve your Tanssi appchain ID, you'll need to submit a transaction. Please make sure to use the account you plan to launch your Tanssi appchain with when submitting the transaction.

1. To initiate the transaction, click on **Reserve Network ID**
2. Your wallet will pop up, and you'll need to submit the transaction

![Reserve your Tanssi-powered Appchain ID via the Tanssi dApp.](/images/builders/deploy/dapp/dapp-8.webp)

Once the transaction has successfully gone through, your Tanssi appchain ID will be displayed on the dApp, and you'll be able to click **Continue** to proceed to the next step. You'll notice that some of your UNIT (or STAR if registering a dedicated Appchain) tokens have been removed from your transferable balance and are now reserved.

![Successfully reserved your Tanssi-powered Appchain ID via the Tanssi dApp.](/images/builders/deploy/dapp/dapp-9.webp)

## Generate Your Appchain Files {: #generate-appchain-files }

Before you can deploy your Tanssi appchain, you'll need to generate three configuration files:

- [The raw chain specification](/builders/build/customize/customizing-chain-specs/#generating-raw-specs-file){target=\_blank} - a compact version of the JSON specification file, which defines the initial settings and state that all nodes participating in the network must agree on to reach consensus and produce blocks
- [The genesis state header](/builders/build/customize/customizing-chain-specs/#genesis-state){target=\_blank} - defines the initial state upon which all transactions and state transitions are executed
- [The genesis Wasm](/learn/framework/architecture/#runtime){target=\_blank} - a WebAssembly (Wasm) blob that defines the runtime logic

These files will automatically be generated for you based on your Tanssi appchain ID and your customized template configurations. All you need to do is click **Generate**, and the dApp will generate the required files for you.

![Generate your Tanssi-powered appchain files with the click of a button on the Tanssi dApp.](/images/builders/deploy/dapp/dapp-10.webp)

Once the files have been generated, please click **Continue** to go on to the final step.

## Deploy Your appchain {: #deploy-your-appchain }

You're finally ready to take your last step towards preparing your appchain as it evolves into a Tanssi-powered appchain! For this final step, when registering a quick trial you'll need to submit two transactions: one to register your appchain on the orchestration layer and another to register your appchain on the Tanssi TestNet.

To register your appchain on the orchestration layer, take the following steps:

1. Click **Register** under the **Register Network in Relay** section
2. Confirm the transaction in your wallet

![Register your Tanssi-powered appchain on the orchestration layer.](/images/builders/deploy/dapp/dapp-11.webp)

Once the transaction has gone through successfully, the dApp will update to show that you have successfully registered your Tanssi appchain under the **Register Network in Relay** section.

Lastly, to register your appchain on Tanssi, take the following steps:

1. Click **Register** under the **Register Network in Tanssi** section
2. Confirm the transaction in your wallet

![Register your appchain on Tanssi.](/images/builders/deploy/dapp/dapp-12.webp)

Once the transaction has gone through successfully, the dApp will update to show that you have registered your Tanssi-powered appchain. Congratulations! On the dashboard, you can check the status of your deployment and view relevant information, such as the latest block information, RPC and WS endpoints, and more.

![The appchain dashboard on the Tanssi dApp.](/images/builders/deploy/dapp/dapp-13.webp)

And that's it! You've successfully registered your Tanssi appchain! The launch process will automatically begin once the Tanssi team has verified your registration. Once your appchain is live, you can return to the **Dashboard** to view the RPC URL and other pertinent chain information.
