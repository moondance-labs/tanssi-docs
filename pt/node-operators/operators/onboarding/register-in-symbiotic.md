---
title: Registrar no Symbiotic
description: Aprenda como registrar seu nó no registro Symbiotic como o primeiro passo para participar do protocolo, protegendo as redes Tanssi e ganhando recompensas.
icon: octicons-shield-check-24
categories: Operadores
---

# Registrar no Symbiotic

## Introdução {: #introduction }

Como apresentado na [seção de integração](/pt/node-operators/operators/onboarding/){target=_blank}, registrar no Symbiotic é o segundo passo do processo. Você já deve ter o nó sincronizado e em execução, seja usando [Docker](/pt/node-operators/operators/onboarding/run-an-operator/operators-docker/){target=_blank} ou [Systemd](/pt/node-operators/operators/onboarding/run-an-operator/operators-systemd/){target=_blank}.

O protocolo Tanssi fornece às suas appchains segurança de nível Ethereum desde o início, confiando em provedores externos como o [Symbiotic](/pt/learn/tanssi/external-security-providers/symbiotic/){target=_blank}. Para participar como operador no ecossistema Tanssi, você deve primeiro registrar seu nó no protocolo Symbiotic. O processo de registro estabelece seu nó como operador reconhecido.

Este guia mostra as etapas para registrar seu nó como operador Symbiotic, permitindo escolher entre vários métodos: CLI Symbiotic, interação direta via Etherscan ou uso do Safe para configurações multisig.

## Verificando Pré-requisitos {: #checking-prerequisites }

Antes de se registrar, certifique-se de já ter [configurado o nó](/pt/node-operators/operators/onboarding/run-an-operator/){target=_blank} e que ele esteja em execução.

Para seguir este guia, você deverá interagir com contratos inteligentes.
--8<-- 'text/pt/node-operators/operators/onboarding/run-an-operator/prerequisites.md'

## Registrar como Operador {: #registering-operator }

O protocolo Symbiotic mantém um registro de todos os operadores. Antes de proteger redes Tanssi, registre-se usando um dos métodos abaixo.

### Registrar usando a CLI Symbiotic {: #register-with-cli }

Se você instalou a [CLI Symbiotic](#set-up-the-cli) e quer assinar com um dispositivo Ledger, execute o comando abaixo, substituindo `INSERT_OPERATOR_ADDRESS` pela sua conta:

=== "MainNet"

    ```bash
    python3 symb.py register-operator --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia register-operator --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

Se preferir assinar diretamente com a chave privada da conta, execute (substitua `INSERT_PRIVATE_KEY`):

=== "MainNet"

    ```bash
    python3 symb.py register-operator --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia register-operator --private-key INSERT_PRIVATE_KEY
    ```

!!! atenção
    Este método exige expor sua chave privada; não é recomendado.

### Registrar usando o Etherscan {: #register-with-etherscan }

Você pode interagir com os contratos do Symbiotic pelo Etherscan e assinar com uma carteira de navegador ([MetaMask](/pt/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=_blank}, por exemplo).

Abra a página do contrato:

=== "MainNet"

    [Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.operators_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.operators_registry }}#writeContract){target=_blank}

=== "TestNet (Sepolia)"

    [Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.operators_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.operators_registry }}#writeContract){target=_blank}

Clique em **Conectar ao Web3** e selecione sua carteira preferida (por exemplo, MetaMask):

![Conectar à etapa Web3](/images/node-operators/operators/onboarding/register-in-symbiotic/register-in-symbiotic-1.webp)

!!! nota
    Você pode configurar o MetaMask para usar uma carteira fria.

Depois de conectado:

1. Expanda a função **`registerOperator`**
2. Clique em **Write** e assine a transação

![Registrar o operador](/images/node-operators/operators/onboarding/register-in-symbiotic/register-in-symbiotic-2.webp)

### Registrar usando o Safe para Multisig {: #register-with-safe }

Se você tiver uma conta [Safe](https://app.safe.global/){target=_blank}, abra o **Transaction builder** e insira o seguinte endereço do contrato:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.operators_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.operators_registry }}

Por fim, escolha a função **`registerOperator`** e assine a transação.

## Verificar o status do registro {: #check-registration }

Você pode verificar rapidamente seu status de registro no Etherscan. Abra:

=== "MainNet"

    [Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.operators_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.operators_registry }}#readContract){target=_blank}

=== "TestNet (Sepolia)"

    [Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.operators_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.operators_registry }}#readContract){target=_blank}

Na página do contrato:

1. Selecione a função **`isEntity`**
2. Cole a conta do seu operador
3. Clique em **Query**

Se o operador foi registrado corretamente, o resultado será `true`; caso contrário, `false`.

![Verificar o status do registro](/images/node-operators/operators/onboarding/register-in-symbiotic/register-in-symbiotic-3.webp)

Você também pode verificar o status via CLI Symbiotic, executando:

=== "MainNet"
    
    ```bash
    python3 symb.py isop INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia isop INSERT_OPERATOR_ADDRESS
    ```

E a saída se parece com:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py isop INSERT_OPERATOR_ADDRESS</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

## Enviar metadados {: #submitting-metadata }

Após o registro, você pode adicionar metadados (por exemplo, logotipo) para melhorar a visibilidade no [site Symbiotic](https://app.symbiotic.fi){target=_blank}.

Para enviar os metadados do operador, acesse o repositório de metadados Symbiotic:

=== "MainNet"

    [Repositório MainNet](https://github.com/symbioticfi/metadata-mainnet){target=_blank}

Crie um fork do repositório e, no diretório `operators`, crie uma pasta com o endereço do seu operador. Dentro dela, adicione `logo.png` e um arquivo `info.json` com os campos abaixo (substitua pelos seus valores):

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

!!! nota
    O parâmetro `links` é um array. Adicione quantos links forem necessários.

Por fim, abra um pull request. A equipe Symbiotic revisará e fará o merge.
