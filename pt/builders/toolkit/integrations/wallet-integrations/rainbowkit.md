---
title: Como adicionar RainbowKit a uma rede EVM do Tanssi
description: Saiba como integrar o RainbowKit a uma rede compatível com Ethereum implantada via Tanssi, facilitando a adição de uma ótima experiência de carteira ao seu dApp.
icon: material-wallet-outline
categories: EVM-Template
---

# Integrar RainbowKit a uma rede Tanssi

## Introdução

[RainbowKit](https://rainbowkit.com/docs/introduction){target=_blank} é uma biblioteca React que adiciona conexão de carteiras a um dApp. Ela suporta várias carteiras e oferece recursos como alternar cadeias, resolver endereços ENS e exibir saldo. O RainbowKit traz opções de customização para cadeias compatíveis com EVM, facilitando conectar carteiras a redes personalizadas.

O RainbowKit agrupa várias ferramentas para simplificar a conexão de carteiras em um dApp:

- [Wagmi](https://wagmi.sh/){target=_blank} — hooks React para contas, carteiras, contratos, transações, assinatura, ENS e mais
- [viem](https://viem.sh/){target=_blank} — interface TypeScript com primitivas de baixo nível para interagir com Ethereum
- [WalletConnect](https://walletconnect.com/){target=_blank} — adiciona conexões criptografadas e UX aprimorada (ex.: conectar carteira móvel via QR)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview){target=_blank} — ajuda a gerenciar e atualizar estado de servidor no app

Usando essas peças juntas, você evita reimplementar fluxo de conexão, persistência de sessão, atualização de saldo e troca de redes, acelerando a entrega do dApp.

Este guia explica como adicionar o RainbowKit a um dApp em uma rede com tecnologia Tanssi usando a CLI, além de opções para personalizar a integração.

## Início rápido {: #quick-start }

Para começar um projeto novo, o RainbowKit pode gerar um esqueleto via CLI com RainbowKit e Wagmi em uma aplicação [Next.js](https://nextjs.org/docs){target=_blank}. Use o gerenciador de pacotes de sua preferência:

=== "npm"

    ```bash
    npm init @rainbow-me/rainbowkit@latest
    ```

=== "pnpm"

    ```bash
    pnpm create @rainbow-me/rainbowkit@latest
    ```

=== "yarn"

    ```bash
    yarn create @rainbow-me/rainbowkit
    ```

O script pedirá o nome do projeto, criará o diretório com o boilerplate e instalará as dependências.

--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/cli-quickstart.md'

Em seguida, inicie o servidor de desenvolvimento e abra `http://localhost:3000`:

=== "npm"

    ```bash
    cd INSERT_PROJECT_NAME
    npm run dev
    ```

=== "pnpm"

    ```bash
    cd INSERT_PROJECT_NAME
    pnpm run dev
    ```

=== "yarn"

    ```bash
    cd INSERT_PROJECT_NAME
    yarn dev
    ```

Você verá a tela inicial:

![Página inicial do projeto RainbowKit gerado](/images/builders/toolkit/integrations/wallet-integrations/rainbowkit/rainbowkit-1.webp)

Abra o projeto no editor e veja o arquivo `wagmi.ts`. É nele que você configura as cadeias disponíveis para conexão.

Como a [rede EVM demo](https://apps.tanssi.network/demo/){target=_blank} é uma rede personalizada do Tanssi, ela não pode ser importada direto de `wagmi/chains`. Defina a cadeia manualmente em `wagmi.ts`.

Configuração para a rede EVM demo do Tanssi:

=== "Demo EVM Network"
    ```js title="src/wagmi.ts"
    --8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/wagmi.ts'
    ```

Atualize `wagmi.ts` conforme acima para suportar a rede demo. A próxima seção mostra como obter o `projectId` do WalletConnect.

## Configuração manual

As seções seguintes mostram como integrar o RainbowKit em um app React existente: instalar dependências, configurar cadeias, disponibilizar o RainbowKit no dApp, definir a cadeia padrão do **Connect Wallet** e personalizar o tema. O exemplo usa a rede EVM demo do Tanssi, mas pode ser adaptado mudando o RPC.

### Verificando pré-requisitos {: #checking-prerequisites }

- Uma rede compatível com EVM no Tanssi
- Um dApp existente em [React](https://react.dev/){target=_blank}
- Exemplos do [repositório RainbowKit](https://github.com/rainbow-me/rainbowkit/tree/main/examples){target=_blank} (há templates para vários frameworks)
- Para seguir este guia, crie um projeto Next.js (Typescript + App Router) seguindo a instalação automática em [Next.js](https://nextjs.org/docs){target=_blank}
- A carteira deve suportar redes personalizadas (a rede demo será adicionada manualmente)
- Um `projectId` do WalletConnect (gratuito):
    1. Vá em [WalletConnect Cloud](https://cloud.walletconnect.com/){target=_blank}
    2. Em **Projects**, clique **Create**
    3. Preencha as informações (pode deixar **Homepage URL** em branco se não estiver deployado)
    4. Escolha o SDK **AppKit**
    5. Escolha o ambiente (React neste guia)
    6. Copie o `projectId` no menu lateral ou no snippet do Quickstart

### Começando {: #getting-started }

Instale RainbowKit e dependências:

=== "npm"

    ```bash
    npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
    ```

=== "pnpm"

    ```bash
    pnpm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
    ```

=== "yarn"

    ```bash
    yarn add @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
    ```

Suba o servidor de desenvolvimento:

=== "npm"

    ```bash
    npm run dev
    ```

=== "pnpm"

    ```bash
    pnpm run dev
    ```

=== "yarn"

    ```bash
    yarn dev
    ```

Abra `http://localhost:3000`.

Para testar, conecte a carteira MetaMask na rede EVM demo do Tanssi. Adicione a rede no MetaMask:

1. Configurações > Redes > Adicionar Rede
2. Preencha:
   - Nome: `Demo EVM Chain`
   - RPC URL: `{{ networks.dancelight.demo_evm_rpc_url }}`
   - Chain ID: `{{ networks.dancelight.demo_evm_chain_id }}`
   - Símbolo: `{{ networks.dancelight.demo_evm_token_symbol }}`
   - Block Explorer: `{{ networks.dancelight.demo_evm_blockscout_url }}`

Para instruções detalhadas, veja [Conecte o MetaMask à sua Rede EVM Tanssi](https://docs.tanssi.network/builders/toolkit/ethereum-api/wallets/metamask/#connect-metamask-to-evm-network){target=_blank}.

Depois, adicione o `projectId` ao app:

1. Crie `.env.local` na raiz:

    ```bash
    touch .env.local
    ```

2. Adicione o ID:

    ```text title=".env.local"
    NEXT_PUBLIC_PROJECT_ID='INSERT_PROJECT_ID'
    ```

3. Confirme que `.env*.local` está no `.gitignore` para evitar commit.

Se você usa vários ambientes (dev/homologação/prod), crie um `projectId` separado para cada um e valide se o domínio cadastrado no WalletConnect Cloud corresponde ao ambiente correto.

### Conectar o dApp ao MetaMask

Passos principais:

1. Importar RainbowKit, Wagmi e TanStack Query
2. Configurar o Wagmi
3. Envolver o app com providers
4. Adicionar o botão de conexão

Seguir essa ordem garante que o estado de conexão e os modais do RainbowKit funcionem em toda a aplicação.

### Importar RainbowKit, Wagmi e TanStack Query

Crie `wagmi.ts` na raiz com imports e a cadeia demo EVM:

```bash
touch wagmi.ts
```

```ts title="wagmi.ts"
--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/wagmi2.ts'
```

### Envolver o aplicativo com providers

Crie `providers.tsx` para incluir `WagmiProvider` e `QueryClientProvider`:

```bash
cd app && touch providers.tsx
```

```ts title="providers.tsx"
--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/providers1.tsx'
```

Depois, edite `app/layout.tsx` para usar `Providers`:

```ts title="layout.tsx"
--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/layout.tsx'
```

### Adicionar o botão Connect

Use o componente `ConnectButton` (pode ficar em `page.tsx` ou em um header/nav):

```ts title="page.tsx"
--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/pages.tsx'
```

Com o servidor rodando, aparecerá **Connect Wallet**; clicar abre o modal RainbowKit. Selecione MetaMask e conecte. A configuração padrão usa a Demo EVM Chain e mostra rede, saldo do token nativo e endereço.

Se você tiver vários botões ou páginas, considere criar um componente compartilhado para evitar duplicar lógica de conexão e estilização.

## Personalizar o RainbowKit

O RainbowKit facilita a conexão e permite customizar UI/UX. Veja todas as opções na [docs do RainbowKit](https://rainbowkit.com/docs/introduction){target=_blank}. Aqui vamos definir a cadeia inicial e aplicar tema customizado.

### Definir cadeia inicial

O RainbowKit conecta na primeira cadeia da lista do Wagmi. Melhor é usar `initialChain` no `RainbowKitProvider`. Em `providers.tsx`, defina:

```ts title="providers.tsx"
--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/providers.tsx'
```

Isso força conectar primeiro na Demo EVM Chain.

### Definir cores de tema

Use `lightTheme`, `darkTheme` ou `midnightTheme`. Exemplo com tema escuro customizado (adicione `darkTheme` ao import):

```js title="providers.tsx"
--8<-- 'code/builders/toolkit/wallet-integrations/rainbowkit/providers2.tsx'
```

Campos:
- `accentColor` — cor primária (ex.: #189B9B do Tanssi)
- `accentColorForeground` — cor do texto sobre a primária
- `borderRadius` — arredondamento
- `fontStack` — fontes (ex.: `system`)
- `overlayBlur` — desfoque de fundo em modais

Você pode ainda ajustar ícones, textos do modal e posição do botão criando um tema customizado ou sobrescrevendo componentes via props do `ConnectButton`.

!!! conselho
    Teste temas e cores para combinar com o estilo do seu dApp.

## Lidar com desconexões

### Desconectar no dApp {: #disconnect-from-dapp }

O modal RainbowKit inclui **Disconnect**; clique na seta ao lado da conta e depois **Disconnect**.

![Botão Desconectar integrado](/images/builders/toolkit/integrations/wallet-integrations/rainbowkit/rainbowkit-2.webp)

### Desconectar no MetaMask {: #disconnect-from-metamask }

1. Abra a extensão MetaMask  
2. Clique nos três pontos (canto superior direito)  
3. Selecione **Connected sites**  
4. Revise e clique **Disconnect** nos sites desejados

## Resultado final {: #final-result }

O botão **Connect Wallet** deve usar a cor definida em `accentColor`; o modal também. Escolha MetaMask, assine e veja a rede EVM demo conectada com o saldo de {{ networks.dancelight.demo_evm_token_symbol }} sem precisar trocar manualmente.

Se desejar suportar redes adicionais, basta adicioná-las em `wagmi.ts` e fornecer RPCs confiáveis; o modal exibirá as opções no Switch Networks respeitando a ordem definida. Verifique também se os explorers configurados respondem corretamente para evitar erros de UX.

![Customização de tema no modal](/images/builders/toolkit/integrations/wallet-integrations/rainbowkit/rainbowkit-3.webp)

Mais opções estão na [docs do RainbowKit](https://rainbowkit.com/docs/introduction){target=_blank}. Código completo no repositório [rainbowkit-manual-build-demo](https://github.com/papermoonio/rainbowkit-manual-build-demo){target=_blank}.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
