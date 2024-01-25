---
title: Deploy Your ContainerChain via the DApp
description: Learn how to spin up and deploy an Appchain on Tanssi in minutes using the Tanssi dApp, a no-code solution for onboarding into the Polkadot ecosystem.
---

# Deploy your ContainerChain via the Tanssi DApp

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/Ovasc7uAXpk?si=WhXT7X61THF2KqkL' frameborder='0' allowfullscreen></iframe></div>
<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>

## Introduction {: #introduction }

Tanssi aims to lower the barrier to entry for building within the Polkadot ecosystem by streamlining the onboarding process and abstracting away the technical details of launching an Appchain. The [Tanssi dApp](https://apps.tanssi.network/){target=\_blank} allows you to spin up an Appchain in just minutes. This guide will walk you through the steps required to launch an Appchain on Tanssi's TestNet, Dancebox, via the Tanssi dApp.

## Snap Appchains vs. Dedicated Appchains {: #snap-appchains-vs-dedicated-appchains }
 
[The Tanssi dApp](https://apps.tanssi.network/){target=\_blank} supports the creation of two different types of Appchains, namely:

- Snap Appchain - a temporary Appchain that self-destructs after 48 hours
- Dedicated Appchain - a long-lasting Appchain for Tanssi ecosystem builders

Both types of Appchains behave identically, with the only difference being the ephemeral nature of the Snap Appchains. Generally speaking, Snap Appchains are best for most builders who want to test the power of a Tanssi-powered Appchain. However, if you require a long-lasting test environment, the Tanssi team will happily assist you with setting up a dedicated Appchain. 

The screenshots and content in this guide will showcase Snap Appchains, but you can follow the same process to configure a dedicated Appchain. 

![A screenshot showing the initial dashboard of apps.tanssi.network.](/images/builders/deploy/dapp/dapp-1.png)

## Overview {: #overview }

Deploying an Appchain via the Tanssi dApp is accomplished as a single, streamlined flow consisting of five distinct steps:

1. Select a [template](/builders/build/templates/overview){target=\_blank} and configure it
2. Satisfy the required minimum token balances
3. Reserve your Appchain ID on the relay chain
4. Generate your custom Appchain files
5. Register your Appchain on Tanssi, and the relay chain

![A diagram mapping out the steps for deploying an Appchain with the Tanssi dApp.](/images/builders/deploy/dapp/dapp-2.png)

For Snap Appchains and Dedicated Appchains on the [Tanssi Dancebox Testnet](/builders/tanssi-network/networks/dancebox){target=\_blank}, the Tanssi team will manually complete verification. After verification, it typically takes about ten minutes for your Snap Appchain to be ready and about two hours for a dedicated Appchain. For Tanssi MainNet, the process will be fully decentralized and permissionless.

## Prerequisites {: #prerequisites }

### Supported Wallets {: #supported-wallets }

Since Tanssi is built with Substrate, you'll need to use a Substrate-supported wallet to deploy and manage your ContainerChain. Supported wallets include:

- [Polkadot.js extension](https://polkadot.js.org/extension/){target=\_blank}
- [SubWallet](https://www.subwallet.app/){target=\_blank}
- [Talisman](https://www.talisman.xyz/){target=\_blank}
- [MetaMask Polkadot Snap](https://snaps.metamask.io/snap/npm/chainsafe/polkadot-snap/){target=\_blank}
- [Enkrypt](https://www.enkrypt.com/){target=\_blank}

If you deploy an EVM ContainerChain, your users won't need a Substrate wallet. They can interact with your ContainerChain using Ethereum-compatible wallets like [MetaMask](/builders/interact/ethereum-api/wallets/metamask){target=\_blank}.

![Connection screen for various Substrate wallets](/images/builders/deploy/dapp/dapp-3.png)

### Connect Your Wallet to the DApp {: #connect-wallet }

To connect your wallet to the Tanssi dApp, click **Connect Wallet** in the upper-right corner. Select the desired wallet type. Then, take the following steps:

1. Choose your account from the dropdown
2. You'll be prompted to sign a message to log you into the Tanssi dApp. Go ahead and sign the message

![Click on the Connect Wallet button to connect your wallet to the Tanssi dApp.](/images/builders/deploy/dapp/dapp-4.png)

Once connected, you'll see your address in the top-right corner. If you've connected multiple accounts and want to switch accounts, you can click on your address and choose an account from the dropdown menu.

## Configure Your Appchain {: #configure-your-appchain }

From the [Dashboard](https://apps.tanssi.network/){target=\_blank} or the [Deploy Appchain tab](https://apps.tanssi.network/create){target=\_blank}, you can immediately start configuring your Appchain. To start, choose **Deploy a Snap Appchain** or **Deploy a Dedicated Appchain**. You can read more about [the differences between the two types of Appchains on the Tanssi Testnet](#snap-appchains-vs-dedicated-appchains).

![A screenshot showing the initial dashboard of apps.tanssi.network.](/images/builders/deploy/dapp/dapp-1.png)

Next, select a template that best fits your use case and configure your Appchain's properties accordingly. You can choose from the EVM or Substrate template or upload a raw specification file. Please refer to the [Templates](/builders/build/templates/overview){target=\_blank} documentation to learn more about the available templates.

### EVM Template {: #evm-template }

The [EVM template](/builders/build/templates/evm/){target=\_blank} provides all the necessary components to add an Ethereum compatibility layer to your Appchain. As part of the setup process, you'll need a unique EVM chain ID that is distinct from all other EVM chains. You can verify that another chain does not already use your EVM chain ID on [chainid.network](https://chainid.network/){target=\_blank}. Before launching your Appchain in production, it's critical that you open a PR to reserve your chain ID on the [`ethereum-lists/chains` GitHub repository](https://github.com/ethereum-lists/chains){target=\_blank}. It would be best if you did this before you continued the deployment process of your Appchain to avoid chain ID collisions.

!!! note
    A registered EVM chain ID is only necessary for Appchains deployed on the MainNet. When testing or deploying on the TestNet, you can choose any available ID and move forward.

To get started, select the **EVM** template from the left-side menu. Then take the following steps:

1. In the **Project Details** section, provide your project's name, your contact email, and your Telegram
2. In the **Properties** section, enter the symbol of your Appchain's native token and your unique EVM chain ID. Decimal places are fixed to 18 digits, the same as Ether, to preserve compatibility across EVM tooling
3. Provide the Ethereum-style address of the account you want to use as the sudo account and its corresponding initial balance. This account will be able to dispatch privileged functions that require Root permissions. There can only be one sudo account at a time. The sudo account can be changed at any time to a new one by the current sudo account. Once the Appchain is launched, you can easily migrate to a fully decentralized system using specific democracy-related modules
4. (Optional) Press **Add** to add genesis accounts and balances. If you choose to skip this step, you can use the sudo account to create accounts and transfer funds at a later time
5. (Optional) Press **Add** to add genesis smart contracts by providing an address to use and the bytecode for the smart contract. When providing the bytecode, you'll need to remove the `0x` from the beginning of the bytecode
6. (Optional) You can adjust the gas configurations in the **Advanced** settings. You can choose to change the **Minimum Gas Price**, **Base fee per gas**, **Multiplier**, and **Elasticity**
7. Once you have configured the template for your Appchain, select **Continue** and proceed to the [Check Balances section](#check-balances)

![Create an EVM ContainerChain with the Tanssi dApp.](/images/builders/deploy/dapp/dapp-5.png)

### Substrate Template {: #substrate-template }

The [Substrate template](/builders/build/templates/overview/#baseline-appchain-template){target=\_blank} includes all the configurations for seamless integration with Tanssi and the Polkadot ecosystem. It can be used as the baseline specification to build a custom Appchain that is compatible with both Polkadot and Tanssi.

To get started, select the **Substrate** template from the left-side menu. Then take the following steps:

1. In the **Project Details** section, provide your project's name, your contact email, and your Telegram
2. Enter the token decimals and symbol for your native token and the [SS58 address format](https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json){target=\_blank}
3. Provide the Substrate-style address of the account you want to use as the sudo account and its initial balance. This account will be able to dispatch privileged functions that require Root permissions. There can only be one sudo account at a time. The sudo account can be changed at any time to a new one by the current sudo account. Once the Appchain is launched, you can easily migrate to a fully decentralized system using specific democracy-related modules
4. (Optional) You can add genesis accounts and balances. If you choose to skip this step, you can use the sudo account to create accounts and transfer funds at a later time
5. Once you have configured the template for your Appchain, you can select **Continue** to proceed to the [Check Balances section](#check-balances)

![Create a baseline Substrate ContainerChain with the Tanssi dApp.](/images/builders/deploy/dapp/dapp-6.png)

### Custom {: #custom }

If you already have a Substrate runtime built and have chosen to upload your own custom specification file, there are some requirements to be aware of that are necessary to ensure the runtime can evolve into a ContainerChain on Tanssi and run properly within the Polkadot ecosystem.

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

And, depending on whether you are deploying a Snap Appchain or a dedicated one, also adjust these attributes:

=== "Snap Appchain"

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

![Upload a custom raw specification file to the Tanssi dApp.](/images/builders/deploy/dapp/dapp-7.png)

!!! note
    The size of a raw chain specifications file should not exceed 2MB.

## Check Balances {: #check-balances }

Next, you'll need to verify that you have sufficient balances of DANCE and UNIT tokens. If you don't, you can press **Request Tokens** and complete the following login with GitHub or Google. You'll need to complete a few quick onboarding questions, and then you'll be able to press **Request Tokens** again, and they will be delivered to your connected wallet.

![Request tokens](/images/builders/deploy/dapp/dapp-8.png)

If you're setting up a dedicated Appchain, you'll need to manually request the necessary tokens via a [form on the Tanssi network website](https://www.tanssi.network/claim-dance-tokens){target=\_blank}, and you'll receive the necessary tokens within one business day. The required minimum balances to launch an Appchain are as follows: 

=== "Snap Appchain"
    |            Chain             | Balance Required |
    |:----------------------------:|:----------------:|
    | Flashbox Relay Chain Balance |     70 UNIT      |
    |  Flashbox Balance (Tanssi)   |    100 DANCE     |

=== "Dedicated Appchain"
    |            Chain             | Balance Required |
    |:----------------------------:|:----------------:|
    | Moonbase Relay Chain Balance |     110 UNIT     |
    |  Dancebox Balance (Tanssi)   |    100 DANCE     |

## Reserve your Appchain ID {: #reserve-appchain-id }

If you haven't already done so, you'll need to reserve your Appchain ID, which will be required to register your Appchain on the relay chain and function within the Polkadot ecosystem.

To reserve your Appchain ID, you'll need to submit a transaction. Please make sure to use the account you plan to launch your Appchain with when submitting the transaction.

1. To initiate the transaction, click on **Reserve Appchain ID**
2. Your wallet will pop up, and you'll need to submit the transaction

![Reserve your Appchain ID via the Tanssi dApp.](/images/builders/deploy/dapp/dapp-9.png)

Once the transaction has successfully gone through, your Appchain ID will be displayed on the dApp, and you'll be able to click **Continue** to proceed to the next step. You'll notice that on your Alphanet relay chain account, 20 UNIT tokens have been removed from your transferrable balance and are now reserved.

![Successfully reserved your Appchain ID via the Tanssi dApp.](/images/builders/deploy/dapp/dapp-10.png)

## Generate Your Appchain Files {: #generate-appchain-files }

Before you can deploy your Appchain, you'll need to generate four configuration files:

- [The raw chain specification](/builders/build/customize/customizing-chain-specs/#generating-raw-specs-file){target=\_blank} - a compact version of the JSON specification file, which defines the initial settings and state that all nodes participating in the network must agree on to reach consensus and produce blocks
- [The genesis state header](/builders/build/customize/customizing-chain-specs/#genesis-state){target=\_blank} - defines the initial state upon which all transactions and state transitions are executed
- [The genesis Wasm](/learn/framework/architecture/#runtime){target=\_blank} - a WebAssembly (Wasm) blob that defines the runtime logic

These files will automatically be generated for you based on your Appchain ID and your customized template configurations. All you need to do is click **Generate**, and the dApp will generate the required files for you.

![Generate your Appchain files with the click of a button on the Tanssi dApp.](/images/builders/deploy/dapp/dapp-11.png)

Once the files have been generated, please click **Continue** to go on to the final step.

## Deploy Your Appchain {: #deploy-your-appchain }

You're finally ready to take your last step towards preparing your Appchain as it evolves into a ContainerChain deployed through Tanssi! For this final step, you'll need to submit two transactions: one to register your Appchain on the relay chain and another to register your Appchain on Tanssi.

To register your Appchain on the relay chain, take the following steps:

1. Click **Register** under the **Register Appchain in Relay** section
2. Confirm the transaction in your wallet

![Register your Appchain on the relay chain.](/images/builders/deploy/dapp/dapp-12.png)

Once the transaction has gone through successfully, the dApp will update to show that you have successfully registered your Appchain under the **Register Appchain in Relay** section.

Lastly, to register your Appchain on Tanssi, take the following steps:

1. Click **Register** under the **Register Appchain in Tanssi** section
2. Confirm the transaction in your wallet

![Register your Appchain on Tanssi.](/images/builders/deploy/dapp/dapp-13.png)

Once the transaction has gone through successfully, the dApp will update to show that you have registered your Appchain. Congratulations! On the dashboard, you can check the status of your deployment and view relevant information, such as the latest block information, RPC and WS endpoints, and more.

![The ContainerChain dashboard on the Tanssi dApp.](/images/builders/deploy/dapp/dapp-14.png)

And that's it! You've successfully registered your Appchain! The launch process will automatically begin once the Tanssi team has verified your Appchain. Once your Appchain is live, you can return to the **Dashboard** to view the RPC URL and other pertinent chain information.
