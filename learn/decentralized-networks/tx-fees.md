---
title: Transaction Fees
description: Learn about the transaction fee mechanism in Tanssi networks, how it works from a Substrate perspective, and in the Ethereum EVM emulation layer with EIP-1559.
icon: material-piggy-bank-outline 
categories: Basics
---

# Transaction Fees {: #transaction-fees }

## Introduction {: #introduction}

Tanssi-powered networks are built with a [modular framework](/learn/framework/){target=\_blank} called [Substrate](https://substrate.io){target=\_blank}. With this framework, you can build unique ways to handle transaction fees. For example, most transactions use a specific module called [Transaction Payment](https://docs.rs/pallet-transaction-payment/latest/pallet_transaction_payment){target=\_blank}. However, transaction fees on Tanssi-powered EVM-compatible networks can be charged at an EVM execution level, bypassing other fee-related modules.

Under the hood, for execution time, instead of working with a gas-based mechanism, all Tanssi networks work with a [weight-based mechanism](https://docs.substrate.io/build/tx-weights-fees){target=\_blank}. Weight refers to the time (in picoseconds) it takes to validate a block. Generally speaking, for both EVM and non-EVM Tanssi networks, all function calls have a weight associated with them, which sets limits on storage input/output and computation. For Tanssi EVM networks, there is a gas-to-weight mapping that fully complies with the expected gas requirements for Ethereum API-based tools.

A transaction fee scheme is applied on top of the weight-based mechanism to ensure economic incentives are in line to limit the execution time, computation, and number of calls (database read/writes) to perform operations. Transaction fees are fundamental to preventing network spam, as they represent the cost of using the Tanssi network service. Consequently, a user interacting with the network through a specific function call will pay a transaction fee determined by a baseline fee algorithm.

This page covers the fundamentals of transaction fees for Tanssi networks. It first covers the underlying transaction fee architecture and how it is adapted to a fully EIP-1559-compliant model for Tanssi EVM networks.

## Baseline Fees Calculation {: #baseline-fees }

Every action that alters the state of a Tanssi network incurs a transaction fee. This fee is essential for the network's operation, covering the computational resources required to process transactions, similar to the gas and gas price parameters in EVM-compatible chains like Ethereum.

Tanssi networks [modular framework](/learn/framework/){target=\_blank} use a weight-based fee calculation mechanism to determine transaction fees. This approach considers various factors, including computational resources and storage operations (inputs/outputs), to reflect the true cost of transactions accurately. By accounting for these elements, the network ensures fair and efficient resource allocation.

Furthermore, Tanssi networks modularity ensures that EVM-compatible networks support legacy and [EIP-1559 compatible](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} transaction pricing mechanisms, ensuring full compatibility with development environments commonly used in Ethereum.

This section outlines all the different concepts associated with transaction fees for Tanssi networks.

### Weight {: #baseline-weight}

Broadly speaking, weight refers to the execution time it takes to validate a block, measured in picoseconds. Weight is divided into two separate variables:

- **`refTime`** - corresponds to the weight associated with computation time and database reads/writes
- **`proofSize`** - corresponds to the weight associated with the size of the Proof-Of-Validity (or PoV for short). The PoV is associated with the relevant state of a transaction, and it is what the Tanssi network sequencer shares with the security provider operators to get a block validated and finalized as part of the [network transaction flow](/learn/decentralized-networks/overview/#network-transaction-flow){target=\_blank}

To find the weights for all function calls, they are benchmarked in a system with reference hardware, and the approximate values of `refTime` and `proofSize` are set. This process is repeated for all function calls that consume blockspace and affect the PoV.

For transactions in which the fees are handled by the [transaction payment](https://docs.rs/pallet-transaction-payment/latest/pallet_transaction_payment){target=\_blank} module, all weight-based parameters are then passed through a _weight to fee_ algorithm that converts all to a final value, deducted from the sender's account when executing the function call. The algorithm can be customized, but Tanssi networks have a constant value set.

For EVM transactions, gas is converted to weight through a gas-to-weight algorithm so that all EVM calls can be mapped to block execution time. Nevertheless, fees are handled at an EVM execution level.

### Baseline Transaction Fees {: #baseline-transaction-fees}

<!-- https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/transaction-payment/src/lib.rs#L627-L652 -->

With all function calls benchmarked, the transaction fee for each specific call can be obtained. Transaction fees are typically comprised of the following elements:

- **`BaseFee`** - baseline cost for a transaction to be included. It accounts for the transaction inclusion overhead, like signature verification. The fee is defined by two separate parameters:
    - **`ExtrinsicBaseWeight`** - a constant value that represents the weight of the transaction inclusion overhead
    - **`WeightToFee`** - a polynomial function that converts weight to fee
- **`WeightFee`** - fee defined by two separate parameters:
    - **`BenchmarkedWeight`** - weight that accounts for the complexity (execution time) of a specific call
    - **`CongestionMultiplier`** - a function that converts weight to fee and can be adjusted to account for the congestion of the network (weight consumed in the previous block). The default strategy for Tanssi networks is [`SlowAdjustingFeeUpdate`](https://research.web3.foundation/Polkadot/overview/token-economics#2-slow-adjusting-mechanism){target=\_blank}, which adjusts this multiplier slowly over time following the network load
- **`LengthFee`** - a fee correlated to the length in bytes of the function call. The fee is defined by two separate parameters:
    - **`ByteLengthFunctionCall`** - length in bytes of the call being executed
    - **`LengthToFee`** - a function that defines the per-byte fee algorithm. For Tanssi networks, this is a constant value
- **`Tip`** - an optional value that increases the overall fee, increasing the priority of the transaction by incentivizing sequencers to include it in the next block

Therefore, in general terms, the transaction fee can be calculated with the following equation:

<!-- https://github.com/moondance-labs/substrate/blob/master/frame/support/src/weights/extrinsic_weights.rs#L57 -->
<!-- https://github.com/moondance-labs/tanssi/blob/master/container-chains/templates/frontier/runtime/src/lib.rs#L265-L277 -->

```text
BaseFee = ExtrinsicBaseWeight * WeightToFee
WeightFee = BenchmarkedWeight  * CongestionMultiplier
LengthFee = ByteLengthFunctionCall * LengthToFee

InclusionFee = BaseFee + WeightFee + LengthFee
FinalFee = InclusionFee + Tip
```

All non-EVM function calls available to developers use these baseline calculations for transaction fees. Tanssi EVM networks have an extra layer to translate this fee scheme into an Ethereum-like scheme from an Ethereum JSON-RPC and EVM perspective. 

### EVM Transaction Fees {: #evm-transaction-fees }

<!-- https://github.com/polkadot-evm/frontier/blob/272fe8839f87161ed89350de166b379f1f4c6136/frame/base-fee/src/lib.rs#L126-L199 -->

Tanssi offers [templates for full Tanssi EVM-compatible networks](/builders/build/templates/evm/){target=\_blank}. Such networks provide an Ethereum-like environment for developers, where they can use Eth-specific libraries like [Ethers.js](/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank}, [Hardhat](/builders/toolkit/ethereum-api/dev-env/hardhat/){target=_blank}, and [Foundry](/builders/toolkit/ethereum-api/dev-env/foundry/){target=\_blank}.

In addition, all Tanssi EVM-compatible networks have an [EIP-1559 compatible](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} transaction pricing mechanism for EVM transactions. But they support both commonly used EVM transaction types:

- **Type 0 (Legacy)** - the transaction fee is calculated through a single gas price value that is included in the signed transaction blob. Because Tanssi EVM-compatible networks have a dynamic pricing mechanism, gas price must be greater than the current block's `baseFee` for a transaction to be considered valid
- **Type 2 (EIP-1559)** - the transaction fee is calculated with a combination of the `maxFeePerGas` and `maxPriorityFeePerGas` from the signed transaction blob, and the network's `baseFee` dynamically changes based on block congestion

Independently of the transaction type, the outcome of all EVM transactions is that there is an associated cost in native tokens that the network must charge. 

By default, Tanssi EVM-compatible networks are configured with the following parameters:

- **Minimum BaseFee** - the minimum gas price of the network in case there are no transactions for long periods. The default value is set to 1 GWei
- **Block Fulness Target (Elasticity)** - the target gas used in a block so that the `baseFee` remains the same. [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} defines this value as a constant set to 2, meaning that the target usage is 50% of the block gas limit. All Tanssi EVM-compatible networks are set with the same target
- **Maximum BaseFee Increase** - the maximum amount the `baseFee` can increase or decrease, in percent points, based on the previous block target usage. [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} defines this value as a constant set to 12.5%. Consequently, if the block is full/empty, the `baseFee` will increase/decrease by 12.5%, and any intermediate values are linearly adjusted. Developers can configure this value for Tanssi EVM-compatible networks, but the default value is 12.5%

!!! note
    One key difference in Tanssi EVM-compatible networks EIP-1559 implementation is that the transaction fees are calculated using the previous block `baseFee`.

The EVM transaction fee cost associated with all Tanssi EVM-compatible networks is captured at an EVM execution level. Nevertheless, EVM transactions do take block execution time. Therefore a gas-to-weight algorithm is required to account for the weight consumed by a specific call relative to the gas it is consuming.

<!-- https://github.com/moondance-labs/tanssi/blob/master/container-chains/templates/frontier/runtime/src/lib.rs#L825 -->
<!-- https://github.com/polkadot-evm/frontier/blob/272fe8839f87161ed89350de166b379f1f4c6136/primitives/evm/src/lib.rs#L253-L265 -->

Ultimately, the transaction fee and weight associated to an EVM call in a Tanssi EVM-compatible network can be calculated with the following formula:

=== "EIP-1559"
    ```text
    Gas Price = baseFee + maxPriorityFeePerGas < maxFeePerGas ? 
               baseFee + maxPriorityFeePerGas : 
               maxFeePerGas;
    Transaction Fee = Gas Price * Gas Used
    Transaction Weight = Gas Used * GasToWeight
    ```

=== "Legacy"
    ```text
    Transaction Fee = GasPrice * GasUsed
    Transaction Weight = GasUsed * GasToWeight
    ```

`GasToWeight` is a constant value set to `{{ networks.dancebox.gas_to_weight }}`.
