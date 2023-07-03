---
title: Consensus
description: Consensus mechanisms are a pillar of blockchain design. Tanssi manages block production for the ContainerChains and finality is provided by polkadot relay chain
---

# Consensus Mechanism {: #consensus-mechanism } 

Decentralization is an important characteristic of any blockchain. It means that there is no central authority bearing full control, regulating the decision-making process or defining or altering the current state of the network at will.

A consensus mechanism is crucial to align the nodes participating in the network and collectively agree on the validity, inclusion, and execution of transactions in the block. By implementing a consensus algorithm, the network as a whole can reach a common understanding of the validity of the state transitions and agreement on the state of the ledger. 

In the case of Appchains deployed through Tanssi, the consensus mechanism has two different phases:

- **Block Authoring** - Collator nodes agree on the validity, order and inclusion of transactions in new blocks, preserving the liveness of the network
- **Finalization** - Validators verify the candidate blocks, and if agreed on the validity, the block becomes final, meaning that a block's contents cannot be reverted or modified, and becomes part of the canonical chain

## Block Authoring in a ContainerChain Deployed through Tanssi {: #block-authoring-in-tanssi-containerchain }

Block production is one of the workloads Tanssi deals with, allowing Appchain developers to focus only on product development.

When a ContainerChain is registered in Tanssi and marked as valid to start producing blocks, a set of collators will be assigned to provide their services as block producers for the Appchain. 
It is important to remark that the Tanssi protocol might change dynamically the collator assignment to a ContainerChain, thus not necessarily the same collator set will be responsible for block production in different moments.

The collators will produce blocks using Aura (Authority round) consensus, in which each participant awaits for its turn to produce a block, assigning the turns in equal terms.

## Finality {: #finality }

The finality of the block is provided by the polkadot Relay Chain.
It ensures that the block has been validated meaning that all the state transitions included in the transactions it contains are valid, it is approved and therefore can not be modified, reverted or tampered with.

## Path of the Block {: #path-of-the-block }

The end-users of a ContainerChain will generate transactions, that land in a transaction pool, awaiting a collator that will execute and include in a block that eventually will be declared as finalized in the relay chain.
This is the path of a block, from the creation to finalization:

1. From the assigned set of collators that Tanssi provides to provide services to the ContainerChain, one will be selected via Aura to produce the next block
2. The collator will produce the next block including as many pending transactions from the pool as the block capacity admits, executing them and computing the state transition
3. The collator puts forward the proof of validity (PoV). The PoV comprises the block with the list of transactions, the values in the ContainerChain state that the block modifies, and the hashes of the unaffected points in the Merkle tree
4. The set of validators assigned to this ContainerChain by Polkadot receive the PoV, and check the validity of the state transition derived from the transactions included in the block. 
5. Once at least half plus one validators agree on the validity of the block, the it is considered backable, and the validators construct the candidate receipt (that will be included in the relay chain) and gossip the [erasure coding](https://wiki.polkadot.network/docs/learn-parachains-protocol#erasure-codes){target=blank} (that will guarantee the availability of the block)
6. The candidate receipt is added to the transaction pool of the relay chain, along with other receipts from other ContainerChains (or Parachains)
7. The candidate receipt is included in a relay chain block, that is subject to a verification phase where randomly selected validators must perform secondary checks to test the availability and validity of the candidate receipts inside
8. Once enough secondary checks have been performed, validators can finally vote for that block in [GRANDPA](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf){target=blank} and when it gets more than two-thirds of pre-commits, the block becomes part of the finalized chain