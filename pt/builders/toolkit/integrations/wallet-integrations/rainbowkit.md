---
title: How to Add RainbowKit to a Tanssi EVM Network
description: Learn how to integrate RainbowKit with an Ethereum-compatible network deployed through Tanssi, making adding a great wallet experience to your dApp easy.
icon: material-wallet-outline
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/integrations/wallet-integrations/rainbowkit.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "7fbbe9bec1db2d85910de26c92eb3280d2857dd87d6ce2455e85f1e11a19a633",
  "content": "---
title: How to Add RainbowKit to a Tanssi EVM Network 
description: Learn how to integrate RainbowKit with an Ethereum-compatible network deployed through Tanssi, making adding a great wallet experience to your dApp easy.
icon: material-wallet-outline
categories: EVM-Template
---

# Integrate RainbowKit with a Tanssi Network 

## Introduction 

[RainbowKit](https://rainbowkit.com/docs/introduction){target=\\_blank} is a React library that adds wallet connection capabilities to a dApp. It supports numerous wallets and enables features such as switching connection chains, ENS address resolution, and balance display out-of-the-box. RainbowKit offers customization options for all EVM-compatible chains, making it possible to connect wallets to a network easily.


RainbowKit bundles together multiple tools to simplify adding wallet connections to a dApp:

- [Wagmi](https://wagmi.sh/){target=\\_blank} - a React Hooks library for interacting with Ethereum accounts, wallets, contracts, transactions, signing, ENS, and more
    ```bash

    ```


    ```bash

    ```

    ```bash

=== \"npm\"

    ```

=== \"pnpm\"

    ```bash

    pnpm create @rainbow-me/rainbowkit@latest

    ```
    ```bash

    ```
    yarn create @rainbow-me/rainbowkit

    ```bash


    ```
    ```bash

Navigate to the project directory, start the development server, and open `http://localhost:3000` to view the project locally:

    ```bash

    ```



    ```bash

    ```

    pnpm run dev

    ```

=== \"yarn\"

    ```bash

    ```js title="src/wagmi.ts"
    yarn dev
    ```

    ```js title="src/wagmi.ts"
The starting screen should look like this:
    ```

    ```js title="src/wagmi.ts"

    ```

Since the [demo EVM network](https://apps.tanssi.network/demo/){target=\\_blank} is a custom network on Tanssi, it cannot be imported directly from `wagmi/chains`. Instead, define the chain manually in the `wagmi.ts` file. For example, if the network uses the Tanssi demo network or another EVM-compatible chain, the necessary configurations must be added manually.

Here is the configuration for the demo EVM network on Tanssi:

=== \"Demo EVM Network\"

    ```js title=\"src/wagmi.ts\"
    --8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/wagmi.ts'
    ```

To add support for the demo EVM network on Tanssi, update `wagmi.ts` as shown above. The following section explains how to generate the `projectId` value for WalletConnect.

## Manual Setup 

The following sections will walk you through the steps to integrate RainbowKit into an existing React application, such as installing and importing the necessary dependencies, configuring chain connections, and making the RainbowKit functionality available to users in the dApp. The setup will also include steps to specify which chain the **Connect Wallet** button should connect to by default and how to customize the RainbowKit theme to fit the project. This guide is based on the Tanssi [demo EVM network](https://apps.tanssi.network/demo){target=\\_blank}, but can be adapted for your own Tanssi-powered EVM network by changing the RPC URL parameter.

### Checking Prerequisites {: #checking-prerequisites }

Before proceeding, ensure the following prerequisites are met:

- A Tanssi EVM-compatible network

- An existing dApp built with [React](https://react.dev/){target=\\_blank}

- The [RainbowKit examples repository](https://github.com/rainbow-me/rainbowkit/tree/main/examples){target=\\_blank} includes templates for multiple React frameworks
    
 - To follow this guide, visit [Next.js](https://nextjs.org/docs){target=\\_blank} and follow the **Automatic Installation** instructions, selecting Typescript and the App Router options during setup 

- The wallet must support custom networks, as the Tanssi demo EVM network will be added manually

    ```bash
- A WalletConnect `projectId` - every dApp relying on WalletConnect is required to have an associated `projectId`. It is free to create an account,  and an ID can be generated instantly
    ```

    To obtain a WalletConnect `projectId`:

    1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/){target=\\_blank}

    ```bash
    ```


    ```bash
    ```

    ```bash

    ```

    ```bash
=== \"npm\"
    ```bash

    ```
    npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
    ```

    ```bash
=== \"pnpm\"
    ```

    ```bash
    pnpm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
    ```bash

    ```
=== \"yarn\"
    ```

    ```bash
    yarn add @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
    ```

    ```bash

    ```

    ```bash
=== \"npm\"
    ```

    ```bash
    npm run dev
    ```

    ```bash
=== \"pnpm\"
    ```bash

    ```
    pnpm run dev
    ```

    ```text title=".env.local"

    ```

    yarn dev

    ```

After starting the server, open `http://localhost:3000` to view the Next.js application in the browser.

To test the RainbowKit connection, the MetaMask app can be used. Ensure that the Tanssi demo EVM network is connected in the MetaMask wallet.

To add the Tanssi demo EVM network to MetaMask:

1. Open MetaMask and go to Settings > Networks > Add Network.
2. Input the following information:

    ```bash

    - RPC URL: `{{ networks.dancelight.demo_evm_rpc_url }}`

    ```

    ```bash

    - Block Explorer URL: `{{ networks.dancelight.demo_evm_blockscout_url }}`

```bash

```

```ts title="wagmi.ts"
    ```text title=".env.local"

```

    ```bash

    touch .env.local

    ```
```bash

2. Add the `projectId` to this file

```
    NEXT_PUBLIC_PROJECT_ID='INSERT_PROJECT_ID'
    ```

```ts title="providers.tsx"

```

### Connect DApp to MetaMask 

```ts title="layout.tsx"
With the development environment set up and MetaMask configured for the Tanssi demo EVM network, the next step is to configure the dApp to connect with MetaMask's wallet using RainbowKit. This process involves the following key steps:
```

```bash
2. Setup configuration for Wagmi
```

4. Add the connect button

```ts title="page.tsx"
````

```

````

```bash

```

In `wagmi.ts`, import the necessary libraries and define Demo EVM Chain as the supported chain:

````

```bash

--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/wagmi2.ts'

````

### Wrap the Application with Providers

```Ts title="providers.tsx"

Next, create a file named `providers.tsx` to wrap the application with the necessary providers: `WagmiProvider`, and `QueryClientProvider`.

```

```bash

````

touch providers.tsx

````

```js title="providers.tsx"
```ts title="layout.tsx"

```
````

--8\<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/providers1.tsx'

````

```ts title="page.tsx"

Now locate the `layout.tsx` file inside the `app` directory and modify the code to import `Providers` and wrap the application:

````

````ts title=\"layout.tsx\"

```ts title="page.tsx"

````

### Add the Connect Button

RainbowKit offers a `ConnectButton` component, which renders the **Connect** and **Disconnect** buttons and UI elements for switching chains. This example imports the `ConnectButton` into the existing `page.tsx` file for simplicity, though it can also be added to an element like a **Header** or **Navbar** to appear at the top of every page. Update the code in `page.tsx` as follows:

```ts title=\"page.tsx\"

--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/pages.tsx'

```

Once the development server is running, the home page will display a **Connect Wallet** button. Clicking this button will open the RainbowKit modal, providing options to either connect an existing wallet or get a new one. Select **MetaMask** and follow the on-screen instructions to complete the connection process.

The current configuration defaults to connecting to Demo EVM Chain and displays the current network, the native token balance, and the connected wallet address. If multiple networks are supported, selecting the arrow next to it will open the Switch Networks modal. This allows users to select another network and authorize the change.

```Ts title="providers.tsx"

```

```Ts title="providers.tsx"

```

By default, RainbowKit connects to the first chain supplied to Wagmi in the config. The order of chains listed in `wagmi.ts` will match the order displayed in the **Switch Networks** modal. To ensure that the Tanssi demo EVM network is always the default connection, simply move it to the top of the chain list. However, Relying solely on this default behavior might not be the best option.

```js title="providers.tsx"

```

--8\<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/providers.tsx'

```js title="providers.tsx"

```

### Define Custom Theme Colors

RainbowKit provides three built-in theme functions: `lightTheme`, `darkTheme`, and `midnightTheme`. These functions return a theme object that can be passed to the `RainbowKitProvider` prop `theme` to customize colors, border radius, font stack, and overlay blur. Update `providers.tsx` with the following code and ensure that `darkTheme` is added to the `@rainbow-me/rainbowkit` import statement for the changes to apply correctly. After customizing the initial chain and theme, the `providers.tsx` file will look like this:

```js title=\"providers.tsx\"

--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/providers2.tsx'

```

This configuration sets a dark theme with custom properties:

- `accentColor` - the primary highlight color. In this example, Tanssi's accent color (#189B9B) is used, but it can be adjusted to match the branding of the dApp
- `accentColorForeground` - the text color used on top of the accent color
- `borderRadius` - controls the roundness of UI elements. Options are 'none', 'small', 'medium', or 'large'
- `fontStack` - defines the fonts used. 'system' uses the default system fonts
- `overlayBlur` - the blur effect applied to the background when modals are open

!!! tip
Experiment with different theme functions (`lightTheme`, `darkTheme`, `midnightTheme`) and color combinations to find the best match for the visual style of the dApp.

## Handle Disconnections

To disconnect MetaMask from the dApp and reconnect for testing purposes, two methods can be used to complete this process.

### Disconnect from DApp {: #disconnect-from-dapp }

RainbowKit includes a **Disconnect** button out of the box. To open the modal, select the arrow next to the account number. Click the **Disconnect** button. At this point, the **Connect Wallet** option will reappear, and the account information will no longer be visible.

![Built in Disconnect button](/images/builders/toolkit/integrations/wallet-integrations/rainbowkit/rainbowkit-2.webp)

### Disconnect from MetaMask  {: #disconnect-from-metamask }

Some users prefer to disconnect from their wallet rather than use a button within a dApp. To use this method:

1. Select the MetaMask extension in the browser to open the modal
1. Select the three dots in the upper right corner of the MetaMask modal
1. Select **Connected sites**
1. Review the list of sites connected to the wallet
1. Select **Disconnect** for each site that should be disconnected

## Final Result {: #final-result }

The **Connect Wallet** button on the home page should now render in the color specified for `accentColor` during theme customization. After selecting **Connect Wallet**, the same accent color will be displayed in the modal. MetaMask can be chosen, and signing the transaction will authorize the connection. The Tanssi demo EVM network will appear as the connected network, along with the {{ networks.dancelight.demo_evm_token_symbol }} token balance, without the need for manual network switching.

![Theme customization on the user modal](/images/builders/toolkit/integrations/wallet-integrations/rainbowkit/rainbowkit-3.webp)

This guide includes only a few of the customization options available through RainbowKit. More information about the library's capabilities and options can be found in the [RainbowKit Docs](https://rainbowkit.com/docs/introduction){target=\\\_blank}.

The complete example code is available in the [rainbow-manual-build-demo repository](https://github.com/papermoonio/rainbowkit-manual-build-demo){target=\\\_blank}.

## --8\<-- 'text/\_disclaimers/third-party-content.md' ", "translated_content": "--- title: Como Adicionar RainbowKit a uma Rede EVM Tanssi description: Saiba como integrar RainbowKit com uma rede compatível com Ethereum implementada através do Tanssi, tornando a adição de uma ótima experiência de carteira ao seu dApp fácil. icon: material-wallet-outline categories: EVM-Template

# Integrar RainbowKit com uma Rede Tanssi

## Introdução

[RainbowKit](https://rainbowkit.com/docs/introduction){target=\\\_blank} é uma biblioteca React que adiciona capacidades de conexão de carteira a um dApp. Ela suporta várias carteiras e habilita recursos como troca de cadeias de conexão, resolução de endereços ENS e exibição de saldo pronta para uso. O RainbowKit oferece opções de personalização para todas as cadeias compatíveis com EVM, tornando possível conectar carteiras a uma rede facilmente.

O RainbowKit reúne várias ferramentas para simplificar a adição de conexões de carteira a um dApp:

- [Wagmi](https://wagmi.sh/){target=\\\_blank} - uma biblioteca de React Hooks para interagir com contas Ethereum, carteiras, contratos, transações, assinatura, ENS e muito mais
- [viem](https://viem.sh/){target=\\\_blank} - Interface TypeScript que fornece primitivas de baixo nível sem estado para interagir com Ethereum
- [WalletConnect](https://walletconnect.com/){target=\\\_blank} - adiciona conexões criptografadas e experiências de UX aprimoradas, como conectar uma carteira móvel digitalizando um código QR
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview){target=\\\_blank} - ajuda a gerenciar e atualizar o estado do servidor dentro do aplicativo

Este guia explica como adicionar RainbowKit a um dApp em execução em uma rede alimentada por Tanssi usando a CLI, juntamente com opções para personalizar ainda mais a integração.

## Início Rápido {: #quick-start }

Para iniciar um novo projeto, o RainbowKit pode criar um projeto usando a CLI, combinando RainbowKit e Wagmi em um aplicativo [Next.js](https://nextjs.org/docs){target=\\\_blank}. Use seu gerenciador de pacotes preferido para executar o comando CLI e iniciar o projeto:

=== "npm"

````
```bash

npm init @rainbow-me/rainbowkit@latest 

```
````

=== "pnpm"

````
```bash

pnpm create @rainbow-me/rainbowkit@latest

```
````

=== "yarn"

````
```bash

yarn create @rainbow-me/rainbowkit

```
````

O script solicitará um nome de projeto, gerará um novo diretório com o código inicial do boilerplate e instalará todas as dependências necessárias.

--8\<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/cli-quickstart.md'

Navegue até o diretório do projeto, inicie o servidor de desenvolvimento e abra `http://localhost:3000` para visualizar o projeto localmente:

=== "npm"

````
```bash

cd INSERT_PROJECT_NAME
npm run dev 

```
````

=== "pnpm"

````
```bash

cd INSERT_PROJECT_NAME
pnpm run dev

```
````

=== "yarn"

````
```bash

cd INSERT_PROJECT_NAME
yarn dev

```
````

A tela inicial deve ter esta aparência:

![Página de destino do projeto RainbowKit com scaffolding](/images/builders/toolkit/integrations/wallet-integrations/rainbowkit/rainbowkit-1.webp)

Abra o projeto em um editor de código e examine a estrutura de diretórios e arquivos, prestando atenção especial ao arquivo `wagmi.ts`. Este arquivo permite a configuração das cadeias incluídas na lista de redes às quais os usuários podem se conectar por meio do dApp.

Como a [rede demo EVM](https://apps.tanssi.network/demo/){target=\\\_blank} é uma rede personalizada no Tanssi, ela não pode ser importada diretamente de `wagmi/chains`. Em vez disso, defina a cadeia manualmente no arquivo `wagmi.ts`. Por exemplo, se a rede usa a rede demo Tanssi ou outra cadeia compatível com EVM, as configurações necessárias devem ser adicionadas manualmente.

Aqui está a configuração da rede demo EVM no Tanssi:

=== "Rede Demo EVM"
\`\`\`js title="src/wagmi.ts"

````
--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/wagmi.ts'

```

````

Para adicionar suporte à rede demo EVM no Tanssi, atualize `wagmi.ts` conforme mostrado acima. A seção a seguir explica como gerar o valor `projectId` para WalletConnect.

## Configuração Manual

As seções a seguir o guiarão pelas etapas para integrar o RainbowKit em um aplicativo React existente, como instalar e importar as dependências necessárias, configurar conexões de cadeia e disponibilizar a funcionalidade do RainbowKit aos usuários no dApp. A configuração também incluirá etapas para especificar a qual cadeia o botão **Conectar Carteira** deve se conectar por padrão e como personalizar o tema do RainbowKit para se adequar ao projeto. Este guia é baseado na [rede demo EVM](https://apps.tanssi.network/demo){target=\\\_blank} da Tanssi, mas pode ser adaptado à sua própria rede EVM alimentada por Tanssi, alterando o parâmetro RPC URL.

### Verificando os Pré-requisitos {: #checking-prerequisites }

Antes de prosseguir, certifique-se de que os seguintes pré-requisitos sejam atendidos:

- Uma rede compatível com EVM Tanssi

- Um dApp existente construído com [React](https://react.dev/){target=\\\_blank}

- O [repositório de exemplos do RainbowKit](https://github.com/rainbow-me/rainbowkit/tree/main/examples){target=\\\_blank} inclui modelos para várias estruturas React

- Para seguir este guia, visite [Next.js](https://nextjs.org/docs){target=\\\_blank} e siga as instruções de **Instalação Automática**, selecionando as opções Typescript e App Router durante a configuração

- A carteira deve suportar redes personalizadas, pois a rede demo EVM Tanssi será adicionada manualmente

- Um `projectId` do WalletConnect - cada dApp que depende do WalletConnect precisa ter um `projectId` associado. É grátis criar uma conta, e um ID pode ser gerado instantaneamente

  Para obter um `projectId` do WalletConnect:

  1. Visite [WalletConnect Cloud](https://cloud.walletconnect.com/){target=\\\_blank}
  1. Na página **Projetos**, selecione **Criar**
  1. Adicione as informações do projeto (deixando a **URL da página inicial** em branco se o dApp não estiver implementado)
  1. Selecione o SDK **AppKit**
  1. Selecione um ambiente ou plataforma de codificação (React é usado neste guia)
  1. Localize o `projectId` no menu esquerdo. ou encontre-o no trecho de código **Começar** do Quickstart do WalletConnect

### Começando {: #getting-started }

Certifique-se de que o projeto esteja no diretório raiz antes de prosseguir e, em seguida, instale o RainbowKit e suas dependências de pares:

=== "npm"

````

```bash

npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query

```

````

=== "pnpm"

````

```bash

pnpm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query

```

````

=== "yarn"

````

```bash

yarn add @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query

```

````

Esses pacotes fornecem a funcionalidade principal para conexões de carteira (RainbowKit), interações Ethereum (wagmi e viem) e gerenciamento de estado (TanStack Query).

Em seguida, inicie o servidor de desenvolvimento para criar uma instância local do dApp:

=== "npm"

````

```bash

npm run dev

```

````

=== "pnpm"

````

```bash

pnpm run dev

```

````

=== "yarn"

````

```bash

yarn dev

```

````

Após iniciar o servidor, abra `http://localhost:3000` para visualizar o aplicativo Next.js no navegador.

Para testar a conexão RainbowKit, o aplicativo MetaMask pode ser usado. Certifique-se de que a rede demo EVM Tanssi esteja conectada na carteira MetaMask.

Para adicionar a rede demo EVM Tanssi ao MetaMask:

1. Abra o MetaMask e vá para Configurações > Redes > Adicionar Rede.
1. Insira as seguintes informações:
   - Nome da Rede: `Demo EVM Chain`
   - URL RPC: `{{ networks.dancelight.demo_evm_rpc_url }}`
   - ID da Cadeia: `{{ networks.dancelight.demo_evm_chain_id }}`
   - Símbolo da Moeda: `{{ networks.dancelight.demo_evm_token_symbol }}`
   - URL do Explorador de Blocos: `{{ networks.dancelight.demo_evm_blockscout_url }}`

Para obter instruções detalhadas sobre como conectar o MetaMask à rede demo EVM Tanssi, consulte o guia [Conecte o MetaMask à sua Rede EVM Tanssi](https://docs.tanssi.network/builders/toolkit/ethereum-api/wallets/metamask/#connect-metamask-to-evm-network){target=\\\_blank}.

Após a conexão, `o projectId` pode ser adicionado com segurança ao aplicativo:

1. Crie um arquivo `.env.local` no diretório raiz do projeto

   ```bash

   touch .env.local

   ```

1. Adicione o `projectId` a este arquivo

   ```text title=\".env.local\"

   NEXT_PUBLIC_PROJECT_ID='INSERT_PROJECT_ID'

   ```

1. Localize o arquivo `.gitignore` neste mesmo diretório e certifique-se de que `.env*.local` esteja incluído na lista de arquivos a serem ignorados. Isso impedirá a confirmação do `projectId` no GitHub

O `projectId` armazenado será necessário para configurar as configurações `wagmi` na próxima seção.

### Conectar DApp ao MetaMask

Com o ambiente de desenvolvimento configurado e o MetaMask configurado para a rede demo EVM Tanssi, a próxima etapa é configurar o dApp para se conectar à carteira do MetaMask usando o RainbowKit. Este processo envolve as seguintes etapas principais:

1. Importe RainbowKit, Wagmi e TanStack Query
1. Configuração de configuração para Wagmi
1. Envolva o aplicativo com provedores
1. Adicione o botão conectar

### Importar RainbowKit, Wagmi e TanStack Query

Para prosseguir, certifique-se de que o projeto esteja no diretório raiz e, em seguida, crie um novo arquivo chamado `wagmi.ts`. Este arquivo conterá as importações e configurações necessárias para conectar o dApp a carteiras e interagir com blockchains.

```bash

touch wagmi.ts

```

Em `wagmi.ts`, importe as bibliotecas necessárias e defina a Cadeia Demo EVM como a cadeia suportada:

```ts title=\"wagmi.ts\"

--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/wagmi2.ts'

```

### Envolver o aplicativo com provedores

Em seguida, crie um arquivo chamado `providers.tsx` para envolver o aplicativo com os provedores necessários: `WagmiProvider` e `QueryClientProvider`.

```bash

cd app &&
touch providers.tsx

```

Abra `providers.tsx` e adicione o seguinte código para gerenciar os provedores

```ts title=\"providers.tsx\"

--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/providers1.tsx'

```

Agora, localize o arquivo `layout.tsx` dentro do diretório `app` e modifique o código para importar `Providers` e envolver o aplicativo:

```ts title=\"layout.tsx\"

--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/layout.tsx'

```

Isso garante que o aplicativo seja envolvido com todos os provedores necessários, incluindo wagmi, e TanStack Query para gerenciamento de estado.

### Adicionar o botão Conectar

O RainbowKit oferece um componente `ConnectButton`, que renderiza os botões **Conectar** e **Desconectar** e elementos da interface do usuário para alternar cadeias. Este exemplo importa o `ConnectButton` para o arquivo `page.tsx` existente para simplificar, embora também possa ser adicionado a um elemento como um **Header** ou **Navbar** para aparecer no topo de cada página. Atualize o código em `page.tsx` da seguinte forma:

```ts title=\"page.tsx\"

--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/pages.tsx'

```

Assim que o servidor de desenvolvimento estiver em execução, a página inicial exibirá um botão **Conectar Carteira**. Clicar neste botão abrirá o modal RainbowKit, fornecendo opções para conectar uma carteira existente ou obter uma nova. Selecione **MetaMask** e siga as instruções na tela para concluir o processo de conexão.

A configuração atual é padronizada para se conectar à Demo EVM Chain e exibe a rede atual, o saldo do token nativo e o endereço da carteira conectada. Se várias redes forem suportadas, selecionar a seta ao lado abrirá o modal Switch Networks. Isso permite que os usuários selecionem outra rede e autorizem a alteração.

Assim que conectado, os usuários verão seu saldo do token {{ networks.dancelight.demo_evm_token_symbol }} e o endereço da carteira.

## Personalizar o RainbowKit

O RainbowKit simplifica as complexidades de gerenciar conexões de carteira, ao mesmo tempo que oferece várias opções para personalizar a interface do usuário e a funcionalidade para atender às necessidades de um dApp. Uma lista completa de opções de personalização pode ser encontrada na [documentação](https://rainbowkit.com/docs/introduction){target=\\\_blank} do RainbowKit. Esta seção aborda a personalização do botão **Conectar Carteira** para se conectar inicialmente à Demo EVM Chain e renderizá-lo em uma cor personalizada.

### Definir Cadeia Inicial Personalizada

Por padrão, o RainbowKit se conecta à primeira cadeia fornecida ao Wagmi na configuração. A ordem das cadeias listadas em `wagmi.ts` corresponderá à ordem exibida no modal **Alternar Redes**. Para garantir que a rede demo EVM Tanssi seja sempre a conexão padrão, basta movê-la para o topo da lista de cadeias. No entanto, confiar apenas nesse comportamento padrão pode não ser a melhor opção.

Uma abordagem melhor é usar a propriedade `initialChain` no componente `RainbowKitProvider`. Esta propriedade define a qual cadeia a carteira se conectará inicialmente quando **Conectar Carteira** for selecionado. Para configurar isso, abra o arquivo `providers.tsx` e atualize o código passando a propriedade `initialChain` com o objeto de rede demo EVM Tanssi personalizada definido anteriormente:

```Ts title=\"providers.tsx\"

--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/providers.tsx'

```

Ao definir `initialChain={demoEVMChain}`, o RainbowKit tentará se conectar à rede demo EVM Tanssi primeiro sempre que o botão **Conectar Carteira** for clicado.

### Definir Cores de Tema Personalizadas

O RainbowKit fornece três funções de tema integradas: `lightTheme`, `darkTheme` e `midnightTheme`. Essas funções retornam um objeto de tema que pode ser passado para a propriedade `theme` do `RainbowKitProvider` para personalizar cores, raio da borda, pilha de fontes e desfoque da sobreposição. Atualize `providers.tsx` com o código a seguir e certifique-se de que `darkTheme` seja adicionado à instrução de importação `@rainbow-me/rainbowkit` para que as alterações sejam aplicadas corretamente. Depois de personalizar a cadeia inicial e o tema, o arquivo `providers.tsx` terá esta aparência:

```js title=\"providers.tsx\"

--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/providers2.tsx'

```

Esta configuração define um tema escuro com propriedades personalizadas:

- `accentColor` - a cor de destaque primária. Neste exemplo, a cor de destaque do Tanssi (#189B9B) é usada, mas pode ser ajustada para corresponder à marca do dApp
- `accentColorForeground` - a cor do texto usada em cima da cor de destaque
- `borderRadius` - controla o arredondamento dos elementos da interface do usuário. As opções são 'nenhuma', 'pequena', 'média' ou 'grande'
- `fontStack` - define as fontes usadas. 'system' usa as fontes padrão do sistema
- `overlayBlur` - o efeito de desfoque aplicado ao fundo quando os modais estão abertos

!!! dica
Experimente diferentes funções de tema (`lightTheme`, `darkTheme`, `midnightTheme`) e combinações de cores para encontrar a melhor combinação para o estilo visual do dApp.

## Lidar com Desconexões

Para desconectar o MetaMask do dApp e reconectar para fins de teste, dois métodos podem ser usados para concluir este processo.

### Desconectar do DApp {: #disconnect-from-dapp }

O RainbowKit inclui um botão **Desconectar** pronto para uso. Para abrir o modal, selecione a seta ao lado do número da conta. Clique no botão **Desconectar**. Neste ponto, a opção **Conectar Carteira** reaparecerá e as informações da conta não serão mais visíveis.

![Botão Desconectar integrado](/images/builders/toolkit/integrations/wallet-integrations/rainbowkit/rainbowkit-2.webp)

### Desconectar do MetaMask {: #disconnect
