---
title: Definir uma Identidade de Conta
description: Siga estas instruções para estabelecer uma identidade, incluindo um nome de exibição para que você possa ser mais facilmente reconhecido na cadeia do orquestrador Tanssi.
icon: octicons-person-24
categories: Basics, Appchain
---

# Configurar uma Identidade On-Chain

## Introdução {: #introduction }

O [Substrate](/pt/learn/framework/overview/#substrate-framework){target=\_blank} Identity [module](/pt/learn/framework/modules/){target=\_blank} é uma solução pronta para uso para adicionar informações pessoais à sua conta on-chain. O estabelecimento de uma identidade torna mais fácil para sua conta ser reconhecida por outros, pois seu nome de exibição preencherá automaticamente quando alguém colar seu endereço em um campo no [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/accounts){target=\_blank}.

A identidade que você configura vai além de um simples nome de exibição. As informações pessoais podem incluir campos padrão, como seu nome legal, nome de exibição, site, identificador do Twitter, Discord e nome do Riot (agora conhecido como Element). Você também pode usar campos personalizados para incluir quaisquer outras informações relevantes.

Este guia demonstrará como configurar uma identidade com um nome de exibição e parâmetros adicionais, aprimorando sua visibilidade e reconhecimento.

## Definições Gerais {: #general-definitions }

Para armazenar suas informações on-chain, você deve vincular alguns fundos, que, eventualmente, serão devolvidos assim que a identidade for limpa. Existem duas categorias de campos: padrão e personalizado. Uma quantia básica de depósito é reservada após a criação da identidade e um depósito de armazenamento é necessário para cada byte adicional de dados armazenados on-chain.

- **Campos padrão incluem** - seu nome legal, nome de exibição, site, identificador do Twitter, Discord, nome do Riot (agora conhecido como Element)

- **Campos personalizados incluem** - quaisquer outras informações relevantes

- **Subcontas** - Você pode vincular subcontas sob uma conta primária. Por exemplo, um serviço de sequenciador que está executando vários nós de sequenciador diferentes pode estabelecer subcontas para demonstrar um link oficial entre os nós

=== "Tanssi MainNet"

    |       Variável        |                                    Definição                                    |                                        Valor                                         |
    |:---------------------:|:--------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------:|
    |     Depósito básico   | O valor mantido em depósito para a definição de uma identidade                  |  {{ networks.mainnet.identity.basic_deposit }} {{ networks.mainnet.token_symbol }}   |
    |   Depósito por byte   | O valor mantido em depósito por byte de armazenamento on-chain usado na definição de uma identidade | {{ networks.mainnet.identity.per_byte_deposit }} {{ networks.mainnet.token_symbol }} |
    | Campos adicionais máx.| Número máximo de campos adicionais que podem ser armazenados em um ID           |                      {{ networks.mainnet.identity.max_fields }}                      |
    |    Subcontas máx.     | Número máximo de subcontas que podem ser definidas sob uma identidade de conta  |                   {{ networks.mainnet.identity.max_subaccounts }}                    |

=== "Dancelight TestNet"

    |       Variável        |                                    Definição                                    |                                           Valor                                            |
    |:---------------------:|:--------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------:|
    |     Depósito básico   | O valor mantido em depósito para a definição de uma identidade                  |  {{ networks.dancelight.identity.basic_deposit }} {{ networks.dancelight.token_symbol }}   |
    |   Depósito por byte   | O valor mantido em depósito por byte de armazenamento on-chain usado na definição de uma identidade | {{ networks.dancelight.identity.per_byte_deposit }} {{ networks.dancelight.token_symbol }} |
    | Campos adicionais máx.| Número máximo de campos adicionais que podem ser armazenados em um ID           |                       {{ networks.dancelight.identity.max_fields }}                        |
    |    Subcontas máx.     | Número máximo de subcontas que podem ser definidas sob uma identidade de conta  |                     {{ networks.dancelight.identity.max_subaccounts }}                     |

## Verificando os Pré-requisitos {: #checking-prerequisites }

Para acompanhar este guia, você precisará do seguinte:

=== "Tanssi MainNet"

    - O [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/accounts){target=\_blank} aberto e conectado ao Tanssi MainNet.
    - Pelo menos uma conta financiada com tokens `{{ networks.mainnet.token_symbol }}`.

=== "Dancelight TestNet"
    
    - O [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/accounts){target=\_blank} aberto e conectado ao [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\_blank}.
    - Pelo menos uma conta financiada com tokens `{{ networks.dancelight.token_symbol }}`.

Se precisar de ajuda para importar suas contas para o portal do desenvolvedor, consulte o guia [Conectando-se ao portal do desenvolvedor](/pt/builders/toolkit/substrate-api/wallets/talisman/#connecting-to-polkadotjs){target=\_blank}.

## Comece {: #get-started }

Dependendo das informações a serem incluídas, existem algumas maneiras diferentes de definir e limpar uma identidade usando o portal do desenvolvedor. Se você pretende registrar sua identidade usando apenas os campos padrão, pode seguir as instruções da página [Gerenciando uma Identidade via Contas](#manage-via-accounts). **Esta é a maneira recomendada de definir e gerenciar sua identidade**.

Se você deseja adicionar campos personalizados além dos campos padrão, siga as instruções para a página [Gerenciando uma Identidade via Extrinsics](#manage-via-extrinsics).

!!! nota
    Observe que o uso da página **Contas** no portal do desenvolvedor é recomendado para gerenciar sua identidade, pois ela fornece uma interface fácil de usar que impõe limites de caracteres. Se você usar a página **Extrinsics**, esteja ciente de que sua entrada para cada campo (ou seja, nome, e-mail, etc.) deve ter 32 caracteres ou menos; caso contrário, suas informações serão cortadas.

## Gerenciar uma Identidade via Contas {: #manage-via-accounts }

### Definir uma Identidade {: #set-identity-via-accounts }
Para começar a definir uma identidade usando a página Contas, vá para a guia [**Contas**](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/accounts){target=\_blank} do portal do desenvolvedor.

Você já deve ter uma conta conectada, então você pode clicar no nome da sua conta para verificar e observar seus saldos. Depois de enviar a transação para definir uma identidade, os depósitos que você enviou serão movidos do seu saldo transferível para seu saldo reservado.

![Saldos iniciais da conta](/images/builders/account-management/identity/identity-1.webp)

Para definir sua identidade, você precisará:

1. Clique nos três pontos verticais ao lado da conta para a qual deseja definir uma identidade
2. Um menu aparecerá. Clique em **Set on-chain identity**

![Definir identidade on-chain](/images/builders/account-management/identity/identity-2.webp)

Em seguida, o menu para registrar e definir sua identidade aparecerá e você poderá começar a preencher suas informações. Você não é obrigado a inserir informações para todos os campos; você pode escolher preencher apenas um campo ou todos eles; a escolha é sua. Para este exemplo:

1. Defina seu nome de exibição
2. Clique no botão **include field** para e-mail e depois insira seu e-mail
3. Clique no botão **include field** para web e depois insira a URL do seu site
4. Clique no botão **include field** para Twitter e depois insira seu identificador do Twitter
5. Reveja os campos de dados anteriores e clique em **Set Identity**

![Definir sua identidade](/images/builders/account-management/identity/identity-3.webp)

Você será solicitado a assinar a transação. Se tudo estiver correto, assine-a.

Você deve ver as notificações de status aparecerem no canto superior direito. Depois que a transação for confirmada, você pode clicar no nome da sua conta novamente, e o painel deslizará para fora no lado direito da página. Seus saldos terão sido alterados e você também verá suas novas informações de identidade.

![Saldos da conta atualizados](/images/builders/account-management/identity/identity-4.webp)

Se as informações de identidade corresponderem ao que você inseriu, você definiu com sucesso uma identidade!

Depois de limpar sua identidade, o depósito em seu saldo reservado será transferido de volta para seu saldo transferível. Se você precisar alterar sua identidade, pode passar pelo processo de configuração da sua identidade novamente. Observe que você deve garantir que todos os campos sejam reinseridos, mesmo que apenas um campo precise ser alterado, ou eles serão substituídos. Você não precisará pagar outro depósito, a menos que campos personalizados sejam usados, mas precisará pagar taxas de gás.

## Gerenciar uma Identidade via Extrinsics {: #manage-via-extrinsics}

### Definir uma Identidade {:#set-identity-extrinsics }

Para registrar uma identidade usando a página de extrínsecos, navegue até a página [**Extrinsics**](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/extrinsics){target=\_blank} do portal do desenvolvedor. Certifique-se de que sua entrada não exceda 32 caracteres para cada campo de identidade. Para concluir sua identidade, siga as etapas a seguir:

1. Selecione sua conta
2. Selecione identidade no menu suspenso **enviar o seguinte extrínseco**
3. Em seguida, selecione a função **setIdentity(info)**
4. Selecione **Raw** como o formato de dados para inserir seu **Nome de Exibição**
5. Insira os dados para **Exibição** no formato selecionado
6. Selecione **Raw** como o formato de dados para inserir seu endereço da web
7. Insira a URL do seu site no formato selecionado
8. Selecione **Raw** como o formato de dados para inserir seu e-mail
9. Insira seu endereço de e-mail no formato selecionado
10. Selecione **Raw** como o formato de dados para inserir seu identificador do Twitter
11. Insira seu Twitter no formato selecionado. Insira apenas o nome de usuário, começando com o símbolo `@`
12. Reveja os campos preparados e pressione **Enviar Transação**
![Definir identidade on-chain](/images/builders/account-management/identity/identity-5.webp)

Opcionalmente, se você quiser inserir campos personalizados, siga as seguintes etapas:

1. Role para o topo e clique em **Add item**
2. Dois campos aparecerão: o primeiro para o nome do campo e o segundo para o valor. Selecione **Raw** como o formato de dados para inserir o nome do campo
3. Insira o nome do campo no formato especificado
4. Selecione **Raw** como o formato de dados para inserir o valor personalizado
5. Insira o valor personalizado no formato especificado

![Adicionar campos personalizados](/images/builders/account-management/identity/identity-6.webp)

Finalmente, depois que todas as informações de identidade forem adicionadas, você pode rolar para a parte inferior da página e clicar em **Submit Transaction**.

Você será solicitado a assinar a transação. Lembre-se, um depósito adicional é necessário para cada campo personalizado adicional. Se tudo estiver correto, assine a transação.

Você deve ver as notificações de status aparecerem no canto superior direito confirmando a transação. Se bem-sucedido, você definiu uma identidade! Parabéns! Para garantir que tudo tenha sido concluído e que suas informações de identidade tenham uma boa aparência, você pode verificar sua identidade.

### Confirmar uma Identidade {: #confirm-identity-extrinsics }

Para verificar a adição de suas informações de identidade, você pode clicar na guia **Developer** e, em seguida, navegar até o [**Chain state**](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/chainstate){target=\_blank}.

Na página **Chain State**, certifique-se de que **Storage** esteja selecionado. Em seguida, você pode começar a solicitar suas informações de identidade:

1. Defina a **selected state query** como **identity**
2. Selecione a função **identityOf(AccountId)**
3. Selecione sua conta
4. Clique no botão **+** para obter suas informações de identidade

![Solicitar informações de identidade](/images/builders/account-management/identity/identity-7.webp)

Você pode ver agora que você definiu com sucesso uma identidade! Depois de limpar sua identidade, o depósito em seu saldo reservado será transferido de volta para seu saldo transferível. Se você precisar alterar sua identidade, pode passar pelo processo de configuração da sua identidade novamente. Observe que você deve garantir que todos os campos sejam reinseridos, mesmo que apenas um campo precise ser alterado, ou eles serão substituídos. Você não precisará pagar outro depósito, a menos que campos personalizados sejam usados, mas precisará pagar taxas de gás.

## Limpar uma Identidade {: #clear-identity-extrinsics }

Para limpar sua identidade, siga as seguintes etapas na guia **Extrinsics** do portal do desenvolvedor:

1. Selecione sua conta no menu suspenso **usando a conta selecionada**
1. Selecione **identity** no menu suspenso **enviar o seguinte extrínseco**
1. Em seguida, selecione a função **clearIdentity()**
1. Clique em **Enviar Transação**

![Limpar uma identidade](/images/builders/account-management/identity/identity-8.webp)

Você será solicitado a assinar a transação. Se tudo estiver correto, assine-a. Você deve ver as notificações de status no canto superior direito confirmando a transação.

Para confirmar se suas informações de identidade foram removidas com sucesso, revise as etapas descritas na seção [Confirmar uma Identidade](#confirm-identity-extrinsics). Desta vez, em vez de exibir seus detalhes de identidade, a resposta deve indicar **none**, confirmando que nenhuma informação de identidade está atualmente vinculada à sua conta. Além disso, ao verificar seus saldos, você descobrirá que o depósito inicialmente feito para definir sua identidade foi creditado de volta ao seu saldo transferível. Isso conclui o processo de limpeza da sua identidade.

![Confirmação de limpeza de identidade](/images/builders/account-management/identity/identity-9.webp)
