---
title: Usando o Substrate API Sidecar
description: Aprenda a usar o serviço REST baseado em Substrate com redes Tanssi para acessar blocos, saldos, metadados, taxas e transações EVM/Substrate.
icon: octicons-code-24
categories: Substrate-Template
---

# Usando o Substrate API Sidecar

## Introdução {: #introduction }

O Substrate API Sidecar permite que aplicações acessem blocos, saldos de contas e outras informações de blockchains baseadas em Substrate por meio de uma API REST. Isso é útil para exchanges, carteiras ou outras aplicações que precisam acompanhar saldos e mudanças de estado em uma rede com Tanssi. Esta página descreve como instalar e executar o Sidecar para uma rede Tanssi e os endpoints mais usados.

## Instalando e executando o Substrate API Sidecar {: #installing-and-running-substrate-api-sidecar }

Há várias formas de instalar e executar o Sidecar. Aqui usamos a instalação local via NPM. Para uso com Docker, ou build a partir do código‑fonte, consulte o [repositório oficial](https://github.com/paritytech/substrate-api-sidecar#readme).

--8<-- 'text/pt/_common/general-js-tutorial-check.md'

### Instalando o Substrate API Sidecar {: #installing-the-substrate-api-sidecar }

Para instalar o serviço localmente no diretório atual, execute:

```bash
npm install @substrate/api-sidecar@{{ networks.mainnet.substrate_api_sidecar.stable_version }}
```

!!! nota
    Se a pasta não tiver um projeto Node.js, crie manualmente `node_modules` com `mkdir node_modules`.

A versão estável v{{ networks.mainnet.substrate_api_sidecar.stable_version }} foi testada com redes Tanssi. Verifique a instalação a partir da raiz do diretório:

```bash
node_modules/.bin/substrate-api-sidecar --version
```

## Configurando o Substrate API Sidecar {: #setting-up-the-substrate-api-sidecar }

No terminal em que o Sidecar rodará, exporte a variável de ambiente com o endpoint WSS da rede que deseja usar:

=== "Tanssi MainNet"

    ```bash
    export SAS_SUBSTRATE_URL=wss://{{ networks.mainnet.dns_name }}
    ```

=== "Dancelight TestNet"

    ```bash
    export SAS_SUBSTRATE_URL=wss://{{ networks.dancelight.dns_name }}
    ```

=== "Demo EVM Network"

    ```bash
    export SAS_SUBSTRATE_URL={{ networks.dancelight.demo_evm_rpc_wss_url }}
    ```

=== "Sua rede"

    ```bash
    export SAS_SUBSTRATE_URL=INSIRA_ENDPOINT_WSS_DA_REDE
    ```

Após definir, confirme com:

```bash
echo $SAS_SUBSTRATE_URL
```

Ele deve exibir o endpoint configurado.

## Executando o Substrate API Sidecar {: #running-substrate-api-sidecar }

Com a variável de ambiente definida, a partir da raiz da instalação, execute:

```bash
node_modules/.bin/substrate-api-sidecar
```

Se a instalação e configuração estiverem corretas, verá uma saída semelhante a:

![Successful Output](/images/builders/toolkit/substrate-api/libraries/sidecar-api/sidecar-1.webp)

## Endpoints do Substrate API Sidecar {: #substrate-api-sidecar-endpoints }

Alguns endpoints comuns:

 - **GET /blocks/head** — bloco finalizado mais recente. O parâmetro opcional `finalized=false` retorna o bloco mais novo, possivelmente não finalizado
 - **GET /blocks/head/header** — cabeçalho do último bloco. `finalized=false` opcional
 - **GET /blocks/{blockId}** — bloco por altura ou hash
 - **GET /accounts/{accountId}/balance-info** — saldo e info da conta
 - **GET /node/version** — implementação e versão do nó
 - **GET /runtime/metadata** — metadata do runtime em JSON decodificado

Para a lista completa, consulte a [documentação oficial](https://paritytech.github.io/substrate-api-sidecar/dist).

## Mapeamento de campos em blocos {: #fields-mapping-in-block-json-object }

O Sidecar retorna blocos em JSON. Parte do objeto é a estrutura aninhada das extrínsecas processadas:

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

Assim, saber o módulo e método chamados permite extrair informações específicas (por exemplo, transferências de saldo).

## Mapeamento EVM em blocos {: #evm-fields-mapping-in-block-json-object }

Para redes EVM do Tanssi, as execuções EVM são identificadas por:

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

### Tipos de transação EVM e payload {: #transaction-types-and-payload }

As redes EVM do Tanssi suportam `legacy`, `eip1559` e `eip2930`. Cada tipo contém o seguinte payload:

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

Para mais detalhes sobre [EIP1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} e [EIP2930](https://eips.ethereum.org/EIPS/eip-2930){target=\_blank}, consulte as especificações oficiais.

### Mapeamento de campos da transação {: #transaction-field-mappings }

Para obter remetente, destinatário e hash EVM de qualquer transação, verifique o evento com:

```text
{event_number}.method.pallet: "ethereum"
{event_number}.method.method: "Executed"
```

Mapeamentos:

=== "EIP1559"
    |        Campo EVM         |                               Campo JSON do bloco                               |
    |:------------------------:|:-------------------------------------------------------------------------------:|
    |         Chain ID         |        `extrinsics[extrinsic_number].args.transaction.eip1559.chainId`          |
    |          Nonce           |         `extrinsics[extrinsic_number].args.transaction.eip1559.nonce`           |
    | Max priority fee per gas |  `extrinsics[extrinsic_number].args.transaction.eip1559.maxPriorityFeePerGas`  |
    |     Max fee per gas      |      `extrinsics[extrinsic_number].args.transaction.eip1559.maxFeePerGas`       |
    |        Gas limit         |        `extrinsics[extrinsic_number].args.transaction.eip1559.gasLimit`         |
    |       Access list        |       `extrinsics[extrinsic_number].args.transaction.eip1559.accessList`        |
    |        Signature         |     `extrinsics[extrinsic_number].args.transaction.eip1559.oddYParity/r/s`      |
    |      Endereço remetente  |          `extrinsics[extrinsic_number].events[event_number].data[0]`            |
    |    Endereço destinatário |          `extrinsics[extrinsic_number].events[event_number].data[1]`            |
    |         Hash EVM         |          `extrinsics[extrinsic_number].events[event_number].data[2]`            |
    |   Status da execução EVM |          `extrinsics[extrinsic_number].events[event_number].data[3]`            |

=== "Legacy"
    |    Campo EVM    |                         Campo JSON do bloco                          |
    |:---------------:|:--------------------------------------------------------------------:|
    |      Nonce      |    `extrinsics[extrinsic_number].args.transaction.legacy.nonce`     |
    |    Gas price    |   `extrinsics[extrinsic_number].args.transaction.legacy.gasPrice`   |
    |    Gas limit    |   `extrinsics[extrinsic_number].args.transaction.legacy.gasLimit`   |
    |      Value      |    `extrinsics[extrinsic_number].args.transaction.legacy.value`     |
    |    Signature    |  `extrinsics[extrinsic_number].args.transaction.legacy.signature`   |
    | Endereço remetente |   `extrinsics[extrinsic_number].events[event_number].data[0]`    |
    | Endereço destinatário | `extrinsics[extrinsic_number].events[event_number].data[1]`   |
    |     Hash EVM    |   `extrinsics[extrinsic_number].events[event_number].data[2]`       |
    | Status execução |   `extrinsics[extrinsic_number].events[event_number].data[3]`       |

=== "EIP2930"
    |    Campo EVM    |                             Campo JSON do bloco                             |
    |:---------------:|:---------------------------------------------------------------------------:|
    |     Chain ID    |     `extrinsics[extrinsic_number].args.transaction.eip2930.chainId`        |
    |      Nonce      |      `extrinsics[extrinsic_number].args.transaction.eip2930.nonce`         |
    |    Gas price    |     `extrinsics[extrinsic_number].args.transaction.eip2930.gasPrice`       |
    |    Gas limit    |     `extrinsics[extrinsic_number].args.transaction.eip2930.gasLimit`       |
    |      Value      |      `extrinsics[extrinsic_number].args.transaction.eip2930.value`         |
    |   Access list   |    `extrinsics[extrinsic_number].args.transaction.eip2930.accessList`      |
    |    Signature    |  `extrinsics[extrinsic_number].args.transaction.eip2930.oddYParity/r/s`    |
    | Endereço remetente |   `extrinsics[extrinsic_number].events[event_number].data[0]`           |
    | Endereço destinatário | `extrinsics[extrinsic_number].events[event_number].data[1]`          |
    |     Hash EVM    |   `extrinsics[extrinsic_number].events[event_number].data[2]`              |
    | Status execução |   `extrinsics[extrinsic_number].events[event_number].data[3]`              |

Para transações EVM, “Nonce” e “Signature” ficam em:

```text
extrinsics[extrinsic_number].args.transaction[transaction_type]
```

Logo, os campos “Nonce” e “Signature” no nível Substrate (`extrinsics[extrinsic_number]`) ficam como `null`.

Uma transação EVM bem-sucedida retorna `succeed: "Stopped"` ou `succeed: "Returned"` no campo de status de execução.

## Monitorar transferências de saldo {: #monitor-transfers }

Os exemplos a seguir mostram como ouvir transferências do token nativo (enviadas via Substrate ou Ethereum API) e transferências de tokens ERC-20 via Ethereum API usando o Sidecar. Transferências via Ethereum API se aplicam apenas às redes EVM do Tanssi.

### Transferências de token nativo {: #native-token-transfers }

Redes Tanssi EVM e não‑EVM podem fazer transferências nativas via Substrate. O snippet abaixo usa Axios para consultar [`/blocks/head`](https://paritytech.github.io/substrate-api-sidecar/dist){target=\_blank} e decodifica `from`, `to`, `value`, `tx hash` e `status` de transferências nativas tanto no nível EVM quanto Substrate:

```typescript
--8<-- 'code/builders/toolkit/substrate-api/libraries/sidecar/sidecar-transfer.ts'
```

### Transferências de tokens ERC-20 {: #erc-20-token-transfers }

Eventos emitidos por contratos ERC-20 em redes EVM do Tanssi podem ser decodificados do JSON de bloco. Estrutura:

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
                            |-- data
            ...
    ...
```

Transferências ERC-20 emitem o evento [`Transfer`](https://eips.ethereum.org/EIPS/eip-20){target=\_blank}, mapeado como:

| Informação da Tx |                               Campo JSON                               |
|:----------------:|:----------------------------------------------------------------------:|
| Contrato ERC-20  |  `extrinsics[extrinsic_number].events[event_number].data[0].address`   |
| Assinatura do evento | `extrinsics[extrinsic_number].events[event_number].data[0].topics[0]` |
| Remetente        | `extrinsics[extrinsic_number].events[event_number].data[0].topics[1]`  |
| Destinatário     | `extrinsics[extrinsic_number].events[event_number].data[0].topics[2]`  |
| Valor            |   `extrinsics[extrinsic_number].events[event_number].data[0].data`     |

Outros eventos EVM podem ser decodificados de forma semelhante; tópicos e dados variam conforme o evento.

!!! nota
    O valor transferido considera decimais e está em formato hexadecimal.

## Taxas de transação (Substrate) {: #substrate-api-transaction-fees }

Para redes Tanssi EVM e não‑EVM, informações de taxa de transações enviadas via Substrate API podem ser extraídas de:

```text
GET /blocks/{blockId}
```

Os endpoints de bloco retornam dados relevantes para um ou mais blocos; veja mais na [documentação do Sidecar](https://paritytech.github.io/substrate-api-sidecar/dist/#operations-tag-blocks){target=\_blank}.

Como JSON, para `pallet` e `method` específicos, a taxa é fornecida por um evento:

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

| Informação da Tx |                      Campo JSON                       |
|:----------------:|:------------------------------------------------------:|
| Conta que paga   | `extrinsics[extrinsic_number].events[event_number].data[0]` |
| Taxa total paga  | `extrinsics[extrinsic_number].events[event_number].data[1]` |
| Gorjeta          | `extrinsics[extrinsic_number].events[event_number].data[2]` |

A taxa total para a extrínseca está em:

```text
extrinsics[extrinsic_number].events[event_number].data[1]
```

## Taxas de transação (API Ethereum) {: #ethereum-api-transaction-fees }

Em redes EVM do Tanssi, usuários podem enviar transações via API Ethereum. As taxas podem ser calculadas assim:

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

### Base Fee {: #base-fee}

A `BaseFee` é o valor mínimo cobrado para enviar uma transação, introduzida pela [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank}. Redes EVM do Tanssi ajustam a base fee dinamicamente, de forma semelhante ao mecanismo da EIP-1559, conforme congestionamento do bloco. No template EVM do Tanssi, a gas price mínima é `1 GWei`.

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

`GasPrice` especifica o gas price em transações legacy (pré‑EIP-1559). `MaxFeePerGas` e `MaxPriorityFeePerGas` foram introduzidos com a EIP-1559 juntamente com a `BaseFee`. `MaxFeePerGas` define a taxa máxima por unidade de gas (soma de BaseFee + MaxPriorityFeePerGas). `MaxPriorityFeePerGas` é a gorjeta máxima configurada para priorizar a transação.

Embora redes EVM do Tanssi sejam compatíveis com Ethereum, são cadeias Substrate, e prioridades funcionam de forma diferente: no Substrate as transações não são priorizadas por gas price. O Tanssi usa um sistema de priorização ajustado que reordena transações Substrate com base na taxa por gas (derivada de tip e weight). Para transações Ethereum, a prioridade é definida pela priority fee.

Nota: prioridade não é o único fator para ordenar transações; longevidade também influencia.

Os valores de `GasPrice`, `MaxFeePerGas` e `MaxPriorityFeePerGas` podem ser lidos do JSON do bloco conforme a estrutura descrita em [Mapeamento EVM](#evm-fields-mapping-in-block-json-object).

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

### Transaction Weight {: #transaction-weight}

`TransactionWeight` mede o tempo de execução de uma transação no bloco. Para todos os tipos, pode ser obtido no evento da extrínseca onde:

```text
pallet: "system", method: "ExtrinsicSuccess"
```

E então o `TransactionWeight` está em:

```text
extrinsics[extrinsic_number].events[event_number].data[0].weight
```

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
