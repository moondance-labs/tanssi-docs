---
title: Upgrade Your Sequencer Docker Node
description: Follow these instructions to update your Tanssi sequencer node running via Docker to the latest version of the Tanssi client software.
icon: simple-docker
---

# Upgrade Your Node Running via Docker

## Introduction {: #introduction }

Keeping your node up-to-date is an important part of being a Tanssi sequencer. Not only does it help to ensure that your sequencer node stays healthy, it also contributes to keeping the entire Tanssi Network running smoothly. Tanssi sequencer operators can subscribe to [GitHub notifications](#subscribe) to be alerted for new client release versions.

This tutorial covers upgrading your Tanssi sequencer that was configured using Docker. It assumes you have already set up your account and launched a [sequencer using Docker](/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/){target=\_blank}.

## Upgrading Docker Nodes {: #upgrading-docker-nodes }

If you're running your sequencer with Docker, updating your node is as simple as stopping the running container and restarting it with the new version tag.

First, get the container ID of your Tanssi block producer node with the following command:

```bash
docker ps -a
```

The container ID is the first column and if you're running multiple Docker containers, you can identify it by the image name of `{{ networks.dancebox.docker_sequencer_image_name }}`. You can run the stop command as follows:

```bash
docker stop INSERT_YOUR_CONTAINER_ID
```

Your terminal interaction will resemble the following:

--8<-- 'code/node-operators/sequencers/operational-tasks/upgrade-your-node/upgrade-docker/terminal/docker-stop.md'

To restart the node, you can use the command you used when launching your block producer node. The Docker command is configured to automatically retrieve the latest version. The node will resume syncing blocks from where it left off when the Docker process was stopped.  

=== "Generic"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancebox.docker_sequencer_image_name }} \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```

=== "Intel Skylake"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-skylake" \
    {{ networks.dancebox.docker_sequencer_image_name }} \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```
=== "AMD Zen3"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-znver3" \
    {{ networks.dancebox.docker_sequencer_image_name }} \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```

### Specifying a Version Tag {: #specifying-a-version-tag }

The Docker commands above will automatically fetch the latest release version tag, but if you wanted to specify a [particular version tag](https://hub.docker.com/r/moondancelabs/tanssi/tags){target=\_blank}, you can do so by appending the version tag to the image name. For example, if you wanted to fetch version `{{ networks.dancebox.client_version }}`, rather than specifying the image name as `{{ networks.dancebox.docker_sequencer_image_name }}`, you would indicate `{{ networks.dancebox.docker_sequencer_image_name }}:{{ networks.dancebox.client_version }}` as the image name.

The complete commands with specific version tags are thus as follows:

=== "Generic"

    ```bash
    docker run --entrypoint bash --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancebox.docker_sequencer_image_name }} -c "/chain-network/tanssi-node solo-chain \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```

=== "Intel Skylake"

    ```bash
    docker run --entrypoint bash --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancebox.docker_sequencer_image_name }} -c "/chain-network/tanssi-node solo-chain \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```

=== "AMD Zen3"

    ```bash
    docker run --entrypoint bash --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancebox.docker_sequencer_image_name }} -c "/chain-network/tanssi-node solo-chain \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```
And that's it! You've successfully upgraded your Tanssi node.

## Subscribe to Release Notifications {: #subscribe }

You can subscribe to email notifications of new releases by clicking **Watch** on the [Tanssi GitHub Repo](https://github.com/moondance-labs/tanssi){target=\_blank} and selecting **Custom** notifications and checking the box for **Releases**.
