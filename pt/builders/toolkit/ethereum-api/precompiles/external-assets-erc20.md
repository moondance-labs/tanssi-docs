---
title: Ativos Externos como ERC-20
description: Aprenda como acessar e interagir com uma representação ERC-20 de quaisquer ativos externos em redes Tanssi EVM por meio da Interface ERC-20 pré-compilada.
keywords: solidity, ethereum, native, token, moonbeam, precompiled, contracts, assets, erc20
categories: EVM-Template
---

# Ativos Externos como ERC-20

## Introdução {: #introduction }

Como apresentado no artigo [Comunicação Cross-Chain Nativa](/learn/framework/xcm/){target=\_blank}, as redes implantadas através do Tanssi podem se comunicar e interagir com qualquer outra rede no ecossistema. Este ambiente multi-chain leva a um mundo multi-ativo, onde a transferência perfeita de ativos, dados e valor entre diferentes redes amplia as possibilidades de construir casos de uso em diversos setores, como finanças (DeFi), ativos do mundo real (RWAs) e outros.

Ativos externos são tokens nativos de outra blockchain, ou, em outras palavras, ativos cuja cadeia de reserva não é a cadeia com a qual você está interagindo. As redes Tanssi podem registrar ativos externos para permitir sua entrada. Para fazer isso, é necessário [estabelecer um canal XCM](/learn/framework/xcm/#channel-registration){target=\_blank} com a outra cadeia e, em seguida, registrar um de seus ativos nativos como um ativo externo. Os ativos externos registrados se comportam, em certa medida, da mesma forma que os locais.

A [pré-compilação de ativos ERC-20](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20Instance.sol){target=\_blank} permite que as redes baseadas no [modelo Tanssi EVM](/builders/build/templates/evm/){target=\_blank} acessem qualquer ativo externo registrado através da interface ERC-20 padrão. Consequentemente, contratos inteligentes implantados na rede podem interagir com esses ativos da mesma forma que fariam com qualquer outro ERC-20 regular.

O endereço que representa o contrato ERC-20 é formado com as primeiras trinta e seis posições (dezoito bytes) definidas para o valor máximo e as últimas quatro posições (dois bytes) substituídas pela representação hexadecimal do identificador de ativo registrado:

```text
```

Por exemplo, para o ativo cujo ID é `1`, as últimas quatro posições devem ser substituídas por `0001`, e para um ativo com um ID de `10`, essas quatro posições devem ser substituídas por `000A`.

--8\<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/security-note.md'

## Pré-requisitos {: #prerequisites }

Para acompanhar o conteúdo deste guia, você precisará:

- Acesso a uma rede Tanssi EVM executando [runtime 500](https://github.com/moondance-labs/tanssi/releases/tag/runtime-500){target=\_blank} ou superior
- Um canal XCM bidirecional estabelecido para outra cadeia. Para gerenciar os canais da sua rede, consulte o artigo [Gerenciar Canais de Comunicação Cross-Chain](/builders/manage/dapp/xcm-channels/){target=\_blank}
- Um ativo externo registrado. Uma vez que os canais XCM estejam abertos, o registro de ativos pode ser facilmente feito usando o [dApp](https://apps.tanssi.network/){target=\_blank}, conforme explicado no guia [Registrar Ativos Externos](/builders/manage/dapp/register-external-assets/){target=\_blank}
- Finalmente, você precisará de uma [carteira compatível com EVM](/builders/toolkit/ethereum-api/wallets/){target=\_blank} configurada para funcionar com sua rede. Você também pode conectar sua carteira à [rede demo EVM](https://apps.tanssi.network/demo){target=\_blank}.

Os exemplos neste guia são baseados na rede demo Tanssi EVM, que já possui canais abertos para outras redes e ativos externos registrados, como mostra a imagem a seguir:

1. O ativo externo registrado (UNIT) que será usado nas seções a seguir
1. Outros ativos externos disponíveis ainda não registrados

![Tanssi EVM demo network registered external Assets](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-1.webp)

## A Interface Solidity ERC-20 {: #the-erc20-interface }

A interface [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank} nas redes Tanssi EVM segue o [EIP-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20){target=\_blank}, que é a interface API padrão para tokens dentro de contratos inteligentes. O padrão define as funções e eventos necessários que um contrato de token deve implementar para ser interoperável com diferentes aplicações.

??? code "ERC20.sol"

````
    ```solidity

--8<-- 'code/builders/toolkit/ethereum-api/precompiles/erc20/erc20.sol'

    ```
````

!!! nota
A pré-compilação de ativos externos ERC-20 não inclui funções `deposit` e `withdraw` e eventos subsequentes esperados de um contrato de token embrulhado, como WETH.

## Adicionar Token à uma Carteira EVM {: #add-token-to-evm-wallet }

Se você quiser interagir com os ativos externos registrados da sua rede como faria com um ERC-20, pode adicioná-los à sua carteira usando o prefixo de endereço de pré-compilação e o ID do ativo. Esta seção irá guiá-lo através da adição de um ativo externo ao [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

Para começar, abra o MetaMask e certifique-se de que você está conectado à sua rede e:

1. Vá para a aba **Tokens**

1. Clique em **Importar tokens**

   ![Import Tokens from Tokens Tab in MetaMask](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-2.webp)

```text

```

{{networks.demo_evm.precompiles.external_assets_erc20_example}}

```

1. Insira o endereço de pré-compilação para o endereço do contrato do token. Ao inserir o endereço, os campos **Símbolo do token** e **Decimais do token** devem ser preenchidos automaticamente. Se não preencherem, você pode inserir `UNIT` para o símbolo e `12` para as casas decimais
1. Clique em **Próximo**

![Adicionar ativo externo](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-3.webp)

MetaMask solicitará que você confirme a importação. Você pode verificar os detalhes do token e clicar em **Importar tokens** para importar tokens UNIT para sua carteira.

![Confirmar e Importar Tokens](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-4.webp)

E é isso! Você adicionou com sucesso o ativo externo do token UNIT como um token ERC-20 personalizado na rede demo Tanssi EVM.

## Interagir com a interface Solidity via Remix {: #interact-with-the-solidity-interface-via-remix }

### Configuração do Remix {: #remix-set-up }

Você pode interagir com a pré-compilação de ativos externos ERC-20 usando [Remix](https://remix.ethereum.org){target=\_blank}. Para adicionar a pré-compilação ao Remix, você precisará:

1. Obter uma cópia de [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank}
1. Cole o conteúdo do arquivo em um arquivo Remix chamado `IERC20.sol`

### Compilar o contrato {: #compile-the-contract }

Em seguida, você precisará compilar a interface no Remix:

1. Clique na aba **Compilar**, a segunda de cima
1. Compile a interface clicando em **Compilar IERC20.sol**

![Compilando IERC20.sol](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-5.webp)

Quando a compilação for concluída, você verá uma marca de seleção verde ao lado da aba **Compilar**.

### Acessar o contrato {: #access-the-contract }

Em vez de implantar o contrato inteligente, você acessará a interface através do endereço da pré-compilação de ativos externos:

1. Clique na aba **Deploy and Run** diretamente abaixo da aba **Compilar** no Remix. Observe que os contratos pré-compilados já estão acessíveis em seus respectivos endereços. Portanto, não há nenhuma etapa de implantação
1. Certifique-se de que **Injected Web3** esteja selecionado no menu suspenso **ENVIRONMENT**. Depois de selecionar **Injected Web3**, você pode ser solicitado pelo MetaMask para conectar sua conta ao Remix, caso ela ainda não esteja conectada
1. Certifique-se de que a conta correta seja exibida em **ACCOUNT**
1. Certifique-se de que **IERC20 - IERC20.sol** esteja selecionado no menu suspenso **CONTRACT**. Dado que é um contrato pré-compilado, não há nenhuma etapa de implantação. Em vez disso, você fornecerá o endereço da pré-compilação no campo **At Address**
1. Forneça o endereço da pré-compilação ERC-20 (que é `{{networks.demo_evm.precompiles.external_assets_erc20_example}}` neste exemplo) e clique em **At Address**
1. A pré-compilação **IERC20** aparecerá na lista de **Deployed Contracts**

![Acessar o endereço](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-6.webp)

### Obter informações básicas do token {: #get-basic-token-information }

A interface ERC-20 permite obter rapidamente informações sobre o token, incluindo a oferta total do token, nome, símbolo e casas decimais. Você pode recuperar essas informações seguindo estas etapas:

1. Expanda o contrato **IERC20** em **Deployed Contracts**
1. Clique em **decimals** para obter as casas decimais do token do protocolo nativo da sua rede
1. Clique em **name** para obter o nome do token
1. Clique em **symbol** para obter o símbolo do token
1. Clique em **totalSupply** para obter a oferta total de tokens nativos em sua rede

![Obter informações básicas do token](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-7.webp)

Os resultados de cada chamada de função são exibidos sob as respectivas funções.

### Obter Saldo da Conta {: #get-account-balance }

Você pode verificar o saldo de qualquer endereço em sua rede chamando a função `balanceOf` e passando um endereço:

1. Expanda a função **balanceOf**
1. Insira um endereço para o qual você gostaria de verificar o saldo para o **owner**
1. Clique em **call**

![Obter Saldo de uma Conta](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-8.webp)

Seu saldo será exibido na função `balanceOf`.

### Enviar transferência {: #send-transfer }

Para enviar tokens da sua conta diretamente para outra conta, você pode chamar a função `transfer` seguindo estas etapas:

1. Expanda a função **transfer**
1. Insira o endereço para enviar tokens UNIT
1. Insira a quantidade de tokens UNIT para enviar. Para este exemplo, você pode enviar 1 token UNIT (`1000000000000`)
1. Clique em **transact**
1. O MetaMask aparecerá e você será solicitado a revisar os detalhes da transação. Clique em **Confirmar** para enviar a transação

![Enviar Transferência Padrão](/images/builders/toolkit/ethereum-api/precompiles/external-assets-erc20/external-assets-erc20-9.webp)

Assim que a transação for concluída, você poderá [verificar seu saldo](#get-account-balance) usando a função `balanceOf` ou olhando para o MetaMask. Você notará que seu saldo diminuiu em 1 token UNIT. Você também pode usar a função `balanceOf` para garantir que o saldo dos destinatários tenha aumentado em 1 token UNIT, conforme o esperado.

E é isso! Você interagiu com sucesso com a pré-compilação de ativos externos ERC-20 usando MetaMask e Remix!

--8\<-- 'text/pt/_disclaimers/third-party-content.pt.md'
