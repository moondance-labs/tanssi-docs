---
title: Run an Appchain Node Using Systemd
description: Learn how to set up and run a Tanssi-powered appchain node using Systemd, which allows you to have your own RPC endpoint to interact with your appchain.
icon: simple-linux
categories: RPC-Data-Preservers
---

## { "source_path": "node-operators/network-node/tanssi-powered-network/rpc-systemd.md", "source_language": "EN", "target_language": "PT", "checksum": "b52d97563db4d36345e1a75140c9eacdf7ae13645eaf15248fef324a8857a7e3", "content": "--- title: Run an Appchain Node Using Systemd description: Learn how to set up and run a Tanssi-powered appchain node using Systemd, which allows you to have your own RPC endpoint to interact with your appchain. icon: simple-linux categories: RPC-Data-Preservers

# Run an Appchain Node Using Systemd

## Introduction {: #introduction }

--8\<-- 'text/node-operators/network-node/intro.md'

In this guide, you'll learn how to spin up a Tanssi appchain node using a binary executable file and manage the service with [Systemd](https://systemd.io){target=\\\_blank} on Linux systems.

The article follows the good practice of running the service with its own non-root account and granting that account write access to a specific directory. However, you can adapt this article's steps and instructions to your infrastructure configuration, preferences, and security policies.

!!! note
It is not possible to run an RPC node for quick Trial appchains as they run on a private network, and their nodes are, therefore, unreachable for syncing.

## Checking Prerequisites {: #checking-prerequisites }

To get started, you'll need access to a computer running an Ubuntu Linux OS and root privileges. You will also need:

- **Node binary file** - the instructions in this guide execute the [latest](https://github.com/moondance-labs/tanssi/releases/latest){target=\\\_blank} official stable node release. If you want to build and run your own file, make sure to follow the instructions for [building your appchain node](/builders/build/customize/prerequisites/){target=\\\_blank}.

  ```bash
  ```

- **Chain specifications files** - the node needs information about two different blockchains to sync and run correctly. The following section will show you how to get those files.

  ```


    ```bash

````
    ```

````

=== "EVM-Compatible Network"
    ```bash

````
    ```

wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/container-chain-frontier-node && \\
chmod +x ./container-chain-frontier-node

```
````

=== "Substrate Network"

````
```bash

wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/container-chain-simple-node && \\
chmod +x ./container-chain-simple-node

        ```bash

        ```

````

--8\<-- 'text/node-operators/optimized-binaries-note.md'
        ```bash

        ```

Move the node binary as well:

````

    ```bash

        ```

\`\`\`

````
        ```bash

        ```
    mv ./container-chain-frontier-node /var/lib/tanssi-data
    ```

    ```bash
=== \"Substrate Network\"
    ```

    ```bash
    mv ./container-chain-simple-node /var/lib/tanssi-data
```bash

```
````

=== "Dancelight TestNet"
\`\`\`

````
=== \"EVM-Compatible Appchain\"

    ```bash

    mv ./container-chain-frontier-node /var/lib/dancelight-data

    ```

        ```bash

````

Finally, move also your appchain's spec file to the same folder.

````

### Create the Systemd Service Configuration File {: #create-systemd-configuration }

The next step is to create the Systemd configuration file.

You can create the file by running the following command:

```bash
sudo touch /etc/systemd/system/appchain.service
````

        ```
    ```bash

````

        ```bash

  --8\<-- 'text/node-operators/network-node/bootnode-item.md'

=== "Tanssi MainNet"

````
=== \"EVM-Compatible Appchain\"

    ```bash

    [Unit]
    Description=\"Appchain systemd service\"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple

    ```

    SyslogIdentifier=network

    ```bash


    --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-mainnet.md'

    [Install]
    WantedBy=multi-user.target

    ```

=== \"Substrate Network\"

    ```bash

    [Unit]
    Description=\"Appchain systemd service\"
    After=network.target
    StartLimitIntervalSec=0

        ```
    Type=simple

    ```

        ```bash
    ```

    SyslogIdentifier=network
    SyslogFacility=local7
    KillSignal=SIGHUP

    ```bash
    --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-mainnet.md'
    ```bash

    [Install]
    WantedBy=multi-user.target

    ```
````

=== "Dancelight TestNet"

        ```
=== \"EVM-Compatible Network\"

    ```bash

    [Unit]
    Description=\"Appchain systemd service\"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple

    ```bash
    ```

    RestartSec=10

    ```

    SyslogIdentifier=network

    ```bash

    KillSignal=SIGHUP

    ```bash

    --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-testnet.md'

    [Install]
    WantedBy=multi-user.target

    ```

=== \"Substrate Network\"

    ```bash

    [Unit]
    Description=\"Appchain systemd service\"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple

    ```

    RestartSec=10

    ```

    SyslogIdentifier=network
    SyslogFacility=local7
    KillSignal=SIGHUP
    ```

    --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-testnet.md'

    [Install]
    WantedBy=multi-user.target

    ```
```bash

````

    ```bash

    ```
```bash

````

    ```bash

    ```

The raw chain specification file for the demo network is required to run the node, and can be downloaded from this [public GitHub repository](https://github.com/papermoonio/external-files/blob/main/Tanssi/Demo-EVM-Appchain){target=\\\_blank}. Download the file and place it in the `/var/lib/dancelight-data/` directory.

=== "Demo EVM Appchain (Dancelight)"

```bash


```
Description=\"Appchain systemd service\"
After=network.target
StartLimitIntervalSec=0
```bash

[Service]

```
Restart=on-failure
RestartSec=10
User=dancelight_service
SyslogIdentifier=network
SyslogFacility=local7
```bash

ExecStart=/var/lib/dancelight-data/container-chain-frontier-node \\

```
--rpc-port=9944 \\
--name=para \\
--state-pruning=archive \\
--blocks-pruning=archive \\
--base-path=/var/lib/dancelight-data \\
--database=paritydb \\
--unsafe-rpc-external \\
--bootnodes=/dns4/ukl-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWKDotMgTRpURvoZHsLWP4K9ymhkBByi1EJjMQAnCmqg8E \\
--bootnodes=/dns4/qco-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWB3kqqNhYgGtGbsdtgD18wUoFVeuXVXgWLXTFs91RNgAx \\
-- \\

```

--rpc-port=9945 \\

```

--sync=fast \\
--database=paritydb \\
--bootnodes=/dns4/qco-dancelight-boot-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWCekAqk5hv2fZprhqVz8povpUKdJEiHSd3MALVDWNPFzY \\
--bootnodes=/dns4/qco-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWEwhUb3tVR5VhRBEqyH7S5hMpFoGJ9Anf31hGw7gpqoQY \\
--bootnodes=/dns4/ukl-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWPbVtdaGhcuDTTQ8giTUtGTEcUVWRg8SDWGdJEeYeyZcT

[Install]

```bash

```

```bash

```

```bash

````

--8\<-- 'text/node-operators/network-node/run-flags.md'
\`\`\`

````

```bash

```

/var/lib/dancelight-data/container-chain-frontier-node --help

```
````

````bash

=== \"Simple Substrate Network\"

```bash

    /var/lib/dancelight-data/container-chain-simple-node --help

    ```

```bash

````

```bash

```

systemctl start appchain.service

````

```bash

You can verify that the service is up and running correctly running:

````

```bash

systemctl status appchain.service

```

--8\<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

And check the logs, if needed, with the following command:

```bash

journalctl -f -u appchain.service

```

## --8\<-- 'code/node-operators/network-node/rpc-systemd/terminal/journalctl-logs.md' ", "translated_content": "--- title: Execute um Nó Appchain Usando Systemd description: Aprenda a configurar e executar um nó appchain com tecnologia Tanssi usando Systemd, que permite que você tenha seu próprio endpoint RPC para interagir com seu appchain. icon: simple-linux categories: RPC-Data-Preservers

# Execute um Nó Appchain Usando Systemd

## Introdução {: #introduction }

--8\<-- 'text/node-operators/network-node/intro.md'

Neste guia, você aprenderá como iniciar um nó appchain da Tanssi usando um arquivo executável binário e gerenciar o serviço com [Systemd](https://systemd.io){target=\\\_blank} em sistemas Linux.

O artigo segue a boa prática de executar o serviço com sua própria conta não-root e conceder a essa conta acesso de gravação a um diretório específico. No entanto, você pode adaptar as etapas e instruções deste artigo à configuração, preferências e políticas de segurança da sua infraestrutura.

!!! note
Não é possível executar um nó RPC para appchains de teste rápido, pois eles são executados em uma rede privada e seus nós, portanto, não são acessíveis para sincronização.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para começar, você precisará de acesso a um computador executando um sistema operacional Ubuntu Linux e privilégios de root. Você também precisará de:

- **Arquivo binário do nó** - as instruções neste guia executam a versão de nó estável oficial [mais recente](https://github.com/moondance-labs/tanssi/releases/latest){target=\\\_blank}. Se você deseja construir e executar seu próprio arquivo, certifique-se de seguir as instruções para [construir seu nó appchain](/builders/build/customize/prerequisites/){target=\\\_blank}.

- **Arquivos de especificações de cadeia** - o nó precisa de informações sobre duas blockchains diferentes para sincronizar e executar corretamente. A seção a seguir mostrará como obter esses arquivos.

--8\<-- 'text/node-operators/network-node/getting-specs-files.md'

## Baixe a Versão Mais Recente {: #download-latest-release }

Cada nova versão inclui dois binários de nó, um para redes compatíveis com EVM e outro para redes Substrate. Para começar, execute o seguinte comando para obter o binário da versão mais recente que corresponda ao seu tipo de rede e torná-lo executável:

=== "Rede Compatível com EVM"

````
```bash

wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/container-chain-frontier-node && \\
chmod +x ./container-chain-frontier-node

```
````

=== "Rede Substrate"

````
```bash

wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/container-chain-simple-node && \\
chmod +x ./container-chain-simple-node

```
````

--8\<-- 'text/node-operators/optimized-binaries-note.md'

--8\<-- 'text/node-operators/appchains-systemd-data-directory.md'

Mova também o binário do nó:

=== "Tanssi MainNet"

````
=== \"Appchain compatível com EVM\"

    ```bash

    mv ./container-chain-frontier-node /var/lib/tanssi-data

    ```

=== \"Rede Substrate\"

    ```bash

    mv ./container-chain-simple-node /var/lib/tanssi-data

    ```
````

=== "Dancelight TestNet"

````
=== \"Appchain compatível com EVM\"

    ```bash

    mv ./container-chain-frontier-node /var/lib/dancelight-data

    ```

=== \"Rede Substrate\"

    ```bash

    mv ./container-chain-simple-node /var/lib/dancelight-data

    ```
````

Finalmente, mova também o arquivo de especificações do seu appchain para a mesma pasta.

### Crie o Arquivo de Configuração do Serviço Systemd {: #create-systemd-configuration }

A próxima etapa é criar o arquivo de configuração do Systemd.

Você pode criar o arquivo executando o seguinte comando:

```bash

sudo touch /etc/systemd/system/appchain.service

```

Agora, você pode abrir o arquivo usando seu editor de texto favorito (vim, emacs, nano, etc.) e adicionar a configuração do serviço.

Observe que o comando `ExecStart` tem alguns parâmetros que precisam ser alterados para corresponder à sua rede específica:

- `Arquivo de especificação` - substitua `INSERT_YOUR_APPCHAIN_SPECS_FILE_NAME` pelo nome do arquivo do seu appchain. Seu caminho terá a seguinte aparência: `/var/lib/tanssi-data/YOUR_FILENAME.json`, para um appchain MainNet.
  --8\<-- 'text/node-operators/network-node/bootnode-item.md'

=== "Tanssi MainNet"

````
=== \"Appchain compatível com EVM\"

    ```bash

    [Unit]
    Description=\"Serviço systemd do Appchain\"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    Restart=on-failure
    RestartSec=10
    User=tanssi_service
    SyslogIdentifier=network
    SyslogFacility=local7
    KillSignal=SIGHUP
    ExecStart=/var/lib/tanssi-data/container-chain-frontier-node \\
    --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-mainnet.md'

    [Install]
    WantedBy=multi-user.target

    ```

=== \"Rede Substrate\"

    ```bash

    [Unit]
    Description=\"Serviço systemd do Appchain\"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    Restart=on-failure
    RestartSec=10
    User=tanssi_service
    SyslogIdentifier=network
    SyslogFacility=local7
    KillSignal=SIGHUP
    ExecStart=/var/lib/tanssi-data/container-chain-simple-node \\
    --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-mainnet.md'

    [Install]
    WantedBy=multi-user.target

    ```
````

=== "Dancelight TestNet"

````
=== \"Rede Compatível com EVM\"

    ```bash

    [Unit]
    Description=\"Serviço systemd do Appchain\"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    Restart=on-failure
    RestartSec=10
    User=dancelight_service
    SyslogIdentifier=network
    SyslogFacility=local7
    KillSignal=SIGHUP
    ExecStart=/var/lib/dancelight-data/container-chain-frontier-node \\
    --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-testnet.md'

    [Install]
    WantedBy=multi-user.target

    ```

=== \"Rede Substrate\"

    ```bash

    [Unit]
    Description=\"Serviço systemd do Appchain\"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    Restart=on-failure
    RestartSec=10
    User=dancelight_service
    SyslogIdentifier=network
    SyslogFacility=local7
    KillSignal=SIGHUP
    ExecStart=/var/lib/dancelight-data/container-chain-simple-node \\
    --8<-- 'code/node-operators/network-node/rpc-systemd/parameters-testnet.md'

    [Install]
    WantedBy=multi-user.target

    ```
````

--8\<-- 'text/node-operators/network-node/fetching-bootnode-section.md'

### Exemplo de Configuração de Nó Completo para a Rede EVM de Demonstração {: #example-demo-evm-network}

O exemplo a seguir implanta um nó de arquivo completo e totalmente funcional para a [rede EVM de demonstração](/builders/tanssi-network/testnet/demo-evm-network/){target=\\\_blank} implantada no Dancelight com um ID de `2001`.

O arquivo de especificação de cadeia bruta para a rede de demonstração é necessário para executar o nó e pode ser baixado deste [repositório público do GitHub](https://github.com/papermoonio/external-files/blob/main/Tanssi/Demo-EVM-Appchain){target=\\\_blank}. Baixe o arquivo e coloque-o no diretório `/var/lib/dancelight-data/`.

=== "Demo EVM Appchain (Dancelight)"

````
```bash

[Unit]
Description=\"Serviço systemd do Appchain\"
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=dancelight_service
SyslogIdentifier=network
SyslogFacility=local7
KillSignal=SIGHUP
ExecStart=/var/lib/dancelight-data/container-chain-frontier-node \\
--chain=/var/lib/dancelight-data/container-2001-raw-specs.json \\
--rpc-port=9944 \\
--name=para \\
--state-pruning=archive \\
--blocks-pruning=archive \\
--base-path=/var/lib/dancelight-data \\
--database=paritydb \\
--unsafe-rpc-external \\
--bootnodes=/dns4/ukl-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWKDotMgTRpURvoZHsLWP4K9ymhkBByi1EJjMQAnCmqg8E \\
--bootnodes=/dns4/qco-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWB3kqqNhYgGtGbsdtgD18wUoFVeuXVXgWLXTFs91RNgAx \\
-- \\
--chain=/var/lib/dancelight-data/dancelight-raw-specs.json \\
--rpc-port=9945 \\
--name=relay \\
--sync=fast \\
--database=paritydb \\
--bootnodes=/dns4/qco-dancelight-boot-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWCekAqk5hv2fZprhqVz8povpUKdJEiHSd3MALVDWNPFzY \\
--bootnodes=/dns4/qco-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWEwhUb3tVR5VhRBEqyH7S5hMpFoGJ9Anf31hGw7gpqoQY \\
--bootnodes=/dns4/ukl-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWPbVtdaGhcuDTTQ8giTUtGTEcUVWRg8SDWGdJEeYeyZcT

[Install]
WantedBy=multi-user.target

```
````

### Run Flags {: #run-flags }

As flags usadas no comando `ExecStart` podem ser ajustadas de acordo com suas preferências e configuração de hardware. As seguintes são algumas das mais notáveis:

--8\<-- 'text/node-operators/network-node/run-flags.md'

=== "Rede compatível com EVM"

````
```bash

/var/lib/dancelight-data/container-chain-frontier-node --help

```
````

=== "Rede Substrate Simples"

````
```bash

/var/lib/dancelight-data/container-chain-simple-node --help

```
````

## Execute o Serviço {: #run-the-service }

Finalmente, habilite o serviço e inicie-o pela primeira vez:

```bash

systemctl enable appchain.service && \\
systemctl start appchain.service

```

Você pode verificar se o serviço está funcionando corretamente executando:

```bash

systemctl status appchain.service

```

--8\<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

E verifique os logs, se necessário, com o seguinte comando:

```bash

journalctl -f -u appchain.service

```

--8\<-- 'code/node-operators/network-node/rpc-systemd/terminal/journalctl-logs.md'
