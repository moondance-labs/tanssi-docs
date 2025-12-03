---
title: Usando Substrate API Sidecar
description: Use o serviço REST baseado em Substrate com redes Tanssi para acessar blocos, saldo de contas, taxas e transações EVM/Substrate.
icon: octicons-code-24
categories: Substrate-Template
---

# Usando Substrate API Sidecar

## Introdução {: #introduction }

Substrate API Sidecar expõe uma API REST para blocos, saldos e metadados em redes Substrate, útil para exchanges, carteiras e monitoramento de estado em redes Tanssi.

## Instalação e execução {: #installing-and-running-substrate-api-sidecar }

Instale via NPM no diretório atual:

```bash
npm install @substrate/api-sidecar@{{ networks.mainnet.substrate_api_sidecar.stable_version }}
```

Verifique a versão:

```bash
node_modules/.bin/substrate-api-sidecar --version
```

--8<-- 'text/_common/pt/general-js-tutorial-check.md'

### Configurar o endpoint {: #setting-up-the-substrate-api-sidecar }

Defina o WS da sua rede:

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
export SAS_SUBSTRATE_URL=INSIRA_WSS
```

### Executar {: #running-substrate-api-sidecar }

```bash
node_modules/.bin/substrate-api-sidecar
```

Saída esperada: serviço ouvindo em `127.0.0.1:8080`.

## Endpoints úteis {: #substrate-api-sidecar-endpoints }

- `GET /blocks/head` — bloco finalizado mais recente (ou mais novo se `finalized=false`)  
- `GET /blocks/head/header` — cabeçalho do último bloco  
- `GET /blocks/{blockId}` — bloco por altura ou hash  
- `GET /accounts/{accountId}/balance-info` — saldo da conta  
- `GET /node/version` — versão do nó  
- `GET /runtime/metadata` — metadados em JSON

Lista completa: [documentação oficial](https://paritytech.github.io/substrate-api-sidecar/dist).

## Mapeamento de campos em blocos {: #fields-mapping-in-block-json-object }

Blocos vêm como JSON, com extrínsecas e eventos aninhados. Para uma extrínseca:

```text
extrinsics[{i}].method.pallet
extrinsics[{i}].method.method
extrinsics[{i}].events[{j}].method.pallet
extrinsics[{i}].events[{j}].method.method
```

### Extrínsecas EVM {: #evm-fields-mapping-in-block-json-object }

Transações EVM aparecem como:

```text
extrinsics[{i}].method.pallet = "ethereum"
extrinsics[{i}].method.method = "transact"
```

O evento de execução EVM:

```text
events[{j}].method.pallet = "ethereum"
events[{j}].method.method = "Executed"
```

### Tipos de transação EVM {: #transaction-types-and-payload }

`transaction` pode ser `legacy`, `eip1559` ou `eip2930`, com campos como `gasPrice`, `maxFeePerGas`, `maxPriorityFeePerGas`, `gasLimit`, `value`, `input`, `r/s` etc.

### Campos principais EVM {: #transaction-field-mappings }

Exemplos de caminhos:

- Remetente/destinatário/hash/status (evento Executed):  
  `extrinsics[i].events[j].data[0..3]`
- EIP-1559 fees:  
  `extrinsics[i].args.transaction.eip1559.maxFeePerGas`  
  `extrinsics[i].args.transaction.eip1559.maxPriorityFeePerGas`
- Legacy/EIP-2930 `gasPrice`:  
  `extrinsics[i].args.transaction.legacy.gasPrice` / `.eip2930.gasPrice`

## Monitorar transferências {: #monitor-transfers }

### Token nativo

Exemplo com Axios lendo `/blocks/head` e extraindo transferências (Substrate e EVM):

```typescript
--8<-- 'code/builders/toolkit/substrate-api/libraries/sidecar/sidecar-transfer.ts'
```

### Tokens ERC-20 {: #erc-20-token-transfers }

Eventos ERC-20 aparecem como `evm.Log` dentro de uma extrínseca `ethereum.transact`. Campos:

| Informação | Campo JSON |
| --- | --- |
| Contrato | `events[j].data[0].address` |
| Assinatura do evento | `events[j].data[0].topics[0]` |
| Remetente | `events[j].data[0].topics[1]` |
| Destinatário | `events[j].data[0].topics[2]` |
| Valor | `events[j].data[0].data` |

## Taxas de transação (Substrate) {: #substrate-api-transaction-fees }

Eventos `transactionPayment.TransactionFeePaid` em `extrinsics[i].events[j]`:

- Conta que paga: `data[0]`  
- Taxa total: `data[1]`  
- Gorjeta: `data[2]`

## Taxas de transação (Ethereum API) {: #ethereum-api-transaction-fees }

Para Tanssi EVM, taxas via API Ethereum:

- Legacy/EIP-2930: `Taxa = (GasPrice * TransactionWeight) / 25000`  
- EIP-1559: `GasPrice = min(BaseFee + MaxPriorityFeePerGas, MaxFeePerGas)`  
  `Taxa = (GasPrice * TransactionWeight) / 25000`

`BaseFee` pode ser obtida em `GET /pallets/baseFee/storage/baseFeePerGas?at={blockId}` (campo `value`).  
`TransactionWeight` está no evento `system.ExtrinsicSuccess` → `data[0].weight`.

--8<-- 'text/_disclaimers/third-party-content.pt.md'
