---
title: Customizando as Especificações da Cadeia
description: Revise as seções e atributos de um arquivo de especificação de cadeia e como obtê-lo para lançar sua rede com tecnologia Tanssi com uma especificação personalizada.
icon: octicons-link-24
categories: Appchain
---

# Customizando as Especificações da Cadeia {: #customizing-chain-specifications }

## Introdução {: #introduction }

A especificação da cadeia refere-se a um conjunto de parâmetros e configurações que definem as características e o comportamento de uma nova rede com tecnologia Tanssi. Ela define as configurações e o estado iniciais sobre os quais todos os nós participantes da rede devem concordar para alcançar o consenso e produzir blocos. Muitas configurações iniciais não podem ser alteradas após o lançamento da rede sem gerar uma cadeia completamente diferente.

A especificação contém duas seções principais:

- **The client specification** - inclui os parâmetros de rede, por exemplo, os nós de inicialização com os quais o cliente se conecta ao ingressar na rede
- **The client specification** - representa o estado inicial em que todas as transações e transições de estado ocorrem. Inclui detalhes como as contas registradas iniciais e seus saldos, bem como a conta com privilégios de administrador (sudo, se aplicável), entre outras informações relevantes

Essas informações que a especificação da cadeia contém podem ser armazenadas em um arquivo Rust (que pode ser encontrado nos [templates](/pt/builders/build/templates/overview/){target=\_blank} incluídos no repositório Tanssi) ou em um arquivo JSON.

Este artigo aborda as seções e atributos dentro de um arquivo de especificação de cadeia e explica como obtê-lo, caso você queira lançar sua rede Tanssi carregando um arquivo de especificações personalizadas.

!!! nota "Nota do Editor (Atualização de 2025)"
    Este guia explica como personalizar os arquivos de especificação da cadeia em redes baseadas em Substrate. Alguns campos (por exemplo, cadeia de retransmissão, ID da parachain) vêm do SDK do Substrate e são incluídos para fins de compatibilidade ou modelo.

    Esses atributos não significam que uma rede com tecnologia Tanssi é uma parachain Polkadot. Tanssi é um protocolo de infraestrutura de appchain independente, construído com Substrate e alinhado com a segurança apoiada pelo Ethereum. Você pode encontrar termos relacionados ao Polkadot em arquivos de configuração por causa das origens compartilhadas do Substrate, mas as appchains com tecnologia Tanssi não exigem slots Polkadot ou mecânica de cadeia de retransmissão.

## A Especificação do Cliente {: #client-specification }

A especificação do cliente contém a configuração da rede e outras configurações (excluindo as relacionadas ao estado do tempo de execução):

- **Name** - nome para as especificações
- **Id** - um ID simples exclusivo para a rede usado para definir o caminho de armazenamento no nó
- **Fork ID** - parâmetro opcional para um identificador de fork de rede
- **Chain type** - um parâmetro que pode ser definido para definir o tipo de cadeia e exibir informações adicionais ou habilitar recursos adicionais (pode ser definido como Desenvolvimento, Local, Live ou um tipo personalizado)
- **Boot Nodes** - conjunto de nós de inicialização que serão usados ​​quando o novo nó entrar na rede e sincronizar
- **Telemetry Endpoints** - uma lista opcional de endpoints para enviar informações e monitorar a operação da rede
- **Protocol ID** - um nome exclusivo que define o protocolo de rede
- **Relay Chain** - define a ID da cadeia de orquestração com a qual a rede Tanssi interage
- **Parachain ID** - define uma ID exclusiva que identifica a rede Tanssi
- **Code Substitutes** - um recurso de emergência para substituir o tempo de execução quando uma rede Tanssi não consegue executar uma atualização de tempo de execução
- **Properties** - propriedades chave-valor que podem ser personalizadas e são úteis para melhorar a experiência do usuário

No atributo `properties`, as seguintes configurações são usadas por várias bibliotecas front-end, incluindo a [API Polkadot.js](/pt/builders/toolkit/substrate-api/libraries/polkadot-js-api/){target=\_blank}:

- **Símbolo do Token** - um nome para o símbolo do token da sua própria rede Tanssi
- **Formato SS58** - um inteiro que identifica exclusivamente as contas em sua rede. A [codificação SS58](https://docs.polkadot.com/polkadot-protocol/parachain-basics/accounts/#address-formats){target=\_blank} transforma a conta subjacente de 32 bytes em uma representação específica da rede. Este atributo não se aplica nem interfere nas contas Ethereum ECDSA em redes compatíveis com EVM
- **Decimais do Token** - representam o quão divisível um token pode ser e qual é a menor representação do token. Ele é definido como `18` para redes compatíveis com EVM
- **É Ethereum** - um booleano que identifica a rede como compatível com EVM ou não

## O Estado da Gênese {: #genesis-state }

Todos os sequenciadores atribuídos à rede Tanssi devem concordar com o estado inicial para que possam executar as extrínsecas de entrada, chegar aos mesmos resultados e, finalmente, chegar a um consenso sobre o novo estado válido.

Este estado da gênese definirá o ponto de partida da rede Tanssi. Ele inclui um valor inicial para os elementos que os módulos incluídos no tempo de execução precisam persistir e o código Wasm inicial do tempo de execução, que é armazenado na cadeia.

Por exemplo, nos modelos incluídos, a especificação da cadeia define as contas iniciais e os saldos de tokens no módulo `Balances`. Além disso, o template também tem uma conta sudo (que **deve ser modificado**) para o módulo `Sudo`, que fornece privilégios exclusivos à conta fornecida, e que pode ser removido assim que um módulo de democracia na cadeia for conectado.

## Gerando um Arquivo de Especificação de Cadeia JSON {: #generating-json-chain-specs}

Os seguintes comandos construirão e gerarão a especificação da cadeia para o modelo compatível com EVM com base na configuração expressa em `chain_spec.rs`, localizado em `*/container-chains/templates/frontier/node/src/chain_spec.rs`. Este exemplo pode ser adaptado a qualquer outro modelo ou tempo de execução personalizado.

Para construir e gerar as especificações da cadeia, siga estas etapas:

1. Clone o código Tanssi hospedado no GitHub

    ```bash
    git clone https://github.com/moondance-labs/tanssi
    ```

2. Entre na pasta do projeto

    ```bash
    cd tanssi
    ```

3. Construa o modelo da rede compatível com EVM Tanssi

    ```bash
    cargo build -p container-chain-frontier-node --release
    ```

   Esta etapa é bastante detalhada e pode levar um tempo para ser concluída. A captura de tela a seguir mostra o terminal após concluir com sucesso o processo de construção (observe que o tempo de conclusão é superior a 35 minutos):

   ![Criando o modelo](/images/builders/build/customize/customizing-chain-specs/customizing-chain-specs-1.webp)

4. Gerar a especificação da cadeia

    ```bash
    ./target/release/container-chain-frontier-node \
        build-spec > chain_spec.json
    ```

Após executar a última etapa, o terminal exibe apenas uma linha de log:

![Gerando a especificação da cadeia](/images/builders/build/customize/customizing-chain-specs/customizing-chain-specs-2.webp)

E agora o arquivo `chain_spec.json` contendo a especificação do cliente e o estado da gênese é criado na pasta atual.

!!! nota
    As especificações da cadeia JSON podem ser geradas em duas versões diferentes: a legível por humanos, que é a gerada seguindo as etapas anteriores, e a versão bruta, que é a necessária para implantar a rede por meio do Tanssi. Mais sobre como gerar a versão bruta [posteriormente](#generating-raw-specs-file) neste artigo.

### Editando o arquivo de especificação da cadeia JSON {: #editing-json-chain-specs }

O arquivo `chain_spec.json` gerado reflete os parâmetros definidos no arquivo de especificações da cadeia Rust. Sendo um arquivo JSON, é fácil de ler e, caso algum parâmetro precise ser alterado, fácil de editar.

Por exemplo, o seguinte trecho de código mostra alguns dos atributos das especificações do cliente:

```json
{
    // Define o nome da especificação desta rede
    "name": "Rede Frontier 1000",
    // Defina um ID para as especificações desta rede
    "id": "frontier_network_1000",
    // A rede estará ativa
    "chainType": "Live",
    "bootNodes": [
        // nós de inicialização serão adicionados automaticamente durante a implantação
    ],
    // Atributo opcional, o padrão é nulo
    "telemetryEndpoints": null,
    // Defina um identificador de protocolo para esta rede
    "protocolId": "network-chain-1000",
    // Defina propriedades para definir o token e a compatibilidade com ethereum
    "properties": {
        "isEthereum": true,
        "ss58Format": 42,
        "tokenDecimals": 18,
        "tokenSymbol": "UNIT"
    },
    // Defina a cadeia de retransmissão stagenet
    "relay_chain": "westend_moonbase_relay_stagenet",
    // Defina o ID da parachain reservado na cadeia de retransmissão
    "para_id": 3333,
    // Sem necessidade
    "codeSubstitutes": {},
    "genesis": { 
        ... 
    }
}
```

A outra seção importante do arquivo está dentro do atributo `genesis`, que contém o estado da gênese. No seguinte trecho JSON, os valores e a configuração padrão para alguns módulos são apresentados como exemplo:

```json
{
    ...
    "genesis": {
        "runtime": {
            ...
            // Define a conta que terá privilégios sudo
            "sudo": {
                "key": "0xf24ff3a9cf04c71dbc94d0b566cac"
            },
            // Define os saldos iniciais para algumas contas
            "balances": {
                "balances": [
                [
                    "0x3cd0a705a2dc65e5b1e1205896baa2be8a07c6e0",
                    1208925819614629174706176
                ],
                [
                    "0x773539d4ac0e786233d90a233654ccee26a613d9",
                    1208925819614629174706176
                ],
                [
                    "0x798d4ba9baf0064ec19eb4f0a1a45785ae9d6dfc",
                    1208925819614629174706176
                ],
                [
                    "0xf24ff3a9cf04c71dbc94d0b566cac",
                    1208925819614629174706176
                ]
                ]
            },
            // Define os saldos para as contas EVM
            "evm": {
                "accounts": {
                "0x1000000000000000000000000000000000000001": {
                    "nonce": "0x1",
                    "balance": "0xd3c21bcecceda1000000",
                    "storage": {},
                    "code": [
                    0
                    ]
                },
                "0x6be02d1d3665660d22ff9624b7be0551ee1ac91b": {
                    "nonce": "0x0",
                    "balance": "0xffffffffffffffffffffffffffffffff",
                    "storage": {},
                    "code": []
                },
                "0xd43593c715fdd31c61141abd04a99fd6822c8558": {
                    "nonce": "0x0",
                    "balance": "0xffffffffffffffffffffffffffffffff",
                    "storage": {},
                    "code": []
                }
                }
            },
        }
    }
    ...
}
```

Um exemplo de um atributo não editável manualmente é o tempo de execução Wasm (na seção de estado da gênese), que é uma representação hexadecimal de um blob binário gerado pelo compilador. Ainda assim, além disso, a maioria das propriedades são fáceis de editar antes de iniciar a rede.

## Gerando um arquivo de especificação de cadeia JSON bruto {: #generating-raw-specs-file }

Uma etapa final antes de implantar a rede Tanssi é converter o arquivo de especificação JSON em um formato bruto, que é uma versão compacta e menos legível do mesmo arquivo, necessária para inicializar um nó.

Depois de passar pelas [etapas para gerar o arquivo de especificação da cadeia JSON](#generating-json-chain-specs) e editar seus valores, o seguinte comando converterá o arquivo de especificações da cadeia no formato bruto necessário:

```bash
./target/release/container-chain-frontier-node \
    build-spec --chain=chain_spec.json --raw > raw_chain_spec.json
```

Agora que este arquivo foi configurado e personalizado e está no formato JSON bruto correto, ele pode ser carregado para inicializar uma nova rede no Tanssi.
