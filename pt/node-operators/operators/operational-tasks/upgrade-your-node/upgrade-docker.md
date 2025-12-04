---
title: Atualize seu Nó Docker Sequencer
description: Siga estas instruções para atualizar seu nó sequencer Tanssi em execução via Docker para a versão mais recente do software cliente Tanssi.
icon: simple-docker
categories: Operadores
---

# Atualize seu Nó em Execução via Docker

## Introdução {: #introduction }

A manutenção do seu nó atualizado é uma parte importante de ser um operador Tanssi. Isso não apenas ajuda a garantir que seu nó permaneça em bom estado, mas também contribui para manter toda a Rede Tanssi funcionando sem problemas.

Este tutorial aborda a atualização do seu nó operador Tanssi que foi configurado usando o Docker. Ele pressupõe que você já configurou sua conta e lançou um [nó operador usando o Systemd](/pt/node-operators/operators/onboarding/run-an-operator/operators-systemd/){target=\_blank}.

--8<-- 'text/pt/node-operators/github-release-notifications.md'

## Atualizando Nós Docker {: #upgrading-docker-nodes }

A atualização do seu nó é tão simples quanto parar o contêiner em execução e reiniciá-lo com a nova tag de versão.

Primeiro, obtenha o ID do contêiner do seu nó operador Tanssi com o seguinte comando:

```bash
docker ps -a
```

O ID do contêiner é a primeira coluna e, se você estiver executando vários contêineres Docker, poderá identificá-lo pelo nome da imagem `{{ networks.dancelight.operator_docker_image }}`. Você pode executar o comando de parada da seguinte forma:

```bash
docker stop INSERT_YOUR_CONTAINER_ID
```

A sua interação com o terminal se assemelhará ao seguinte:

--8<-- 'code/node-operators/operators/operational-tasks/upgrade-your-node/upgrade-docker/terminal/docker-stop.md'

Para reiniciar o nó, use o mesmo comando que usou ao iniciá-lo pela primeira vez. O comando fará o pull da imagem e o nó retomará a sincronização de blocos de onde parou quando o processo Docker foi interrompido.

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
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

    === "Intel Skylake"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-skylake" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

    === "AMD Zen3"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
        {{ networks.dancelight.operator_docker_image }} \
        --chain=dancelight \
        --8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/docker-command.md'
        ```

--8<-- 'text/pt/node-operators/optimized-binaries-note.md'

### Especifique uma Tag de Versão {: #specifying-a-version-tag }

Para usar uma [tag de versão](https://hub.docker.com/r/moondancelabs/tanssi/tags){target=\_blank} específica, anexe-a ao nome da imagem. Por exemplo, para obter a versão marcada como `latest` (que é o padrão), anexe `:latest` a `{{ networks.dancelight.operator_docker_image }}`.

E é só isso! Você atualizou com sucesso seu nó Tanssi.
