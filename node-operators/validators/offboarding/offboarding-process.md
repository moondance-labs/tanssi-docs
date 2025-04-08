---
title: Offboarding Process
description: Detailed guide on how to properly offboard your validator node from the Tanssi network
icon: octicons-arrow-down-right-24
template: main.html
---

# Offboarding Process

This guide provides detailed instructions for each step of the validator offboarding process. Follow these steps carefully to ensure a smooth transition.

## Opt-out from the Tanssi Network

The first step in the offboarding process is to opt out of the Tanssi network. This will enable Tanssi to verify your intent to leave the protocol and validate your identity.
You can do this through several methods:

### Using the Symbiotic CLI {: #opt-out-network-with-cli }

If you have the [Symbiotic CLI](../../onboarding/opt-in-to-tanssi/#set-up-the-cli) installed and want to sign with a Ledger device:

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

    [Contract address: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#writeContract){target=\_blank}

Make sure to select **`Contract`** and **`Write Contract`** then click on Connect to Web3, and select your preferred wallet (e.g. MetaMask):
![Connect to Web3 step](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-1.webp)

1. Expand the **`optout`** function
2. Insert the `TANSSI_NETWORK_ADDRESS` in the **where** field
3. Click **Write** and sign the transaction

![Opt out operator](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-2.webp)

### Using Safe for Multisig Setups {: #opt-out-network-with-safe }

For [Safe](https://app.safe.global/){target=\_blank} accounts, use the Transaction Builder with these addresses:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.network_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.network_registry }}

### Verify Opt-out Status {: #verify-opt-out-status }

After submitting the opt-out transaction, you can verify your opt-out status using one of these methods:

#### Using Etherscan

You can check your opt-out status on Etherscan:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#readContract){target=\_blank}

On the contract's page:

1. Click on the **Read Contract** tab
2. Ensure your wallet is connected; if not, connect it again
3. Select the **`isOptedIn`** function
4. Paste your operator's account in the **who** field
5. Insert the `TANSSI_NETWORK_ADDRESS` in the **where** field (`{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` on Sepolia TestNet)
6. Click on **Query**

You'll get a `false` result if your operator has successfully opted out and `true` if they are still opted in.

![Check the registration status](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-3.webp)

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

After opting out from the network, notify the Tanssi team of your intention to stop operating as a validator:

1. Complete the [validator offboarding form](INSERT_FORM_URL){target=_blank} with the following information:
    - Your account address
    - Opt-out transaction hash (for verification)
    - Preferred timeline for offboarding
    - Reason for offboarding (optional)

2. Wait for confirmation from the Tanssi team acknowledging your request

## Middleware Removal

Once your request is received and processed, the Tanssi team will schedule the removal of your operator from the middleware. The removal process follows a specific timeline: the operator is paused at epoch n and then unregistered at epoch n+1. This process typically takes two epochs to complete. You will receive a notification when it is complete. This step requires no action, but you must wait for confirmation before proceeding to the next steps.

## Pause Operations

After receiving confirmation of middleware removal, you can safely decommission your validator node. If you haven't yet received confirmation that your operator has been removed from the middleware, wait for one complete epoch to ensure all operations are correctly settled. You can check the current epoch status through the Tanssi dashboard. Do not proceed to the next steps until you've received confirmation of middleware removal or an entire epoch has passed.

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

    [Contract address: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#writeContract){target=\_blank}

Make sure to select `Contract` and `Write Contract` then click on Connect to Web3, and select your preferred wallet (e.g. MetaMask):
![Connect to Web3 step](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-4.webp)

1. Expand the **`optout`** function
2. Insert the `TANSSI_NETWORK_ADDRESS` in the **where** field
3. Click **Write** and sign the transaction

![Opt out operator](/images/node-operators/validators/offboarding/offboarding-process/offboarding-process-5.webp)

### Using Safe {: #opt-out-vault-with-safe }

For Safe accounts, use these contract addresses in the Transaction Builder:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.vault_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.vault_registry }}

### Verify Vault Opt-out Status {: #verify-vault-opt-out-status }

After submitting the vault opt-out transaction, you can verify your opt-out status using one of these methods:

#### Using Etherscan

You can check your vault opt-out status on Etherscan:

=== "MainNet"

    [Contract address: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Contract address: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#readContract){target=\_blank}

On the contract's page:

1. Click on the **Read Contract** tab
2. Ensure your wallet is connected; if not, connect it again
3. Select the **`isOptedIn`** function
4. Paste your operator's account in the **who** field
5. Insert the vault address in the **where** field
6. Click on **Query**

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