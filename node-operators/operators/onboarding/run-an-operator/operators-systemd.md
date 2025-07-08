---
title: Run a Tanssi Operator
description: Learn how to set up and run an operator (validator) node for Tanssi networks using Systemd, allowing you to participate in the protocol and earn rewards.
icon: simple-linux
categories: Operators
---

# Run an Operator Node Using Systemd

## Introduction {: #introduction }

--8<-- 'text/node-operators/operators/onboarding/run-an-operator/intro.md'

In this guide, you'll learn how to spin up a Tanssi operator using the latest stable binary file release and manage the service using [Systemd](https://systemd.io){target=\_blank} on Linux systems.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS with [Landlock](https://docs.kernel.org/security/landlock.html){target=\_blank} enabled and root privileges. You will also need:

- **Node binary files** - an operator requires three binary files: `tanssi-relay`, `tanssi-relay-execute-worker`, and `tanssi-relay-prepare-worker`.

The instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable release. However, you can build your own file compiling the [source code](https://github.com/moondance-labs/tanssi){target=\_blank}.

## Check Landlock Support {: #check-landlock }

Tanssi operators use the Linux kernel's Landlock feature as a security measure to restrict its own access to system resources, limiting the damage if the application is compromised.

Check the Landlock feature support in your system running the following command:

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
    --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-systemd/systemd-command.md'
    
    [Install]
    WantedBy=multi-user.target
    ```

=== "Dancelight TestNet"

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
    ExecStart=/var/lib/tanssi-data/tanssi-relay --chain=dancelight \
    --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-systemd/systemd-command.md'

    [Install]
    WantedBy=multi-user.target
    ```

### Run Flags {: #run-flags }

The flags used in the `ExecStart` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

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