---
title: Transações e Contratos EVM com Web3.py
description: Aprenda a usar a biblioteca Ethereum Web3.py para enviar transações e implantar contratos Solidity na sua rede compatível com Ethereum alimentada pela Tanssi.
icon: octicons-code-24
categories: EVM-Template
---

# Biblioteca Python Web3.py

## Introdução {: #introduction }

[Web3.py](https://web3py.readthedocs.io/en/stable/){target=\_blank} é um conjunto de bibliotecas que permite interagir com nós Ethereum via HTTP, IPC ou WebSocket em Python. As redes EVM da Tanssi expõem uma API compatível com Ethereum/JSON-RPC, então você pode usar Web3.py para falar com um nó EVM da Tanssi como se estivesse no Ethereum. Veja a [documentação](https://web3py.readthedocs.io/en/stable/){target=\_blank} para mais detalhes.

Neste guia, você configurará o Web3.py para sua rede EVM da Tanssi e usará a biblioteca para enviar uma transação e implantar um contrato em uma appchain de demonstração executando no [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\_blank}. Para sua rede, basta trocar o endpoint.

--8<-- 'text/pt/_common/general-py-tutorial-check.md'

## Verificando pré-requisitos {: #checking-prerequisites }

Você precisará:

 - De uma conta com fundos na rede EVM Tanssi usada nos testes

## Instalando Web3.py {: #install-web3py }

Instale Web3.py e o compilador Solidity:

```bash
pip3 install web3 py-solc-x
```

## Configurando o provedor Web3.py {: #setting-up-the-web3py-provider }

Os scripts a seguir usam um [provedor Web3.py](https://web3py.readthedocs.io/en/stable/providers.html){target=\_blank} para se conectar à rede.

1. Importe `web3`.
2. Crie o provedor HTTP com a URL RPC da rede.

```python
# 1. Importe web3.py
from web3 import Web3

# 2. Crie o provedor web3.py
# Insira sua URL RPC aqui
web3 = Web3(Web3.HTTPProvider('{{ networks.dancelight.demo_evm_rpc_url }}'))
```

Guarde este trecho; ele é reutilizado nos scripts seguintes.

## Enviar uma transação {: #send-a-transaction }

Dois scripts: um para saldos e outro para enviar.

### Script de saldos {: #check-balances-script }

Crie o arquivo:

```bash
touch balances.py
```

Passos:

1. Inclua o provedor Web3.
2. Defina `address_from` e `address_to`.
3. Use `web3.eth.get_balance` e `web3.from_wei` para exibir em {{ networks.dancelight.demo_evm_token_symbol }}.

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/balances.py'
```

Execute:

```bash
python3 balances.py
```

![Verificar saldo Web3.py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-1.webp)

### Script de envio {: #send-transaction-script }

Crie o arquivo:

```bash
touch transaction.py
```

Passos:

1. Importe Web3.py e `rpc_gas_price_strategy`.
2. Inclua o provedor.
3. Defina `account_from` (com `private_key`) e `address_to`. **Não armazene chaves reais em arquivos Python.**
4. Defina a estratégia de gas price com `rpc_gas_price_strategy`.
5. Monte e assine a transação com `sign_transaction` (nonce, gas, gasPrice, to, value). Use `get_transaction_count` para nonce, `generate_gas_price` para gasPrice e `to_wei` para valor.
6. Envie com `send_raw_transaction` e aguarde recibo com `wait_for_transaction_receipt`.

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/transaction.py'
```

Execute:

```bash
python3 transaction.py
```

![Enviar Tx Web3.py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-2.webp)

## Implantar um contrato {: #deploy-a-contract }

--8<-- 'text/pt/builders/toolkit/ethereum-api/libraries/contract.md'

### Script de compilação {: #compile-contract-script }

Crie `compile.py`:

```bash
touch compile.py
```

Passos:

1. Importe `solcx`.
2. (Opcional) Instale o solc com `solcx.install_solc`.
3. Compile `Incrementer.sol` com `solcx.compile_files`.
4. Exporte ABI e bytecode.

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/compile.py'
```

!!! nota
    Se aparecer erro de solc não instalado, descomente a etapa 2 no snippet.

### Script de deploy {: #deploy-contract-script }

Compile primeiro; depois crie `deploy.py`:

```bash
touch deploy.py
```

Passos:

1. Importe Web3.py, ABI e bytecode.
2. Inclua o provedor.
3. Defina `account_from`/`private_key` (**não salve chaves reais em Python**).
4. Crie instância do contrato com ABI/bytecode.
5. Construa a tx do construtor (valor inicial 5) com `build_transaction`, incluindo `from` e `nonce`.
6. Assine com `sign_transaction`.
7. Envie com `send_raw_transaction` e aguarde recibo com `wait_for_transaction_receipt`.

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/deploy.py'
```

Execute:

```bash
python3 deploy.py
```

![Implantar Contrato Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-3.webp)

### Ler dados do contrato (calls) {: #read-contract-data }

Calls não mudam estado; não precisam de transação. Crie `get.py`:

```bash
touch get.py
```

Passos:

1. Importe Web3.py e o ABI.
2. Inclua o provedor.
3. Defina `contract_address`.
4. Instancie o contrato com ABI/endereço.
5. Chame `number()` e exiba.

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/get.py'
```

Execute:

```bash
python3 get.py
```

![Ler do Contrato Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-4.webp)

### Interagir com o contrato (sends) {: #interact-with-contract }

Sends alteram estado; exigem transação. Crie `increment.py` e `reset.py`:

```bash
touch increment.py reset.py
```

`increment.py`:

1. Importe Web3.py e ABI.
2. Inclua o provedor.
3. Defina `account_from`/`private_key`, `contract_address`, `value` (**não salve chaves reais em Python**).
4. Instancie o contrato.
5. Construa a tx de incremento com `build_transaction` (from, nonce).
6. Assine com `sign_transaction`.
7. Envie com `send_raw_transaction` e aguarde recibo.

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/increment.py'
```

Execute:

```bash
python3 increment.py
```

![Incrementar Contrato Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-5.webp)

`reset.py` segue o mesmo padrão chamando `reset()` sem argumentos:

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/reset.py'
```

Execute:

```bash
python3 reset.py
```

![Redefinir Contrato Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-6.webp)

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
