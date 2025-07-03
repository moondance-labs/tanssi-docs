---
title: Opt In to Tanssi
description: Learn how to opt in with your registered node to Tanssi-enabled Symbiotic vaults and the Tanssi network to participate in the protocol and earn rewards.
icon: octicons-plus-circle-24
categories: Operators
---

# Opt In to Tanssi

## Introduction {: #introduction }

--8<-- 'text/node-operators/operators/onboarding/run-an-operator/intro.md'

This guide will walk through the steps to successfully opt into a Tanssi-enabled vault and the Tanssi network.

## Checking Prerequisites {: #checking-prerequisites }

Before opting into a Tanssi-enabled vault and the Tanssi network, make sure that:

- You have a node correctly [set up and running](/node-operators/operators/onboarding/run-an-operator/){target=\_blank}
- You [have registered as an operator](/node-operators/operators/onboarding/register-in-symbiotic/){target=\_blank} in the Symbiotic registry 

To follow this guide, you must interact with smart contracts, one from Symbiotic's core protocol and the other from Tanssi's integration with Symbiotic.

--8<-- 'text/node-operators/operators/onboarding/run-an-operator/prerequisites.md'

## Opt In to Tanssi-Enabled Vaults {: #opt-in-tanssi-vaults }

Before enabling your operator to be active within the Tanssi network, you must opt in to at least one of the Tanssi-enabled vaults. The following sections describe several ways to opt into the vaults.

### Opt In Using the Symbiotic CLI {: #opt-in-tanssi-vaults-with-cli }

If you have correctly installed the [Symbiotic CLI](#set-up-the-cli) and you want to sign the transaction using a Ledger device, then run the following command, replacing `INSERT_VAULT_ADDRESS` with the specific one you want to join and `INSERT_OPERATOR_ADDRESS` with your account:

=== "MainNet"

    ```bash
    python3 symb.py opt-in-vault INSERT_VAULT_ADDRESS --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-in-vault {{ networks.symbiotic.contracts.sepolia.vault }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

If you want to sign the transaction directly using the operator's account private key, then run the following command, replacing the `INSERT_PRIVATE_KEY` parameter:

=== "MainNet"

    ```bash
    python3 symb.py opt-in-vault INSERT_VAULT_ADDRESS --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-in-vault {{ networks.symbiotic.contracts.sepolia.vault }} --private-key INSERT_PRIVATE_KEY
    ```

!!! warning
    Note that this method requires you to expose your private key; therefore, it is not recommended.

### Opt In Using Etherscan {: #opt-in-tanssi-vaults-with-etherscan }

You can interact with Symbiotic's smart contracts using Etherscan, and sign the transaction using a browser wallet ([MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, for example). 

To open the contract's page, open the link:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#writeContract){target=\_blank}

Click on **Connect to Web3**, and select your preferred wallet (e.g. MetaMask):

![Connect to Web3 step](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-1.webp)

!!! note
    You can configure MetaMask to use a cold wallet.

Once connected:

1. Expand the **`optin`** function
2. Insert the `VAULT_ADDRESS` (`{{ networks.symbiotic.contracts.sepolia.vault }}` on Sepolia TestNet)
3. Click on **Write**, and sign the transaction

![Register the operator](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-2.webp)

### Opt In Using Safe for Multisig Setups {: #opt-in-tanssi-vaults-with-safe }

If you have a [Safe](https://app.safe.global/){target=\_blank} account, then open the **Transaction builder** and insert the following contract address:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.vault_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.vault_registry }}

Finally, pick the **`optin`** function, insert the `VAULT_ADDRESS` (`{{ networks.symbiotic.contracts.sepolia.vault }}` on Sepolia TestNet), and sign the transaction.

### Check the Registration Status {: #check-vault-registration }

You can quickly check your registration status on Etherscan. Open the following link:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#readContract){target=\_blank}

In the contract's page:

1. Select the **`isOptedIn`** function
2. Paste your operator's account in the **who** field
3. Insert the `VAULT_ADDRESS` in the **where** field
4. Click on **Query**

 You'll get a `true` result if your operator was registered correctly and `false` otherwise.

![Check the registration status](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-3.webp)

You can also verify your registration status using the Symbiotic CLI running the following command, which prints `true` or `false` for any given operator address in a Tanssi-enabled vault:

=== "MainNet"
    
    ```bash
    python3 symb.py check-opt-in-vault INSERT_OPERATOR_ADDRESS INSERT_VAULT_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia check-opt-in-vault INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.vault }}
    ```

And the output looks like:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py check-opt-in-vault INSERT_OPERATOR_ADDRESS INSERT_VAULT_ADDRESS</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

## Opt In to the Tanssi Network {: #opt-in-tanssi }

Before enabling your operator to be a active within the Tanssi network, you must opt into the network and be approved by the Tanssi team. The following sections describe several ways to opt into the network.

!!! note
    The MainNet Tanssi Network address will be disclosed upon launch.

### Opt In Using the Symbiotic CLI {: #opt-in-tanssi-with-cli }

If you have correctly installed the [Symbiotic CLI](#set-up-the-cli) and you want to sign the transaction using a Ledger device, then run the following command, replacing `INSERT_OPERATOR_ADDRESS`:

=== "MainNet"

    ```bash
    python3 symb.py opt-in-network {{ networks.symbiotic.contracts.mainnet.tanssi_network }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-in-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

If you want to sign the transaction directly using the operator's account private key, then run the following command, replacing the `INSERT_PRIVATE_KEY` parameter:

=== "MainNet"

    ```bash
    python3 symb.py opt-in-network {{ networks.symbiotic.contracts.mainnet.tanssi_network }} --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-in-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --private-key INSERT_PRIVATE_KEY
    ```

!!! warning
    Note that this method requires you to expose your private key; therefore, it is not recommended.

### Opt In Using Etherscan {: #opt-in-tanssi-with-etherscan }

You can interact with Symbiotic's smart contracts using Etherscan and sign the transaction using a browser wallet ([MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, for example). 

Go to the contract's page by opening the link:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#writeContract){target=\_blank}

Click on **Connect to Web3**, and select your preferred wallet (e.g. MetaMask):

![Connect to Web3 step](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-4.webp)

!!! note
    You can configure MetaMask to use a cold wallet.

Once connected:

1. Expand the **`optin`** function
2. Insert the `TANSSI_NETWORK_ADDRESS` (`{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet)
3. Click on **Write**, and sign the transaction

![Register the operator](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-5.webp)

### Opt In Using Safe for Multisig Setups {: #opt-in-tanssi-with-safe }

If you have a [Safe](https://app.safe.global/){target=\_blank} account, then open the **Transaction builder** and insert the following contract address:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.network_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.network_registry }}

Finally, pick the **`optin`** function, insert the  (`{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet), and sign the transaction.

### Check the Registration Status {: #check-tanssi-registration }

You can quickly check your registration status on Etherscan. Open the following link:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#readContract){target=\_blank}

On the contract's page:

1. Select the **`isOptedIn`** function
2. Paste your operator's account in the **who** field
3. Insert the `TANSSI_NETWORK_ADDRESS` in the **where** field (`{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet)
4. Click on **Query**

You'll get a `true` result if your operator was registered correctly and `false` otherwise.

![Check the registration status](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-6.webp)

You can also verify your registration status using the Symbiotic CLI running the following command, which prints `true` or `false` for any given operator address in the Tanssi Network:

=== "MainNet"
    
    ```bash
    python3 symb.py check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.mainnet.tanssi_network }}
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.tanssi_network }} 
    ```

And the output looks like:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.tanssi_network }}</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

!!! note
    Opting in to the Tanssi Networks requires approval by the Tanssi team. Requests to join could take up to one week.
