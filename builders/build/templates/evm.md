---
title: Baseline EVM Template
description: The Tanssi repository includes an EVM template that provides all the necessary configurations to launch an appchain that is fully compatible with Ethereum.
---

# Baseline EVM (Ethereum Virtual Machine) Template {: #baseline-evm-template }

## Introduction {: #introduction }

Tanssi's EVM appchain template is specifically designed for teams developing their applications on top of an EVM (Ethereum Virtual Machine). It contains all the essential parts to add the extra layer of Ethereum compatibility to a Substrate node:

- **EVM** - adds a Rust-based Ethereum Virtual Machine execution layer for EVM-based smart contract applications
- **Etherum JSON RPC Support** - Tanssi EVM appchains are fully [Ethereum JSON RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/){target=\_blank} compliant. Consequently, all Ethereum-based tools like [MetaMask](https://metamask.io/){target=\_blank}, [Ethers.js](https://docs.ethers.org/){target=\_blank}, [Viem](https://viem.sh/){target=\_blank}, [Hardhat](https://hardhat.org/){target=\_blank}, [Foundry](https://book.getfoundry.sh/){target=\_blank} and more, work seamlessly out of the box
- **Unified Accounts** - allows Tanssi EVM appchains to feature Ethereum-styled ECDSA accounts instead of Substrate-native accounts

## EVM Appchain Template {: #evm-appchain-template }

Since the template already contains the necessary configuration for seamless integration into the Polkadot ecosystem and Tanssi protocol compatibility, if the use case is entirely developed on top of the EVM, then this template requires no additional changes in the runtime.

This means that this template is ready to be built as-is and deployed through Tanssi, unlocking many features, such as:

- Utilize Tanssi's [block production as a service](/learn/tanssi/technical-features/#block-production-as-a-service){target=\_blank}
- Use [Polkadot's finality gadget](https://wiki.polkadot.network/docs/learn-consensus#finality-gadget-grandpa){target=\_blank}
- Benefit from [Polkadot's shared security model](https://wiki.polkadot.network/docs/learn-parachains#shared-security){target=\_blank}
- Use the [Polkadot.js API](/dapp-developers/developer-toolkit/substrate-api/polkadot-js-api){target=\_blank} to interact with the Substrate API
- Connect any Ethereum wallet, such as [Metamask](/dapp-developers/developer-toolkit/ethereum-api/wallets/metamask/){target=\_blank} and Ledger
- Use well-known Ethereum libraries like [Ethers.js](/dapp-developers/developer-toolkit/ethereum-api/libraries/ethersjs){target=\_blank}, [Web3.js](/dapp-developers/developer-toolkit/ethereum-api/libraries/web3js){target=\_blank}, [Web3.py](/dapp-developers/developer-toolkit/ethereum-api/libraries/web3py/){target=\_blank}, and more
- Deploy EVM smart contracts with tools like [Remix](https://remix.ethereum.org/){target=\_blank}, [Hardhat](https://hardhat.org/){target=\_blank}, [Foundry](https://github.com/foundry-rs/foundry){target=\_blank}, and more


## Included Modules {: #included-modules }

Besides the modules and configurations that make the Tanssi EVM appchain template compatible with the Tanssi protocol, it also includes [many modules](/builders/build/templates/overview/#included-modules){target=\_blank} to provide basic functionalities.

To reach full Ethereum compatibility, these specific modules are also included:

- **[pallet_evm](https://docs.rs/pallet-evm/latest/pallet_evm/){target=\_blank}** - the EVM pallet allows for unmodified EVM bytecode to be executed in a Substrate-based blockchain. It uses the Rust-based [SputnikVM](https://github.com/rust-ethereum/evm){target=\_blank} as the underlying EVM engine
- **[pallet_ethereum](https://docs.rs/pallet-ethereum/latest/pallet_ethereum/){target=\_blank}** - the Ethereum pallet works together with the EVM pallet to provide full emulation for Ethereum block processing. Among many other tasks, it is responsible for creating emulated Ethereum blocks for Ethereum-specific components such as EVM logs

Both modules are part of [Frontier](https://github.com/paritytech/frontier){target=\_blank}, which is the backbone of Ethereum-compatible Substrate-based chains.
