---
title: Foreign Assets as ERC-20
description: Learn how to access and interact with an ERC-20 representation of any foreign assets on Tanssi EVM appchains through the precompiled ERC-20 Interface.
keywords: solidity, ethereum, native, token, moonbeam, precompiled, contracts, assets, erc20
---

# Foreign Assets as ERC-20

## Introduction {: #introduction }

As presented in the [Native Cross-Chain Communication](/learn/framework/xcm){target=\_blank} article, appchains deployed through Tanssi can communicate and interoperate with any other appchain in the ecosystem. This multi-chain environment leads to a multi-asset world, where seamless transfer of assets, data, and value across different networks widen the possibilities to develop use cases accross different industries such as finance (DeFi), real world assets (RWAs), and others.

Foreign assets are tokens native to other appchain, or, in other words, assets whose reserve chain is another blockchain. An appchain can register a foreign asset to enable the liquidity flow to and from its native chain. To do so, the first step is to [establish an XCM channel](/learn/framework/xcm/#channel-registration){target=\_blank}, and then register the foreign asset to create a representation that can be treated as a local one.

The [ERC-20 assets precompile](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20Instance.sol){target=\_blank} allows any appchain based on the Tanssi EVM template to access any registered foreign asset through a standard ERC-20 interface.

The address representing the ERC-20 contract is the following:

```text
{{networks.dancebox.precompiles.foreign_assets_erc20}}
```

Note that the last four positions (two bytes) must be replaced with the hexadecimal representation of the registered asset identifier. For example, for the asset whose ID is `1`, those four positions are `0001`, and for the asset with an ID of `10`, those four positions are `000A`.

## Prerequisites {: #prerequisites }

To follow the examples in this guide, you'll need access to and EVM appchain

- An EVM appcha
sudo
- Register a channel, register an asset

-add erc20 to metamask


--8<-- 'text/_disclaimers/third-party-content.md'