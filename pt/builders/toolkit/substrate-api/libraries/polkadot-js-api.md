---
title: Como usar a API Polkadot.js
description: Aprenda a usar a API Polkadot.js para interagir com uma rede Tanssi, obtendo dados da cadeia e enviando transações (extrínsecas) via Substrate.
keywords: polkadot.js, substrate, tanssi, api, extrinsics, rpc, typescript
icon: octicons-code-24
categories: Substrate-Template
---

# Biblioteca da API Polkadot.js

## Introdução {: #introduction }

[Polkadot.js](https://wiki.polkadot.com/general/polkadotjs/){target=\_blank} é um conjunto de ferramentas que permite interagir com blockchains baseadas em Substrate, como a sua rede com Tanssi! A [API Polkadot.js](https://polkadot.js.org/docs/api){target=\_blank} é um de seus componentes: uma biblioteca que permite aos desenvolvedores consultar a rede e interagir com as interfaces Substrate do nó usando JavaScript, possibilitando ler e escrever dados na rede.

Você pode usar a API Polkadot.js para consultar dados on-chain e enviar transações pelo lado Substrate da sua rede Tanssi. É possível consultar constantes do runtime, estado da cadeia, eventos, dados de transações (extrínsecas) e muito mais.

Aqui você encontra uma visão geral das funcionalidades disponíveis e exemplos de código em [TypeScript](https://www.typescriptlang.org){target=\_blank} para começar a interagir com sua rede Tanssi usando a biblioteca Polkadot.js API.

!!! nota "Nota do editor (atualização 2025)"
    Polkadot.js é o nome do conjunto de ferramentas para interação com blockchains Substrate. Embora o nome faça referência ao Polkadot, a biblioteca é agnóstica de cadeia e funciona com qualquer rede baseada em Substrate, incluindo o Tanssi.

--8<-- 'text/pt/_common/general-js-tutorial-check.md'

## Instalar a API Polkadot.js {: #installing-polkadot.js-api-library }

Primeiro, instale a biblioteca Polkadot.js API e a biblioteca RLP usando um gerenciador de pacotes como `yarn`. Ambas são necessárias para executar os exemplos deste guia.

Instale no diretório do projeto com:

=== "npm"

    ```bash
    npm i @polkadot/api
    npm i @polkadot/util-rlp
    ```

=== "yarn"

    ```bash
    yarn add @polkadot/api
    yarn add @polkadot/util-rlp
    ```

A biblioteca também inclui outros componentes centrais, como o Keyring para gerenciamento de contas e utilitários usados ao longo do guia.

## Criar uma instância do provedor da API {: #creating-an-API-provider-instance }

Para interagir com sua rede Tanssi usando a Polkadot.js API, crie uma instância da API. Construa o `WsProvider` usando o endpoint WebSocket da sua rede Tanssi.

```typescript
// Importar
import { ApiPromise, WsProvider } from '@polkadot/api';

const main = async () => {
  // Construir provedor da API
  const wsProvider = new WsProvider('INSERT_NETWORK_WSS_ENDPOINT');
  const api = await ApiPromise.create({ provider: wsProvider });

  // Seu código aqui

  await api.disconnect();
};

main();
```

### Metadata e decoração dinâmica da API {: #metadata-and-dynamic-api-decoration }

Quando a API Polkadot.js se conecta a um nó, uma das primeiras ações é recuperar a metadata e decorar a API com base nela. A metadata fornece a estrutura:

```text
api.<type>.<module>.<section>
```

Onde `<type>` pode ser:

- `query` — endpoints de leitura de estado
- `tx` — endpoints relacionados a transações
- `rpc` — endpoints específicos para chamadas RPC
- `consts` — endpoints para constantes do runtime

Nada em `api.{query, tx, rpc, consts}.<module>.<method>` é hardcoded. Isso torna a biblioteca modular e adaptável a qualquer cadeia Substrate com diferentes [módulos](/pt/learn/framework/modules/){target=\_blank}, como sua rede Tanssi.

## Consultar dados on-chain {: #querying-for-information }

### Consultas de estado {: #state-queries }

Recuperam informações sobre o estado atual da cadeia. Esses endpoints geralmente têm a forma `api.query.<module>.<method>`, decorados a partir da metadata. Liste endpoints inspecionando `api.query`, por exemplo:

```typescript
console.log(api.query);
```

Após [inicializar a API](#creating-an-API-provider-instance), você pode obter informações básicas de conta com:

```typescript
// Definir endereço da carteira
const addr = 'INSERT_ADDRESS';

// Obter o último timestamp
const now = await api.query.timestamp.now();

// Obter saldo da conta e nonce atual via módulo system
const { nonce, data: balance } = await api.query.system.account(addr);

console.log(
  `${now}: balance of ${balance.free} and a current nonce of ${nonce}`
);
```

??? code "Veja o script completo"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/state-queries.ts'
    ```

### Consultas RPC {: #rpc-queries }

As chamadas RPC são a base para transmissão de dados com o nó. Endpoints como `api.query`, `api.tx` ou `api.derive` encapsulam chamadas RPC, fornecendo informações no formato esperado pelo nó. Liste endpoints via:

```typescript
console.log(api.rpc);
```

O `api.rpc` segue formato semelhante ao `api.query`. Por exemplo, após [inicializar a API](#creating-an-API-provider-instance), obtenha dados da cadeia e o cabeçalho mais recente:

```typescript
// Obter nome da cadeia
const chain = await api.rpc.system.chain();

// Obter o cabeçalho mais recente
const lastHeader = await api.rpc.chain.getHeader();

// Registrar as informações
console.log(
  `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`
);
```

??? code "Veja o script completo"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/rpc-queries.ts'
    ```

### Consultas por assinatura {: #query-subscriptions }

O `rpc` também oferece endpoints de assinatura. Após [inicializar a API](#creating-an-API-provider-instance), você pode ouvir novos blocos:

```typescript
// Obter nome da cadeia
const chain = await api.rpc.system.chain();

// Assinar novos cabeçalhos
await api.rpc.chain.subscribeNewHeads((lastHeader) => {
  console.log(
    `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`
  );
});
```

O padrão geral em `api.rpc.subscribe*` é passar um callback que é acionado a cada novo item importado.

Chamadas em `api.query.*` também aceitam callbacks para modo assinado, inclusive chamadas com parâmetros. Exemplo para monitorar saldo de uma conta:

```typescript
// Definir endereço da carteira
const addr = 'INSERT_ADDRESS';

// Assinar mudanças de saldo para uma conta específica
await api.query.system.account(addr, ({ nonce, data: balance }) => {
  console.log(
    `Free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`
  );
});
```

??? code "Veja o script completo"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/query-subscriptions.ts'
    ```

## Criar um Keyring para uma conta {: #keyrings }

O objeto Keyring mantém pares de chaves e assina quaisquer dados, seja transferência, mensagem ou interação com contrato.

### Criar uma instância de Keyring {: #creating-a-keyring-instance }

Instancie a classe Keyring e defina o tipo padrão de endereço. O padrão é `sr25519`, mas para redes Tanssi compatíveis com EVM use `ethereum`.

```typescript
// Importe o keyring conforme necessário
import Keyring from '@polkadot/keyring';

// Crie uma instância de keyring (ECDSA)
const keyringECDSA = new Keyring({ type: 'ethereum' });

// Crie uma instância de keyring (SR25519)
const keyring = new Keyring({ type: 'sr25519' });
```

### Adicionar uma conta ao Keyring {: #adding-accounts }

Há várias formas de adicionar contas, incluindo frase mnemônica e chave privada curta. Exemplos:

=== "Mnemonic (ECDSA)"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-mnemonic-ecdsa.ts'
    ```

=== "Chave privada (ECDSA)"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-private-key-ecdsa.ts'
    ```

=== "Mnemonic (SR25519)"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-mnemonic-sr25519.ts'
    ```

## Enviando transações {: #transactions }

Endpoints de transação têm a forma `api.tx.<module>.<method>`, decorados via metadata. Eles permitem enviar transações para inclusão em blocos — transferências, interações com pallets, ou qualquer coisa suportada. Liste endpoints via:

```typescript
console.log(api.tx);
```

### Enviar uma transação básica {: #sending-basic-transactions }

A Polkadot.js API pode enviar transações. Supondo que você tenha [inicializado a API](#creating-an-API-provider-instance) e um [keyring](#creating-a-keyring-instance), use:

```typescript
// Inicializar pares de chaves da carteira
const alice = keyring.addFromUri('INSERT_ALICES_PRIVATE_KEY');

// Montar a transação
const tx = await api.tx.balances.transferAllowDeath(
  'INSERT_BOBS_ADDRESS',
  BigInt(INSERT_VALUE)
);

// Obter o calldata codificado da transação
const encodedCallData = tx.method.toHex()
console.log(`Encoded calldata: ${encodedCallData}`);

// Assinar e enviar a transação
const txHash = await tx.signAndSend(alice);

// Exibir o hash da transação
console.log(`Submitted with hash ${txHash}`);
```

??? code "Veja o script completo"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/basic-transactions.ts'
    ```

Observe que `signAndSend` aceita parâmetros opcionais, como `nonce`, por exemplo `signAndSend(alice, { nonce: aliceNonce })`. Você pode usar o código da seção [Consultas de estado](#state-queries){target=\_blank} para obter o nonce correto, incluindo transações no mempool.

### Informações de taxa {: #fees}

Os endpoints de transação também oferecem um método para obter o peso de um `api.tx.<module>.<method>`. Use `paymentInfo` após montar a transação com o módulo e método específicos.

`paymentInfo` retorna informações de peso em `refTime` e `proofSize`, que podem ser usadas para determinar a taxa da transação — útil ao criar execuções remotas via XCM.

Exemplo, após [inicializar a API](#creating-an-API-provider-instance), para obter peso de uma transferência simples:

```typescript
// Transação para obter informações de peso
const tx = api.tx.balances.transferAllowDeath('INSERT_BOBS_ADDRESS', BigInt(INSERT_VALUE));

// Obter informações de peso
const { partialFee, weight } = await tx.paymentInfo('INSERT_SENDERS_ADDRESS');

console.log(`Transaction weight: ${weight}`);
console.log(`Transaction fee: ${partialFee.toHuman()}`);
```

??? code "Veja o script completo"
    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/payment-info.ts'
    ```

### Eventos de transação {: #transaction-events }

Qualquer transação emite eventos; no mínimo, haverá `system.ExtrinsicSuccess` ou `system.ExtrinsicFailed`, indicando sucesso ou falha na execução. Dependendo da transação, outros eventos podem ser emitidos, por exemplo `balances.Transfer` em uma transferência.

### Agrupar transações {: #batching-transactions }

A Polkadot.js API permite processar transações em lote via `api.tx.utility.batch`. As transações são processadas sequencialmente de um único remetente. A taxa pode ser estimada com `paymentInfo`.

Assumindo que você tenha [inicializado a API](#creating-an-API-provider-instance), um [keyring](#creating-a-keyring-instance) e [adicionado uma conta](#adding-accounts), o exemplo abaixo faz duas transferências em uma transação:

```typescript
// Construir lista de transações para o batch
const txs = [
  api.tx.balances.transferAllowDeath('INSERT_BOBS_ADDRESS', BigInt(INSERT_VALUE)),
  api.tx.balances.transferAllowDeath('INSERT_CHARLEYS_ADDRESS', BigInt(INSERT_VALUE)),
];

// Estime as taxas como RuntimeDispatchInfo usando o assinante
// (endereço ou par de chaves bloqueado/desbloqueado)
const info = await api.tx.utility
  .batch(txs)
  .paymentInfo(alice);

console.log(`Estimated fees: ${info}`);

// Construir o batch e enviar as transações
await api.tx.utility
  .batch(txs)
  .signAndSend(alice, ({ status }) => {
    if (status.isInBlock) {
      console.log(`included in ${status.asInBlock}`);

      // Desconecte a API aqui!
    }
  });
```

??? code "Veja o script completo"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/batch-transactions.ts'
    ```

## Código de exemplo para monitorar transferências do token nativo { #sample-code-for-monitoring-native-token-transfers }

Os códigos a seguir mostram como escutar transferências do token nativo, enviadas via Substrate ou Ethereum API, usando a [biblioteca Polkadot.js](https://polkadot.js.org/docs/api/start){target=\_blank} ou o [Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar){target=\_blank}. Os snippets são para demonstração e precisam de ajustes e testes antes de produção.

O snippet abaixo usa [`subscribeFinalizedHeads`](https://polkadot.js.org/docs/substrate/rpc/#subscribefinalizedheads-header){target=\_blank} para assinar cabeçalhos de blocos finalizados, percorre as extrínsecas do bloco e recupera eventos de cada extrínseca. Se encontrar um evento `balances.Transfer`, extrai `from`, `to`, `amount` e o `tx hash` e mostra no console. O `amount` aparece na menor unidade (Wei). Veja a documentação oficial para detalhes da API Polkadot.js e do JSON RPC do Substrate.

```typescript
--8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/balance-event.ts'
```

Há mais exemplos de transferências neste [gist](https://gist.github.com/crystalin/b2ce44a208af60d62b5ecd1bad513bce){target=\_blank}.

## Funções utilitárias {: #utilities }

A API Polkadot.js inclui utilitários para primitivas criptográficas e funções de hash.

O exemplo a seguir calcula o hash determinístico de uma transação Ethereum legacy crua: primeiro gera a codificação RLP ([Recursive Length Prefix](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/){target=\_blank}) e depois aplica keccak256.

```typescript
import { encode } from '@polkadot/util-rlp';
import { keccakAsHex } from '@polkadot/util-crypto';
import { numberToHex } from '@polkadot/util';

// Defina o tipo da chave como string
type txType = {
  [key: string]: any;
};

// Defina a transação assinada bruta
const txData: txType = {
  nonce: numberToHex(1),
  gasPrice: numberToHex(21000000000),
  gasLimit: numberToHex(21000),
  to: '0xc390cC49a32736a58733Cf46bE42f734dD4f53cb',
  value: numberToHex(1000000000000000000),
  data: '',
  v: '0507',
  r: '0x5ab2f48bdc6752191440ce62088b9e42f20215ee4305403579aa2e1eba615ce8',
  s: '0x3b172e53874422756d48b449438407e5478c985680d4aaa39d762fe0d1a11683',
};

// Extraia os valores para um array
var txDataArray = Object.keys(txData).map(function (key) {
  return txData[key];
});

// Calcule a transação codificada em RLP
var encoded_tx = encode(txDataArray);

// Faça o hash da transação codificada usando keccak256
console.log(keccakAsHex(encoded_tx));
```

Consulte o [repositório NPM](https://www.npmjs.com/package/@polkadot/util-crypto){target=\_blank} para a lista de métodos disponíveis em `@polkadot/util-crypto` e suas descrições.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
