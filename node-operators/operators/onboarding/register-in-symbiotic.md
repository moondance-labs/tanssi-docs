---
title: Register in Symbiotic
description: Learn how to register your node in the Symbiotic registry as a first step to participate in the protocol, securing Tanssi-powered networks and earning rewards.
icon: octicons-shield-check-24
---

# Register in Symbiotic

## Introduction {: #introduction }

--8<-- 'text/node-operators/operators/onboarding/run-an-operator/intro.md'

This guide will walk you through the steps to successfully register your node as a Symbiotic operator.

## Checking Prerequisites {: #checking-prerequisites }

Before registering as an operator, ensure you have already [set up the node](/node-operators/operators/onboarding/run-an-operator/){target=\_blank} and it is running.

To follow this guide, you must interact with smart contracts.
--8<-- 'text/node-operators/operators/onboarding/run-an-operator/prerequisites.md'

## Register as an Operator {: #registering-operator }

The Symbiotic protocol keeps a registry of all operators. Before being able to secure Tanssi-powered networks, node operators must register as operators in the Symbiotic protocol using one of the methods described in the following sections.

### Register Using the Symbiotic CLI {: #register-with-cli }

If you correctly installed the [Symbiotic CLI](#set-up-the-cli) and you want to sign the transaction using a Ledger device, then run the following command, replacing `INSERT_OPERATOR_ADDRESS` with your account:

=== "MainNet"

    ```bash
    python3 symb.py register-operator --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia register-operator --ledger --ledger-account INSERT_OPERATOR_ADDRESS 
    ```

If you want to sign the transaction directly using the account private key, then run the following command, replacing the `INSERT_PRIVATE_KEY` parameter:

=== "MainNet"

    ```bash
    python3 symb.py register-operator --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia register-operator --private-key INSERT_PRIVATE_KEY
    ```

!!! warning
    Note that this method requires you to expose your private key; therefore, it is not recommended.

### Register Using Etherscan {: #register-with-etherscan }

You can interact with Symbiotic's smart contracts using Etherscan and sign the transaction using a browser wallet ([MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, for example). 

Go to the contract's page by opening the link:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.operators_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.operators_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.operators_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.operators_registry }}#writeContract){target=\_blank}

Click on **Connect to Web3**, and select your preferred wallet (e.g. MetaMask):

![Connect to Web3 step](/images/node-operators/operators/onboarding/register-in-symbiotic/register-in-symbiotic-1.webp)

!!! note
    You can configure MetaMask to use a cold wallet.

Once connected:

1. Expand the **`registerOperator`** function
2. Click on **Write**, and sign the transaction

![Register the operator](/images/node-operators/operators/onboarding/register-in-symbiotic/register-in-symbiotic-2.webp)

### Register Using Safe for Multisig Setups {: #register-with-safe }

If you have a [Safe](https://app.safe.global/){target=\_blank} account, then open the **Transaction builder** and insert the following contract address:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.operators_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.operators_registry }}

Finally, pick the **`registerOperator`** function and sign the transaction.

## Check the Registration Status {: #check-registration }

You can quickly check your registration status on Etherscan. Open the following link:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.operators_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.operators_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.operators_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.operators_registry }}#readContract){target=\_blank}

On the contract's page:

1. Select the **`isEntity`** function
2. Paste your operator's account
3. Click on **Query**

If your operator was registered correctly, you'll get a `true` result, and otherwise, `false`

![Check the registration status](/images/node-operators/operators/onboarding/register-in-symbiotic/register-in-symbiotic-3.webp)

You can also verify your registration status using the Symbiotic CLI running the following command, which prints `true` or `false` for any given operator address:

=== "MainNet"
    
    ```bash
    python3 symb.py isop INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia isop INSERT_OPERATOR_ADDRESS 
    ```

And the output looks like:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py isop INSERT_OPERATOR_ADDRESS</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

## Submit Metadata {: #submitting-metadata }

Once your operator is successfully registered, you can add metadata (e.g., logo) to improve its visibility on the [Symbiotic website](https://app.symbiotic.fi){target=\_blank}.

To submit your operator's metadata, head to the Symbiotic metadata repository:

=== "MainNet"

    [MainNet repository](https://github.com/symbioticfi/metadata-mainnet){target=\_blank}

Create a fork of this repo and, within the `operators` directory, create a new directory named after your operator's address. Within your operator's directory, add your `logo.png` and a file named `info.json` with the following fields, replacing the values with your own:

```json title="info.json"
{
	"name": "INSERT_YOUR_OPERATOR_NAME",
	"description": "INSERT_YOUR_OPERATOR_DESCRIPTION",
	"tags": [
		"operator"
	],
	"links": [
		{
			"type": "website",
			"name": "Website",
			"url": "https://INSERT_YOUR_WEBSITE_URL"
		},
		{
			"type": "website",
			"name": "X",
			"url": "https://INSERT_YOUR_X_URL"
		}
	]
}
```

!!! note
    The `links` parameter is an array. Add as many links as you need.

Finally, open a pull request. The Symbiotic team will review it and merge it.
