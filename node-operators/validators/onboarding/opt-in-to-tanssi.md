---
title: Opt-In to Tanssi
description: Learn how to opt-in your with registered node to Tanssi-enabled Symbiotic vaults and the Tanssi network to participate in the protocol and earn rewards.
icon: octicons-plus-circle-24
---

# Opt-In to Tanssi

## Introduction {: #introduction }

--8<-- 'text/node-operators/validators/onboarding/run-a-validator/intro.md'

Before being able to secure Tanssi-powered networks, node operators must ensure their node is [set up and running](/validators/onboarding/run-a-validator/){target=\_blank}, they [have registered an operator in the Symbiotic registry](/validators/onboarding/register-in-symbiotic/){target=\_blank}, and, finally, they have opted in to work with a Tanssi-enabled Symbiotic vault and the Tanssi network itself. This guide will walk through the steps to successfully opt into a Tanssi-enabled vault and the Tanssi network.

## Checking Prerequisites {: #checking-prerequisites }

If you have already [registered as an operator](/validators/onboarding/register-in-symbiotic/){target=\_blank}, and before starting to secure Tanssi-powered networks, you must register your intention by opting into a Tanssi-enabled Symbiotic vault and the Tanssi network. Both steps require interacting with smart contracts, one from Symbiotic's core protocol and the other from Tanssi's integration with Symbiotic.

--8<-- 'text/node-operators/validators/onboarding/run-a-validator/prerequisites.md'

## Opt-In to Tanssi-Enabled Vaults {: #opt-in-tanssi-vaults }

Before enabling your operator as an active Tanssi network validator, you must opt-in to at least one of the Tanssi-enabled vaults. There are several ways to opt into the vaults described in the following sections.

### Opt-In Using the Symbiotic CLI {: #opt-in-with-cli }

Provided that you correctly installed the [Symbiotic CLI](#setting-up-the-cli) and you want to sign the transaction using a ledger device, then run the following command replacing the `VAULT_ADDRESS` with the specific one you want to join and `OPERATOR_ADDRESS`:

=== "Mainnet"

    ```bash
    python3 symb.py opt-in-vault VAULT_ADDRESS --ledger --ledger-account OPERATOR_ADDRESS
    ```

=== "Testnet (Holesky)"

    ```bash
    python3 symb.py opt-in-vault VAULT_ADDRESS --ledger --ledger-account OPERATOR_ADDRESS --chain holesky
    ```

If you want to sign the transaction directly using the operator's account privaye key, then run the following command replacing the `PRIVATE_KEY` parameter:

=== "Mainnet"

    ```bash
    python3 symb.py opt-in-vault VAULT_ADDRESS --private-key PRIVATE_KEY
    ```

=== "Testnet (Holesky)"

    ```bash
    python3 symb.py opt-in-vault VAULT_ADDRESS --private-key PRIVATE_KEY --chain holesky
    ```

!!! warning
    Note that this method required you to expose your private key, and therefore it is not recommended

### Opt-In Using Etherscan {: #opt-in-with-etherscan }

You can interact with Symbiotic's smart contracts using Etherscan, and sign the transaction using a browser wallet ([Metamask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, for example). 

To open the contrat's page, open the link:

=== "Mainnet"

    [https://etherscan.io/address/0xb361894bC06cbBA7Ea8098BF0e32EB1906A5F891#writeContract](https://etherscan.io/address/0xb361894bC06cbBA7Ea8098BF0e32EB1906A5F891#writeContract){target=\_blank}

=== "Testnet (Holesky)"

    [https://holesky.etherscan.io/address/0x95CC0a052ae33941877c9619835A233D21D57351#writeContract](https://holesky.etherscan.io/address/0x95CC0a052ae33941877c9619835A233D21D57351#writeContract){target=\_blank}

Click on `Connect to Web3`, and select your preferred wallet (e.g. Metamask):

![Connect to Web3 step](/images/node-operators/validators/onboarding/register-in-symbiotic/register-in-symbiotic-1.webp)

!!! note
    You can configure Metamask to use a cold wallet.

Once connected, expand the `optin` function, insert the VAULT_ADDRESS, click on `Write`, and sign the transaction.

![Register the operator](/images/node-operators/validators/onboarding/register-in-symbiotic/register-in-symbiotic-2.webp)

### Opt-In Using Safe for Multi-sig Setups {: #opt-in-with-safe }

If you have a [Safe)](https://app.safe.global/){target=\_blank} account, then open the `Transaction builder` and insert the following contract address:

=== "Mainnet"

    0xb361894bC06cbBA7Ea8098BF0e32EB1906A5F891

=== "Testnet (Holesky)"

    0x95CC0a052ae33941877c9619835A233D21D57351

Finally, pick the `optin` function, insert the VAULT_ADDRESS, and sign the transaction.

### Checking the Registration Status {: #checking-registration }

You can easily check your registration status on Etherscan. Open the following link:

=== "Mainnet"

    [https://etherscan.io/address/0xb361894bC06cbBA7Ea8098BF0e32EB1906A5F891#readContract](https://etherscan.io/address/0xb361894bC06cbBA7Ea8098BF0e32EB1906A5F891#readContract){target=\_blank}

=== "Testnet (Holesky)"

    [https://holesky.etherscan.io/address/0x95CC0a052ae33941877c9619835A233D21D57351#readContract](https://holesky.etherscan.io/address/0x95CC0a052ae33941877c9619835A233D21D57351#readContract){target=\_blank}

Now select the `isOptedIn` function, paste your operator's account in the `who` field, insert the VAULT_ADDRESS in the `where` field, and click on `Query`. You'll get a `true` result if your operator was registered correctly and `false` otherwise.

![Check the registration status](/images/node-operators/validators/onboarding/register-in-symbiotic/register-in-symbiotic-3.webp)

You can also verify your registration status using the Symbiotic CLI running the following command, which prints `true` or `false` for any given OPERATOR_ADDRESS in a Tanssi-enabled vault:

=== "Mainnet"
    
    ```bash
    python3 symb.py check-opt-in-vault OPERATOR_ADDRESS VAULT_ADDRESS
    ```

=== "Testnet (Holesky)"

    ```bash
    python3 symb.py check-opt-in-vault OPERATOR_ADDRESS VAULT_ADDRESS --chain holesky
    ```

And the output looks like:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py isop OPERATOR_ADDRESS</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

## Opt-In to Tanssi Network {: #opt-in-tanssi }

Before enabling your operator as an active Tanssi network validator, you must opt-in to the network and be approved by the Tanssi team. There are several ways to opt into the network described in the following sections.

### Opt-In Using the Symbiotic CLI {: #opt-in-with-cli }

Provided that you correctly installed the [Symbiotic CLI](#setting-up-the-cli) and you want to sign the transaction using a ledger device, then run the following command replacing the `OPERATOR_ADDRESS`:

=== "Mainnet"

    ```bash
    python3 symb.py opt-in-network TANSSI_NETWORK_ADDRESS --ledger --ledger-account OPERATOR_ADDRESS
    ```

=== "Testnet (Holesky)"

    ```bash
    python3 symb.py opt-in-network TANSSI_NETWORK_ADDRESS --ledger --ledger-account OPERATOR_ADDRESS --chain holesky
    ```

If you want to sign the transaction directly using the operator's account privaye key, then run the following command replacing the `PRIVATE_KEY` parameter:

=== "Mainnet"

    ```bash
    python3 symb.py opt-in-network TANSSI_NETWORK_ADDRESS --private-key PRIVATE_KEY
    ```

=== "Testnet (Holesky)"

    ```bash
    python3 symb.py opt-in-network TANSSI_NETWORK_ADDRESS --private-key PRIVATE_KEY --chain holesky
    ```

!!! warning
    Note that this method required you to expose your private key, and therefore it is not recommended

### Opt-In Using Etherscan {: #opt-in-with-etherscan }

You can interact with Symbiotic's smart contracts using Etherscan, and sign the transaction using a browser wallet ([Metamask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, for example). 

To open the contrat's page, open the link:

=== "Mainnet"

    [https://etherscan.io/address/0x7133415b33B438843D581013f98A08704316633c#writeContract](https://etherscan.io/address/0x7133415b33B438843D581013f98A08704316633c#writeContract){target=\_blank}

=== "Testnet (Holesky)"

    [https://holesky.etherscan.io/address/0x58973d16FFA900D11fC22e5e2B6840d9f7e13401#writeContract](https://holesky.etherscan.io/address/0x58973d16FFA900D11fC22e5e2B6840d9f7e13401#writeContract){target=\_blank}

Click on `Connect to Web3`, and select your preferred wallet (e.g. Metamask):

![Connect to Web3 step](/images/node-operators/validators/onboarding/register-in-symbiotic/register-in-symbiotic-1.webp)

!!! note
    You can configure Metamask to use a cold wallet.

Once connected, expand the `optin` function, insert the TANSSI_NETWORK_ADDRESS, click on `Write`, and sign the transaction.

![Register the operator](/images/node-operators/validators/onboarding/register-in-symbiotic/register-in-symbiotic-2.webp)

### Opt-In Using Safe for Multi-sig Setups {: #opt-in-with-safe }

If you have a [Safe)](https://app.safe.global/){target=\_blank} account, then open the `Transaction builder` and insert the following contract address:

=== "Mainnet"

    0x7133415b33B438843D581013f98A08704316633c

=== "Testnet (Holesky)"

    0x58973d16FFA900D11fC22e5e2B6840d9f7e13401

Finally, pick the `optin` function, insert the TANSSI_NETWORK_ADDRESS, and sign the transaction.

### Checking the Registration Status {: #checking-registration }

You can easily check your registration status on Etherscan. Open the following link:

=== "Mainnet"

    [https://etherscan.io/address/0x7133415b33B438843D581013f98A08704316633c#readContract](https://etherscan.io/address/0x7133415b33B438843D581013f98A08704316633c#readContract){target=\_blank}

=== "Testnet (Holesky)"

    [https://holesky.etherscan.io/address/0x58973d16FFA900D11fC22e5e2B6840d9f7e13401#readContract](https://holesky.etherscan.io/address/0x58973d16FFA900D11fC22e5e2B6840d9f7e13401#readContract){target=\_blank}

Now select the `isOptedIn` function, paste your operator's account in the `who` field, insert the TANSSI_NETWORK_ADDRESS in the `where` field, and click on `Query`. You'll get a `true` result if your operator was registered correctly and `false` otherwise.

![Check the registration status](/images/node-operators/validators/onboarding/register-in-symbiotic/register-in-symbiotic-3.webp)

You can also verify your registration status using the Symbiotic CLI running the following command, which prints `true` or `false` for any given OPERATOR_ADDRESS in the Tanssi Network:

=== "Mainnet"
    
    ```bash
    python3 symb.py check-opt-in-network OPERATOR_ADDRESS TANSSI_NETWORK_ADDRESS
    ```

=== "Testnet (Holesky)"

    ```bash
    python3 symb.py check-opt-in-network OPERATOR_ADDRESS TANSSI_NETWORK_ADDRESS --chain holesky
    ```

And the output looks like:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py isop OPERATOR_ADDRESS</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

