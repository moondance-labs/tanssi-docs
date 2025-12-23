---
title: Optar pela Tanssi
description: Saiba como fazer opt-in com seu nó registrado em cofres Symbiotic habilitados para Tanssi e na rede Tanssi para participar do protocolo e ganhar recompensas.
icon: octicons-plus-circle-24
categories: Operators
---

# Optar pela Tanssi

## Introdução {: #introduction }

Após [registrar seu nó no protocolo Symbiotic](/pt/node-operators/operators/onboarding/register-in-symbiotic/){target=\_blank}, as próximas etapas são fazer opt-in tanto nos cofres habilitados para Tanssi quanto na própria rede Tanssi. Como apresentado na [seção de onboarding](/pt/node-operators/operators/onboarding/){target=\_blank}, estas são a terceira e a quarta etapas.

Este guia percorre as etapas para fazer opt-in com sucesso em um cofre habilitado para Tanssi e na rede Tanssi, permitindo escolher entre vários métodos, incluindo usar a Symbiotic CLI, interagir diretamente com contratos inteligentes via Etherscan ou utilizar o Safe para configurações multisig.

## Verificando Pré-requisitos {: #checking-prerequisites }

Antes de fazer opt-in em um cofre habilitado para Tanssi e na rede Tanssi, certifique-se de que:

- Você tem um nó corretamente [configurado e em execução](/pt/node-operators/operators/onboarding/run-an-operator/){target=\_blank}
- Você [se registrou como operator](/pt/node-operators/operators/onboarding/register-in-symbiotic/){target=\_blank} no registro Symbiotic

Para seguir este guia, você deve interagir com contratos inteligentes: um do protocolo principal da Symbiotic e outro da integração da Tanssi com a Symbiotic.

--8<-- 'text/pt/node-operators/operators/onboarding/run-an-operator/prerequisites.md'

## Optar por Cofres Habilitados para Tanssi {: #opt-in-tanssi-vaults }

Antes de habilitar seu operator para estar ativo na rede Tanssi, você deve fazer opt-in em pelo menos um dos cofres habilitados para Tanssi. As seções a seguir descrevem várias formas de optar pelos cofres.

### Optar Usando a Symbiotic CLI {: #opt-in-tanssi-vaults-with-cli }

Se você instalou corretamente a [Symbiotic CLI](#set-up-the-cli) e deseja assinar a transação usando um dispositivo Ledger, execute o comando a seguir, substituindo `INSERT_VAULT_ADDRESS` pelo endereço específico que você quer ingressar e `INSERT_OPERATOR_ADDRESS` pela sua conta:

=== "MainNet"

    ```bash
    python3 symb.py opt-in-vault INSERT_VAULT_ADDRESS --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-in-vault {{ networks.symbiotic.contracts.sepolia.vault }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

Se quiser assinar a transação diretamente usando a chave privada da conta do operator, execute o comando abaixo, substituindo o parâmetro `INSERT_PRIVATE_KEY`:

=== "MainNet"

    ```bash
    python3 symb.py opt-in-vault INSERT_VAULT_ADDRESS --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-in-vault {{ networks.symbiotic.contracts.sepolia.vault }} --private-key INSERT_PRIVATE_KEY
    ```

!!! warning
    Observe que este método exige expor sua chave privada; portanto, não é recomendado.

### Optar Usando o Etherscan {: #opt-in-tanssi-vaults-with-etherscan }

Você pode interagir com os contratos inteligentes da Symbiotic usando o Etherscan e assinar a transação com uma carteira de navegador ([MetaMask](/pt/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, por exemplo).

Para abrir a página do contrato, acesse:

=== "MainNet"

    [Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#writeContract){target=\_blank}

Clique em **Connect to Web3** e selecione sua carteira preferida (por exemplo, MetaMask):

![Etapa Conectar ao Web3](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-1.webp)

!!! note
    Você pode configurar o MetaMask para usar uma carteira fria.

Após a conexão:

1. Expanda a função **`optin`**
2. Insira o `VAULT_ADDRESS` (`{{ networks.symbiotic.contracts.sepolia.vault }}` no TestNet Sepolia)
3. Clique em **Write** e assine a transação

![Registrar o operator](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-2.webp)

### Optar Usando o Safe para Configurações Multisig {: #opt-in-tanssi-vaults-with-safe }

Se você tiver uma conta [Safe](https://app.safe.global/){target=\_blank}, abra o **Transaction builder** e insira o seguinte endereço de contrato:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.vault_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.vault_registry }}

Finalmente, escolha a função **`optin`**, insira o `VAULT_ADDRESS` (`{{ networks.symbiotic.contracts.sepolia.vault }}` no TestNet Sepolia) e assine a transação.

### Verificar o Status do Registro {: #check-vault-registration }

Você pode verificar rapidamente seu status de registro no Etherscan. Abra o seguinte link:

=== "MainNet"

    [Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.vault_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.vault_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.vault_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.vault_registry }}#readContract){target=\_blank}

Na página do contrato:

1. Selecione a função **`isOptedIn`**
2. Cole a conta do seu operator no campo **who**
3. Insira o `VAULT_ADDRESS` no campo **where**
4. Clique em **Query**

Você obterá um resultado `true` se seu operator foi registrado corretamente e `false` caso contrário.

![Verificar o status do registro](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-3.webp)

Você também pode verificar o status do seu registro usando a Symbiotic CLI executando o comando abaixo, que imprime `true` ou `false` para qualquer endereço de operator em um cofre habilitado para Tanssi:

=== "MainNet"
    
    ```bash
    python3 symb.py check-opt-in-vault INSERT_OPERATOR_ADDRESS INSERT_VAULT_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia check-opt-in-vault INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.vault }}
    ```

E a saída se parece com:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py check-opt-in-vault INSERT_OPERATOR_ADDRESS INSERT_VAULT_ADDRESS</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

## Optar pela Rede Tanssi {: #opt-in-tanssi }

Antes de habilitar seu operator para estar ativo na rede Tanssi, você deve fazer opt-in na rede e ser aprovado pela equipe Tanssi. As seções a seguir descrevem várias formas de optar pela rede.

!!! note
    O endereço da Tanssi Network na MainNet será divulgado no lançamento.

### Optar Usando a Symbiotic CLI {: #opt-in-tanssi-with-cli }

Se você instalou corretamente a [Symbiotic CLI](#set-up-the-cli) e deseja assinar a transação usando um dispositivo Ledger, execute o seguinte comando, substituindo `INSERT_OPERATOR_ADDRESS`:

=== "MainNet"

    ```bash
    python3 symb.py opt-in-network {{ networks.symbiotic.contracts.mainnet.tanssi_network }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-in-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

Se você quiser assinar a transação diretamente usando a chave privada da conta do operator, execute o comando abaixo, substituindo o parâmetro `INSERT_PRIVATE_KEY`:

=== "MainNet"

    ```bash
    python3 symb.py opt-in-network {{ networks.symbiotic.contracts.mainnet.tanssi_network }} --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-in-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --private-key INSERT_PRIVATE_KEY
    ```

!!! warning
    Observe que este método exige expor sua chave privada; portanto, não é recomendado.

### Optar Usando o Etherscan {: #opt-in-tanssi-with-etherscan }

Você pode interagir com os contratos inteligentes da Symbiotic usando o Etherscan e assinar a transação com uma carteira de navegador ([MetaMask](/pt/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}, por exemplo).

Vá para a página do contrato abrindo o link:

=== "MainNet"

    [Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#writeContract){target=\_blank}

Clique em **Connect to Web3** e selecione sua carteira preferida (por exemplo, MetaMask):

![Etapa Conectar ao Web3](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-4.webp)

!!! note
    Você pode configurar o MetaMask para usar uma carteira fria.

Após a conexão:

1. Expanda a função **`optin`**
2. Insira o `TANSSI_NETWORK_ADDRESS`. Se estiver fazendo opt-in para a Tanssi MainNet, use `{{ networks.symbiotic.contracts.mainnet.tanssi_network }}`. Para TestNet, use `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}`
3. Clique em **Write** e assine a transação

![Registrar o operator](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-5.webp)

### Optar Usando o Safe para Configurações Multisig {: #opt-in-tanssi-with-safe }

Se você tiver uma conta [Safe](https://app.safe.global/){target=\_blank}, abra o **Transaction builder** e insira o seguinte endereço de contrato:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.network_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.network_registry }}

Finalmente, escolha a função **`optin`**, insira o endereço da Rede Tanssi (`{{ networks.symbiotic.contracts.mainnet.tanssi_network }}` para Tanssi MainNet e `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` para TestNet) e assine a transação.

### Verificar o Status do Registro {: #check-tanssi-registration }

Você pode verificar rapidamente seu status de registro no Etherscan. Abra o seguinte link:

=== "MainNet"

    [Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#readContract){target=\_blank}

Na página do contrato:

1. Selecione a função **`isOptedIn`**
2. Cole a conta do seu operator no campo **who**
3. Insira o `TANSSI_NETWORK_ADDRESS` no campo **where**. Se estiver optando pela Tanssi MainNet, use `{{ networks.symbiotic.contracts.mainnet.tanssi_network }}`. Para TestNet, use `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}`
4. Clique em **Query**

Você obterá um resultado `true` se seu operator foi registrado corretamente e `false` caso contrário.

![Verificar o status do registro](/images/node-operators/operators/onboarding/opt-in-to-tanssi/opt-in-to-tanssi-6.webp)

Você também pode verificar o status do seu registro usando a Symbiotic CLI executando o comando a seguir, que imprime `true` ou `false` para qualquer endereço de operator na Rede Tanssi:

=== "MainNet"
    
    ```bash
    python3 symb.py check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.mainnet.tanssi_network }}
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.tanssi_network }} 
    ```

E a saída se parece com:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.tanssi_network }}</span>
    <span data-ty>Connected to chain ID 1</span>
    <span data-ty>True</span>
    <br>
</div>

!!! note
    Fazer opt-in nas Redes Tanssi requer aprovação da equipe Tanssi. As solicitações para participar podem levar até uma semana.
