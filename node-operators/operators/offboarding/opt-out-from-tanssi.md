---
title: Opt Out from Tanssi
description: Learn how to initiate the offboarding process from a Tanssi network by opting out using various methods and how to verify your status.
icon: octicons-sign-out-24
template: main.html
---

# Opt Out from Tanssi

## Introduction {: #introduction }

The ability to manage node operators' participation within the Tanssi ecosystem is crucial. This guide addresses the initial step in the offboarding process: opting out of the Tanssi network. This action signals your intent to withdraw and allows the Tanssi protocol to verify your identity as the legitimate operator.

During the onboarding process, one step was opting in to the Tanssi network to become an operator. This guide will walk you through the process of opting out. There are several ways to interact with the smart contracts involved. Refer to the [prerequisites article](/node-operators/operators/offboarding/prerequisites/){target=\_blank} to evaluate which alternative suits you best.

!!! important "Identity Validation"
    When opting out, you sign the transaction using the private key or Ledger device associated with your operator account. This signature serves as cryptographic proof that you are the legitimate owner of the operator account, ensuring that only authorized operators can initiate the offboarding process.

## Methods for Opting Out from a Tanssi Network {: #methods-for-opting-out }

To opt out of the Tanssi network, you must interact with a smart contract. Below are the different methods available to perform this action. Choose the one that best fits your setup and security preferences.

### Using the Symbiotic CLI {: #opt-out-network-with-cli }

The Symbiotic CLI provides a straightforward way to opt out of the network. Choose the appropriate command based on your network and signing method.

Using a Ledger device:

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

You can interact directly with the smart contract through Etherscan using a browser wallet like MetaMask.

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#writeContract){target=\_blank}

Make sure to select **Contract** and **Write Contract**, then click on **Connect to Web3**, and select your preferred wallet (e.g., MetaMask):
![Connect to Web3 step](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-1.webp)

1. Expand the **optOut** function
2. Insert the `TANSSI_NETWORK_ADDRESS` in the **where** field (e.g., `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet)
3. Click **Write** and sign the transaction

![Opt out operator](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-2.webp)

!!! warning
    After submitting your opt out transaction, save the transaction hash. You'll need this hash later for verification in the [operation offboarding form](https://www.tanssi.network/ecosystem/operator-offboarding){target=_blank}.

### Using Safe for Multisig Setups {: #opt-out-network-with-safe }

For [Safe](https://app.safe.global/){target=\_blank} accounts, use the **Transaction Builder** with these addresses:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.network_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.network_registry }}

Finally, pick the optOut function, insert the `TANSSI_NETWORK_ADDRESS` to which your node is currently registered (e.g., `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet), and sign the transaction.

## Verifying Your Opt-Out Status {: #verify-opt-out-status }

After submitting the opt-out transaction, it's important to confirm that the action was successful and your operator is no longer opted into the network. You can verify this status using the methods outlined below.

### Using Etherscan to Verify {: #verify-opt-out-etherscan }

You can check your opt-out status on Etherscan by querying the smart contract:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#readContract){target=\_blank}

On the contract's page:

1. Make sure to select the **Read Contract** tab
2. Locate and expand the **isOptedIn** function
3. Paste your operator's account address in the **who** field.
4. Insert the `TANSSI_NETWORK_ADDRESS` in the **where** field (e.g., `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet)
5. Click on **Query**

![Check the registration status](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-3.webp)

You'll get a `false` result if your operator has successfully opted out, and `true` if they are still opted in.

### Using the Symbiotic CLI to Verify {: #verify-opt-out-cli }

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

## Contact Tanssi Team {: #contact-tanssi-team }

Following the network opt-out, the next stage of offboarding your Tanssi operator involves formally notifying the Tanssi team. This page guides you through submitting the required offboarding form and explaining what to expect during the final removal process.

After opting out from the network, notify the Tanssi team of your intention to stop running an operator. To do so, complete the [operator offboarding form](https://www.tanssi.network/ecosystem/operator-offboarding){target=_blank} and wait for confirmation of request completion from the Tanssi team.

Upon receiving your request, your operator's removal will be scheduled. This step is semi-automated and may take time to complete. You will be notified by email when it is safe to decommission the node. Please do not decommission your node until you receive this notification.

!!! important "Provide feedback"
    Consider providing feedback in the offboarding [form](https://www.tanssi.network/ecosystem/operator-offboarding){target=_blank} about your experience to help improve the Tanssi network.

## Pause Operations (Optional) {: #pause-operations }

Once you receive confirmation of your operator's removal from the Tanssi team, you can safely stop any running services related to your operator. If needed, back up important configuration files, logs, or any relevant data before deleting them. Afterward, you may repurpose, terminate, or shut down your infrastructure entirely.

## Next Steps (Optional) {: #next-steps-vault-opt-out }

After you have opted out of the network and informed the Tanssi team by submitting the offboarding form, you can take an additional optional step and [opt out of any specific vaults](/node-operators/operators/offboarding/vault-opt-out/){target=\_blank} your operator might be associated with.
