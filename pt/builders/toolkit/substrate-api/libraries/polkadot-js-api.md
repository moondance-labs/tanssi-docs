---
title: Como usar a API Polkadot.js
description: Use a API Polkadot.js para consultar e enviar extrínsecas em uma rede Tanssi (Substrate).
icon: octicons-code-24
categories: Substrate-Template
---

# Biblioteca da API Polkadot.js

## Introdução {: #introduction }

[Polkadot.js](https://wiki.polkadot.com/general/polkadotjs/){target=\_blank} é um conjunto de ferramentas para interagir com blockchains Substrate. A [API Polkadot.js](https://polkadot.js.org/docs/api){target=\_blank} permite consultar estado, constantes, eventos e enviar transações (extrínsecas) em JS/TS — funciona com qualquer rede Substrate, incluindo Tanssi.

--8<-- 'text/_common/pt/general-js-tutorial-check.md'

## Instalação {: #installing-polkadot.js-api-library }

Instale as dependências:

=== "npm"
```bash
npm i @polkadot/api @polkadot/util-rlp
```
=== "yarn"
```bash
yarn add @polkadot/api @polkadot/util-rlp
```

## Criar a instância da API {: #creating-an-API-provider-instance }

```typescript
import { ApiPromise, WsProvider } from '@polkadot/api';

const main = async () => {
  const wsProvider = new WsProvider('INSIRA_WSS_DA_REDE');
  const api = await ApiPromise.create({ provider: wsProvider });

  // seu código aqui

  await api.disconnect();
};

main();
```

A API se “decora” via metadados: `api.{query,tx,rpc,consts}.<módulo>.<método>`.

## Consultas on-chain {: #querying-for-information }

- Estado: `api.query.<mod>.<método>`  
  ```ts
  const addr = 'ENDERECO';
  const now = await api.query.timestamp.now();
  const { nonce, data: balance } = await api.query.system.account(addr);
  console.log(`${now}: saldo ${balance.free}, nonce ${nonce}`);
  ```
  ??? code "Script completo"
      ```typescript
      --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/state-queries.ts'
      ```

- RPC: `api.rpc.<secção>.<método>`  
  ```ts
  const chain = await api.rpc.system.chain();
  const lastHeader = await api.rpc.chain.getHeader();
  console.log(`${chain}: bloco #${lastHeader.number} hash ${lastHeader.hash}`);
  ```
  ??? code "Script completo"
      ```typescript
      --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/rpc-queries.ts'
      ```

- Assinaturas: callbacks em `subscribe*`  
  ```ts
  await api.rpc.chain.subscribeNewHeads((h) =>
    console.log(`novo bloco #${h.number} hash ${h.hash}`)
  );
  ```
  ??? code "Script completo"
      ```typescript
      --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/query-subscriptions.ts'
      ```

## Keyring {: #keyrings }

```typescript
import Keyring from '@polkadot/keyring';
const keyringEth = new Keyring({ type: 'ethereum' });
const keyringSr = new Keyring({ type: 'sr25519' });
```

Adicionar contas:

=== "Mnemônico (ECDSA)"
```typescript
--8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-mnemonic-ecdsa.ts'
```
=== "Chave privada (ECDSA)"
```typescript
--8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-private-key-ecdsa.ts'
```
=== "Mnemônico (SR25519)"
```typescript
--8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-mnemonic-sr25519.ts'
```

## Transações {: #transactions }

Endpoints: `api.tx.<mod>.<método>`.

### Transferência simples {: #sending-basic-transactions }

```typescript
const alice = keyringEth.addFromUri('CHAVE_PRIVADA_DA_ALICE');
const tx = api.tx.balances.transferAllowDeath('ENDERECO_BOB', BigInt(VALOR));
console.log(`Calldata: ${tx.method.toHex()}`);
const txHash = await tx.signAndSend(alice);
console.log(`Hash: ${txHash}`);
```
??? code "Script completo"
    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/basic-transactions.ts'
    ```

### Taxas {: #fees }

```typescript
const tx = api.tx.balances.transferAllowDeath('ENDERECO', BigInt(VALOR));
const { partialFee, weight } = await tx.paymentInfo('ENDERECO_ORIGEM');
console.log(weight.toString(), partialFee.toHuman());
```
??? code "Script completo"
    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/payment-info.ts'
    ```

### Lotes {: #batching-transactions }

```typescript
const txs = [
  api.tx.balances.transferAllowDeath('ENDERECO1', BigInt(VAL1)),
  api.tx.balances.transferAllowDeath('ENDERECO2', BigInt(VAL2)),
];
await api.tx.utility.batch(txs).signAndSend(alice, ({ status }) => {
  if (status.isInBlock) console.log(`incluído em ${status.asInBlock}`);
});
```
??? code "Script completo"
    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/batch-transactions.ts'
    ```

## Monitorar transferências nativas {: #sample-code-for-monitoring-native-token-transfers }

Exemplo usando `subscribeFinalizedHeads` para encontrar eventos `balances.Transfer`:

```typescript
--8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/balance-event.ts'
```

## Utilidades {: #utilities }

Exemplo: calcular hash de transação Ethereum (RLP + keccak256):

```typescript
import { encode } from '@polkadot/util-rlp';
import { keccakAsHex } from '@polkadot/util-crypto';
import { numberToHex } from '@polkadot/util';

const txData = { /* ...campos da tx... */ };
const encoded = encode(Object.values(txData));
console.log(keccakAsHex(encoded));
```

--8<-- 'text/_disclaimers/third-party-content.pt.md'
