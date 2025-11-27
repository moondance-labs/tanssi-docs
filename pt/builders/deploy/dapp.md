---
title: Deploy Your Appchain via the DApp
description: Learn how to spin up and deploy an appchain on Tanssi using the Tanssi dApp, a no-code solution for onboarding and launching decentralized appchains in minutes.
icon: octicons-browser-24
categories: Appchain
---

````json
{
  "source_path": "builders/deploy/dapp.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "b8c22b4482283c8c119575099b86ee21ff6ff52733e1f2b936cae1ecc1b9b7f1",
  "content": "--- \ntitle: Deploy Your Appchain via the DApp\ndescription: Learn how to spin up and deploy an appchain on Tanssi using the Tanssi dApp, a no-code solution for onboarding and launching decentralized appchains in minutes.\nicon: octicons-browser-24\ncategories: Appchain\n---\n\n# Deploy Your Appchain via the Tanssi DApp\n\n<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/W40oqavpZJ8' frameborder='0' allowfullscreen></iframe></div>\n<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>\n\n## Introduction {: #introduction }\n\nTanssi aims to lower the barrier to entry for building decentralized appchains by streamlining the onboarding process and abstracting away the technical details of launching a Tanssi-powered appchain. The [Tanssi dApp](https://apps.tanssi.network){target=\\_blank} allows you to spin up an appchain in just minutes. This guide will walk you through the steps required to launch an appchain on Dancelight, the Tanssi TestNet, via the Tanssi dApp.\n\n## Quick Trials vs. Dedicated appchains {: #quick-trial-vs-dedicated-appchains }\n \n[The Tanssi dApp](https://apps.tanssi.network){target=\\_blank} supports the creation of two different types of appchains, namely:\n\n- Quick trial - a temporary appchain that self-destructs after 48 hours\n- Dedicated - a long-lasting appchain for Tanssi ecosystem builders\n\nBoth types of Tanssi appchains behave identically, with the only difference being the ephemeral nature of the quick trials. Generally speaking, quick trial appchains are best for most builders who want to test out a Tanssi-powered appchain. However, if you require a long-lasting test environment, the Tanssi team will happily assist you with setting up a dedicated appchain. \n\nThe screenshots and content in this guide will showcase quick trial appchains, but you can follow the same process to configure a dedicated Tanssi appchain.\n\n![A screenshot showing the initial dashboard of apps.tanssi.network.](/images/builders/deploy/dapp/dapp-1.webp)\n\n## Prerequisites {: #prerequisites }\n\n### Supported Wallets {: #supported-wallets }\n\nSince Tanssi is built with Substrate, you'll need to use a Substrate-compatible wallet to deploy and manage your Tanssi appchain. Supported wallets include:\n\n- [Talisman](https://talisman.xyz/){target=\\_blank}\n- [SubWallet](https://www.subwallet.app){target=\\_blank}\n- [Enkrypt](https://www.enkrypt.com){target=\\_blank}\n- [Polkadot.js extension](https://polkadot.js.org/extension){target=\\_blank}\n\nIf you deploy a Tanssi-powered EVM appchain, your users won't need a Substrate wallet. They can interact with your Tanssi appchain using Ethereum-compatible wallets like [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\\_blank}.\n\n![Connection screen for various Substrate wallets](/images/builders/deploy/dapp/dapp-2.webp)\n\n### Connect Your Wallet to the DApp {: #connect-wallet }\n\nTo connect your wallet to the Tanssi dApp, click **Connect Wallet** in the upper-right corner. Select the desired wallet type. Then, take the following steps:\n\n1. Choose your account from the dropdown\n2. You'll be prompted to sign a message to log you into the Tanssi dApp. Go ahead and sign the message\n\n![Click on the Connect Wallet button to connect your wallet to the Tanssi dApp.](/images/builders/deploy/dapp/dapp-3.webp)\n\nOnce connected, you'll see your address in the top-right corner. If you've connected multiple accounts and want to switch accounts, you can click on your address and choose an account from the dropdown menu.\n\n## Configure Your Appchain {: #configure-your-appchain }\n\nOn the dApp [Home page](https://apps.tanssi.network/){target=\\_blank}, click the **Start Building** button in the **Launch Network** block to start configuring your Tanssi appchain immediately. You have to choose between a **Quick Trial** or a **Dedicated** appchain. You can read more about [the differences between these two available types on the Tanssi Testnet](#quick-trial-vs-dedicated-appchains).\n\n![A screenshot showing the Launch Network section of apps.tanssi.network.](/images/builders/deploy/dapp/dapp-1.webp)\n\nNext, select a template that best fits your use case and configure your Tanssi appchain's properties accordingly. You can choose from the EVM or Substrate template or upload a raw specification file. Please refer to the [Templates](/builders/build/templates/overview/){target=\\_blank} documentation to learn more about the available templates.\n\n### EVM Template {: #evm-template }\n\nThe [EVM template](/builders/build/templates/evm/){target=\\_blank} provides all the necessary components to add an Ethereum compatibility layer to your Tanssi appchain. \n\nAs part of the setup process, you'll need a unique EVM chain ID ([EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md){target=\\_blank}) that is distinct from all other EVM chains. You can verify that another chain does not already use your EVM chain ID on [Chainlist](https://chainid.network){target=\\_blank}. When launching your Tanssi appchain in production, it's critical that you open a PR to reserve your chain ID on the [`ethereum-lists/chains` GitHub repository](https://github.com/ethereum-lists/chains){target=\\_blank} immediately after your RPC endpoint spins up. This is part of the validation process and is required for the PR to be accepted and merged.\n\n!!! note\n    A registered EVM chain ID is only necessary for Tanssi appchains deployed on the MainNet. When testing or deploying on the TestNet, you can choose any available ID and move forward.\n\nTo get started, select the **EVM** template from the left-side menu. Then take the following steps:\n\n1. In the **Network Details** section, provide your project's name, your unique EVM chain ID, and select the category that best fits your use case\n2. In the **Gas Token** section, enter the symbol of your appchain's native token. Decimal places are fixed to 18 digits, the same as Ether, to preserve compatibility across EVM tooling\n3. (Optional) You can adjust the [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\\_blank} configurations in the **Advanced** settings. You can choose to change the **Base fee per gas** and **Max base fee change**\n4. In the **Accounts** section, provide the Ethereum-style address of the account you want to use as the sudo account and its corresponding initial balance. This account will be able to dispatch privileged functions that require Root permissions. There can only be one sudo account at a time. The sudo account can be changed at any time to a new one by the current sudo account. Once the Tanssi appchain is launched, you can easily migrate to a fully decentralized system using specific democracy-related modules\n5. (Optional) In the **Advanced** section, click on **Add** to add genesis accounts and balances. If you choose to skip this step, you can use the sudo account to create accounts and transfer funds at a later time\n6. (Optional) In the **Genesis Smart Contracts**, click on **Add** to add genesis smart contracts by providing an address to use and the bytecode for the smart contract. When providing the bytecode, you'll need to remove the `0x` from the beginning of the bytecode\n7. Once you have configured the template for your Tanssi appchain, select **Continue** and proceed to the [Check Balances section](#check-balances)\n\n![Create a Tanssi EVM Appchain with the Tanssi dApp.](/images/builders/deploy/dapp/dapp-4.webp)\n\n### Substrate Template {: #substrate-template }\n\nThe [Substrate template](/builders/build/templates/overview/#baseline-network-template){target=\\_blank} includes all the configurations for seamless integration with Tanssi. It can be used as the baseline specification to build a custom Tanssi-powered appchain leveraging the modularity and scalability of the Substrate framework.\n\nTo get started, select the **Substrate** template from the left-side menu. Then take the following steps:\n\n1. In the **Network Details** section, enter your project's name and select the category that best fits your use case\n2. In the **Gas Token** section, enter the token decimals, symbol, and the [SS58 address format](https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json){target=\\_blank}\n3. In the **Accounts** section, provide the Substrate-style address of the account you want to use as the sudo account and its initial balance. This account will be able to dispatch privileged functions that require Root permissions. There can only be one sudo account at a time. The sudo account can be changed at any time to a new one by the current sudo account. Once the appchain is launched, you can easily migrate to a fully decentralized system using specific democracy-related modules\n4. (Optional) In the **Advanced** section, click on **Add** to add genesis accounts and balances. If you choose to skip this step, you can use the sudo account to create accounts and transfer funds at a later time\n5. Once you have configured the template for your Tanssi appchain, you can select **Continue** to proceed to the [Check Balances section](#check-balances)\n\n![Create a baseline Substrate Appchain with the Tanssi dApp.](/images/builders/deploy/dapp/dapp-5.webp)\n\n### Custom {: #custom }\n\nIf you already have a Substrate runtime built and have chosen to upload your own custom specification file, there are some requirements you should be aware of to ensure the runtime can evolve into a Tanssi-powered appchain and run properly.\n\nYour runtime must implement the following:\n\n- The Cumulus SDK, as outlined in the [Base Setup to Connect to Polkadot](/builders/build/templates/overview/#base-setup-to-polkadot){target=\\_blank} section of the [Templates](/builders/build/templates/overview/){target=\\_blank} page\n- Tanssi modules for block production, as outlined in the [Base Setup to Support the Tanssi Protocol](/builders/build/templates/overview/#base-setup-supporting-tanssi){target=\\_blank} section of the [Templates](/builders/build/templates/overview/){target=\\_blank} page\n\nOther required changes in the runtime include:\n\n- To verify the author's eligibility to produce a block, set the following type as shown in the snippet, in the `timestamp` module configuration section of the runtime:\n\n    ```rust\n    type OnTimestampSet = tp_consensus::OnTimestampSet<\n        <Self as pallet_author_inherent::Config>::SlotBeacon,\n        ConstU64<{ SLOT_DURATION }>, \n    >;\n    ```\n\n- Remove all the modules related to block production and consensus (such as `Aura` and `Grandpa`), leaving Tanssi to take over the burden. If the starting point for your project was the parachain template, the following modules are included by default in the runtime and must be removed:\n\n    ```rust\n    // Collator support. The order of these 4 are important and shall not change.\n\t#[runtime::pallet_index(20)]\n\tpub type Authorship = pallet_authorship;\n\t#[runtime::pallet_index(21)]\n\tpub type CollatorSelection = pallet_collator_selection;\n\t#[runtime::pallet_index(22)]\n\tpub type Session = pallet_session;\n\t#[runtime::pallet_index(23)]\n\tpub type Aura = pallet_aura;\n\t#[runtime::pallet_index(24)]\n\tpub type AuraExt = cumulus_pallet_aura_ext;\n    ```\n\nFinally, [generate and edit](/builders/build/customize/customizing-chain-specs/#editing-json-chain-specs){target=\\_blank} the chain specification paying special attention to:\n\n- `para_id` - within this custom flow, a pre-registered appchain id is required. You can get an appchain ID moving forward with the registration to the **Reserve your Network ID** step. After you reserve the ID, start over the process to get back to this point\n- `is_ethereum` - to `true` if exposing Ethereum compatible RPC endpoints is needed\n\nAnd, depending on whether you are deploying a quick trial appchain or a dedicated one, also adjust these attributes:\n\n=== \"Quick Trial Appchain\"\n\n    ```json\n    {\n        ...\n        \"relay_chain\": \"rococo_flashbox_relay_testnet\",\n        \"chainType\": \"Live\",\n        \"genesis\": {\n            \"runtime\": {\n                ...\n                \"authoritiesNoting\": {\n                    \"orchestratorParaId\": 1000\n                },\n                ...\n            }\n        }\n        ...\n    }\n    ```\n\n=== \"Dedicated Appchain\"\n\n    ```json\n    {\n        ...\n        \"relay_chain\": \"rococo-local\",\n        \"chainType\": \"Live\",\n        \"genesis\": {\n            \"runtime\": {\n                ...\n                \"authoritiesNoting\": {\n                    \"orchestratorParaId\": 0\n                },\n                ...\n            }\n        }\n        ...\n    }\n    ```\n\nNow, you can upload your custom raw specification file by selecting the **Custom** template and adding your JSON specification file.\n\n![Upload a custom raw specification file to the Tanssi dApp.](/images/builders/deploy/dapp/dapp-6.webp)\n\n!!! note\n    The size of a raw chain specifications file should not exceed 2MB.\n\n## Check Balances {: #check-balances }\n\nNext, you'll need to verify that you have sufficient balance. If you don't, you can press **Request Tokens** and complete the following login with GitHub or Google. You'll need to complete a few quick onboarding questions, and then you'll be able to press **Request Tokens** again, and they will be delivered to your connected wallet. \n\n![Request tokens](/images/builders/deploy/dapp/dapp-7.webp)\n\nIf you're setting up a dedicated Tanssi appchain, you'll need to fill out an [application form](https://www.tanssi.network/dedicated-chain-testnet-form){target=\\_blank}. The Tanssi team will review your application and send the necessary tokens within one business day. \n\nThe required minimum balances to launch a Tanssi appchain are as follows:\n\n=== \"Quick Trial Appchain\"\n    |        Chain        | Balance Required |\n    |:-------------------:|:----------------:|\n    | Orchestration layer |     70 UNIT      |\n    |   Tanssi TestNet    |     100 SNAP     |\n\n=== \"Dedicated Appchain\"\n    |            Chain             | Balance Required |\n    |:----------------------------:|:----------------:|\n    |  Tanssi TestNet   |    100 STAR     |\n\n!!! note\n    Quick trial appchains use an additional orchestration layer, therefore two different tokens, SNAP and UNIT, will be sent to your account. For dedicated appchains only STAR tokens are required.\n\n## Reserve your Appchain ID {: #reserve-appchain-id }\n\nIf you haven't already done so, you must to reserve your Tanssi appchain ID, which will identify your chain within the Tanssi ecosystem.\n\nTo reserve your Tanssi appchain ID, you'll need to submit a transaction. Please make sure to use the account you plan to launch your Tanssi appchain with when submitting the transaction.\n\n1. To initiate the transaction, click on **Reserve Network ID**\n2. Your wallet will pop up, and you'll need to submit the transaction\n\n![Reserve your Tanssi-powered Appchain ID via the Tanssi dApp.](/images/builders/deploy/dapp/dapp-8.webp)\n\nOnce the transaction has successfully gone through, your Tanssi appchain ID will be displayed on the dApp, and you'll be able to click **Continue** to proceed to the next step. You'll notice that some of your UNIT (or STAR if registering a dedicated Appchain) tokens have been removed from your transferable balance and are now reserved.\n\n![Successfully reserved your Tanssi-powered Appchain ID via the Tanssi dApp.](/images/builders/deploy/dapp/dapp-9.webp)\n\n## Generate Your Appchain Files {: #generate-appchain-files }\n\nBefore you can deploy your Tanssi appchain, you'll need to generate three configuration files:\n\n- [The raw chain specification](/builders/build/customize/customizing-chain-specs/#generating-raw-specs-file){target=\\_blank} - a compact version of the JSON specification file, which defines the initial settings and state that all nodes participating in the network must agree on to reach consensus and produce blocks\n- [The genesis state header](/builders/build/customize/customizing-chain-specs/#genesis-state){target=\\_blank} - defines the initial state upon which all transactions and state transitions are executed\n- [The genesis Wasm](/learn/framework/architecture/#runtime){target=\\_blank} - a WebAssembly (Wasm) blob that defines the runtime logic\n\nThese files will automatically be generated for you based on your Tanssi appchain ID and your customized template configurations. All you need to do is click **Generate**, and the dApp will generate the required files for you.\n\n![Generate your Tanssi-powered appchain files with the click of a button on the Tanssi dApp.](/images/builders/deploy/dapp/dapp-10.webp)\n\nOnce the files have been generated, please click **Continue** to go on to the final step.\n\n## Deploy Your appchain {: #deploy-your-appchain }\n\nYou're finally ready to take your last step towards preparing your appchain as it evolves into a Tanssi-powered appchain! For this final step, when registering a quick trial you'll need to submit two transactions: one to register your appchain on the orchestration layer and another to register your appchain on the Tanssi TestNet.\n\nTo register your appchain on the orchestration layer, take the following steps:\n\n1. Click **Register** under the **Register Network in Relay** section\n2. Confirm the transaction in your wallet\n\n![Register your Tanssi-powered appchain on the orchestration layer.](/images/builders/deploy/dapp/dapp-11.webp)\n\nOnce the transaction has gone through successfully, the dApp will update to show that you have successfully registered your Tanssi appchain under the **Register Network in Relay** section.\n\nLastly, to register your appchain on Tanssi, take the following steps:\n\n1. Click **Register** under the **Register Network in Tanssi** section\n2. Confirm the transaction in your wallet\n\n![Register your appchain on Tanssi.](/images/builders/deploy/dapp/dapp-12.webp)\n\nOnce the transaction has gone through successfully, the dApp will update to show that you have registered your Tanssi-powered appchain. Congratulations! On the dashboard, you can check the status of your deployment and view relevant information, such as the latest block information, RPC and WS endpoints, and more.\n\n![The appchain dashboard on the Tanssi dApp.](/images/builders/deploy/dapp/dapp-13.webp)\n\nAnd that's it! You've successfully registered your Tanssi appchain! The launch process will automatically begin once the Tanssi team has verified your registration. Once your appchain is live, you can return to the **Dashboard** to view the RPC URL and other pertinent chain information.",
  "translated_content": "--- \ntitle: Implemente sua Appchain através do DApp\ndescrição: Aprenda como iniciar e implementar uma appchain na Tanssi usando o Tanssi dApp, uma solução sem código para integração e lançamento de appchains descentralizadas em minutos.\nicon: octicons-browser-24\ncategories: Appchain\n---\n\n# Implemente sua Appchain através do Tanssi DApp\n\n<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/W40oqavpZJ8' frameborder='0' allowfullscreen></iframe></div>\n<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>\n\n## Introdução {: #introduction }\n\nA Tanssi tem como objetivo reduzir a barreira de entrada para a construção de appchains descentralizadas, simplificando o processo de integração e abstraindo os detalhes técnicos do lançamento de uma appchain com tecnologia Tanssi. O [Tanssi dApp](https://apps.tanssi.network){target=\\_blank} permite que você inicie uma appchain em apenas alguns minutos. Este guia mostrará as etapas necessárias para lançar uma appchain no Dancelight, a Tanssi TestNet, através do Tanssi dApp.\n\n## Testes rápidos vs. appchains dedicadas {: #quick-trial-vs-dedicated-appchains }\n \n[O Tanssi dApp](https://apps.tanssi.network){target=\\_blank} suporta a criação de dois tipos diferentes de appchains, nomeadamente:\n\n- Teste rápido - uma appchain temporária que se autodestrói após 48 horas\n- Dedicada - uma appchain de longa duração para criadores de ecossistemas Tanssi\n\nAmbos os tipos de appchains Tanssi se comportam de forma idêntica, sendo a única diferença a natureza efêmera dos testes rápidos. De um modo geral, as appchains de teste rápido são as melhores para a maioria dos desenvolvedores que desejam testar uma appchain com tecnologia Tanssi. No entanto, se você precisar de um ambiente de teste de longa duração, a equipe Tanssi terá prazer em ajudá-lo a configurar uma appchain dedicada. \n\nAs capturas de tela e o conteúdo deste guia mostrarão as appchains de teste rápido, mas você pode seguir o mesmo processo para configurar uma appchain Tanssi dedicada.\n\n![Uma captura de tela mostrando o painel inicial de apps.tanssi.network.](/images/builders/deploy/dapp/dapp-1.webp)\n\n## Pré-requisitos {: #prerequisites }\n\n### Carteiras Suportadas {: #supported-wallets }\n\nComo Tanssi é construído com Substrate, você precisará usar uma carteira compatível com Substrate para implantar e gerenciar sua appchain Tanssi. As carteiras suportadas incluem:\n\n- [Talisman](https://talisman.xyz/){target=\\_blank}\n- [SubWallet](https://www.subwallet.app){target=\\_blank}\n- [Enkrypt](https://www.enkrypt.com){target=\\_blank}\n- [Extensão Polkadot.js](https://polkadot.js.org/extension){target=\\_blank}\n\nSe você implantar uma appchain EVM com tecnologia Tanssi, seus usuários não precisarão de uma carteira Substrate. Eles podem interagir com sua appchain Tanssi usando carteiras compatíveis com Ethereum, como [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\\_blank}.\n\n![Tela de conexão para várias carteiras Substrate](/images/builders/deploy/dapp/dapp-2.webp)\n\n### Conecte sua Carteira ao DApp {: #connect-wallet }\n\nPara conectar sua carteira ao Tanssi dApp, clique em **Conectar Carteira** no canto superior direito. Selecione o tipo de carteira desejado. Em seguida, siga estas etapas:\n\n1. Escolha sua conta na lista suspensa\n2. Você será solicitado a assinar uma mensagem para fazer login no Tanssi dApp. Vá em frente e assine a mensagem\n\n![Clique no botão Connect Wallet para conectar sua carteira ao Tanssi dApp.](/images/builders/deploy/dapp/dapp-3.webp)\n\nApós a conexão, você verá seu endereço no canto superior direito. Se você conectou várias contas e deseja alternar entre contas, pode clicar no seu endereço e escolher uma conta no menu suspenso.\n\n## Configure sua Appchain {: #configure-your-appchain }\n\nNa [página inicial](https://apps.tanssi.network/){target=\\_blank} do dApp, clique no botão **Começar a construir** no bloco **Iniciar rede** para começar a configurar sua appchain Tanssi imediatamente. Você tem que escolher entre uma appchain **Teste rápido** ou **Dedicada**. Você pode ler mais sobre [as diferenças entre esses dois tipos disponíveis na Tanssi Testnet](#quick-trial-vs-dedicated-appchains).\n\n![Uma captura de tela mostrando a seção Iniciar rede de apps.tanssi.network.](/images/builders/deploy/dapp/dapp-1.webp)\n\nEm seguida, selecione um modelo que melhor se adapte ao seu caso de uso e configure as propriedades da sua appchain Tanssi de acordo. Você pode escolher entre o modelo EVM ou Substrate ou carregar um arquivo de especificação bruta. Consulte a documentação [Modelos](/builders/build/templates/overview/){target=\\_blank} para saber mais sobre os modelos disponíveis.\n\n### Modelo EVM {: #evm-template }\n\nO [modelo EVM](/builders/build/templates/evm/){target=\\_blank} fornece todos os componentes necessários para adicionar uma camada de compatibilidade Ethereum à sua appchain Tanssi. \n\nComo parte do processo de configuração, você precisará de uma ID de cadeia EVM exclusiva ([EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md){target=\\_blank}) que seja distinta de todas as outras cadeias EVM. Você pode verificar se outra cadeia já não usa a sua ID de cadeia EVM em [Chainlist](https://chainid.network){target=\\_blank}. Ao lançar a sua appchain Tanssi em produção, é crucial que abra um PR para reservar a sua ID de cadeia no [repositório GitHub `ethereum-lists/chains`](https://github.com/ethereum-lists/chains){target=\\_blank} imediatamente após o seu endpoint RPC ser iniciado. Isto faz parte do processo de validação e é necessário para que o PR seja aceito e fundido.\n\n!!! note\n    Uma ID de cadeia EVM registada só é necessária para appchains Tanssi implementadas na MainNet. Ao testar ou implementar na TestNet, pode escolher qualquer ID disponível e seguir em frente.\n\nPara começar, selecione o modelo **EVM** no menu do lado esquerdo. Em seguida, siga estas etapas:\n\n1. Na seção **Detalhes da rede**, forneça o nome do seu projeto, sua ID de cadeia EVM exclusiva e selecione a categoria que melhor se adapta ao seu caso de uso\n2. Na seção **Token de gás**, insira o símbolo do token nativo da sua appchain. As casas decimais são fixadas em 18 dígitos, o mesmo que o Ether, para preservar a compatibilidade entre as ferramentas EVM\n3. (Opcional) Você pode ajustar as configurações [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\\_blank} nas configurações **Avançadas**. Você pode optar por alterar a **Taxa base por gás** e a **Alteração máxima da taxa base**\n4. Na seção **Contas**, forneça o endereço no estilo Ethereum da conta que deseja usar como conta sudo e seu saldo inicial correspondente. Esta conta poderá despachar funções privilegiadas que exigem permissões de Root. Só pode haver uma conta sudo por vez. A conta sudo pode ser alterada a qualquer momento para uma nova conta pela conta sudo atual. Depois que a appchain Tanssi for lançada, você pode migrar facilmente para um sistema totalmente descentralizado usando módulos específicos relacionados à democracia\n5. (Opcional) Na seção **Avançado**, clique em **Adicionar** para adicionar contas e saldos de gênese. Se você optar por pular esta etapa, poderá usar a conta sudo para criar contas e transferir fundos mais tarde\n6. (Opcional) Em **Contratos Inteligentes Gênese**, clique em **Adicionar** para adicionar contratos inteligentes gênese, fornecendo um endereço a ser usado e o bytecode para o contrato inteligente. Ao fornecer o bytecode, você precisará remover o `0x` do início do bytecode\n7. Depois de configurar o modelo para sua appchain Tanssi, selecione **Continuar** e prossiga para a [seção Verificar saldos](#check-balances)\n\n![Crie uma Appchain EVM Tanssi com o Tanssi dApp.](/images/builders/deploy/dapp/dapp-4.webp)\n\n### Modelo Substrate {: #substrate-template }\n\nO [modelo Substrate](/builders/build/templates/overview/#baseline-network-template){target=\\_blank} inclui todas as configurações para uma integração perfeita com a Tanssi. Ele pode ser usado como especificação básica para construir uma appchain personalizada com tecnologia Tanssi, aproveitando a modularidade e escalabilidade da estrutura Substrate.\n\nPara começar, selecione o modelo **Substrate** no menu do lado esquerdo. Em seguida, siga estas etapas:\n\n1. Na seção **Detalhes da rede**, insira o nome do seu projeto e selecione a categoria que melhor se adapta ao seu caso de uso\n2. Na seção **Token de gás**, insira as casas decimais do token, símbolo e o [formato de endereço SS58](https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json){target=\\_blank}\n3. Na seção **Contas**, forneça o endereço no estilo Substrate da conta que deseja usar como conta sudo e seu saldo inicial. Esta conta poderá despachar funções privilegiadas que exigem permissões de Root. Só pode haver uma conta sudo por vez. A conta sudo pode ser alterada a qualquer momento para uma nova conta pela conta sudo atual. Depois que a appchain for lançada, você pode migrar facilmente para um sistema totalmente descentralizado usando módulos específicos relacionados à democracia\n4. (Opcional) Na seção **Avançado**, clique em **Adicionar** para adicionar contas e saldos de gênese. Se você optar por pular esta etapa, poderá usar a conta sudo para criar contas e transferir fundos mais tarde\n5. Depois de configurar o modelo para sua appchain Tanssi, você pode selecionar **Continuar** para prosseguir para a [seção Verificar saldos](#check-balances)\n\n![Crie uma Appchain Substrate básica com o Tanssi dApp.](/images/builders/deploy/dapp/dapp-5.webp)\n\n### Personalizado {: #custom }\n\nSe você já tiver um tempo de execução Substrate construído e tiver escolhido carregar seu próprio arquivo de especificação personalizado, há alguns requisitos que você deve conhecer para garantir que o tempo de execução possa evoluir para uma appchain com tecnologia Tanssi e ser executado corretamente.\n\nSeu tempo de execução deve implementar o seguinte:\n\n- O SDK Cumulus, conforme descrito na seção [Configuração básica para conectar ao Polkadot](/builders/build/templates/overview/#base-setup-to-polkadot){target=\\_blank} da página [Modelos](/builders/build/templates/overview/){target=\\_blank}\n- Módulos Tanssi para produção de blocos, conforme descrito na seção [Configuração básica para suportar o protocolo Tanssi](/builders/build/templates/overview/#base-setup-supporting-tanssi){target=\\_blank} da página [Modelos](/builders/build/templates/overview/){target=\\_blank}\n\nOutras alterações necessárias no tempo de execução incluem:\n\n- Para verificar a elegibilidade do autor para produzir um bloco, defina o seguinte tipo, conforme mostrado no snippet, na seção de configuração do módulo `timestamp` do tempo de execução:\n\n    ```rust\n    type OnTimestampSet = tp_consensus::OnTimestampSet<\n        <Self as pallet_author_inherent::Config>::SlotBeacon,\n        ConstU64<{ SLOT_DURATION }>, \n    >;\n    ```\n\n- Remova todos os módulos relacionados à produção de blocos e consenso (como `Aura` e `Grandpa`), deixando a Tanssi assumir o ônus. Se o ponto de partida para seu projeto fosse o modelo de para-corrente, os seguintes módulos são incluídos por padrão no tempo de execução e devem ser removidos:\n\n    ```rust\n    // Suporte ao Collator. A ordem destes 4 é importante e não deve ser alterada.\n\t#[runtime::pallet_index(20)]\n\tpub type Authorship = pallet_authorship;\n\t#[runtime::pallet_index(21)]\n\tpub type CollatorSelection = pallet_collator_selection;\n\t#[runtime::pallet_index(22)]\n\tpub type Session = pallet_session;\n\t#[runtime::pallet_index(23)]\n\tpub type Aura = pallet_aura;\n\t#[runtime::pallet_index(24)]\n\tpub type AuraExt = cum

































































































    ```rust




    ```



    ```rust











    ```










    ```json















    ```



    ```json















    ```
````
