---
title: Executar um Nó Operator Usando Docker
description: Aprenda como configurar e executar um operador (também conhecido como validador) para a rede Tanssi usando o Docker, participando do protocolo, protegendo redes e ganhando recompensas.
icon: simple-docker
categories: Operators
---

# Executar um Nó Operator Usando Docker

## Introdução {: #introduction }

Os operadores são fundamentais no ecossistema Tanssi, fornecendo segurança e validação para redes baseadas em Tanssi. Como operador, você participa do consenso que protege a rede e ganha recompensas.

Conforme apresentado na [seção de integração](/pt/node-operators/operators/onboarding/){target=_blank}, executar o nó é o primeiro passo da sua participação ativa no protocolo.

Este guia mostra como iniciar um operador Tanssi usando a imagem oficial com [Docker](https://www.docker.com){target=_blank} em sistemas Linux.

## Verificando Pré-Requisitos {: #checking-prerequisites }

--8<-- 'text/pt/node-operators/installing-docker.md'

### Puxar a Imagem Docker {: #pull-docker-image }

Uma imagem Docker é construída e publicada em cada versão, contendo todas as dependências necessárias e o binário do operador.

A imagem combina o binário estável mais recente do [nó cliente](/pt/learn/framework/architecture/#architecture){target=_blank} com o arquivo de especificação do orquestrador Tanssi.

Execute o comando a seguir para puxar a imagem Docker:

=== "Tanssi MainNet"

    ```bash
    docker pull {{ networks.dancelight.operator_docker_image }}
    ```

=== "Dancelight TestNet"

    ```bash
    docker pull {{ networks.dancelight.operator_docker_image }}
    ```

O comando fará download/extrair a imagem e exibirá o status após a execução:

--8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/terminal/pulling-docker-image.md'

--8<-- 'text/pt/node-operators/set-up-data-directory.md'

### Gerar a Chave do Nó {: #generate-node-key }

Para gerar e armazenar as chaves de sessão em disco (referenciadas no comando de inicialização), execute:

=== "Tanssi MainNet"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancelight.operator_docker_image }} key generate-node-key --file /data/node-key
    ```

=== "Dancelight TestNet"

    ```bash
    docker run --network="host" -v "/var/lib/dancelight-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancelight.operator_docker_image }} key generate-node-key --file /data/node-key
    ```

--8<-- 'text/pt/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

## Inicie Seu Nó {: #start-your-node }

Para iniciar seu nó, execute a imagem Docker com `docker run`.

Substitua `INSERT_YOUR_TANSSI_NODE_NAME` por um nome legível e `INSERT_YOUR_IP_ADDRESS` pelo IP público.

--8<-- 'text/pt/node-operators/optimized-binaries-note.md'

=== "Tanssi MainNet"

    === "Genérico"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

=== "Dancelight TestNet"

    === "Genérico"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

### Flags de Execução {: #run-flags }

As flags usadas no comando `docker run` podem ser ajustadas conforme suas preferências e configuração de hardware. Algumas das principais são:

--8<-- 'text/node-operators/network-node/run-flags.md'

=== "Tanssi MainNet"

    ```bash
    docker run -ti {{ networks.dancelight.operator_docker_image }} --help
    ```

=== "Dancelight TestNet"

    ```bash
    docker run -ti {{ networks.dancelight.operator_docker_image }} --help
    ```

## Sincronizando Seu Nó {: #syncing-your-node }

Na primeira execução, o processo de sincronização exibirá muitos logs do nó e da cadeia sendo sincronizada. Alguns erros iniciais são esperados e desaparecem quando a cadeia alcança o último bloco.

--8<-- 'code/node-operators/terminal/syncing-process.md'

Quando a sincronização terminar, seu nó estará pronto para as próximas etapas.
