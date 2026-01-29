---
title: Gerencie sua Cadeia Usando um Multisig
description: Aprenda como configurar e usar um Multisig para gerenciar sua cadeia e executar ações privilegiadas, como atualizar o tempo de execução, emitir tokens e muito mais.
icon: octicons-key-24
categories: Appchain
---

# Gerencie sua Chain Usando um Multisig

## Introdução {: #introduction }

As Appchains implantadas por meio do Tanssi são soberanas. Isso significa que o governador da appchain é livre para definir e gerenciar os aspetos críticos da appchain, como tokenomics, lógica de tempo de execução, dinâmica de gás e outros.

Essas ações críticas podem ser executadas por uma conta especial chamada [sudo](/pt/builders/manage/developer-portal/sudo/){target=\_blank}. Esta conta deve ser protegida com o máximo de precauções, pois perder o acesso ou um agente malicioso obter acesso a ela pode ser catastrófico, e a cadeia pode não se recuperar do evento.

Uma multisig é uma maneira de tornar o gerenciamento da sua appchain mais seguro. Ele permite definir um limite M-de-N, exigindo pelo menos M assinaturas válidas de N contas designadas para executar transações privilegiadas. Usar um multisig aumenta a segurança do governo da sua appchain por:

- **Remover completamente o único ponto de falha**: Perder uma conta não significa perder a appchain. Além disso, uma conta comprometida não é suficiente para executar ações maliciosas.
- **Reduzir o fator de erro humano**: As transações devem ser revistas e aprovadas por pelo menos outra pessoa, reduzindo assim o risco de executar uma transação incorreta, uma atualização não intencional, enviar fundos para o endereço errado e outros erros comuns.

Para appchains onde a conta sudo não está desativada em favor de outro mecanismo de governação, configurar um multisig é fortemente recomendado. Este artigo mostra como configurá-lo e executar transações multisig.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para os exemplos neste guia, você pode configurar o multisig durante o processo de registro ou, se você já tiver uma rede alimentada por Tanssi (Teste Rápido ou Dedicado), você precisará ter o seguinte:

- As contas incluídas na configuração multisig, importadas para qualquer uma das [carteiras suportadas](/pt/builders/deploy/dapp/#supported-wallets){target=\_blank}

--8<-- 'text/pt/builders/manage/dapp/prerequisites.md'

## Configurar um Multisig para uma Nova Appchain {: #multisig-new-appchain }

Na primeira etapa para [implantar uma nova appchain com tecnologia Tanssi](/pt/builders/deploy/dapp/){target=\_blank}, você deve definir a conta que terá privilégios de sudo na seção **Contas**.
![Seção Contas](/images/builders/manage/dapp/multisig/multisig-1.webp)

No campo **Sudo Address**, você pode inserir qualquer conta, embora, ao selecioná-la, um menu com a opção **Create Multisig Account** será exibido.

![Criar Multisig](/images/builders/manage/dapp/multisig/multisig-2.webp){: .browser-extension}

--8<-- 'text/pt/builders/manage/dapp/multisig/create-multisig.md'

Seu multisig agora está salvo e pode ser usado como sudo para sua nova cadeia.

![Seleção Multisig](/images/builders/manage/dapp/multisig/multisig-4.webp){: .browser-extension}

!!! note
    Seu multisig tem um endereço exclusivo derivado dos endereços no conjunto de assinatura. Portanto, você verá uma conta diferente no **Sudo Address**.

## Alternar para Multisig em uma Appchain já ativa {: #multisig-live-appchain }

Se você já tem uma appchain ativa alimentada por Tanssi, pode transferir facilmente os direitos de sudo para uma configuração multisig. Para fazer isso, vá para o [painel](https://apps.tanssi.network/dashboard){target=\_blank} e no cartão da sua appchain:

1. Clique em **Manage**.
1. Clique no botão **Transfer Sudo** no painel à direita.

![Transferir Sudo](/images/builders/manage/dapp/multisig/multisig-5.webp)

O painel **Transfer Sudo** será apresentado.

![Painel Transferir Sudo](/images/builders/manage/dapp/multisig/multisig-6.webp)

Ao selecionar o campo **New Sudo Address**, um menu será exibido mostrando as seguintes entradas: os multisigs que você já pode ter criado, as contas que você conectou ao dApp e a ação **Create Multisig Account**.

![Formulário Transferir Sudo](/images/builders/manage/dapp/multisig/multisig-7.webp){: .browser-extension}

--8<-- '/text/pt/builders/manage/dapp/multisig/create-multisig.md'

Seu multisig agora está salvo e pode ser usado como sudo para sua nova cadeia. Selecione seu multisig recém-criado, clique em **Transfer Sudo**, assine a transação e pronto!
![Confirmação Transferir Sudo](/images/builders/manage/dapp/multisig/multisig-8.webp){: .browser-extension}

## Executar Ações Privilegiadas com uma Configuração Multisig {: #multisig-transactions }

O painel de gerenciamento do dApp permite que você despache transações privilegiadas através de uma interface amigável. Entre essas ações privilegiadas estão aquelas relacionadas ao gerenciamento de tokens (como cunhar tokens ou alterar a dinâmica do gás), despachar atualizações de tempo de execução, abrir canais de interoperabilidade e outras.

Quando o gerenciamento da appchain é configurado com uma conta multisig como sudo, o processo envolve várias etapas porque a transação será executada somente quando o limite de assinaturas válidas for atingido.

A menor multisig recomendada que pode ser configurada é uma de dois em três. Nesta configuração, o usuário que cria a transação fornece uma assinatura válida, e um segundo usuário, possuindo qualquer um dos dois endereços válidos restantes, assina e executa a transação, completando o fluxo multisig.

As seções a seguir mostram como criar e executar uma transação privilegiada.

!!! note
    Uma transação multisig criada através da UI do Tanssi dApp só pode ser concluída usando a UI do Tanssi dApp. Da mesma forma, uma transação multisig criada com uma ferramenta externa não será mostrada e não poderá ser concluída no Tanssi dApp.

### Criar uma Transação Multisig {: #create-multisig-transaction }

Para criar uma transação privilegiada, vá para o [Tanssi dApp](https://apps.tanssi.network/dashboard){target=\_blank} e conecte um dos endereços multisig.

Com um endereço de participante multisig conectado ao dApp, o botão **Manage** estará visível, concedendo acesso ao painel de gerenciamento, onde você pode iniciar transações privilegiadas.

![Acesso de gerenciamento](/images/builders/manage/dapp/multisig/multisig-9.webp)

Neste exemplo, o tempo de execução da appchain está desatualizado e uma atualização está disponível. Iniciamos a atualização de tempo de execução clicando no botão **Update** e assinando a transação.
![Atualizar tempo de execução](/images/builders/manage/dapp/multisig/multisig-10.webp)

Uma vez que o multisig é criado, seu painel mostrará que há uma nova transação multisig em andamento. Clique em **View Details** para verificar os detalhes do multisig no painel direito.

![Multisig criado](/images/builders/manage/dapp/multisig/multisig-11.webp)

!!! note
    O botão **Approve** está desativado para o criador da transação multisig, pois sua assinatura já foi enviada.

### Assinar uma Transação Multisig {: #sign-multisig-transaction }

Com um endereço de participante multisig conectado ao dApp, seu painel exibirá as transações multisig que aguardam sua análise e aprovação. Clique no botão **View Details**, revise os detalhes da transação e assine-a.
![Multisig approved](/images/builders/manage/dapp/multisig/multisig-12.webp)

Depois de assinar a transação e atingir o limite mínimo de multisig, ela é executada imediatamente, concluindo a ação.