---
title: Run a Tanssi Node Using Systemd
description: Learn how to set up and run a Node for Tanssi networks using Systemd, allowing you to provide API endpoints for applications and users.
icon: simple-linux
categories: RPC-Data-Preservers
---

# Run a Tanssi Node Using Systemd

## Introduction {: #introduction }

In this guide, you'll learn how to spin up a Tanssi Node using the latest stable binary file release and manage the service using [Systemd](https://systemd.io){target=\_blank} on Linux systems. Nodes provide essential API endpoints for applications and users to interact with the Tanssi network.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS with [Landlock](https://docs.kernel.org/security/landlock.html){target=\_blank} enabled and root privileges. You will also need:

- **Node binary files** - a node requires three binary files: `tanssi-relay`, `tanssi-relay-execute-worker`, and `tanssi-relay-prepare-worker`
``

The instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable release. However, you can build your own file by compiling the [source code](https://github.com/moondance-labs/tanssi){target=\_blank}.

## Check Landlock Support {: #check-landlock }

Tanssi nodes use the Linux kernel's Landlock feature as a security measure to restrict access to system resources, limiting the damage if the application is compromised.

Check the Landlock feature support in your system by running the following command:

```bash
sudo dmesg | grep landlock || journalctl -kg landlock
```

The output should look like:

--8<-- 'code/node-operators/terminal/check-landlock.md'

If Landlock is disabled in your system, upgrade the kernel to version 5.13 or above.

## Download the Latest Release {: #download-latest-release }

To get started, download the latest binary release and make it executable by running the following command:

--8<-- 'text/node-operators/optimized-binaries-note.md'

=== "Generic"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-execute-worker && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-prepare-worker && \
    chmod +x ./tanssi-relay*
    ```

=== "Intel Skylake"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-skylake -O tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-execute-worker-skylake -O tanssi-relay-execute-worker && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-prepare-worker-skylake -O tanssi-relay-prepare-worker && \
    chmod +x ./tanssi-relay*
    ```

=== "AMD Zen3"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-znver3 -O tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-execute-worker-znver3 -O tanssi-relay-execute-worker && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-prepare-worker-znver3 -O tanssi-relay-prepare-worker && \
    chmod +x ./tanssi-relay*
    ```

--8<-- 'text/node-operators/set-up-systemd-service.md'

--8<-- 'text/node-operators/generate-node-keys-systemd.md'

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

--8<-- 'text/node-operators/create-systemd-config-file.md'

=== "Tanssi MainNet"

    ```bash
    [Unit]
    Description="Tanssi systemd service"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    User=tanssi_service
    Type=simple
    Restart=always
    RestartSec=10
    SyslogIdentifier=tanssi
    SyslogFacility=local7
    KillSignal=SIGHUP
    LimitNOFILE=100000
    ExecStart=/var/lib/tanssi-data/tanssi-relay --chain=tanssi \
    --8<-- 'code/node-operators/network-node/tanssi/systemd-command.md'
    
    [Install]
    WantedBy=multi-user.target
    ```

=== "Dancelight TestNet"

    ```bash
    [Unit]
    Description="Dancelight systemd service"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    User=dancelight_service
    Type=simple
    Restart=always
    RestartSec=10
    SyslogIdentifier=dancelight
    SyslogFacility=local7
    KillSignal=SIGHUP
    LimitNOFILE=100000
    ExecStart=/var/lib/dancelight-data/tanssi-relay --chain=dancelight \
    --8<-- 'code/node-operators/network-node/tanssi/systemd-command.md'

    [Install]
    WantedBy=multi-user.target
    ```

### Run Flags {: #run-flags }

The flags used in the `ExecStart` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

- **--state-pruning=archive** - keeps all state data, which is necessary for historical state queries
- **--blocks-pruning=archive** - keeps all blocks, necessary for historical block data
- **--database=paritydb** - uses ParityDB as the database backend, which is optimized for RPC node performance
- **--unsafe-rpc-external** - allows external connections to the RPC server. This is required for the node to be accessible externally, but exposing RPC endpoints carries security risks. Ensure appropriate firewall and security measures are in place (see warning below)

!!! warning
    The `--unsafe-rpc-external` flag opens your RPC node to external connections. In production environments, you should implement additional security measures like a reverse proxy with rate limiting and authentication.

You can view all available flags by running:

=== "Tanssi MainNet"

    ```bash
    /var/lib/tanssi-data/tanssi-relay --help
    ```

=== "Dancelight TestNet"
    
    ```bash
    /var/lib/dancelight-data/tanssi-relay --help
    ```

--8<-- 'text/node-operators/run-the-service-systemd.md'

--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

--8<-- 'text/node-operators/check-logs-systemd.md'

## Testing Your Node {: #testing-your-rpc-node }

After your node is fully synced, you can verify that the RPC endpoint is working correctly by making a simple request. You can use curl to test the connection:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method":"chain_getHeader", "params":[]}' http://localhost:9944
```

If the RPC endpoint is working correctly, you should receive a JSON response containing the latest block header information.
