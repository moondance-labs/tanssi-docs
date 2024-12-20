---
title: Baseline EVM Template
description: The Tanssi repository includes an EVM template that provides all the necessary configurations to launch a network that is fully compatible with Ethereum.
icon: material-ethereum
---

# Baseline EVM Template {: #baseline-evm-template }

## Introduction {: #introduction }

Tanssi's EVM (Ethereum Virtual Machine) network template is designed for teams developing their applications on top of EVM smart contracts. It includes all the essential components needed for a full Ethereum-compatible network:

- **EVM** - adds an Ethereum Virtual Machine execution layer for EVM-based smart contract applications
- **Etherum JSON RPC Support** - Tanssi-powered EVM networks are fully [Ethereum JSON RPC](https://ethereum.org/en/developers/docs/apis/json-rpc){target=\_blank} compliant. Consequently, all Ethereum-based tools like [MetaMask](https://metamask.io){target=\_blank}, [Ethers.js](https://docs.ethers.org){target=\_blank}, [Viem](https://viem.sh){target=\_blank}, [Hardhat](https://hardhat.org){target=\_blank}, [Foundry](https://book.getfoundry.sh){target=\_blank} and more, work seamlessly out of the box
- **Unified Accounts** - allows Tanssi-powered EVM networks to feature Ethereum-styled ECDSA accounts

## EVM Network Template {: #evm-network-template }

The template already includes the necessary configuration for seamless integration with the Tanssi protocol and the security provider of choice, for example, [Symbiotic](https://symbiotic.fi/){target=\_blank} on Ethereum. Therefore, this template requires no additional changes in the runtime if the application is built on top of the EVM.

This means that this template is ready to be deployed as-is through Tanssi, unlocking many features, such as:

- Utilize Tanssi's [block production as a service](/learn/tanssi/technical-features/#block-production-as-a-service){target=\_blank}
- Get deterministic transaction finality in seconds
- Choose the security provider that best fits your needs. For example, leverage Ethereum-grade security from [Symbiotic](https://symbiotic.fi/){target=\_blank}
- Build dApps interacting with your network through an [API](/builders/toolkit/substrate-api/libraries/polkadot-js-api/){target=\_blank}
- Connect any Ethereum wallet, such as [Metamask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank} and Ledger
- Use well-known Ethereum libraries like [Ethers.js](/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank}, [Web3.js](/builders/toolkit/ethereum-api/libraries/web3js/){target=\_blank}, [Web3.py](/builders/toolkit/ethereum-api/libraries/web3py/){target=\_blank}, and more
- Deploy EVM smart contracts with tools like [Remix](https://remix.ethereum.org){target=\_blank}, [Hardhat](https://hardhat.org){target=\_blank}, [Foundry](https://github.com/foundry-rs/foundry){target=\_blank}, and more

## Included Modules {: #included-modules }

Besides the modules and configurations that make the Tanssi EVM network template compatible with the Tanssi protocol, it also includes [many modules](/builders/build/templates/overview/#included-modules){target=\_blank} to provide basic functionalities.

To reach full Ethereum compatibility, these specific modules are also included:

- **[EVM](https://docs.rs/pallet-evm/latest/pallet_evm){target=\_blank}** - it adds support for unmodified EVM bytecode execution on a Tanssi-powered network. It uses the Rust-based [SputnikVM](https://github.com/rust-ethereum/evm){target=\_blank} as the underlying EVM engine
- **[Ethereum](https://docs.rs/pallet-ethereum/latest/pallet_ethereum){target=\_blank}** - it works alongside the EVM module to provide full emulation for Ethereum block processing. Among many other tasks, it is responsible for creating emulated Ethereum blocks for Ethereum-specific components such as EVM logs

Both modules are part of the [Frontier](https://github.com/paritytech/frontier){target=\_blank} project, which is the backbone of Ethereum-compatible Tanssi-powered networks.
