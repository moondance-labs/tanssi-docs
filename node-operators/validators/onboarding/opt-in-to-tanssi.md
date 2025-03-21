---
title: Opt-In to Tanssi
description: Learn how to opt-in your with registered node to Tanssi-enabled Symbiotic vaults and the Tanssi network to participate in the protocol and earn rewards.
icon: octicons-plus-circle-24
---

# Opt-In to Tanssi

## Introduction {: #introduction }

--8<-- 'text/node-operators/validators/onboarding/run-a-validator/intro.md'

Before being able to secure Tanssi-powered networks, node operators must ensure their node is [set up and running](/node-operators/validators/onboarding/run-a-validator/){target=\_blank}, they [have registered an operator in the Symbiotic registry](/node-operators/validators/onboarding/register-in-symbiotic/){target=\_blank}, and, finally, they have opted in to work with a Tanssi-enabled Symbiotic vault and the Tanssi network itself. This guide will walk through the steps to successfully opt into a Tanssi-enabled vault and the Tanssi network.

## Checking Prerequisites {: #checking-prerequisites }

If you have already [registered as an operator](/node-operators/validators/onboarding/register-in-symbiotic/){target=\_blank}, and before starting to secure Tanssi-powered networks, you must register your intention by opting into a Tanssi-enabled Symbiotic vault and the Tanssi network. Both steps require interacting with smart contracts, one from Symbiotic's core protocol and the other from Tanssi's integration with Symbiotic.

--8<-- 'text/node-operators/validators/onboarding/run-a-validator/prerequisites.md'

## Opt-In to Tanssi-Enabled Vaults {: #opt-in-tanssi-vaults }

Before enabling your operator to be an active Tanssi network validator, you must opt in to at least one of the Tanssi-enabled vaults. The following sections describe several ways to opt into the vaults.

### Opt-In Using the Symbiotic CLI {: #opt-in-tanssi-vaults-with-cli }

If you have correctly installed the [Symbiotic CLI](#setting-up-the-cli) and you want to sign the transaction using a ledger device, then run the following command, replacing the `VAULT_ADDRESS` with the specific one you want to join and `OPERATOR_ADDRESS` with your account:

=== "Mainnet"

    ```bash
    python3 symb.py opt-in-vault VAULT_ADDRESS --ledger --ledger-account OPERATOR_ADDRESS
    ```

=== "Testnet (Sepolia)"

    ```bash
    python3 symb.py opt-in-vault VAULT_ADDRESS --ledger --ledger-account OPERATOR_ADDRESS --chain sepolia
    ```

If you want to sign the transaction directly using the operator's account private key, then run the following command, replacing the `PRIVATE_KEY` parameter:

=== "Mainnet"

    ```bash
    python3 symb.py opt-in-vault VAULT_ADDRESS --private-key PRIVATE_KEY
    ```

=== "Testnet (Sepolia)"

    ```bash
    python3 symb.py opt-in-vault VAULT_ADDRESS --private-key PRIVATE_KEY --chain sepolia
    ```

!!! warning
    Note that this method requires you to expose your private key; therefore, it is not recommended.

### Opt-In Using Etherscan {: #opt-in-tanssi-vaults-with-etherscan }

You can interact with Symbiotic's smart contracts using Etherscan, and sign the transaction using a browser wallet ([Metamask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, for example). 

To open the contrat's page, open the link:

=== "Mainnet"

    [https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.opt_in_vault }}#writeContract](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.opt_in_vault }}#writeContract){target=\_blank}

=== "Testnet (Sepolia)"

    [https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.opt_in_vault }}#writeContract](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.opt_in_vault }}#writeContract){target=\_blank}

Click on `Connect to Web3`, and select your preferred wallet (e.g. Metamask):

![Connect to Web3 step](/images/node-operators/validators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-1.webp)

!!! note
    You can configure Metamask to use a cold wallet.

Once connected:

1. Expand the `optin` function
2. Insert the VAULT_ADDRESS
3. Click on `Write`, and sign the transaction

![Register the operator](/images/node-operators/validators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-2.webp)

### Opt-In Using Safe for Multi-sig Setups {: #opt-in-tanssi-vaults-with-safe }

If you have a [Safe](https://app.safe.global/){target=\_blank} account, then open the `Transaction builder` and insert the following contract address:

=== "Mainnet"

    {{ networks.symbiotic.contracts.mainnet.opt_in_vault }}

=== "Testnet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.opt_in_vault }}

Finally, pick the `optin` function, insert the VAULT_ADDRESS, and sign the transaction.

### Checking the Registration Status {: #checking-vault-registration }

You can quickly check your registration status on Etherscan. Open the following link:

=== "Mainnet"

    [https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.opt_in_vault }}#readContract](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.opt_in_vault }}#readContract){target=\_blank}

=== "Testnet (Sepolia)"

    [https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.opt_in_vault }}#readContract](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.opt_in_vault }}#readContract){target=\_blank}

In the contract's page:

1. Select the `isOptedIn` function
2. Paste your operator's account in the `who` field
3. Insert the VAULT_ADDRESS in the `where` field
4. Click on `Query`

 You'll get a `true` result if your operator was registered correctly and `false` otherwise.

![Check the registration status](/images/node-operators/validators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-3.webp)

You can also verify your registration status using the Symbiotic CLI running the following command, which prints `true` or `false` for any given OPERATOR_ADDRESS in a Tanssi-enabled vault:

=== "Mainnet"
    
    ```bash
    python3 symb.py check-opt-in-vault OPERATOR_ADDRESS VAULT_ADDRESS
    ```

=== "Testnet (Sepolia)"

    ```bash
    python3 symb.py check-opt-in-vault OPERATOR_ADDRESS VAULT_ADDRESS --chain sepolia
    ```

And the output looks like:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py check-opt-in-vault OPERATOR_ADDRESS VAULT_ADDRESS</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

## Opt-In to Tanssi Network {: #opt-in-tanssi }

Before enabling your operator to be an active Tanssi network validator, you must opt into the network and be approved by the Tanssi team. The following sections describe several ways to opt into the network.

### Opt-In Using the Symbiotic CLI {: #opt-in-tanssi-with-cli }

If you have correctly installed the [Symbiotic CLI](#setting-up-the-cli) and you want to sign the transaction using a ledger device, then run the following command, replacing the `OPERATOR_ADDRESS`:

=== "Mainnet"

    ```bash
    python3 symb.py opt-in-network TANSSI_NETWORK_ADDRESS --ledger --ledger-account OPERATOR_ADDRESS
    ```

=== "Testnet (Sepolia)"

    ```bash
    python3 symb.py opt-in-network TANSSI_NETWORK_ADDRESS --ledger --ledger-account OPERATOR_ADDRESS --chain sepolia
    ```

If you want to sign the transaction directly using the operator's account private key, then run the following command, replacing the `PRIVATE_KEY` parameter:

=== "Mainnet"

    ```bash
    python3 symb.py opt-in-network TANSSI_NETWORK_ADDRESS --private-key PRIVATE_KEY
    ```

=== "Testnet (Sepolia)"

    ```bash
    python3 symb.py opt-in-network TANSSI_NETWORK_ADDRESS --private-key PRIVATE_KEY --chain sepolia
    ```

!!! warning
    Note that this method requires you to expose your private key; therefore, it is not recommended.

### Opt-In Using Etherscan {: #opt-in-tanssi-with-etherscan }

You can interact with Symbiotic's smart contracts using Etherscan and sign the transaction using a browser wallet ([Metamask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, for example). 

Go to the contract's page by opening the link:

=== "Mainnet"

    [https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.opt_in_network }}#writeContract](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.opt_in_network }}#writeContract){target=\_blank}

=== "Testnet (Sepolia)"

    [https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.opt_in_network }}#writeContract](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.opt_in_network }}#writeContract){target=\_blank}

Click on `Connect to Web3`, and select your preferred wallet (e.g. Metamask):

![Connect to Web3 step](/images/node-operators/validators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-4.webp)

!!! note
    You can configure Metamask to use a cold wallet.

Once connected:

1. Expand the `optin` function
2. Insert the TANSSI_NETWORK_ADDRESS
3. Click on `Write`, and sign the transaction

![Register the operator](/images/node-operators/validators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-5.webp)

### Opt-In Using Safe for Multi-sig Setups {: #opt-in-tanssi-with-safe }

If you have a [Safe](https://app.safe.global/){target=\_blank} account, then open the `Transaction builder` and insert the following contract address:

=== "Mainnet"

    {{ networks.symbiotic.contracts.mainnet.opt_in_network }}

=== "Testnet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.opt_in_network }}

Finally, pick the `optin` function, insert the TANSSI_NETWORK_ADDRESS, and sign the transaction.

### Checking the Registration Status {: #checking-tanssi-registration }

You can quickly check your registration status on Etherscan. Open the following link:

=== "Mainnet"

    [https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.opt_in_network }}#readContract](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.opt_in_network }}#readContract){target=\_blank}

=== "Testnet (Sepolia)"

    [https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.opt_in_network }}#readContract](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.opt_in_network }}#readContract){target=\_blank}

In the contract's page:

1. Select the `isOptedIn` function
2. Paste your operator's account in the `who` field
3. Insert the TANSSI_NETWORK_ADDRESS in the `where` field
4. Click on `Query`

You'll get a `true` result if your operator was registered correctly and `false` otherwise.

![Check the registration status](/images/node-operators/validators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-6.webp)

You can also verify your registration status using the Symbiotic CLI running the following command, which prints `true` or `false` for any given OPERATOR_ADDRESS in the Tanssi Network:

=== "Mainnet"
    
    ```bash
    python3 symb.py check-opt-in-network OPERATOR_ADDRESS TANSSI_NETWORK_ADDRESS
    ```

=== "Testnet (Sepolia)"

    ```bash
    python3 symb.py check-opt-in-network OPERATOR_ADDRESS TANSSI_NETWORK_ADDRESS --chain sepolia
    ```

And the output looks like:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py check-opt-in-network OPERATOR_ADDRESS TANSSI_NETWORK_ADDRESS</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

!!! note
    Opting-in to the Tanssi Networks requires approval by the Tanssi team. Requests to join could take up to one week.