---
title: Offboarding Process
description: Detailed guide on how to properly offboard your validator node from the Tanssi network
icon: octicons-arrow-down-right-24
template: main.html
---

# Offboarding an Operator from the Tanssi Protocol

## Introduction {: #introduction }

This guide provides detailed instructions for each step of the validator offboarding process. It is intended for node operators who wish to cease their participation in the Tanssi protocol in a safe, verifiable, and coordinated manner.
Validator offboarding is a formal process designed to maintain the network's integrity, security, and stability. Since validators are critical in consensus and protocol operations, their entry and exit must follow a transparent and auditable flow. Simply shutting down a node without notice can lead to unintended consequences as slashing.
By following this guide, you will:

- Properly signal your intent to leave the protocol
- Ensure your operator is cleanly removed from Tanssi's middleware
- Prevent unnecessary resource usage and avoid missed communication

The offboarding process includes multiple steps: opting out of the network, notifying the Tanssi team, waiting for confirmation of removal from the middleware, and optionally decommissioning your node and opting out from the vault.

Please read each section carefully and follow the instructions that match your specific setup. The Tanssi team is available to support you if questions arise during the offboarding.

## Prerequisites

Before starting the offboarding process, ensure you have the following:

- Access to the Ethereum (EVM) wallet that controls your validator operator account. This is the account used to interact with the Tanssi smart contracts (e.g., via MetaMask, Ledger, or private key)
- Your validator operator address, which is the EVM account address registered as an operator
- The Tanssi network address, which refers to the on-chain identifier of the network your operator is registered to. This value is required when calling smart contract functions (e.g., the optOut function)
- Sufficient ETH in your wallet to cover gas fees for transactions

### Interaction Methods

--8<-- 'text/node-operators/validators/onboarding/run-a-validator/prerequisites.md'

## Opt out from the Tanssi Network

The first step in the offboarding process is to opt out of the Tanssi network. This will enable Tanssi to verify your intent to leave the protocol and validate your identity.

!!! important "Identity Validation"
    When opting out, you sign the transaction using the private key or Ledger device associated with your operator account. This signature serves as cryptographic proof that you are the legitimate owner of the operator account, ensuring that only authorized operators can initiate the offboarding process.

### Using the Symbiotic CLI {: #opt-out-network-with-cli }

The Symbiotic CLI provides a straightforward way to opt out from the network. Choose the appropriate command based on your network and signing method:

#### Using a Ledger Device

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

### Using Safe for Multisig Setups {: #opt-out-network-with-safe }

For [Safe](https://app.safe.global/){target=\_blank} accounts, use the Transaction Builder with these addresses:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.network_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.network_registry }}

Finally, pick the optOut function, insert the `TANSSI_NETWORK_ADDRESS` to which your node is currently registered (e.g, `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet), and sign the transaction.

### Verify Opt out Status {: #verify-opt-out-status }

After submitting the opt out transaction, you can verify your opt out status using one of these methods:

#### Using Etherscan

You can check your opt out status on Etherscan:

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

You'll get a `false` result if your operator has successfully opted out and `true` if they are still opted in.

![Check the registration status](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-3.webp)

#### Using the Symbiotic CLI

You can also verify your opt out status using the Symbiotic CLI:

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

After opting out from the network, notify the Tanssi team of your intention to stop operating as a validator:

1. Complete the [validator offboarding form](https://www.tanssi.network/ecosystem/operator-offboarding){target=_blank} with the following information:
    - Your account address
    - Opt out transaction hash (for verification)
    - Preferred timeline for offboarding
    - Reason for offboarding (optional)

2. Wait for confirmation from the Tanssi team acknowledging your request

Once your request is received, the Tanssi team will manually schedule the removal of your operator from the middleware. This step is semi-automated and requires manual action from the Tanssi team before the process can continue.

After the removal is initiated, the process may take up to two additional epochs to fully complete. You will receive a notification when the removal is finalized. Until then, no further action is needed, but you must wait for the confirmation before proceeding.

You will be notified by email when it is safe to decommission the node. Please do not decommission your node until you receive this notification.

!!! info "What is an Epoch?"
    A network epoch is when a specific set of operators, determined by their captured stake, operates for the network. The middleware removal process follows a specific timeline:
    - At epoch `n`: Your operator is paused
    - At epoch `n+1`: Your operator is unregistered

    The epoch duration is designed to ensure that withdrawals don't impact the captured stake, taking into account the vault's veto and execution phases. This two-epoch process ensures a smooth transition and proper settlement of all operations.

## Pause Operations (Optional)

After receiving the confirmation email indicating that your middleware removal is complete, you can safely decommission your validator node.
This step is optional but recommended; leaving your node running won't provide any rewards.

1. **Stop the Validator Service**: Start by fully stopping your validator service. Ensure the service is no longer running and all related processes have been terminated. If needed, back up any important configuration files or data.

2. **Clean Up Resources**: Once the node is stopped, you can clean up your resources. This includes safely removing or repurposing the hardware or virtual machine hosting the validator. If you are using cloud infrastructure, it's safe to terminate the associated instances. It’s also a good idea to back up logs and configuration files in case you need to reference them in the future.

## Vault Opt out (Optional)

After completing the above steps, you may optionally opt out from the vault using one of these methods:

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

You can check your vault opt out status on Etherscan:

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

After completing the offboarding process:

- Consider providing feedback about your experience to help improve the Tanssi network
- If you plan to return in the future, you can follow the [onboarding process](/node-operators/validators/onboarding/) again
