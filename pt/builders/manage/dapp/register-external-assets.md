---
title: Registrar Ativos Externos
description: As redes Tanssi se beneficiam da comunicação cross-chain nativa, permitindo transferências de tokens suaves e rápidas entre a cadeia nativa do token e outras cadeias.
categories: Appchain
---

# Registrar Ativos Externos

## Introdução {: #introduction  }

A transferência de ativos entre cadeias é crucial porque permite a movimentação contínua de ativos digitais em diferentes redes, aprimorando a interoperabilidade, a liquidez e a experiência do usuário. Para permitir transferências de ativos de e para duas redes, primeiro, um canal bidirecional deve ser aberto entre elas. Graças ao dApp Tanssi, abrir um canal é uma tarefa fácil e rápida. Consulte o artigo [Gerenciar Canais de Comunicação Cross-Chain](/pt/builders/manage/dapp/xcm-channels/){target=\_blank} para saber como fazer isso.

!!! nota
  Abrir um canal de comunicação bidirecional requer aprovação dos governadores de ambas as redes.

Depois que os canais de comunicação da sua rede forem estabelecidos, você pode registrar os ativos de outras cadeias (ativos externos) para começar a operar. Este guia irá guiá-lo pelo processo de registro de ativos externos usando o [Tanssi dApp](https://apps.tanssi.network){target=\_blank}.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para os exemplos deste guia, você precisará ter o seguinte:

- Uma rede com tecnologia Tanssi (Dedicada) executando [runtime 500](https://github.com/moondance-labs/tanssi/releases/tag/runtime-500){target=\_blank} ou superior
  --8<-- 'text/pt/builders/manage/dapp/prerequisites.md'

## Acessando o Painel de Registro de Ativos Externos {: #accesing-external-assets-management-panel }

--8<-- 'text/pt/builders/manage/dapp/cross-chain-config-panel.md'

O painel mostrará a configuração cross-chain da sua rede, juntamente com várias ações disponíveis. Em relação aos ativos externos, os elementos relevantes que são apresentados a você são:

1. **Registered Assets panel** - esta seção irá agrupar e apresentar a você todos os ativos registrados que sua rede já tem disponíveis
2. **Registered Assets List** - os ativos externos já registrados serão exibidos nesta seção, juntamente com suas informações associadas, como nome do ativo, símbolo, ID, oferta total e ID da rede onde é nativo
3. **Asset Registration** - esta opção permite que você selecione outros ativos externos disponíveis e registre-os. A [seção a seguir](#register-external-asset) explica como fazê-lo

![O painel de gerenciamento cross-chain](/images/builders/manage/dapp/register-external-assets/register-external-assets-1.webp)

## Registrar um Ativo Externo {: #register-external-asset}

Desde que sua rede já tenha estabelecido canais de comunicação bidirecionais com outra rede, o governador da rede pode registrar ativos externos.

Para fazer isso, clique em **Asset Registration** e depois:

1. Selecione pelo menos um dos ativos disponíveis na lista
2. Clique em **Register**

Você será solicitado a assinar a transação e, assim que ela for concluída, o ativo externo estará disponível localmente.

![Registro de ativos](/images/builders/manage/dapp/register-external-assets/register-external-assets-2.webp)

!!! nota
  O dApp apresenta apenas ativos conhecidos de redes conhecidas do ecossistema. Se o ativo que você precisa registrar não estiver listado, você terá que fazê-lo usando o portal do desenvolvedor.