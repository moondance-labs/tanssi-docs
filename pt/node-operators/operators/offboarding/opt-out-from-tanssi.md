---
title: Cancelar a Participação na Tanssi
description: Saiba como iniciar o processo de desligamento de uma rede Tanssi, cancelando a participação por vários métodos e como verificar seu status.
icon: octicons-sign-out-24
template: main.html
categories: Operators
---

# Cancelar a Participação na Tanssi

## Introdução {: #introduction }

A capacidade de gerenciar a participação dos operadores de nós no ecossistema Tanssi é crucial. Este guia aborda a etapa inicial do processo de desligamento: cancelar a participação na rede Tanssi. Essa ação sinaliza sua intenção de retirada e permite que o protocolo Tanssi verifique sua identidade como o operador legítimo.

Durante o processo de onboarding, uma etapa foi fazer opt-in na rede Tanssi para se tornar um operador. Este guia o conduz pelo processo de opt-out. Há várias maneiras de interagir com os contratos inteligentes envolvidos. Consulte o [artigo de pré-requisitos](/pt/node-operators/operators/offboarding/prerequisites/){target=\_blank} para avaliar qual alternativa se adapta melhor a você.

!!! note "Validação de identidade"
    Ao cancelar a participação, você assina a transação usando a chave privada ou o dispositivo Ledger associado à sua conta de operador. Essa assinatura serve como prova criptográfica de que você é o proprietário legítimo da conta do operador, garantindo que apenas operadores autorizados possam iniciar o processo de desligamento.

## Métodos para Cancelar a Participação de uma Rede Tanssi {: #methods-for-opting-out }

Para cancelar a participação na rede Tanssi, você deve interagir com um contrato inteligente. A seguir estão os diferentes métodos disponíveis para realizar essa ação. Escolha o que melhor se adapta à sua configuração e preferências de segurança.

### Usando a CLI Symbiotic {: #opt-out-network-with-cli }

A CLI Symbiotic oferece uma maneira simples de cancelar a participação na rede. Escolha o comando apropriado com base na sua rede e no método de assinatura.

Usando um dispositivo Ledger:

=== "MainNet"

    ```bash
    python3 symb.py opt-out-network {{ networks.symbiotic.contracts.mainnet.tanssi_network }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-out-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --ledger --ledger-account INSERT_OPERATOR_ADDRESS
    ```

Para assinar com uma chave privada:

=== "MainNet"

    ```bash
    python3 symb.py opt-out-network {{ networks.symbiotic.contracts.mainnet.tanssi_network }} --private-key INSERT_PRIVATE_KEY
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia opt-out-network {{ networks.symbiotic.contracts.sepolia.tanssi_network }} --private-key INSERT_PRIVATE_KEY
    ```

!!! warning
    Observe que este método exige expor sua chave privada; portanto, não é recomendado.

### Usando Etherscan {: #opt-out-network-with-etherscan }

Você pode interagir diretamente com o contrato inteligente pelo Etherscan usando uma carteira de navegador como a MetaMask.

=== "MainNet"

    [Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#writeContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#writeContract){target=\_blank}

Certifique-se de selecionar **Contract** e **Write Contract**, depois clique em **Connect to Web3** e selecione sua carteira preferida (por exemplo, MetaMask):
![Conectar ao Web3](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-1.webp)

1. Expanda a função **optOut**
2. Insira o `TANSSI_NETWORK_ADDRESS` no campo **where**. Se você estiver cancelando a participação na Tanssi MainNet, use `{{ networks.symbiotic.contracts.mainnet.tanssi_network }}`. Para a TestNet, use `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}`
3. Clique em **Write** e assine a transação

![Cancelar operador](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-2.webp)

!!! warning
    Após enviar sua transação de cancelamento, salve o hash da transação. Você precisará desse hash posteriormente para verificação no [formulário de desligamento de operador](https://www.tanssi.network/operator-offboarding){target=\_blank}.

### Usando Safe para Configurações Multisig {: #opt-out-network-with-safe }

Para contas [Safe](https://app.safe.global/){target=\_blank}, use o **Transaction Builder** com estes endereços:

=== "MainNet"

    {{ networks.symbiotic.contracts.mainnet.network_registry }}

=== "TestNet (Sepolia)"

    {{ networks.symbiotic.contracts.sepolia.network_registry }}

Em seguida, escolha a função optOut, insira o `TANSSI_NETWORK_ADDRESS` no qual seu nó está registrado (`{{ networks.symbiotic.contracts.mainnet.tanssi_network }}` para Tanssi MainNet e `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}` para TestNet) e assine a transação.

## Verificando Seu Status de Cancelamento {: #verify-opt-out-status }

Depois de enviar a transação de cancelamento, é importante confirmar se a ação foi bem-sucedida e se seu operador não está mais participando da rede. Você pode verificar esse status usando os métodos a seguir.

### Usando Etherscan para Verificar {: #verify-opt-out-etherscan }

Você pode verificar seu status de cancelamento no Etherscan consultando o contrato inteligente:

=== "MainNet"

    [Endereço do contrato: {{ networks.symbiotic.contracts.mainnet.network_registry }}](https://etherscan.io/address/{{ networks.symbiotic.contracts.mainnet.network_registry }}#readContract){target=\_blank}

=== "TestNet (Sepolia)"

    [Endereço do contrato: {{ networks.symbiotic.contracts.sepolia.network_registry }}](https://sepolia.etherscan.io/address/{{ networks.symbiotic.contracts.sepolia.network_registry }}#readContract){target=\_blank}

Na página do contrato:

1. Selecione a guia **Read Contract**
2. Localize e expanda a função **isOptedIn**
3. Cole o endereço da conta do seu operador no campo **who**
4. Insira o `TANSSI_NETWORK_ADDRESS` no campo **where**. Para Tanssi MainNet, use `{{ networks.symbiotic.contracts.mainnet.tanssi_network }}`. Para TestNet, use `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}`
5. Clique em **Query**

![Verifique o status do cadastro](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-3.webp)

Você obterá um resultado `false` se o operador tiver cancelado a participação com sucesso e `true` se ainda estiver participando.

### Usando a CLI Symbiotic para Verificar {: #verify-opt-out-cli }

Você também pode verificar seu status de cancelamento usando a CLI Symbiotic:

=== "MainNet"

    ```bash
    python3 symb.py check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.mainnet.tanssi_network }}
    ```

=== "TestNet (Sepolia)"

    ```bash
    python3 symb.py --chain sepolia check-opt-in-network INSERT_OPERATOR_ADDRESS {{ networks.symbiotic.contracts.sepolia.tanssi_network }}
    ```

A saída mostrará `false` se você tiver cancelado a participação com sucesso e `true` se ainda estiver participando.

## Entre em Contato com a Equipe Tanssi {: #contact-tanssi-team }

Após o opt-out da rede, a próxima etapa do desligamento do operador Tanssi envolve notificar formalmente a equipe Tanssi. Esta página orienta você sobre como enviar o formulário de desligamento necessário e o que esperar durante o processo final de remoção.

Após cancelar a participação na rede, informe à equipe Tanssi sua intenção de parar de operar. Para isso, preencha o [formulário de desligamento do operador](https://www.tanssi.network/operator-offboarding){target=\_blank} e aguarde a confirmação da conclusão do pedido pela equipe Tanssi.

Ao receber sua solicitação, a remoção do seu operador será agendada. Essa etapa é semiautomática e pode levar algum tempo para ser concluída. Você será notificado por e-mail quando for seguro desativar o nó. Não desative seu nó até receber essa notificação.

!!! note "Fornecer feedback"
    Considere fornecer feedback no [formulário](https://www.tanssi.network/operator-offboarding){target=\_blank} de desligamento sobre sua experiência para ajudar a melhorar a rede Tanssi.

## Pausar Operações (Opcional) {: #pause-operations }

Depois de receber a confirmação da remoção do seu operador pela equipe Tanssi, você pode parar com segurança quaisquer serviços em execução relacionados ao operador. Se necessário, faça backup de arquivos de configuração importantes, logs ou quaisquer dados relevantes antes de excluí-los. Em seguida, você pode reaproveitar, encerrar ou desligar toda a sua infraestrutura.

## Próximas Etapas (Opcional) {: #next-steps-vault-opt-out }

Após cancelar a participação na rede e informar a equipe Tanssi enviando o formulário de desligamento, você pode dar um passo opcional adicional e [cancelar a participação em quaisquer cofres específicos](/pt/node-operators/operators/offboarding/vault-opt-out/){target=\_blank} com os quais seu operador possa estar associado.
