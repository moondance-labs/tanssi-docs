---
title: Gerenciar Canais de Comunicação Cross-Chain
description: As redes Tanssi se beneficiam da comunicação cross-chain nativa, que permite pontes rápidas e seguras aproveitando a arquitetura em que são construídas.
categories: Appchain
---

# Gerenciar Canais de Comunicação Cross-Chain

## Introdução {: #Introduction}

Conforme apresentado no artigo [Comunicação Cross-Chain Nativa](/pt/learn/framework/xcm/){target=\_blank} da seção Aprenda, todas as redes Tanssi têm uma capacidade inerente de se comunicar e interoperar com qualquer outra rede no ecossistema. Esse recurso de comunicação cross-chain nativo é possível graças à infraestrutura única em que as redes são construídas, aproveitando o formato Cross-Consensus Message (XCM para abreviar), que facilita a comunicação entre diferentes sistemas de consenso.

A primeira etapa para habilitar a comunicação entre as redes é [abrir um canal](/pt/learn/framework/xcm/#channel-registration){target=\_blank}. O processo de abertura de um canal começa enviando uma solicitação para a rede com a qual você deseja estabelecer comunicações. Depois que a solicitação for aceita pelo governador da cadeia de destino, um canal será aberto.

Neste guia, você aprenderá como usar o [Tanssi dApp](https://apps.tanssi.network){target=\_blank} para gerenciar os canais de comunicação cross-chain da sua rede.

## Verificando Pré-requisitos {: #checking-prerequisites}

Para os exemplos deste guia, você precisará ter o seguinte:

- Uma rede Tanssi (Dedicada) executando o [runtime 500](https://github.com/moondance-labs/tanssi/releases/tag/runtime-500){target=\_blank} ou superior
  --8<-- 'text/pt/builders/manage/dapp/prerequisites.md'

## Acessando o Painel de Gerenciamento de Canais {: #accesing-channel-management-panel }

--8<-- 'text/pt/builders/manage/dapp/cross-chain-config-panel.md'

O painel mostrará o status dos canais de comunicação da sua rede, juntamente com várias ações disponíveis. Os elementos que você recebe são:

1. **Sovereign account** - é uma conta sem chave que pertence à rede em um sistema de consenso diferente, a cadeia de retransmissão neste caso. Ela só pode ser usada pelo governador da rede.

   Antes de abrir um novo canal, a conta soberana da rede na cadeia de retransmissão deve ser financiada com tokens suficientes para serem bloqueados como um depósito de canal.

   Nesta seção, você pode ver o saldo da conta soberana da sua rede, copiar seu endereço e depositar tokens

2. **Incoming/Outgoing channel requests** - toda solicitação de canal precisa ser aceita pela contraparte antes que qualquer mensagem possa ser enviada.

   Nesta seção, você pode ver a lista de solicitações de saída pendentes e cancelá-las. Você também pode ver quaisquer solicitações de canal de entrada que sua rede possa ter recebido e aceitar o canal

3. **Established channels** - Depois que o governador da cadeia de destino aceitar a solicitação do canal, o canal se torna aberto e disponível para transmissão de mensagens.

   Nesta seção, você pode ver a lista de canais aceitos que sua rede possui, a direção em que as mensagens fluem pelo canal e cancelar o canal

4. **Request to open new channels** - esta opção permite que você selecione uma rede existente no ecossistema e solicite a abertura de um canal. A [próxima seção](#request-new-channel) explica como fazer isso

![O painel de gerenciamento de canais](/images/builders/manage/dapp/xcm-channels/xcm-channels-1.webp)

## Solicitação para Abrir Novo Canal {: #request-new-channel }

Desde que sua rede tenha fundos suficientes para o depósito na conta soberana da cadeia de retransmissão, o governador da rede pode solicitar a abertura de um novo canal com qualquer outra rede.

Para fazer isso, clique em **HRMP Channels** e, em seguida:

1. Selecione a rede com a qual você deseja estabelecer um canal
2. Clique em **Request Channel**

Você será solicitado a assinar a transação e, assim que ela for concluída, a cadeia de destino receberá a solicitação.

![Solicitação de abertura de canal](/images/builders/manage/dapp/xcm-channels/xcm-channels-2.webp)
