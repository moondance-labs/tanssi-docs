---
title: Native Token ERC-20 Precompile
description: Learn how to access and interact with an ERC-20 representation of the native token on Tanssi-powered EVM networks through the precompiled ERC-20 Interface.
keywords: solidity, ethereum, native, token, moonbeam, precompiled, contracts
icon: material-circle-outline
categories: EVM-Template
---

## { "source_path": "builders/toolkit/ethereum-api/precompiles/erc20.md", "source_language": "EN", "target_language": "PT", "checksum": "31e5c15fab803110940221739a6471f4729b80dad29950d5724eb0063a54a487", "content": "--- title:  Native Token ERC-20 Precompile description: Learn how to access and interact with an ERC-20 representation of the native token on Tanssi-powered EVM networks through the precompiled ERC-20 Interface. keywords: solidity, ethereum, native, token, moonbeam, precompiled, contracts icon: material-circle-outline categories: EVM-Template

# Native Token ERC-20 Precompile

```text

```

One of the main benefits of this precompile is that it removes the necessity of having a wrapped representation of the protocol token as an ERC-20 smart contract, such as WETH on Ethereum. Furthermore, it minimizes the need for multiple wrapped representations of the same protocol token. Consequently, dApps that need to interact with the protocol token via an ERC-20 interface can do so without needing a separate smart contract.

Under the hood, the [ERC-20 precompile](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\\\_blank} executes specific Substrate actions related to the Substrate balances module, which is coded in Rust. The balances module provides functionality for handling the various types of balances.

This guide will show you how to interact with UNIT tokens, the native protocol tokens for quick trial networks on [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\\_blank}, via the ERC-20 precompile. You can follow along and adapt this guide to interacting with your own network.

The precompile is located at the following address:

```text
````

```
````

{{networks.demo_evm.precompiles.erc20 }}
\`\`\`

--8\<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'

## The ERC-20 Solidity Interface {: #the-erc20-interface }

    ```solidity

    ```

````
```solidity

--8<-- 'code/builders/toolkit/ethereum-api/precompiles/erc20/erc20.sol'

```
````

!!! note
The ERC-20 precompile does not include `deposit` and `withdraw` functions and subsequent events expected from a wrapped token contract, such as WETH.

## Interact with the Solidity Interface {: #interact-with-the-solidity-interface }

### Checking Prerequisites {: #checking-prerequisites }

To follow along with this tutorial, you will need to have your wallet configured to work with your Tanssi-powered EVM network and an account funded with native tokens. You can add your EVM network to MetaMask with one click on the [Tanssi dApp](https://apps.tanssi.network){target=\\\_blank}. Or, you can [configure MetaMask for Tanssi with the demo EVM network](/builders/toolkit/ethereum-api/wallets/metamask/){target=\\\_blank}.

### Add Token to an EVM Wallet {: #add-token-to-evm-wallet }

If you want to interact with your network's native token like you would with an ERC-20, you can add a custom token to your EVM-compatible wallet using the precompile address. This section will walk you through adding an external asset to [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\\\_blank}.

To get started, open up MetaMask and make sure you are connected to your network and:

1. Switch to the **Assets** tab
1. Click on **Import tokens**

![Import Tokens from Assets Tab in MetaMask](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-1.webp)

Now, you can create a custom token:

1. Enter the precompile address for the token contract address - `{{networks.demo_evm.precompiles.erc20 }}`. When you enter the address, the **Token Symbol** and **Token Decimal** fields should automatically populate. If they do not, you can enter `UNIT` for the symbol and `18` for the decimal places. Recall that the default number of decimals for Tanssi EVM networks is `18`, the same as Ethereum's token decimals
1. Click **Next**

![Add Custom Token](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-2.webp)

MetaMask will prompt you to confirm the import. You can review the token details and click **Import Tokens** to import UNIT tokens into your wallet.

![Confirm and Import Tokens](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-3.webp)

And that's it! You've successfully added the UNIT token as a custom ERC-20 token on your Tanssi EVM network.

### Remix Set Up {: #remix-set-up }

You can interact with the ERC-20 precompile using [Remix](https://remix.ethereum.org){target=\\\_blank}. To add the precompile to Remix, you will need to:

1. Get a copy of [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\\\_blank}
1. Paste the file contents into a Remix file named `IERC20.sol`

### Compile the Contract {: #compile-the-contract }

Next, you will need to compile the interface in Remix:

1. Click on the **Compile** tab, second from top
1. Compile the interface by clicking on **Compile IERC20.sol**

![Compiling IERC20.sol](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-4.webp)

When compilation is completed, you will see a green checkmark next to the **Compile** tab.

### Access the Contract {: #access-the-contract }

Instead of deploying the ERC-20 precompile, you will access the interface given the address of the precompiled contract:

1. Click on the **Deploy and Run** tab directly below the **Compile** tab in Remix. Please note that the precompiled contracts are already accessible at their respective addresses. Therefore, there is no deployment step
1. Make sure **Injected Web3** is selected in the **ENVIRONMENT** dropdown. Once you select **Injected Web3**, you may be prompted by MetaMask to connect your account to Remix if it's not already connected
1. Make sure the correct account is displayed under **ACCOUNT**
1. Ensure **IERC20 - IERC20.sol** is selected in the **CONTRACT** dropdown. Given that it is a precompiled contract, there is no deployment step. Instead, you are going to provide the address of the precompile in the **At Address** field
1. Provide the address of the ERC-20 precompile: `{{networks.demo_evm.precompiles.erc20}}` and click **At Address**

![Access the address](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-5.webp)

The **IERC20** precompile will appear in the list of **Deployed Contracts**.

### Get Basic Token Information {: #get-basic-token-information }

The ERC-20 interface lets you quickly obtain token information, including the token's total supply, name, symbol, and decimal places. You can retrieve this information by following these steps:

1. Expand the **IERC20** contract under **Deployed Contracts**
1. Click **decimals** to get the decimal places of your network's native protocol token
1. Click **name** to get the name of the token
1. Click **symbol** to get the symbol of the token
1. Click **totalSupply** to obtain the total supply of native tokens on your network

![Total Supply](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-6.webp)

The results of each function call are displayed under the respective functions.

### Get Account Balance {: #get-account-balance }

You can check the balance of any address on your network by calling the `balanceOf` function and passing in an address:

1. Expand the **balanceOf** function
1. Enter an address you would like to check the balance of for the **owner**
1. Click **call**

![Get Balance of an Account](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-7.webp)

Your balance will be displayed under the `balanceOf` function.

### Approve a Spend {: #approve-a-spend }

To approve a token spend allowance, you'll need to provide an address for the spender and the number of tokens the spender is allowed to spend. The spender can be an externally owned account (EOA) or a smart contract. For this example, you can approve the spender with an allowance of 1 UNIT token. To get started, please follow these steps:

1. Expand the **approve** function
1. Enter the address of the spender. You should have created two accounts before starting, so you can use the second account as the spender
1. Enter the amount of tokens the spender can spend for the **value**. For this example, you can allow the spender to spend 1 UNIT token in Wei units (`1000000000000000000`)
1. Click **transact**
1. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-8.webp)

After the transaction is confirmed, you'll notice that the balance of your account has stayed the same. This is because you have only approved the allowance for the given amount, and the spender hasn't spent the funds. In the next section, you will use the `allowance` function to verify that the spender can spend 1 UNIT token on your behalf.

### Get Allowance of Spender {: #get-allowance-of-spender }

To check that the spender received the allowance approved in the [Approve a Spend](#approve-a-spend) section, you can:

1. Expand the **allowance** function
1. Enter your address for the **owner**
1. Enter the address of the **spender** that you used in the previous section
1. Click **call**

![Get Allowance of Spender](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-9.webp)

Once the call is complete, the allowance of the spender will be displayed, which should be equivalent to 1 UNIT token (`1000000000000000000`).

### Send Transfer {: #send-transfer }

To send tokens from your account directly to another account, you can call the `transfer` function by following these steps:

1. Expand the **transfer** function
1. Enter the address to send UNIT tokens to
1. Enter the amount of UNIT tokens to send. For this example, you can send 1 UNIT token (`1000000000000000000`)
1. Click **transact**
1. MetaMask will pop up, and you will be prompted to review the transaction details. Click **Confirm** to send the transaction

![Send Standard Transfer](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-10.webp)

Once the transaction is complete, you can [check your balance](#get-account-balance) using the `balanceOf` function or by looking at MetaMask. You'll notice that your balance has decreased by 1 UNIT token. You can also use the `balanceOf` function to ensure that the recipients balance has increased by 1 UNIT token as expected.

### Send Transfer From Specific Account {: #send-transferfrom }

So far, you have approved an allowance of 1 UNIT token for the spender and sent 1 UNIT token via the standard `transfer` function. The `transferFrom` function varies from the standard `transfer` function as it allows you to define the address to which you want to send the tokens. So you can specify an address with an allowance or your address as long as you have funds. For this example, you will use the spender's account to initiate a transfer of the allowed funds from the owner to the spender. The spender can send the funds to any account, but you can send the funds from the owner to the spender for this example.

First, you need to switch to the spender's account in MetaMask. Once you switch to the spender's account, you'll notice that the selected address in Remix under the **Accounts** tab is now the spender's.

![Switch accounts Remix](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-11.webp)

Next, you can initiate and send the transfer. To do so, take the following steps:

1. Expand the **transferFrom** function
1. Enter your address as the owner in the **from** field
1. Enter the recipient address, which should be the spender's address, in the **to** field
1. Enter the amount of UNIT tokens to send. Again, the spender is currently only allowed to send 1 UNIT token, so enter `1000000000000000000`
1. Click **transact**

![Send Standard Transfer](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-12.webp)

Once the transaction is complete, you can [check the balance](#get-account-balance) of the owner and spender using the `balanceOf` function. The spender's balance should have increased by 1 UNIT token, and their allowance should now be depleted. To verify that the spender no longer has an allowance, you can call the `allowance` function by passing in the owner and spender's addresses. You should receive a result of 0.

![Zero Allowance](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-13.webp)

And that's it! You've successfully interacted with the ERC-20 precompile using MetaMask and Remix!

## --8\<-- 'text/\_disclaimers/third-party-content.md' ", "translated_content": "--- title:  Precompilação de Token Nativo ERC-20 description: Saiba como acessar e interagir com uma representação ERC-20 do token nativo em redes EVM com tecnologia Tanssi através da Interface ERC-20 pré-compilada. keywords: solidity, ethereum, native, token, moonbeam, precompiled, contracts icon: material-circle-outline categories: EVM-Template

# Precompilação de Token Nativo ERC-20

## Introdução {: #introduction }

O contrato pré-compilado de token nativo ERC-20 em redes EVM com tecnologia Tanssi permite que os desenvolvedores interajam com o token nativo do protocolo por meio de uma interface ERC-20. Embora o token nativo da sua rede não seja um token ERC-20, agora você pode interagir com ele como se fosse um ERC-20 vanilla.

Um dos principais benefícios desta pré-compilação é que ela remove a necessidade de ter uma representação empacotada do token do protocolo como um contrato inteligente ERC-20, como o WETH no Ethereum. Além disso, minimiza a necessidade de múltiplas representações empacotadas do mesmo token do protocolo. Consequentemente, dApps que precisam interagir com o token do protocolo via uma interface ERC-20 podem fazê-lo sem precisar de um contrato inteligente separado.

Por trás dos panos, a [pré-compilação ERC-20](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\\\_blank} executa ações específicas do Substrate relacionadas ao módulo de saldos do Substrate, que é codificado em Rust. O módulo de saldos fornece funcionalidade para lidar com os vários tipos de saldos.

Este guia mostrará como interagir com tokens UNIT, os tokens nativos do protocolo para redes de teste rápido no [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\\_blank}, via a pré-compilação ERC-20. Você pode acompanhar e adaptar este guia para interagir com sua própria rede.

A pré-compilação está localizada no seguinte endereço:

```text
{{networks.demo_evm.precompiles.erc20 }}
```

--8\<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'

## A Interface Solidity ERC-20 {: #the-erc20-interface }

A interface [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\\\_blank} em redes Tanssi EVM segue o [EIP-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20){target=\\\_blank}, que é a interface de API padrão para tokens dentro de contratos inteligentes. O padrão define as funções e eventos necessários que um contrato de token deve implementar para ser interoperável com diferentes aplicações.

??? code "ERC20.sol"

````
```solidity

--8<-- 'code/builders/toolkit/ethereum-api/precompiles/erc20/erc20.sol'

```
````

!!! note
A pré-compilação ERC-20 não inclui funções `deposit` e `withdraw` e eventos subsequentes esperados de um contrato de token empacotado, como WETH.

## Interaja com a Interface Solidity {: #interact-with-the-solidity-interface }

### Verificando os Pré-requisitos {: #checking-prerequisites }

Para acompanhar este tutorial, você precisará ter sua carteira configurada para trabalhar com sua rede EVM com tecnologia Tanssi e uma conta financiada com tokens nativos. Você pode adicionar sua rede EVM ao MetaMask com um clique no [Tanssi dApp](https://apps.tanssi.network){target=\\\_blank}. Ou, você pode [configurar o MetaMask para Tanssi com a rede EVM de demonstração](/builders/toolkit/ethereum-api/wallets/metamask/){target=\\\_blank}.

### Adicionar Token a uma Carteira EVM {: #add-token-to-evm-wallet }

Se você deseja interagir com o token nativo da sua rede como faria com um ERC-20, pode adicionar um token personalizado à sua carteira compatível com EVM usando o endereço da pré-compilação. Esta seção guiará você pela adição de um ativo externo ao [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\\\_blank}.

Para começar, abra o MetaMask e certifique-se de estar conectado à sua rede e:

1. Mude para a aba **Assets** (Ativos)
1. Clique em **Import tokens** (Importar tokens)

![Importar Tokens da Aba Assets no MetaMask](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-1.webp)

Agora, você pode criar um token personalizado:

1. Insira o endereço da pré-compilação para o endereço do contrato de token - `{{networks.demo_evm.precompiles.erc20 }}`. Ao inserir o endereço, os campos **Token Symbol** (Símbolo do Token) e **Token Decimal** (Decimal do Token) devem preencher automaticamente. Se não preencherem, você pode inserir `UNIT` para o símbolo e `18` para as casas decimais. Lembre-se que o número padrão de decimais para redes Tanssi EVM é `18`, o mesmo que as decimais de token do Ethereum
1. Clique em **Next** (Próximo)

![Adicionar Token Personalizado](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-2.webp)

O MetaMask solicitará que você confirme a importação. Você pode revisar os detalhes do token e clicar em **Import Tokens** (Importar Tokens) para importar tokens UNIT em sua carteira.

![Confirmar e Importar Tokens](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-3.webp)

E é isso! Você adicionou com sucesso o token UNIT como um token ERC-20 personalizado em sua rede Tanssi EVM.

### Configuração do Remix {: #remix-set-up }

Você pode interagir com a pré-compilação ERC-20 usando [Remix](https://remix.ethereum.org){target=\\\_blank}. Para adicionar a pré-compilação ao Remix, você precisará:

1. Obter uma cópia de [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\\\_blank}
1. Colar o conteúdo do arquivo em um arquivo Remix chamado `IERC20.sol`

### Compilar o Contrato {: #compile-the-contract }

Em seguida, você precisará compilar a interface no Remix:

1. Clique na aba **Compile** (Compilar), a segunda de cima
1. Compile a interface clicando em **Compile IERC20.sol** (Compilar IERC20.sol)

![Compilando IERC20.sol](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-4.webp)

Quando a compilação estiver concluída, você verá uma marca de seleção verde ao lado da aba **Compile** (Compilar).

### Acessar o Contrato {: #access-the-contract }

Em vez de implantar a pré-compilação ERC-20, você acessará a interface dado o endereço do contrato pré-compilado:

1. Clique na aba **Deploy and Run** (Implantar e Executar) diretamente abaixo da aba **Compile** (Compilar) no Remix. Observe que os contratos pré-compilados já estão acessíveis em seus respectivos endereços. Portanto, não há etapa de implantação
1. Certifique-se de que **Injected Web3** (Web3 Injetado) esteja selecionado no menu suspenso **ENVIRONMENT** (AMBIENTE). Depois de selecionar **Injected Web3**, o MetaMask pode solicitar que você conecte sua conta ao Remix, caso ainda não esteja conectada
1. Certifique-se de que a conta correta esteja exibida em **ACCOUNT** (CONTA)
1. Certifique-se de que **IERC20 - IERC20.sol** esteja selecionado no menu suspenso **CONTRACT** (CONTRATO). Dado que é um contrato pré-compilado, não há etapa de implantação. Em vez disso, você fornecerá o endereço da pré-compilação no campo **At Address** (No Endereço)
1. Forneça o endereço da pré-compilação ERC-20: `{{networks.demo_evm.precompiles.erc20}}` e clique em **At Address** (No Endereço)

![Acessar o endereço](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-5.webp)

A pré-compilação **IERC20** aparecerá na lista de **Deployed Contracts** (Contratos Implantados).

### Obter Informações Básicas do Token {: #get-basic-token-information }

A interface ERC-20 permite que você obtenha rapidamente informações do token, incluindo a oferta total do token, nome, símbolo e casas decimais. Você pode recuperar essas informações seguindo estas etapas:

1. Expanda o contrato **IERC20** em **Deployed Contracts** (Contratos Implantados)
1. Clique em **decimals** (decimais) para obter as casas decimais do token do protocolo nativo da sua rede
1. Clique em **name** (nome) para obter o nome do token
1. Clique em **symbol** (símbolo) para obter o símbolo do token
1. Clique em **totalSupply** (oferta total) para obter a oferta total de tokens nativos em sua rede

![Oferta Total](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-6.webp)

Os resultados de cada chamada de função são exibidos nas respectivas funções.

### Obter Saldo da Conta {: #get-account-balance }

Você pode verificar o saldo de qualquer endereço em sua rede chamando a função `balanceOf` e passando um endereço:

1. Expanda a função **balanceOf**
1. Insira um endereço do qual você gostaria de verificar o saldo para o **owner** (proprietário)
1. Clique em **call** (chamar)

![Obter Saldo de uma Conta](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-7.webp)

Seu saldo será exibido na função `balanceOf`.

### Aprovar uma Despesa {: #approve-a-spend }

Para aprovar uma alocação de gasto de token, você precisará fornecer um endereço para o gastador e o número de tokens que o gastador tem permissão para gastar. O gastador pode ser uma conta de propriedade externa (EOA) ou um contrato inteligente. Para este exemplo, você pode aprovar o gastador com uma alocação de 1 token UNIT. Para começar, siga estas etapas:

1. Expanda a função **approve** (aprovar)
1. Insira o endereço do gastador. Você deve ter criado duas contas antes de começar, para poder usar a segunda conta como gastador
1. Insira a quantidade de tokens que o gastador pode gastar para o **value** (valor). Para este exemplo, você pode permitir que o gastador gaste 1 token UNIT em unidades Wei (`1000000000000000000`)
1. Clique em **transact** (transacionar)
1. O MetaMask aparecerá e você será solicitado a revisar os detalhes da transação. Clique em **Confirm** (Confirmar) para enviar a transação

![Confirmar Transação de Aprovação](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-8.webp)

Após a confirmação da transação, você notará que o saldo da sua conta permaneceu o mesmo. Isso ocorre porque você só aprovou a alocação para a quantidade fornecida e o gastador não gastou os fundos. Na próxima seção, você usará a função `allowance` (alocação) para verificar se o gastador pode gastar 1 token UNIT em seu nome.

### Obter Alocação do Gastador {: #get-allowance-of-spender }

Para verificar se o gastador recebeu a alocação aprovada na seção [Aprovar uma Despesa](#approve-a-spend), você pode:

1. Expanda a função **allowance** (alocação)
1. Insira seu endereço para o **owner** (proprietário)
1. Insira o endereço do **spender** (gastador) que você usou na seção anterior
1. Clique em **call** (chamar)

![Obter Alocação do Gastador](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-9.webp)

Assim que a chamada for concluída, a alocação do gastador será exibida, que deve ser equivalente a 1 token UNIT (`1000000000000000000`).

### Enviar Transferência {: #send-transfer }

Para enviar tokens de sua conta diretamente para outra conta, você pode chamar a função `transfer` seguindo estas etapas:

1. Expanda a função **transfer** (transferir)
1. Insira o endereço para enviar os tokens UNIT
1. Insira a quantidade de tokens UNIT para enviar. Para este exemplo, você pode enviar 1 token UNIT (`1000000000000000000`)
1. Clique em **transact** (transacionar)
1. O MetaMask aparecerá e você será solicitado a revisar os detalhes da transação. Clique em **Confirm** (Confirmar) para enviar a transação

![Enviar Transferência Padrão](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-10.webp)

Assim que a transação for concluída, você pode [verificar seu saldo](#get-account-balance) usando a função `balanceOf` ou observando no MetaMask. Você notará que seu saldo diminuiu em 1 token UNIT. Você também pode usar a função `balanceOf` para garantir que o saldo dos destinatários tenha aumentado em 1 token UNIT, conforme o esperado.

### Enviar Transferência De Conta Específica {: #send-transferfrom }

Até agora, você aprovou uma alocação de 1 token UNIT para o gastador e enviou 1 token UNIT por meio da função `transfer` padrão. A função `transferFrom` difere da função `transfer` padrão, pois permite que você defina o endereço para o qual deseja enviar os tokens. Então, você pode especificar um endereço com uma alocação ou seu endereço, desde que tenha fundos. Para este exemplo, você usará a conta do gastador para iniciar uma transferência dos fundos permitidos do proprietário para o gastador. O gastador pode enviar os fundos para qualquer conta, mas você pode enviar os fundos do proprietário para o gastador para este exemplo.

Primeiro, você precisa mudar para a conta do gastador no MetaMask. Assim que você mudar para a conta do gastador, você notará que o endereço selecionado no Remix na aba **Accounts** (Contas) agora é o do gastador.

![Mudar de contas Remix](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-11.webp)

Em seguida, você pode iniciar e enviar a transferência. Para fazer isso, siga as seguintes etapas:

1. Expanda a função **transferFrom** (transferirDe)
1. Insira seu endereço como proprietário no campo **from** (de)
1. Insira o endereço do destinatário, que deve ser o endereço do gastador, no campo **to** (para)
1. Insira a quantidade de tokens UNIT a serem enviados. Novamente, o gastador atualmente só pode enviar 1 token UNIT, então insira `1000000000000000000`
1. Clique em **transact** (transacionar)

![Enviar Transferência Padrão](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-12.webp)

Assim que a transação for concluída, você pode [verificar o saldo](#get-account-balance) do proprietário e do gastador usando a função `balanceOf`. O saldo do gastador deve ter aumentado em 1 token UNIT e sua alocação agora deve ser esgotada. Para verificar se o gastador não tem mais uma alocação, você pode chamar a função `allowance` passando os endereços do proprietário e do gastador. Você deve receber um resultado de 0.

![Alocação Zero](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-13.webp)

E é isso! Você interagiu com sucesso com a pré-compilação ERC-20 usando MetaMask e Remix!

--8\<-- 'text/\_disclaimers/third-party-content.md'
",
"branch": "origin/main",
"commit": "730d1002d79d2768953bf457e466ad35881f1040"
}
