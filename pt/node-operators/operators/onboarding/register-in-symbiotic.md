---
title: Registrar no Symbiotic
description: Aprenda como registrar seu nó no registro Symbiotic como o primeiro passo para participar do protocolo, protegendo as redes Tanssi e ganhando recompensas.
icon: octicons-shield-check-24
categories: Operadores
---

# Registrar no Symbiotic

## Introdução {: #introduction }

Como apresentado na [seção de integração](/node-operators/operators/onboarding/){target=\_blank}, registrar no Symbiotic é o segundo passo do processo. Você já deve ter o nó sincronizado e em execução, seja usando [Docker](/node-operators/operators/onboarding/run-an-operator/operators-docker/){target=\_blank} ou [Systemd](/node-operators/operators/onboarding/run-an-operator/operators-systemd/){target=\_blank}.

O protocolo Tanssi fornece para suas appchains segurança de nível Ethereum desde o início, confiando em provedores de segurança externos, como [Symbiotic](/learn/tanssi/external-security-providers/symbiotic/){target=\_blank}. Para participar como operador no ecossistema Tanssi, você deve primeiro registrar seu nó no protocolo Symbiotic. O processo de registro estabelece seu nó como um operador reconhecido.

Este guia irá guiá-lo pelas etapas para registrar com sucesso seu nó como um operador Symbiotic, permitindo que você escolha entre vários métodos, incluindo o uso da CLI Symbiotic, interação direta com contratos inteligentes através do Etherscan ou a utilização do Safe para configurações multisig.

## Verificando Pré-requisitos {: #checking-prerequisites }

Antes de se registrar como operador, certifique-se de já ter [configurado o nó](/node-operators/operators/onboarding/run-an-operator/){target=\_blank} e que ele esteja em execução.

Para seguir este guia, você deve interagir com contratos inteligentes.
--8\<-- 'text/node-operators/operators/onboarding/run-an-operator/prerequisites.md'

## Registrar como Operador {: #registering-operator }

O protocolo Symbiotic mantém um registro de todos os operadores. Antes de poder proteger as redes Tanssi, os operadores de nós devem se registrar como operadores no protocolo Symbiotic usando um dos métodos descritos nas seções a seguir.

### Registrar usando a CLI Symbiotic {: #register-with-cli }

Se você instalou corretamente a [CLI Symbiotic](#set-up-the-cli) e deseja assinar a transação usando um dispositivo Ledger, execute o seguinte comando, substituindo `INSERT_OPERATOR_ADDRESS` pela sua conta:

=== "MainNet"

````
    ```bash

python3 symb.py register-operator --ledger --ledger-account INSERT_OPERATOR_ADDRESS

    ```
````

=== "TestNet (Sepolia)"

    ```bash
````

    ```
python3 symb.py --chain sepolia register-operator --ledger --ledger-account INSERT_OPERATOR_ADDRESS 
```

````

Se você deseja assinar a transação diretamente usando a chave privada da conta, execute o seguinte comando, substituindo o parâmetro `INSERT_PRIVATE_KEY`:
    ```bash

=== "MainNet"

    ```
````

```bash
python3 symb.py register-operator --private-key INSERT_PRIVATE_KEY
    ```bash

````
    ```

=== "TestNet (Sepolia)"

````
```bash

python3 symb.py --chain sepolia register-operator --private-key INSERT_PRIVATE_KEY

```
````

!!! warning
Observe que este método exige que você exponha sua chave privada; portanto, não é recomendado.

### Registrar usando o Etherscan {: #register-with-etherscan }

Você pode interagir com os contratos inteligentes do Symbiotic usando o Etherscan e assinar a transação usando uma carteira de navegador ([MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, por exemplo).

Vá para a página do contrato, abrindo o link:

=== "MainNet"

```
[Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.operators_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.operators_registry }}#writeContract){target=\_blank}
```

=== "TestNet (Sepolia)"

```
[Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.operators_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.operators_registry }}#writeContract){target=\_blank}
```

Clique em **Conectar ao Web3** e selecione sua carteira preferida (por exemplo, MetaMask):

![Conectar à etapa Web3](/images/node-operators/operators/onboarding/register-in-symbiotic/register-in-symbiotic-1.webp)

!!! note
Você pode configurar o MetaMask para usar uma carteira fria.

Depois de conectado:

1. Expanda a função **`registerOperator`**
1. Clique em **Escrever** e assine a transação

![Registrar o operador](/images/node-operators/operators/onboarding/register-in-symbiotic/register-in-symbiotic-2.webp)

### Registrar usando o Safe para Configurações Multisig {: #register-with-safe }

Se você tiver uma conta [Safe](https://app.safe.global/){target=\_blank}, abra o **Construtor de transações** e insira o seguinte endereço do contrato:

=== "MainNet"

```
{{ networks.symbiotic.contracts.mainnet.operators_registry }}
```

=== "TestNet (Sepolia)"

```
{{ networks.symbiotic.contracts.sepolia.operators_registry }}
```

Finalmente, escolha a função **`registerOperator`** e assine a transação.

## Verificar o status do registro {: #check-registration }

Você pode verificar rapidamente seu status de registro no Etherscan. Abra o seguinte link:

=== "MainNet"

```
[Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.operators_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.operators_registry }}#readContract){target=\_blank}
```

=== "TestNet (Sepolia)"

    ```bash
```


Na página do contrato:

    ```bash
1. Selecione a função **`isEntity`**
    ```

1. Clique em **Consultar**

Se seu operador foi registrado corretamente, você obterá um resultado `true` e, caso contrário, `false`

![Verificar o status do registro](/images/node-operators/operators/onboarding/register-in-symbiotic/register-in-symbiotic-3.webp)

Você também pode verificar seu status de registro usando a CLI Symbiotic, executando o seguinte comando, que imprime `true` ou `false` para qualquer endereço de operador fornecido:

=== "MainNet"

````
```bash

python3 symb.py isop INSERT_OPERATOR_ADDRESS

```
````

=== "TestNet (Sepolia)"

````
```bash

python3 symb.py --chain sepolia isop INSERT_OPERATOR_ADDRESS 

```
```json title="info.json"

E a saída se parece com:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py isop INSERT_OPERATOR_ADDRESS</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

## Enviar metadados {: #submitting-metadata }

Depois que seu operador for registrado com sucesso, você pode adicionar metadados (por exemplo, logotipo) para melhorar sua visibilidade no [site Symbiotic](https://app.symbiotic.fi){target=\_blank}.

Para enviar os metadados do seu operador, vá para o repositório de metadados Symbiotic:

=== "MainNet"

```

Crie um fork deste repositório e, no diretório `operators`, crie um novo diretório com o nome do endereço do seu operador. Dentro do diretório do seu operador, adicione seu `logo.png` e um arquivo chamado `info.json` com os seguintes campos, substituindo os valores pelos seus:

```json title="info.json"

{
	"name": "INSERIR_SEU_NOME_DO_OPERADOR",
	"description": "INSERIR_SUA_DESCRIÇÃO_DO_OPERADOR",
	"tags": [
		"operador"
	],
	"links": [
		{
			"type": "website",
			"name": "Website",
			"url": "https://INSERIR_SEU_URL_DO_SITE"
		},
		{
			"type": "website",
			"name": "X",
			"url": "https://INSERIR_SEU_URL_X"
		}
	]
}

```

!!! note
O parâmetro `links` é uma matriz. Adicione quantos links forem necessários.

Finalmente, abra um pull request. A equipe Symbiotic irá revisá-lo e mesclá-lo.
