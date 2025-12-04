---
title: Pagamento dos Serviços de Produção de Blocos
description: As redes implantadas através do Tanssi beneficiam dos serviços de produção de blocos fornecidos por um conjunto de operadores de nós, que são compensados com tokens Tanssi.
icon: octicons-server-24
categories: Appchain
---

# Pagamento dos Serviços de Produção de Blocos

## Introdução {: #introduction }

Como apresentado no artigo [Produção de Blocos como Serviço](/pt/learn/tanssi/network-services/block-production/#block-production-fees){target=\_blank}, existem dois custos principais associados que o governador da rede deve cobrir:

- **Sequencers assignment** - para a atribuição de sequenciadores pelo protocolo Tanssi, que acontece uma vez por sessão
- **Block production** - para cada bloco que é produzido em nome da rede

Neste guia, você aprenderá como usar o [Tanssi dApp](https://apps.tanssi.network){target=\_blank} para recarregar sua conta e manter a atividade da sua rede.

## Verificando os Pré-requisitos {: #checking-prerequisites }

Para os exemplos neste guia, você precisará do seguinte:

- Uma rede com tecnologia Tanssi (Teste Rápido ou Dedicado)
- A conta que você usou ao registrar a rede, importada em qualquer uma das [carteiras suportadas](/pt/builders/deploy/dapp/#supported-wallets){target=\_blank}

--8<-- 'text/pt/builders/manage/dapp/locate-registration-account.md'

## Topping-Up os Créditos da Sua Rede {: #topping-up }

Seguindo um modelo de pagamento conforme o uso, as redes devem ter fundos alocados para pagar pelos serviços, que, ao longo do tempo, serão deduzidos e queimados pelo protocolo Tanssi a cada mudança de sessão para o custo da atribuição do sequenciador e para cada bloco pelo custo de produção do bloco.

Você pode verificar o saldo atual da sua rede e recarregá-lo usando o Tanssi dApp. Para fazer isso, acesse o [Tanssi dApp](https://apps.tanssi.network/){target=\_blank} e conecte a conta de registro da rede ao dApp. O site exibirá um cartão mostrando o status da sua rede. Este cartão inclui a previsão de atividade projetada abaixo da seção **Block Production** e o botão **Top Up**.

![Botão de ação de recarga no dApp](/images/builders/manage/dapp/services-payment/services-payment-1.webp)

Clicar no botão **Top Up** exibe uma barra lateral onde as seguintes informações podem ser vistas:

- **Current balance** - o saldo atual alocado para o serviço de produção de blocos da rede
- **Available balance** - o saldo disponível na conta de registro da rede, que está conectada ao dApp
- **Current cost** - custo atual por atribuição de sequenciador e custo por bloco
- **Projected forecast** - o dia estimado em que a rede ficará sem fundos e deixará de ser atendida

Para estender o horizonte projetado da rede, execute as seguintes ações:

1. Insira a quantidade de tokens para comprar serviços de produção de blocos
1. Clique em **Top Up**

![Barra lateral de recarga](/images/builders/manage/dapp/services-payment/services-payment-2.webp)

Você será solicitado a assinar a transação e, depois que ela for concluída, sua rede se beneficiará de um horizonte de atividade estendida.

!!! atenção
    Se sua rede não tiver fundos suficientes para cobrir a atribuição do sequenciador e o valor de blocos de uma sessão, ela travará.