--- 
title: Cancelar a participação na Tanssi
description: Saiba como iniciar o processo de cancelamento de uma rede Tanssi, cancelando a participação usando vários métodos e como verificar seu status.
icon: octicons-sign-out-24
template: main.html
categories: Operadores
--- 

# Cancelar a participação na Tanssi

## Introdução {: #introduction }

A capacidade de gerenciar a participação dos operadores de nós no ecossistema Tanssi é crucial. Este guia aborda a etapa inicial do processo de cancelamento: cancelar a participação na rede Tanssi. Essa ação sinaliza sua intenção de retirada e permite que o protocolo Tanssi verifique sua identidade como o operador legítimo.

Durante o processo de integração, uma etapa foi a participação na rede Tanssi para se tornar um operador. Este guia irá guiá-lo pelo processo de cancelamento. Existem várias maneiras de interagir com os contratos inteligentes envolvidos. Consulte o [artigo de pré-requisitos](/pt/node-operators/operators/offboarding/prerequisites/){target=\_blank} para avaliar qual alternativa é a mais adequada para você.

!!! nota "Validação de identidade"
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

!!! atenção
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
2. Insira o `TANSSI_NETWORK_ADDRESS` no campo **where**. Se você estiver cancelando a participação da Tanssi MainNet, use `{{ networks.symbiotic.contracts.mainnet.tanssi_network }}`. Para TestNet, use `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}`
3. Clique em **Escrever** e assine a transação

![Cancelar operador](/images/node-operators/operators/offboarding/offboarding-process/offboarding-process-2.webp)

!!! atenção
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
2. Localize e expanda a função **isOptedIn**
3. Cole o endereço da conta do seu operador no campo **who**.
4. Insira o `TANSSI_NETWORK_ADDRESS` no campo **where**. Se você estiver cancelando a participação da Tanssi MainNet, use `{{ networks.symbiotic.contracts.mainnet.tanssi_network }}`. Para TestNet, use `{{ networks.symbiotic.contracts.sepolia.tanssi_network }}`
5. Clique em **Consultar**

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

!!! nota "Fornecer feedback"
    Considere fornecer feedback no [formulário](https://www.tanssi.network/operator-offboarding){target=\\\_blank} de cancelamento sobre sua experiência para ajudar a melhorar a rede Tanssi.

## Pausar operações (opcional) {: #pause-operations }

Assim que receber a confirmação da remoção do seu operador pela equipe Tanssi, você poderá parar com segurança quaisquer serviços em execução relacionados ao seu operador. Se necessário, faça backup de arquivos de configuração importantes, logs ou quaisquer dados relevantes antes de excluí-los. Em seguida, você pode reaproveitar, encerrar ou desligar toda a sua infraestrutura.

## Próximas etapas (opcional) {: #next-steps-vault-opt-out }

Depois de cancelar a participação da rede e informar a equipe Tanssi enviando o formulário de cancelamento, você pode realizar uma etapa opcional adicional e [cancelar a participação de quaisquer cofres específicos](/pt/node-operators/operators/offboarding/vault-opt-out/){target=\\\_blank} com os quais seu operador possa estar associado.


