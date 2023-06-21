---
title: Parachains and parathreads
description: Introduction to the basic concepts of a parachain and parathreads
---

# Parachains and Parathreads in Polkadot

## Parachains

Polkadot is a layer zero blockchain that provides essential services to the other chains within the ecosystem: the Parachains.

More specialization leads to better performance, and parachains are sovereign blockchains with high specialization that are interconnected to each other through the relay chain. 
This model allows each parachain to process transactions in parallel with its own set of collators producing blocks, the performance and the throughput of the network.

In addition to performance gains to the whole network, parachains can communicate with one another, enabling the transfer of assets and/or data and facilitating interoperability while relying on the security model offered by the relay chain.

In short, a parachain is an independent blockchain operating within the Polkadot network, leveraging the interoperability, scalability, shared security and governance features provided by the Polkadot ecosystem. This empowers developers to create specialized blockchains that seamlessly interact with other parachains.

### How Can I Get My Parachain Up and Running ?

To add a new parachain to the Polkadot ecoystem, it is necessary to obtain a slot through the slot auction process. 
Here's a general overview of what to do:

1. Prepare your parachain: Develop and prepare your parachain project, including its functionality, features, and any necessary code implementation.
2. Get DOT tokens: Since acquiring a parachain slot requires an amount of DOT tokens to be locked up for the entire duration of the lease, you'll need to find an entity or raise a community crowdloan to support your parachain.
3. Participate in the auction: Polkadot uses a candle auction mechanism to allocate parachain slots. During the auction, you will compete against other projects for the available slots by submitting a bid in the form of locked DOT tokens. The highest bidders at the moment of the auction's close will get the parachain slots.
4. Deploy and maintain your parachain: Once you have secured a parachain slot, you can deploy your parachain onto the Polkadot network. 
It's crucial to ensure the proper configuration, security measures, ongoing maintenance of your parachain and a good number of collators.

## Parathreads

Parathreads are an idea to allow blockchains to acquire blockspace in Polkadot's relay chain on pay-per-block basis.

This is a great way to onboard projects that can not afford to lease a full Parachain, projects whose transaction volume does not require much blockspace or projects that might not find a Parachain slot economically efficient.

### How Parathreads work

Some Parachains will be reserved as a pool to offer blockspace to Parathreads, which will propose a block for inclusion in the Relay Chain by bidding and eventually winning a fee auction against other Parathreads.

This model allows every Parathread to benefit from the same security and XCM communication with other chains in the ecosystem, while having a much lower barrier of entry.

