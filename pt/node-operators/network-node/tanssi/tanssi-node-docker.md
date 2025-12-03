---
title: Executar um Nó Tanssi Usando Docker
description: Aprenda como configurar e executar um nó para a rede Tanssi usando o Docker para fornecer endpoints de API para aplicativos e usuários.
icon: simple-docker
categories: RPC-Data-Preservers
---

# Executar um Nó Tanssi Usando Docker

## Introdução {: #introduction }

Neste guia, você aprenderá como iniciar um nó Tanssi usando a imagem oficial com [Docker](https://www.docker.com){target=\_blank} em sistemas Linux. Os nós são cruciais para o ecossistema Tanssi, pois fornecem endpoints de API estáveis ​​aos quais aplicativos e usuários podem se conectar para obter dados da cadeia e envio de transações.

## Verificando Pré-requisitos {: #checking-prerequisites }

--8<-- 'text/node-operators/pt/installing-docker.md'

### Puxar a Imagem Docker {: #pull-docker-image }

Para cada versão, uma imagem Docker é construída e publicada. Ele contém todas as dependências necessárias que um nó Tanssi exige e o próprio arquivo binário.

Uma imagem Docker combina o binário correspondente à versão estável mais recente do [nó cliente](/pt/learn/framework/architecture/#architecture){target=\_blank}, juntamente com o arquivo de especificação do orquestrador Tanssi.

Execute o seguinte comando para puxar a imagem Docker:

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

O comando irá baixar e extrair a imagem e mostrar o status após a execução:

--8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-docker/terminal/pulling-docker-image.md'

--8<-- 'text/node-operators/pt/set-up-data-directory.md'

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

--8<-- 'text/node-operators/pt/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

## Inicie Seu Nó {: #start-your-node }

Para iniciar seu nó, você deve executar a imagem Docker com o comando `docker run`.

Substitua `INSERT_YOUR_TANSSI_NODE_NAME` por um nome legível por humanos e defina `INSERT_YOUR_IP_ADDRESS` com seu endereço IP público.
        ```bash

--8<-- 'text/node-operators/pt/optimized-binaries-note.md'

=== "Tanssi MainNet"

````
        ```

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        ```bash

    {{ networks.dancelight.operator_docker_image }} \
    --chain=tanssi \
    --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'

    ```

=== "Intel Skylake"
        ```

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
        ```bash

    {{ networks.dancelight.operator_docker_image }} \
    --chain=tanssi \
    --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'

    ```

=== "AMD Zen3"
        ```

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    --entrypoint "/tanssi-relay/tanssi-relay-znver3" \
    {{ networks.dancelight.operator_docker_image }} \
        ```bash

    --8<-- 'code/node-operators/network-node/tanssi/docker-command.md'

    ```
````

=== "Dancelight TestNet"

        ```


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

As flags usadas no comando `docker run` podem ser ajustadas de acordo com suas preferências e configuração de hardware. As seguintes são algumas das mais notáveis:

- **--state-pruning=archive** - mantém todos os dados de estado, o que é necessário para consultas de estado histórico
    ```bash

- **--database=paritydb** - usa ParityDB como o backend do banco de dados, que é otimizado para o desempenho do nó RPC

    ```

!!! warning
    A flag `--unsafe-rpc-external` abre seu nó RPC para conexões externas. Em ambientes de produção, você deve implementar medidas de segurança adicionais, como um proxy reverso com limitação de taxa e autenticação.
    ```bash

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

A primeira vez que seu nó é iniciado, o processo de sincronização exibe muitas informações de log da configuração do nó e dos blocos da cadeia sendo sincronizados. Alguns erros devem ser exibidos no início do processo, desaparecendo assim que a cadeia é sincronizada com o último bloco.

--8<-- 'code/node-operators/terminal/syncing-process.md'

Quando o processo de sincronização for concluído, seu nó estará pronto para atender às solicitações de API.

## Testando Seu Nó {: #testing-your-rpc-node }

Depois que seu nó estiver totalmente sincronizado, você pode verificar se o endpoint RPC está funcionando corretamente fazendo uma solicitação simples. Você pode usar curl para testar a conexão:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method":"chain_getHeader", "params":[]}' http://localhost:9944
```

Se o endpoint RPC estiver funcionando corretamente, você deverá receber uma resposta JSON contendo as informações do cabeçalho do bloco mais recente.
