---
title: Gerenciar Tokens
description: Aprenda como o governador da rede pode gerenciar o token de uma rede alimentada pelo Tanssi usando o dApp para cunhá-lo, configurar o mercado de taxas EIP-1559 e muito mais.
icon: octicons-database-24
categories: Appchain
---

# Gerenciar Tokens

## Introdução {: #introduction }

Qualquer rede implantada através do Tanssi é soberana e livre para definir o modelo de governança que melhor se adapta ao seu caso de uso. O governador da rede tem superpoderes sobre a administração da cadeia. Consequentemente, eles podem chamar funções privilegiadas, como atualizar o tempo de execução e gerenciar operações relacionadas a tokens nativos, entre outras ações.

Existem algumas ações relacionadas ao gerenciamento de tokens nativos que estão disponíveis para o governador da rede no Tanssi dApp:

- **Mint tokens** - cunha novos tokens, aumentando a oferta total
- **Update balances** - aumenta ou diminui o saldo de uma conta, afetando a oferta total
- **Transfer tokens** - executa uma transferência forçada de tokens de uma conta para outra
- **Configure gas dynamic** - disponível apenas em redes compatíveis com EVM, esta ação altera a configuração [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md){target=\_blank}, afetando o mecanismo de precificação da transação

Neste guia, você aprenderá como executar as ações listadas anteriormente usando o [Tanssi dApp](https://apps.tanssi.network){target=\_blank}.

## Verificando Pré-requisitos {: #checking-prerequisites  }

Para os exemplos neste guia, você precisará ter o seguinte:

- Uma rede com tecnologia Tanssi (Teste Rápido ou Dedicado)
--8<-- 'text/pt/builders/manage/dapp/prerequisites.md'

## Acessando o Painel de Gerenciamento de Tokens {: #accesing-token-management-panel }

O Tanssi dApp implementa uma interface suave, permitindo que o governador da rede acesse e execute funções privilegiadas. Para fazer isso, vá para o [Tanssi dApp](https://apps.tanssi.network/){target=\_blank} e, em seguida:

1. Clique no botão **Manage**
2. Clique no botão **Token Management**.

![Acessando o painel de gerenciamento de tokens](/images/builders/manage/dapp/token-management/token-management-1.webp)

Agora você tem acesso direto às ações apresentadas na introdução:

1. **Mint Tokens**
2. **Update Balances**
3. **Transfer Tokens**
4. Configurar **Gas Dynamics**

![O painel de gerenciamento de tokens](/images/builders/manage/dapp/token-management/token-management-2.webp)

!!! nota
    Se você não vir os detalhes da sua rede no painel, certifique-se de cumprir os [pré-requisitos](#checking-prerequisites).

### Minting Tokens {: #minting-tokens }

O governador da rede pode cunhar novos tokens, aumentando sua oferta total. Para fazer isso, no painel **Token Management**, clique no botão **Mint tokens** e, em seguida:

1. Insira o endereço que conterá os tokens recém-cunhados

    !!! nota
        O endereço de destino deve ser do tipo Ethereum se a cadeia for compatível com EVM e do tipo Substrate caso contrário.

2. Insira a quantidade de tokens a serem cunhados
3. Clique em **Mint**

![Minting tokens](/images/builders/manage/dapp/token-management/token-management-3.webp)

Você será solicitado a assinar a transação com a conta do governador da rede. Depois que a transação for concluída, o saldo da conta de destino terá sido aumentado pela quantia desejada.

### Updating Balances {: #updating-balances }

O governador da rede pode aumentar ou diminuir o saldo de qualquer conta, afetando, assim, a oferta total. Para fazer isso, no painel **Token Management**, clique no botão **Update Balances** e, em seguida:

1. Insira o endereço que conterá os tokens recém-cunhados. Depois de inserir o endereço, seu saldo atual será exibido

    !!! nota
        O endereço de destino deve ser do tipo Ethereum se a cadeia for compatível com EVM e do tipo Substrate caso contrário.

2. Insira o novo saldo que o endereço conterá
3. Clique em **Update**

![Updating Balance](/images/builders/manage/dapp/token-management/token-management-4.webp)

Você será solicitado a assinar a transação com a conta do governador da rede. Depois que a transação for concluída, o saldo da conta de destino refletirá exatamente a quantia desejada, independentemente das participações anteriores.

### Executando Transferências Forçadas {: #forced-transfers }

O governador da rede pode reatribuir saldos, forçando uma transferência de tokens de uma conta para outra. Para fazer isso, no painel **Token Management**, clique no botão **Transfer Tokens** e, em seguida:

1. Insira o endereço de origem que transferirá seus tokens
2. Insira o endereço de destino que receberá os tokens

    !!! nota
        Os endereços de origem e destino devem ser do tipo Ethereum se a cadeia for compatível com EVM e do tipo Substrate caso contrário.

3. Insira a quantidade de tokens a serem transferidos
4. Clique em **Transfer**

![Transfer Tokens](/images/builders/manage/dapp/token-management/token-management-5.webp)

Você será solicitado a assinar a transação com a conta do governador da rede. Depois que a transação for concluída, a conta de destino terá recebido o número de tokens do endereço de origem.

### Definindo a Gas Dynamics{: #definindo-gas }

!!! nota
    Esta opção se aplica apenas a redes compatíveis com EVM.

O governador de uma rede compatível com EVM com tecnologia Tanssi pode alterar sua configuração [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md){target=\_blank}, afetando o mecanismo de precificação da transação. Para fazer isso, no painel **Token Management**, clique no botão **Gas Dynamics** e, em seguida:

1. Insira a nova taxa base, expressa em unidades Wei (10<sup>-18</sup>)
2. Insira o valor da elasticidade
3. Clique em **Update Dynamics**

![Configurar a Gas Dynamics](/images/builders/manage/dapp/token-management/token-management-6.webp)

Você será solicitado a assinar a transação com a conta do governador da rede. Depois que a transação for concluída, o mecanismo de taxas da rede será executado com os novos parâmetros de precificação da transação.
