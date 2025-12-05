---
title: Executar um Sequenciador com Systemd
description: Saiba como configurar e executar um nó de sequenciador (produtor de blocos) para as redes Tanssi usando Systemd, permitindo que você participe do protocolo e ganhe recompensas.
icon: simple-linux
categories: Sequencers
---

# Executar um Nó de Sequenciador com Systemd

## Introdução {: #introduction }

--8<-- 'text/pt/node-operators/sequencers/onboarding/run-a-sequencer/intro.md'

Neste guia, você aprenderá como iniciar um sequenciador Tanssi para fazer parte do pool compartilhado de sequenciadores usando o binário estável mais recente e gerenciando o serviço com [Systemd](https://systemd.io){target=\_blank} em sistemas Linux.

O artigo segue a boa prática de executar o serviço com uma conta não root e conceder a essa conta acesso de escrita a um diretório específico. Você pode adaptar as etapas e instruções deste artigo à configuração da sua infraestrutura, preferências e políticas de segurança.

## Verificando os Pré-requisitos {: #checking-prerequisites }

Para começar, você precisará de um computador executando Ubuntu Linux com privilégios de root. Você também precisará de:

- **Arquivo binário do nó** - as instruções neste guia executam a versão estável [mais recente](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank} oficial do `tanssi-node`. No entanto, você pode compilar seu próprio arquivo a partir do [código-fonte](https://github.com/moondance-labs/tanssi){target=\_blank}
- **Arquivo de especificação da rede Tanssi** - o arquivo de especificação pode ser baixado deste [repositório público do GitHub](https://github.com/papermoonio/external-files/blob/main/Tanssi/Dancelight){target=\_blank}

## Baixar a Última Versão {: #download-latest-release }

Para começar, faça o download e torne executável a versão mais recente do binário executando o seguinte comando:

--8<-- 'text/pt/node-operators/optimized-binaries-note.md'

=== "Tanssi MainNet"

    === "Genérico"

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
    
    === "Genérico"

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

--8<-- 'text/pt/node-operators/sequencers/onboarding/run-a-sequencer/download-specs.md'

--8<-- 'text/pt/node-operators/appchains-systemd-data-directory.md'

Por fim, mova o binário para a pasta:

=== "Tanssi MainNet"

    ```bash
    mv ./tanssi-node /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"

    ```bash
    mv ./tanssi-node /var/lib/dancelight-data
    ```

### Gerar a Chave do Nó {: #generate-node-key }

--8<-- 'text/pt/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-intro.md'

=== "Tanssi MainNet"

    ```bash
    /var/lib/tanssi-data/tanssi-node key generate-node-key --file /var/lib/tanssi-data/node-key
    ```

=== "Dancelight TestNet"

    ```bash
    /var/lib/dancelight-data/tanssi-node key generate-node-key --file /var/lib/dancelight-data/node-key
    ```

--8<-- 'text/pt/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

### Criar o Arquivo de Configuração do Systemd {: #create-systemd-configuration }

O próximo passo é criar o arquivo de configuração do Systemd.

Você pode criar o arquivo executando o comando:

=== "Tanssi MainNet"

    ```bash
    sudo touch /etc/systemd/system/tanssi.service
    ```

=== "Dancelight TestNet"

    ```bash
    sudo touch /etc/systemd/system/dancelight.service
    ```

Agora abra o arquivo com seu editor de texto favorito (vim, emacs, nano etc.) e adicione a configuração do serviço, substituindo as tags `INSERT_YOUR_TANSSI_NODE_NAME` e `INSERT_YOUR_SEQUENCER_NODE_NAME` por nomes legíveis nos flags `--name`. Esses nomes ajudam a conectar entradas de log e métricas ao nó que as gera.

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

### Flags de Execução {: #run-flags }

Os flags usados no comando `ExecStart` podem ser ajustados conforme suas preferências e configuração de hardware. Alguns dos mais importantes são:

--8<-- 'text/pt/node-operators/network-node/run-flags.md'

=== "Tanssi MainNet"

    ```bash
    /var/lib/tanssi-data/tanssi-node  --help
    ```

=== "Dancelight TestNet"

    ```bash
    /var/lib/dancelight-data/tanssi-node  --help
    ```

## Executar o Serviço {: #run-the-service }

Por fim, habilite o serviço e inicie-o pela primeira vez:

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

Você pode verificar se o serviço está em execução corretamente:

=== "Tanssi MainNet"

    ```bash
    systemctl status tanssi.service
    ```

=== "Dancelight TestNet"

    ```bash
    systemctl status dancelight.service
    ```

--8<-- 'tanssi-docs/.snippets/code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

Se precisar verificar os logs, use:

=== "Tanssi MainNet"

    ```bash
    journalctl -f -u tanssi.service
    ```

=== "Dancelight TestNet"

    ```bash
    journalctl -f -u dancelight.service
    ```
