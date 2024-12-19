## Hardware Requirements {: #hardware-requirements }

To run a block producer successfully, using top-of-the-line hardware is a must. Using subpar configurations might cause the node to lag behind, missing authoring rounds and their associated rewards.

Since the block production/import process is almost entirely single-threaded, a higher single-thread performance provides better results than a higher core count. 

The following are some hardware recommendations that have performed well:

- **Recommended CPUs** - Intel Xeon E-2386/2388 or Ryzen 9 5950x/5900x
- **Recommended NVMe** - 1 TB NVMe
- **Recommended RAM** - 32 GB RAM

!!! warning 
    You are responsible not only for your own stake but also the stake of your delegators. Monitoring your block producer performance and keeping it up to date and secured correctly is critical to maximizing rewards and building up your reputation.

### Running Ports {: #running-ports }

As mentioned in the [Introduction](#introduction), block producer nodes will be assigned to produce blocks for any active network in the Tanssi ecosystem or the Tanssi protocol itself. To accomplish a successful block production, the node must be able to sync and participate in three different peer-to-peer (P2P) networks. This requires the following three ports to be open to incoming communications from **any** origin:

|       Network        |    Port     |
|:--------------------:|:-----------:|
|   **Tanssi Chain**   | 30333 (TCP) |
|   **Relay Chain**    | 30334 (TCP) |
| **Assigned Network** | 30335 (TCP) |

