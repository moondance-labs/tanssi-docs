---
title: Smart EVM - Implantações de Contratos Whitelistados
description: Aprenda como usar o Sudo para whitelistar implantadores de contratos inteligentes para sua rede Smart EVM com tecnologia Tanssi, aumentando a segurança geral.
icon: octicons-file-binary-24
categories: Appchain, EVM-Template
---

# Smart EVM - Implantações de Contratos Whitelistados

## Introdução {: #introduction }

Redes com tecnologia Tanssi compatíveis com EVM se beneficiam de um recurso exclusivo: o governador da rede pode definir quais contas estão autorizadas a implantar contratos inteligentes, proibindo a ação para qualquer outra conta não whitelistada.

Este recurso traz vários benefícios importantes que podem ser uma ótima opção para diferentes casos de uso ou contextos. Alguns desses benefícios são:

- **Segurança aprimorada** - ao restringir a implantação a contas confiáveis, o risco de implantar contratos inteligentes maliciosos ou vulneráveis é reduzido
- **Garantia de qualidade** - contas conhecidas e verificadas podem ser obrigadas a seguir padrões de codificação específicos e passar por testes completos antes da implantação
- **Conformidade regulatória** - os casos de uso que são altamente regulamentados podem limitar a implantação para garantir que os contratos inteligentes atendam aos requisitos legais e de conformidade
- **Prevenção de spam e abuso** - impedir que maus atores implantem um grande número de contratos desnecessários ou prejudiciais

Neste guia, você aprenderá como usar a conta Sudo para gerenciar as contas whitelistadas que podem implantar contratos inteligentes em sua rede.

## Verificando os Pré-requisitos {: #checking-prerequisites }

Para os exemplos deste guia, você precisará ter o seguinte:

- Uma rede com tecnologia Tanssi compatível com EVM (Teste Rápido ou Dedicado) executando o [runtime 700](https://github.com/moondance-labs/tanssi/releases/tag/runtime-700){target=\_blank} ou superior. Qualquer nova implantação de rede baseada no [modelo EVM](/pt/builders/build/templates/evm/){target=\_blank} servirá
- A conta Sudo da sua rede conectada aos seus Polkadot.js Apps da rede. Você pode consultar o [Guia de Gerenciamento de Sudo](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} para obter instruções sobre como injetar sua conta Sudo nos Polkadot.js Apps

--8<-- 'text/pt/builders/manage/locate-sudo-account.md'

## Começando {: #getting-started }

Para seguir as próximas seções deste guia, acesse os Polkadot.js Apps para sua rede Tanssi. O link para os Polkadot.js Apps para sua rede Tanssi pode ser encontrado em seu [Painel Tanssi](https://apps.tanssi.network){target=\_blank} na seção **Tooling**.

![Localizando seu Link de Polkadot.js Apps em apps.tanssi.network](/images/builders/manage/developer-portal/smart-contracts-creation-filter/smart-contracts-creation-filter-1.webp)

Depois de acessar os Polkadot.js Apps, navegue até a guia **Developer** e clique em **Sudo**.

!!! nota
    Se você não vir **Sudo** neste menu, não associou a conta Sudo aos Polkadot.js Apps. Certifique-se de que sua [conta Sudo seja injetada pela sua carteira e conectada aos Polkadot.js Apps](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}.

## Contas Whitelistadas {: #whitelist-accounts }

Para definir as contas que terão autorização para implantar contratos inteligentes, [comece a usar seus Polkadot.js Apps](#getting-started) e siga as etapas a seguir:

1. Selecione a paleta **parameters**. **setParameter** será selecionado automaticamente no seletor de funções e **ContractDeployFilter** no parâmetro **keyValue**
2. Duas opções estarão disponíveis no seletor **ContractDeployFilter**: **AllowedAddressesToCreate** e **AllowedAddressesToCreateInner**. Selecione a opção **AllowedAddressesToCreate** se quiser whitelistar as contas para implantações de contratos inteligentes e a última para whitelistar as contas para implantações indiretas (por meio de uma chamada de contrato inteligente)
3. Alterne a chave **Include option**
4. Selecione a opção **Whitelisted**
5. Insira a conta whitelistada
6. Se você precisar inserir mais de uma conta, clique em **Add item**
7. Pressione **Submit Sudo** e confirme a transação em sua carteira

![Contas Whitelistadas](/images/builders/manage/developer-portal/smart-contracts-creation-filter/smart-contracts-creation-filter-2.webp)

Essas mesmas etapas podem ser repetidas a qualquer momento para remover uma conta da whitelist ou para adicionar novas.

## Restaurando Permissões para Implantar Contratos Inteligentes {: #restoring-permission}

Se você autorizou anteriormente algumas contas a implantar contratos inteligentes e deseja permitir que qualquer conta implante contratos inteligentes (desde que possam cobrir taxas de transação regulares), [comece a usar seus Polkadot.js Apps](#getting-started) e siga as etapas a seguir:

1. Selecione a paleta **parameters**. **setParameter** será selecionado automaticamente no seletor de funções e **ContractDeployFilter** no parâmetro **keyValue**
2. Duas opções estarão disponíveis no seletor **ContractDeployFilter**: **AllowedAddressesToCreate** e **AllowedAddressesToCreateInner**. Selecione a opção **AllowedAddressesToCreate** se quiser limpar a whitelist para implantações de contratos inteligentes e a última para limpar a whitelist para implantações indiretas (por meio de uma chamada de contrato inteligente)
3. Alterne a chave **Include option**
4. Selecione a opção **All**
5. Pressione **Submit Sudo** e confirme a transação em sua carteira

![Limpando as Contas Whitelistadas](/images/builders/manage/developer-portal/smart-contracts-creation-filter/smart-contracts-creation-filter-3.webp)

## Consultando as Contas Whitelistadas {: #query-whitelisted-accounts }

Para obter a configuração atual contendo as contas whitelistadas que podem implantar contratos inteligentes, acesse os Polkadot.js Apps (conforme explicado na seção [Começando](#getting-started)), navegue até a guia **Developer**, clique em **Chain state** e siga as etapas a seguir:

1. Selecione o armazenamento **parameters**
2. Selecione a opção **parameters(ContainerChainTemplateFrontierRuntimeParametersKey)**
3. Certifique-se de que a chave **Include option** está ligada
4. Certifique-se de que a opção **ContractDeployFilter** está selecionada
5. Duas opções estarão disponíveis no seletor **ContractDeployFilter**: **AllowedAddressesToCreate** e **AllowedAddressesToCreateInner**. Selecione a opção **AllowedAddressesToCreate** se quiser consultar a whitelist para implantações de contratos inteligentes e a última para consultar a whitelist para implantações indiretas (por meio de uma chamada de contrato inteligente)
6. Clique no botão **+**
7. A configuração atual será exibida

![Consultando as Whitelists](/images/builders/manage/developer-portal/smart-contracts-creation-filter/smart-contracts-creation-filter-4.webp)
