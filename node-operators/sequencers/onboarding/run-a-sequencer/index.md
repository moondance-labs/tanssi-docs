---
title: Run a Sequencer
description: Learn how to set up and run appchain Sequencer node (also known as block producers or collators) using Docker or Systemd to participate in the protocol.
icon: octicons-server-24
template: index-page.html
---

# Run a Sequencer Node
Setting up a sequencer node is an important step to participate in the Tanssi network. You have two options for configuration: using _Docker_ or _Systemd._ Whichever path you choose, we provide step-by-step tutorials to guide you through the process and ensure your node meets the necessary requirements to produce blocks and maintain a secure connection to the network.

To ensure optimal performance, we recommend the following hardware specifications:

!!! tip "Recommended Hardware"
    - **CPU**: Intel Xeon E-2386/2388 or Ryzen 9 5950x/5900x  
    - **NVMe**: 1 TB NVMe  
    - **RAM**: 32 GB RAM  


### Required Network Ports
 For successful block production, your node must synchronize and interact with three P2P networks. Ensure the following ports are open for incoming communications:

| Network            | Port         |
|---------------------|--------------|
| Tanssi Chain       | 30333 (TCP)  |
| Relay Chain        | 30334 (TCP)  |
| Assigned Appchain  | 30335 (TCP)  |


## Explore What This Section Covers

:::INSERT_GENERATED_CARDS::: 
