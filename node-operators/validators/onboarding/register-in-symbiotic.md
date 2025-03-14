---
title: Register in Symbiotic
description: Learn how to register your node in the Symbiotic registry as a first step to participate in the protocol, securing Tanssi-powered networks and earning rewards.
icon: octicons-shield-check-24
---

# Register in Symbiotic

## Introduction {: #introduction }

--8<-- 'text/node-operators/validators/onboarding/run-a-validator/intro.md'

Before being able to secure Tanssi-powered networks, node operators must [set up the node](/node-operators/validators/onboarding/run-a-validator/){target=\_blank} and register as operators in the Symbiotic protocol. This guide will walk you through the steps to successfully register your node as an operator.

## Checking Prerequisites {: #checking-prerequisites }

If you have already [set up the node](/node-operators/validators/onboarding/run-a-validator/){target=\_blank} and it is running, your next step is calling one of Symbiotic's core smart contracts: `registerOperator`.

--8<-- 'text/node-operators/validators/onboarding/run-a-validator/prerequisites.md'

## Registering as an Operator {: #registering-operator }

The Symbiotic protocol keeps a registry of all operators. Before being able to secure Tanssi-powered networks, node operators must register as operators in the Symbiotic protocol using one of the methods described in the following sections.

### Register Using the Symbiotic CLI {: #register-with-cli }

If you correctly installed the [Symbiotic CLI](#setting-up-the-cli) and you want to sign the transaction using a ledger device, then run the following command, replacing the `OPERATOR_ADDRESS` with your account:

=== "Mainnet"

    ```bash
    python3 symb.py register-operator --ledger --ledger-account OPERATOR_ADDRESS
    ```

=== "Testnet (Holesky)"

    ```bash
    python3 symb.py register-operator --ledger --ledger-account OPERATOR_ADDRESS --chain holesky
    ```

If you want to sign the transaction directly using the account private key, then run the following command, replacing the `PRIVATE_KEY` parameter:

=== "Mainnet"

    ```bash
    python3 symb.py register-operator --private-key PRIVATE_KEY
    ```

=== "Testnet (Holesky)"

    ```bash
    python3 symb.py register-operator --private-key PRIVATE_KEY --chain holesky
    ```

!!! warning
    Note that this method requires you to expose your private key; therefore, it is not recommended.

### Register Using Etherscan {: #register-with-etherscan }

You can interact with Symbiotic's smart contracts using Etherscan and sign the transaction using a browser wallet ([Metamask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, for example). 

Go to the contract's page by opening the link:

=== "Mainnet"

    [https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.operators_registry }}#writeContract](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.operators_registry }}#writeContract){target=\_blank}

=== "Testnet (Holesky)"

    [https://holesky.etherscan.io/address/{{ networks.symbiotic.contracts.holesky.operators_registry }}#writeContract](https://holesky.etherscan.io/address/{{ networks.symbiotic.contracts.holesky.operators_registry }}#writeContract){target=\_blank}

Click on `Connect to Web3`, and select your preferred wallet (e.g. Metamask):

![Connect to Web3 step](/images/node-operators/validators/onboarding/register-in-symbiotic/register-in-symbiotic-1.webp)

!!! note
    You can configure Metamask to use a cold wallet.

Once connected:

1. Expand the `registerOperator` function
2. Click on `Write`, and sign the transaction.

![Register the operator](/images/node-operators/validators/onboarding/register-in-symbiotic/register-in-symbiotic-2.webp)

### Register Using Safe for Multi-sig Setups {: #register-with-safe }

If you have a [Safe](https://app.safe.global/){target=\_blank} account, then open the `Transaction builder` and insert the following contract address:

=== "Mainnet"

    {{ networks.symbiotic.contracts.mainnet.operators_registry }}

=== "Testnet (Holesky)"

    {{ networks.symbiotic.contracts.holesky.operators_registry }}

Finally, pick the `registerOperator` function and sign the transaction.

## Checking the Registration Status {: #checking-registration }

You can quickly check your registration status on Etherscan. Open the following link:

=== "Mainnet"

    [https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.operators_registry }}#readContract](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.operators_registry }}#readContract){target=\_blank}

=== "Testnet (Holesky)"

    [https://holesky.etherscan.io/address/{{ networks.symbiotic.contracts.holesky.operators_registry }}#readContract](https://holesky.etherscan.io/address/{{ networks.symbiotic.contracts.holesky.operators_registry }}#readContract){target=\_blank}

On the contract's page:

1. Select the `isEntity` function
2. Paste your operator's account
3. Click on `Query` 

If your operator was registered correctly, you'll get a `true` result, and otherwise, `false`

![Check the registration status](/images/node-operators/validators/onboarding/register-in-symbiotic/register-in-symbiotic-3.webp)

You can also verify your registration status using the Symbiotic CLI running the following command, which prints `true` or `false` for any given OPERATOR_ADDRESS:

=== "Mainnet"
    
    ```bash
    python3 symb.py isop OPERATOR_ADDRESS
    ```

=== "Testnet (Holesky)"

    ```bash
    python3 symb.py isop OPERATOR_ADDRESS --chain holesky
    ```

And the output looks like:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py isop OPERATOR_ADDRESS</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

## Submitting Metadata {: #submitting-metadata }

Once your operator is successfully registered, you can add metadata (e.g., logo) to improve its visibility in the [Symbiotic website](httos://app.symbiotic.fi){target=\_blank}.

To submit your operator's metadata, head to the Symbiotic metadata repository:

=== "Mainnet"

    [https://github.com/symbioticfi/metadata-mainnet](https://github.com/symbioticfi/metadata-mainnet){target=\_blank}

=== "Testnet (Holesky)"

    [https://github.com/symbioticfi/metadata-holesky](https://github.com/symbioticfi/metadata-holesky){target=\_blank}

Create a fork of this repo and, within the `operators` directory, create a new directory named after your operator's address. Within your operator's directory, add your `logo.png` and a file named `info.json` with the following fields, replacing the values with your own:

```json
{
	"name": "YOUR_OPERATOR_NAME",
	"description": "YOUR_OPERATOR_DESCRIPTION",
	"tags": [
		"operator"
	],
	"links": [
		{
			"type": "website",
			"name": "Website",
			"url": "https://YOUR_WEBSITE_URL"
		},
		{
			"type": "website",
			"name": "X",
			"url": "https://YOUR_X_URL"
		}
	]
}
```

!!! note
    The `links` parameter is an array. Add as many links as you need.

Finally, open a pull request. The Symbiotic team will review it and merge it.