---
title: Exclusão Voluntária de Vault
description: Opcionalmente, cancele sua participação em um vault Tanssi. Aprenda a usar CLI, Etherscan ou Safe e verifique seu status de exclusão.
icon: octicons-sign-out-24
template: main.html
categories: Operators
---

# Exclusão Voluntária de Vault (Opcional)

## Introdução {: #introduction }

Esta página detalha a etapa final opcional no processo de desligamento Tanssi: a exclusão voluntária de um vault específico. Embora não seja obrigatória, esta ação permite que os operators desassocie suas contas de vaults individuais. Antes de prosseguir com esta etapa, certifique-se de ter cumprido todas as condições descritas no guia de [pré-requisitos](/pt/node-operators/operators/offboarding/prerequisites/){target=\_blank}.

Este guia fornece instruções sobre como cancelar a participação usando um dos métodos disponíveis e como verificar a conclusão bem-sucedida dessa ação.

## Cancelamento de Participação em um Vault {: #opting-out-of-a-vault }

Para prosseguir com a exclusão de um vault, use um dos métodos detalhados nas seções a seguir.

### Usando a CLI Symbiotic {: #opt-out-vault-with-cli }

Usando um dispositivo Ledger:

=== "MainNet"

    ```bash
    python3 symb.py opt-out-vault INSERT_VAULT_ADDRESS --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-out-vault {{ networks.symbiotic.contracts.sepolia.vault }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

Para assinar com uma chave privada:

=== "MainNet"

    ```bash
    python3 symb.py opt-out-vault INSERT_VAULT_ADDRESS --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-out-vault {{ networks.symbiotic.contracts.sepolia.vault }} --private-key INSERT_PRIVATE_KEY
    ```

!!! warning
    Observe que este método exige expor sua chave privada; portanto, não é recomendado.

### Usando o Etherscan {: #opt-out-vault-with-etherscan }

Acesse o contrato via Etherscan:

=== "MainNet"

    [Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#writeContract){target=\_blank}

Certifique-se de selecionar **Contract** e **Write Contract**, depois clique em **Connect to Web3** e selecione sua carteira preferida (por exemplo, MetaMask):
![Conectar ao Web3](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-4.webp)

1. Expanda a função **optOut**
2. Insira o `VAULT_ADDRESS` no campo **where** (por exemplo, `{{ networks.symbiotic.contracts.sepolia.vault }}` no Sepolia TestNet)
3. Clique em **Write** e assine a transação

![Cancelar operator](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-5.webp)

### Usando o Safe {: #opt-out-vault-with-safe }

Para contas Safe, use estes endereços de contrato no **Transaction Builder**:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.vault_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.vault_registry }}

Em seguida, escolha a função optOut, insira o `VAULT_ADDRESS` ao qual seu nó está registrado (por exemplo, `{{ networks.symbiotic.contracts.sepolia.vault }}` no Sepolia TestNet) e assine a transação.

## Verificar o Status de Exclusão de Vault {: #verify-vault-opt-out-status }

Depois de enviar a transação de exclusão de vault, você pode verificar seu status de exclusão usando um dos métodos abaixo.

### Usando o Etherscan

Você pode verificar o status de exclusão do seu vault no Etherscan:

=== "MainNet"

    [Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#readContract){target=\_blank}

Na página do contrato:

Certifique-se de selecionar **Contract** e **Write Contract**, depois clique em **Connect to Web3** e selecione sua carteira preferida (por exemplo, MetaMask):
1. Selecione a guia **Read Contract**
2. Localize e expanda a função **isOptedIn**
3. Cole a conta do seu operator no campo **who**
4. Insira o endereço do vault no campo **where**
5. Clique em **Query**

Você obterá um resultado `false` se o operator tiver cancelado a participação no vault com sucesso e `true` se ainda estiver inscrito.

![Verifique o status do registro](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-6.webp)

### Usando a CLI Symbiotic

Você também pode verificar o status de exclusão do seu vault usando a CLI Symbiotic:

=== "MainNet"

    ```bash
    python3 symb.py check-opt-in-vault INSERT_OPERATOR_ADDRESS INSERT_VAULT_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia check-opt-in-vault INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.vault }}
    ```

A saída mostrará `false` se você tiver cancelado o vault com sucesso e `true` se ainda estiver inscrito.

## Próximos Passos

Após concluir o processo de desligamento, se planeja retornar no futuro, siga novamente o [processo de onboarding](/pt/node-operators/operators/onboarding/){target=\_blank}.
