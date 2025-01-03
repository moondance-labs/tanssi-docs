---
title: Run a Sequencer
description: Learn how to set up and run sequencer node (also known as block producers or collators) using Docker or Systemd to participate in the protocol.
icon: octicons-server-24
template: index-page.html
---

# Run a Sequencer Node

Setting up a sequencer node is an important step to participate in the Tanssi network. You have two options for configuration: using _Docker_ or _Systemd._ Whichever path you choose, we provide step-by-step tutorials to guide you through the process and ensure your node meets the necessary requirements to produce blocks and maintain a secure connection to the network.

### Hardware Requirements

To run a sequencer node successfully, using high-performance hardware is essential. Suboptimal configurations can lead to delays, missed authoring rounds, and lost rewards. Since the block production and import process relies heavily on single-threaded performance, prioritizing CPUs with strong single-thread capabilities over higher core counts is recommended.

Recommended Hardware:

- **Recommended CPUs** - Intel Xeon E-2386/2388 or Ryzen 9 5950x/5900x
- **Recommended NVMe** - 1 TB NVMe
- **Recommended RAM** - 32 GB RAM

!!! warning 
    As a sequencer, you are responsible for both your own stake and that of your delegators. Maintaining your node's performance, keeping it updated, and ensuring its security are critical for maximizing rewards and building a strong reputation within the Tanssi network.

### Required Network Ports

For successful block production, your node must synchronize and interact with three peer-to-peer (P2P) networks. To ensure proper communication within the Tanssi ecosystem, make sure the following ports are open for incoming:

| Network            | Port         |
|---------------------|--------------|
| Tanssi Chain       | 30333 (TCP)  |
| Relay Chain        | 30334 (TCP)  |
| Assigned Network  | 30335 (TCP)  |


## Explore What This Section Covers

:::INSERT_GENERATED_CARDS::: 
