---
title: Pré-compilado ERC-20 do Token Nativo
description: Saiba como acessar e interagir com a representação ERC-20 do token nativo em redes EVM com tecnologia Tanssi.
keywords: solidity, ethereum, token nativo, erc20, tanssi, precompiled
icon: material-circle-outline
categories: EVM-Template
---

# Pré-compilado ERC-20 do Token Nativo

## Introdução {: #introduction }

O contrato precompilado ERC-20 do token nativo em redes EVM com Tanssi permite que os desenvolvedores interajam com o token nativo do protocolo por meio de uma interface ERC-20. Embora o token nativo da sua rede não seja um ERC-20, agora você pode interagir com ele como se fosse um ERC-20 puro.

Um dos principais benefícios dessa precompilada é eliminar a necessidade de ter uma representação embrulhada do token do protocolo como um smart contract ERC-20, como o WETH no Ethereum. Além disso, ela minimiza a necessidade de múltiplas representações embrulhadas do mesmo token do protocolo. Consequentemente, dApps que precisam interagir com o token do protocolo via interface ERC-20 podem fazê-lo sem precisar de um contrato separado.

Por baixo dos panos, a [precompilada ERC-20](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank} executa ações específicas do Substrate relacionadas ao módulo de saldos do Substrate, escrito em Rust. O módulo de saldos fornece funcionalidades para lidar com diversos tipos de saldos.

Este guia mostrará como interagir com os tokens UNIT, os tokens nativos do protocolo para redes de teste rápido no [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\_blank}, por meio da precompilada ERC-20. Você pode seguir e adaptar este guia para interagir com a sua própria rede.

A precompilada está localizada no endereço:

```text
{{networks.demo_evm.precompiles.erc20 }}
```

--8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/security-note.md'

## Interface Solidity do ERC-20 {: #the-erc20-interface }

A interface [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank} nas redes EVM do Tanssi segue o [Padrão de Token EIP-20](https://eips.ethereum.org/EIPS/eip-20){target=\_blank}, que define as funções e eventos exigidos para um token interoperar com diferentes aplicações.

??? code "ERC20.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/erc20/erc20.sol'
    ```

!!! nota
    A precompilada ERC-20 não inclui as funções `deposit` e `withdraw` nem os eventos associados esperados de um token embrulhado, como o WETH.

## Interagir com a interface Solidity {: #interact-with-the-solidity-interface }

### Verificando Pré-requisitos {: #checking-prerequisites }

Para acompanhar este tutorial, você precisará ter sua carteira configurada para funcionar com sua rede EVM com Tanssi e uma conta financiada com tokens nativos. Você pode adicionar sua rede EVM ao MetaMask com um clique no [Tanssi dApp](https://apps.tanssi.network){target=\_blank} ou [configurar o MetaMask para Tanssi com a rede EVM de demonstração](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

### Adicionar token a uma carteira EVM {: #add-token-to-evm-wallet }

Se quiser interagir com o token nativo da rede como um ERC-20, adicione um token personalizado à sua carteira compatível com EVM usando o endereço da precompilada. Esta seção mostra como adicionar um ativo externo ao [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

Para começar, abra o MetaMask, certifique-se de estar conectado à sua rede e:

1. Acesse a aba **Assets**
2. Clique em **Import tokens**

![Import Tokens from Assets Tab in MetaMask](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-1.webp)

Agora, crie o token personalizado:

1. Informe o endereço da precompilada — `{{networks.demo_evm.precompiles.erc20 }}`. Ao inserir o endereço, os campos **Token Symbol** e **Token Decimal** devem ser preenchidos automaticamente. Caso não aconteça, use `UNIT` como símbolo e `18` para casas decimais (o padrão das redes EVM do Tanssi, igual ao Ethereum)
2. Clique em **Next**

![Add Custom Token](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-2.webp)

O MetaMask solicitará a confirmação da importação. Revise os detalhes e clique em **Import Tokens** para importar os tokens UNIT para sua carteira.

![Confirm and Import Tokens](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-3.webp)

Pronto! Você adicionou o token UNIT como um ERC-20 personalizado na sua rede EVM do Tanssi.

### Configuração do Remix {: #remix-set-up }

Você pode interagir com a precompilada ERC-20 usando o [Remix](https://remix.ethereum.org){target=\_blank}. Para adicioná-la ao Remix, você precisará:

1. Obter uma cópia do [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank}
2. Colar o conteúdo em um arquivo chamado `IERC20.sol` no Remix

### Compilar o contrato {: #compile-the-contract }

Em seguida, compile a interface no Remix:

1. Clique na aba **Compile** (segunda de cima para baixo)
2. Compile a interface clicando em **Compile IERC20.sol**

![Compiling IERC20.sol](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-4.webp)

Quando a compilação terminar, aparecerá um check verde ao lado da aba **Compile**.

### Acessar o contrato {: #access-the-contract }

Em vez de implantar a precompilada, você acessará a interface informando o endereço do contrato já disponibilizado:

1. Clique na aba **Deploy and Run** logo abaixo de **Compile** no Remix. Lembre-se de que contratos precompilados já estão acessíveis em seus endereços, portanto não há etapa de implantação
2. Certifique-se de que **Injected Web3** está selecionado em **ENVIRONMENT**. Ao escolher **Injected Web3**, o MetaMask pode solicitar conexão com o Remix caso ainda não esteja
3. Verifique se a conta correta aparece em **ACCOUNT**
4. Garanta que **IERC20 - IERC20.sol** esteja selecionado em **CONTRACT**. Como é um contrato precompilado, não há implantação; você informará o endereço da precompilada em **At Address**
5. Informe o endereço da precompilada ERC-20: `{{networks.demo_evm.precompiles.erc20}}` e clique em **At Address**

![Access the address](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-5.webp)

A precompilada **IERC20** aparecerá na lista de **Deployed Contracts**.

### Obter informações básicas do token {: #get-basic-token-information }

A interface ERC-20 permite obter rapidamente informações como oferta total, nome, símbolo e casas decimais. Para isso:

1. Expanda o contrato **IERC20** em **Deployed Contracts**
2. Clique em **decimals** para obter as casas decimais do token nativo
3. Clique em **name** para obter o nome do token
4. Clique em **symbol** para obter o símbolo do token
5. Clique em **totalSupply** para obter a oferta total de tokens nativos na rede

![Total Supply](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-6.webp)

Os resultados de cada chamada aparecem sob as respectivas funções.

### Consultar saldo de uma conta {: #get-account-balance }

Para checar o saldo de qualquer endereço na rede usando `balanceOf`:

1. Expanda a função **balanceOf**
2. Informe o endereço a consultar em **owner**
3. Clique em **call**

![Get Balance of an Account](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-7.webp)

O saldo será exibido abaixo da função `balanceOf`.

### Aprovar um gasto {: #approve-a-spend }

Para aprovar uma autorização de gasto, forneça um endereço para o spender e o número de tokens permitidos. O spender pode ser uma EOA ou um contrato inteligente. Exemplo: autorizar 1 UNIT.

1. Expanda **approve**
2. Insira o endereço do spender (use a segunda conta criada)
3. Informe o valor que o spender pode gastar em **value**. Exemplo: 1 UNIT em Wei (`1000000000000000000`)
4. Clique em **transact**
5. O MetaMask abrirá para você revisar e confirmar a transação

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-8.webp)

Após a confirmação, o saldo da sua conta permanece o mesmo porque apenas a permissão foi concedida; nenhum gasto foi feito. Na próxima seção, usaremos `allowance` para verificar a permissão.

### Verificar a permissão do spender {: #get-allowance-of-spender }

Para checar se o spender recebeu a autorização:

1. Expanda **allowance**
2. Informe seu endereço em **owner**
3. Informe o endereço do **spender** usado anteriormente
4. Clique em **call**

![Get Allowance of Spender](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-9.webp)

O valor exibido deve equivaler a 1 UNIT (`1000000000000000000`).

### Enviar transferência padrão {: #send-transfer }

Para enviar tokens diretamente da sua conta a outra:

1. Expanda **transfer**
2. Insira o endereço de destino
3. Informe a quantidade de UNIT a enviar (ex.: 1 UNIT = `1000000000000000000`)
4. Clique em **transact**
5. Confirme a transação no MetaMask

![Send Standard Transfer](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-10.webp)

Após a conclusão, [verifique seu saldo](#get-account-balance) via `balanceOf` ou no MetaMask. O saldo deve ter diminuído em 1 UNIT, e o destinatário deve ter recebido 1 UNIT.

### Enviar transferência a partir de uma conta específica {: #send-transferfrom }

Até agora, você aprovou 1 UNIT para o spender e enviou 1 UNIT com `transfer`. A função `transferFrom` permite definir de qual endereço sairão os tokens. Para este exemplo, use a conta do spender para transferir o valor autorizado do owner para o spender.

Primeiro, mude para a conta do spender no MetaMask; o endereço selecionado em Remix será o do spender.

![Switch accounts Remix](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-11.webp)

Em seguida, envie a transferência:

1. Expanda **transferFrom**
2. Informe seu endereço como owner no campo **from**
3. Informe o destinatário (o spender) no campo **to**
4. Informe a quantidade de UNIT (a autorização é de 1 UNIT, então use `1000000000000000000`)
5. Clique em **transact**

![Send Standard Transfer](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-12.webp)

Depois da transação, confira o saldo do owner e do spender com `balanceOf`. O saldo do spender terá aumentado em 1 UNIT e a permissão terá sido consumida. Para confirmar que não há mais permissão, chame `allowance` passando os endereços do owner e do spender; o resultado deve ser 0.

![Zero Allowance](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-13.webp)

E é isso! Você interagiu com a precompilada ERC-20 usando MetaMask e Remix.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
