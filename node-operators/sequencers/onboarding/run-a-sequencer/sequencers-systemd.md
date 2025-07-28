---
title: Run a Tanssi Sequencer
description: Learn how to set up and run a sequencer (block producer) node for Tanssi networks using Systemd, allowing you to participate in the protocol and earn rewards.
icon: simple-linux
categories: Sequencers
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

=== "Tanssi MainNet"

    === "Generic"

        ```bash
        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node && \
        chmod +x ./tanssi-node
        ```

    === "Intel Skylake"

        ```bash
        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-skylake -O tanssi-node && \
        chmod +x ./tanssi-node
        ```

    === "AMD Zen3"

        ```bash
        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-znver3 -O tanssi-node && \
        chmod +x ./tanssi-node
        ```
    
=== "Dancelight TestNet"
    
    === "Generic"

        ```bash
        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node && \
        chmod +x ./tanssi-node
        ```

    === "Intel Skylake"

        ```bash
        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-skylake -O tanssi-node && \
        chmod +x ./tanssi-node
        ```

    === "AMD Zen3"

        ```bash
        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-znver3 -O tanssi-node && \
        chmod +x ./tanssi-node
        ```

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/download-specs.md'

--8<-- 'text/node-operators/appchains-systemd-data-directory.md'

And finally, move the binary to the folder:

=== "Tanssi MainNet"

    ```bash
    mv ./tanssi-node /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"

    ```bash
    mv ./tanssi-node /var/lib/dancelight-data
    ```

### Generate the Node Key {: #generate-node-key }

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-intro.md'


=== "Tanssi MainNet"

    ```bash
    /var/lib/tanssi-data/tanssi-node key generate-node-key --file /var/lib/tanssi-data/node-key
    ```

=== "Dancelight TestNet"

    ```bash
    /var/lib/dancelight-data/tanssi-node key generate-node-key --file /var/lib/dancelight-data/node-key
    ```

--8<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

### Create the Systemd Service Configuration File {: #create-systemd-configuration }

The next step is to create the Systemd configuration file.

You can create the file by running the following command:

=== "Tanssi MainNet"

    ```bash
    sudo touch /etc/systemd/system/tanssi.service
    ```

=== "Dancelight TestNet"

    ```bash
    sudo touch /etc/systemd/system/dancelight.service
    ```

Now you can open the file using your favorite text editor (vim, emacs, nano, etc) and add the configuration for the service, replacing the `INSERT_YOUR_TANSSI_NODE_NAME` and `INSERT_YOUR_SEQUENCER_NODE_NAME` tags with a human-readable text in the `--name` flags. These names will come in handy for connecting the log entries and metrics with the node that generates them.

=== "Tanssi MainNet"

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
    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
    --pool-type=fork-aware \
    --database=paritydb \
    --rpc-port=9944 \
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
    --chain=/var/lib/tanssi-data/starlight-raw-specs.json \
    --name=INSERT_YOUR_TANSSI_NODE_NAME \
    --sync=fast \
    --base-path=/var/lib/tanssi-data/relay \
    --node-key-file=/var/lib/tanssi-data/node-key \
    --keystore-path=/var/lib/tanssi-data/session \
    --database=paritydb \
    --rpc-port=9945 \
    --prometheus-port=9616 \
    --prometheus-external \
    --listen-addr=/ip4/0.0.0.0/tcp/30334 \
    --pool-limit=0 \
    --db-cache=128 \
    --out-peers=15 \
    --state-pruning=2000 \
    --blocks-pruning=2000 \
    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
    --bootnodes=/dns4/deo-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWNQ1cddxwvnZZUBG2gtByn9hirVGEn2yR37ztnGSi1VHu \
    --bootnodes=/dns4/fro-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWS3kv4PyNTxKS8CBxZsVrhMcNcXgxqVUHLrXixuz4DaSR \
    --bootnodes=/dns4/qcl-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWFDUJ1QZn18tmeJJZU4e6JbyQrLiAp4Xz7ongKzoSjadg \
    --bootnodes=/dns4/qco-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWBzJzAdAKNVXcsvfL3nHH8BSocNvxz7A8PkRAAJhTuQNm \
    --bootnodes=/dns4/uko-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWAexWR4uyhVPyxqPBNhhepJ5jRqUa885mu5dKPPVHSfpC

    [Install]
    WantedBy=multi-user.target
    ```

=== "Dancelight TestNet"

    ```bash
    [Unit]
    Description="Dancelight systemd service"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    Restart=on-failure
    RestartSec=10
    User=dancelight_service
    SyslogIdentifier=dancelight
    SyslogFacility=local7
    KillSignal=SIGHUP
    ExecStart=/var/lib/dancelight-data/tanssi-node solo-chain \
    --name=INSERT_YOUR_SEQUENCER_NODE_NAME \
    --base-path=/var/lib/dancelight-data/container \
    --node-key-file=/var/lib/dancelight-data/node-key \
    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
    --pool-type=fork-aware \
    --database=paritydb \
    --rpc-port=9944 \
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
    --chain=/var/lib/dancelight-data/dancelight-raw-specs.json \
    --name=INSERT_YOUR_TANSSI_NODE_NAME \
    --sync=fast \
    --base-path=/var/lib/dancelight-data/relay \
    --node-key-file=/var/lib/dancelight-data/node-key \
    --keystore-path=/var/lib/dancelight-data/session \
    --database=paritydb \
    --rpc-port=9945 \
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

=== "Tanssi MainNet"

    ```bash
    /var/lib/tanssi-data/tanssi-node  --help
    ```

=== "Dancelight TestNet"

    ```bash
    /var/lib/dancelight-data/tanssi-node  --help
    ```

## Run the Service {: #run-the-service }

Finally, enable the service and start it for the first time:

=== "Tanssi MainNet"

    ```bash
    systemctl enable tanssi.service && \
    systemctl start tanssi.service
    ```

=== "Dancelight TestNet"

    ```bash
    systemctl enable dancelight.service && \
    systemctl start dancelight.service
    ```

You can verify that the service is up and running correctly running:

=== "Tanssi MainNet"

    ```bash
    systemctl status tanssi.service
    ```

=== "Dancelight TestNet"

    ```bash
    systemctl status dancelight.service
    ```

--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

And check the logs, if needed, with the following command:

=== "Tanssi MainNet"

    ```bash
    journalctl -f -u tanssi.service
    ```

=== "Dancelight TestNet"

    ```bash
    journalctl -f -u dancelight.service
    ```
