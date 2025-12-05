---
title: Executar um Sequenciador Usando Docker
description: Saiba como configurar e executar um sequenciador (também conhecido como produtor de blocos) para as appchains com tecnologia Tanssi, usando Docker para participar do protocolo e ganhar recompensas.
icon: simple-docker
categories: Sequencers
---

# Executar um Sequenciador em Tanssi Usando Docker

## Introdução {: #introduction }

--8<-- 'text/pt/node-operators/sequencers/onboarding/run-a-sequencer/intro.md'

Neste guia, você aprenderá como iniciar um sequenciador Tanssi para fazer parte do pool compartilhado de sequenciadores usando [Docker](https://www.docker.com){target=\_blank} em um computador Linux. No entanto, ele pode ser adaptado a outros sistemas operacionais.

## Verificando os Pré-requisitos {: #checking-prerequisites }

--8<-- 'text/pt/node-operators/installing-docker.md'

## Puxando a Imagem Docker {: #pulling-docker-image }

Uma imagem Docker é construída e publicada em cada lançamento, contendo todas as dependências necessárias que um sequenciador Tanssi precisa e o próprio arquivo binário.

Uma imagem Docker combina o binário correspondente à versão estável mais recente do [nó cliente](/pt/learn/framework/architecture/#architecture){target=\_blank}, junto com o arquivo de especificação do orquestrador Tanssi.

O seguinte comando para puxar a imagem Docker:

=== "Tanssi MainNet"

    ```bash
    docker pull {{ node_versions.docker_sequencer_image_name }}
    ```
    
=== "Dancelight TestNet"
    
    ```bash
    docker pull {{ node_versions.docker_sequencer_image_name }}
    ```

O comando fará o download e extrairá a imagem e mostrará o status após a execução:

--8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/terminal/pulling-docker-image.md'

--8<-- 'text/pt/node-operators/sequencers/onboarding/run-a-sequencer/download-specs.md'

--8<-- 'text/pt/node-operators/appchains-docker-data-directory.md'

## Gerar a Chave do Nó {: #generate-node-key }

--8<-- 'text/pt/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-intro.md'


=== "Tanssi MainNet"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ node_versions.docker_sequencer_image_name }} key generate-node-key --file /data/node-key
    ```
    
=== "Dancelight TestNet"
    
    ```bash
    docker run --network="host" -v "/var/lib/dancelight-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ node_versions.docker_sequencer_image_name }} key generate-node-key --file /data/node-key
    ```


--8<-- 'text/pt/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

## Comando de Inicialização {: #start-up-command }

Para iniciar seu nó, você deve executar a imagem Docker com o comando `docker run`.

Observe que o comando contém duas seções, divididas por `-- \`:

- **Seção do protocolo Tanssi** - contém os flags para executar o nó Tanssi
- **Seção do Sequenciador** - contém os flags para executar o nó sequenciador. É abstrato o suficiente para ser adaptado dinamicamente em tempo de execução à cadeia específica que o nó servirá

Dê um nome legível a cada seção, substituindo as tags `INSERT_YOUR_TANSSI_NODE_NAME` e `INSERT_YOUR_SEQUENCER_NODE_NAME` nos flags `--name`. Esses nomes serão úteis para conectar as entradas de registro e as métricas com o nó que as gera.
        ```bash

--8<-- 'text/pt/node-operators/optimized-binaries-note.md'

=== "Tanssi MainNet"

    === "Generic"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command-mainnet.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node-skylake solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command-mainnet.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node-znver3 solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command-mainnet.md'
        ```

=== "Dancelight TestNet"

    === "Generic"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node-skylake solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --entrypoint bash --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ node_versions.docker_sequencer_image_name }} -c "/tanssi/tanssi-node-znver3 solo-chain \
        --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
        ```

### Flags de Execução {: #run-flags }

Os flags usados no comando `docker run` podem ser ajustados de acordo com suas preferências e configuração de hardware. Os seguintes são alguns dos mais notáveis:
    ```bash

--8<-- 'text/pt/node-operators/network-node/run-flags.md'


=== "Tanssi MainNet"

    ```bash
    docker run {{ node_versions.docker_sequencer_image_name }} --help
    ```

=== "Dancelight TestNet"

    ```bash
    docker run {{ node_versions.docker_sequencer_image_name }} --help
    ```

## Sincronizando Seu Nó {: #syncing-your-node }

A primeira vez que seu nó é iniciado, o processo de sincronização exibe muitas informações de registro da configuração do nó e do próprio nó. Alguns erros devem ser exibidos no início do processo, desaparecendo assim que a cadeia é sincronizada com o último bloco.

--8<-- 'code/node-operators/terminal/syncing-process.md'

Quando a sincronização com o orquestrador Tanssi for concluída, o nó ainda precisará ser sincronizado com a rede a que foi designado. A sincronização com a cadeia servida pelo nó sequenciador acontecerá toda vez que o sequenciador for rotacionado.
