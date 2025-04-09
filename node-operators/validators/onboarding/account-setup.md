---
title: Set Up an Operator Account
description: Learn how to map your node's account with your stash account, making your node eligible to secure Tanssi and the Tanssi-powered networks and receive rewards.
icon: octicons-tools-24
---

# Set Up Your Account to Secure the Tanssi Ecosystem

## Introduction {: #introduction }

Before you can start participating in the Tanssi protocol, validating blocks, and securing the Tanssi ecosystem, you'll need to set up your account and establish your node's eligibility.

This step maps your Tanssi stash account (the one keeping track of your rewards) to your node's session keys (the ones used for communication and consensus), allowing the protocol to include your node in the active set. 

By following the steps outlined in this guide, you'll learn everything you need to know to validate within the Tanssi ecosystem.

## Checking Prerequisites {: #checking-prerequisites }

Before setting up your account, make sure that:

- You have a node correctly [set up and running](/node-operators/validators/onboarding/run-a-validator/){target=\_blank}
- You [have registered as an operator](/node-operators/validators/onboarding/register-in-symbiotic/){target=\_blank} in the Symbiotic registry 
- You [have opted in to Tanssi Network and a Tanssi-enabled vault](/node-operators/validators/onboarding/opt-in-to-tanssi/){target=\_blank}

## Map an Account to Your Node {: #map-account }

The first step is a two-step process that generates and maps the session keys to your account. Session keys can be compared to the node's ID, and are used to perform network operations, such as signing validity proofs, whereas your account keeps track of your work and related rewards, and could have an on-chain identity. By mapping the session key to your account, you create an association between your account and your node.

You will need to create session keys for your primary and backup servers. Each server should have its own unique keys. Since the keys never leave your servers, you can consider them a unique ID for that server.

### Generate Session Keys {: #generate-session-keys }

To generate session keys, send an RPC call using the `author_rotateKeys` method to your node's HTTP endpoint. For reference, if your node's HTTP endpoint is at port `9944`, the JSON-RPC call might look like this:

```bash
curl http://127.0.0.1:9944 -H \
"Content-Type:application/json;charset=utf-8" -d \
  '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"author_rotateKeys",
    "params": []
  }'
```

Your hex-encoded session keys will be printed to the terminal in the `"result"` field.

--8<-- 'code/node-operators/validators/onboarding/account-setup/terminal/generate-session-keys.md'

!!! note
    Make sure you write down your session keys. In the next section, you'll need to map them to your account.

### Map Session Keys {: #map-session-keys }

To perform the next step and map your session keys to your account, head to the [developer portal](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Extrinsics** from the dropdown, and take the following steps:

1. Select your account, which should be the same account that you previously registered with Tanssi
2. Select the **session** module and the **setKeys** extrinsic
3. For **keys**, enter your session keys
4. For **proof**, enter `0x`
5. Click **Submit Transaction** and sign and send the transaction from your wallet

![Create and submit a transaction to set session keys on Polkadot.js Apps](/images/node-operators/validators/onboarding/account-setup/account-setup-1.webp)

Using the `session.keyOwner` method, you can verify that your session keys have been mapped to your account as expected. To do this on the [developer portal](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, click on the **Developer** tab, select **Chain state** from the dropdown, and take the following steps:

1. Select the **session** module and the **keyOwner** query
2. Enter `gran` in the **SpCoreCryptoKeyTypeId** field
3. For **Bytes**, enter the first sixty six hex-encoded characters from your session keys (e.g., `0x00a12170e0925a9bf98f31bbdd7988550c1bf587766a2d2735e969aa5b4291dc`)
4. Click the **+** button next to the extrinsic field
5. The account associated with the session keys, which should be your account, will be displayed at the bottom of the page

![Create and submit query to verify session keys on the developer portal](/images/node-operators/validators/onboarding/account-setup/account-setup-2.webp)

And that's it! You've successfully mapped your account, and your node is now eligible to participate in the protocol.