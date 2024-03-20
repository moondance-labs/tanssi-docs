---
title: Upgrade your Node
description: Follow these instructions to update your node to the latest version of the Tanssi client software you use to produce blocks on the Tanssi Appchain protocol. 
---

# Upgrade your Node

## Introduction {: #introduction }

Keeping your node up-to-date is an important part of being a Tanssi block producer node. Not only does it help to ensure that your block producer node stays healthy, it also contributes to keeping the entire Tanssi network running smoothly. 

This tutorial covers upgrading your Tanssi block producer node. This guide assumes that you've already set up your account and spun up a [block producer node](/node-operators/block-producers/onboarding/run-a-block-producer){target=\_blank}. This guide will show you how to upgrade your node whether you're using [Docker](/node-operators/block-producers/onboarding/run-a-block-producer/block-producer-docker/){target=\_blank} or [Systemd](/node-operators/block-producers/onboarding/run-a-block-producer/block-producer-systemd/){target=\_blank}. 

## Upgrading Docker Nodes {: #upgrading-docker-nodes }

If you're running your block producer node with Docker, updating your node is as simple as stopping the running container and restarting it with the new version tag.

First, get the container ID of your Tanssi block producer node with the following command: 

```bash
docker ps -a
```

The container ID is the first column and if you're running multiple docker containers, you can identify it by the image name of `moondancelabs/tanssi`. You can run the stop command as follows: 

```bash
docker stop INSERT_YOUR_CONTAINER_ID_HERE
```

Your terminal interaction will resemble the following:

--8<-- 'code/node-operators/block-producers/operational-tasks/upgrade-your-node/terminal/docker-stop.md'

To restart the node, you can use the command you used when launching your block producer node. The Docker command is configured to automatically retrieve the latest version. The node will resume syncing blocks from where it left off when the Docker process was stopped.  

=== "Generic"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    moondancelabs/tanssi \
    --8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/docker-command.md'
    ```

=== "Intel Skylake"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-skylake" \
    moondancelabs/tanssi \
    --8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/docker-command.md'
    ```
=== "AMD Zen3"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-znver3" \
    moondancelabs/tanssi \
    --8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/docker-command.md'
    ```

### Specifying a Version Tag {: #specifying-a-version-tag }

The Docker commands above will automatically fetch the latest release version tag, but if you wanted to specify a [particular version tag](https://hub.docker.com/r/moondancelabs/tanssi/tags){target=\_blank}, you can do so by appending the version tag to the image name. For example, if you wanted to fetch version `v0.5`, rather than specifying the image name as `moondancelabs/tanssi`, you would indicate `moondancelabs/tanssi:v0.5` as the image name.

The complete commands with specific version tags are thus as follows:

=== "Generic"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    moondancelabs/tanssi:v0.5 \
    --8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/docker-command.md'
    ```

=== "Intel Skylake"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-skylake" \
    moondancelabs/tanssi:v0.5 \
    --8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/docker-command.md'
    ```
=== "AMD Zen3"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-znver3" \
    moondancelabs/tanssi:v0.5 \
    --8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/docker-command.md'
    ```

## Upgrading Systemd Nodes {: #upgrading-systemd-nodes }

If you're running your block producer node via the Systemd service, you'll need to take a few steps to properly upgrade your node. In short, you'll need to stop the service, replace the Tanssi binary with the updated version, and then start the service. 

You can stop your Tanssi Systemd service with the following command:

```bash
systemctl stop tanssi.service
```

Then, navigate to the directory where your Tanssi binary is stored and remove it. 

```bash
cd /var/lib/tanssi-data
```

Note, depending on the particular binary you have, your Tanssi node may be named `tanssi-node`, `tanssi-node-skylake`, or `tanssi-node-zen3`.

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
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-node-skylake && \
    mv ./tanssi-node-skylake ./tanssi-node && \
    chmod +x ./tanssi-node
    ```

=== "AMD Zen3"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-node-zen3 && \
    mv ./tanssi-node-zen3 ./tanssi-node && \
    chmod +x ./tanssi-node
    ```


You can restart your Tanssi Systemd service with the following command:

```bash
systemctl start tanssi.service
```

To verify that it is running correctly, you can use the following command to check the logs: 

```bash
systemctl status tanssi.service
```

## Conclusion {: #conclusion }

And that's it! You've successfully upgraded your Tanssi Node. You can subscribe to email notifications of new releases by clicking **Watch** on the [Tanssi GitHub Repo](https://github.com/moondance-labs/tanssi){target=\_blank} and selecting **Custom** notifications and checking the box for **Releases**. 