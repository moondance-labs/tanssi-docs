---
title: Vault Opt Out
description: Optionally opt out of a Tanssi vault. Learn how using CLI, Etherscan, or Safe, and verify your vault opt out status.
icon: octicons-sign-out-24
template: main.html
---

# Vault Opt Out (Optional)

## Introduction {: #introduction }

This page details the optional final step in the Tanssi offboarding process: opting out of a specific vault. While not mandatory, this action allows operators to disassociate their accounts from individual vaults. Before you go ahead with this step, please make sure you have met all the conditions outlined in our [prerequisites](/node-operators/operators/offboarding/prerequisites/){target=\_blank} guide.

This guide provides instructions for opting out using one of several available methods and for verifying the successful completion of this action.

## Opting Out of a Vault {: #opting-out-of-a-vault }

To proceed with opting out of a vault, you can utilize one of the methods detailed in the following sections.

### Using the Symbiotic CLI {: #opt-out-vault-with-cli }

Using a Ledger device:

=== "MainNet"

    ```bash
    python3 symb.py opt-out-vault INSERT_VAULT_ADDRESS --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-out-vault {{ networks.symbiotic.contracts.sepolia.vault }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

For signing with a private key:

=== "MainNet"

    ```bash
    python3 symb.py opt-out-vault INSERT_VAULT_ADDRESS --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-out-vault {{ networks.symbiotic.contracts.sepolia.vault }} --private-key INSERT_PRIVATE_KEY
    ```

!!! warning
    Note that this method requires you to expose your private key; therefore, it is not recommended.

### Using Etherscan {: #opt-out-vault-with-etherscan }

Access the contract through Etherscan:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#writeContract){target=\_blank}

Make sure to select **Contract** and **Write Contract**, then click on **Connect to Web3**, and select your preferred wallet (e.g., MetaMask):
![Connect to Web3 step](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-4.webp)

1. Expand the **optOut** function
2. Insert the `VAULT_ADDRESS` in the **where** field (e.g., `{{ networks.symbiotic.contracts.sepolia.vault }}` on Sepolia TestNet)
3. Click **Write** and sign the transaction

![Opt out operator](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-5.webp)

### Using Safe {: #opt-out-vault-with-safe }

For Safe accounts, use these contract addresses in the **Transaction Builder**:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.vault_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.vault_registry }}

Finally, pick the optOut function, insert the `VAULT_ADDRESS` to which your node is currently registered (e.g., `{{ networks.symbiotic.contracts.sepolia.vault }}` on Sepolia TestNet), and sign the transaction.

## Verify Vault Opt Out Status {: #verify-vault-opt-out-status }

After submitting the vault opt out transaction, you can verify your opt out status using one of the methods in the following sections.

### Using Etherscan

You can check your vault opt out status on Etherscan:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#readContract){target=\_blank}

On the contract's page:

Make sure to select **Contract** and **Write Contract**, then click on **Connect to Web3**, and select your preferred wallet (e.g., MetaMask):

1. Select the **isOptedIn** function
2. Paste your operator's account in the **who** field
3. Insert the vault address in the **where** field
4. Click on **Query**

You'll get a `false` result if your operator has successfully opted out of the vault, and `true` if they are still opted in.

![Check the registration status](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-6.webp)

### Using the Symbiotic CLI

You can also verify your vault opt out status using the Symbiotic CLI:

=== "MainNet"

    ```bash
    python3 symb.py check-opt-in-vault INSERT_OPERATOR_ADDRESS INSERT_VAULT_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia check-opt-in-vault INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.vault }}
    ```

The output will show `false` if you have successfully opted out of the vault and `true` if you are still opted in.

## Next Steps

After completing the offboarding process, if you plan to return in the future, you can follow the [onboarding process](/node-operators/operators/onboarding/){target=\_blank} again.
