---
title: Deploy Your Network via the DApp
description: Learn how to spin up and deploy a network on Tanssi in minutes using the Tanssi dApp, a no-code solution for onboarding and launching decentralized networks.
icon: octicons-browser-24
---

# Deploy Your Network via the Tanssi DApp

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/SQw9fn_MOQA?si=INbq35lvKQdJ7IA2' frameborder='0' allowfullscreen></iframe></div>
<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>

## Introduction {: #introduction }

Tanssi aims to lower the barrier to entry for building decentralized networks by streamlining the onboarding process and abstracting away the technical details of launching a Tanssi network. The [Tanssi dApp](https://apps.tanssi.network){target=\_blank} allows you to spin up a network in just minutes. This guide will walk you through the steps required to launch a network on Tanssi's TestNet, Dancebox, via the Tanssi dApp.

## Quick Trials vs. Dedicated Networks {: #quick-trial-vs-dedicated-networks }
 
[The Tanssi dApp](https://apps.tanssi.network){target=\_blank} supports the creation of two different types of networks, namely:

- Quick trial network - a temporary network that self-destructs after 48 hours
- Dedicated network - a long-lasting network for Tanssi ecosystem builders

Both types of Tanssi networks behave identically, with the only difference being the ephemeral nature of the quick trial networks. Generally speaking, quick trial networks are best for most builders who want to test the power of a Tanssi-powered network. However, if you require a long-lasting test environment, the Tanssi team will happily assist you with setting up a dedicated network. 

The screenshots and content in this guide will showcase quick trial networks, but you can follow the same process to configure a dedicated Tanssi network. 

![A screenshot showing the initial dashboard of apps.tanssi.network.](/images/builders/deploy/dapp/dapp-1.webp)

## Prerequisites {: #prerequisites }

### Supported Wallets {: #supported-wallets }

Since Tanssi is built with Substrate, you'll need to use a Substrate-supported wallet to deploy and manage your Tanssi network. Supported wallets include:

- [Polkadot.js extension](https://polkadot.js.org/extension){target=\_blank}
- [SubWallet](https://www.subwallet.app){target=\_blank}
- [Talisman](https://www.talisman.xyz){target=\_blank}
- [Enkrypt](https://www.enkrypt.com){target=\_blank}

If you deploy a Tanssi EVM network, your users won't need a Substrate wallet. They can interact with your Tanssi network using Ethereum-compatible wallets like [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

![Connection screen for various Substrate wallets](/images/builders/deploy/dapp/dapp-3.webp)

### Connect Your Wallet to the DApp {: #connect-wallet }

To connect your wallet to the Tanssi dApp, click **Connect Wallet** in the upper-right corner. Select the desired wallet type. Then, take the following steps:

1. Choose your account from the dropdown
2. You'll be prompted to sign a message to log you into the Tanssi dApp. Go ahead and sign the message

![Click on the Connect Wallet button to connect your wallet to the Tanssi dApp.](/images/builders/deploy/dapp/dapp-4.webp)

Once connected, you'll see your address in the top-right corner. If you've connected multiple accounts and want to switch accounts, you can click on your address and choose an account from the dropdown menu.

## Configure Your Network {: #configure-your-network }

From the [Dashboard](https://apps.tanssi.network){target=\_blank} or the [Deploy network tab](https://apps.tanssi.network/create){target=\_blank}, you can immediately start configuring your Tanssi network. To start, choose **Deploy a Quick Trial Network** or **Deploy a Dedicated Network**. You can read more about [the differences between the two types of networks on the Tanssi Testnet](#quick-trial-vs-dedicated-networks).

![A screenshot showing the initial dashboard of apps.tanssi.network.](/images/builders/deploy/dapp/dapp-1.webp)

Next, select a template that best fits your use case and configure your Tanssi network's properties accordingly. You can choose from the EVM or Substrate template or upload a raw specification file. Please refer to the [Templates](/builders/build/templates/overview/){target=\_blank} documentation to learn more about the available templates.

### EVM Template {: #evm-template }

The [EVM template](/builders/build/templates/evm/){target=\_blank} provides all the necessary components to add an Ethereum compatibility layer to your Tanssi network. 

As part of the setup process, you'll need a unique EVM chain ID ([EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md){target=\_blank}) that is distinct from all other EVM chains. You can verify that another chain does not already use your EVM chain ID on [Chainlist](https://chainid.network){target=\_blank}. When launching your Tanssi network in production, it's critical that you open a PR to reserve your chain ID on the [`ethereum-lists/chains` GitHub repository](https://github.com/ethereum-lists/chains){target=\_blank} immediately after your RPC endpoint spins up. This is part of the validation process and is required for the PR to be accepted and merged.

!!! note
    A registered EVM chain ID is only necessary for Tanssi networks deployed on the MainNet. When testing or deploying on the TestNet, you can choose any available ID and move forward.

To get started, select the **EVM** template from the left-side menu. Then take the following steps:

1. In the **Project Details** section, provide your project's name, your contact email, and your Telegram
2. In the **Properties** section, enter the symbol of your Tanssi network's native token and your unique EVM chain ID. Decimal places are fixed to 18 digits, the same as Ether, to preserve compatibility across EVM tooling
3. Provide the Ethereum-style address of the account you want to use as the sudo account and its corresponding initial balance. This account will be able to dispatch privileged functions that require Root permissions. There can only be one sudo account at a time. The sudo account can be changed at any time to a new one by the current sudo account. Once the Tanssi network is launched, you can easily migrate to a fully decentralized system using specific democracy-related modules
4. (Optional) Press **Add** to add genesis accounts and balances. If you choose to skip this step, you can use the sudo account to create accounts and transfer funds at a later time
5. (Optional) Press **Add** to add genesis smart contracts by providing an address to use and the bytecode for the smart contract. When providing the bytecode, you'll need to remove the `0x` from the beginning of the bytecode
6. (Optional) You can adjust the gas configurations in the **Advanced** settings. You can choose to change the **Minimum Gas Price**, **Base fee per gas**, **Multiplier**, and **Elasticity**
7. Once you have configured the template for your Tanssi network, select **Continue** and proceed to the [Check Balances section](#check-balances)

![Create a Tanssi EVM Network with the Tanssi dApp.](/images/builders/deploy/dapp/dapp-5.webp)

### Substrate Template {: #substrate-template }

The [Substrate template](/builders/build/templates/overview/#baseline-network-template){target=\_blank} includes all the configurations for seamless integration with Tanssi and the Polkadot ecosystem. It can be used as the baseline specification to build a custom Tanssi network that is compatible with both Polkadot and Tanssi.

To get started, select the **Substrate** template from the left-side menu. Then take the following steps:

1. In the **Project Details** section, provide your project's name, your contact email, and your Telegram
2. Enter the token decimals and symbol for your native token and the [SS58 address format](https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json){target=\_blank}
3. Provide the Substrate-style address of the account you want to use as the sudo account and its initial balance. This account will be able to dispatch privileged functions that require Root permissions. There can only be one sudo account at a time. The sudo account can be changed at any time to a new one by the current sudo account. Once the network is launched, you can easily migrate to a fully decentralized system using specific democracy-related modules
4. (Optional) You can add genesis accounts and balances. If you choose to skip this step, you can use the sudo account to create accounts and transfer funds at a later time
5. Once you have configured the template for your Tanssi network, you can select **Continue** to proceed to the [Check Balances section](#check-balances)

![Create a baseline Substrate Network with the Tanssi dApp.](/images/builders/deploy/dapp/dapp-6.webp)

### Custom {: #custom }

If you already have a Substrate runtime built and have chosen to upload your own custom specification file, there are some requirements to be aware of that are necessary to ensure the runtime can evolve into a Tanssi-powered network and run properly.

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
    Authorship: pallet_authorship = 20,
    CollatorSelection: pallet_collator_selection = 21,
    Session: pallet_session = 22,
    Aura: pallet_aura = 23,
    AuraExt: cumulus_pallet_aura_ext = 24,
    ```

Finally, [generate and edit](/builders/build/customize/customizing-chain-specs/#editing-json-chain-specs){target=\_blank} the chain specification paying special attention to:

- `para_id` - within this custom flow, a pre-registered parachain id is required
- `is_ethereum` - to `true` if exposing Ethereum compatible RPC endpoints is needed

And, depending on whether you are deploying a quick trial network or a dedicated one, also adjust these attributes:

=== "Quick Trial Network"

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

=== "Dedicated Network"

    ```json
    {
        ...
        "relay_chain": "westend_moonbase_relay_testnet",
        "chainType": "Live",
        "genesis": {
            "runtime": {
                ...
                "authoritiesNoting": {
                    "orchestratorParaId": 3000
                },
                ...
            }
        }
        ...
    }
    ```

Now, you can upload your custom raw specification file by selecting the **Custom** template and adding your JSON specification file.

![Upload a custom raw specification file to the Tanssi dApp.](/images/builders/deploy/dapp/dapp-7.webp)

!!! note
    The size of a raw chain specifications file should not exceed 2MB.

## Check Balances {: #check-balances }

Next, you'll need to verify that you have sufficient balances of DANCE and TANGO tokens. If you don't, you can press **Request Tokens** and complete the following login with GitHub or Google. You'll need to complete a few quick onboarding questions, and then you'll be able to press **Request Tokens** again, and they will be delivered to your connected wallet.

![Request tokens](/images/builders/deploy/dapp/dapp-8.webp)

If you're setting up a dedicated Tanssi network, you'll need to manually request the necessary tokens via a [form on the Tanssi network website](https://www.tanssi.network/claim-dance-tokens){target=\_blank}, and you'll receive the necessary tokens within one business day. The required minimum balances to launch a Tanssi network are as follows:

=== "Quick Trial Network"
    |            Chain             | Balance Required |
    |:----------------------------:|:----------------:|
    | Flashbox Relay Chain Balance |     70 TANGO     |
    |  Flashbox Balance (Tanssi)   |    100 DANCE     |

=== "Dedicated Network"
    |            Chain             | Balance Required |
    |:----------------------------:|:----------------:|
    | Moonbase Relay Chain Balance |    110 TANGO     |
    |  Dancebox Balance (Tanssi)   |    100 DANCE     |

## Reserve your Network ID {: #reserve-network-id }

If you haven't already done so, you'll need to reserve your Tanssi network ID, which will be required to register your Tanssi network on the relay chain and function within the Polkadot ecosystem.

To reserve your Tanssi network ID, you'll need to submit a transaction. Please make sure to use the account you plan to launch your Tanssi network with when submitting the transaction.

1. To initiate the transaction, click on **Reserve Network ID**
2. Your wallet will pop up, and you'll need to submit the transaction

![Reserve your Tanssi-powered Network ID via the Tanssi dApp.](/images/builders/deploy/dapp/dapp-9.webp)

Once the transaction has successfully gone through, your Tanssi network ID will be displayed on the dApp, and you'll be able to click **Continue** to proceed to the next step. You'll notice that on your Alphanet relay chain account, 20 TANGO tokens have been removed from your transferrable balance and are now reserved.

![Successfully reserved your Tanssi-powered Network ID via the Tanssi dApp.](/images/builders/deploy/dapp/dapp-10.webp)

## Generate Your Network Files {: #generate-network-files }

Before you can deploy your Tanssi network, you'll need to generate four configuration files:

- [The raw chain specification](/builders/build/customize/customizing-chain-specs/#generating-raw-specs-file){target=\_blank} - a compact version of the JSON specification file, which defines the initial settings and state that all nodes participating in the network must agree on to reach consensus and produce blocks
- [The genesis state header](/builders/build/customize/customizing-chain-specs/#genesis-state){target=\_blank} - defines the initial state upon which all transactions and state transitions are executed
- [The genesis Wasm](/learn/framework/architecture/#runtime){target=\_blank} - a WebAssembly (Wasm) blob that defines the runtime logic

These files will automatically be generated for you based on your Tanssi network ID and your customized template configurations. All you need to do is click **Generate**, and the dApp will generate the required files for you.

![Generate your Tanssi-powered network files with the click of a button on the Tanssi dApp.](/images/builders/deploy/dapp/dapp-11.webp)

Once the files have been generated, please click **Continue** to go on to the final step.

## Deploy Your Network {: #deploy-your-network }

You're finally ready to take your last step towards preparing your network as it evolves into a network deployed through Tanssi! For this final step, you'll need to submit two transactions: one to register your network on the relay chain and another to register your network on Tanssi.

To register your Tanssi network on the relay chain, take the following steps:

1. Click **Register** under the **Register Network in Relay** section
2. Confirm the transaction in your wallet

![Register your Tanssi-powered network on the relay chain.](/images/builders/deploy/dapp/dapp-12.webp)

Once the transaction has gone through successfully, the dApp will update to show that you have successfully registered your Tanssi network under the **Register Network in Relay** section.

Lastly, to register your network on Tanssi, take the following steps:

1. Click **Register** under the **Register Network in Tanssi** section
2. Confirm the transaction in your wallet

![Register your network on Tanssi.](/images/builders/deploy/dapp/dapp-13.webp)

Once the transaction has gone through successfully, the dApp will update to show that you have registered your Tanssi network. Congratulations! On the dashboard, you can check the status of your deployment and view relevant information, such as the latest block information, RPC and WS endpoints, and more.

![The network dashboard on the Tanssi dApp.](/images/builders/deploy/dapp/dapp-14.webp)

And that's it! You've successfully registered your Tanssi network! The launch process will automatically begin once the Tanssi team has verified your network. Once your Tanssi network is live, you can return to the **Dashboard** to view the RPC URL and other pertinent chain information.
