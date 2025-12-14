---
title: Usando o Substrate API Sidecar
description: Aprenda a usar o serviço REST baseado em Substrate com redes Tanssi para acessar blocos, saldo de contas, calcular gas usado e muito mais.
icon: octicons-code-24
categories: Substrate-Template
---

# Usando o Substrate API Sidecar

## Introdução {: #introduction }

O Substrate API Sidecar permite que aplicações acessem blocos, saldo de contas e outras informações de blockchains baseadas em Substrate por meio de uma API REST. Isso é útil para exchanges, carteiras ou outras aplicações que precisam acompanhar saldo e mudanças de estado em uma rede com tecnologia Tanssi. Esta página descreve como instalar e executar o Substrate API Sidecar para uma rede Tanssi e os endpoints mais usados.


## Instalando e Executando o Substrate API Sidecar {: #installing-and-running-substrate-api-sidecar }

Existem várias formas de instalar e executar o Substrate API Sidecar. Este guia descreve os passos para instalá-lo e executá-lo localmente via NPM. Para uso via Docker ou build e execução a partir do código-fonte, consulte o [repositório oficial do Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar#readme){target=\_blank}.

--8<-- 'text/pt/_common/general-js-tutorial-check.md'

### Instalando o Substrate API Sidecar {: #installing-the-substrate-api-sidecar }

Para instalar o serviço localmente no diretório atual, execute:

```bash
npm install @substrate/api-sidecar@{{ networks.mainnet.substrate_api_sidecar.stable_version }}
```

!!! note
    Se a pasta não tiver um projeto Node.js, crie manualmente `node_modules` com `mkdir node_modules`.

O Substrate API Sidecar v{{ networks.mainnet.substrate_api_sidecar.stable_version }} é a versão estável atual testada com redes Tanssi. Verifique a instalação a partir da raiz do diretório:

```bash
node_modules/.bin/substrate-api-sidecar --version
```

## Configurando o Substrate API Sidecar {: #setting-up-the-substrate-api-sidecar }

No terminal em que o Sidecar rodará, exporte a variável de ambiente com o endpoint WS da rede que deseja usar. Exemplos:

=== "Tanssi MainNet"

    ```bash
    export SAS_SUBSTRATE_URL=wss://{{ networks.mainnet.dns_name }}
    ```

=== "Dancelight TestNet"

    ```bash
    export SAS_SUBSTRATE_URL=wss://{{ networks.dancelight.dns_name }}
    ```

=== "Rede EVM de Demonstração"

    ```bash
    export SAS_SUBSTRATE_URL={{ networks.dancelight.demo_evm_rpc_wss_url }}
    ```

=== "Sua rede"

    ```bash
    export SAS_SUBSTRATE_URL=INSERIR_ENDPOINT_WSS_DA_REDE
    ```

Depois de definir, confirme com:

```bash
echo $SAS_SUBSTRATE_URL
```

Ele deve exibir o endpoint configurado.

## Executando o Substrate API Sidecar {: #running-substrate-api-sidecar }

Com a variável de ambiente configurada e a partir da raiz da instalação, execute:

```bash
node_modules/.bin/substrate-api-sidecar
```

Se a instalação e configuração estiverem corretas, verá uma saída semelhante a:

![Saída bem-sucedida](/images/builders/toolkit/substrate-api/libraries/sidecar-api/sidecar-1.webp)

## Endpoints do Substrate API Sidecar {: #substrate-api-sidecar-endpoints }

Endpoints comuns:

 - **GET /blocks/head** — bloco finalizado mais recente. O parâmetro opcional `finalized=false` retorna o bloco mais novo, possivelmente não finalizado
 - **GET /blocks/head/header** — cabeçalho do último bloco. `finalized=false` opcional
 - **GET /blocks/{blockId}** — bloco por altura ou hash
 - **GET /accounts/{accountId}/balance-info** — saldo e informações da conta
 - **GET /node/version** — implementação e versão do nó Substrate
 - **GET /runtime/metadata** — metadata do runtime em JSON decodificado

Para a lista completa, consulte a [documentação oficial](https://paritytech.github.io/substrate-api-sidecar/dist){target=\_blank}.

## Mapeamento de Campos no Objeto JSON do Bloco {: #fields-mapping-in-block-json-object }

O Sidecar retorna blocos em JSON. Parte do objeto é a estrutura aninhada das extrínsecas processadas em um bloco específico. Cada extrínseca chama um método de um módulo. Em linhas gerais, a estrutura é:

```text
RESPONSE JSON Block Object:
    |--extrinsics
        |--{extrinsic_number}
            |--method
                |--pallet: "MODULE_NAME"
                |--method: "METHOD_NAME"
            |--signature
            |--nonce
            |--args
                |--transaction
                    |--{transaction_type}
            |--hash
            |--events
                |--{event_number}
                    |--method
                        |--pallet: "MODULE_NAME"
                        |--method: "METHOD_EVENT_NAME"
                    |--data
                        |--0
                        |--1
                        |--2
                        |--3
    ...
```

Saber o módulo e método chamados permite extrair informações específicas (por exemplo, transferências de saldo).

## Mapeamento EVM em Blocos {: #evm-fields-mapping-in-block-json-object }

Para redes EVM da Tanssi, execuções EVM são identificadas por:

```text
{extrinsic_number}.method.pallet = "ethereum"
{extrinsic_number}.method.method = "transact"
```

Estrutura aninhada:

```text
RESPONSE JSON Block Object:
    |--extrinsics
        |--{extrinsic_number}
            |--method
                |--pallet: "ethereum"
                |--method: "transact"
            |--signature
            |--nonce
            |--args
                |--transaction
                    |--{transaction_type}
            |--hash
            |--events
                |--{event_number}
                    |--method
                        |--pallet: "ethereum"
                        |--method: "Executed"
                    |--data
                        |--0
                        |--1
                        |--2
                        |--3
    ...
```

Para transações Substrate, campos como “Nonce” e “Signature” ficam em:

```text
extrinsics[extrinsic_number]
```

### Tipos de Transação EVM e Payload {: #transaction-types-and-payload }

As redes EVM da Tanssi suportam `legacy`, `eip1559` e `eip2930`. Cada tipo contém o seguinte payload:

=== "EIP1559"

    ```text
        ...
        |--eip1559
            |--chainId
            |--nonce
            |--maxPriorityFeePerGas
            |--maxFeePerGas
            |--gasLimit
            |--action
            |--value
            |--input
            |--accessList
            |--oddYParity
            |--r
            |--s
        ...
    ```

=== "Legacy"

    ```text
        ...
        |--legacy
            |--nonce
            |--gasPrice
            |--gasLimit
            |--action
            |--value
            |--input
            |--signature
        ...
    ```

=== "EIP2930"

    ```text
        ...
        |--eip2930
            |--chainId
            |--nonce
            |--gasPrice
            |--gasLimit
            |--action
            |--value
            |--input
            |--accessList
            |--oddYParity
            |--r
            |--s
        ...
    ```

Para mais detalhes sobre [EIP1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} e [EIP2930](https://eips.ethereum.org/EIPS/eip-2930){target=\_blank}, veja as especificações oficiais.

### Mapeamento de Campos da Transação {: #transaction-field-mappings }

Para obter remetente, destinatário e hash EVM de qualquer transação, verifique o evento em que:

```text
{event_number}.method.pallet: "ethereum"
{event_number}.method.method: "Executed"
```

Mapeamentos:

=== "EIP1559"
    |       Campo EVM       |                               Campo JSON do bloco                               |
    |:---------------------:|:-------------------------------------------------------------------------------:|
    |       Chain ID        |        `extrinsics[extrinsic_number].args.transaction.eip1559.chainId`          |
    |         Nonce         |         `extrinsics[extrinsic_number].args.transaction.eip1559.nonce`           |
    | Max priority fee/gas  |  `extrinsics[extrinsic_number].args.transaction.eip1559.maxPriorityFeePerGas`  |
    |     Max fee per gas   |      `extrinsics[extrinsic_number].args.transaction.eip1559.maxFeePerGas`       |
    |       Gas limit       |        `extrinsics[extrinsic_number].args.transaction.eip1559.gasLimit`         |
    |      Access list      |       `extrinsics[extrinsic_number].args.transaction.eip1559.accessList`        |
    |       Assinatura      |     `extrinsics[extrinsic_number].args.transaction.eip1559.oddYParity/r/s`      |
    |  Endereço remetente   |          `extrinsics[extrinsic_number].events[event_number].data[0]`            |
    | Endereço destinatário |          `extrinsics[extrinsic_number].events[event_number].data[1]`            |
    |        Hash EVM       |          `extrinsics[extrinsic_number].events[event_number].data[2]`            |
    | Status de execução    |          `extrinsics[extrinsic_number].events[event_number].data[3]`            |

=== "Legacy"
    |    Campo EVM    |                         Campo JSON do bloco                          |
    |:---------------:|:--------------------------------------------------------------------:|
    |      Nonce      |   `extrinsics[extrinsic_number].args.transaction.legacy.nonce`       |
    |  Gas price      |  `extrinsics[extrinsic_number].args.transaction.legacy.gasPrice`     |
    |   Gas limit     |  `extrinsics[extrinsic_number].args.transaction.legacy.gasLimit`     |
    |      Valor      |   `extrinsics[extrinsic_number].args.transaction.legacy.value`       |
    |    Assinatura   | `extrinsics[extrinsic_number].args.transaction.legacy.signature`     |
    | Remetente EVM   |   `extrinsics[extrinsic_number].events[event_number].data[0]`        |
    | Destinatário EVM|   `extrinsics[extrinsic_number].events[event_number].data[1]`        |
    |     Hash EVM    |   `extrinsics[extrinsic_number].events[event_number].data[2]`        |
    | Status execução |   `extrinsics[extrinsic_number].events[event_number].data[3]`        |

=== "EIP2930"
    |     Campo EVM      |                            Campo JSON do bloco                             |
    |:------------------:|:--------------------------------------------------------------------------:|
    |      Chain ID      |    `extrinsics[extrinsic_number].args.transaction.eip2930.chainId`         |
    |        Nonce       |     `extrinsics[extrinsic_number].args.transaction.eip2930.nonce`          |
    |     Gas price      |    `extrinsics[extrinsic_number].args.transaction.eip2930.gasPrice`        |
    |     Gas limit      |    `extrinsics[extrinsic_number].args.transaction.eip2930.gasLimit`        |
    |       Valor        |     `extrinsics[extrinsic_number].args.transaction.eip2930.value`          |
    |    Access list     |   `extrinsics[extrinsic_number].args.transaction.eip2930.accessList`       |
    |     Assinatura     | `extrinsics[extrinsic_number].args.transaction.eip2930.oddYParity/r/s`     |
    | Remetente EVM      |      `extrinsics[extrinsic_number].events[event_number].data[0]`           |
    | Destinatário EVM   |      `extrinsics[extrinsic_number].events[event_number].data[1]`           |
    |     Hash EVM       |      `extrinsics[extrinsic_number].events[event_number].data[2]`           |
    | Status execução    |      `extrinsics[extrinsic_number].events[event_number].data[3]`           |

Para transações EVM, campos como “Nonce” e “Signature” ficam em:

```text
extrinsics[extrinsic_number].args.transaction[transaction_type]
```

Assim, “Nonce” e “Signature” no nível Substrate (`extrinsics[extrinsic_number]`) ficam `null`.

Uma transação EVM bem-sucedida retorna `succeed: "Stopped"` ou `succeed: "Returned"` no campo de status de execução EVM.

## Monitorar Transferências de Tokens {: #monitor-transfers }

Os trechos a seguir mostram como escutar transferências do token nativo enviadas via Substrate ou Ethereum API, e transferências de tokens ERC-20 via Ethereum API, usando o Substrate API Sidecar. Transferências pela Ethereum API se aplicam apenas a redes EVM da Tanssi.

### Transferências de Token Nativo {: #native-token-transfers }

Redes Tanssi EVM e não-EVM podem fazer transferências de saldo nativas baseadas em Substrate.

O snippet abaixo usa Axios para consultar o endpoint [`/blocks/head`](https://paritytech.github.io/substrate-api-sidecar/dist){target=\_blank} para o último bloco finalizado, e decodifica `from`, `to`, `value`, `tx hash` e `transaction status` de transferências nativas tanto no nível EVM quanto Substrate.

```typescript
--8<-- 'code/builders/toolkit/substrate-api/libraries/sidecar/sidecar-transfer.ts'
```

### Transferências de Tokens ERC-20 {: #erc-20-token-transfers }

Eventos emitidos por smart contracts (como um contrato ERC-20 implantado em redes EVM da Tanssi) podem ser decodificados a partir do JSON do bloco. A estrutura é:

```text
RESPONSE JSON Block Object:
    |--extrinsics
        |--{extrinsic_number}
            |--method
                |--pallet: "ethereum"
                |--method: "transact"
            |--signature:
            |--nonce:
            |--args
                |--transaction
                    |--{transaction_type}
            |--hash
            |--events
                |--{event_number}
                    |--method
                        |--pallet: "evm"
                        |--method: "Log"
                    |--data
                        |--0
                            |-- address
                            |-- topics
                                |--0
                                |--1
                                |--2
\t\t\t\t        |-- data
            ...
    ...

```

Transferências ERC-20 emitem o evento [`Transfer`](https://eips.ethereum.org/EIPS/eip-20){target=\_blank}, que pode ser decodificado assim:

|  Informação da tx   |                           Campo JSON do bloco                           |
|:-------------------:|:------------------------------------------------------------------------:|
| Endereço do contrato|  `extrinsics[extrinsic_number].events[event_number].data[0].address`    |
| Hash da assinatura  | `extrinsics[extrinsic_number].events[event_number].data[0].topics[0]`   |
| Endereço remetente  | `extrinsics[extrinsic_number].events[event_number].data[0].topics[1]`   |
| Endereço destinatário| `extrinsics[extrinsic_number].events[event_number].data[0].topics[2]`  |
|       Quantia       |   `extrinsics[extrinsic_number].events[event_number].data[0].data`      |

Outros eventos de contratos EVM podem ser decodificados de modo semelhante; o conteúdo de `topics` e `data` muda conforme a definição do evento.

!!! note
    A quantia transferida leva em conta as casas decimais e vem em hexadecimal.

## Taxas de Transação na Substrate API {: #substrate-api-transaction-fees }

Para redes Tanssi EVM e não-EVM, todas as informações sobre taxas de transações enviadas via Substrate API podem ser extraídas do endpoint:

```text
GET /blocks/{blockId}
```

Os endpoints de bloco retornam dados de um ou mais blocos. Saiba mais na [documentação oficial do Sidecar](https://paritytech.github.io/substrate-api-sidecar/dist/#operations-tag-blocks){target=\_blank}.

Lendo como JSON, para um `pallet` (módulo) e `method`, a taxa da transação vem de um evento com:

```text
{event_number}.method.pallet: "transactionPayment"
{event_number}.method.method: "TransactionFeePaid"
```

Estrutura relevante:

```text
RESPONSE JSON Block Object:
    ...
    |--number
    |--extrinsics
        |--{extrinsic_number}
            |--method
            |--signature
            |--nonce
            |--args
            |--tip
            |--hash
            |--info
            |--era
            |--events
                |--{event_number}
                    |--method
                        |--pallet: "transactionPayment"
                        |--method: "TransactionFeePaid"
                    |--data
                        |--0
                        |--1
                        |--2
    ...

```

Mapeamento:

| Informação da tx |                      Campo JSON do bloco                       |
|:----------------:|:--------------------------------------------------------------:|
| Conta que paga   | `extrinsics[extrinsic_number].events[event_number].data[0]`    |
| Taxas totais     | `extrinsics[extrinsic_number].events[event_number].data[1]`    |
| Gorjeta (tip)    | `extrinsics[extrinsic_number].events[event_number].data[2]`    |

A taxa total paga para a extrínseca está em:

```text
extrinsics[extrinsic_number].events[event_number].data[1]
```


## Taxas de Transação na Ethereum API {: #ethereum-api-transaction-fees }

Para redes EVM da Tanssi, usuários também podem enviar fundos via Ethereum API. Para calcular a taxa de uma transação Ethereum, use:

=== "EIP-1559"

    ```text
    GasPrice = BaseFee + MaxPriorityFeePerGas < MaxFeePerGas ?
                BaseFee + MaxPriorityFeePerGas : 
                MaxFeePerGas;
    Transaction Fee = (GasPrice * TransactionWeight) / 25000
    ```

=== "Legacy"

    ```text
    Transaction Fee = (GasPrice * TransactionWeight) / 25000
    ```

=== "EIP-2930"

    ```text
    Transaction Fee = (GasPrice * TransactionWeight) / 25000
    ```

As seções a seguir detalham cada componente.

### Base Fee {: #base-fee }

A `BaseFee` é o valor mínimo cobrado para enviar uma transação e é definida pela rede. Foi introduzida na [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank}. Redes EVM da Tanssi usam um mecanismo dinâmico semelhante ao da EIP-1559, ajustando a base fee conforme congestionamento.

No template EVM da Tanssi, a gas price mínima é `1 GWei`.

A `BaseFee` pode ser obtida em `baseFeePerGas` do módulo `baseFee`:

```text
GET /pallets/baseFee/storage/baseFeePerGas?at={blockId}
```

Estrutura relevante:

```text
RESPONSE JSON Storage Object:
    |--at
        |--hash
        |--height
    |--pallet
    |--palletIndex
    |--storageItem
    |--keys
    |--value
```

O valor está em `value` (fixed point); divida pelas casas decimais para obter o valor real.

### GasPrice, MaxFeePerGas e MaxPriorityFeePerGas {: #gasprice-maxfeepergas-maxpriorityfeepergas }

`GasPrice` define o gas price em transações legacy (pré‑EIP-1559). `MaxFeePerGas` e `MaxPriorityFeePerGas` foram introduzidos com a EIP-1559 junto da `BaseFee`. `MaxFeePerGas` define a taxa máxima por unidade de gas (BaseFee + MaxPriorityFeePerGas). `MaxPriorityFeePerGas` é a gorjeta máxima configurada para priorizar a transação.

Embora redes EVM da Tanssi sejam compatíveis com Ethereum, são cadeias Substrate, e prioridades funcionam de forma diferente: no Substrate transações não são priorizadas por gas price. O Tanssi usa um sistema de priorização ajustado que reordena transações Substrate com base na taxa por gas (derivada de tip e weight). Para transações Ethereum, a prioridade é definida pela priority fee.

Nota: prioridade não é o único fator para ordenar transações; longevidade também influencia.

Os valores de `GasPrice`, `MaxFeePerGas` e `MaxPriorityFeePerGas` podem ser lidos do JSON do bloco conforme descrito em [Mapeamento EVM](#evm-fields-mapping-in-block-json-object).

Os dados de uma transação Ethereum em um bloco podem ser obtidos de:

```text
GET /blocks/{blockId}
```

Trajetos relevantes:

=== "EIP1559"
    |      Campo EVM       |                               Campo JSON                               |
    |:--------------------:|:---------------------------------------------------------------------:|
    |     MaxFeePerGas     |     `extrinsics[extrinsic_number].args.transaction.eip1559.maxFeePerGas`     |
    | MaxPriorityFeePerGas | `extrinsics[extrinsic_number].args.transaction.eip1559.maxPriorityFeePerGas` |

=== "Legacy"
    | Campo EVM |                        Campo JSON                         |
    |:---------:|:---------------------------------------------------------:|
    | GasPrice  | `extrinsics[extrinsic_number].args.transaction.legacy.gasPrice` |

=== "EIP2930"
    | Campo EVM |                         Campo JSON                         |
    |:---------:|:----------------------------------------------------------:|
    | GasPrice  | `extrinsics[extrinsic_number].args.transaction.eip2930.gasPrice` |

### Transaction Weight {: #transaction-weight }

`TransactionWeight` mede o tempo de execução de uma transação no bloco. Para todos os tipos, pode ser obtido no evento da extrínseca em que:

```text
pallet: "system", method: "ExtrinsicSuccess"
```

E então `TransactionWeight` está em:

```text
extrinsics[extrinsic_number].events[event_number].data[0].weight
```

--8<-- 'text/_disclaimers/third-party-content.md'
