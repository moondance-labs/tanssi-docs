---
title: Run a Tanssi Block Producer
description: Learn how to set up and run block producers (collators) for Tanssi Appchains using Systemd, allowing you to participate in the protocol and earn rewards.
---

# Run a Block Producer Node Using Systemd

## Introduction {: #introduction }

--8<-- 'text/node-operators/block-producers/onboarding/run-a-block-producer/intro.md'

In this guide, you'll learn how to spin up a Tanssi block producer to be part of the shared pool of sequencers using the latest stable binary file release and managing the service with [Systemd](https://systemd.io/){target=\_blank} on Linux systems.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS and root privileges. You will also need:

- **Node binary file** - the instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable `tanssi-node` release. However, you can build your own file compiling the [source code](https://github.com/moondance-labs/tanssi){target=\_blank}

- **Tanssi orchestrator specifications file** - the Tanssi orchestrator specifications file is needed to run the block producer. You can download it from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Tanssi/Dancebox/){target=\_blank}

- **Relay chain specifications file** - the relay chain specification file can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Moonbeam/Moonbase-Alpha/){target=\_blank}

## Download the Latest Release {: #download-latest-release }

To get started, download and make executable the latest binary release by running the following command:

--8<-- 'text/node-operators/optimized-binaries-note.md'

=== "Generic"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-node && \
    chmod +x ./tanssi-node
    ```

=== "Intel Skylake"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-node-skylake && \
    mv ./tanssi-node-skylake ./tanssi-node && \
    chmod +x ./tanssi-node
    ```

=== "AMD Zen3"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-node-zen3 && \
    mv ./tanssi-node-zen3 ./tanssi-node && \
    chmod +x ./tanssi-node
    ```

## Download the Tanssi Orchestrator Specs File {: #download-relay-specs }

The downloaded node binary file includes the Tanssi protocol logic that allows the block producer to rotate to, sync with, and produce blocks for any chain within the Tanssi ecosystem. When launching your Block producer's node, it will be required to provide the Tanssi's specification file as a parameter. 

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

And finally, move the binary and the chain specs to the folder:

```bash
mv ./tanssi-node /var/lib/tanssi-data && \
mv ./westend-alphanet-raw-specs.json /var/lib/tanssi-data && \
mv ./dancebox-raw-specs.json /var/lib/tanssi-data
```

### Create the Systemd Service Configuration File {: #create-systemd-configuration }

The next step is to create the Systemd configuration file.

You can create the file by running the following command:

```bash
sudo touch /etc/systemd/system/tanssi.service
```

Now you can open the file using your favorite text editor (vim, emacs, nano, etc) and add the configuration for the service, replacing the `INSERT_YOUR_TANSSI_NODE_NAME` and `INSERT_YOUR_RELAY_NODE_NAME` tags with a human-readable text in the `--name` flags. These names will come in handy for connecting the log entries and metrics with the node that generates them.

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
ExecStart=/var/lib/tanssi-data/tanssi-node \
--chain=/var/lib/tanssi-data/dancebox-raw-specs.json \
--name=INSERT_YOUR_TANSSI_NODE_NAME \
--base-path=/var/lib/tanssi-data/para \
--state-pruning=2000 \
--blocks-pruning=2000 \
--collator \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
--database paritydb \
-- \
--name=tanssi-appchain \
--base-path=/var/lib/tanssi-data/container \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
-- \
--name=INSERT_YOUR_RELAY_NODE_NAME \
--chain=/var/lib/tanssi-data/westend-alphanet-raw-specs.json \
--sync=fast \
--base-path=/var/lib/tanssi-data/relay \
--state-pruning=2000 \
--blocks-pruning=2000 \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
--database paritydb \

[Install]
WantedBy=multi-user.target
```

### Run Flags {: #run-flags }

The flags used in the ExecStart command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/appchain-node/run-flags.md'

```bash
/var/lib/sequencer-data/tanssi-node  --help
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

--8<-- 'code/node-operators/appchain-node/rpc-systemd/terminal/check-status.md'

And check the logs, if needed, with the following command:

```bash
journalctl -f -u tanssi.service
```
