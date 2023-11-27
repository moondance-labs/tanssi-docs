---
title: Baseline EVM Template
description: The Tanssi repository includes an EVM template that provides all the necessary configurations to launch an Appchain that is fully compatible with Ethereum.
---

# Baseline EVM (Ethereum Virtual Machine) Template {: #baseline-evm-template }

## Introduction {: #introduction }

For teams developing their applications on top of an EVM (Ethereum Virtual Machine), this template is a foundational starting point. It contains all the essential modules to add the extra layer of Ethereum compatibility to a Substrate node:

- **`EVM`** - adds the execution layer for Ethereum apps
- **`Ethereum`** - adds the Ethereum block production emulation to allow the RPC nodes (and DApps) to run without any modification
- **`EVMChainId`** - stores the chain identifier that identifies the Ethereum network

Since the template already contains the necessary configuration for seamless integration into the Polkadot ecosystem and for Tanssi protocol compatibility, if the use case is entirely developed on top of the EVM, then this template requires no additional changes in the runtime.

This means that this template is ready to be built as-is and deployed through Tanssi, unlocking many features, such as:

- Utilize Tanssi's [block production as a service](/learn/tanssi/technical-features/#block-production-as-a-service){target=_blank}
- Connect any Ethereum wallet, such as [Metamask](/builders/interact/ethereum-api/wallets/metamask/){target=_blak} and Ledger
- Use well-known Ethereum libraries like [Ethers.js](/builders/interact/ethereum-api/libraries/ethersjs){target=_blank}, [Web3.js](/builders/interact/ethereum-api/libraries/web3js){target=_blank}, [Web3.py](/builders/interact/ethereum-api/libraries/web3py/){target=_blank}, and more
- Deploy EVM smart contracts with tools like [Remix](https://remix.ethereum.org/){target=_blank}, [Hardhat](https://hardhat.org/){target=_blank}, [Foundry](https://github.com/foundry-rs/foundry){target=_blank}, and more
- Use [Polkadot's finality gadget](https://wiki.polkadot.network/docs/learn-consensus#finality-gadget-grandpa){target=_blank}
- Benefit from [Polkadot's shared security model](https://wiki.polkadot.network/docs/learn-parachains#shared-security){target=_blank}
- Use the [Polkadot.js API](/builders/interact/substrate-api/polkadot-js-api){target=_blank} to interact with the Substrate API
