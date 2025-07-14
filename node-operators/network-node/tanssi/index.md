---
title: Run a Tanssi Node
description: Learn how to set up and run a Tanssi node using Docker or Systemd to interact with the Tanssi network.
icon: octicons-server-24
template: index-page.html
categories: RPC-Data-Preservers
---

# Run a Tanssi Node

Setting up a Tanssi Node is an important step in interacting with and querying the Tanssi network. You have two options for configuration: using _Docker_ or _Systemd_. Whichever path you choose, we provide step-by-step tutorials to guide you through the process.

## Hardware Requirements

Appropriate hardware is essential for running a Tanssi node successfully. A performant setup ensures reliable service and quick response to queries.

Recommended hardware:

- **Recommended Configuration** - bare metal hardware running Linux Debian or Ubuntu
- **Recommended CPUs** - Intel Ice Lake or newer (Xeon or Core series), AMD Zen3 or newer (EPYC or Ryzen). Eight Physical cores @ 3.4 GHz with hyperthreading disabled (SMT for AMD processors)
- **Recommended NVMe** - 500 GB NVMe SSD
- **Recommended RAM** - 32 GB ECC RAM
- **Recommended Network** - 1 Gbps connection

!!! warning
    Maintaining your Tanssi Node's performance, keeping it updated, and ensuring its security are critical for reliable operation.

### Required Network Ports

To ensure proper communication with the Tanssi network, make sure the following port is open for incoming connections:

| Network          | Port        |
|------------------|-------------|
| Tanssi Chain     | 30333 (TCP) |

## Explore This Section

:::INSERT_GENERATED_CARDS:::
