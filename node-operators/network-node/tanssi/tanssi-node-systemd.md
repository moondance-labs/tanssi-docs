---
title: Run a Tanssi Node Using Systemd
description: Learn how to set up and run a Node for Tanssi networks using Systemd, allowing you to provide API endpoints for applications and users.
icon: simple-linux
---

# Run a Tanssi Node Using Systemd

## Introduction {: #introduction }

In this guide, you'll learn how to spin up a Tanssi Node using the latest stable binary file release and manage the service using [Systemd](https://systemd.io){target=\_blank} on Linux systems. Nodes provide essential API endpoints for applications and users to interact with the Tanssi network.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS with [Landlock](https://docs.kernel.org/security/landlock.html){target=\_blank} enabled and root privileges. You will also need:

- **Node binary files** - an Node requires three binary files: `tanssi-relay`, `tanssi-relay-execute-worker`, and `tanssi-relay-prepare-worker`.

The instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} official stable release. However, you can build your own file compiling the [source code](https://github.com/moondance-labs/tanssi){target=\_blank}.

## Check Landlock Support {: #check-landlock }

Tanssi nodes use the Linux kernel's Landlock feature as a security measure to restrict its own access to system resources, limiting the damage if the application is compromised.

Check the Landlock feature support in your system running the following command:

```bash
sudo dmesg | grep landlock || journalctl -kg landlock
```

The output should look like:

--8<-- 'code/node-operators/terminal/check-landlock.md'

If Landlock is disabled in your system, upgrade the kernel to version 5.13 or above.

## Download the Latest Release {: #download-latest-release }

To get started, download the latest binary release and make it executable by running the following command:

--8<-- 'text/node-operators/optimized-binaries-note.md'

=== "Dancelight"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-execute-worker && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ networks.dancebox.client_version }}/tanssi-relay-prepare-worker && \
    chmod +x ./tanssi-relay*
    ```

## Set Up the Systemd Service {: #set-up-systemd-service }

[Systemd](https://systemd.io){target=\_blank} is a management system for Linux systems that manages services (daemons in Unix-like systems jargon), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures.

The following commands configure a new account, create the directory, and move the previously downloaded files to the right location.

1. Create a new account to run the service:

```bash
adduser tanssi_service --system --no-create-home
```

2. Create a directory to store the required files and data:

=== "Dancelight"

    ```bash
    mkdir /var/lib/dancelight-data
    ```

3. Set the folder's ownership to the account that will run the service to ensure writing permission:

=== "Dancelight"

    ```bash
    chown -R tanssi_service /var/lib/dancelight-data
    ```

4. Move the binaries to the folder:

=== "Dancelight"

    ```bash
    mv ./tanssi-relay* /var/lib/dacelight-data
    ```

### Generate the Node Key {: #generate-node-key }

To generate and store on disk the session keys that will be referenced on the start-up command, run the following command:

=== "Dancelight"

    ```bash
    /var/lib/dancelight-data/tanssi-relay key generate-node-key --file /var/lib/dancelight-data/node-key
    ```

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

### Create the Systemd Service Configuration File {: #create-systemd-configuration }

The next step is to create the Systemd configuration file.

You can create the file by running the following command:

```bash
sudo touch /etc/systemd/system/tanssi.service
```

Now you can open the file using your favorite text editor (vim, emacs, nano, etc) and add the configuration for the service, replacing the `INSERT_YOUR_TANSSI_NODE_NAME` tag with a human-readable name and `YOUR_IP_ADDRESS` with your public IP address. The name will come in handy for connecting the log entries and metrics with the node that generates them.

=== "Dancelight"

    ```bash
    [Unit]
    Description="Tanssi Node systemd service"
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
    ExecStart=/var/lib/dancelight-data/tanssi-relay --chain=dancelight \
    --base-path=/var/lib/tanssi-data/ \
    --node-key-file /var/lib/dancelight-data/node-key \
    --rpc-port=9944 \
    --prometheus-port=9615 \
    --prometheus-external \
    --name=INSERT_YOUR_TANSSI_NODE_NAME \
    --listen-addr=/ip4/0.0.0.0/tcp/30333 \
    --public-addr=/ip4/YOUR_IP_ADDRESS/tcp/30333 \
    --state-pruning=archive \
    --blocks-pruning=archive \
    --database=paritydb \
    --unsafe-rpc-external \
    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0'

    [Install]
    WantedBy=multi-user.target
    ```

### Run Flags {: #run-flags }

The flags used in the `ExecStart` command can be adjusted according to your preferences and hardware configuration. The following ones are some of the most note-worthy:

- `--state-pruning=archive` - Keeps all state data, which is necessary for historical state queries
- `--blocks-pruning=archive` - Keeps all blocks, necessary for historical block data
- `--database=paritydb` - Uses ParityDB as the database backend, which is optimized for RPC node performance
- `--unsafe-rpc-external` - Allows external connections to the RPC server. This is required for the node to be accessible externally, but exposing RPC endpoints carries security risks. Ensure appropriate firewall and security measures are in place (see warning below).

!!! warning
    The `--unsafe-rpc-external` flag opens your RPC node to external connections. In production environments, you should implement additional security measures like a reverse proxy with rate limiting and authentication.

You can view all available flags by running:

```bash
/var/lib/dancelight-data/tanssi-relay --help
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

## Testing Your Node {: #testing-your-rpc-node }

After your node is fully synced, you can verify that the RPC endpoint is working correctly by making a simple request. You can use curl to test the connection:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method":"chain_getHeader", "params":[]}' http://localhost:9944
```

If the RPC endpoint is working correctly, you should receive a JSON response containing the latest block header information.
