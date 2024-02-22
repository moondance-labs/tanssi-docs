---
title: Staking
description: Learn how Tanssi implements a novel Staking mechanism to provide a decentralized and trustless set of block producers to all Tanssi-powered Appchains
---

# Tanssi Staking {: #tanssi-staking }

## Introduction {: #introduction }

One of Tanssi's core propositions is to simplify the infrastructure complexity for Appchains. A significant component is bootstrapping a decentralized set of block producers, which Tanssi offers through its unique architecture and staking mechanics.

Tanssi staking mechanics guarantees that the block producers for Tanssi and Tanssi-powered Appchains are selected through a trustless and decentralized mechanism.

At a high level, in Tanssi's staking module, each block producer has a delegation pool to which community members can delegate their tokens into. Then, the protocol issues a protocol-level token that represents the percentage of your stake as a delegator, for that specific pool per block producer. This novel staking mechanism is similar to LP tokens in traditional Automated-Market-Makers (AMMs) like Uniswap V2. Nevertheless, one core difference is that LP tokens in common AMMs are transferable, while staking shares tokens are not.

This page covers the fundamental concepts of Tanssi's staking mechanics and how it secures a decentralized block production set that drives network liveliness for Tanssi Appchains.

## Core Concepts {: #core-Concepts}

Tanssi's staking module was inspired on the concept if liquidity pool tokens (LP tokens) in traditional Automated-Market-Makers (AMMS) like Uniswap V2.

Each block producer has four different set of liquidity pools that people can stake into. Each liquidity pool represents a different state throughout the staking process: joining, staking through manual rewards, staking through auto-compounded rewards, and leaving.
