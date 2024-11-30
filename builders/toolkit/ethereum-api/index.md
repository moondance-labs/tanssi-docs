---
title: Ethereum API
description: Learn how to interact with your Tanssi EVM-compatible appchain through the Ethereum API with different Ethereum tools like Remix, Hardhat, Foundry, and more.
---

# Ethereum Tools

Simplify the development and management of your Ethereum-compatible appchain with Tanssi's powerful tools. Whether you’re using Remix for coding, Hardhat for testing, or Foundry for advanced deployments, this section provides everything you need to integrate with the Ethereum ecosystem. Access step-by-step guides and resources to optimize your appchain's performance and functionality.

# Set Up Your Workspace

Using these essential tools. For enterprise and professional use, we recommend Foundry and Hardhat. You can also explore other options like Remix for a more accessible approach.

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Foundry__

    ---
    
    A lightweight and efficient framework designed for compiling, testing, and deploying Solidity contracts.

    [Deploy With Foundry](dev-env/foundry.md) 

-   :material-clock-fast:{ .lg .middle } __Hardhat__

    ---
    
    A robust Ethereum development environment for managing and deploying smart contracts with advanced features.

    [Deploy With Hardhat](dev-env/hardhat.md) 

</div>

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Others Dev Evironments__

    ---
    
    You can also use other dev enviroments for lighter work and testing.
    
    - **Remix:** Use Remix IDE, a popular Ethereum development tool, to build, compile, and deploy smart contracts
      
    [Try Remix](dev-env/remix.md)  
  
    - **Thirdweb:** A versatile platform to build, test, and deploy dApps using ready-made smart contract templates.
      
    [Try Thirdweb](dev-env/thirdweb.md) 
    
</div>

# Precompiles

Precompiles are specialized smart contracts embedded in the blockchain, designed to perform complex operations more efficiently than standard contracts. In Tanssi EVM ContainerChains, precompiles expose substrate functions through the accessible Ethereum API. These guides demonstrate how to interact with precompiles, allowing you to take advantage of advanced features easily.

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Native Token ERC-20__

    ---
    
    Handle and integrate your appchain’s native token using the ERC-20 interface, ensuring compatibility with Ethereum tools and wallets.
      
    [Manage ERC-20 tokens](precompiles/erc20.md)  

-   :material-clock-fast:{ .lg .middle } __Advanced Operations And Functionality__

    ---
    
    - **Batch:** Combine multiple transfers and contract interactions into a single, efficient transaction.
    - **Call Permit:** Enable gasless transactions via signed EVM calls for an improved user experience.
    - **Proxy:** Securely delegate transactions through managed proxy accounts.
      
    [Explore Advanced Operations](precompiles/index.md)
</div>

# Libraries

In the world of programming, a library is a collection of pre-written code that developers can use to perform common tasks, saving time and effort. For your Tanssi EVM appchain, using Ethereum libraries such as Ethers.js, Web3.js, and Web3.py allows you to send transactions, deploy contracts, and easily interact with your appchain, streamlining your development process.


<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Development Libraries__

    ---
    Streamline your appchain development with these powerful libraries:  

    - **Ether.js** Send transactions and deploy Solidity contracts effortlessly using this widely-used JavaScript library.
    - **Viem** Manage smart contracts with ease using this modern TypeScript interface.
    - **Web3.js** Leverage robust tools to interact seamlessly with your Tanssi appchain.
    - **Web3.py** Simplify Ethereum API interactions with this Python-based library for efficient development.
 
    [Explore Libraries](libraries/index.md) 

</div>

# Wallets 

Wallets are essential tools for managing and interacting with your Tanssi appchain. They allow you to configure connections, add RPC URLs and send funds. This section will guide you through setting up and using different wallets

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Metamask__

    ---
    
    Connect MetaMask, the most widely used Ethereum wallet, to your Tanssi EVM appchain. This guide shows you how to set it up and transfer funds seamlessly.
      
    [Get Started with MetaMask](wallets/metamask.md)  

-   :material-clock-fast:{ .lg .middle } __Expand Your Wallet Options__

    ---
    Explore additional wallet options that integrate with Tanssi EVM appchains. These wallets offer unique features to meet your specific needs:
    
    
    [Discover Other Wallets](wallets/index.md)
    
</div>

# Aditional Resources

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Ethereum API Methods Guide__

    ---
    
    Explore the supported JSON-RPC methods for interacting with your Tanssi EVM appchain. This guide covers standard Ethereum API methods as well as custom methods designed specifically for Tanssi.
      
    [View JSON-RPC Methods](rpc.md)  

</div>