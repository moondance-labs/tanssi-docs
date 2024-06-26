---
title: Smart EVM - Whitelist Smart Contract Deployments
description: Learn how to use Sudo to whitelist smart contract deployers for your Smart EVM Tanssi appchain, increasing overall security.
---

# Smart EVM - Whitelist Smart Contract Deployments

## Introduction {: #introduction }

EVM-compatible Tanssi appchains benefit from a unique feature: the appchain governor can define which accounts are authorized to deploy smart contracts, forbidding the action for any other non-whitelisted account.

This feature brings several key benefits that might be a great fit for different use cases or contexts. Some of those benefits are:

- **Enhanced Security** - by restricting deployment to trusted accounts, the risk of deploying malicious or vulnerable smart contracts is reduced
- **Quality Assurance** - known and vetted accounts can be required to follow specific coding standards and undergo thorough testing before deployment
- **Regulatory Compliance** - uses cases that are highly regulated can limit deployment to ensure that smart contracts meet legal and compliance requirements
- **Spam and Abuse Prevention** - prevent bad actors from deploying large numbers of unnecessary or harmful contracts

In this guide, you'll learn how to use the Sudo account to manage the whitelisted accounts that can deploy smart contracts on your appchain.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - An EVM-compatible Tanssi appchain (Snap or Dedicated) running [runtime 700](https://github.com/moondance-labs/tanssi/releases/tag/runtime-700){target=\_blank} or above. Any new appchain deployment based on the [EVM template](/builders/build/templates/evm/){target=\_blank} will do
 - Your appchain's Sudo account connected to your appchain's Polkadot.js Apps. You can refer to the [Managing Sudo guide](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} for instructions on injecting your Sudo account into Polkadot.js Apps

--8<-- 'text/builders/manage/locate-sudo-account.md'

## Getting Started {: #getting-started }

To follow the next sections of this guide, head to Polkadot.js Apps for your Tanssi appchain. The Polkadot.js Apps link for your Tanssi appchain can be found in your [Tanssi Dashboard](https://apps.tanssi.network){target=\_blank} underneath the **Tooling** section.

![Locating your Polkadot.js Apps Link on apps.tanssi.network](/images/builders/manage/developer-portal/smart-contracts-creation-filter/smart-contracts-creation-filter-1.webp)

Once in Polkadot.js Apps, navigate to the **Developer** tab and click on **Sudo**.

!!! note
    If you do not see **Sudo** in this menu, then you have not associated the Sudo account with Polkadot.js Apps. Make sure that your [Sudo account is injected by your wallet and connected to Polkadot.js Apps](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}.

## Whitelisting Accounts {: #whitelist-accounts }

To define the accounts that will have authorization to deploy smart contracts, [get your Polkadot.js Apps started](#getting-started) and then take the following steps:

1. Select the **parameters** pallet. **setParameter** will be automatically selected in the functions selector and **ContractDeployFilter** in the **keyValue** parameter
2. Two options will be available in the **ContractDeployFilter** selector: **AllowedAddressesToCreate** and **AllowedAddressesToCreateInner**. Select the **AllowedAddressesToCreate** option if you want to whitelist the accounts for smart contract deployments and the latter to whitelist the accounts for indirect  (via a smart contract call) smart contract deployments
3. Toggle the **Include option** switch
4. Select the **Whitelisted** option
5. Insert the whitelisted account
6. If you need to insert more than one account, click on **Add item**
7. Press **Submit Sudo** and confirm the transaction in your wallet

![Whitelisting Accounts](/images/builders/manage/developer-portal/smart-contracts-creation-filter/smart-contracts-creation-filter-2.webp)

These same steps can be repeated at any moment to remove an account from the whitelist or to add new ones.

## Restoring Permissions to Deploy Smart Contracts {: #restoring-permission}

If you previously authorized some accounts to deploy smart contracts and want to allow any account to deploy smart contracts (as long as they can cover regular transaction fees), then [get your Polkadot.js Apps started](#getting-started) and take the following steps:

1. Select the **parameters** pallet. **setParameter** will be automatically selected in the functions selector and **ContractDeployFilter** in the **keyValue** parameter
2. Two options will be available in the **ContractDeployFilter** selector: **AllowedAddressesToCreate** and **AllowedAddressesToCreateInner**. Select the **AllowedAddressesToCreate** option if you want to clear the whitelist for smart contract deployments and the latter to clear the whitelist for indirect  (via a smart contract call) smart contract deployments
3. Toggle the **Include option** switch
4. Select the **All** option
5. Press **Submit Sudo** and confirm the transaction in your wallet

![Clearing the Whitelisted Accounts](/images/builders/manage/developer-portal/smart-contracts-creation-filter/smart-contracts-creation-filter-3.webp)

## Query the Configuration {: #query-configuration }

To get the current configuration containing the whitelisted accounts that can deploy smart contracts, go to Polkadot.js Apps (as explained in the [Getting Started](#getting-started) section), navigate to the **Developer** tab, click on **Chain state**, and take the following steps:

1. Select the **parameters** storage
2. Select the **parameters(ContainerChainTemplateFrontierRuntimeParametersKey)** option
3. Make sure that the **Include option** switch is on
4. Make sure that the **ContractDeployFilter** option is selected
5. Two options will be available in the **ContractDeployFilter** selector: **AllowedAddressesToCreate** and **AllowedAddressesToCreateInner**. Select the **AllowedAddressesToCreate** option if you want to query the whitelist for smart contract deployments and the latter to query the whitelist for indirect (via a smart contract call) smart contract deployments
6. Click the **+** button
7. The current configuration will be displayed

![Query the Whitelists](/images/builders/manage/developer-portal/smart-contracts-creation-filter/smart-contracts-creation-filter-4.webp)