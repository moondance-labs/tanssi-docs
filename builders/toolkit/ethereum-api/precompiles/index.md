---
title: Solidity Precompiles
description: These guides showcase interacting with precompiles, which expose Substrate features via the easy-to-access Ethereum API of Tanssi EVM ContainerChains.
hide:
 - toc
 - feedback
---

# Precompiles

Precompiles are built-in blockchain modules designed to handle specific tasks more efficiently than standard smart contracts. These modules are pre-deployed at fixed addresses and provide optimized solutions for operations like cryptographic functions, transaction batching, and token management.

They simplify development by offering advanced blockchain functionality through familiar Ethereum interfaces. This approach allows developers to perform complex operations without needing deep knowledge of the underlying blockchain mechanics, making precompiles a powerful tool for improving efficiency and enhancing performance.

## Flow Of Interacting With The Precompiles
 
 The flow below illustrates how user requests pass through the Ethereum interface, interact with precompiles, and ultimately access Substrate functionality, simplifying complex operations for seamless integration.

[![](https://mermaid.ink/img/pako:eNqtUj1vwjAQ_SuWEVuQmoqqqodKJelQqUNV2qVJh6t9IRGOHflDgAj_vcYEBOpYPNh3707v2ee3pVwLpIwuDHQ1eX0vFQnrsD8VnxbN9yGZFc-uRoO-JS_KoamA41DKijeDXLddI49QXsz9j3UGHF60X9CTyeSxj1XgzhJXG-0XdU9mg2KsZyBlT7JBKUIfmgDnaG1P8iPleEyICk8h1m0kHrAYBpmqkZKN0rv0Pn1IwqX0Etloilzw6ZBOVo1wNbvt1olZs_Rmf27iec40uxpTdjWm_J9Mp-mBMXp1Pj3ZqOU8agiswEtH_rBdqpWKJrRF00IjgqO2e5qSBtO0WFIWQgFmWdJS7UIfeKfnG8Upc8ZjQuPXU1aBtCHznQjOyRsItmxPaAfqS-tjvvsF3YHjXQ?type=png)](https://mermaid.live/edit#pako:eNqtUj1vwjAQ_SuWEVuQmoqqqodKJelQqUNV2qVJh6t9IRGOHflDgAj_vcYEBOpYPNh3707v2ee3pVwLpIwuDHQ1eX0vFQnrsD8VnxbN9yGZFc-uRoO-JS_KoamA41DKijeDXLddI49QXsz9j3UGHF60X9CTyeSxj1XgzhJXG-0XdU9mg2KsZyBlT7JBKUIfmgDnaG1P8iPleEyICk8h1m0kHrAYBpmqkZKN0rv0Pn1IwqX0Etloilzw6ZBOVo1wNbvt1olZs_Rmf27iec40uxpTdjWm_J9Mp-mBMXp1Pj3ZqOU8agiswEtH_rBdqpWKJrRF00IjgqO2e5qSBtO0WFIWQgFmWdJS7UIfeKfnG8Upc8ZjQuPXU1aBtCHznQjOyRsItmxPaAfqS-tjvvsF3YHjXQ)


## Quick Reference

If you already know the precompile you need, just copy it from this box. But if you need more information about them and a step-by-step guide below you will find our documents with detailed information about them and how to use them.

| Precompile               | Address                              |
|--------------------------|--------------------------------------|
| Native Token ERC-20      | `0x0000000000000000000000000000000000000800` |
| Call Permit              | `0x0000000000000000000000000000000000000802` |
| Proxy                    | `0x0000000000000000000000000000000000000805` |
| Batch Transactions       | `0x0000000000000000000000000000000000000801` |


<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Native Token ERC-20 Precompile__

    ---
    
    Handle and integrate your appchain’s native token using the ERC-20 interface, ensuring compatibility with Ethereum tools and wallets.
    
    [Manage ERC-20 Tokens](external-assets-erc20.md)


 -  :material-clock-fast:{ .lg .middle } __Call Permit__

    ---
    
    Enable gasless transactions via signed EVM calls for an improved user experience.
    
    [Call Permit](call-permit.md)      


 -   :material-clock-fast:{ .lg .middle } __Proxy__

    ---
    
    Securely delegate transactions through managed proxy accounts.

    
    [Proxy](proxy.md)      

-   :material-clock-fast:{ .lg .middle } __Batch Transactions__

    ---
    
    Combine multiple transfers and contract interactions into a single, efficient transaction.
    
    [Use Batch Transactions](batch.md)  

</div>