---
title: Opt Out from Tanssi
description: Learn how to initiate the offboarding process from a Tanssi network by opting out using various methods and how to verify your status.
icon: octicons-sign-out-24
template: main.html
categories: Operators
---

## { "source_path": "node-operators/operators/offboarding/opt-out-from-tanssi.md", "source_language": "EN", "target_language": "PT", "checksum": "dddc68adf27bbc53e6e4a0a532a065756b26b00f6b5286ef73b503181f3ab30f", "content": "--- title: Opt Out from Tanssi description: Learn how to initiate the offboarding process from a Tanssi network by opting out using various methods and how to verify your status. icon: octicons-sign-out-24 template: main.html categories: Operators

# Opt Out from Tanssi

## Introduction {: #introduction }

The ability to manage node operators' participation within the Tanssi ecosystem is crucial. This guide addresses the initial step in the offboarding process: opting out of the Tanssi network. This action signals your intent to withdraw and allows the Tanssi protocol to verify your identity as the legitimate operator.

During the onboarding process, one step was opting in to the Tanssi network to become an operator. This guide will walk you through the process of opting out. There are several ways to interact with the smart contracts involved. Refer to the [prerequisites article](/node-operators/operators/offboarding/prerequisites/){target=\\\_blank} to evaluate which alternative suits you best.

!!! note "Identity Validation"
When opting out, you sign the transaction using the private key or Ledger device associated with your operator account. This signature serves as cryptographic proof that you are the legitimate owner of the operator account, ensuring that only authorized operators can initiate the offboarding process.

````
```bash

```
````

### Using the Symbiotic CLI {: #opt-out-network-with-cli }

````
```bash

````
    ```

=== "MainNet"

````
    ```bash

python3 symb.py opt-out-network {{ networks.symbiotic.contracts.mainnet.tanssi_network }}  --ledger --ledger-account INSERT_OPERATOR_ADDRESS

    ```


```bash


    ```

````

    ```bash
=== "MainNet"
    ```

````
```bash

python3 symb.py opt-out-network {{ networks.symbiotic.contracts.mainnet.tanssi_network }} --private-key INSERT_PRIVATE_KEY

```
````

=== "TestNet (Sepolia)"

````
```bash

python3 symb.py --chain sepolia opt-out-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --private-key INSERT_PRIVATE_KEY

```
````

!!! warning
Note that this method requires you to expose your private key; therefore, it is not recommended.

### Using Etherscan {: #opt-out-network-with-etherscan }

You can interact directly with the smart contract through Etherscan using a browser wallet like MetaMask.

=== "MainNet"

```
[Contract address: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#writeContract){target=\\_blank}
```

=== "TestNet (Sepolia)"

```
[Contract address: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#writeContract){target=\\_blank}
```

Make sure to select **Contract** and **Write Contract**, then click on **Connect to Web3**, and select your preferred wallet (e.g., MetaMask):
![Connect to Web3 step](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-1.webp)

1. Expand the **optOut** function
1. Insert the `TANSSI_NETWORK_ADDRESS` in the **where** field. If you are opting out of Tanssi MainNet, use `{{ networks.symbiotic.contracts.mainnet.tanssi_network }}`. For TestNet use `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}`
1. Click **Write** and sign the transaction

![Opt out operator](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-2.webp)

!!! warning
After submitting your opt out transaction, save the transaction hash. You'll need this hash later for verification in the [operation offboarding form](https://www.tanssi.network/operator-offboarding){target=\\\_blank}.

### Using Safe for Multisig Setups {: #opt-out-network-with-safe }

For [Safe](https://app.safe.global/){target=\\\_blank} accounts, use the **Transaction Builder** with these addresses:

=== "MainNet"

```
{{ networks.symbiotic.contracts.mainnet.network_registry }}
```

=== "TestNet (Sepolia)"

```
{{ networks.symbiotic.contracts.sepolia.network_registry }}
```

Finally, pick the optOut function, insert the `TANSSI_NETWORK_ADDRESS` to which your node is currently registered (`{{ networks.symbiotic.contracts.mainnet.tanssi_network }}` for Tanssi MainNet and `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` for TestNet), and sign the transaction.

## Verifying Your Opt-Out Status {: #verify-opt-out-status }

After submitting the opt-out transaction, it's important to confirm that the action was successful and your operator is no longer opted into the network. You can verify this status using the methods outlined below.

### Using Etherscan to Verify {: #verify-opt-out-etherscan }

You can check your opt-out status on Etherscan by querying the smart contract:

=== "MainNet"

```
[Contract address: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#readContract){target=\\_blank}
```

    ```bash
=== "TestNet (Sepolia)"
    ```

[Contract address: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#readContract){target=\\_blank}

```
    ```bash

On the contract's page:

    ```
1. Make sure to select the **Read Contract** tab

1. Locate and expand the **isOptedIn** function

1. Paste your operator's account address in the **who** field.

1. Insert the `TANSSI_NETWORK_ADDRESS` in the **where** field. If you are opting out of Tanssi MainNet, use `{{ networks.symbiotic.contracts.mainnet.tanssi_network }}`. For TestNet use `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}`

   ```bash

   ```

You'll get a `false` result if your operator has successfully opted out, and `true` if they are still opted in.

````

```bash

```

````

=== "MainNet"

````

```bash
python3 symb.py check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.mainnet.tanssi_network }}
```

````

=== "TestNet (Sepolia)"

````

```bash
python3 symb.py --chain sepolia check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.tanssi_network }}
```

````

The output will show `false` if you have successfully opted out and `true` if you are still opted in.

## Contact Tanssi Team {: #contact-tanssi-team }

Following the network opt-out, the next stage of offboarding your Tanssi operator involves formally notifying the Tanssi team. This page guides you through submitting the required offboarding form and explaining what to expect during the final removal process.

After opting out from the network, notify the Tanssi team of your intention to stop running an operator. To do so, complete the [operator offboarding form](https://www.tanssi.network/operator-offboarding){target=\\\_blank} and wait for confirmation of request completion from the Tanssi team.

Upon receiving your request, your operator's removal will be scheduled. This step is semi-automated and may take time to complete. You will be notified by email when it is safe to decommission the node. Please do not decommission your node until you receive this notification.

!!! note "Provide feedback"
Consider providing feedback in the offboarding [form](https://www.tanssi.network/operator-offboarding){target=\\\_blank} about your experience to help improve the Tanssi network.

## Pause Operations (Optional) {: #pause-operations }

Once you receive confirmation of your operator's removal from the Tanssi team, you can safely stop any running services related to your operator. If needed, back up important configuration files, logs, or any relevant data before deleting them. Afterward, you may repurpose, terminate, or shut down your infrastructure entirely.

## Next Steps (Optional) {: #next-steps-vault-opt-out }

## After you have opted out of the network and informed the Tanssi team by submitting the offboarding form, you can take an additional optional step and [opt out of any specific vaults](/node-operators/operators/offboarding/vault-opt-out/){target=\\\_blank} your operator might be associated with. ", "translated_content": "--- title: Cancelar a participação na Tanssi description: Saiba como iniciar o processo de cancelamento de uma rede Tanssi, cancelando a participação usando vários métodos e como verificar seu status. icon: octicons-sign-out-24 template: main.html categories: Operadores

# Cancelar a participação na Tanssi

## Introdução {: #introduction }

A capacidade de gerenciar a participação dos operadores de nós no ecossistema Tanssi é crucial. Este guia aborda a etapa inicial do processo de cancelamento: cancelar a participação na rede Tanssi. Essa ação sinaliza sua intenção de retirada e permite que o protocolo Tanssi verifique sua identidade como o operador legítimo.

Durante o processo de integração, uma etapa foi a participação na rede Tanssi para se tornar um operador. Este guia irá guiá-lo pelo processo de cancelamento. Existem várias maneiras de interagir com os contratos inteligentes envolvidos. Consulte o [artigo de pré-requisitos](/node-operators/operators/offboarding/prerequisites/){target=\\\_blank} para avaliar qual alternativa é a mais adequada para você.

!!! note "Validação de identidade"
Ao cancelar a participação, você assina a transação usando a chave privada ou o dispositivo Ledger associado à sua conta de operador. Essa assinatura serve como prova criptográfica de que você é o proprietário legítimo da conta do operador, garantindo que apenas operadores autorizados possam iniciar o processo de cancelamento.

## Métodos para cancelar a participação de uma rede Tanssi {: #methods-for-opting-out }

Para cancelar a participação na rede Tanssi, você deve interagir com um contrato inteligente. Abaixo estão os diferentes métodos disponíveis para realizar essa ação. Escolha aquele que melhor se adapta à sua configuração e preferências de segurança.

### Usando a CLI Symbiotic {: #opt-out-network-with-cli }

A CLI Symbiotic fornece uma maneira direta de cancelar a participação da rede. Escolha o comando apropriado com base em sua rede e método de assinatura.

Usando um dispositivo Ledger:

=== "MainNet"

````

```bash
python3 symb.py opt-out-network {{ networks.symbiotic.contracts.mainnet.tanssi_network }}  --ledger --ledger-account INSERT_OPERATOR_ADDRESS
```

````

=== "TestNet (Sepolia)"

````

```bash
python3 symb.py --chain sepolia opt-out-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
```

````

Para assinar com uma chave privada:

=== "MainNet"

````

```bash
python3 symb.py opt-out-network {{ networks.symbiotic.contracts.mainnet.tanssi_network }} --private-key INSERT_PRIVATE_KEY
```

````

=== "TestNet (Sepolia)"

````

```bash
python3 symb.py --chain sepolia opt-out-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --private-key INSERT_PRIVATE_KEY
```

````

!!! warning
Observe que este método exige que você exponha sua chave privada; portanto, não é recomendado.

### Usando Etherscan {: #opt-out-network-with-etherscan }

Você pode interagir diretamente com o contrato inteligente através do Etherscan usando uma carteira de navegador como MetaMask.

=== "MainNet"

```

[Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#writeContract){target=\\_blank}

```

=== "TestNet (Sepolia)"

```

[Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#writeContract){target=\\_blank}

```

Certifique-se de selecionar **Contrato** e **Escrever Contrato**, depois clique em **Conectar ao Web3** e selecione sua carteira preferida (por exemplo, MetaMask):
![Etapa Conectar ao Web3](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-1.webp)

1. Expanda a função **optOut**
1. Insira o `TANSSI_NETWORK_ADDRESS` no campo **where**. Se você estiver cancelando a participação da Tanssi MainNet, use `{{ networks.symbiotic.contracts.mainnet.tanssi_network }}`. Para TestNet, use `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}`
1. Clique em **Escrever** e assine a transação

![Cancelar operador](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-2.webp)

!!! warning
Após enviar sua transação de cancelamento, salve o hash da transação. Você precisará desse hash mais tarde para verificação no [formulário de cancelamento de operação](https://www.tanssi.network/operator-offboarding){target=\\\_blank}.

### Usando Safe para configurações Multisig {: #opt-out-network-with-safe }

Para contas [Safe](https://app.safe.global/){target=\\\_blank}, use o **Construtor de transações** com estes endereços:

=== "MainNet"

```

{{ networks.symbiotic.contracts.mainnet.network_registry }}

```

=== "TestNet (Sepolia)"

```

{{ networks.symbiotic.contracts.sepolia.network_registry }}

```

Finalmente, escolha a função optOut, insira o `TANSSI_NETWORK_ADDRESS` no qual seu nó está atualmente registrado (`{{ networks.symbiotic.contracts.mainnet.tanssi_network }}` para Tanssi MainNet e `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` para TestNet) e assine a transação.

## Verificando seu status de cancelamento {: #verify-opt-out-status }

Após enviar a transação de cancelamento, é importante confirmar se a ação foi bem-sucedida e se seu operador não está mais inscrito na rede. Você pode verificar esse status usando os métodos descritos abaixo.

### Usando Etherscan para verificar {: #verify-opt-out-etherscan }

Você pode verificar seu status de cancelamento no Etherscan consultando o contrato inteligente:

=== "MainNet"

```

[Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#readContract){target=\\_blank}

```

=== "TestNet (Sepolia)"

```

[Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#readContract){target=\\_blank}

```

Na página do contrato:

1. Certifique-se de selecionar a guia **Ler contrato**
1. Localize e expanda a função **isOptedIn**
1. Cole o endereço da conta do seu operador no campo **who**.
1. Insira o `TANSSI_NETWORK_ADDRESS` no campo **where**. Se você estiver cancelando a participação da Tanssi MainNet, use `{{ networks.symbiotic.contracts.mainnet.tanssi_network }}`. Para TestNet, use `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}`
1. Clique em **Consultar**

![Verifique o status do cadastro](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-3.webp)

Você obterá um resultado `false` se seu operador tiver cancelado a participação com sucesso e `true` se ele ainda estiver participando.

### Usando a CLI Symbiotic para verificar {: #verify-opt-out-cli }

Você também pode verificar seu status de cancelamento usando a CLI Symbiotic:

=== "MainNet"

````

```bash
python3 symb.py check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.mainnet.tanssi_network }}
```

````

=== "TestNet (Sepolia)"

````

```bash
python3 symb.py --chain sepolia check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.tanssi_network }}
```

````

A saída mostrará `false` se você tiver cancelado a participação com sucesso e `true` se você ainda estiver participando.

## Entre em contato com a equipe Tanssi {: #contact-tanssi-team }

Após o cancelamento da rede, a próxima etapa do cancelamento do seu operador Tanssi envolve a notificação formal da equipe Tanssi. Esta página o orienta sobre como enviar o formulário de cancelamento necessário e explicar o que esperar durante o processo de remoção final.

Após cancelar a participação da rede, notifique a equipe Tanssi sobre sua intenção de parar de executar um operador. Para fazer isso, preencha o [formulário de cancelamento do operador](https://www.tanssi.network/operator-offboarding){target=\\\_blank} e aguarde a confirmação da conclusão da solicitação da equipe Tanssi.

Após receber sua solicitação, a remoção do seu operador será agendada. Esta etapa é semiautomática e pode levar algum tempo para ser concluída. Você será notificado por e-mail quando for seguro desativar o nó. Por favor, não desative seu nó até receber essa notificação.

!!! note "Fornecer feedback"
Considere fornecer feedback no [formulário](https://www.tanssi.network/operator-offboarding){target=\\\_blank} de cancelamento sobre sua experiência para ajudar a melhorar a rede Tanssi.

## Pausar operações (opcional) {: #pause-operations }

Assim que receber a confirmação da remoção do seu operador pela equipe Tanssi, você poderá parar com segurança quaisquer serviços em execução relacionados ao seu operador. Se necessário, faça backup de arquivos de configuração importantes, logs ou quaisquer dados relevantes antes de excluí-los. Em seguida, você pode reaproveitar, encerrar ou desligar toda a sua infraestrutura.

## Próximas etapas (opcional) {: #next-steps-vault-opt-out }

Depois de cancelar a participação da rede e informar a equipe Tanssi enviando o formulário de cancelamento, você pode realizar uma etapa opcional adicional e [cancelar a participação de quaisquer cofres específicos](/node-operators/operators/offboarding/vault-opt-out/){target=\\\_blank} com os quais seu operador possa estar associado.
",
"branch": "origin/main",
"commit": "730d1002d79d2768953bf457e466ad35881f1040"
}
