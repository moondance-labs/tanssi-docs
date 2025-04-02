---
title: Upgrade Your Validator Systemd Node
description: Follow these instructions to update your Tanssi validator node running via Systemd to the latest version of the Tanssi client software.
icon: simple-linux
---

# Upgrade Your Node Running via Systemd

## Introduction {: #introduction }

Keeping your node up-to-date is an important part of being a Tanssi validator. Not only does it help ensure that your node stays healthy, but it also contributes to keeping the entire Tanssi Network running smoothly.

This tutorial covers upgrading your Tanssi validator node that was configured using Systemd. It assumes you have already set up your account and launched a [validator node using Systemd](/node-operators/validators/onboarding/run-a-validator/validators-systemd/){target=\_blank}.

--8<-- 'text/node-operators/github-release-notifications.md'

## Upgrading Your Systemd Node {: #upgrading-your-systemd-node }

If you're running your validator via the Systemd service, you'll need to take a few steps to upgrade your node properly. In short, you'll need to stop the service, replace the Tanssi binary with the updated version, and then start the service.

You can stop your Tanssi Systemd service with the following command:

```bash
systemctl stop tanssi.service
```

Then, navigate to the directory where your Tanssi binaries are stored and remove them.

```bash
cd /var/lib/tanssi-data
```

If you haven't changed your Tanssi binary file names, they will be named `tanssi-relay`, `tanssi-relay-execute-worker`, and `tanssi-relay-prepare-worker`. Otherwise, you can replace `tanssi-relay*` in the command below with the correct names of your Tanssi binary files.

```bash
rm tanssi-relay*
```

To download the latest release and change permissions on it so the Tanssi service can use it, run the following command that corresponds to your environment:

=== "Generic"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-execute-worker && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-prepare-worker && \
    chmod +x ./tanssi-relay*
    ```

=== "Intel Skylake"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-skylake -O tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-execute-worker-skylake -O tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-prepare-worker-skylake -O tanssi-relay && \
    chmod +x ./tanssi-relay*
    ```

=== "AMD Zen3"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-znver3 -O tanssi-node && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-execute-worker-znver3 -O tanssi-node && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-prepare-worker-znver3 -O tanssi-node && \
    chmod +x ./tanssi-relay*
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