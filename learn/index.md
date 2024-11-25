---
title: Learn About Tanssi Infrastructure Protocol
description: Learn about Tanssi protocol and how it helps developers to build and deploy appchains by handling infrastructure complexities and providing key integrations.
---


# Learn

The Learn section provides comprehensive resources to understand Tanssi's protocol, its core functionalities, and how its framework facilitates the efficient and secure development of appchains. Explore the unique features of appchains built with Tanssi, including modular architecture and native cross-chain communication capabilities. Tanssi offers flexible security options, allowing appchains to leverage Polkadot's shared security or Ethereum's restaked ETH through Symbiotic, enabling developers to customize security based on their network requirements.

## **Fundamentals**
Learn about Tanssi protocol and how it handles infrastructure complexities, making it easy for new appchains to be deployed in the Polkadot Web3 ecosystem.

<div class="grid cards" markdown>

-   :octicons-home-24:{ .lg .center } __Overview__

    ---

    Tanssi simplifies deploying custom appchains, giving projects full control to scale and optimize their blockchain for better user experiences.

    [Overview](../learn/tanssi/overview.md)

-   :material-table-column-plus-after:{ .lg .middle } __Block Production Services__

    ---

    Tanssi provides block production services assigning block producers to the appchains, requiring minimal changes to the code for appchains to be deployed.

    [Block Production Services](../learn/tanssi/technical-features.md)

-   :material-view-grid-plus:{ .lg .middle } __Included Templates__

    ---

    Included templates provide a ready-to-use foundation for appchain development, helping developers quickly build and deploy custom solutions efficiently.

    [Included Templates](./tanssi/included-templates.md)

-   :material-format-list-bulleted-square:{ .lg .middle } __Network Features__

    ---

    Explore core network features like Staking, Governance, and Treasury, each playing a vital role in making Tanssi a fully decentralized appchain orchestrator within the Web3 ecosystem.

    [Network Features](../learn/tanssi/network-features/index.md)

   

</div>


## **Appchain Development Framework**
The Appchain Development Framework provides the flexibility to build appchains with custom logic, using Rust, Substrate’s XCM capabilities, and ready-to-use pallets for runtime customization. Tanssi’s framework enables seamless integration with both Polkadot and Ethereum, offering modular design and adaptable security options.

<div class="grid cards" markdown>

-   :octicons-home-24:{ .lg .center } __Overview__

    ---

    Discover the core concepts behind how a Tanssi appchain operates, its architectural design, and its block production service with deterministic finality.

    [Overview](../learn/appchains/overview.md)

-   :octicons-stack-24:{ .lg .center } __Framework Architecture__

    ---

    The architecture of Tanssi’s framework, built on Substrate, combines a modular core client and customizable runtime, enabling developers to efficiently implement appchain logic, handle cross-chain communications, and support diverse applications.

    [Framework Architecture](../learn/framework/architecture.md)

- :material-puzzle-plus-outline:{ .lg .center } __Modularity__

    ---

    Substrate Framework provides complete and ready-to-use implementations of the main functions a Tanssi appchain needs to work properly, including cryptography, consensus, governance, and so on. These implementations are fully customizable and could be replaced with custom logic if needed.

    [Modularity](../learn/framework/modules.md)

-   :fontawesome-regular-comments:{ .lg .center } __Native Cross-Chain Communication__

    ---

    All Tanssi appchains have an inherent capability to communicate and interoperate with any other appchain in the ecosystem. This native cross-chain communication feature is possible thanks to the unique infrastructure the appchains are built on top of, leveraging the Cross-Consensus Message format (XCM for short), which facilitates communication between different consensus systems.

    [XCM](../learn/framework/xcm.md)

</div>

## **Appchains in Tanssi**
Discover the features in EVM and Substrate appchains deployed through Tanssi, leveraging user-friendly and easy-to-deploy templates for enhanced capabilities.

<div class="grid cards" markdown>

-   :octicons-home-24:{ .lg .center } __Overview__

    ---
    Learn the high-level definitions of how a Tanssi appchain works, its architecture, and its block production as a service mechanism with deterministic finality.


    [Overview](../learn/appchains/overview.md)

-   :octicons-code-square-24:{ .lg .center } __Core Runtime Features__

    ---

    Explore key runtime features of Tanssi appchains, including flexible transaction types, forkless upgrades, and advanced account controls, allowing developers to fine-tune appchain behavior and ensure seamless updates without disruptions.

    [Core Runtime Features](../learn/appchains/runtime-features.md)

-   :material-bank-transfer:{ .lg .middle } __Transaction Fees__

    ---

    Tanssi appchains implement a weight-based transaction fee model compatible with EVM and Substrate standards, optimizing resource efficiency, reducing spam, and supporting EIP-1559 compliance for EVM-based appchains.

    [Transaction Fees](../learn/appchains/tx-fees.md)

</div>
