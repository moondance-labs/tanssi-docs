---
title: Solidity Precompiles
description: These guides showcase interacting with precompiles, which expose Substrate features via the easy-to-access Ethereum API of Tanssi EVM ContainerChains.
hide:
 - toc
 - feedback
---

# Precompiles

Precompiles are specialized smart contracts embedded in the blockchain, designed to perform complex operations more efficiently than standard contracts. In Tanssi EVM ContainerChains, precompiles expose Substrate functions through the accessible Ethereum API. These guides demonstrate how to interact with precompiles, allowing you to take advantage of advanced features easily.

### Native Token ERC-20 

Easily interact with your appchain's native token through the ERC-20 standard. This precompile simplifies operations such as:

- Transferring tokens securely and efficiently.
- Querying account balances with Ethereum-compatible tools.
- Enabling seamless integration with other ERC-20-based systems.

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Native Token ERC-20 Precompile__

    ---
    
    Handle and integrate your appchain’s native token using the ERC-20 interface, ensuring compatibility with Ethereum tools and wallets.
    
    [Manage ERC-20 Tokens](external-assets-erc20.md)

</div>

## Advanced Operations and Functionality

Take advantage of powerful tools for efficient and secure appchain operations

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Batch Transactions__

    ---
    
    Combine multiple transfers and contract interactions into a single, efficient transaction.
    
    [Use Batch Transactions](batch.md)  



 -  :material-clock-fast:{ .lg .middle } __Call Permit__

    ---
    
    Enable gasless transactions via signed EVM calls for an improved user experience.
    
    [Call Permit](call-permit.md)      



 -   :material-clock-fast:{ .lg .middle } __Proxy__

    ---
    
    Securely delegate transactions through managed proxy accounts.

    
    [Proxy](proxy.md)  

</div>