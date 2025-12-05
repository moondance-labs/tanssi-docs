---
title: Atualize seu Nó Docker Sequencer
description: Siga estas instruções para atualizar seu nó sequencer Tanssi em execução via Docker para a versão mais recente do software cliente Tanssi.
icon: simple-docker
categories: Sequencers
---

# Atualize seu Nó em Execução via Docker

## Introdução {: #introduction }

Manter seu nó atualizado é uma parte importante de ser um sequencer Tanssi. Não só ajuda a garantir que seu nó sequencer permaneça saudável, mas também contribui para manter toda a Rede Tanssi funcionando sem problemas.

Este tutorial aborda a atualização do seu sequencer Tanssi que foi configurado usando o Docker. Ele pressupõe que você já configurou sua conta e lançou um [sequencer usando Docker](/pt/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/){target=\_blank}.

--8<-- 'text/pt/node-operators/github-release-notifications.md'

## Atualizando Nós Docker {: #upgrading-docker-nodes }

Se você estiver executando seu sequencer com o Docker, atualizar seu nó é tão simples quanto parar o contêiner em execução e reiniciá-lo com a nova tag de versão.

Primeiro, obtenha a ID do contêiner do seu nó sequencer Tanssi com o seguinte comando:

```bash
docker ps -a
```

A ID do contêiner é a primeira coluna e, se você estiver executando vários contêineres Docker, pode identificá-lo pelo nome da imagem de `{{ node_versions.docker_sequencer_image_name }}`. Você pode executar o comando de parada da seguinte forma:

```bash
docker stop INSERT_YOUR_CONTAINER_ID
```

A sua interação com o terminal será semelhante ao seguinte:

--8<-- 'code/node-operators/sequencers/operational-tasks/upgrade-your-node/upgrade-docker/terminal/docker-stop.md'

Para reiniciar o nó, você pode usar o mesmo comando que usou ao iniciar seu nó pela primeira vez. O comando extrai a imagem e o nó retomará a sincronização de blocos de onde parou quando o processo Docker foi interrompido.

=== "Genérico"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    {{ node_versions.docker_sequencer_image_name }} \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```

=== "Intel Skylake"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-skylake" \
    {{ node_versions.docker_sequencer_image_name }} \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```

=== "AMD Zen3"

    ```bash
    docker run --network="host" -v "/var/lib/dancebox:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi/tanssi-node-znver3" \
    {{ node_versions.docker_sequencer_image_name }} \
    --8<-- 'code/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-docker/docker-command.md'
    ```
    
### Especificando uma Tag de Versão {: #specifying-a-version-tag }

Se você quiser especificar uma [tag de versão específica](https://hub.docker.com/r/moondancelabs/tanssi/tags){target=\_blank}, você pode fazer isso substituindo a tag de versão anexada ao nome da imagem. Por exemplo, se você quisesse buscar a versão `3`, você substituiria o `2` em `{{ node_versions.docker_sequencer_image_name }}`.

E é isso! Você atualizou com sucesso seu nó Tanssi.
