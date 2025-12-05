---
title: Implante Contratos Inteligentes com Remix
description: Saiba como usar uma das IDEs Ethereum mais populares, o Remix, para interagir com sua rede EVM baseada na Tanssi.
icon: octicons-code-square-24
categories: EVM-Template
---

# Usando Remix para implantar na sua rede EVM da Tanssi

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/vSc80mg_L9E?si=qnIXJ6wL0iKU3mU1' frameborder='0' allowfullscreen></iframe></div>
<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>

## Introdução {: #introduction }

Desenvolvedores de dApps em redes EVM baseadas na Tanssi podem usar o [Remix](https://remix.ethereum.org){target=_blank}, um dos ambientes de desenvolvimento Ethereum mais populares, para criar, compilar e implantar contratos inteligentes. O Remix funciona com qualquer rede EVM graças à compatibilidade das redes EVM da Tanssi.

Este guia mostra como criar e implantar um contrato Solidity na rede EVM de demonstração da Tanssi usando a IDE Remix. Para sua própria rede Tanssi, basta adicionar a URL RPC dela à sua carteira EVM e alternar para essa rede.

## Verificando pré-requisitos {: #checking-prerequisites }

Você precisará do MetaMask instalado e configurado para funcionar com sua rede EVM da Tanssi. Siga [este guia para configurar o MetaMask para a rede EVM de demonstração](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=_blank}.

## Começando com o Remix {: #getting-started-with-remix }

Acesse o [Remix](https://remix.ethereum.org){target=_blank} e vá para a aba **File Explorer**.

![File explorer](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-1.webp)

Crie um novo arquivo para o contrato Solidity:

1. Clique em **Create New File** no **File Explorer**
2. Nomeie, por exemplo, `MyToken.sol`

![Crie um novo arquivo para seu contrato Solidity](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-2.webp)

Cole o contrato abaixo no editor:

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/dev-env/remix/erc20.sol'
```

![Cole o contrato no editor](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-3.webp)

É um ERC-20 simples baseado no [modelo atual do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol){target=_blank}. Cria `MyToken` com símbolo `MYTOK` e cunha todo o fornecimento inicial para o criador.

Para compilar:

1. Abra a aba **Solidity compiler**
2. Clique em **Compile MyToken.sol**

![Compile MyToken.sol](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-4.webp)

## Implantando um contrato com Remix {: #deploying-a-contract-to-your-network-using-remix }

Vá para **Deployment**, mude **ENVIRONMENT** de **JavaScript VM** para **Injected Web3** para usar o provedor do MetaMask apontando para sua rede Tanssi.

![Altere o ambiente para Injected Web3](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-5.webp)

Permita que o Remix se conecte ao MetaMask:

1. Selecione a(s) conta(s)
2. Clique em **Next**
3. Clique em **Connect**

![Selecione as contas para conectar ao Remix](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-6.webp)

Para implantar o token:

1. Ao lado de **Deploy**, informe o fornecimento inicial `8000000000000000000000000` (8 milhões com 18 decimais) e clique em **Deploy**
2. Confirme a transação no MetaMask

![Insira um saldo de token e implante](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-7.webp)

Após a confirmação, o contrato aparece em **Deployed Contracts**. Copie o endereço se precisar.

![Rótulo Confirmed em uma transação](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-8.webp)

Para interagir:

1. Expanda o contrato em **Deployed Contracts**
2. Em **balanceOf**, cole seu endereço e clique **balanceOf** para ver o saldo
3. Veja **Decimals**, **Name**, **Symbol** e **Initial Supply**
4. Copie o endereço do contrato (botão ao lado do nome)

![Interaja com o contrato do Remix](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-9.webp)

## Interagindo com o ERC-20 no MetaMask {: #interacting-with-an-erc-20-on-your-network-from-metamask }

Abra o MetaMask na conta que implantou o contrato e adicione o token:

1. Aba **Tokens** → **Import tokens**

![Adicione um token](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-10.webp)

2. Cole o endereço do contrato em **Token contract address** (símbolo e decimais preenchem automaticamente) → **Next**

![Cole o endereço do contrato copiado](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-11.webp)

Confirme em **Import**; você verá 8 milhões de MyTokens.

![Adicione os tokens à sua conta MetaMask](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-12.webp)

Envie 500 MyTokens para outra conta (**Send**), escolha o destinatário e confirme.

![Confirmação da transferência de token](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-13.webp)

Após a conclusão, o saldo é reduzido.

![Verifique a redução no saldo da conta](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-14.webp)

Você pode verificar a transação no [explorador da sua rede Tanssi](https://tanssi-evmexplorer.netlify.app){target=_blank}.

![Verifique o status da transação no explorador](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-15.webp)

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
