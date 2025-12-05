---
title: Exclusão Voluntária de Vault
description: Exclua-se, opcionalmente, de um vault Tanssi. Aprenda como usar a CLI, Etherscan ou Safe, e verifique o seu status de exclusão.
icon: octicons-sign-out-24
template: main.html
categories: Operators
---

# Exclusão Voluntária de Vault (Opcional)

## Introdução {: #introduction }

Esta página detalha a etapa final opcional no processo de desativação de Tanssi: a exclusão voluntária de um vault específico. Embora não seja obrigatória, esta ação permite que os operadores desassocie as suas contas de vaults individuais. Antes de prosseguir com esta etapa, certifique-se de ter cumprido todas as condições descritas no nosso guia de [pré-requisitos](/pt/node-operators/operators/offboarding/prerequisites/){target=\_blank}.

Este guia fornece instruções sobre como cancelar a inscrição usando um dos vários métodos disponíveis e como verificar a conclusão bem-sucedida desta ação.

## Cancelamento de inscrição num Vault {: #opting-out-of-a-vault }

Para prosseguir com a exclusão de um vault, pode usar um dos métodos detalhados nas seções a seguir.

### Usando a CLI Symbiotic {: #opt-out-vault-with-cli }

Usando um dispositivo Ledger:

=== "MainNet"

````
    ```bash

python3 symb.py opt-out-vault INSERT_VAULT_ADDRESS --ledger --ledger-account INSERT_OPERATOR_ADDRESS

    ```
````

=== "TestNet (Sepolia)"

    ```bash
````

    ```
python3 symb.py --chain sepolia opt-out-vault {{ networks.symbiotic.contracts.sepolia.vault }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
```

````

Para assinar com uma chave privada:
    ```bash

=== "MainNet"

    ```
````

```bash
python3 symb.py opt-out-vault INSERT_VAULT_ADDRESS --private-key INSERT_PRIVATE_KEY
    ```bash

````
    ```

=== "TestNet (Sepolia)"

````
```bash

python3 symb.py --chain sepolia opt-out-vault {{ networks.symbiotic.contracts.sepolia.vault }} --private-key INSERT_PRIVATE_KEY

```
````

!!! atenção
Observe que este método requer que você exponha sua chave privada; portanto, não é recomendado.

### Usando o Etherscan {: #opt-out-vault-with-etherscan }

Acesse o contrato através do Etherscan:

=== "MainNet"

```
[Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#writeContract){target=\_blank}
```

=== "TestNet (Sepolia)"

```
[Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#writeContract){target=\_blank}
```

Certifique-se de selecionar **Contrato** e **Escrever Contrato**, depois clique em **Conectar à Web3** e selecione sua carteira preferida (por exemplo, MetaMask):
![Conectar à etapa Web3](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-4.webp)

1. Expanda a função **optOut**
2. Insira o `VAULT_ADDRESS` no campo **where** (por exemplo, `{{ networks.symbiotic.contracts.sepolia.vault }}` no Sepolia TestNet)
3. Clique em **Escrever** e assine a transação

![Cancelar operador](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-5.webp)

### Usando o Safe {: #opt-out-vault-with-safe }

Para contas Safe, use estes endereços de contrato no **Transaction Builder**:

=== "MainNet"

```
{{ networks.symbiotic.contracts.mainnet.vault_registry }}
```

=== "TestNet (Sepolia)"

```
{{ networks.symbiotic.contracts.sepolia.vault_registry }}
```

Finalmente, escolha a função optOut, insira o `VAULT_ADDRESS` ao qual o seu nó está atualmente registrado (por exemplo, `{{ networks.symbiotic.contracts.sepolia.vault }}` no Sepolia TestNet) e assine a transação.

## Verificar o Status de Exclusão de Vault {: #verify-vault-opt-out-status }

Depois de enviar a transação de exclusão de vault, pode verificar o seu status de exclusão usando um dos métodos nas seções a seguir.

### Usando o Etherscan

Pode verificar o status de exclusão do seu vault no Etherscan:

=== "MainNet"

```
[Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#readContract){target=\_blank}
```

=== "TestNet (Sepolia)"

```
[Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#readContract){target=\_blank}
```

    ```bash

    ```

1. Selecione a função **isOptedIn**
2. Cole a conta do seu operador no campo **who**

    ```bash
3. Clique em **Consultar**
    ```

Você obterá um resultado `false` se o seu operador tiver cancelado com sucesso o vault e `true` se ainda estiver inscrito.

![Verifique o status do registo](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-6.webp)

### Usando a CLI Symbiotic

Pode também verificar o status de exclusão do seu vault usando a CLI Symbiotic:

=== "MainNet"

````
```bash

python3 symb.py check-opt-in-vault INSERT_OPERATOR_ADDRESS INSERT_VAULT_ADDRESS

```
````

=== "TestNet (Sepolia)"

````
```bash

python3 symb.py --chain sepolia check-opt-in-vault INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.vault }}

```
````

A saída mostrará `false` se você tiver cancelado com sucesso o vault e `true` se ainda estiver inscrito.

## Próximos passos

Depois de concluir o processo de desativação, se pretende voltar no futuro, pode seguir o [processo de ativação](/pt/node-operators/operators/onboarding/){target=\_blank} novamente.
