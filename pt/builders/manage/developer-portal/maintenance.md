---
title: Habilitando o Modo de Manutenção
description: Aprenda a usar o Sudo para ativar e desativar o modo de manutenção, que pausa sua rede enquanto ainda produz blocos e permite chamadas selecionadas.
icon: octicons-stop-24
categories: Appchain
---

# Habilitando o Modo de Manutenção

## Introdução {: #introduction}

A [paleta de Manutenção](https://moonbeam.network/news/what-is-maintenance-mode/){target=\_blank} é um módulo projetado para uso apenas em emergências que representam ameaças existenciais à rede. Habilitar o modo de manutenção em sua rede suspenderá o processamento de todas as transações regulares, incluindo interações com a EVM. A produção de blocos continua em uma cadência regular e permite que as funções de governança e staking continuem.

O modo de manutenção filtra (ignora) todas as chamadas fora da governança e staking. Uma vez que o modo de manutenção é encerrado, sua cadeia processará quaisquer transações pendentes que foram enfileiradas enquanto sua cadeia estava no modo de manutenção. O modo de manutenção destina-se a ser usado apenas como uma medida temporária de emergência.

Por exemplo, imagine descobrir uma exploração crítica em sua rede que poderia resultar em perdas financeiras significativas se atores mal-intencionados a explorassem. Embora você possa resolver o problema implementando uma atualização de tempo de execução, o processo leva tempo - tempo precioso durante o qual sua rede permanece vulnerável a ataques. Uma solução potencial é ativar o modo de manutenção em sua rede, concluir a atualização do tempo de execução e sair do modo de manutenção assim que a correção for verificada.

!!! atenção
    Habilitar o modo de manutenção em uma rede de produção pode impactar significativamente os contratos em sua cadeia. Enquanto o modo de manutenção estiver ativado, nenhuma transação de contrato inteligente é processada, por isso é fundamental considerar as possíveis ramificações antes de ativá-lo.

## Verificando os Pré-requisitos {: #checking-prerequisites }

Para os exemplos deste guia, você precisará ter o seguinte:

- Uma rede com tecnologia Tanssi (Teste Rápido ou Dedicado)
- A conta Sudo da sua rede conectada aos seus Polkadot.js Apps da rede. Você pode consultar o [guia de Gerenciamento do Sudo](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} para obter instruções sobre como injetar sua conta Sudo nos Polkadot.js Apps

--8<-- 'text/pt/builders/manage/locate-sudo-account.md'

## Habilitando o Modo de Manutenção {: #enabling-maintenance-mode }

Ainda, a conta Sudo pode realizar funções privilegiadas, como habilitar e desabilitar o modo de manutenção. Para entrar no modo de manutenção e interromper o processamento regular de transações, navegue até a guia **Developer** do Polkadot.js Apps para sua rede com tecnologia Tanssi e clique em **Sudo**. Se você não vir **Sudo** neste menu, você não associou a conta Sudo aos Polkadot.js Apps. Certifique-se de que sua [conta Sudo seja injetada pela sua carteira e conectada aos Polkadot.js Apps](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}. Então, siga os seguintes passos:

1. Selecione a paleta **maintenanceMode**
1. Selecione o método **enterMaintenanceMode**
1. Pressione **Submit Sudo** e confirme a transação no pop-up resultante

![Habilitar o modo de manutenção](/images/builders/manage/developer-portal/maintenance/maintenance-2.webp)

Para verificar se o modo de manutenção foi habilitado, você pode verificar a seção **Explorer** na guia **Rede** e revisar os eventos recentes.

![Verificar se o modo de manutenção está habilitado](/images/builders/manage/developer-portal/maintenance/maintenance-3.webp)

## Saída do Modo de Manutenção {: #exiting-maintenance-mode }

Para sair do modo de manutenção e retornar sua rede à operação normal, navegue até a guia **Developer** do Polkadot.js Apps para sua rede com tecnologia Tanssi e clique em **Sudo**. Se você não vir **Sudo** neste menu, você não associou a conta Sudo aos Polkadot.js Apps. Certifique-se de que sua [conta Sudo seja injetada pela sua carteira e conectada aos Polkadot.js Apps](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}. Siga os seguintes passos:

1. Selecione a paleta **maintenanceMode**
2. Selecione o método **resumeNormalOperation**
3. Pressione **Submit Sudo** e confirme a transação no pop-up resultante
![Sair do modo de manutenção](/images/builders/manage/developer-portal/maintenance/maintenance-4.webp)

Para verificar se o modo de manutenção foi desabilitado, você pode verificar na seção **Explorer** na guia **Network** e revisar os eventos recentes.

![Verificar se o modo de manutenção está desabilitado](/images/builders/manage/developer-portal/maintenance/maintenance-5.webp)

Lembre-se que o uso do modo de manutenção é uma ação de emergência que só deve ser ativada quando sua cadeia estiver em risco extremo. Pode valer a pena estabelecer uma política para sua rede que defina gatilhos específicos de disjuntor para determinar quando o modo de manutenção será habilitado. O estabelecimento de uma política com antecedência também simplificará a tomada de decisões durante uma potencial emergência.

E é isso! A seção [Portal do Desenvolvedor](/pt/builders/manage/developer-portal/) tem muitos mais guias sobre como gerenciar sua rede com tecnologia Tanssi.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
