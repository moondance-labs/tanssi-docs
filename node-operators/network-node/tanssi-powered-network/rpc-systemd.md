---
title: Run a Network Node Using Systemd
description: Learn how to set up and run a Tanssi-powered network node using Systemd, which allows you to have your own RPC endpoint to interact with your chain.
icon: simple-linux
---

# Run a Network Node Using Systemd

## Introduction {: #introduction }

--8<-- 'text/node-operators/network-node/intro.md'

In this guide, you'll learn how to spin up a Tanssi network node using a binary executable file and manage the service with [Systemd](https://systemd.io){target=\_blank} on Linux systems.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

!!! note
    It is not possible to run an RPC node for quick Trial networks as they run on a private network, and their nodes are, therefore, unreachable for syncing.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS and root privileges. You will also need:

- **Node binary file** - the instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable node release. If you want to build and run your own file, make sure to follow the instructions for [building your network node](/builders/build/customize/prerequisites/){target=\_blank}

- **Network specifications file** - the network specification file is needed to run the node. You can download it from the dashboard in the [dApp](https://apps.tanssi.network){target=\_blank} by clicking the **Network Data** link

    ![Getting the chain specs](/images/node-operators/network-node/rpc-systemd/rpc-systemd-1.webp)

- **Tanssi network specifications file** - the Tanssi network specification file can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Moonbeam/Moonbase-Alpha){target=\_blank}

## Download the Latest Release {: #download-latest-release }

Every new release includes two node binaries, one for EVM-compatible networks and another for Substrate networks. To get started, run the following command to get the latest release binary that matches your network type and make it executable:

=== "EVM-Compatible Network"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/latest/download/container-chain-frontier-node && \
    chmod +x ./container-chain-frontier-node
    ```

=== "Substrate Network"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/latest/download/container-chain-simple-node && \
    chmod +x ./container-chain-simple-node
    ```

--8<-- 'text/node-operators/optimized-binaries-note.md'

## Download the Tanssi Network Specs File {: #download-tanssi-specs }

The node binary file includes also the necessary code to run a Tanssi network node. When launching your network's node, it will also be required to provide the Tanssi network specification file as a parameter.

Download the Tanssi network specification file by executing:

=== "Dancelight"

    ```bash
    wget https://raw.githubusercontent.com/papermoonio/external-files/main/Tanssi/Dancelight/dancelight-raw-specs.json
    ```

## Setup the Systemd Service {: #setup-systemd-service }

[Systemd](https://systemd.io){target=\_blank} is a management system for Linux systems that manages services (daemons in Unix-like systems jargon), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures. The following commands configure a new account, the directory, and move the previously downloaded files to the right location.

Create a new account to run the service:

```bash
adduser network_node_service --system --no-create-home
```

Create a directory to store the required files and data:

=== "Dancelight"

    ```bash
    mkdir /var/lib/dancelight-data
    ```

Set the folder's ownership to the account that will run the service to ensure writing permission:

=== "Dancelight"

    ```bash
    sudo chown -R network_node_service /var/lib/dancelight-data
    ```

And finally, move the binary and the relay chain spec to the folder:

=== "Dancelight"

    ```bash
    mv ./container-chain-template-*-node /var/lib/dancelight-data && \
    mv ./dancelight-raw-specs.json /var/lib/dancelight-data
    ```

!!! note
    To keep all the necessary files grouped in the same directory, it is also recommended to copy your network's specification file there.

### Create the Systemd Service Configuration File {: #create-systemd-configuration }

The next step is to create the Systemd configuration file.

You can create the file by running the following command:

```bash
sudo touch /etc/systemd/system/network.service
```

Now, you can open the file using your favorite text editor (vim, emacs, nano, etc.) and add the configuration for the service.

Note that the `ExecStart` command  has some parameters that need to be changed to match your specific network:

- `Specification file` - replace `YOUR_NETWORK_SPECS_FILE_LOCATION` with your network's absolute path. If you copied the file in the same directory as the binary file and the relay chain specs, then your path will look like `/var/lib/dancelight-data/YOUR_FILENAME.json`, e.g., `/var/lib/dancelight-data/spec-raw.json`
--8<-- 'text/node-operators/network-node/bootnode-item.md'

=== "EVM-Compatible Network"

    ```bash
    [Unit]
    Description="Network systemd service"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    Restart=on-failure
    RestartSec=10
    User=network_node_service
    SyslogIdentifier=network
    SyslogFacility=local7
    KillSignal=SIGHUP
    ExecStart=/var/lib/dancelight-data/container-chain-frontier-node \
    --chain=YOUR_NETWORK_SPECS_FILE_LOCATION \
    --rpc-port=9944 \
    --name=para \
    --base-path=/var/lib/dancelight-data \
    --state-pruning=archive \
    --blocks-pruning=archive \
    --database=paritydb \
    --unsafe-rpc-external \
    --bootnodes=INSERT_YOUR_NETWORK_BOOTNODE \
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

=== "Substrate Network"

    ```bash
    [Unit]
    Description="Network systemd service"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    Restart=on-failure
    RestartSec=10
    User=network_node_service
    SyslogIdentifier=network
    SyslogFacility=local7
    KillSignal=SIGHUP
    ExecStart=/var/lib/dancelight-data/container-chain-simple-node \
    --chain=YOUR_NETWORK_SPECS_FILE_LOCATION \
    --rpc-port=9944 \
    --name=para \
    --base-path=/var/lib/dancelight-data \
    --bootnodes=INSERT_YOUR_NETWORK_BOOTNODE \
    -- \
    --chain=/var/lib/dancelight-data/dancelight-raw-specs.json \
    --rpc-port=9945 \
    --name=relay \
    --sync=fast \
    --bootnodes=/dns4/qco-dancelight-boot-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWCekAqk5hv2fZprhqVz8povpUKdJEiHSd3MALVDWNPFzY \
    --bootnodes=/dns4/qco-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWEwhUb3tVR5VhRBEqyH7S5hMpFoGJ9Anf31hGw7gpqoQY \
    --bootnodes=/dns4/ukl-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWPbVtdaGhcuDTTQ8giTUtGTEcUVWRg8SDWGdJEeYeyZcT

    [Install]
    WantedBy=multi-user.target
    ```

--8<-- 'text/node-operators/network-node/fetching-bootnode-section.md'

### Full Node Configuration Example for the Demo EVM Network {: #example-demo-evm-network}

The following example deploys a fully functional full archive node for the [demo EVM network](/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank} deployed on Dancelight with an ID of `2001`.

The raw chain specification file for the demo network is required to run the node, and can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Tanssi/Demo-EVM-Appchain){target=\_blank}. Download the file and place it in the `/var/lib/dancelight-data/` directory.

=== "Dancelight"

    ```bash
    [Unit]
    Description="Network systemd service"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    Restart=on-failure
    RestartSec=10
    User=network_node_service
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
    --bootnodes=/dns4/ukl-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWKDotMgTRpURvoZHsLWP4K9ymhkBByi1EJjMQAnCmqg8E \
    --bootnodes=/dns4/qco-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWB3kqqNhYgGtGbsdtgD18wUoFVeuXVXgWLXTFs91RNgAx \
    -- \
    --chain=/var/lib/dancelight-data/dancelight-raw-specs.json \
    --rpc-port=9945 \
    --name=relay \
    --sync=fast \
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
systemctl enable network.service && \
systemctl start network.service
```

You can verify that the service is up and running correctly running:

```bash
systemctl status network.service
```

--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

And check the logs, if needed, with the following command:

```bash
journalctl -f -u network.service
```

--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/journalctl-logs.md'
