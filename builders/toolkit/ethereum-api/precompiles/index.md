---
title: Solidity Precompiles
description: These guides showcase interacting with precompiles, which expose Substrate features via the easy-to-access Ethereum API of Tanssi EVM ContainerChains.
template: index-page.html
---

# Precompiles

Precompiles are built-in blockchain modules designed to handle specific tasks more efficiently than standard smart contracts. These modules are pre-deployed at fixed addresses and provide optimized solutions for operations like cryptographic functions, transaction batching, and token management.

Since Tanssi-powered networks are Substrate-based, precompiled contracts can support both Ethereum-compatible functions and operations specific to the underlying Substrate chain. This dual approach ensures that developers can interact with familiar Ethereum tools while also taking advantage of the unique performance and flexibility offered by Substrate.

## Flow of Interacting with Precompiles

The flow below illustrates how user requests pass through the Ethereum interface, interact with precompiles, and ultimately access Substrate functionality, simplifying complex operations for seamless integration.

```mermaid
graph LR
    
    A[User]
    B[Ethereum Interface]
    C[Precompile]
    D[Substrate Interface]

    A -->|Interacts through| B
    B -->|Calls| C
    C -->|Accesses| D

    %% Node styling
    style A fill:#1e1e1e,stroke:#4ecdc4,stroke-width:2px,rx:10px,ry:10px
    style B fill:#2a2a2a,stroke:#4ecdc4,stroke-width:2px,rx:10px,ry:10px
    style C fill:#3a3a3a,stroke:#4ecdc4,stroke-width:2px,rx:10px,ry:10px
    style D fill:#4a4a4a,stroke:#4ecdc4,stroke-width:2px,rx:10px,ry:10px

    %% Arrow styling
    linkStyle default stroke-width:2px,stroke:#4ecdc4,stroke-dasharray: 5, 5

    %% Optional: Add a note or description
    classDef note fill:#1a1a1a,stroke:#4ecdc4,stroke-width:1px;
    class A,B,C,D note
```

## Precompile Addresses Quick Reference

| Precompile          | Address                                                      |
|---------------------|--------------------------------------------------------------|
| Native Token ERC-20 | <pre>```0x0000000000000000000000000000000000000800```</pre>  |
| Call Permit         | <pre>````0x0000000000000000000000000000000000000802```</pre> |
| Proxy               | <pre>```0x0000000000000000000000000000000000000805```</pre>  |
| Batch Transactions  | <pre>```0x0000000000000000000000000000000000000801```</pre>  |

To find out more about each precompile, check out the guides listed in the following section.

## Explore What This Section Covers

:::INSERT_GENERATED_CARDS:::
