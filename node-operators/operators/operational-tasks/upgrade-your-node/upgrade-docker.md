---
title: Upgrade Your Sequencer Docker Node
description: Follow these instructions to update your Tanssi sequencer node running via Docker to the latest version of the Tanssi client software.
icon: simple-docker
---

# Upgrade Your Node Running via Docker

## Introduction {: #introduction }

Keeping your node up-to-date is an important part of being a Tanssi operator. Not only does it help ensure that your node stays healthy, but it also contributes to keeping the entire Tanssi Network running smoothly.

This tutorial covers upgrading your Tanssi operator node that was configured using Docker. It assumes you have already set up your account and launched an [operator node using Systemd](/node-operators/operators/onboarding/run-an-operator/operators-systemd/){target=\_blank}.

--8<-- 'text/node-operators/github-release-notifications.md'

## Upgrade Docker Nodes {: #upgrading-docker-nodes }

Upgrading your node is as simple as stopping the running container and restarting it with the new version tag.

First, get the container ID of your Tanssi operator node with the following command:

```bash
docker ps -a
```

The container ID is the first column and if you're running multiple Docker containers, you can identify it by the image name of `{{ networks.dancelight.operator_docker_image }}`. You can run the stop command as follows:

```bash
docker stop INSERT_YOUR_CONTAINER_ID
```

Your terminal interaction will resemble the following:

--8<-- 'code/node-operators/operators/operational-tasks/upgrade-your-node/upgrade-docker/terminal/docker-stop.md'

To restart the node, you can use the same command you used when launching your node the first time. The command pulls the image and the node will resume syncing blocks from where it left off when the Docker process was stopped.

=== "Generic"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancelight.operator_docker_image }} \
    --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
    ```

=== "Intel Skylake"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
    {{ networks.dancelight.operator_docker_image }} \
    --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
    ```

=== "AMD Zen3"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
    {{ networks.dancelight.operator_docker_image }} \
    --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
    ```

--8<-- 'text/node-operators/optimized-binaries-note.md'

### Specify a Version Tag {: #specifying-a-version-tag }

To use a specific [version tag](https://hub.docker.com/r/moondancelabs/tanssi/tags){target=\_blank}, append it to the image name. For example, to fetch the version tagged `latest` (which is the default), append `:latest` to `{{ networks.dancelight.operator_docker_image }}`.

And that's it! You've successfully upgraded your Tanssi node.