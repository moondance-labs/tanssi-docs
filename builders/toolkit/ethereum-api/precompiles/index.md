---
title: Solidity Precompiles
description: These guides demonstrate how to interact with precompiles to access Substrate features through the familiar Ethereum API on Tanssi's EVM-compatible networks.
icon: octicons-file-code-24
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
```

## Precompile Addresses Quick Reference

| Precompile          | Address                                                      |
|---------------------|--------------------------------------------------------------|
| Native Token ERC-20 | <pre>```0x0000000000000000000000000000000000000800```</pre>  |
| Call Permit         | <pre>```0x0000000000000000000000000000000000000802```</pre>  |
| Proxy               | <pre>```0x0000000000000000000000000000000000000805```</pre>  |
| Batch Transactions  | <pre>```0x0000000000000000000000000000000000000801```</pre>  |

To find out more about each precompile, check out the guides listed in the following section.

## Explore This Section

:::INSERT_GENERATED_CARDS:::
