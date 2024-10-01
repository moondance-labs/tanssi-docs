---
title: The Proxy Precompile
description: Learn how to interact with the Proxy precompile to add and remove proxy accounts that can execute specific transactions on behalf of other account.
keywords: solidity, ethereum, proxy, moonbeam, precompiled, contracts, substrate
---

# Interacting with the Proxy Precompile

## Introduction {: #introduction }

The Proxy Precompile allows accounts to set proxy accounts that can perform specific limited actions on their behalf, such as governance, balance transfers, management or privileged transactions, and others.

If a user wanted to provide a second user access to a limited number of actions on their behalf, traditionally, the only method to do so would be by providing the first account's private key to the second. However, Tanssi EVM appchains include the proxy module, which enables proxy accounts. Proxy accounts ought to be used due to the additional layer of security they provide, where many accounts can perform actions for a primary account. This is best if, for example, a user wants to keep their wallet safe in cold storage but still wants to access parts of the wallet's functionality, like governance or staking.  

!!! note
    The Proxy Precompile can only be called from an Externally Owned Account (EOA) or by the [Batch Precompile](/builders/ethereum/precompiles/ux/batch/){target=\_blank}.

To learn more about proxy accounts and how to set them up for your own purposes without use of the Proxy Precompile, visit the [Proxy Accounts](/builders/account-management/proxy-accounts/){target=\_blank} page.

The Proxy Precompile is located at the following address:

```text
{{networks.dancebox.precompiles.proxy}}
```

--8<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'

## Prerequisites {: #prerequisites }

 Tto follow along with the contents in this guide, you'll need:
 
- Access to a Tanssi EVM appchain running [runtime 700](https://github.com/moondance-labs/tanssi/releases/tag/runtime-700){target=\_blank} or above
- An [EVM-compatible wallet](/builders/toolkit/ethereum-api/wallets/){target=\_blank} configured to work with your appchain. You can also connect your wallet to the [demo EVM appchain](https://apps.tanssi.network/demo){target=\_blank}
- An account with enough funds to pay the required fees and deposits
- A second account that you control to use as a proxy

## The Proxy Solidity Interface {: #the-proxy-solidity-interface }

[`Proxy.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/Proxy.sol){target=\_blank} is an interface that allows developers to interact with the precompile's functions.

??? code "Proxy.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/proxy/proxy.sol'
    ```

The interface includes the necessary data structures along with the following functions:

???+ function "**addProxy**(delegate, proxyType, delay) — registers a proxy account for the sender after a specified number of `delay` blocks (generally zero). Will fail if a proxy for the caller already exists"

    === "Parameters"

        - `delegate` ++"address"++ - the proxy address
        - `proxyType` ++"ProxyType"++ - the delegation type that defines the specific functions the proxy will be granted permission to execute
        - `delay` ++"uint32"++ - number of blocks to wait until the proxy is enabled

    === "Example"

        - `delegate` - 0x3f0Aef9Bd799F1291b80376aD57530D353ab0217
        - `proxyType` - "Any"
        - `delay` - 0

??? function "**removeProxy**(delegate, proxyType, delay) — removes a registered proxy for the sender"

    === "Parameters"

        - `delegate` ++"address"++ - the proxy address to remove
        - `proxyType` ++"ProxyType"++ - the delegation type to remove
        - `delay` ++"uint32"++ - number of blocks to wait until the removal is in effect

    === "Example"

        - `delegate` - 0x3f0Aef9Bd799F1291b80376aD57530D353ab0217
        - `proxyType` - "Any"
        - `delay` - 0

??? function "**removeProxies**() — removes all of the proxy accounts delegated to the sender"

??? function "**isProxy**(real, delegate, proxyType, delay) — returns `true` if the delegate address is a proxy of type `proxyType`, for address `real`, with the specified `delay`"

    === "Parameters"

        - `real` ++"address"++ - the account granting permissions to the proxy
        - `delegate` ++"address"++ - the proxy address
        - `proxyType` ++"ProxyType"++ - the delegation type
        - `delay` ++"uint32"++ - number of blocks to wait

    === "Example"

        - `delegate` - 0xbB8919d5DDfc85F4D15820a9e58018f1cfB39a2F
        - `delegate` - 0x3f0Aef9Bd799F1291b80376aD57530D353ab0217
        - `proxyType` - "Any"
        - `delay` - 0

The `proxyType` parameter is defined by the following `ProxyType` enum, where the values start at `0` with the most permissive proxy type and are represented as `uint8` values:

```solidity
enum ProxyType {
    Any,
    NonTransfer,
    Governance,
    Staking,
    CancelProxy,
    Balances,
    AuthorMapping,
    IdentityJudgement
}
```

### Proxy Types {: #proxy-types }

There are multiple types of proxy roles that can be delegated to accounts, represented in `Proxy.sol` through the `ProxyType` enum. The following list includes all of the possible proxies and the type of transactions they can make on behalf of the primary account:

- **Any** — the any proxy will allow the proxy account to make any type of transaction. Note that balance transfers are only allowed to EOAs, not contracts or Precompiles
- **NonTransfer** — the non-transfer proxy allows the proxy account to make any type of transaction where the `msg.value` is checked to be zero
- **Governance** - the governance proxy will allow the proxy account to make any type of governance related transaction
- **CancelProxy** - the cancel proxy will allow the proxy account to reject and remove delayed proxy announcements (of the primary account). Currently, this is not an action supported by the Proxy Precompile
- **Balances** - the balances proxy will allow the proxy account to only make balance transfers to EOAs
 
!!! note
    The Solidity interface contains more proxy types than those listed above. The previous list includes only those proxy types implemented in the [baseline EVM Template](/builders/build/templates/evm/){target=\_blank}.

## Interact with the Solidity Interface via Remix {: #interact-with-the-solidity-interface-via-remix }

### Remix Set Up {: #remix-set-up }

You can interact with the Proxy precompile using [Remix](https://remix.ethereum.org){target=\_blank}. To add the precompile to Remix, you will need to:

1. Get a copy of [`Proxy.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/Proxy.sol){target=\_blank}
2. Paste the file contents into a Remix file named `Proxy.sol`

### Compile the Contract {: #compile-the-contract }

Next, you will need to compile the interface in Remix:

1. Click on the **Compile** tab, second from top
2. Then to compile the interface, click on **Compile Proxy.sol**

![Compiling Proxy.sol](/images/builders/toolkit/ethereum-api/precompiles/proxy/proxy-1.webp)

When compilation is completed, you will see a green checkmark next to the **Compile** tab.

### Access the Contract {: #access-the-contract }

Instead of deploying the smart contract, you will access the interface through its address:

1. Click on the **Deploy and Run** tab directly below the **Compile** tab in Remix
2. Make sure **Injected Provider - Metamask** is selected in the **ENVIRONMENT** dropdown. You may be prompted by MetaMask to connect your account to Remix if it's not already connected
3. Make sure the priimary account is displayed under **ACCOUNT**
4. Ensure **Proxy - Proxy.sol** is selected in the **CONTRACT** dropdown. Given that it is a precompiled contract, there is no deployment step. Instead, you are going to provide the address of the precompile in the **At Address** field
5. Provide the address of the Proxy precompile (which is `{{networks.dancebox.precompiles.proxy}}` in this example) and click **At Address**
6. The **Proxy** precompile will appear in the list of **Deployed Contracts**

![Access the address](/images/builders/toolkit/ethereum-api/precompiles/proxy/proxy-2.webp)

### Add a Proxy {: #add-proxy }

You can add a proxies for your account calling the precompile functions. In the following example, you will add a proxy allowed to execute any transaction on your behalf:

1. Expand the Proxy Precompile contract to see the available functions
2. Find the **addProxy** function and press the button to expand the section
3. Insert your second account's address as the **delegate**, `0` as **proxyType**, meaning `any`, and `0` as **delay**
4. Click **transact**
5. MetaMask will pop up, and you will be prompted to review the transaction details. Click Confirm to execute the transaction

!!! note
     When constructing the transaction in Remix, the **proxyType** is represented as a `uint8`, instead of the expected enum `ProxyType`. In Solidity, enums are compiled as `uint8`, so when you pass in `0` for **proxyType**, you indicate the first element in the `ProxyType` enum, which is the `any` proxy.

![Call the addProxy function](/images/builders/toolkit/ethereum-api/precompiles/proxy/proxy-3.webp)

### Check a Proxy Existence {: #check-proxy }

The function `isProxy` checks if a proxy account exists. After creating a proxy in the [previous step](#add-proxy), use the same parameters to verify that the proxy was successfully added:

1. Expand the **isProxy** function
2. Insert your primary account as **real**, your second account (proxy) as **delegate**, `0` as **proxyType**, and `0` as **delay**
3. Click **call**
4. The functions returns whether there is a proxy or not. In this example, the proxy exists, hence the function returns `true`

![Call the isProxy function](/images/builders/toolkit/ethereum-api/precompiles/proxy/proxy-4.webp)

### Remove a Proxy {: #remove-proxy }

You can revoke a proxy permission when it's no longer needed. After creating a proxy in the [Add Proxy](#add-proxy), step, it can be removed following these steps:

1. Expand the **removeProxy** function
2. Insert the proxy account as the **delegate**, `0` as **proxyType**, `0` and as **delay**
3. Click **transact** 
4. MetaMask will pop up, and you will be prompted to review the transaction details. Click Confirm to execute the transaction

After the transaction is confirmed, if you repeat the steps to [check for a proxy existence](#check-proxy), the result should be `false`.

![Call the removeProxy function](/images/builders/toolkit/ethereum-api/precompiles/proxy/proxy-5.webp)

And that's it! You've successfully interacted with the Proxy precompile using MetaMask and Remix!

--8<-- 'text/_disclaimers/third-party-content.md'