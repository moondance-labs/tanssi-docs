---
title: Usando Ledger com sua EVM Appchain
description: Aprenda a configurar e usar carteiras de hardware Ledger com EVM appchains com tecnologia Tanssi para armazenamento seguro de chaves offline e assinatura de transações.
icon: material-wallet-outline
categories: EVM-Template
---

# Interagindo com EVM appchains com tecnologia Tanssi Usando Ledger

## Introdução {: #introduction }

Desenvolvedores e usuários de EVM appchains com tecnologia Tanssi, como a [demonstração Tanssi](https://apps.tanssi.network/demo){target=\_blank}, têm uma variedade de opções quando se trata de carteiras. Em relação às carteiras frias, que armazenam suas chaves privadas em um ambiente seguro e offline, [Ledger](https://www.ledger.com/){target=\_blank} é uma das opções mais populares. A Ledger oferece suporte total para blockchains Substrate, como a rede Tanssi.

Os dispositivos Ledger são carteiras de hardware projetadas para armazenar as chaves privadas offline. Eles são usados para verificar e assinar as transações, mas ainda precisam de uma camada de software para fornecer a interface do usuário que interage com as redes, constrói as transações e envia as transações assinadas de volta para a rede assim que o usuário as tiver verificado.

Este guia leva você por todas as etapas necessárias para usar seu dispositivo Ledger com EVM appchains com tecnologia Tanssi.

## Configurando seu dispositivo Ledger {: #setting-up-ledger-device }

Se você tem um dispositivo Ledger novo, consulte o [site oficial](https://support.ledger.com/article/4404389503889-zd){target=\_blank} para obter um guia sobre como iniciá-lo com a configuração inicial.

Agora, com seu Ledger já iniciado, instale o aplicativo _Ethereum_ seguindo as seguintes etapas:

1. Abra o aplicativo Ledger Live em seu computador.
2. Vá para My Ledger.
3. Conecte e desbloqueie o dispositivo.

Por fim, procure o aplicativo **Ethereum (ETH)** no Ledger Live e instale-o em seu dispositivo.

![Instale Ethereum no Ledger Live](/images/builders/toolkit/ethereum-api/wallets/ledger/ledger-1.webp)

E é isso. Seu dispositivo agora tem uma conta Ethereum e é capaz de assinar transações em qualquer EVM appchain com tecnologia Tanssi.

## Adicionando o Ledger a uma carteira quente {: #adding-Ledger-hot-wallet }

Conforme apresentado na [introdução](#introduction), uma carteira de hardware Ledger fornece armazenamento seguro offline para chaves privadas, permitindo que os usuários verifiquem e assinem transações. No entanto, por design, ela não pode interagir com blockchains ou dApps sozinha, nem oferece uma interface do usuário para gerenciar ativos. Para complementar o dispositivo, uma carteira quente é necessária. O usuário pode escolher qualquer carteira compatível com Ethereum.

Para fins de demonstração, mostraremos como configurar [Metamask](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank} para funcionar com sua carteira de hardware, mas essas etapas são geralmente aplicáveis a qualquer outra carteira que suporte Ledger. Para seguir as etapas, certifique-se de ter o Metamask instalado em seu navegador, abra a extensão e clique no ícone suspenso ao lado do nome da conta.

![Conectar Ledger](/images/builders/toolkit/ethereum-api/wallets/ledger/ledger-2.webp)

Agora clique no botão **+ Adicionar conta ou carteira de hardware**.

![Conectar Ledger](/images/builders/toolkit/ethereum-api/wallets/ledger/ledger-3.webp)

Selecione **Carteira de hardware** nas opções disponíveis.

![Conectar Ledger](/images/builders/toolkit/ethereum-api/wallets/ledger/ledger-4.webp)

Na tela seguinte:

1. Selecione a caixa **LEDGER**. Você será solicitado a conectar seu Ledger, desbloqueá-lo e abrir o aplicativo Ethereum.
2. Clique em **Continuar**.

![Conectar Ledger](/images/builders/toolkit/ethereum-api/wallets/ledger/ledger-5.webp)

Finalmente, você será apresentado com uma lista de contas derivadas. Selecione aquela que você deseja importar, clique em **Desbloquear** e pronto! Sua carteira Metamask agora pode assinar transações usando seu dispositivo Ledger.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
