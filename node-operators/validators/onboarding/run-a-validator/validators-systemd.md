---
title: Run a Tanssi Validator
description: Learn how to set up and run a validator (operator) node for Tanssi networks using Systemd, allowing you to participate in the protocol and earn rewards.
icon: simple-linux
---

# Run a Validator Node Using Systemd

## Introduction {: #introduction }

--8<-- 'text/node-operators/validators/onboarding/run-a-validator/intro.md'

In this guide, you'll learn how to spin up a Tanssi validator using the latest stable binary file release and manage the service using [Systemd](https://systemd.io){target=\_blank} on Linux systems.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS with Landlock enabled and root privileges. You will also need:

- **Node binary files** - a validatos requires three binary files `tanssi-relay`, `tanssi-relay-execute-worker`, and `tanssi-relay-prepare-worker`.

The instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable release. However, you can build your own file compiling the [source code](https://github.com/moondance-labs/tanssi){target=\_blank}.

## Check Landlock Support {: #check-landlock }

Tanssi validators use the Linux kernel's landlock feature as a security measure to restrict its own access to system resources, limiting the damage a compromise in the application can cause.
Check the landlock feature support in your system running the following command:

```bash
sudo dmesg | grep landlock || journalctl -kg landlock
```

The output should look like:

--8<-- 'code/node-operators/terminal/check-landlock.md'

If landlock is disabled in your system, upgrade the kernel to version 5.13 or above.

## Download the Latest Release {: #download-latest-release }

To get started, download and make executable the latest binary release by running the following command:

--8<-- 'text/node-operators/optimized-binaries-note.md'

=== "Generic"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-execute-worker && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-prepare-worker && \
    chmod +x ./tanssi-relay*
    ```

=== "Intel Skylake"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-skylake -O tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-execute-worker-skylake -O tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-prepare-worker-skylake -O tanssi-relay && \
    chmod +x ./tanssi-relay*
    ```

=== "AMD Zen3"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-znver3 -O tanssi-node && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-execute-worker-znver3 -O tanssi-node && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-prepare-worker-znver3 -O tanssi-node && \
    chmod +x ./tanssi-relay*
    ```

## Setup the Systemd Service {: #setup-systemd-service }

[Systemd](https://systemd.io){target=\_blank} is a management system for Linux systems that manages services (daemons in Unix-like systems jargon), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures.

The following commands configure a new account, create the directory, and move the previously downloaded files to the right location.

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
chown -R tanssi_service /var/lib/tanssi-data
```

And finally, move the binaries to the folder:

```bash
mv ./tanssi-relay* /var/lib/tanssi-data
```

### Generate the Node Key {: #generate-node-key }

To generate and store on disk the session keys that will be referenced on the start-up command, run the following command:

```bash
/var/lib/tanssi-data/tanssi-relay key generate-node-key --file /var/lib/tanssi-data/node-key
```

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

### Create the Systemd Service Configuration File {: #create-systemd-configuration }

The next step is to create the Systemd configuration file.

You can create the file by running the following command:

```bash
sudo touch /etc/systemd/system/tanssi.service
```

Now you can open the file using your favorite text editor (vim, emacs, nano, etc) and add the configuration for the service, replacing the `INSERT_YOUR_TANSSI_NODE_NAME` tag with a human-readable text and `YOUR_IP_ADDRESS` with your public IP address. The name will come in handy for connecting the log entries and metrics with the node that generates them.

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
  --base-path=/var/lib/tanssi-data/ \
  --node-key-file /var/lib/tanssi-data/node-key \
  --database=paritydb \
  --rpc-port=9944 \
  --prometheus-port=9615 \
  --prometheus-external \
  --name=INSERT_YOUR_TANSSI_NODE_NAME \
  --listen-addr=/ip4/0.0.0.0/tcp/30333 \
  --public-addr=/ip4/YOUR_IP_ADDRESS/tcp/30333 \
  --state-pruning=archive \
  --blocks-pruning=archive \
  --rpc-cors=all \
  --rpc-methods=safe \
  --unsafe-rpc-external \
  --rpc-max-connections=100 \
  --validator

[Install]
WantedBy=multi-user.target
```

### Run Flags {: #run-flags }

The flags used in the ExecStart command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

--8<-- 'text/node-operators/network-node/run-flags.md'

```bash
/var/lib/tanssi-data/tanssi-relay  --help
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

Check the logs, if needed, with the following command:

```bash
journalctl -f -u tanssi.service
```
