---
title: Upgrade Your Sequencer Docker Node
description: Follow these instructions to update your Tanssi sequencer node running via Docker to the latest version of the Tanssi client software.
icon: simple-docker
categories: Sequencers
---

# Upgrade Your Node Running via Docker

## Introduction {: #introduction }

Keeping your node up-to-date is an important part of being a Tanssi sequencer. Not only does it help to ensure that your sequencer node stays healthy, it also contributes to keeping the entire Tanssi Network running smoothly.

This tutorial covers upgrading your Tanssi sequencer that was configured using Docker. It assumes you have already set up your account and launched a [sequencer using Docker](/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/){target=\_blank}.

--8<-- 'text/node-operators/github-release-notifications.md'

## Upgrading Docker Nodes {: #upgrading-docker-nodes }

If you're running your sequencer with Docker, updating your node is as simple as stopping the running container and restarting it with the new version tag.

First, get the container ID of your Tanssi sequencer node with the following command:

```bash
docker ps -a
```

The container ID is the first column and if you're running multiple Docker containers, you can identify it by the image name of `{{ node_versions.docker_sequencer_image_name }}`. You can run the stop command as follows:

```bash
docker stop INSERT_YOUR_CONTAINER_ID
```

Your terminal interaction will resemble the following:

--8<-- 'code/node-operators/sequencers/operational-tasks/upgrade-your-node/upgrade-docker/terminal/docker-stop.md'

To restart the node, you can use the same command you used when launching your node the first time. The command pulls the image and the node will resume syncing blocks from where it left off when the Docker process was stopped.

=== "Generic"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ node_versions.docker_sequencer_image_name }} \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```

=== "Intel Skylake"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-skylake" \
    {{ node_versions.docker_sequencer_image_name }} \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```
=== "AMD Zen3"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-znver3" \
    {{ node_versions.docker_sequencer_image_name }} \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```

### Specifying a Version Tag {: #specifying-a-version-tag }

If you wanted to specify a [particular version tag](https://hub.docker.com/r/moondancelabs/tanssi/tags){target=\_blank}, you can do so by replacing the version tag appended to the image name. For example, if you wanted to fetch version `3`, you would replace the `2` in `{{ node_versions.docker_sequencer_image_name }}`.

And that's it! You've successfully upgraded your Tanssi node.