---
title: Como Conectar a MetaMask
description: Este guia mostra como conectar a MetaMask, uma carteira Ethereum baseada em navegador, à sua rede compatível com EVM alimentada pelo Tanssi e como transferir fundos.
icon: material-wallet-outline
categories: EVM-Template
---

# Interagindo com sua Rede EVM Tanssi Usando MetaMask

## Introdução {: #introduction }

Desenvolvedores que constroem dApps em cima de redes EVM alimentadas por Tanssi podem aproveitar seus recursos de compatibilidade Ethereum integrando carteiras Ethereum conhecidas, como [MetaMask](https://metamask.io){target=\_blank}. Ao fazer isso, eles podem usar a biblioteca injetada que MetaMask fornece para interagir com a rede EVM Tanssi.

Este guia leva você por todas as etapas necessárias: desde a instalação da Metamask, configuração de uma carteira e, finalmente, conectando-a à sua rede EVM Tanssi.

!!! nota
    Você nunca deve compartilhar sua frase semente (mnemônico) ou chave privada com ninguém. Isso lhes dá acesso direto aos seus fundos. Este guia é apenas para fins educacionais.

## Instale a Extensão MetaMask {: #install-the-metamask-extension }

Primeiro, você começará com uma instalação [MetaMask](https://metamask.io){target=\_blank} nova e padrão da Chrome store. Após baixar, instalar e inicializar a extensão, siga as etapas de **Começar** para [configurar a carteira](#setup-a-wallet). Lá, você precisa criar uma carteira, definir uma senha e armazenar sua frase secreta de backup (isso dá acesso direto aos seus fundos, portanto, certifique-se de armazená-los em um local seguro).

!!! nota
    A extensão do navegador Metamask é compatível com Chrome, navegadores baseados em Chromium (como Microsoft Edge e Opera) e Firefox. Metamask também está disponível como um aplicativo móvel para dispositivos iOS e Android.

## Configurar uma Carteira {: #setup-a-wallet }

Após instalar [MetaMask](https://metamask.io){target=\_blank}, a configuração abrirá automaticamente uma nova tarefa com uma tela de boas-vindas. Aqui, você tem duas opções:

- **Criar uma nova carteira** - você passará por algumas etapas para obter uma nova frase semente. Certifique-se de armazenar esta frase com segurança e não compartilhá-la publicamente
- **Importar uma carteira existente** - você já tem uma frase semente armazenada e deseja restaurar uma conta a partir dessa frase de recuperação

![Interface de Configuração do Metamask](/images/builders/toolkit/ethereum-api/wallets/metamask/metamask-1.webp)

Depois de clicar na opção que se adapta às suas necessidades, siga as etapas e você deverá estar totalmente configurado.

!!! nota
    Várias contas podem ser derivadas de uma frase semente alterando o que é conhecido como o índice de endereço. Por padrão, ao criar ou importar uma conta a partir da frase semente, você obtém a conta com o índice de endereço 0. Você pode obter os outros índices apenas adicionando novas contas na tela principal da Metamask.

## Importar Contas {: #import-accounts }

Depois de criar uma carteira ou importar uma existente, você também pode importar qualquer conta para a MetaMask se tiver as chaves privadas.

Para este exemplo, você usará chaves privadas da conta de desenvolvimento. Clique no botão de troca de conta para importar uma conta usando suas chaves privadas. É onde diz **Account 1**.

![Importando conta do menu de chaves privadas da metamask](/images/builders/toolkit/ethereum-api/wallets/metamask/metamask-2.webp)

Em seguida, clique em **Import Account**.

![Importando conta do menu de troca de conta de chave privada](/images/builders/toolkit/ethereum-api/wallets/metamask/metamask-3.webp)

Finalmente, insira as chaves privadas da conta que você está tentando importar. Depois de inserir a chave privada, clique em **Import**.

![Cole sua chave de conta na MetaMask](/images/builders/toolkit/ethereum-api/wallets/metamask/metamask-4.webp)

Você deve terminar com uma **Conta 2** importada que se parece com isto:

![MetaMask mostrando sua nova Conta 2](/images/builders/toolkit/ethereum-api/wallets/metamask/metamask-5.webp)

## Conecte a MetaMask à sua Rede EVM Tanssi {: #connect-metamask-to-evm-network }

Depois de ter [MetaMask](https://metamask.io){target=\_blank} instalado e ter criado ou importado uma conta, você pode conectá-la à sua rede EVM Tanssi. Para fazer isso, siga os seguintes passos:

1. Clique no menu do seletor de rede no canto superior esquerdo
1. Selecione **Adicionar Rede**

![Adicionar nova rede no menu Metamask](/images/builders/toolkit/ethereum-api/wallets/metamask/metamask-6.webp)

Em seguida, vá para a parte inferior da página e clique em **Adicionar rede manualmente**:

![Adicionar rede manualmente na Metamask](/images/builders/toolkit/ethereum-api/wallets/metamask/metamask-7.webp)

Aqui, você pode configurar a MetaMask para as seguintes redes:

|         Variável          |                        Valor                        |
|:-------------------------:|:---------------------------------------------------:|
|       Nome da Rede        |             `Tanssi demo EVM appchain`              |
|          RPC URL          |    `{{ networks.dancelight.demo_evm_rpc_url }}`     |
|         Chain ID          |    `{{ networks.dancelight.demo_evm_chain_id }}`    |
|     Símbolo (Opcional)     |  `{{ networks.dancelight.demo_evm_token_symbol }}`  |
| Explorador de Blocos (Opcional) | `{{ networks.dancelight.demo_evm_blockscout_url }}` |

Para fazer isso, preencha as seguintes informações:

1. **Nome da rede** - nome que representa a rede à qual você está se conectando
2. **RPC URL** - Endpoint RPC da rede
3. **Chain ID** - ID da cadeia da rede compatível com Ethereum
4. **Símbolo** - (opcional) símbolo do token nativo da rede
5. **Explorador de Blocos** - (opcional) URL do explorador de blocos
6. Depois de verificar todas as informações, clique em **Salvar**
![Adicionar rede na Metamask](/images/builders/toolkit/ethereum-api/wallets/metamask/metamask-8.webp)

Depois de adicionar a rede, você será redirecionado para uma tela informando que você adicionou uma rede com sucesso. Além disso, você será solicitado a **Mudar para Tanssi demo EVM appchain**, a rede adicionada neste exemplo.

![Rede adicionada com sucesso na Metamask](/images/builders/toolkit/ethereum-api/wallets/metamask/metamask-9.webp)

## Interaja com a Rede {: #interact-with-network }

Depois de [conectar a Metamask](#connect-metamask-to-evm-network) à sua rede EVM Tanssi, você pode começar a usar sua carteira por:

- Solicitando tokens {{ networks.dancelight.demo_evm_token_symbol }} do [demo EVM network faucet](/pt/builders/tanssi-network/testnet/demo-evm-network/#faucet)
- Enviando uma transferência de token para outro endereço
- Adicionando ERC-20s à Metamask e interagindo com eles
- Adicionando ERC-721s à Metamask e interagindo com eles

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
