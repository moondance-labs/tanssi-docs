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

To get started, you'll need access to a computer running an Ubuntu Linux OS and root privileges.

The instructions in this guide use the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} stable release. If you want to compile and run your own binary, make sure to meet the [prerequisites](/builders/build/customize/prerequisites/#building-tanssi-template){target=\_blank} to do so.

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

## Setup the Systemd Service {: #setup-systemd-service }

[Systemd](https://systemd.io/){target=\_blank} is a management system for Linux systems that manages services (daemons), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures.

It is a good practice to have the service running with its own account and grant that account writing access to a specific directory. Run the following commands to configure a new account and the directory:

Create a new account to run the service:

```bash
adduser appchain_node_service --system --no-create-home
```

Create a directory to store the binary and data:

```bash
mkdir /var/lib/appchain-data && \
mv ./container-chain-template-*-node /var/lib/appchain-data
```

Set the folder's ownership to the account that will run the service to ensure writing permission:

```bash
sudo chown -R appchain_node_service /var/lib/appchain-data
```

## Create the Systemd Service configuration file {: #create-systemd-configuration }

The next step is to create the Systemd configuration file. 

You can create the file running the following command:

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
--chain=/chain-network/container-APPCHAIN_ID-raw-specs.json \
--rpc-port=9944 \
--name=para \
--bootnodes=INSERT_YOUR_APPCHAIN_BOOTNODE \
-- \
--chain=/chain-network/relay-raw-no-bootnodes-specs.json \
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

- **APPCHAIN_TYPE** - replace the text with either `frontier` for EVM ContainerChains or `simple` for Substrate ContainerChains
- **YOUR_APPCHAIN_ID** - replace the text with your Appchain identifier, which is obtained in the [third step](/builders/deploy/dapp/#reserve-appchain-id){target=\_blank} of the registration process
- **INSERT_YOUR_APPCHAIN_BOOTNODE** - replace the text with the Tanssi provided bootnode, which can be read from the Tanssi Appchain storage on its [Polkadot.js website](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/chainstate){target=\_blank}. The value must be queried from the `dataPreservers`.`bootnodes` storage unit, using your Appchain Id as the option parameter, as shown in the following image:

    ![Getting the bootnode](/images/node-operators/rpc/rpc-1.webp)

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
