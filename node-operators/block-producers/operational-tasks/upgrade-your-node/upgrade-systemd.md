---
title: Upgrade Your Block Producer Systemd Node
description: Follow these instructions to update your Tanssi block producer node running via Systemd to the latest version of the Tanssi client software.
---

# Upgrade Your Node Running via Systemd

## Introduction {: #introduction }

Keeping your node up-to-date is an important part of being a Tanssi block producer node. Not only does it help to ensure that your block producer node stays healthy, it also contributes to keeping the entire Tanssi network running smoothly. Tanssi Block Producers can subscribe to [Github Notifications](#subscribe) to be alerted for new client release versions. 

This tutorial covers upgrading your Tanssi block producer node that was configured using Systemd. It assumes you have already set up your account and launched a [block producer node using Systemd](/node-operators/block-producers/onboarding/run-a-block-producer/block-producer-systemd/){target=\_blank}. 

## Upgrading Your Systemd Node {: #upgrading-your-systemd-node }

If you're running your block producer node via the Systemd service, you'll need to take a few steps to properly upgrade your node. In short, you'll need to stop the service, replace the Tanssi binary with the updated version, and then start the service. 

You can stop your Tanssi Systemd service with the following command:

```bash
systemctl stop tanssi.service
```

Then, navigate to the directory where your Tanssi binary is stored and remove it. 

```bash
cd /var/lib/tanssi-data
```

Your Tanssi binary file will most likely be named `tanssi-node`. If not, you can replace `tanssi-node` below with the correct name of your Tanssi binary file.

```bash
rm tanssi-node
```

To download the latest release and change permissions on it so the Tanssi service can use it, run the following command that corresponds to your environment:

=== "Generic"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-node && \
    chmod +x ./tanssi-node
    ```

=== "Intel Skylake"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-node-skylake -O tanssi-node && \
    chmod +x ./tanssi-node
    ```

=== "AMD Zen3"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-node-znver3 -O tanssi-node && \
    chmod +x ./tanssi-node
    ```

You can restart your Tanssi Systemd service with the following command:

```bash
systemctl start tanssi.service
```

The node will resume syncing blocks from where it left off when the Systemd service was stopped. To verify that it is running correctly, you can use the following command to check the logs: 

```bash
systemctl status tanssi.service
```

And that's it! You've successfully upgraded your Tanssi node.

## Subscribe to Release Notifications {: #subscribe }

You can subscribe to email notifications of new releases by clicking **Watch** on the [Tanssi GitHub Repo](https://github.com/moondance-labs/tanssi){target=\_blank} and selecting **Custom** notifications and checking the box for **Releases**. 