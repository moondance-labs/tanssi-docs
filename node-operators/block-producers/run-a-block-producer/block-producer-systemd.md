---
title: Run a Tanssi Block Producer
description: Learn how to set up and run block producers (collators) for Tanssi Appchains using Systemd, allowing you to participate in the protocol and earn rewards.
---

# Run a Block Producer Node Using Systemd

## Introduction {: #introduction }

The Tanssi protocol manages a set of block producers (aka sequencers or collators). It assigns them to provide block production services to all the active Appchains in the Tanssi ecosystem and the Tanssi orchestrator itself.

The assignment algorithm distributes the available block producers on a per-session basis, assigning them to a random Appchain each time, meaning that they would be producing blocks for the same Appchain only for a relatively short period of time, increasing the overall security of the ecosystem.

Since the block producers will be assigned to serve any Appchain (or the Tanssi orchestrator), the nodes must be run using the Tanssi node binary file, which includes the logic to sync and execute transactions, producing blocks for any active Appchain previously unknown to him.

In this guide, you'll learn how to spin up a Tanssi block producer to be part of the shared pool of sequencers using the latest stable binary file release and managing the service with [Systemd](https://systemd.io/){target=\_blank} on Linux systems.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS and root privileges. You will also need:

- **Node binary file** - the instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable `tanssi-node` release. If you want to build and run your own file, make sure to meet the prerequisites for [building your Appchain node](/builders/build/customize/prerequisites){target=\_blank}

- **Tanssi orchestrator specifications file** - the Tanssi orchestrator specification file is needed to run the node. You can download it from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Tanssi/Dancebox/){target=\_blank}

- **Relay chain specifications file** - the relay chain specification file can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Moonbeam/Moonbase-Alpha/){target=\_blank}

## Download the Latest Release {: #download-latest-release }

To get started, download and make executable the latest binary release by running the following command:

```bash
wget https://github.com/moondance-labs/tanssi/releases/latest/download/tanssi-node && \
chmod +x ./tanssi-node
```

!!! note
    Optimized binary versions for [Skylake](https://www.intel.com/content/www/us/en/products/platforms/details/skylake-u-y.html){target=\_blank} and [Zen3](https://www.amd.com/en/technologies/zen-core){target=\_blank} architectures are also available in the [releases](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} page.

## Download the Tanssi Orchestrator Specs File {: #download-relay-specs }

The downloaded node binary file includes the Tanssi protocol logic that allows the block producer to rotate, sync, and produce blocks for any chain within the Tanssi ecosystem. When launching your Block producer's node, it iwill be required to provide the Tanssi's specification file as a parameter. 

Download the specification file executing:

```bash
wget https://raw.githubusercontent.com/papermoonio/external-files/main/Tanssi/Dancebox/dancebox-raw-specs.json
```

## Download the Relay Chain Specs File {: #download-relay-specs }

The node binary file includes also the necessary code to run a relay chain node. When launching your Block Producer's node, it will also be required to provide the relay chain's specification file as a parameter. 

Download the relay chain specification file executing:

```bash
wget https://raw.githubusercontent.com/papermoonio/external-files/main/Moonbeam/Moonbase-Alpha/westend-alphanet-raw-specs.json
```

## Setup the Systemd Service {: #setup-systemd-service }

[Systemd](https://systemd.io/){target=\_blank} is a management system for Linux systems that manages services (daemons in Unix-like systems jargon), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures.

The following commands configure a new account, the directory, and move the previously downloaded files to the right location.

Create a new account to run the service:

```bash
adduser sequencer_service --system --no-create-home
```

Create a directory to store the required files and data:

```bash
mkdir /var/lib/sequencer-data
```

Set the folder's ownership to the account that will run the service to ensure writing permission:

```bash
sudo chown -R sequencer_service /var/lib/sequencer-data
```

And finally, move the binary and the chain specs to the folder:

```bash
mv ./tanssi-node /var/lib/sequencer-data && \
mv ./westend-alphanet-raw-specs.json /var/lib/sequencer-data && \
mv ./dancebox-raw-specs.json /var/lib/sequencer-data
```

### Create the Systemd Service configuration file {: #create-systemd-configuration }

The next step is to create the Systemd configuration file. 

You can create the file by running the following command:

```bash
sudo touch /etc/systemd/system/sequencer.service
```

Now you can open the file using your favorite text editor (vim, emacs, nano, etc) and add the configuration for the service:

```bash
[Unit]
Description="Sequencer systemd service"
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=sequencer_node_service
SyslogIdentifier=sequencer
SyslogFacility=local7
KillSignal=SIGHUP
ExecStart=/var/lib/sequencer-data/tanssi-node \
--chain=/var/lib/sequencer-data/dancebox-raw-specs.json \
--rpc-port=9944 \
--name=sequencer-name \
--base-path=/var/lib/sequencer-data/para \
--state-pruning=2000 \
--blocks-pruning=2000 \
--collator \
-- \
--rpc-port=9946 \
--name=sequencer-name-container \
--base-path=/var/lib/sequencer-data/container \
-- \
--name=sequencer-name-relay \
--chain=/var/lib/sequencer-data/westend-raw-specs.json \
--rpc-port=9945 \
--sync=fast \
--base-path=/data/relay \
--state-pruning=2000 \
--blocks-pruning=2000 \

[Install]
WantedBy=multi-user.target
```
### Run Flags {: #run-flags }

The flags used in the ExecStart command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/appchain-node/run-flags.md'

```bash
/var/lib/sequencer-data/tanssi-node  --help
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
systemctl enable sequencer.service && \
systemctl start sequencer.service
```

You can verify that the service is up and running correctly running:

```bash
systemctl status sequencer.service
```

--8<-- 'code/node-operators/appchain-node/rpc-systemd/terminal/check-status.md'

And check the logs, if needed, with the following command:

```bash
journalctl -f -u sequencer.service
```
