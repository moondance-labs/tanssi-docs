---
title: Executar um Nó Appchain Usando Docker
description: Descubra como configurar e operar um nó appchain com tecnologia Tanssi usando Docker, permitindo hospedar seu próprio endpoint RPC para interagir com sua appchain.
icon: material-docker
categories: RPC-Data-Preservers
---

# Executar um Nó Appchain usando Docker

## Introdução {: #introduction }

--8<-- 'text/pt/node-operators/network-node/intro.md'

Neste guia, você aprenderá como iniciar rapidamente um nó appchain Tanssi usando [Docker](https://www.docker.com){target=_blank} em um computador Linux. Ele pode ser adaptado para outros sistemas operacionais.

!!! nota
    Não é possível executar um nó RPC para appchains de teste rápidas, pois elas rodam em uma rede privada e, portanto, não estão acessíveis para sincronização.

## Verificação de Pré-requisitos {: #checking-prerequisites }

--8<-- 'text/pt/node-operators/installing-docker.md'

--8<-- 'text/pt/node-operators/network-node/getting-specs-files.md'

--8<-- 'text/pt/node-operators/appchains-docker-data-directory.md'

## Extraindo a Imagem Docker {: #pulling-docker-image }

Duas imagens Docker são criadas e publicadas para cada versão: uma para appchains compatíveis com EVM e outra para appchains Substrate.

Essas imagens incluem todos os binários necessários para executar a versão estável mais recente do [nó cliente](/pt/learn/framework/architecture/#architecture){target=_blank}.

Puxe a imagem correspondente ao tipo de appchain que você deseja executar.

### Appchains compatíveis com EVM {: #pulling-evm-docker-image }

Se a appchain foi registrada escolhendo o modelo EVM ou enviando uma especificação personalizada compatível com EVM, execute:

=== "Tanssi MainNet"

    ```bash
    docker pull moondancelabs/container-chain-evm-template
    ```

=== "Dancelight TestNet"

    ```bash
    docker pull moondancelabs/container-chain-evm-template
    ```

O comando fará download e extração da imagem e exibirá o status após a execução:

--8<-- 'code/node-operators/network-node/rpc-docker/terminal/pulling-docker-image.md'

### Appchains Substrate Simples {: #pulling-substrate-docker-image }

Se a appchain foi registrada escolhendo o modelo Substrate básico ou enviando uma especificação personalizada Substrate, execute:

=== "Tanssi MainNet"

    ```bash
    docker pull moondancelabs/container-chain-simple-template
    ```

=== "Dancelight TestNet"

    ```bash
    docker pull moondancelabs/container-chain-simple-template
    ```

O comando fará download e extração da imagem e exibirá o status após a execução, semelhante ao exemplo anterior.

## Comando de Inicialização {: #start-up-command }

Para iniciar seu nó, execute a imagem Docker com `docker run`. Altere conforme necessário:

- `Arquivo de especificações da appchain` - substitua `INSERT_YOUR_APPCHAIN_SPECS_FILE` pelo nome do arquivo de specs baixado na etapa de [obtenção das especificações](#checking-prerequisites).
--8<-- 'text/pt/node-operators/network-node/bootnode-item.md'

=== "Tanssi MainNet"

    === "Appchain compatível com EVM"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        moondancelabs/container-chain-evm-template \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-mainnet.md'
        ```

    === "Appchain Substrate Simples"

        ```bash
        docker run --network="host" -v "/var/lib/tanssi-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        moondancelabs/container-chain-simple-template \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-mainnet.md'
        ```

=== "Dancelight TestNet"

    === "Appchain compatível com EVM"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        moondancelabs/container-chain-evm-template \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-testnet.md'
        ```

    === "Appchain Substrate Simples"

        ```bash
        docker run --network="host" -v "/var/lib/dancelight-data:/data" \
        -u $(id -u ${USER}):$(id -g ${USER}) \
        moondancelabs/container-chain-simple-template \
        --8<-- 'code/node-operators/network-node/rpc-docker/docker-command-testnet.md'
        ```

!!! nota
    Por padrão, apenas o estado histórico dos últimos 256 blocos finalizados é mantido. Para executar um nó de arquivo completo, defina a flag `--state-pruning archive`. Mais informações na [seção de sinalizadores](#run-flags).

--8<-- 'text/pt/node-operators/network-node/fetching-bootnode-section.md'

### Exemplo de Nó Completo para Demo EVM Appchain {: #example-demo-evm-appchain }

O exemplo abaixo inicia um nó RPC de arquivo completo para a [rede demo EVM](/pt/builders/tanssi-network/testnet/demo-evm-network/){target=_blank} implantada no Dancelight (ID `2001`). Assume que os arquivos de specs estão na pasta de dados.

=== "Demo EVM Appchain (Dancelight)"

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
    --unsafe-rpc-external \
    --bootnodes=/dns4/ukl-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWKDotMgTRpURvoZHsLWP4K9ymhkBByi1EJjMQAnCmqg8E \
    --bootnodes=/dns4/qco-dancelight-2001-rpc-1.rv.dancelight.tanssi.network/tcp/30333/p2p/12D3KooWB3kqqNhYgGtGbsdtgD18wUoFVeuXVXgWLXTFs91RNgAx \
    -- \
    --chain=/data/dancelight-raw-specs.json \
    --rpc-port=9945 \
    --name=relay \
    --sync=fast \
    --database=paritydb \
    --bootnodes=/dns4/qco-dancelight-boot-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWCekAqk5hv2fZprhqVz8povpUKdJEiHSd3MALVDWNPFzY \
    --bootnodes=/dns4/qco-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWEwhUb3tVR5VhRBEqyH7S5hMpFoGJ9Anf31hGw7gpqoQY \
    --bootnodes=/dns4/ukl-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWPbVtdaGhcuDTTQ8giTUtGTEcUVWRg8SDWGdJEeYeyZcT
    ```

### Executar Sinalizadores {: #run-flags }

As flags usadas no `docker run` podem ser ajustadas conforme suas preferências e hardware. Algumas das principais:

--8<-- 'text/pt/node-operators/network-node/run-flags.md'

=== "Appchain compatível com EVM"

    ```bash
    docker run -ti moondancelabs/container-chain-evm-template --help
    ```

=== "Appchain Substrate Simples"

    ```bash
    docker run -ti moondancelabs/container-chain-simple-template --help
    ```

## Sincronizando seu nó {: #syncing-your-node }

Após iniciar, o processo de sincronização exibirá muitos logs do nó e da appchain Tanssi. Alguns erros iniciais são esperados e desaparecem quando a cadeia alcança o último bloco.

--8<-- 'code/node-operators/terminal/syncing-process.md'

!!! nota
    A duração da sincronização é proporcional ao tamanho da cadeia que está sendo sincronizada.
