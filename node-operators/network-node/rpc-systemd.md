---
title: Run a Network Node Using Systemd
description: Learn how to set up and run a Tanssi-powered network node using Systemd, which allows you to have your own RPC endpoint to interact with your chain.
icon: simple-linux
---

# Run an Appchain Node Using Systemd

## Introduction {: #introduction }

--8<-- 'text/node-operators/network-node/intro.md'

In this guide, you'll learn how to spin up a Tanssi appchain node using a binary executable file and manage the service with [Systemd](https://systemd.io){target=\_blank} on Linux systems.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

!!! note
    It is not possible to run an RPC node for Snap appchains as they run on a private network, and their nodes are, therefore, unreachable for syncing.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS and root privileges. You will also need:

- **Node binary file** - the instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable node release. If you want to build and run your own file, make sure to follow the instructions for [building your appchain node](/builders/build/customize/prerequisites/){target=\_blank}

- **Appchain specifications file** - the appchain specification file is needed to run the node. You can download it from the dashboard in the [dApp](https://apps.tanssi.network){target=\_blank} by clicking the **Appchain Data** link

    ![Getting the chain specs](/images/node-operators/network-node/rpc-systemd/rpc-systemd-1.webp)

- **Relay chain specifications file** - the relay chain specification file can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Moonbeam/Moonbase-Alpha){target=\_blank}

## Download the Latest Release {: #download-latest-release }

Every new release includes two node binaries, one for EVM-compatible appchains and another for Substrate appchains. To get started, run the following command to get the latest release binary that matches your appchain type and make it executable:

=== "EVM-Compatible Appchain"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/latest/download/container-chain-frontier-node && \
    chmod +x ./container-chain-frontier-node
    ```

=== "Substrate Appchain"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/latest/download/container-chain-simple-node && \
    chmod +x ./container-chain-simple-node
    ```

--8<-- 'text/node-operators/optimized-binaries-note.md'

## Download the Relay Chain Specs File {: #download-relay-specs }

The node binary file includes also the necessary code to run a relay chain node. When launching your appchain's node, it will also be required to provide the relay chain's specification file as a parameter.

Download the relay chain specification file by executing:

```bash
wget https://raw.githubusercontent.com/papermoonio/external-files/main/Moonbeam/Moonbase-Alpha/westend-alphanet-raw-specs.json
```

## Setup the Systemd Service {: #setup-systemd-service }

[Systemd](https://systemd.io){target=\_blank} is a management system for Linux systems that manages services (daemons in Unix-like systems jargon), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures. The following commands configure a new account, the directory, and move the previously downloaded files to the right location.

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
    To keep all the necessary files grouped in the same directory, it is also recommended to copy your appchain's specification file there.

### Create the Systemd Service Configuration File {: #create-systemd-configuration }

The next step is to create the Systemd configuration file.

You can create the file by running the following command:

```bash
sudo touch /etc/systemd/system/appchain.service
```

Now, you can open the file using your favorite text editor (vim, emacs, nano, etc.) and add the configuration for the service.

Note that the `ExecStart` command  has some parameters that need to be changed to match your specific appchain:

- `Specification file` - replace `YOUR_APPCHAIN_SPECS_FILE_LOCATION` with your appchain's absolute path. If you copied the file in the same directory as the binary file and the relay chain specs, then your path will look like `/var/lib/appchain-data/YOUR_FILENAME.json`, e.g., `/var/lib/appchain-data/spec-raw.json`
--8<-- 'text/node-operators/network-node/bootnode-item.md'

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
    User=appchain_node_service
    SyslogIdentifier=appchain
    SyslogFacility=local7
    KillSignal=SIGHUP
    ExecStart=/var/lib/appchain-data/container-chain-frontier-node \
    --chain=YOUR_APPCHAIN_SPECS_FILE_LOCATION \
    --rpc-port=9944 \
    --name=para \
    --base-path=/var/lib/appchain-data \
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

=== "Substrate Appchain"

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
    ExecStart=/var/lib/appchain-data/container-chain-simple-node \
    --chain=YOUR_APPCHAIN_SPECS_FILE_LOCATION \
    --rpc-port=9944 \
    --name=para \
    --base-path=/var/lib/appchain-data \
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

--8<-- 'text/node-operators/network-node/fetching-bootnode-section.md'

### Full Node Configuration Example for the Demo EVM Appchain {: #example-demo-evm-appchain}

The following example deploys a fully functional full archive node for the [demo EVM appchain](/builders/tanssi-network/testnet/demo-evm-appchain/){target=\_blank} deployed on Dancebox with an ID of `3001`.

The raw chain specification file for the demo appchain is required to run the node, and can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Tanssi/Demo-EVM-Appchain){target=\_blank}. Download the file and place it in the `/var/lib/appchain-data/` directory.

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
ExecStart=/var/lib/appchain-data/container-chain-frontier-node \
--chain=/var/lib/appchain-data/container-3001-raw-specs.json \
--rpc-port=9944 \
--name=para \
--state-pruning=archive \
--blocks-pruning=archive \
--base-path=/var/lib/appchain-data \
--bootnodes=/dns4/fraa-dancebox-3001-rpc-0.a.dancebox.tanssi.network/tcp/30333/p2p/12D3KooWQ9jVpatqmWS41Zf6PHncV4ZmEYvywifRTs9YVoz8HgTM \
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

### Run Flags {: #run-flags }

The flags used in the `ExecStart` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

=== "EVM-compatible Appchain"

    ```bash
    /var/lib/appchain-data/container-chain-frontier-node --help
    ```

=== "Simple Substrate Appchain"

    ```bash
    /var/lib/appchain-data/container-chain-simple-node --help
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
