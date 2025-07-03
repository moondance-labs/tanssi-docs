---
title: Using the Built-In Tanssi Bridge
description: Learn how to use the built-in Tanssi bridge that connects Tanssi and Ethereum to convert TANSSI tokens from their native form to the ERC-20, and vice versa.
icon: octicons-arrow-switch-24
---

# Using the Built-In Tanssi Bridge

## Introduction {: #introduction }

The TANSSI token comes in two versions:
The Tanssi bridge is a built-in cross-chain solution that enables seamless asset transfers between the Tanssi network and Ethereum. This bridge allows you to convert native TANSSI tokens to ERC-20 TANSSI tokens on Ethereum and vice versa, providing flexibility for users to move their assets across different blockchain ecosystems.

The bridge operates through a secure and user-friendly web interface available at [apps.tanssi.network/bridge](https://apps.tanssi.network/bridge){target=\_blank}, making cross-chain transfers accessible to both developers and end users.

![Tanssi Bridge Interface](/images/builders/interoperability/bridge-interface.webp)

## How the Bridge Works {: #how-it-works }

The Tanssi bridge operates as a bidirectional protocol that:

1. **Locks native TANSSI tokens** on the Tanssi network when bridging to Ethereum
2. **Mints equivalent ERC-20 TANSSI tokens** on the Ethereum network
3. **Burns ERC-20 TANSSI tokens** on Ethereum when bridging back to Tanssi
4. **Unlocks native TANSSI tokens** on the Tanssi network

This mechanism ensures that the total supply of TANSSI tokens remains constant across both networks while enabling users to utilize their assets on their preferred blockchain.

## Prerequisites {: #prerequisites }

Before using the Tanssi bridge, ensure you have:

### Supported Wallets {: #supported-wallets }

For bridging from Tanssi to Ethereum:

- [Talisman](https://talisman.xyz/){target=\_blank}
- [SubWallet](https://www.subwallet.app){target=\_blank}
- [Enkrypt](https://www.enkrypt.com){target=\_blank}
- [Polkadot.js extension](https://polkadot.js.org/extension){target=\_blank}

For bridging from Ethereum to Tanssi:

- [MetaMask](https://metamask.io/){target=\_blank}
- [WalletConnect](https://walletconnect.com/){target=\_blank} compatible wallets
- Any Ethereum-compatible wallet

### Required Assets {: #required-assets }

- **TANSSI tokens** - for transfers from Tanssi to Ethereum
- **ETH** - for gas fees on Ethereum transactions
- **ERC-20 TANSSI tokens** - for transfers from Ethereum to Tanssi

## Bridging TANSSI Tokens to Ethereum {: #bridge-to-ethereum }

Follow these steps to bridge native TANSSI tokens to ERC-20 tokens on Ethereum:

### Step 1: Access the Bridge {: #access-bridge-to-eth }

1. Navigate to [apps.tanssi.network/bridge](https://apps.tanssi.network/bridge){target=\_blank}
2. Click **Connect Wallet** and select your Substrate-compatible wallet
3. Choose your Tanssi account from the dropdown
4. Sign the connection message when prompted

![Connect Substrate Wallet](/images/builders/interoperability/connect-substrate-wallet.webp)

### Step 2: Configure the Transfer {: #configure-transfer-to-eth }

1. Ensure the **From** field is set to "Tanssi Network"
2. Set the **To** field to "Ethereum"
3. Enter the amount of TANSSI tokens you want to bridge
4. Provide your Ethereum address where you want to receive the ERC-20 tokens

!!! note
    Double-check your Ethereum address as transfers cannot be reversed. Ensure you control the destination address.

### Step 3: Initiate the Transfer {: #initiate-transfer-to-eth }

1. Review the transfer details including:
   - Amount to bridge
   - Destination address
   - Estimated fees
2. Click **Bridge Tokens**
3. Sign the transaction in your Substrate wallet
4. Wait for the transaction to be confirmed on the Tanssi network

![Bridge Configuration](/images/builders/interoperability/bridge-config-to-eth.webp)

### Step 4: Wait for Ethereum Confirmation {: #wait-confirmation-eth }

1. The bridge will process your request and mint ERC-20 tokens on Ethereum
2. You can track the progress in the bridge interface
3. Once complete, the ERC-20 TANSSI tokens will appear in your Ethereum wallet

!!! info
    Cross-chain transfers typically take 10-15 minutes to complete due to network confirmations required for security.

## Bridging ERC-20 TANSSI to Tanssi Network {: #bridge-to-tanssi }

To bridge ERC-20 TANSSI tokens back to the native Tanssi network:

### Step 1: Connect Ethereum Wallet {: #connect-ethereum-wallet }

1. Visit [apps.tanssi.network/bridge](https://apps.tanssi.network/bridge){target=\_blank}
2. Click **Connect Wallet** and select your Ethereum wallet (e.g., MetaMask)
3. Approve the connection in your wallet

### Step 2: Configure Reverse Transfer {: #configure-reverse-transfer }

1. Set the **From** field to "Ethereum"
2. Set the **To** field to "Tanssi Network"
3. Enter the amount of ERC-20 TANSSI tokens to bridge
4. Provide your Tanssi network address for receiving native tokens

### Step 3: Approve and Bridge {: #approve-and-bridge }

1. Click **Approve TANSSI** to authorize the bridge contract to spend your ERC-20 tokens
2. Confirm the approval transaction in your Ethereum wallet
3. Once approved, click **Bridge Tokens**
4. Confirm the bridge transaction and pay the required gas fees

![Bridge from Ethereum](/images/builders/interoperability/bridge-from-ethereum.webp)

### Step 4: Receive Native Tokens {: #receive-native-tokens }

1. Monitor the transaction progress in the bridge interface
2. The ERC-20 tokens will be burned on Ethereum
3. Native TANSSI tokens will be unlocked and transferred to your Tanssi address

## Bridge Fees and Limits {: #fees-and-limits }

### Transaction Fees {: #transaction-fees }

- **Tanssi to Ethereum**: Small network fee in TANSSI + Ethereum gas fees
- **Ethereum to Tanssi**: Ethereum gas fees for approval and bridge transactions

### Transfer Limits {: #transfer-limits }

- **Minimum transfer**: 10 TANSSI tokens
- **Maximum transfer**: 10,000 TANSSI tokens per transaction
- **Daily limit**: 50,000 TANSSI tokens per address

!!! warning
    Limits may change based on network conditions and security considerations. Always check the current limits in the bridge interface.

## Security Considerations {: #security }

### Best Practices {: #best-practices }

1. **Verify addresses**: Always double-check destination addresses before confirming transfers
2. **Start small**: Test with small amounts before bridging large quantities
3. **Keep records**: Save transaction hashes for tracking and support purposes
4. **Use official interface**: Only use the official bridge at [apps.tanssi.network/bridge](https://apps.tanssi.network/bridge){target=\_blank}

### Bridge Security Features {: #security-features }

- **Multi-signature validation**: Transfers require multiple validator confirmations
- **Time delays**: Large transfers may have additional security delays
- **Rate limiting**: Daily and per-transaction limits prevent large-scale exploits
- **Emergency pause**: The bridge can be paused if security issues are detected

## Troubleshooting {: #troubleshooting }

### Common Issues {: #common-issues }

**Transaction appears stuck**

- Check network congestion on both Ethereum and Tanssi
- Wait for sufficient block confirmations (typically 10-15 minutes)
- Contact support if the transfer doesn't complete within 1 hour

**Insufficient gas fees**

- Ensure you have enough ETH for Ethereum gas fees
- Gas prices fluctuate; you may need to increase your gas limit during high congestion

**Wallet connection issues**

- Clear browser cache and cookies
- Try disabling other wallet extensions temporarily
- Ensure your wallet is updated to the latest version

### Getting Support {: #getting-support }

If you encounter issues with the bridge:

1. Check the [Tanssi Discord](https://discord.gg/tanssi){target=\_blank} for community support
2. Visit the [official documentation](https://docs.tanssi.network){target=\_blank} for additional resources
3. Contact the Tanssi team through official channels with your transaction hash

## Next Steps {: #next-steps }

After successfully using the Tanssi bridge, you can:

- **Explore DeFi**: Use your ERC-20 TANSSI tokens in Ethereum DeFi protocols
- **Build applications**: Leverage both native and ERC-20 tokens in your dApps
- **Participate in governance**: Use your tokens for voting on network proposals
- **Develop integrations**: Build applications that utilize cross-chain functionality

For more information about building on Tanssi, explore our [developer toolkit](/builders/toolkit/){target=\_blank} and [network documentation](/builders/tanssi-network/){target=\_blank}.
