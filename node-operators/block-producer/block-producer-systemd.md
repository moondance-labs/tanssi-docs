---
title: Run a Tanssi Block Producer
description: Learn how to set up and run block producers (collators) for Tanssi Appchains using Systemd, allowing you to participate in the protocol and earn rewards.
---

# Run a Block Producer Node Using Systemd

## Introduction {: #introduction }

The Tanssi protocol manages a set of block producers (collators) and assigns them to provide block production services to the active Appchains and the Tanssi network itself.

The assignment algorithm distributes the available block producers on a per-session basis rotating them randomly, meaning that they will not be producing blocks for the same Appchain for a long period of time.

In this guide, you'll learn how to spin up a Tanssi block producer to be part of the shared pool of collators using the latest stable binary file release and managing the service with [Systemd](https://systemd.io/){target=\_blank} on Linux systems.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS and root privileges. You will also need:

- **Node binary file** - the instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable node release. If you want to build and run your own file, make sure to meet the prerequisites for [building your Appchain node](/builders/build/customize/prerequisites){target=\_blank}

- **Tanssi orchestrator specifications file** - the Tanssi orchestrator specification file is needed to run the node. You can download it from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Tanssi/Dancebox/){target=\_blank}

- **Relay chain specifications file** - the relay chain specification file can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Moonbeam/Moonbase-Alpha/){target=\_blank}

## Download the Latest Release {: #download-latest-release }

Every new release includes two different node binaries, one for EVM-compatible Appchains and another one for Substrate Appchains. To get started, run the following command to get the latest release binary that matches your Appchain type and make it executable:

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

The node binary file includes also the necessary code to run a relay chain node. When launching your Appchain's node, it will also be required to provide the relay chain's specification file as a parameter. 

Download the relay chain specification file executing:

```bash
wget https://raw.githubusercontent.com/papermoonio/external-files/main/Moonbeam/Moonbase-Alpha/westend-alphanet-raw-specs.json
```

## Setup the Systemd Service {: #setup-systemd-service }

[Systemd](https://systemd.io/){target=\_blank} is a management system for Linux systems that manages services (daemons in Unix-like systems jargon), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures.

It is a good practice to have the service running with its own non-root account and grant that account writing access to a specific directory. Run the following commands to configure a new account and the directory:

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

### Create the Systemd Service configuration file {: #create-systemd-configuration }

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

Note that the `ExecStart` command still needs some parameters to be changed before starting the service. The following section focuses on this command and its optional flags.

## The `ExecStart` Command {: #execstart-command }

The previous `ExecStart` example has some parameters that need to be changed to match your specific Appchain:

- `EVM compatibility` - Tanssi releases two different binaries, one for EVM-compatible Appchains and another for only Substrate Appchains. Replace `APPCHAIN_TYPE` with either `frontier` for EVM Appchains or `simple` for Substrate Appchains
- `Specification file` - replace `YOUR_APPCHAIN_SPECS_FILE_LOCATION` with your Appchain's absolute path. If the file was copied in the same directory as the binary file and the relay chain specs, then your path will look like `/var/lib/appchain-data/YOUR_FILENAME.json`, e.g. `/var/lib/appchain-data/spec-raw.json`
- `Bootnode` - a bootnode is a full archive node that is used to sync the network from scratch. You'll need to [retrieve your Tanssi Appchain bootnode](#fetching-bootnode-information) and replace `INSERT_YOUR_APPCHAIN_BOOTNODE` with the actual bootnode information

### Fetching Bootnode Information {: #fetching-bootnode-information}

Bootnode information can be read from the Tanssi Appchain storage on its [Polkadot.js explorer](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffraa-dancebox-rpc.a.dancebox.tanssi.network#/chainstate){target=\_blank}.

To do so, take the following steps:

1. Select `dataPreservers` as the module to query
2. Set the storage query to `bootNodes`
3. Provide your Tanssi Appchain ID
4. Click on the **+** sign

![Getting the bootnode](/images/node-operators/appchain-node/rpc-systemd/rpc-systemd-2.webp)

### Run Flags {: #run-flags }

The flags used in the `ExecStart` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

- `--name INSERT_NAME` - a human-readable name for this node
- `--rpc-port INSERT_PORT` - specifies the JSON-RPC TCP port the node listens on
- `--unsafe-rpc-external` - exposes the RPC service on all the interfaces
- `--state-pruning INSERT_STATE_PRUNING_TYPE` - specifies when the Tanssi Appchain state should be removed from the database. The pruning type can be either `archive` (which makes the node behave as a full node keeping all the state), `archive-canonical` (which keeps only the state of finalized blocks), or any `number` (representing the number of blocks whose states are kept)
- `--blocks-pruning INSERT_BLOCKS_PRUNING_TYPE` - specifies how many blocks should be kept in the database. The pruning type can be either `archive` (which makes the node behave as a full node keeping all the blocks), `archive-canonical` (which keeps only finalized blocks), or any `number` (representing the amount of finalized blocks to keep)
- `--detailed-log-output` - enables detailed log output

For a complete list of available flags, their description, and possible values, run the following command:

=== "EVM-compatible Appchain"

    ```bash
    /var/lib/appchain-data/container-chain-template-frontier-node --help
    ```

=== "Simple Substrate Appchain"

    ```bash
    /var/lib/appchain-data/container-chain-template-simple-node --help
    ```

### Full Node Configuration Example for the Demo EVM Appchain {: #example-demo-evm-appchain}

The following example is a fully functional full-node configuration for the [demo EVM Appchain](/builders/tanssi-network/networks/dancebox/demo-evm-containerchain/){target=\_blank} deployed on Dancebox with an ID of `3001`. 

The raw chain specification file for the demo Appchain is required to run the node, and can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Tanssi/Demo-EVM-Appchain/){target=\_blank}. Download the file and place it in the `/var/lib/appchain-data/` directory.

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
ExecStart=/var/lib/appchain-data/container-chain-template-frontier-node \
--chain=/var/lib/appchain-data/container-3001-raw-specs.json \
--state-pruning=archive \
--blocks-pruning=archive \
--base-path=/var/lib/appchain-data \
--rpc-port=9944 \
--name=para \
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

--8<-- 'code/node-operators/appchain-node/rpc-systemd/terminal/check-status.md'

And check the logs, if needed, with the following command:

```bash
journalctl -f -u appchain.service
```
