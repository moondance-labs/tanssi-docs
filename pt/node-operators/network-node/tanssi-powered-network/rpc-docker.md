---
title: Executar um nó Appchain usando Docker
description: Descubra como configurar e operar um nó appchain com tecnologia Tanssi usando Docker, permitindo que você hospede seu próprio endpoint RPC para interagir com sua appchain.
icon: material-docker
categories: RPC-Data-Preservers
---

# Executar um nó Appchain usando Docker

## Introdução {: #introduction }

--8\<-- 'text/node-operators/network-node/intro.md'

Neste guia, você aprenderá como iniciar rapidamente um nó appchain Tanssi usando [Docker](https://www.docker.com){target=\_blank} em um computador Linux. No entanto, ele pode ser adaptado a outros sistemas operacionais.

!!! note
Não é possível executar um nó RPC para appchains de teste rápidas, pois elas são executadas em uma rede privada e, portanto, seus nós são inacessíveis para sincronização.

## Verificação de Pré-requisitos {: #checking-prerequisites }

--8\<-- 'text/node-operators/installing-docker.md'

--8\<-- 'text/node-operators/network-node/getting-specs-files.md'

--8\<-- 'text/node-operators/appchains-docker-data-directory.md'

## Extraindo a Imagem Docker {: #pulling-docker-image }

Duas imagens Docker são criadas e publicadas como parte do processo de implantação automatizada para cada lançamento: uma para appchains compatíveis com EVM e outra para appchains Substrate.

Essas imagens Docker incluem todos os arquivos binários necessários para executar a versão estável mais recente do [nó do cliente](/learn/framework/architecture/#architecture){target=\_blank}.

Dependendo do tipo de appchain para o qual você deseja executar o nó, extraia a imagem correspondente.

### Appchains compatíveis com EVM {: #pulling-evm-docker-image }

Se o appchain com tecnologia Tanssi foi registrado no dApp escolhendo o modelo EVM ou carregando uma especificação personalizada representando um appchain compatível com EVM Tanssi, execute o seguinte comando para extrair a imagem Docker:

=== "Tanssi MainNet"

````
    ```bash

docker pull moondancelabs/container-chain-evm-template

    ```
````

=== "Dancelight TestNet"

    ```bash
````

    ```
docker pull moondancelabs/container-chain-evm-template
```

````

O comando fará o download e extrairá a imagem e mostrará o status após a execução:

--8\<-- 'code/node-operators/network-node/rpc-docker/terminal/pulling-docker-image.md'

### Appchains Substrate Simples {: #pulling-substrate-docker-image }

Se o appchain foi registrado no dApp escolhendo o modelo Substrate básico ou carregando um arquivo de especificação personalizado que representa um appchain Substrate, execute o seguinte comando para extrair a imagem Docker:
    ```bash

=== "Tanssi MainNet"

    ```
````

```bash
docker pull moondancelabs/container-chain-simple-template
    ```bash

````
    ```

=== "Dancelight TestNet"

````
```bash

docker pull moondancelabs/container-chain-simple-template

```
````

O comando fará o download e extrairá a imagem e mostrará o status após a execução, mostrando uma saída semelhante à imagem do terminal anterior.

## Comando de Inicialização {: #start-up-command }

Para iniciar seu nó, você deve executar a imagem Docker com o comando `docker run`. Observe que você precisará modificar os seguintes parâmetros:

        ```bash
  --8\<-- 'text/node-operators/network-node/bootnode-item.md'

=== "Tanssi MainNet"

        ```

=== "Appchain compatível com EVM"

    ```bash
    -u $(id -u ${USER}):$(id -g ${USER}) \
    moondancelabs/container-chain-evm-template \
    --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-mainnet.md'
    ```

=== "Appchain Substrate Simples"

    ```bash
    docker run --network="host" -v "/var/lib/tanssi-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
        ```bash

    --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-mainnet.md'

    ```
````

        ```

````

=== "Appchain compatível com EVM"

        ```bash
    docker run --network="host" -v "/var/lib/dancelight-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    moondancelabs/container-chain-evm-template \
        ```


=== "Appchain Substrate Simples"

    ```bash
    docker run --network="host" -v "/var/lib/dancelight-data:/data" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    moondancelabs/container-chain-simple-template \
    --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-testnet.md'
    ```

````

    ```bash

Somente o estado histórico dos últimos 256 blocos finalizados é mantido no banco de dados local por padrão. Para executar um nó de arquivo completo, você deve definir o sinalizador `--state-pruning archive`. Mais informações estão na [seção de sinalizadores](#run-flags).

--8\<-- 'text/node-operators/network-node/fetching-bootnode-section.md'

### Exemplo de nó completo para Demo EVM Appchain {: #example-demo-evm-appchain }

O exemplo a seguir inicia um nó RPC de arquivo completo para a [rede demo EVM](/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank} implantada no Dancelight com um ID de `2001`. Este exemplo assume que os arquivos de especificações foram baixados e estão localizados na pasta de dados.

=== "Demo EVM Appchain (Dancelight)"

````
```bash

docker run --network="host" -v "/var/lib/dancelight-data:/data" \
-u $(id -u ${USER}):$(id -g ${USER}) \
moondancelabs/container-chain-evm-template \
--chain=/data/container-2001-raw-specs.json \
--rpc-port=9944 \
--name=demoAppchain \
--state-pruning=archive \
--blocks-pruning=archive \
--database=paritydb \

    ```
--bootnodes=/dns4/ukl-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWKDotMgTRpURvoZHsLWP4K9ymhkBByi1EJjMQAnCmqg8E \
--bootnodes=/dns4/qco-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWB3kqqNhYgGtGbsdtgD18wUoFVeuXVXgWLXTFs91RNgAx \
-- \
--chain=/data/dancelight-raw-specs.json \
--rpc-port=9945 \
--name=relay \
--sync=fast \
--database=paritydb \
--bootnodes=/dns4/qco-dancelight-boot-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWCekAqk5hv2fZprhqVz8povpUKdJEiHSd3MALVDWNPFzY \
    ```bash

--bootnodes=/dns4/ukl-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWPbVtdaGhcuDTTQ8giTUtGTEcUVWRg8SDWGdJEeYeyZcT

    ```
````

### Executar Sinalizadores {: #run-flags }

    ```bash
As flags usadas no comando `docker run` podem ser ajustadas de acordo com suas preferências e configuração de hardware. Os seguintes são alguns dos mais notáveis:
    ```

--8\<-- 'text/node-operators/network-node/run-flags.md'

=== "Appchain compatível com EVM"

````
```bash

docker run -ti moondancelabs/container-chain-evm-template --help

```
````

=== "Appchain Substrate Simples"

````
```bash

docker run -ti moondancelabs/container-chain-simple-template --help

```
````

## Sincronizando seu nó {: #syncing-your-node }

Depois que seu nó iniciar, o processo de sincronização exibirá muitas informações de log, tanto do nó quanto do appchain Tanssi. Alguns erros devem ser exibidos no início do processo, desaparecendo assim que a cadeia for sincronizada com o último bloco.

--8\<-- 'code/node-operators/terminal/syncing-process.md'

!!! note
A duração do processo de sincronização é diretamente proporcional ao tamanho da cadeia que você está sincronizando.
