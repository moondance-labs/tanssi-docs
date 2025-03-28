---
title: Offboarding Process
description: Detailed guide on how to properly offboard your validator node from the Tanssi network
icon: octicons-arrow-down-right-24
template: main.html
---

# Offboarding Process

This guide provides detailed instructions for each step of the validator offboarding process. Follow these steps carefully to ensure a smooth transition.

## Contact Tanssi Team

The first step in the offboarding process is to notify the Tanssi team of your intention to stop operating as a validator.

1. Send an email to [support@tanssi.network](mailto:support@tanssi.network) with the following information:
    - Your validator name/identifier
    - Your account address
    - Preferred timeline for offboarding
    - Reason for offboarding (optional)

2. Wait for confirmation from the Tanssi team acknowledging your request

## Middleware Removal

Once your request is received and processed:

1. The Tanssi team will schedule the removal of your operator from the middleware
2. You will receive a notification when this process is complete
3. This step requires no action from your side, but you must wait for confirmation before proceeding

## Pause Operations

After receiving confirmation of middleware removal:

1. You can safely decomision your validator node
2. Wait for one complete epoch to ensure all operations are properly settled
    - You can check the current epoch status through the Tanssi dashboard
    - Do not proceed to the next steps until the full epoch has passed

## Network Removal (Opt-out)

After waiting for one epoch, you'll need to opt-out from the Tanssi network. You can do this through several methods:

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

## Vault Opt-out

After opting out from the network, opt-out from the vault using one of these methods:

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

- Keep your node's data backup for potential future use
- Consider providing feedback about your experience to help improve the Tanssi network
- If you plan to return in the future, you can follow the [onboarding process](/node-operators/validators/onboarding/) again
