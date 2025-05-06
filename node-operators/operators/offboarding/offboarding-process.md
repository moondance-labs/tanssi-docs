---
title: Offboarding Process
description: Detailed guide on how to properly offboard your operator node from the Tanssi network
icon: octicons-arrow-down-right-24
template: main.html
---

# Offboarding an Operator from Tanssi

## Introduction {: #introduction }

Operator offboarding is the formal process by which node operators safely and transparently exit the Tanssi protocol. It ensures network integrity, security, and stability by providing clear steps for operators who wish to cease participation.

Operators play a critical role in consensus and network operations. Abruptly shutting down a node without following the proper procedures can negatively operators, potentially resulting in slashing.

By reading this guide, you will learn how to:

- Signal your intent to exit the Tanssi protocol
- Safely remove your operator from Tanssi's middleware
- Prevent resource waste during the offboarding period

This document covers all necessary steps, including opting out of the network, notifying the Tanssi team, and optionally decommissioning your node and exiting associated vaults.

Please carefully review each section relevant to your setup. If you have questions during offboarding, the Tanssi team can support you on [Discord](https://discord.gg/Jm2KH8xT7J).

## Prerequisites {: #prerequisites}

Before starting the offboarding process, ensure you have the following:

- Access to the Ethereum (EVM) wallet that controls your operator account
- Sufficient ETH in your wallet to cover gas fees for transactions

### Interaction Methods

--8<-- 'text/node-operators/validators/onboarding/run-a-validator/prerequisites.md'

## Opt out from Tanssi

The first step in offboarding is to opt out of the Tanssi network. This will enable Tanssi to verify your intent to leave the protocol and validate your identity.

!!! important "Identity Validation"
    When opting out, you sign the transaction using the private key or Ledger device associated with your operator account. This signature serves as cryptographic proof that you are the legitimate owner of the operator account, ensuring that only authorized operators can initiate the offboarding process.

### Using the Symbiotic CLI {: #opt-out-network-with-cli }

The Symbiotic CLI provides a straightforward way to opt out of the network. Choose the appropriate command based on your network and signing method:

### Using a Ledger Device

=== "MainNet"

 ```bash
 python3 symb.py opt-out-network INSERT_NETWORK_ADDRESS --ledger --ledger-account INSERT_OPERATOR_ADDRESS
 ```

=== "TestNet (Sepolia)"

 ```bash
 python3 symb.py opt-out-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS --chain sepolia
 ```

For signing with a private key:

=== "MainNet"

 ```bash
 python3 symb.py opt-out-network INSERT_NETWORK_ADDRESS --private-key INSERT_PRIVATE_KEY
 ```

=== "TestNet (Sepolia)"

 ```bash
 python3 symb.py opt-out-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --private-key INSERT_PRIVATE_KEY --chain sepolia
 ```

!!! warning
    Note that this method requires you to expose your private key; therefore, it is not recommended.

### Using Etherscan {: #opt-out-network-with-etherscan }

You can interact directly with the smart contract through Etherscan using a browser wallet like MetaMask:

=== "MainNet"

 [Contract address: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

 [Contract address: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#writeContract){target=\_blank}

Make sure to select **`Contract`** and **`Write Contract`** then click on Connect to Web3, and select your preferred wallet (e.g. MetaMask):
![Connect to Web3 step](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-1.webp)

1. Expand the **`optOut`** function
2. Insert the `TANSSI_NETWORK_ADDRESS` in the **where** field (e.g, `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet)
3. Click **Write** and sign the transaction

![Opt out operator](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-2.webp)

!!! warning
    After submitting your opt-out transaction, save the transaction hash. You'll need this hash later for verification in the [operation offboarding form](https://www.tanssi.network/ecosystem/operator-offboarding){target=_blank}.

### Using Safe for Multisig Setups {: #opt-out-network-with-safe }

For [Safe](https://app.safe.global/){target=\_blank} accounts, use the Transaction Builder with these addresses:

=== "MainNet"

 {{ networks.symbiotic.contracts.mainnet.network_registry }}

=== "TestNet (Sepolia)"

 {{ networks.symbiotic.contracts.sepolia.network_registry }}

Finally, pick the optOut function, insert the `TANSSI_NETWORK_ADDRESS` to which your node is currently registered (e.g, `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet), and sign the transaction.

### Verify Opt out Status {: #verify-opt-out-status }

After submitting the opt-out transaction, you can verify your opt-out status using one of these methods:

#### Using Etherscan

You can check your opt-out status on Etherscan:

=== "MainNet"

 [Contract address: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

 [Contract address: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#readContract){target=\_blank}

On the contract's page:

Make sure to select **`Contract`** and **`Write Contract`** then click on Connect to Web3, and select your preferred wallet (e.g. MetaMask):

1. Select the **`isOptedIn`** function
2. Paste your operator's account in the **who** field
3. Insert the `TANSSI_NETWORK_ADDRESS` in the **where** field (e.g., `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet)
4. Click on **Query**

![Check the registration status](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-3.webp)

You'll get a `false` result if your operator has successfully opted out and `true` if they are still opted in.

#### Using the Symbiotic CLI

You can also verify your opt-out status using the Symbiotic CLI:

=== "MainNet"

 ```bash
 python3 symb.py check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.mainnet.tanssi_network }}
 ```

=== "TestNet (Sepolia)"

 ```bash
 python3 symb.py check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --chain sepolia
 ```

The output will show `false` if you have successfully opted out and `true` if you are still opted in.

## Contact Tanssi Team

After opting out from the network, notify the Tanssi team of your intention to stop running an operator to do so
complete the [operator offboarding form](https://www.tanssi.network/ecosystem/operator-offboarding){target=_blank} and wait for confirmation of request completion from the Tanssi team.

Upon receiving your request, your operator's removal will be scheduled. This step is semi-automated and may take time to complete. You will be notified by email when it is safe to decommission the node. Please do not decommission your node until you receive this notification.

!!! important "Provide feedback"
    Consider providing feedback in the offboarding [form](https://www.tanssi.network/ecosystem/operator-offboarding){target=_blank} about your experience to help improve the Tanssi network

## Pause Operations (Optional)

Once you receive confirmation of your operator's removal, you can safely stop any running services related to your operator. If needed, back up important configuration files, logs, or any relevant data before deleting them. Afterward, you may repurpose, terminate, or shut down your infrastructure entirely.

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

With private key:

=== "MainNet"

 ```bash
 python3 symb.py opt-out-vault INSERT_VAULT_ADDRESS --private-key INSERT_PRIVATE_KEY
 ```

=== "TestNet (Sepolia)"

 ```bash
 python3 symb.py opt-out-vault {{ networks.symbiotic.contracts.sepolia.vault }} --private-key INSERT_PRIVATE_KEY --chain sepolia
 ```

!!! warning
    Note that this method requires you to expose your private key; therefore, it is not recommended.

### Using Etherscan {: #opt-out-vault-with-etherscan }

Access the contract through Etherscan:

=== "MainNet"

 [Contract address: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

 [Contract address: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#writeContract){target=\_blank}

Make sure to select `Contract` and `Write Contract` then click on Connect to Web3, and select your preferred wallet (e.g. MetaMask):
![Connect to Web3 step](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-4.webp)

1. Expand the **`optOut`** function
2. Insert the `VAULT_ADDRESS` in the **where** field (e.g, `{{ networks.symbiotic.contracts.sepolia.vault }}` on Sepolia TestNet)
3. Click **Write** and sign the transaction

![Opt out operator](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-5.webp)

### Using Safe {: #opt-out-vault-with-safe }

For Safe accounts, use these contract addresses in the Transaction Builder:

=== "MainNet"

 {{ networks.symbiotic.contracts.mainnet.vault_registry }}

=== "TestNet (Sepolia)"

 {{ networks.symbiotic.contracts.sepolia.vault_registry }}

Finally, pick the optOut function, insert the `VAULT_ADDRESS` to which your node is currently registered (e.g, `{{ networks.symbiotic.contracts.sepolia.vault }}` on Sepolia TestNet), and sign the transaction.

### Verify Vault Opt out Status {: #verify-vault-opt-out-status }

After submitting the vault opt-out transaction, you can verify your opt-out status using one of these methods:

#### Using Etherscan

You can check your vault opt-out status on Etherscan:

=== "MainNet"

 [Contract address: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

 [Contract address: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#readContract){target=\_blank}

On the contract's page:

Make sure to select **`Contract`** and **`Write Contract`** then click on Connect to Web3, and select your preferred wallet (e.g. MetaMask):

1. Select the **`isOptedIn`** function
2. Paste your operator's account in the **who** field
3. Insert the vault address in the **where** field
4. Click on **Query**

You'll get a `false` result if your operator has successfully opted out of the vault and `true` if they are still opted in.

![Check the registration status](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-6.webp)

#### Using the Symbiotic CLI

You can also verify your vault opt-out status using the Symbiotic CLI:

=== "MainNet"

 ```bash
 python3 symb.py check-opt-in-vault INSERT_OPERATOR_ADDRESS INSERT_VAULT_ADDRESS
 ```

=== "TestNet (Sepolia)"

 ```bash
 python3 symb.py check-opt-in-vault INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.vault }} --chain sepolia
 ```

The output will show `false` if you have successfully opted out of the vault and `true` if you are still opted in.

## Next Steps

After completing the offboarding process, if you plan to return in the future, you can follow the [onboarding process](/node-operators/validators/onboarding/) again
