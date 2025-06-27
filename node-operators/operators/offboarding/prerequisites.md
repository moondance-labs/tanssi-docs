---
title: Prerequisites for Offboarding
description: Before offboarding your Tanssi operator, ensure you have wallet access and sufficient ETH for gas. This guide outlines crucial prerequisites.
icon: octicons-arrow-down-right-24
template: main.html
---

# Prerequisites for Offboarding

## Introduction {: #introduction }

Operator offboarding is the formal process by which node operators safely and transparently exit the Tanssi protocol. It ensures network integrity, security, and stability by providing clear steps for operators who wish to cease participation.

Operators play a critical role in consensus and network operations. Abruptly shutting down a node without following the proper procedures can negatively impact operators, potentially resulting in slashing.

This guide outlines the **prerequisites** for offboarding, and subsequent guides will walk you through the process.

If you have questions during any part of the offboarding process, the Tanssi team can support you on [Discord](https://discord.com/invite/Jm2KH8xT7J){target=\_blank}.

## Prerequisites {: #prerequisites}

Before starting the offboarding process, ensure you have the following:

- Access to the Ethereum (EVM) wallet that controls your operator account
- Sufficient ETH in your wallet to cover gas fees for transactions

### Why Smart Contract Interaction is Required {: #why-smart-contracts }

Like many decentralized systems, the Tanssi protocol utilizes smart contracts on the Ethereum blockchain to manage critical operations, including operator registration and staking. When an operator decides to offboard, they change their status and relationship with these core protocol contracts.
Key offboarding steps, such as signaling your intent to exit or formally unregistering, involve transactions that update the state recorded in these smart contracts.

### Interaction Methods

--8<-- 'text/node-operators/operators/onboarding/run-an-operator/prerequisites.md'
