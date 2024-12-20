---
title: Manage Tokens
description: Learn how the network governor can manage the token of a Tanssi-powered network using the dApp to mint them, configure the EIP-1559 fee market, and more.
icon: octicons-database-24
---

# Manage Tokens

## Introduction {: #introduction }

Any network deployed through Tanssi is sovereign and free to define the governance model that best fits its use case. The network governor has superpowers over the chain administration. Consequently, they can call privileged functions, such as updating the runtime and managing native token-related operations, among other actions.

There are some actions related to the native token management that are available to the network governor on the Tanssi dApp:

- **Mint tokens** - mints new tokens, increasing the total supply
- **Update balances** - increases or decreases the balance of an account, affecting the total supply
- **Transfer tokens** - executes a forced token transfer from one account to another
- **Configure gas dynamics** - only available on EVM-compatible networks, this action changes the [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md){target=\_blank} configuration, affecting the transaction pricing mechanism

In this guide, you'll learn how to execute the previously listed actions using the [Tanssi dApp](https://apps.tanssi.network){target=\_blank}.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

- A Tanssi-powered network (Quick Trial or Dedicated)
--8<-- 'text/builders/manage/dapp/prerequisites.md'

## Accessing the Token Management Panel {: #accesing-token-management-panel }

The Tanssi dApp implements a smooth interface, allowing the network governor to access and execute privileged functions. To do so, head to the [Tanssi dApp](https://apps.tanssi.network/){target=\_blank}, and then:

1. Click on the **Manage** button
2. Click on the **Token Management** button.

![Accessing the token management panel](/images/builders/manage/dapp/token-management/token-management-1.webp)

Now you have direct access to the actions presented in the introduction:

1. **Mint Tokens**
2. **Update Balances**
3. **Transfer Tokens**
4. Configure **Gas Dynamics** 

![The token management panel](/images/builders/manage/dapp/token-management/token-management-2.webp)

!!! note
    If you don't see your network's details on the dashboard, make sure to comply with the [prerequisites](#checking-prerequisites).

### Minting Tokens {: #minting-tokens }

The network governor can mint new tokens, increasing its total supply. To do so, in the **Token Management** panel, click on the **Mint tokens** button, and then:

1. Insert the address that will hold the newly minted tokens

    !!! note
        The destination address must be Ethereum type if the chain is EVM-compatible and a Substrate type otherwise.

2. Insert the amount of tokens to mint
3. Click on **Mint**

![Mint tokens](/images/builders/manage/dapp/token-management/token-management-3.webp)

You'll be asked to sign the transaction with the network's governor account. Once the transaction has gone through, the destination account's balance will have been increased by the desired amount.

### Updating Balances {: #updating-balances }

The network governor can increase or decrease the balance of any account, thus affecting the total supply. To do so, in the **Token Management** panel, click on the **Update Balances** button, and then:

1. Insert the address that will hold the newly minted tokens. Once you enter the address, its current balance will be displayed

    !!! note
        The destination address must be Ethereum type if the chain is EVM-compatible and a Substrate type otherwise.
    
2. Insert the new balance the address will hold
3. Click on **Update**

![Update Balances](/images/builders/manage/dapp/token-management/token-management-4.webp)

You'll be asked to sign the transaction with the network's governor account. Once the transaction has gone through, the destination account's balance will reflect exactly the desired amount, regardless of previous holdings.

### Executing Forced Transfers {: #forced-transfers }

The network governor can reassign balances, forcing a token transfer from one account to another. To do so, in the **Token Management** panel, click on the **Transfer Tokens** button, and then:

1. Insert the origin address that will transfer its tokens
2. Insert the destination address that will receive the tokens

    !!! note
        The origin and destination addresses must be Ethereum type if the chain is EVM-compatible and Substrate type otherwise.

3. Insert the amount of tokens to transfer
4. Click on **Transfer**

![Transfer Tokens](/images/builders/manage/dapp/token-management/token-management-5.webp)

You'll be asked to sign the transaction with the network's governor account. Once the transaction has gone through, the destination account will have received the number of tokens from the origin address.

### Setting Gas Dynamics {: #setting-gas }

!!! note
    This option only applies to EVM-compatible networks.

The governor of a Tanssi-powered EVM-compatible network can change its [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md){target=\_blank} configuration, affecting the transaction pricing mechanism. To do so, in the **Token Management** panel, click on the **Gas Dynamics** button, and then:

1. Insert the new base fee, expressed in Wei units (10<sup>-18</sup>)
2. Insert the elasticity value
3. Click on **Update Dynamics**

![Configure Gas Dynamics](/images/builders/manage/dapp/token-management/token-management-6.webp)

You'll be asked to sign the transaction with the network's governor account. Once the transaction has gone through, the network's fee mechanism will run with the new transaction pricing parameters.