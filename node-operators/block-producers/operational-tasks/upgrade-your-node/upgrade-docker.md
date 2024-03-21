---
title: Upgrade your Block Producer Docker Node
description: Follow these instructions to update your Tanssi block producer node running via Systemd to the latest version of the Tanssi client software.
---

# Upgrade Your Node Running via Docker

## Introduction {: #introduction }

Keeping your node up-to-date is an important part of being a Tanssi block producer node. Not only does it help to ensure that your block producer node stays healthy, it also contributes to keeping the entire Tanssi network running smoothly. Tanssi Block Producers can subscribe to [Github Notifications](#conclusion) to be alerted for new client release versions. 

This tutorial covers upgrading your Tanssi block producer node that was configured using Docker. It assumes you have already set up your account and launched a [block producer node using Docker](/node-operators/block-producers/onboarding/run-a-block-producer/block-producer-docker/){target=\_blank}. 

## Upgrading Docker Nodes {: #upgrading-docker-nodes }

If you're running your block producer node with Docker, updating your node is as simple as stopping the running container and restarting it with the new version tag.

First, get the container ID of your Tanssi block producer node with the following command: 

```bash
docker ps -a
```

The container ID is the first column and if you're running multiple Docker containers, you can identify it by the image name of `moondancelabs/tanssi`. You can run the stop command as follows: 

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

## Conclusion {: #conclusion }

And that's it! You've successfully upgraded your Tanssi Node. You can subscribe to email notifications of new releases by clicking **Watch** on the [Tanssi GitHub Repo](https://github.com/moondance-labs/tanssi){target=\_blank} and selecting **Custom** notifications and checking the box for **Releases**. 