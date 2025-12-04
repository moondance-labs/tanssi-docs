---
title: Como usar a biblioteca viem Ethereum
description: Neste tutorial, use a interface TypeScript do viem para enviar transações e implantar contratos Solidity na sua rede EVM com tecnologia Tanssi.
icon: octicons-code-24
categories: EVM-Template
---

# Biblioteca viem TypeScript Ethereum

## Introdução {: #introduction }

[viem](https://viem.sh){target=\_blank} é uma biblioteca TypeScript modular que fornece abstrações sobre a API JSON-RPC, facilitando a interação com nós Ethereum. Como as redes EVM da Tanssi expõem uma API compatível com Ethereum/JSON-RPC, você pode usar viem para interagir com qualquer rede EVM Tanssi. Veja a [documentação do viem](https://viem.sh/docs/getting-started){target=\_blank} para mais detalhes.

Neste guia, você verá como usar viem para enviar uma transação e implantar um contrato na rede EVM de demonstração. O mesmo fluxo se aplica a qualquer rede EVM da Tanssi.

--8<-- 'text/pt/_common/general-js-tutorial-check.md'

## Verificando pré-requisitos {: #checking-prerequisites }

Para os exemplos, você precisará de:

 - Uma conta com fundos na rede EVM Tanssi que estiver usando

## Instalando viem {: #installing-viem }

Crie um projeto TypeScript básico e instale dependências:

```bash
mkdir viem-examples && cd viem-examples && npm init --y
```

Instale viem e o compilador Solidity:

=== "npm"

    ```bash
    npm install typescript ts-node viem solc@0.8.0
    ```

=== "yarn"

    ```bash
    yarn add typescript ts-node viem solc@0.8.0
    ```

Gere o `tsconfig`:

```bash
npx tsc --init
```

!!! nota
    Tutorial criado usando Node.js v18.18.0.

## Configurar um cliente viem (provedor) {: #setting-up-a-viem-provider }

Você pode criar:
- um cliente de leitura com `createPublicClient`, para saldos/dados; ou
- um cliente de escrita com `createWalletClient`, para enviar transações.

Primeiro defina a cadeia com `defineChain`, informando todos os campos (incluindo `public` e `default` RPC).

### Para ler dados da cadeia {: #for-reading-chain-data }

Passos:

1. Importe `createPublicClient`, `http` e `defineChain` de `viem`.
2. Defina os detalhes da cadeia (inclua URLs `public` e `default`).
3. Crie o `client` com `createPublicClient`, passando rede e RPC HTTP.

```ts
--8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/read-chain-data.ts'
```

### Para gravar dados da cadeia {: #for-writing-chain-data }

Passos:

1. Importe `createWalletClient`, `http`, `defineChain` de `viem` e `privateKeyToAccount` de `viem/accounts`.
2. Defina os detalhes da cadeia (inclua URLs `public` e `default`).
3. Crie a conta com `privateKeyToAccount`.
4. Crie o `client` com `createWalletClient`, passando conta, rede e RPC HTTP.

!!! remember
    Demonstração apenas. Nunca salve chave privada em arquivo TypeScript.

```ts
--8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/write-chain-data.ts'
```

!!! nota
    Para carteiras de navegador, veja este exemplo (onde `demo` é a rede definida em `defineChain`):
    ```ts
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/browser-based-wallets.ts'
    ```

## Enviar uma transação {: #send-transaction }

Criaremos dois scripts: um para saldos e outro para enviar a transação.

### Script de saldos {: #check-balances-script }

Crie o arquivo:

```bash
touch balances.ts
```

Passos:

1. Importe `createPublicClient`, `http`, `formatEther`, `defineChain`.
2. Defina a cadeia (inclua URLs `public`/`default`).
3. Configure o cliente público.
4. Defina `addressFrom` e `addressTo`.
5. Crie a função `balances` usando `publicClient.getBalance`.
6. Formate com `formatEther` e exiba.
7. Chame `balances()`.

???+ code "Ver balances.ts"

    ```ts
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/balances.ts'
    ```

Execute:

```bash
npx ts-node balances.ts
```

Saldos em {{ networks.dancelight.demo_evm_token_symbol }} serão exibidos.

![Resultado do script balances](/images/builders/toolkit/ethereum-api/libraries/viem/viem-1.webp)

### Script de envio {: #send-transaction-script }

Crie o arquivo:

```bash
touch transaction.ts
```

Passos:

1. Importe `createPublicClient`, `createWalletClient`, `http`, `parseEther`, `defineChain` e `privateKeyToAccount`.
2. Defina a cadeia (inclua URLs `public`/`default`).
3. Configure o cliente de carteira (escrita) com sua chave (**não salve chaves reais em TS**).
4. Configure o cliente público (leitura) para aguardar recibo.
5. Defina `addressTo`.
6. Crie `send()` com o objeto da transação.
7. Envie com `walletClient.sendTransaction` e aguarde o hash.
8. Aguarde o recibo com `publicClient.waitForTransactionReceipt`.
9. Chame `send()`.

???+ code "Ver transaction.ts"

    ```ts
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/transaction.ts'
    ```

Execute:

```bash
npx ts-node transaction.ts
```

Você verá o hash; use `balances.ts` antes/depois para confirmar saldos.

![Resultado dos scripts transaction e balances](/images/builders/toolkit/ethereum-api/libraries/viem/viem-2.webp)

## Implantar um contrato {: #deploy-contract }

--8<-- 'text/pt/builders/toolkit/ethereum-api/libraries/contract.md'

### Script de compilação {: #compile-contract-script }

--8<-- 'text/pt/builders/toolkit/ethereum-api/libraries/compile-ts.md'

```ts
--8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/compile.ts'
```

### Script de deploy {: #deploy-contract-script }

Compile `Incrementer.sol` e crie `deploy.ts`:

```bash
touch deploy.ts
```

Passos:

1. Importe `createPublicClient`, `createWalletClient`, `http`, `defineChain`, `privateKeyToAccount` e o `contractFile` de `compile.ts`.
2. Defina a cadeia (inclua URLs `public`/`default`).
3. Configure o cliente de carteira (escrita) para implantar (**não salve chaves reais em TS**).
4. Configure o cliente público (leitura) para obter recibo.
5. Carregue `bytecode` e `abi`.
6. Crie a função `deploy`.
7. Use `walletClient.deployContract` com ABI, bytecode, conta e valor inicial.
8. Aguarde recibo/leitura conforme necessário.
9. Chame `deploy()`.

???+ code "Ver deploy.ts"

    ```ts
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/deploy.ts'
    ```

Execute:

```bash
npx ts-node deploy.ts
```

O endereço do contrato será exibido.

![Resultado do script deploy](/images/builders/toolkit/ethereum-api/libraries/viem/viem-3.webp)

### Ler dados do contrato (calls) {: #read-contract-data }

Calls não alteram estado; não precisam de transação. Crie `get.ts`:

```bash
touch get.ts
```

Passos:

1. Importe `createPublicClient`, `http`, `defineChain` e `contractFile` de `compile.ts`.
2. Defina a cadeia (inclua URLs `public`/`default`).
3. Configure o cliente público.
4. Defina `contractAddress` e `abi`.
5. Crie a função `get`.
6. Chame `publicClient.readContract` (função `number`) e exiba o valor.
7. Chame `get()`.

???+ code "Ver get.ts"

    ```ts
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/get.ts'
    ```

Execute:

```bash
npx ts-node get.ts
```

![Resultado do script get](/images/builders/toolkit/ethereum-api/libraries/viem/viem-4.webp)

### Interagir com o contrato (sends) {: #interact-with-contract }

Sends alteram estado e exigem transação. Crie `increment.ts` e `reset.ts`:

```bash
touch increment.ts reset.ts
```

`increment.ts`:

1. Importe `createPublicClient`, `createWalletClient`, `http`, `defineChain`, `privateKeyToAccount` e `contractFile`.
2. Defina a cadeia (inclua URLs `public`/`default`).
3. Configure o cliente de carteira (escrita) (**não salve chaves reais em TS**).
4. Configure o cliente público (leitura) para recibo.
5. Defina `contractAddress`, `abi`, `_value`.
6. Crie `increment()`.
7. Chame `walletClient.writeContract` com `_value` e aguarde hash.
8. Aguarde recibo com `publicClient.waitForTransactionReceipt`.
9. Chame `increment()`.

???+ code "Ver increment.ts"

    ```ts
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/increment.ts'
    ```

Execute:

```bash
npx ts-node increment.ts
```

![Resultado dos scripts increment e get](/images/builders/toolkit/ethereum-api/libraries/viem/viem-5.webp)

`reset.ts`:

1. Importe as mesmas dependências de `increment.ts`.
2. Defina a cadeia.
3. Configure clientes de carteira e público.
4. Defina `contractAddress` e `abi`.
5. Crie `reset()`.
6. Chame `walletClient.writeContract` (função `reset`) e aguarde hash.
7. Aguarde recibo com `publicClient.waitForTransactionReceipt`.
8. Chame `reset()`.

???+ code "Ver reset.ts"

    ```ts
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/reset.ts'
    ```

Execute:

```bash
npx ts-node reset.ts
```

![Resultado dos scripts reset e get](/images/builders/toolkit/ethereum-api/libraries/viem/viem-6.webp)

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
