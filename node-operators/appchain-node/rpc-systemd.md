---
title: Run an RPC Node Using Systemd
description: Learn how to set up and run a Tanssi Appchain node using Systemd, which allows you to have your own RPC endpoint to interact with your Appchain.
---

# Run an Appchain Node Using Systemd

## Introduction {: #introduction }

Running a Tanssi Appchain node allows you to connect to and interact with the network using your infrastructure via either HTTP or WebSocket protocols. 

Nodes store block data and network state. However, developers can run different kinds of nodes:
 
 - **Full Archive Node** - a node storing the entire block data and network state at all block heights. Such nodes are helpful when querying historical data from old blocks. However, a full archive node takes up a lot of space
 
  - **Full Pruned Node** - a node storing block data and network state up to some specific number of blocks before the current block height. Such nodes are helpful when querying recent data or submitting transactions through your infrastructure. They require much less space than an archival node but don't store the full network state

In this guide, you'll learn how to spin up a Tanssi Appchain node using a binary executable file and managing the service with [Systemd](https://systemd.io/){target=\_blank} on Linux systems.

!!! note
    It is not possible to run an RPC node for Snap Appchains as they run on a private network, and their nodes are, therefore, unreachable for syncing.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS and root privileges. You will also need:

- **Node binary** - the instructions in this guide use the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} stable release, however, you can compile and run your own binary. To do so, make sure to also meet the [requeriments](/builders/build/customize/prerequisites){target=\_blank} to build your node

- **Appchain specifications file** - the Appchain specification file is needed to run the node. You can download it from the dashboard in the [dApp](https://apps.tanssi.network/){target=\_blank} by clicking the `Appchain Data` link

    ![Getting the chain specs](/images/node-operators/appchain-node/rpc-systemd/rpc-systemd-1.webp)

- **Relay chain specifications file** - the relay chain specification file can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Moonbeam/Moonbase-Alpha/){target=\_blank}

## Download the Latest Release {: #download-latest-release }

Every new release includes two different node binaries, one for EVM-compatible Appchains and another for Substrate Appchains. To get started, run the following command to get the latest release binary that matches your Appchain type and make it executable:

=== "EVM-Compatible Appchain"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/latest/download/container-chain-template-frontier-node && \
    chmod +x ./container-chain-template-frontier-node
    ```

=== "Substrate Appchain"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/latest/download/container-chain-template-simple-node && \
    chmod +x ./container-chain-template-simple-node
    ```

!!! note
    Optimized binary versions for [Skylake](https://www.intel.com/content/www/us/en/products/platforms/details/skylake-u-y.html){target=\_blank} and [Zen3](https://www.amd.com/en/technologies/zen-core){target=\_blank} architectures are also available in the [releases](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} page.

## Download the Relay Chain Specs File {: #download-relay-specs }

The node binary file includes also the necessary code to run a relay chain node. When launching your Appchain's node, it will also be required to provide the relay chain's specification file as a parameter. Download the relay chain specification file executing:

```bash
wget https://raw.githubusercontent.com/papermoonio/external-files/main/Moonbeam/Moonbase-Alpha/westend-alphanet-raw-specs.json
```

## Setup the Systemd Service {: #setup-systemd-service }

[Systemd](https://systemd.io/){target=\_blank} is a management system for Linux systems that manages services (daemons in Unix-like systems jargon), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures.

It is a good practice to have the service running with its own account and grant that account writing access to a specific directory. Run the following commands to configure a new account and the directory:

Create a new account to run the service:

```bash
adduser appchain_node_service --system --no-create-home
```

Create a directory to store the required files and data:

```bash
mkdir /var/lib/appchain-data
```

Set the folder's ownership to the account that will run the service to ensure writing permission:

```bash
sudo chown -R appchain_node_service /var/lib/appchain-data
```

And finally, move the binary and the relay chain spec to the folder:

```bash
mv ./container-chain-template-*-node /var/lib/appchain-data && \
mv ./westend-alphanet-raw-specs.json /var/lib/appchain-data
```

!!! note
    To keep all the necessary files grouped in the same directory, it is recommended to also copy there your Appchain's specification file.

## Create the Systemd Service configuration file {: #create-systemd-configuration }

The next step is to create the Systemd configuration file. 

You can create the file by running the following command:

```bash
sudo touch /etc/systemd/system/appchain.service
```

Now you can open the file using your favorite text editor (vim, emacs, nano, etc) and add the configuration for the service:

```bash
[Unit]
Description="Appchain systemd service"
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=appchain_node_service
SyslogIdentifier=appchain
SyslogFacility=local7
KillSignal=SIGHUP
ExecStart=/var/lib/appchain-data/container-chain-template-APPCHAIN_TYPE-node \
--chain=YOUR_APPCHAIN_SPECS_FILE_LOCATION \
--base-path=/var/lib/appchain-data \
--rpc-port=9944 \
--name=para \
--bootnodes=INSERT_YOUR_APPCHAIN_BOOTNODE \
-- \
--chain=/var/lib/appchain-data/westend-alphanet-raw-specs.json \
--rpc-port=9945 \
--name=relay \
--sync=fast \
--bootnodes=/dns4/frag3-stagenet-relay-val-0.g.moondev.network/tcp/30334/p2p/12D3KooWKvtM52fPRSdAnKBsGmST7VHvpKYeoSYuaAv5JDuAvFCc \
--bootnodes=/dns4/frag3-stagenet-relay-val-1.g.moondev.network/tcp/30334/p2p/12D3KooWQYLjopFtjojRBfTKkLFq2Untq9yG7gBjmAE8xcHFKbyq \
--bootnodes=/dns4/frag3-stagenet-relay-val-2.g.moondev.network/tcp/30334/p2p/12D3KooWMAtGe8cnVrg3qGmiwNjNaeVrpWaCTj82PGWN7PBx2tth \
--bootnodes=/dns4/frag3-stagenet-relay-val-3.g.moondev.network/tcp/30334/p2p/12D3KooWLKAf36uqBBug5W5KJhsSnn9JHFCcw8ykMkhQvW7Eus3U \
--bootnodes=/dns4/vira-stagenet-relay-validator-0.a.moondev.network/tcp/30334/p2p/12D3KooWSVTKUkkD4KBBAQ1QjAALeZdM3R2Kc2w5eFtVxbYZEGKd \
--bootnodes=/dns4/vira-stagenet-relay-validator-1.a.moondev.network/tcp/30334/p2p/12D3KooWFJoVyvLNpTV97SFqs91HaeoVqfFgRNYtUYJoYVbBweW4 \
--bootnodes=/dns4/vira-stagenet-relay-validator-2.a.moondev.network/tcp/30334/p2p/12D3KooWP1FA3dq1iBmEBYdQKAe4JNuzvEcgcebxBYMLKpTNirCR \
--bootnodes=/dns4/vira-stagenet-relay-validator-3.a.moondev.network/tcp/30334/p2p/12D3KooWDaTC6H6W1F4NkbaqK3Ema3jzc2BbhE2tyD3YEf84yNLE 

[Install]
WantedBy=multi-user.target
```

The `ExecStart` command has some parameters that need to be changed to match your specific Appchain:

- `EVM compatibility` - Tanssi releases two different binaries, one for EVM-compatible Appchains and another for only Substrate Appchains. Replace `APPCHAIN_TYPE` with either `frontier` for EVM Appchains or `simple` for Substrate Appchains
- `Specification file` - replace `YOUR_APPCHAIN_SPECS_FILE_LOCATION` with your Appchain's file name. If the file was copied in the same directory as the binary, then your location will look like `/var/lib/appchain-data/` and your filename, e.g. `/var/lib/appchain-data/spec-raw.json`
- `Bootnode` - a bootnode is a full archive node that is used to sync the network from scratch. You'll need to [retrieve your Tanssi Appchain bootnode](#fetching-bootnode-information) and replace `INSERT_YOUR_APPCHAIN_BOOTNODE` with the actual bootnode information

### Fetching Bootnode Information {: #fetching-bootnode-information}

Bootnode information can be read from the Tanssi Appchain storage on its [Polkadot.js explorer](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/chainstate){target=\_blank}.

To do so, take the following steps:

1. Select `dataPreservers` as the module to query
2. Set the storage query to `bootNodes`
3. Provide your Tanssi Appchain ID
4. Click on the **+** sign

![Getting the bootnode](/images/node-operators/appchain-node/rpc-systemd/rpc-systemd-2.webp)

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

And check the logs, if needed with:

```bash
journalctl -f -u appchain.service
```
