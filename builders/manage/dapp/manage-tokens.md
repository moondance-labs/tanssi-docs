---
title: Manage Tokens
description: Learn how the appchain governor can manage the token of a Tanssi-powered appchain using the dApp to mint them, configure the EIP-1559 fee market, and more.
---

# Manage Tokens

## Introduction {: #introduction }

Any appchain deployed through Tanssi is sovereign and free to define the governance model that best fits its use case. The appchain governor has superpowers over the chain administration, meaning privileged functions, such as updating the runtime, fall within their reach.

There are some actions related to the native token management that are available to the appchain governor on the Tanssi dApp:

- **Mint tokens** - mints new tokens, increasing the total supply
- **Update Balances** - increases or decreases the balance of an account, affecting the total supply
- **Transfer Tokens** - executes a forced token transfer from one account to another
- **Configure Gas Dynamics** - only available on EVM-compatible appchains, this action changes the [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md){target=\_blank} configuration, affecting the transaction pricing mechanism

In this guide, you'll learn how to execute the previously listed actions using the [Tanssi dApp](https://apps.tanssi.network){target=\_blank}.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

- A Tanssi appchain (Snap or Dedicated)
- The account you used when registering the appchain, imported in any of the [supported wallets](/builders/deploy/dapp/#supported-wallets){target=\_blank}
- Your appchain's Sudo account, also imported in any of the [supported wallets](/builders/deploy/dapp/#supported-wallets){target=\_blank}

!!! note
    The appchain's registration account is always a Substrate one, whereas the appchain's Sudo account depends on the chain type. If the chain is EVM-compatible, then the Sudo account will be an Ethereum type and, otherwise, a Substrate type.

### Retrieving the Registration Account {: #retrieving-registration-account }

If you're unsure what your registration account is, you can query it directly from the Tanssi orchestrator chain, which keeps records of every registered appchain. To do so, head to the **Chain state** section on the Polkadot.js Apps connected to the orchestrator chain for [snap appchains](https://polkadot.js.org/apps/?rpc=wss://fraa-flashbox-2607-rpc.a.stagenet.tanssi.network#/chainstate){target=\_blank} or [dedicated appchains](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/chainstate){target=\_blank}, and take the following steps:

1. Select the **registrar** storage module
2. Select **registrarDeposit**
3. Insert your appchain ID
4. Press **+** icon

You'll see the registration account at the bottom.

![Locating your registration account](/images/builders/manage/dapp/token-management/token-management-1.webp)

### Retrieving the Sudo Account {: #retrieving-sudo-account }

If you're unsure what your Tanssi appchain's Sudo account is, you can find it in your [Tanssi Dashboard](https://apps.tanssi.network){target=\_blank} underneath the **Properties** section.

![Locating your Sudo address on apps.tanssi.network](/images/builders/manage/dapp/token-management/token-management-2.webp)

!!! warning
    You should always protect your Sudo account key with the utmost security precautions, as it grants privileged access to your Tanssi appchain.

## Accessing the Token Management Panel {: #accesing-token-management-panel }

The Tanssi dApp implements a smooth interface, allowing the appchain governor to access and execute privileged functions. To do so, head to the [Tanssi dApp](https://apps.tanssi.network/){target=\_blank}, click on the **Manage** button, and then, again click on the **Token Management** button.

![Accessing the token management panel](/images/builders/manage/dapp/token-management/token-management-3.webp)

Now you have direct access to the actions presented in the introduction:

1. **Mint tokens**
2. **Update Balances**
3. **Transfer Tokens**
4. Configure **Gas Dynamics** 

![The token management panel](/images/builders/manage/dapp/token-management/token-management-4.webp)

!!! note
    If you don't see a card with your appchain's details, make sure to comply with the [prerequisites](#checking-prerequisites).

### Minting Tokens {: #minting-tokens }

The appchain governor can mint new tokens, increasing its total supply. In the **Token Management** panel, click on the **Mint tokens** button, and then:

1. Insert the address that will hold the newly minted tokens
2. Insert the amount of tokens to mint
3. Click on **Mint**

![Mint tokens](/images/builders/manage/dapp/token-management/token-management-5.webp)

You'll be asked to sign the transaction with the appchain's governor account. Once the transaction has gone through, the destination account's balance will have been increased by the desired amount.

!!! note
    The destination address must be Ethereum type if the chain is EVM-compatible and a Substrate type otherwise.

### Updating Balances {: #updating-balances }

The appchain governor can increase or decrease the balance of any account, thus affecting the total supply. In the **Token Management** panel, click on the **Update Balances** button, and then:

1. Insert the address that will hold the newly minted tokens. Once you enter the address, its current balance will be displayed
2. Insert the new balance the address will hold
3. Click on **Update**

![Update Balances](/images/builders/manage/dapp/token-management/token-management-6.webp)

You'll be asked to sign the transaction with the appchain's governor account. Once the transaction has gone through, the destination account's balance will reflect exactly the desired amount, regardless of previous holdings.

!!! note
    The destination address must be Ethereum type if the chain is EVM-compatible and a Substrate type otherwise.

### Executing Forced Transfers {: #forced-transfers }

The appchain governor can reassign balances, forcing a token transfer from one account to another. In the **Token Management** panel, click on the **Transfer Tokens** button, and then:

1. Insert the origin address that will transfer its tokens
2. Insert the destination address that will receive the tokens
3. Insert the amount of tokens to transfer
4. Click on **Transfer**

![Transfer Tokens](/images/builders/manage/dapp/token-management/token-management-7.webp)

You'll be asked to sign the transaction with the appchain's governor account. Once the transaction has gone through, the destination account will have received the number of tokens from the origin address.

!!! note
    The origin and destination addresses must be Ethereum type if the chain is EVM-compatible and Substrate type otherwise.

### Setting Gas Dynamics {: #setting-gas }

The governor of an EVM-compatible appchain can change its [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md){target=\_blank} configuration, affecting the transaction pricing mechanism. In the **Token Management** panel, click on the **Gas Dynamics** button, and then:

1. Insert the new base fee, expressed in Wei units (10<sup>-18</sup>)
2. Insert the elasticity value
3. Click on **Update Dynamics**

![Configure Gas Dynamics](/images/builders/manage/dapp/token-management/token-management-8.webp)

You'll be asked to sign the transaction with the appchain's governor account. Once the transaction has gone through, the appchain's fee mechanism will run with the new transaction pricing parameters.

!!! note
    This option only applies to EVM-compatible appchains.