---
title: Transaction Fees
description: Learn about the transaction fee mechanism in Tanssi Appchains, how it works from a Substrate perspective, and in the Ethereum EVM emulation layer with EIP-1559
---

# Transaction Fees {: #transaction-fees }

## Introduction {: #introduction}

Tanssi Appchains are built with a [modular framework](/learn/framework/){target=\_blank} called [Substrate](https://substrate.io/){target=\_blank}. With this framework, you can build unique ways to handle transaction fees. For example, most transactions use a specific module called [Transaction Payment](https://docs.rs/pallet-transaction-payment/latest/pallet_transaction_payment/){target=\_blank}. However, Tansi EVM-compatible Appchains transaction fees can be charged at an EVM execution level, bypassing other fee-related modules.

Under the hood, for execution time, instead of working with a gas-based mechanism, all Tanssi Appchains work with a [weight-based mechanism](https://docs.substrate.io/build/tx-weights-fees/){target=\_blank}. Weight refers to the time (in picoseconds) it takes to validate a block. Generally speaking, for both EVM and non-EVM Tanssi Appchains, all function calls have a weight associated with them, which sets limits on storage input/output and computation. For EVM Appchains, there is a gas-to-weight mapping that fully complies with the expected gas requirements for Ethereum API-based tools.

A transaction fee scheme is applied on top of the weight-based mechanism to ensure economic incentives are in line to limit the execution time, computation, and number of calls (database read/writes) to perform operations. Transaction fees are fundamental to preventing network spam, as they represent the cost of using the Appchain service. Consequently, a user interacting with the network through a specific function call will pay a transaction fee by a baseline fee algorithm.

This section covers the fundamentals of transaction fees for Tanssi Appchains. It first covers the underlying transaction fee architecture and how it is adapted to a fully EIP-1559-compliant model for EVM Appchains.


## Baseline Fees Calculation {: #baseline-fees }

Any call that modifies the state of an Appchain has a transaction fee associated with it. This fee is usually associated with the execution cost of the transaction, like _gas_ and _gasPrice_ in EVM-compatible chains. 

Tanssi Appchains use a weight-based mechanism for fees of the [modular framework](/learn/framework/){target=\_blank} also accounts for storage input/outputs. However, Tanssi EVM-compatible Appchains support legacy and [EIP-1559 compatible](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} transaction pricing mechanisms.

This section outlines all the different concepts associated with transaction fees for Tanssi Appchains.

### Weight {: #baseline-weight}

Broadly speaking, weight refers to the execution time it takes to validate a block, measured in picoseconds. Weight is divided into two separate variables:

- **refTime** - corresponds to the weight associated with computation time and database reads/writes
- **proofSize** - corresponds to the weigth associated to the size of the _Proof-Of-Validity_ (or _PoV_ for short). The _PoV_ is associated with the relevant state of a transaction, and it is what the Appchain block producer shares with the relay chain validator to get its block finalized as part of the [Appchain transaction flow](/learn/appchains/overview/#appchain-transaction){target=\_blank}

To find the weights for all function calls, they are benchmarked in a system with reference hardware, and the approximate values of _refTime_ and _proofSize_ are set. This process is repeated for all function calls that consume blockspace and affect the _PoV_.

For transactions in which the fees are handled by [Transaction Payment](https://docs.rs/pallet-transaction-payment/latest/pallet_transaction_payment/){target=\_blank} module, all weight-based parameters are then passed through a _WeightToFee_ algorithm that converts all to a final value, deducted from the sender's account when executing the function call. The algorithm can be customized, but Tanssi Appchains have a constant value set.

For EVM transactions, gas is converted to weight through a _GastoWeight_ algorithm so that all EVM calls can be mapped to block execution time. Nevertheless, fees are handled at an EVM execution level.

### Baseline Transaction Fees {: #baseline-transaction-fees}

<!-- https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/transaction-payment/src/lib.rs#L627-L652 -->

With all function calls benchmarked, the transaction fee for each specific call can be obtained. Transaction fees are typically comprised of the following elements:

- **Base Fee** - baseline cost for a transaction to be included. It accounts for the transaction inclusion overhead, like signature verification. Two separate parameters define it:
    - **ExtrinsicBaseWeight** - a constant value that represents the weight of the transaction inclusion overhead
    - **WeightToFee** - a polynomial function that converts weight to fee
- **Weight Fee** - fee defined by two separate parameters:
    - **Benchmarked Weight** - weight that accounts for the complexity (execution time) of a specific call
    - **Congestion Multiplier** - a function that converts weight to fee and can be adjusted to account for the congestion of the network (weight consumed in the previous block). For Tanssi Appchains, this is a constant
- **Length Fee** - a function that defines the per-byte fee (_LenghtToFee_) correlated to the length in bytes of the function call. It can range from a constant to a cubic curve. For Tanssi Appchains, this is a constant
- **Tip** - an optional value that increases the overall fee, increasing the priority of the transaction by incentivizing block producers to include it in the next block

Therefore, in general terms, the transaction fee can be calculated with the following equation:

<!-- https://github.com/moondance-labs/substrate/blob/master/frame/support/src/weights/extrinsic_weights.rs#L57 -->
<!-- https://github.com/moondance-labs/tanssi/blob/master/container-chains/templates/frontier/runtime/src/lib.rs#L265-L277 -->

```
BaseFee = ExtrinsicBaseWeight * WeightToFee
WeightFee = BenchmarkedWeight  * CongestionMultiplier
LengthFee = ByteLenghtFunctionCall * LengthToFee

InclusionFee = BaseFee + WeightFee + LenghtFee
FinalFee = InclusionFee + Tip
```

All non-EVM function calls available to developers use these baseline calculations for transaction fees. EVM Tanssi Appchains have an extra layer to translate this fee scheme into an Ethereum-like scheme from an Ethereum JSON RPC and EVM perspective. 

### EVM Transaction Fees

<!-- https://github.com/polkadot-evm/frontier/blob/272fe8839f87161ed89350de166b379f1f4c6136/frame/base-fee/src/lib.rs#L126-L199 -->

Tanssi offers [templates for full EVM-compatible Appchains](/builders/build/templates/evm/){target=\_blank}. Such Appchains provide an Ethereum-like environment for developers, where they can use Eth-specific libraries like [Ethers.js](/builders/interact/ethereum-api/libraries/ethersjs/){target=\_blank}, [Hardhat](/builders/interact/ethereum-api/dev-env/hardhat/){target=_blank}, and [Foundry](/builders/interact/ethereum-api/dev-env/foundry/){target=\_blank}.


In addition, all Tansis EVM-compatible Appchains have an [EIP-1559 compatible](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} transaction pricing mechanism for EVM transactions. But they support both commonly used EVM transaction types:

- **Type 0 (Legacy)** - the transaction fee is calculated through a single _gasPrice_ value that is included in the signed transaction blob. Because Tanssi EVM-compatible Appchains have a dynamic pricing mechanism, _gasPrice_ must be greater than the current block _baseFee_ for a transaction to be considered valid
- **Type 2 (EIP-1559)** - the transaction fee is calculated with a combination of the _maxFeePerGas_ and _maxPriorityFeePerGas_ from signed transaction blob, and the network's _baseFee_ dynamically changes based on block congestion

Independently of the transaction type, the outcome of all EVM transactions is that there is an associated cost in native tokens that the network must charge. 

By default, Tanssi EVM-compatible Appchains are configured with the following parameters:

- **Minimum BaseFee** - the minimum gas price of the network in case there are no transactions for long periods. The default value is set to 1 _GWei_
- **Block Fulness Target (Elasticity)** - the target gas used in a block so that the _baseFee_ remains the same. [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} defines this value as a constant set to 2, meaning that the target usage is 50% of the block gas limit. All Tanssi EVM-compatible Appchains are set with the same target
- **Maximum BaseFee Increase** - the maximum amount the _baseFee_ can increase or decrease, in percent points, based on the previous block target usage. [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} defines this value as a constant set to 12.5\%. Consequently, if the block is full/empty, the _baseFee_ will increase/decrease by 12.5\%, and any intermediate values are linearly adjusted. Developers can configure this value for Tanssi EVM-compatible Appchains, but the default value is 12.5\%

!!! note
    One key difference in Tanssi EVM-compatible Appchains EIP-1559 implementation is that the transaction fees are calculated using the previous block _baseFee_.

The EVM transaction fee cost associated with all Tanssi EVM-compatible Appchains is captured at an EVM execution level. Nevertheless, EVM transactions do take block execution time. Therefore a _GasToWeight_ algorithm is required to account for the weight consumed by a specific call relative to the gas it is consuming.

<!-- https://github.com/moondance-labs/tanssi/blob/master/container-chains/templates/frontier/runtime/src/lib.rs#L825 -->
<!-- https://github.com/polkadot-evm/frontier/blob/272fe8839f87161ed89350de166b379f1f4c6136/primitives/evm/src/lib.rs#L253-L265 -->

Ultimately, the transaction fee and weight associated to an EVM call in a Tanssi EVM-compatible Appchain can be calculated with the following formula:

=== "EIP-1559"
    ```
    GasPrice = BaseFee + MaxPriorityFeePerGas < MaxFeePerGas ? 
               BaseFee + MaxPriorityFeePerGas : 
               MaxFeePerGas;
    Transaction Fee = GasPrice * GasUsed
    Transaction Weight = GasUsed * GasToWeight
    ```

=== "Legacy"
    ```
    Transaction Fee = GasPrice * GasUsed
    Transaction Weight = GasUsed * GasToWeight
    ```

`GasToWeight` is a constant value set to `{{ networks.dancebox.gas_to_weight }}`.
