---
title: Add RainbowKit to a Tanssi demo appchain 
description: Learn how to integrate RainbowKit into your appchain created with Tanssi. In this example, we will use the Tanssi demo appchain to guide you through the process.
---

# Integrate RainbowKit into a Tanssi demo appchain 

## Introduction 

[RainbowKit](https://www.rainbowkit.com/docs/introduction){target=\_blank} RainbowKit is a React library that adds wallet connection capabilities to a dApp. It supports numerous wallets and enables features such as switching connection chains, ENS address resolution, and balance display out-of-the-box. RainbowKit offers customization options for all EVM-compatible chains, making it possible to easily connect wallets to your appchain.


RainbowKit bundles together mulitple tools to simplify adding wallet connection to your dApp: 

- [Wagmi](https://wagmi.sh/){target=\_blank} - a React Hooks library for interacting with Ethereum accounts, wallets, contracts, transactions, signing, ENS, and more
- [viem](https://viem.sh/){target=\_blank} - TypeScript interface which provides low-level stateless primitives for interacting with Ethereum
- [WalletConnect](https://walletconnect.com/){target=\_blank} - adds encrypted connections and enhanced UX experiences like connecting a mobile wallet by scanning a QR code
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview){target=\_blank} - helps manage and update server state within the application

This guide takes you through the process of adding RainbowKit to a dApp using the CLI, supporting Tanssi appchains,and some options for further customizing your integration. 

## Quick Start {: #quick-start }

If you are starting a new project, RainbowKit can scaffold a project from the CLI, combining RainbowKit and Wagmi in a [Next.js](https://nextjs.org/docs){target=\_blank} application. Use your package manager of choice to run the CLI command and start your project:

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

The script will prompt you for a project name, generate a new directory with the boilerplate starter code, and install all required dependencies. 

--8<-- 'code/builders/toolkit/integrations/wallets/rainbowkit/cli-quickstart.md'

You can now navigate to the project directory, start the development server, and navigate to [http://localhost:3000](http://localhost:3000){target=\_blank} to view your project locally:

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

Your starting screen should look like this:

![Scaffolded RainbowKit project landing page](/images/builders/toolkit/integrations/wallets/rainbowkit/rainbowkit-1.webp)

Open the project in your code editor and take a look at the directory and file structure, paying particular attention to the `wagmi.ts` file. This file is where you can configure which chains are included in the list of networks that users can connect to through your dApp.

Since Dancebox is a custom appchain on Tanssi, it cannot be imported directly from `wagmi/chains`. Instead, you need to manually define the chain in the `wagmi.ts` file. For example, if your appchain uses the Tanssi demo appchain (Dancebox) or another EVM-compatible chain, you can add the necessary configurations manually.

Here is the configuration for the Dancebox demo appchain on Tanssi:

=== "Dancebox Demo Appchain"
```js title="src/wagmi.ts"
--8<-- 'code/builders/toolkit/wallets/rainbowkit/wagmi.ts'
```
To add support for the Dancebox appchain on Tanssi, update `wagmi.ts` as shown above. You will learn how to generate the `projectId` value for WalletConnect in the next section.

## Manual Setup 

If you want to add RainbowKit to an existing React application, you can complete a manual setup. The following sections will guide you through using the manual setup to install and import needed dependencies, configure chain connections to support the Dancebox appchain on Tanssi, and make RainbowKit functionality available to users of your dApp. You will also learn how to specify which chain the **Connect Wallet** button should connect to by default and how to customize the RainbowKit theme to fit your project.

### Checking Prerequisites {: #checking-prerequisites }

The following guide assumes you have:

- An existing dApp built with [React](https://react.dev/){target=\_blank} and you want to use the manual setup to connect to a wallet via RainbowKit

- The [RainbowKit examples repository](https://github.com/rainbow-me/rainbowkit/tree/main/examples){target=\_blank} includes templates for multiple React frameworks
    
 - To follow this guide, visit [Next.js](https://nextjs.org/docs){target=\_blank} and follow the **Automatic Installation** instructions, selecting Typescript and the App Router options during setup 

- A wallet that supports custom networks, as we will be adding the Tanssi Dancebox appchain manually

- A WalletConnect `projectId` - every dApp relying on WalletConnect is required to have an associated `projectId`. It is free to create an account, and you can instantly generate an ID

    To obtain a WalletConnect `projectId`:

    1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/){target=\_blank}
    2. On the **Projects** page, select **Create** 
    3. Add your project information (you can leave **Homepage URL** blank if you have not deployed your dApp)
    4. Select the **AppKit** SDK
    5. Select your coding environment or platform (select React for this guide)
    6. Locate your `projectId` in the left menu. You can also find it in the **Get started** code snippet of the WalletConnect Quickstart
 
### Getting Started {: #getting-started }

Ensure you are in the root directory for your project, then install RainbowKit and its peer dependencies:

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
These packages provide the core functionality for wallet connections (RainbowKit), Ethereum interactions (wagmi and viem), and state management (TanStack Query).

Next, start the development server to create a local dApp instance:

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

If you navigate to [http://localhost:3000](http://localhost:3000){target=\_blank},  you should see the starter Next.js application in your browser.

To test the RainbowKit connection, you will use the MetaMask app. Make sure you have established a connection to the Dancebox appchain in your MetaMask wallet.

To add the Dancebox appchain to MetaMask:

1. Open MetaMask and go to Settings > Networks > Add Network.
2. Input the following information:
   - Network Name: Dancebox
   - RPC URL: `https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network`
   - Chain ID: 5678
   - Currency Symbol: TANGO
   - Block Explorer URL: `https://fra-dancebox-3001-bs.a.dancebox.tanssi.network/`

For detailed instructions on connecting MetaMask to the Dancebox appchain, refer to the [Tanssi Documentation](https://docs.tanssi.network/builders/toolkit/ethereum-api/wallets/metamask/#connect-metamask-to-evm-appchain){target=\_blank}.

Once connected, you can safely add your `projectId` to your application:

1. Create a `.env.local` file in the root directory of your project

    ```bash
    touch .env.local
    ```

2. Add your `projectId` to this file

    ```text title=".env.local"
    NEXT_PUBLIC_PROJECT_ID='INSERT_PROJECT_ID'
    ```

3. Locate your `.gitignore` file in this same directory and ensure `.env*.local` is included in the list of files to ignore. This will prevent committing your `projectId` to GitHub

In the next section, you will use this stored `projectId` when setting up the `wagmi` config.

### Connect DApp to MetaMask 

Now that we have our development environment set up and MetaMask configured for the Dancebox appchain, we'll configure our dApp to connect with MetaMask's wallet using RainbowKit. This process involves several key steps:

1. Import RainbowKit, Wagmi, and TanStack Query
2. Setup configuration for Wagmi
3. Wrap your application with providers
4. Add the connect button

### Import RainbowKit, Wagmi, and TanStack Query

Ensure you are in your project's root directory, then create a new file called `wagmi.ts`. This file will contain the imports and configuration needed to connect your dApp to wallets and interact with blockchains.

```bash
touch wagmi.ts
```
In `wagmi.ts`, import the necessary libraries and define Dancebox as the supported chain:

```ts title="wagmi.ts"
--8<-- 'code/builders/toolkit/wallets/rainbowkit/wagmi2.ts'
```

### Wrap Your Application with Providers

Next, create a file named `providers.tsx` to wrap your application with the necessary providers: `WagmiProvider`, and `QueryClientProvider`.

```bash
cd app &&
touch providers.tsx
```

Open `providers.tsx` add the following code to manage the providers

```ts title="providers.tsx"
--8<-- 'code/builders/toolkit/wallets/rainbowkit/providers0.tsx'
```

Now locate the `layout.tsx` file inside the `app` directory and modify the code to import `Providers` and wrap the application:

```ts title="layout.tsx"
--8<-- 'code/builders/toolkit/wallets/rainbowkit/layout.tsx'
```
This ensures that your app is wrapped with all necessary providers, including wagmi, and TanStack Query for state management.

### Add the Connect Button

RainbowKit offers a `ConnectButton` component, which renders the **Connect** and **Disconnect** buttons and UI elements for switching chains. This example imports the `ConnectButton` into the existing `page.tsx` file for simplicity, but you may want to add it to an element like a **Header** or **Navbar** so it appears at the top of each page. Update the code in `page.tsx` as follows:

```ts title="page.tsx"
--8<-- 'code/builders/toolkit/wallets/rainbowkit/pages.tsx'
```

If you haven't already, start the development server and spin up a local version of your dApp. Your home page should now include a visible **Connect Wallet** button. Click the button to test the connection. You should now see the RainbowKit modal with options to get or connect a wallet. Select **MetaMask** and follow the prompts to connect your wallet.

The current configuration defaults to connecting to Dancebox and displays the current network, the native token balance, and the connected wallet address. If multiple networks are supported, you can select the arrow next to Dancebox to open the Switch Networks modal. Here, users can select a different network and authorize the switch.

Once connected, users will see their TANGO token balance and wallet address.

## Customize RainbowKit

Not only does RainbowKit abstract away the complexities of managing wallet connections, but the library offers several options for customizing UI and functionality to meet the needs of your dApp. You can find a complete list of customization options in the RainbowKit [documentation](https://www.rainbowkit.com/docs/introduction){target=\_blank}. This section covers customizing the **Connect Wallet** button to connect initially to Dancebox and render it in a custom color. 

### Set Custom Initial Chain

RainbowKit will connect by default to the first chain supplied to Wagmi in the config. If you compare the order of chains listed in `wagmi.ts` to those on the **Switch Networks** modal, you will see they are the same. If you wanted to always connect to the Dancebox appchain first, a simple fix would be to ensure it's at the top of the chain list. However, assuming this default behavior will never change is not the most reliable option.

Instead, you can use the `initialChain` prop that is part of the `RainbowKitProvider` element to define which chain the wallet should initially connect to when the user selects **Connect Wallet**. Open your `providers.tsx` file and update the code to configure the `initialChain` prop. For the custom Dancebox appchain, you'll pass the chain object you defined earlier:

```Ts title="providers.tsx"
--8<-- 'code/builders/toolkit/wallets/rainbowkit/providers.tsx'
```

By setting `initialChain={danceboxChain}`, you ensure that RainbowKit will attempt to connect to the Dancebox appchain first when a user clicks the Connect Wallet button.

### Define Custom Theme Colors

RainbowKit offers three built-in theme functions: `lightTheme`, `darkTheme`, and `midnightTheme`. These theme functions return a theme object, which you can pass into the `RainbowKitProvider` prop `theme` to set custom colors, border radius, font stack, and overlay blur. Update `providers.tsx` with the following code. Be sure to add `darkTheme` to the `@rainbow-me/rainbowkit`import statement to allow your changes to render correctly. After customizing the initial chain and theme, your `providers.tsx` file should look like the following:

RainbowKit offers three built-in theme functions: `lightTheme`, `darkTheme`, and `midnightTheme`. These theme functions return a theme object, which you can pass into the `RainbowKitProvider` prop `theme` to set custom colors, border radius, font stack, and overlay blur. 

```js title="providers.tsx"
--8<-- 'code/builders/toolkit/wallets/rainbowkit/providers2.tsx'
```
This configuration sets a dark theme with custom properties:

- `accentColor`: The main highlight color. We're using Tanssi's accent color (#189B9B), but you can change this to match your dApp's branding.
- `accentColorForeground`: The text color used on top of the accent color.
- `borderRadius`: Controls the roundness of UI elements. Options are 'none', 'small', 'medium', or 'large'.
- `fontStack`: Defines the fonts used. 'system' uses the default system fonts.
- `overlayBlur`: The blur effect applied to the background when modals are open.

!!! tip
Experiment with different theme functions (lightTheme, darkTheme, midnightTheme) and color combinations to find the best fit for your dApp's aesthetics.

## Handle Disconnections

You can now disconnect MetaMask from your dApp and then reconnect to test your customizations. There are two options for completing this step.  

### Disconnect from DApp {: #disconnect-from-dapp }

RainbowKit includes a **Disconnect** button out of the box. To open the modal, select the arrow next to your account number. Click the **Disconnect** button. You should now see **Connect Wallet**; your account information should no longer be visible. 

![Built in Disconnect button](/images/builders/toolkit/integrations/wallets/rainbowkit/rainbowkit-2.webp)

### Disconnect from MetaMask  {: #disconnect-from-metamask }

Some users prefer to disconnect from their wallet rather than use a button within a dApp. To use this method: 

1. Select the MetaMask extension in your browser to open the modal
2. Select the three dots in the upper right corner of the MetaMask modal
3. Select **Connected sites**
4. Review the list of sites connected to your wallet
5. Select **Disconnect** for each site you want to disconnect

## Final Result {: #final-result }

The **Connect Wallet** button on your home page should now render in the color you entered for `accentColor` when customizing the theme. When you click **Connect Wallet**, you will see the same accent color in use. Select MetaMask and sign the transaction to authorize the connection. You should now see the Dancebox appchain as the connected network and your TANGO token balance for the account balance without manually switching networks.


![Theme customization on the user modal](/images/builders/toolkit/integrations/wallets/rainbowkit/rainbowkit-3.webp)

This guide includes only a few of the customization options available through RainbowKit. You can learn more about the capabilities and options of this library by visiting [RainbowKit Docs](https://www.rainbowkit.com/docs/introduction){target=\_blank}.

You can view the complete example code in the [rainbow-manual-build-demo repository](https://github.com/papermoonio/rainbowkit-manual-build-demo){target=\_blank}

--8<-- 'text/_disclaimers/third-party-content.md'

