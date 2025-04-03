---
title: Offboarding Process
description: Detailed guide on how to properly offboard your validator node from the Tanssi network
icon: octicons-arrow-down-right-24
template: main.html
---

# Offboarding Process

This guide provides detailed instructions for each step of the validator offboarding process. Follow these steps carefully to ensure a smooth transition.

## Opt-out from the Tanssi Network

The first step in the offboarding process is to opt-out from the Tanssi network. This will enable Tanssi to verify your intent to leave the protocol and validate the identity.
You can do this through several methods:

### Using the Symbiotic CLI {: #opt-out-network-with-cli }

If you have the [Symbiotic CLI](../onboarding/register-in-symbiotic/#set-up-the-cli) installed and want to sign with a Ledger device:

=== "MainNet"
    ```bash
    python3 symb.py opt-out-network INSERT_NETWORK_ADDRESS --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"
    ```bash
    python3 symb.py opt-out-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS --chain sepolia
    ```

For signing with a private key (not recommended):

=== "MainNet"
    ```bash
    python3 symb.py opt-out-network INSERT_NETWORK_ADDRESS --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"
    ```bash
    python3 symb.py opt-out-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --private-key INSERT_PRIVATE_KEY --chain sepolia
    ```

### Using Etherscan {: #opt-out-network-with-etherscan }

You can interact directly with the smart contract through Etherscan using a browser wallet like MetaMask:

=== "MainNet"
    [Contract address: {{ networks.symbiotic.contracts.mainnet.opt_out_network }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.opt_out_network }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"
    [Contract address: {{ networks.symbiotic.contracts.sepolia.opt_out_network }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.opt_out_network }}#writeContract){target=\_blank}

1. Connect your Web3 wallet
2. Expand the **`optout`** function
3. Click **Write** and sign the transaction

### Using Safe for Multisig Setups {: #opt-out-network-with-safe }

For [Safe](https://app.safe.global/){target=\_blank} accounts, use the Transaction Builder with these addresses:

=== "MainNet"
    {{ networks.symbiotic.contracts.mainnet.opt_out_network }}

=== "TestNet (Sepolia)"
    {{ networks.symbiotic.contracts.sepolia.opt_out_network }}

## Contact Tanssi Team

After opting out from the network, notify the Tanssi team of your intention to stop operating as a validator:

1. Complete the [validator offboarding form](INSERT_FORM_URL){target=_blank} with the following information:
    - Your account address
    - Opt-out transaction hash (for verification)
    - Preferred timeline for offboarding
    - Reason for offboarding (optional)

2. Wait for confirmation from the Tanssi team acknowledging your request

## Middleware Removal

Once your request is received and processed, the Tanssi team will schedule the removal of your operator from the middleware. The removal process follows a specific timeline: the operator is paused at epoch n, and then unregistered at epoch n+1. This process typically takes 2 epochs to complete. You will receive a notification when this process is complete. This step requires no action from your side, but you must wait for confirmation before proceeding to the next steps.

## Pause Operations

After receiving confirmation of middleware removal, you can safely decommission your validator node. If you haven't yet received confirmation that your operator has been removed from the middleware, wait for one complete epoch to ensure all operations are properly settled. You can check the current epoch status through the Tanssi dashboard. Do not proceed to the next steps until you've received confirmation of middleware removal or a full epoch has passed.

## Vault Opt-out (Optional)

After completing the above steps, you may optionally opt-out from the vault using one of these methods:

### Using the Symbiotic CLI {: #opt-out-vault-with-cli }

With Ledger:

=== "MainNet"
    ```bash
    python3 symb.py opt-out-vault INSERT_VAULT_ADDRESS --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"
    ```bash
    python3 symb.py opt-out-vault {{ networks.symbiotic.contracts.sepolia.vault }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS --chain sepolia
    ```

With private key (not recommended):

=== "MainNet"
    ```bash
    python3 symb.py opt-out-vault INSERT_VAULT_ADDRESS --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"
    ```bash
    python3 symb.py opt-out-vault {{ networks.symbiotic.contracts.sepolia.vault }} --private-key INSERT_PRIVATE_KEY --chain sepolia
    ```

### Using Etherscan {: #opt-out-vault-with-etherscan }

Access the contract through Etherscan:

=== "MainNet"
    [Contract address: {{ networks.symbiotic.contracts.mainnet.opt_out_vault }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.opt_out_vault }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"
    [Contract address: {{ networks.symbiotic.contracts.sepolia.opt_out_vault }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.opt_out_vault }}#writeContract){target=\_blank}

1. Connect your Web3 wallet
2. Expand the **`optout`** function
3. Click **Write** and sign the transaction

### Using Safe {: #opt-out-vault-with-safe }

For Safe accounts, use these contract addresses in the Transaction Builder:

=== "MainNet"
    {{ networks.symbiotic.contracts.mainnet.opt_out_vault }}

=== "TestNet (Sepolia)"
    {{ networks.symbiotic.contracts.sepolia.opt_out_vault }}

## Verification

After completing all steps:

1. Verify your node is no longer in the active validators list using Etherscan:
    - [MainNet Contract](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.registry }}#readContract){target=\_blank}
    - [TestNet Contract](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.registry }}#readContract){target=\_blank}
2. Check your entry has been removed from the operators registry

## Next Steps

After successfully completing the offboarding process:

- Consider providing feedback about your experience to help improve the Tanssi network
- If you plan to return in the future, you can follow the [onboarding process](/node-operators/validators/onboarding/) again