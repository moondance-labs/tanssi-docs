---
title: Fazer-se passar por outras contas com Sudo
description: Aprenda a usar a chave Sudo para despachar chamadas assinando uma transação como se ela viesse de uma conta diferente.
icon: octicons-person-add-24
categories: Appchain
---

# Usando Sudo para personificar outras contas

## Introdução {: #introduction }

[Sudo](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/index.html){target=\_blank} é um módulo que permite que chamadas de tempo de execução privilegiadas sejam despachadas quando chamadas da conta Sudo. Sudo é, por vezes, referido coloquialmente como um superutilizador ou conta semelhante a um deus. Isto permite-lhe executar ações privilegiadas ao gerir a sua rede, como personificar outras contas.

Neste guia, aprenderá como usar Sudo para personificar outras contas. Por exemplo, este guia usará a conta Sudo para se apresentar como uma conta arbitrária e transferir fundos dessa conta.

!!! atenção
    A transferência de saldo demonstrada neste guia é duvidosa e é mostrada apenas como um exemplo de uso do Sudo.

## Verificação de Pré-requisitos {: #checking-prerequisites }

Para os exemplos neste guia, precisará do seguinte:

- Uma rede com tecnologia Tanssi (Quick Trial ou Dedicated)
- A conta Sudo da sua rede conectada aos Polkadot.js Apps da sua rede. Pode consultar o [Guia de Gerenciamento do Sudo](/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} para obter instruções sobre como injetar a sua conta Sudo nos Polkadot.js Apps

--8<-- 'text/pt/builders/manage/locate-sudo-account.md'

## Usando o Método Sudo As {: #using-the-sudo-as-method }

Como sabe, a conta Sudo pode executar funções privilegiadas, incluindo a personificação de outras contas. Ao enviar uma chamada através de `sudoAs`, o tempo de execução primeiro autenticará a chave Sudo e, em seguida, despachará a chamada de função desejada com a origem `Signed` de uma determinada conta. No exemplo a seguir, o método `sudoAs` orquestrará o envio de alguns tokens para outra conta. Embora o resultado seja semelhante ao uso do Sudo com uma chamada `forceBalanceTransfer`, o exemplo a seguir usa uma chamada de transferência de saldo regular, onde a origem é a conta do remetente e não a conta Sudo.

Para fazer uma chamada `sudoAs` para personificar outra conta, navegue para o separador **Developer** (Desenvolvedor) dos Polkadot.js Apps para a sua rede com tecnologia Tanssi e clique em **Sudo**. Se não vir **Sudo** neste menu, não associou a conta Sudo aos Polkadot.js Apps. Certifique-se de que a sua conta Sudo está injetada pela sua carteira e conectada aos Polkadot.js Apps. Em seguida, siga os seguintes passos:

1. Selecione a paleta **Sudo**
2. Selecione o método **sudoAs**
3. Selecione ou cole a conta desejada para personificar
4. Selecione a paleta desejada para a chamada a enviar. Neste caso, é a paleta **balances** (saldos)
5. Selecione o método **transferAllowDeath**
6. Especifique a conta de destino para a transferência de saldo
7. Especifique o número de tokens a enviar
1. Pressione **SubmitSudo** e confirme o pop-up resultante

![Make a Sudo as call](/images/builders/manage/developer-portal/impersonate/impersonate-2.webp)

A outra conta tinha um saldo inicial de `1.000` tokens antes da chamada e, subsequentemente, caiu para `995`, como esperado.

![Check balances on Polkadot.js Apps](/images/builders/manage/developer-portal/impersonate/impersonate-3.webp)

## Usando Sudo e a Utilidade Dispatch As {: #using-sudo-and-the-dispatch-as-utility }

A secção a seguir demonstrará o uso do Sudo para despachar chamadas de uma origem arbitrária. Ao enviar uma chamada desta forma, o tempo de execução primeiro autenticará a chave Sudo e, em seguida, despachará a chamada usando a paleta `utility` e a função `dispatchAs`, permitindo que a origem da transação seja exatamente o que deseja.

Para fazer isso, navegue para o separador **Developer** (Desenvolvedor) dos Polkadot.js Apps para a sua rede com tecnologia Tanssi e clique em **Sudo**. Se não vir **Sudo** neste menu, não associou a conta Sudo aos Polkadot.js Apps. Certifique-se de que a sua [conta Sudo está injetada pela sua carteira e conectada aos Polkadot.js Apps](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}. Em seguida, siga os seguintes passos:

1. Selecione a paleta **Sudo**
2. Selecione o método **Sudo**
3. Selecione a paleta desejada para a chamada a enviar. Neste caso, é a paleta **utility** (utilidade)
4. Selecione o método **dispatchAs**
5. Selecione **system** (sistema) no menu pendente
6. Selecione a origem **signed** (assinada), que define a origem da transação para ser a conta especificada em vez de root (raiz)
7. Selecione a paleta desejada para a chamada a enviar. Neste caso, é a paleta **balances** (saldos)
8. Selecione o método **transferAllowDeath**
9. Especifique a conta de destino para a transferência de saldo
10. Especifique o número de tokens a enviar
11. Pressione **SubmitSudo** e confirme o pop-up resultante
![Use Sudo Dispatch As on Polkadot.js Apps](/images/builders/manage/developer-portal/impersonate/impersonate-4.webp)

A outra conta tinha um saldo inicial de `995` tokens antes da chamada e caiu para `990`, como esperado.

![Check balances on Polkadot.js Apps](/images/builders/manage/developer-portal/impersonate/impersonate-5.webp)

E é isso! A secção [Developer Portal](/pt/builders/manage/developer-portal/) tem muitos mais guias sobre como gerir a sua rede Tanssi.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
