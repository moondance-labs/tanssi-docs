---
title: Appchain Templates
description: Learn more about the baseline appchain Templates (EVM and non-EVM) that support Tanssi out of the box to help you kickstart your appchain development.
hide:
 - toc
 - feedback
---

# Template Appchains

Kickstart your appchain development with our comprehensive templates. Designed for rapid deployment and flexibility, our templates provide a solid foundation for EVM and non-EVM solutions. Discover the perfect starting point for your project and accelerate your journey to production.

## Choosing the Right Template
Choosing the right template is the first step in building your appchain. Whether you need a fully Ethereum compatible appchain or a highly customizable runtime, both templates provide the basic configurations you need to get started. With either template, you'll benefit from Tanssi's block production as a service, deterministic transaction finality in seconds, and the ability to choose your preferred security provider, for example Symbiotic.

 **EVM Apchain Template:** 

- **Ready to Deploy:** Comes fully configured for Ethereum compatibility, requiring no runtime changes if the application is built on EVM.
- **Ethereum Ecosystem Integration:** Supports Ethereum tools and libraries like MetaMask, Hardhat, Foundry, and Ethers.js.
- **Smart Contract Deployment:** Deploy EVM smart contracts seamlessly using familiar tools.
- **Wallet Compatibility:** Connect with popular Ethereum wallets, including MetaMask and Ledger.

 **Non-EVM Appchain Template:** 

- **Minimalistic Design:** Includes only the essential configurations for compatibility with Tanssi, making it an ideal base for adding custom modules.
- **Tailored Runtime:** Provides the flexibility to expand functionality by integrating existing or custom-built modules.
- **Highly Configurable:** Adapt the template to meet unique requirements for governance, economics, or consensus.


[More about our templates](overview.md)  
  
<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __EVM Appchain Template__

    ---

    Designed for full Ethereum compatibility, this template allows developers to deploy Ethereum-based smart contracts using familiar tools and libraries.

    [Learn About the EVM Template](evm.md)

-   :fontawesome-brands-markdown:{ .lg .middle } __Non-EVM Template__

    ---

    A Substrate-based template designed for integrating custom logic into a Substrate-oriented runtime, offering flexibility and modularity for tailored appchains.

    [Discover the Substrate Template](substrate.md)

</div>

!!!tip Building on Top of Templates
    No matter which template you choose, the recommended and easiest approach is to follow these steps:
    
    1. Choose Your Template.
    2. Create a fork of the [Tanssi repository](https://github.com/moondance-labs/tanssi){: target="_blank" } to start your customizations.
    3. Add the modules you need (built-in or custom) and make sure you are working with the [latest stable release](https://github.com/moondance-labs/tanssi/releases/latest){: target="_blank" } tag.
    4. Use the included test configurations to validate that everything works as expected.

    Learn more about why this is the best approach in [Overview](overview.md){: target="_blank" }

# Ready to Deploy?

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Easy Deploy__

    ---

    Follow detailed instructions to deploy your appchain using the Tanssi dApp. This resource guides you through the implementation process, ensuring a smooth transition from development to production.

    [Deploy in only 5 steeps](../../deploy/index.md)

</div>