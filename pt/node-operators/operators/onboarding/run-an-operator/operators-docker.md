---
title: Executar um Nó Operador Usando Docker
description: Aprenda como configurar e executar um operador (também conhecido como validador) para a rede Tanssi usando o Docker para participar do protocolo, proteger redes e ganhar recompensas.
icon: simple-docker
categories: Operadores
---

# Executar um Nó Operador Usando Docker

## Introdução {: #introduction }

Os operadores são um componente crucial do ecossistema Tanssi, fornecendo serviços de segurança e validação para redes baseadas em Tanssi. Como operador, você participa do mecanismo de consenso que protege a rede, enquanto ganha recompensas por sua contribuição.

Conforme apresentado na [seção de integração](/node-operators/operators/onboarding/){target=\_blank}, a execução do nó real é o primeiro passo para sua participação ativa no protocolo.

Neste guia, você aprenderá como iniciar um operador Tanssi usando a versão oficial da imagem com [Docker](https://www.docker.com){target=\_blank} em sistemas Linux.

## Verificando Pré-Requisitos {: #checking-prerequisites }

--8\<-- 'text/node-operators/installing-docker.md'

### Puxar a Imagem Docker {: #pull-docker-image }

Uma imagem Docker é construída e publicada em cada versão, contendo todas as dependências necessárias que um operador Tanssi requer e o próprio arquivo binário.

Uma imagem Docker combina o binário correspondente à versão estável mais recente do [nó cliente](/learn/framework/architecture/#architecture){target=\_blank}, juntamente com o arquivo de especificação do orquestrador Tanssi.

O seguinte comando para puxar a imagem Docker:

=== "Tanssi MainNet"

````
    ```bash

docker pull {{ networks.dancelight.operator_docker_image }}

    ```
````

=== "Dancelight TestNet"

    ```bash
````

    ```
docker pull {{ networks.dancelight.operator_docker_image }}
```

````

O comando fará o download e extrairá a imagem e mostrará o status após a execução:

--8\<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/terminal/pulling-docker-image.md'

--8\<-- 'text/node-operators/set-up-data-directory.md'

### Gerar a Chave do Nó {: #generate-node-key }

Para gerar e armazenar em disco as chaves de sessão que serão referenciadas no comando de inicialização, execute o seguinte comando:
    ```bash

=== "Tanssi MainNet"

````
    ```

docker run --network="host" -v "/var/lib/tanssi-data:/data" \
-u $(id -u ${USER}):$(id -g ${USER}) \
{{ networks.dancelight.operator_docker_image }} key generate-node-key --file /data/node-key

    ```bash
````

=== "Dancelight TestNet"

    ```
````

```bash
docker run --network="host" -v "/var/lib/dancelight-data:/data" \
-u $(id -u ${USER}):$(id -g ${USER}) \
{{ networks.dancelight.operator_docker_image }} key generate-node-key --file /data/node-key
```

````

--8\<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

## Inicie Seu Nó {: #start-your-node }

Para iniciar seu nó, você deve executar a imagem Docker com o comando `docker run`.

Substitua `INSERT_YOUR_TANSSI_NODE_NAME` por um nome legível por humanos e defina `INSERT_YOUR_IP_ADDRESS` com seu endereço IP público.
        ```bash

--8\<-- 'text/node-operators/optimized-binaries-note.md'

=== "Tanssi MainNet"

````
        ```

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        ```bash

    {{ networks.dancelight.operator_docker_image }} \
    --chain=tanssi \
    --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'

    ```

=== "Intel Skylake"
        ```

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
        ```bash

    {{ networks.dancelight.operator_docker_image }} \
    --chain=tanssi \
    --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'

    ```

=== "AMD Zen3"
        ```

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
    {{ networks.dancelight.operator_docker_image }} \
        ```bash

    --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'

    ```
````

=== "Dancelight TestNet"

        ```
````

=== "Generic"

        ```bash
    docker run --network="host" -v "/var/lib/dancelight-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ networks.dancelight.operator_docker_image }} \
    --chain=dancelight \
    --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
    ```

=== "Intel Skylake"

    ```bash
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
    ```bash

````
    ```

### Flags de Execução {: #run-flags }

As flags usadas no comando `docker run` podem ser ajustadas de acordo com suas preferências e configuração de hardware. As seguintes são algumas das mais notáveis:

    ```bash
--8\<-- 'text/node-operators/network-node/run-flags.md'
    ```

=== "Tanssi MainNet"

````
```bash

docker run -ti {{ networks.dancelight.operator_docker_image }} --help

```
````

=== "Dancelight TestNet"

````
```bash

docker run -ti {{ networks.dancelight.operator_docker_image }} --help

```
````

## Sincronizando Seu Nó {: #syncing-your-node }

A primeira vez que seu nó é iniciado, o processo de sincronização exibe muitas informações de log da configuração do nó e dos blocos da cadeia sendo sincronizados. Alguns erros devem ser exibidos no início do processo, desaparecendo assim que a cadeia é sincronizada com o último bloco.

--8\<-- 'code/node-operators/terminal/syncing-process.md'

Quando o processo de sincronização for concluído, seu nó estará pronto para as próximas etapas.
