---
title: Transaction Fees
description: Learn about the transaction fee mechanism in Tanssi Appchains, how it works from a Substrate perspective and in the Ethereum EVM emulation layer with EIP-1559
---

# Transaction Fees {: #transaction-fees }

## Introduction {: #introduction}

Tanssi Appchains are built with a [modular framework](/learn/framework/){target=\_blank} called [Substrate](https://substrate.io/){target=\_blank}. This framework has its unique way to handle transaction fees, which is through a specific module called [Transaction Payment](https://docs.rs/pallet-transaction-payment/latest/pallet_transaction_payment/){target=\_blank}.

Under the hood, instead of working with a gas and gas price based mechanism, all Tanssi Appchains work with a [weight-based mechanism](https://docs.substrate.io/build/tx-weights-fees/){target=\_blank}. Weight refers to the time (in picoseconds) it takes to validate a block. Generally speaking, for both EVM and non-EVM Tanssi Appchains, all function calls have a weight associated to them, which sets limits on storage input/output and computation. For EVM Appchains, there is a gas to weight mapping that fully complies with the expected gas requirements for Ethereum API based tools.

A transaction fee scheme is the applied on top of the weight-based mechanism, to ensure there are economic incentives in line to limit execution time, computation and number of calls (database read/writes) to perform opertions. Transaction fees are fundamental to prevent network spam, as they represent the associated cost of using the Appchain service. Consequently, a user that interacts with the network through a specific function call, will pay a transaction fee in accordance to a baseline fee algorithm.

This section covers the fundamentals of transaction fees for Tanssi Appchains. It covers first the underlying transaction fee architecture, and then it goes into how the model is adapted to a fully EIP-1559 compliant model for EVM Appchains.

## Baseline Fees Calculation {: #baseline-fees }

Broadly speaking, any call that modifies the state of an Appchain has a transaction fee associated to it. This fee is is normally associated with the execution cost of the transaction, like _gas_ and _gasPrice_ in EVM compatible chains. But in Tanssi Appchains, the weight-based mechanism for fees of the [modular framework](/learn/framework/){target=\_blank} also account for storage input/outputs.

### Weight {: #baseline-weight}

Weight is divided into two separate variables:

- **refTime** - corresponds to the weight associated with computation time and database reads/writes
- **proofSize** - corresponds to the weigth associated to the size of the _Proof-Of-Validity_ (or _PoV_ for short). The _PoV_ is associated with the relevant state of a transaction, and it is what the Appchain block producer shares with the relay chain validator to get its block finalized as part of the [Appchain transaction flow](/learn/appchains/overview/#appchain-transaction){target=\_blank}

To find the weights for all function calls, they are benchmarked in a system with reference hardware, and the approximate values of _refTime_ and _proofSize_ are set. This process is repeated for all function calls that consume blockspace and/or affect the _PoV_.

### Transaction Fees {: #baseline-transaction-fees}

With all function calls benchmarked, the transaction fee for each specific call can be obtained. Transaction fees are typically comprised of the following elements:

- **Base Fee** - baseline cost for a transaction to be included. It is defined in weight and accounts for the transaction inclusion overhead, like signature verification
- **Weight Fee** - fee defined by two separate parameters:
    - **Benchmarked Weight** - weight that accounts for the complexity (execution time) of a specific call
    - **Congestion Multiplier** - a function that can be adjusted to account for the congestion of the network (weight consumed in the previous block). Tanssi Appchains have a constant value set
- **Length Fee** - a function that defines the per-byte fee (_LenghtToFee_) correlated to the length in bytes of the function call. It can range from a constant to a cubic curve.  Tanssi Appchains have a constant value set
- **Tip** - an optional value that increases the overall fee, increasing the priority of the transaction by incentivizing block producers to include it in the next block

All weight-based parameters are then passed through a _WeightToFee_ algorithm that converts all to a final value, deducted from the sender's account when executing the function call. The algorithm can be customized, but Tanssi Appchains have a constant value set.

Therefore, in general terms, the transaction fee can be calculated with the following equation:

```
BaseFee = ExtrinsicBaseWeight * WeightToFee
WeightFee = BenchmarkedWeight  * CongestionMultiplier
LengthFee = ByteLenghtFunctionCall * LengthToFee

InclusionFee = BaseFee + WeightFee + LenghtFee
FinalFee = InclusionFee + Tip
```



This is done through a _WeightToFee_ converter. As the nage suggest, this is a function that converts weight to fee, and it can be customized, although normally is a linear conversion. 

