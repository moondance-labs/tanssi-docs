---
title: Run a Tanssi Sequencer
description: Learn how to set up and run a sequencer (block producer) node for Tanssi networks using Systemd, allowing you to participate in the protocol and earn rewards.
icon: simple-linux
---

# Run a Sequencer Node Using Systemd

## Introduction {: #introduction }

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/intro.md'

In this guide, you'll learn how to spin up a Tanssi sequencer to be part of the shared pool of sequencers using the latest stable binary file release and managing the service with [Systemd](https://systemd.io){target=\_blank} on Linux systems.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS and root privileges. You will also need:

- **Node binary file** - the instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable `tanssi-node` release. However, you can build your own file compiling the [source code](https://github.com/moondance-labs/tanssi){target=\_blank}
- **Tanssi chain specifications file** - the Tanssi chain specification file can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Tanssi/Dancelight){target=\_blank}

## Download the Latest Release {: #download-latest-release }

To get started, download and make executable the latest binary release by running the following command:

--8<-- 'text/node-operators/optimized-binaries-note.md'

=== "Generic"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.para_client_version }}/tanssi-node && \
    chmod +x ./tanssi-node
    ```

=== "Intel Skylake"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.para_client_version }}/tanssi-node-skylake -O tanssi-node && \
    chmod +x ./tanssi-node
    ```

=== "AMD Zen3"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.para_client_version }}/tanssi-node-znver3 -O tanssi-node && \
    chmod +x ./tanssi-node
    ```

## Download the Tanssi Chain Specs File {: #download-tanssi-specs }

The node binary file includes the necessary code to run a Tanssi chain node. When launching your network's node, it will also be required to provide the chain's specification file as a parameter.

Download the relay chain specification file by executing the following:

```bash
wget https://raw.githubusercontent.com/papermoonio/external-files/main/Tanssi/Dancelight/dancelight-raw-specs.json
```

## Setup the Systemd Service {: #setup-systemd-service }

[Systemd](https://systemd.io){target=\_blank} is a management system for Linux systems that manages services (daemons in Unix-like systems jargon), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures.

The following commands configure a new account, the directory, and move the previously downloaded files to the right location.

Create a new account to run the service:

```bash
adduser tanssi_service --system --no-create-home
```

Create a directory to store the required files and data:

```bash
mkdir /var/lib/tanssi-data
```

Set the folder's ownership to the account that will run the service to ensure writing permission:

```bash
sudo chown -R tanssi_service /var/lib/tanssi-data
```

Move the chain specification file to the folder:

```bash
mv ./relay-raw-no-bootnodes-specs.json /var/lib/tanssi-data
```

And finally, move the binary to the folder:

```bash
mv ./tanssi-node /var/lib/tanssi-data
```

### Generate the Node Key {: #generate-node-key }

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-intro.md'

```bash
/var/lib/tanssi-data/tanssi-node key generate-node-key --file /var/lib/tanssi-data/node-key
```

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

### Create the Systemd Service Configuration File {: #create-systemd-configuration }

The next step is to create the Systemd configuration file.

You can create the file by running the following command:

```bash
sudo touch /etc/systemd/system/tanssi.service
```

Now you can open the file using your favorite text editor (vim, emacs, nano, etc) and add the configuration for the service, replacing the `INSERT_YOUR_TANSSI_NODE_NAME` and `INSERT_YOUR_SEQUENCER_NODE_NAME` tags with a human-readable text in the `--name` flags. These names will come in handy for connecting the log entries and metrics with the node that generates them.

```bash
[Unit]
Description="Tanssi systemd service"
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=tanssi_service
SyslogIdentifier=tanssi
SyslogFacility=local7
KillSignal=SIGHUP
ExecStart=/var/lib/tanssi-data/tanssi-node solo-chain \
--name=INSERT_YOUR_SEQUENCER_NODE_NAME \
--base-path=/var/lib/tanssi-data/container \
--node-key-file=/var/lib/tanssi-data/node-key \
--keystore-path=/var/lib/tanssi-data/session \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
--pool-type=fork-aware \
--database=paritydb \
--rpc-port=9944 \
--rpc-cors=all \
--rpc-max-connections 100 \
--unsafe-rpc-external \
--rpc-methods=unsafe \
--prometheus-port=9615 \
--prometheus-external \
--listen-addr=/ip4/0.0.0.0/tcp/30333 \
--state-pruning=2000 \
--blocks-pruning=2000 \
--db-cache=1024 \
--trie-cache-size=1073741824 \
--collator \
--in-peers=100 \
--detailed-log-output \
-- \
--chain=/var/lib/tanssi-data/relay-raw-no-bootnodes-specs.json \
--name=INSERT_YOUR_TANSSI_NODE_NAME \
--sync=fast \
--base-path=/var/lib/tanssi-data/relay \      
--node-key-file=/var/lib/tanssi-data/node-key \
--database=paritydb \
--rpc-port=9945 \
--rpc-cors=all \
--rpc-methods=safe \
--unsafe-rpc-external \
--prometheus-port=9616 \
--prometheus-external \
--listen-addr=/ip4/0.0.0.0/tcp/30334 \
--pool-limit=0 \
--db-cache=128 \
--out-peers=15 \
--state-pruning=2000 \
--blocks-pruning=2000 \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
--bootnodes=/dns4/qco-dancelight-boot-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWCekAqk5hv2fZprhqVz8povpUKdJEiHSd3MALVDWNPFzY \
--bootnodes=/dns4/qco-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWEwhUb3tVR5VhRBEqyH7S5hMpFoGJ9Anf31hGw7gpqoQY \
--bootnodes=/dns4/ukl-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWPbVtdaGhcuDTTQ8giTUtGTEcUVWRg8SDWGdJEeYeyZcT

[Install]
WantedBy=multi-user.target
```

### Run Flags {: #run-flags }

The flags used in the ExecStart command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

```bash
/var/lib/tanssi-data/tanssi-node  --help
```

## Run the Service {: #run-the-service }

Finally, enable the service and start it for the first time:

```bash
systemctl enable tanssi.service && \
systemctl start tanssi.service
```

You can verify that the service is up and running correctly running:

```bash
systemctl status tanssi.service
```

--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

And check the logs, if needed, with the following command:

```bash
journalctl -f -u tanssi.service
```
