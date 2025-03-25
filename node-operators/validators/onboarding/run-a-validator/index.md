---
title: Run a Validator
description: Learn how to set up and run a validator node (also referred to as operators) using Docker or Systemd to participate in the protocol securing the ecosystem.
icon: octicons-server-24
template: index-page.html
---

# Run a Validator Node

Setting up a validator node is an important step to participate in the Tanssi network. You have two options for configuration: using _Docker_ or _Systemd._ Whichever path you choose, we provide step-by-step tutorials to guide you through the process and ensure your node meets the necessary requirements to validate the Tanssi-powered network's transactions and provide security to the ecosystem.

### Hardware Requirements

To run a validator node successfully, high-performance hardware is essential. Suboptimal configurations can lead to delays, unavailability, and ultimately, lost rewards and/or penalizations. Since the validation process relies heavily on single-threaded performance, prioritizing CPUs with strong single-thread capabilities over higher core counts is recommended.

Recommended hardware:

- **Recommended Configuration** - Bare metal hardware running linux debian or ubuntu
 - **Recommended CPUs** - Intel Ice Lake or newer (Xeon or Core series) or AMD Zen3 or newer (EPYC or Ryzen). Eight Physical cores @ 3.4 Ghz with hyperthreading disabled (SMT for AMD processors) 
- **Recommended NVMe** - 500 GB NVMe SSD
- **Recommended RAM** - 32 GB ECC RAM
- **Recommended Network** - 1 Gbps connection 

!!! warning 
    As a validator, you are responsible for both your own stake and that of your delegators. Maintaining your node's performance, keeping it updated, and ensuring its security are critical for maximizing rewards and building a strong reputation within the Tanssi network.

### Required Network Ports

A successful validator must be able to synchronize and interact with one peer-to-peer (P2P) network. To ensure proper communication within the Tanssi ecosystem, make sure the following port is open for incoming:

| Network          | Port        |
|------------------|-------------|
| Tanssi Chain     | 30333 (TCP) |

## Explore This Section

:::INSERT_GENERATED_CARDS:::
