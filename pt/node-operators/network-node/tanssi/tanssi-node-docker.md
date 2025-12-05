---
title: Executar um Nó Tanssi Usando Docker
description: Aprenda como configurar e executar um nó para a rede Tanssi usando Docker para fornecer endpoints de API para aplicativos e usuários.
icon: simple-docker
categories: RPC-Data-Preservers
---

# Executar um Nó Tanssi Usando Docker

## Introdução {: #introduction }

Neste guia, você aprenderá como iniciar um nó Tanssi usando a imagem oficial com [Docker](https://www.docker.com){target=_blank} em sistemas Linux. Os nós são cruciais para o ecossistema Tanssi, pois fornecem endpoints de API estáveis aos quais aplicativos e usuários podem se conectar para obter dados da cadeia e enviar transações.

## Verificando Pré-requisitos {: #checking-prerequisites }

--8<-- 'text/pt/node-operators/installing-docker.md'

### Puxar a Imagem Docker {: #pull-docker-image }

Para cada versão, uma imagem Docker é construída e publicada. Ela contém todas as dependências que um nó Tanssi exige e o próprio binário.

A imagem combina o binário da versão estável mais recente do [nó cliente](/pt/learn/framework/architecture/#architecture){target=_blank} com o arquivo de especificações do orquestrador Tanssi.

Execute o comando abaixo para puxar a imagem Docker:

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

Para gerar e armazenar em disco as chaves de sessão referenciadas no comando de inicialização, execute:

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

Substitua `INSERT_YOUR_TANSSI_NODE_NAME` por um nome legível e defina `INSERT_YOUR_IP_ADDRESS` com seu IP público.

--8<-- 'text/pt/node-operators/optimized-binaries-note.md'

=== "Tanssi MainNet"

    === "Genérico"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=tanssi \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

=== "Dancelight TestNet"

    === "Genérico"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'
        ```

### Executar Flags {: #run-flags }

As flags do `docker run` podem ser ajustadas conforme suas preferências e hardware. Algumas das principais:

- **--state-pruning=archive** - mantém todos os dados de estado (necessário para consultas históricas)
- **--blocks-pruning=archive** - mantém todos os blocos (necessário para dados históricos de blocos)
- **--database=paritydb** - usa ParityDB como backend otimizado para desempenho de nó RPC
- **--unsafe-rpc-external** - permite conexões externas ao RPC; exige medidas adicionais de segurança em produção (proxy reverso, autenticação, firewall)

!!! atenção
    A flag `--unsafe-rpc-external` expõe seu nó RPC externamente. Em produção, proteja com firewall, proxy reverso, autenticação e limitação de taxa.

Você pode visualizar todas as flags disponíveis executando:

=== "Tanssi MainNet"

    ```bash
    docker run -ti {{ networks.dancelight.operator_docker_image }} --help
    ```

=== "Dancelight TestNet"

    ```bash
    docker run -ti {{ networks.dancelight.operator_docker_image }} --help
    ```

## Sincronizando Seu Nó {: #syncing-your-node }

Na primeira execução, o processo de sincronização exibirá muitos logs do nó e da cadeia. Alguns erros iniciais são esperados e desaparecem quando a cadeia alcança o último bloco.

--8<-- 'code/node-operators/terminal/syncing-process.md'

## Testando Seu Nó {: #testing-your-rpc-node }

Depois de sincronizado, teste o endpoint RPC com uma solicitação simples, por exemplo:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method":"chain_getHeader", "params":[]}' http://localhost:9944
```

Se estiver funcionando, você receberá uma resposta JSON com o cabeçalho do bloco mais recente.
