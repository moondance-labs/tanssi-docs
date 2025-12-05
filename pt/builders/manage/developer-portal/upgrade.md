---
title: Atualize o Runtime da Sua Appchain
description: Aprenda como usar a conta Sudo para realizar a ação privilegiada de atualização do runtime da sua appchain com tecnologia Tanssi através do portal do desenvolvedor.
icon: octicons-arrow-up-24
categories: Appchain
---

# Atualizando o Runtime da Sua Appchain com Sudo

## Introdução {: #introduction }

[Sudo](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/index.html){target=\_blank} é um módulo que permite que chamadas de tempo de execução privilegiadas sejam despachadas quando chamadas da conta Sudo. Sudo é por vezes coloquialmente referido como um superusuário ou uma conta semelhante a um deus. Isso permite que você realize ações privilegiadas no curso do gerenciamento da sua appchain, como a atualização do tempo de execução da sua appchain com tecnologia Tanssi.

Neste guia, você aprenderá como usar o Sudo para atualizar o runtime da sua appchain. Com acesso Sudo, atualizar sua cadeia é um processo rápido e fácil. Observe que as equipas de appchain em produção terão a opção de eliminar gradualmente o acesso Sudo e confiar na governança para processar as atualizações de tempo de execução.

## Verificando os Pré-Requisitos {: #checking-prerequisites }

Para o exemplo neste guia, você precisará ter o seguinte:

- Uma appchain com tecnologia Tanssi (Quick Trial, Dedicated ou MainNet).
- A conta Sudo da sua appchain conectada ao portal do desenvolvedor da sua appchain. Você pode consultar o [guia de Gerenciamento do Sudo](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} para obter instruções sobre como injetar a sua conta Sudo no portal do desenvolvedor.
- O novo ficheiro binário de [runtime Wasm](/pt/learn/framework/architecture/#runtime){target=\_blank}, compilado com uma versão superior à atual.

--8<-- 'text/pt/builders/manage/locate-sudo-account.md'

## Obtendo o Runtime Wasm {: #obtaining-wasm-runtime }

Se a sua cadeia for baseada em um dos modelos oficiais, você pode baixar o arquivo binário oficial de runtime Wasm na tabela abaixo. Os lançamentos oficiais são publicados na [seção de lançamentos](https://github.com/moondance-labs/tanssi/releases){target_blank} no repositório Tanssi.

|                                               Versão                                                |                                                                             Modelo EVM                                                                              |                                                                            Modelo Substrate                                                                             |
|:----------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [1400](https://github.com/moondance-labs/tanssi/releases/tag/runtime-1400-templates){target=\_blank} | [Download EVM V1400 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1400-templates/frontier-template-runtime-1400.wasm){target=\_blank} | [Download Substrate V1400 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1400-templates/simple-template-runtime-1400.wasm){target=\_blank} |
| [1300](https://github.com/moondance-labs/tanssi/releases/tag/runtime-1300-templates){target=\_blank} | [Download EVM V1300 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1300-templates/frontier-template-runtime-1300.wasm){target=\_blank} | [Download Substrate V1300 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1300-templates/simple-template-runtime-1300.wasm){target=\_blank} |
| [1201](https://github.com/moondance-labs/tanssi/releases/tag/runtime-1201-templates){target=\_blank} | [Download EVM V1201 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1201-templates/frontier-template-runtime-1201.wasm){target=\_blank} | [Download Substrate V1201 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1201-templates/simple-template-runtime-1201.wasm){target=\_blank} |
| [1100](https://github.com/moondance-labs/tanssi/releases/tag/runtime-1100-templates){target=\_blank} | [Download EVM V1100 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1100-templates/frontier-template-runtime-1100.wasm){target=\_blank} | [Download Substrate V1100 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1100-templates/simple-template-runtime-1100.wasm){target=\_blank} |
| [1000](https://github.com/moondance-labs/tanssi/releases/tag/runtime-1000-templates){target=\_blank} | [Download EVM V1000 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1000-templates/frontier-template-runtime-1000.wasm){target=\_blank} | [Download Substrate V1000 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-1000-templates/simple-template-runtime-1000.wasm){target=\_blank} |
|  [900](https://github.com/moondance-labs/tanssi/releases/tag/runtime-900-templates){target=\_blank}  |  [Download EVM V900 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-900-templates/frontier-template-runtime-900.wasm){target=\_blank}   |  [Download Substrate V900 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-900-templates/simple-template-runtime-900.wasm){target=\_blank}   |
|       [800](https://github.com/moondance-labs/tanssi/releases/tag/runtime-800){target=\_blank}       |       [Download EVM V800 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-800/frontier-template-runtime-800.wasm){target=\_blank}        |       [Download Substrate V800 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-800/simple-template-runtime-800.wasm){target=\_blank}        |
|       [700](https://github.com/moondance-labs/tanssi/releases/tag/runtime-700){target=\_blank}       |       [Download EVM V700 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-700/frontier-template-runtime-700.wasm){target=\_blank}        |       [Download Substrate V700 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-700/simple-template-runtime-700.wasm){target=\_blank}        |
|       [600](https://github.com/moondance-labs/tanssi/releases/tag/runtime-600){target=\_blank}       |       [Download EVM V600 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-600/frontier-template-runtime-600.wasm){target=\_blank}        |       [Download Substrate V600 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-600/simple-template-runtime-600.wasm){target=\_blank}        |
|       [500](https://github.com/moondance-labs/tanssi/releases/tag/runtime-500){target=\_blank}       |       [Download EVM V500 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-500/frontier-template-runtime-500.wasm){target=\_blank}        |       [Download Substrate V500 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-500/simple-template-runtime-500.wasm){target=\_blank}        |
|  [400](https://github.com/moondance-labs/tanssi/releases/tag/runtime-400-templates){target=\_blank}  |  [Download EVM V400 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-400-templates/frontier-template-runtime-400.wasm){target=\_blank}   |  [Download Substrate V400 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-400-templates/simple-template-runtime-400.wasm){target=\_blank}   |
|  [300](https://github.com/moondance-labs/tanssi/releases/tag/templates-runtime-300){target=\_blank}  |  [Download EVM V300 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/templates-runtime-300/frontier-template-runtime-300.wasm){target=\_blank}   |  [Download Substrate V300 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/templates-runtime-300/simple-template-runtime-300.wasm){target=\_blank}   |
|       [200](https://github.com/moondance-labs/tanssi/releases/tag/runtime-200){target=\_blank}       |       [Download EVM V200 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-200/frontier-template-runtime-200.wasm){target=\_blank}        |       [Download Substrate V200 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-200/simple-template-runtime-200.wasm){target=\_blank}        |
|  [101](https://github.com/moondance-labs/tanssi/releases/tag/runtime-101-templates){target=\_blank}  |  [Download EVM V101 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-101-templates/frontier-template-runtime-101.wasm){target=\_blank}   |  [Download Substrate V101 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-101-templates/simple-template-runtime-101.wasm){target=\_blank}   |
|  [100](https://github.com/moondance-labs/tanssi/releases/tag/runtime-100-templates){target=\_blank}  |  [Download EVM V100 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-100-templates/frontier-template-runtime-100.wasm){target=\_blank}   |  [Download Substrate V100 Wasm file](https://github.com/moondance-labs/tanssi/releases/download/runtime-100-templates/simple-template-runtime-100.wasm){target=\_blank}   |

Você deve sempre atualizar o tempo de execução seguindo as versões de forma ordenada, aplicando uma versão após a outra sem pular nenhuma delas. Para isso, você precisa saber a versão atual do tempo de execução da sua appchain, que você encontrará no seu [Tanssi Dashboard](https://apps.tanssi.network){target=\_blank} na seção **Propriedades**. Por exemplo, se a versão do seu tempo de execução for `1000`, você deverá atualizar primeiro para `1100`, depois para `1201`, depois para `1300` e assim por diante até a versão mais recente disponível.

!!! atenção
    Aplicar as atualizações em ordem garante que as alterações (migrações) nas estruturas de dados internas sejam aplicadas, preservando a consistência dos dados. Caso contrário, pode **paralisar** sua appchain.

!!! nota
    Se estiver compilando o tempo de execução manualmente, certifique-se de usar a versão Wasm `compact` e `compressed`, que é otimizada e mais leve.

## Atualizando Seu Runtime {: #upgrading-your-runtime }

Para começar, acesse o portal do desenvolvedor da sua appchain Tanssi, que pode ser encontrado no seu [Tanssi Dashboard](https://apps.tanssi.network){target=\_blank} na seção **Ferramentas**.

![Localizar seu Link do Portal do Desenvolvedor em apps.tanssi.network](/images/builders/manage/developer-portal/upgrade/upgrade-1.webp)

!!! atenção
    Se a sua appchain foi implantada usando um modelo oficial e a atualização pretendida é um runtime personalizado, certifique-se de ter alterado o nome padrão da especificação (*frontier-template* ou *container-chain-template*) para um diferente antes de construir o arquivo Wasm. Você também precisará executar a extrínseca `setCodeWithoutChecks` em vez de `setCode`.

Com o seu [tempo de execução Wasm](/learn/framework/architecture/#runtime){target=\_blank} pronto para ser carregado e a sua [conta Sudo acessível no portal do desenvolvedor](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}, siga as seguintes etapas:

1. Navegue até a aba **Desenvolvedor** do portal do desenvolvedor da sua appchain Tanssi.
2. Clique em **Sudo**. Se você não vir **Sudo** neste menu, é porque você não associou a conta Sudo ao portal do desenvolvedor. Certifique-se de que a sua [conta Sudo está injetada pela sua carteira e conectada ao portal do desenvolvedor](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}.
3. Selecione o pallet **system**.
4. Selecione **setCode**.
5. Alterne a chave **fileUpload** para habilitar o upload do seu arquivo de runtime Wasm.
6. Faça o upload do seu runtime Wasm.
7. Pressione **Enviar Sudo** e confirme a transação na sua carteira.
![Atualizando seu Runtime no Portal do Desenvolvedor](/images/builders/manage/developer-portal/upgrade/upgrade-2.webp)

Você pode verificar se a atualização do seu runtime foi bem-sucedida verificando a versão do runtime no canto superior esquerdo. Nesse caso, você pode ver que o runtime da appchain com tecnologia Tanssi foi atualizado com sucesso para a versão `400`.

![Verificar a versão do Runtime no Polkadot.js Apps](/images/builders/manage/developer-portal/upgrade/upgrade-3.webp)

E é isso! A seção [portal do desenvolvedor](/pt/builders/manage/developer-portal/) tem muitos outros guias sobre como gerenciar sua appchain Tanssi.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
