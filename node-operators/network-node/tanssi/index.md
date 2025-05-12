---
title: Run a Tanssi Node
description: Learn how to set up and run a Tanssi node using Docker or Systemd to host your own RPC endpoints for chain interaction.
icon: octicons-server-24
template: index-page.html
---

# Run a Tanssi Node

Setting up a Tanssi node is essential for interacting with the Tanssi network, providing a secure and dedicated RPC endpoint. You have two options for configuration: using _Docker_ or _Systemd_. Whichever path you choose, we provide step-by-step tutorials to guide you through the process.

## Hardware Requirements

To run a Tanssi node successfully, adequate hardware is essential for optimal performance:

- **Recommended Configuration** - Bare metal hardware running Linux Debian or Ubuntu
- **Recommended CPUs** - Intel Ice Lake or newer (Xeon or Core series) or AMD Zen3 or newer (EPYC or Ryzen). Four Physical cores @ 3.4 Ghz with hyperthreading disabled (SMT for AMD processors)
- **Recommended NVMe** - 500 GB NVMe SSD
- **Recommended RAM** - 16 GB ECC RAM
- **Recommended Network** - 1 Gbps connection

!!! note
    While these are the recommended specifications, lower configurations may work for non-production environments. However, for stable performance and complete chain synchronization, meeting or exceeding these specifications is advised.

### Required Network Ports

To ensure proper communication with the Tanssi network, make sure the following port is open for incoming connections:

| Network          | Port        |
|------------------|-------------|
| Tanssi Chain     | 30333 (TCP) |

## Explore This Section

:::INSERT_GENERATED_CARDS:::
