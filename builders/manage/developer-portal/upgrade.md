---
title: Upgrade Your Appchain's Runtime
description: Learn how to use the Sudo account to perform the privileged action of upgrading the runtime of your Tanssi-powered appchain through the developer portal.
icon: octicons-arrow-up-24
categories: Appchain
---

# Upgrading Your Appchain Runtime with Sudo

## Introduction {: #introduction }

[Sudo](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/index.html){target=\_blank} is a module that enables privileged runtime calls to be dispatched when called from the Sudo account. Sudo is sometimes colloquially referred to as a superuser or god-like account. This enables you to perform privileged actions in the course of managing your appchain, such as upgrading your Tanssi-powered appchain's runtime.

In this guide, you'll learn how to use Sudo to upgrade your appchain's runtime. With Sudo access, upgrading your chain is a quick and easy process. Note that appchain teams in production will have the option to phase out Sudo access and rely on governance to process runtime upgrades.

## Checking Prerequisites {: #checking-prerequisites }

For the example in this guide, you will need to have the following:

 - A Tanssi-powered appchain (Quick Trial, Dedicated, or MainNet).
 - Your appchain's Sudo account connected to your appchain's developer portal. You can refer to the [Managing Sudo guide](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} for instructions on injecting your Sudo account into the developer portal.
 - The new [Wasm runtime](/learn/framework/architecture/#runtime){target=\_blank} binary file, built with a higher version than the current one.

--8<-- 'text/builders/manage/locate-sudo-account.md'

## Obtaining the Wasm Runtime {: #obtaining-wasm-runtime }

If your chain is based on one of the official templates, you can download the official Wasm runtime binary file from the table below. The official releases are published in the [releases section](https://github.com/moondance-labs/tanssi/releases){target\_blank} in the Tanssi repository.


|                                               Version                                                |                                                                             EVM Template                                                                              |                                                                            Substrate Template                                                                             |
|:----------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [1300](https://github.com/moondance-labs/tanssi/releases/tag/runtime-1300-templates){target=\_blank} | [Download EVM V1300 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1300-templates/frontier-template-runtime-1300.wasm){target=\_blank} | [Download Substrate V1300 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1300-templates/simple-template-runtime-1300.wasm){target=\_blank} |
| [1201](https://github.com/moondance-labs/tanssi/releases/tag/runtime-1201-templates){target=\_blank} | [Download EVM V1201 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1201-templates/frontier-template-runtime-1201.wasm){target=\_blank} | [Download Substrate V1201 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1201-templates/simple-template-runtime-1201.wasm){target=\_blank} |
| [1100](https://github.com/moondance-labs/tanssi/releases/tag/runtime-1100-templates){target=\_blank} | [Download EVM V1100 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1100-templates/frontier-template-runtime-1100.wasm){target=\_blank} | [Download Substrate V1100 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1100-templates/simple-template-runtime-1100.wasm){target=\_blank} |
| [1000](https://github.com/moondance-labs/tanssi/releases/tag/runtime-1000-templates){target=\_blank} | [Download EVM V1000 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1000-templates/frontier-template-runtime-1000.wasm){target=\_blank} | [Download Substrate V1000 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1000-templates/simple-template-runtime-1000.wasm){target=\_blank} |
|  [900](https://github.com/moondance-labs/tanssi/releases/tag/runtime-900-templates){target=\_blank}  |  [Download EVM V900 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-900-templates/frontier-template-runtime-900.wasm){target=\_blank}   |  [Download Substrate V900 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-900-templates/simple-template-runtime-900.wasm){target=\_blank}   |
|       [800](https://github.com/moondance-labs/tanssi/releases/tag/runtime-800){target=\_blank}       |       [Download EVM V800 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-800/frontier-template-runtime-800.wasm){target=\_blank}        |       [Download Substrate V800 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-800/simple-template-runtime-800.wasm){target=\_blank}        |
|       [700](https://github.com/moondance-labs/tanssi/releases/tag/runtime-700){target=\_blank}       |       [Download EVM V700 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-700/frontier-template-runtime-700.wasm){target=\_blank}        |       [Download Substrate V700 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-700/simple-template-runtime-700.wasm){target=\_blank}        |
|       [600](https://github.com/moondance-labs/tanssi/releases/tag/runtime-600){target=\_blank}       |       [Download EVM V600 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-600/frontier-template-runtime-600.wasm){target=\_blank}        |       [Download Substrate V600 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-600/simple-template-runtime-600.wasm){target=\_blank}        |
|       [500](https://github.com/moondance-labs/tanssi/releases/tag/runtime-500){target=\_blank}       |       [Download EVM V500 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-500/frontier-template-runtime-500.wasm){target=\_blank}        |       [Download Substrate V500 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-500/simple-template-runtime-500.wasm){target=\_blank}        |
|  [400](https://github.com/moondance-labs/tanssi/releases/tag/runtime-400-templates){target=\_blank}  |  [Download EVM V400 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-400-templates/frontier-template-runtime-400.wasm){target=\_blank}   |  [Download Substrate V400 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-400-templates/simple-template-runtime-400.wasm){target=\_blank}   |
|  [300](https://github.com/moondance-labs/tanssi/releases/tag/templates-runtime-300){target=\_blank}  |  [Download EVM V300 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/templates-runtime-300/frontier-template-runtime-300.wasm){target=\_blank}   |  [Download Substrate V300 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/templates-runtime-300/simple-template-runtime-300.wasm){target=\_blank}   |
|       [200](https://github.com/moondance-labs/tanssi/releases/tag/runtime-200){target=\_blank}       |       [Download EVM V200 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-200/frontier-template-runtime-200.wasm){target=\_blank}        |       [Download Substrate V200 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-200/simple-template-runtime-200.wasm){target=\_blank}        |
|  [101](https://github.com/moondance-labs/tanssi/releases/tag/runtime-101-templates){target=\_blank}  |  [Download EVM V101 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-101-templates/frontier-template-runtime-101.wasm){target=\_blank}   |  [Download Substrate V101 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-101-templates/simple-template-runtime-101.wasm){target=\_blank}   |
|  [100](https://github.com/moondance-labs/tanssi/releases/tag/runtime-100-templates){target=\_blank}  |  [Download EVM V100 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-100-templates/frontier-template-runtime-100.wasm){target=\_blank}   |  [Download Substrate V100 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-100-templates/simple-template-runtime-100.wasm){target=\_blank}   |

You should always upgrade the runtime following the releases in an orderly fashion, applying one release after another without skipping any of them. To do so, you need to know your appchain's current runtime version, which you'll find in your [Tanssi Dashboard](https://apps.tanssi.network){target=\_blank} underneath the **Properties** section. For example, if your runtime version is `1000`, you should upgrade first to `1100`, then `1201`, then `1300`, and so on until the latest available version.

!!! warning
    Applying the upgrades in order ensures that the changes (migrations) in the internal data structures are applied, preserving data consistency. Doing otherwise might **stall** your appchain.

!!! note
    If you are compiling the runtime manually, make sure to use the Wasm version `compact` and `compressed`, which is optimized and lighter.

## Upgrading Your Runtime {: #upgrading-your-runtime }

To get started, head to the developer portal for your Tanssi appchain. The developer portal link for your Tanssi appchain can be found in your [Tanssi Dashboard](https://apps.tanssi.network){target=\_blank} underneath the **Tooling** section.

![Locating your Developer Portal Link on apps.tanssi.network](/images/builders/manage/developer-portal/upgrade/upgrade-1.webp)

!!! warning
    If your appchain was deployed using an official template and the intended upgrade is a custom runtime, make sure to have changed the default spec name (*frontier-template* or *container-chain-template*) to a different one before building the Wasm file. You'll also need to execute the `setCodeWithoutChecks` extrinsic instead of `setCode`.

With your [Wasm runtime](/learn/framework/architecture/#runtime){target=\_blank} ready to upload and your [Sudo account accessible in the Developer Portal](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}, take the following steps:

1. Navigate to the **Developer** Tab of the developer portal for your Tanssi appchain.
2. Click on **Sudo**. If you do not see **Sudo** in this menu, then you have not associated the Sudo account with the developer portal. Make sure that your [Sudo account is injected by your wallet and connected to the developer portal](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}.
3. Select the **system** pallet.
4. Select **setCode**.
5. Toggle the **fileUpload** switch to enable uploading your Wasm runtime file.
6. Upload your Wasm runtime.
7. Press **Submit Sudo** and confirm the transaction in your wallet.

![Upgrading your Runtime on the Developer Portal](/images/builders/manage/developer-portal/upgrade/upgrade-2.webp)

You can verify that your runtime upgrade was successful by checking the runtime version in the upper left-hand corner. In this case, we can see that the Tanssi-powered appchain's runtime was successfully upgraded to version `400`.

![Check Runtime version on Polkadot.js Apps](/images/builders/manage/developer-portal/upgrade/upgrade-3.webp)

And that's it! The [Developer Portal](/builders/manage/developer-portal/) section has plenty more guides on how to manage your Tanssi appchain.

--8<-- 'text/_disclaimers/third-party-content.md'
