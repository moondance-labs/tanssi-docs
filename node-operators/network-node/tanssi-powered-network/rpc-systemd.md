---
title: Run an Appchain Node Using Systemd
description: Learn how to set up and run a Tanssi-powered appchain node using Systemd, which allows you to have your own RPC endpoint to interact with your appchain.
icon: simple-linux
categories: RPC-Data-Preservers
---

# Run an Appchain Node Using Systemd

## Introduction {: #introduction }

--8<-- 'text/node-operators/network-node/intro.md'

In this guide, you'll learn how to spin up a Tanssi appchain node using a binary executable file and manage the service with [Systemd](https://systemd.io){target=\_blank} on Linux systems.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

!!! note
    It is not possible to run an RPC node for quick Trial appchains as they run on a private network, and their nodes are, therefore, unreachable for syncing.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS and root privileges. You will also need:

- **Node binary file** - the instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable node release. If you want to build and run your own file, make sure to follow the instructions for [building your appchain node](/builders/build/customize/prerequisites/){target=\_blank}.

- **Chain specifications files** - the node needs information about two different blockchains to sync and run correctly. The following section will show you how to get those files.

--8<-- 'text/node-operators/network-node/getting-specs-files.md'

## Download the Latest Release {: #download-latest-release }

Every new release includes two node binaries, one for EVM-compatible networks and another for Substrate networks. To get started, run the following command to get the latest release binary that matches your network type and make it executable:

=== "EVM-Compatible Network"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/container-chain-frontier-node && \
    chmod +x ./container-chain-frontier-node
    ```

=== "Substrate Network"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/container-chain-simple-node && \
    chmod +x ./container-chain-simple-node
    ```

--8<-- 'text/node-operators/optimized-binaries-note.md'

--8<-- 'text/node-operators/appchains-systemd-data-directory.md'

Move the node binary as well: 

=== "Tanssi MainNet"

    === "EVM-Compatible Appchain"

        ```bash
        mv ./container-chain-frontier-node /var/lib/tanssi-data
        ```

    === "Substrate Network"

        ```bash
        mv ./container-chain-simple-node /var/lib/tanssi-data
        ```

=== "Dancelight TestNet"

    === "EVM-Compatible Appchain"

        ```bash
        mv ./container-chain-frontier-node /var/lib/dancelight-data
        ```

    === "Substrate Network"

        ```bash
        mv ./container-chain-simple-node /var/lib/dancelight-data
        ```

Finally, move also your appchain's spec file to the same folder.

### Create the Systemd Service Configuration File {: #create-systemd-configuration }

The next step is to create the Systemd configuration file.

You can create the file by running the following command:

```bash
sudo touch /etc/systemd/system/appchain.service
```

Now, you can open the file using your favorite text editor (vim, emacs, nano, etc.) and add the configuration for the service.

Note that the `ExecStart` command  has some parameters that need to be changed to match your specific network:

- `Specification file` - replace `INSERT_YOUR_APPCHAIN_SPECS_FILE_NAME` with your appchain's file name. Your path will look like `/var/lib/tanssi-data/YOUR_FILENAME.json`, for a MainNet appchain.
--8<-- 'text/node-operators/network-node/bootnode-item.md'

=== "Tanssi MainNet"

    === "EVM-Compatible Appchain"

        ```bash
        [Unit]
        Description="Appchain systemd service"
        After=network.target
        StartLimitIntervalSec=0

        [Service]
        Type=simple
        Restart=on-failure
        RestartSec=10
        User=tanssi_service
        SyslogIdentifier=network
        SyslogFacility=local7
        KillSignal=SIGHUP
        ExecStart=/var/lib/tanssi-data/container-chain-frontier-node \
        --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-mainnet.md'

        [Install]
        WantedBy=multi-user.target
        ```

    === "Substrate Network"

        ```bash
        [Unit]
        Description="Appchain systemd service"
        After=network.target
        StartLimitIntervalSec=0

        [Service]
        Type=simple
        Restart=on-failure
        RestartSec=10
        User=tanssi_service
        SyslogIdentifier=network
        SyslogFacility=local7
        KillSignal=SIGHUP
        ExecStart=/var/lib/tanssi-data/container-chain-simple-node \
        --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-mainnet.md'

        [Install]
        WantedBy=multi-user.target
        ```

=== "Dancelight TestNet"

    === "EVM-Compatible Network"

        ```bash
        [Unit]
        Description="Appchain systemd service"
        After=network.target
        StartLimitIntervalSec=0

        [Service]
        Type=simple
        Restart=on-failure
        RestartSec=10
        User=dancelight_service
        SyslogIdentifier=network
        SyslogFacility=local7
        KillSignal=SIGHUP
        ExecStart=/var/lib/dancelight-data/container-chain-frontier-node \
        --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-testnet.md'

        [Install]
        WantedBy=multi-user.target
        ```

    === "Substrate Network"

        ```bash
        [Unit]
        Description="Appchain systemd service"
        After=network.target
        StartLimitIntervalSec=0

        [Service]
        Type=simple
        Restart=on-failure
        RestartSec=10
        User=dancelight_service
        SyslogIdentifier=network
        SyslogFacility=local7
        KillSignal=SIGHUP
        ExecStart=/var/lib/dancelight-data/container-chain-simple-node \
        --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-testnet.md'

        [Install]
        WantedBy=multi-user.target
        ```

--8<-- 'text/node-operators/network-node/fetching-bootnode-section.md'

### Full Node Configuration Example for the Demo EVM Network {: #example-demo-evm-network}

The following example deploys a fully functional full archive node for the [demo EVM network](/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank} deployed on Dancelight with an ID of `2001`.

The raw chain specification file for the demo network is required to run the node, and can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Tanssi/Demo-EVM-Appchain){target=\_blank}. Download the file and place it in the `/var/lib/dancelight-data/` directory.

=== "Demo EVM Appchain (Dancelight)"

    ```bash
    [Unit]
    Description="Appchain systemd service"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    Restart=on-failure
    RestartSec=10
    User=dancelight_service
    SyslogIdentifier=network
    SyslogFacility=local7
    KillSignal=SIGHUP
    ExecStart=/var/lib/dancelight-data/container-chain-frontier-node \
    --chain=/var/lib/dancelight-data/container-2001-raw-specs.json \
    --rpc-port=9944 \
    --name=para \
    --state-pruning=archive \
    --blocks-pruning=archive \
    --base-path=/var/lib/dancelight-data \
    --database=paritydb \
    --unsafe-rpc-external \
    --bootnodes=/dns4/ukl-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWKDotMgTRpURvoZHsLWP4K9ymhkBByi1EJjMQAnCmqg8E \
    --bootnodes=/dns4/qco-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWB3kqqNhYgGtGbsdtgD18wUoFVeuXVXgWLXTFs91RNgAx \
    -- \
    --chain=/var/lib/dancelight-data/dancelight-raw-specs.json \
    --rpc-port=9945 \
    --name=relay \
    --sync=fast \
    --database=paritydb \
    --bootnodes=/dns4/qco-dancelight-boot-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWCekAqk5hv2fZprhqVz8povpUKdJEiHSd3MALVDWNPFzY \
    --bootnodes=/dns4/qco-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWEwhUb3tVR5VhRBEqyH7S5hMpFoGJ9Anf31hGw7gpqoQY \
    --bootnodes=/dns4/ukl-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWPbVtdaGhcuDTTQ8giTUtGTEcUVWRg8SDWGdJEeYeyZcT

    [Install]
    WantedBy=multi-user.target
    ```

### Run Flags {: #run-flags }

The flags used in the `ExecStart` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

=== "EVM-compatible Network"

    ```bash
    /var/lib/dancelight-data/container-chain-frontier-node --help
    ```

=== "Simple Substrate Network"

    ```bash
    /var/lib/dancelight-data/container-chain-simple-node --help
    ```

## Run the Service {: #run-the-service }

Finally, enable the service and start it for the first time:

```bash
systemctl enable appchain.service && \
systemctl start appchain.service
```

You can verify that the service is up and running correctly running:

```bash
systemctl status appchain.service
```

--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

And check the logs, if needed, with the following command:

```bash
journalctl -f -u appchain.service
```

--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/journalctl-logs.md'
