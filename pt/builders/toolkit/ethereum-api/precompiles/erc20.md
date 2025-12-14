---
title:  Pré-compilado ERC-20 do Token Nativo
description: Saiba como acessar e interagir com a representação ERC-20 do token nativo em redes EVM com tecnologia Tanssi por meio da Interface ERC-20 pré-compilada.
keywords: solidity, ethereum, token nativo, erc20, tanssi, precompiled, contracts
icon: material-circle-outline
categories: EVM-Template
---

#  Pré-compilado ERC-20 do Token Nativo

## Introdução {: #introduction }

O contrato pré-compilado ERC-20 do token nativo em redes EVM com tecnologia Tanssi permite que desenvolvedores interajam com o token nativo do protocolo por meio de uma interface ERC-20. Embora o token nativo da sua rede não seja um ERC-20, agora você pode interagir com ele como se fosse um ERC-20 padrão.

Um dos principais benefícios desse precompile é eliminar a necessidade de ter uma representação embrulhada do token do protocolo como um smart contract ERC-20, como o WETH no Ethereum. Além disso, minimiza a necessidade de múltiplas representações embrulhadas do mesmo token do protocolo. Consequentemente, dApps que precisam interagir com o token do protocolo via uma interface ERC-20 podem fazê-lo sem precisar de um contrato separado.

Por baixo dos panos, a [precompilada ERC-20](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank} executa ações específicas do Substrate relacionadas ao módulo de saldos, escrito em Rust. O módulo de saldos fornece funcionalidades para lidar com diversos tipos de saldos.

Este guia mostrará como interagir com tokens UNIT, o token nativo do protocolo para redes de teste rápido no [Dancelight](/pt/builders/tanssi-network/testnet/dancelight/){target=\_blank}, por meio da precompilada ERC-20. Você pode seguir e adaptar este guia para interagir com sua própria rede.

A precompilada está localizada no seguinte endereço:

```text
{{networks.demo_evm.precompiles.erc20 }}
```

--8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/security-note.md'

## Interface Solidity do ERC-20 {: #the-erc20-interface }

A interface [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank} nas redes EVM da Tanssi segue o [Padrão de Token EIP-20](https://eips.ethereum.org/EIPS/eip-20){target=\_blank}, que é a interface padrão de API para tokens em smart contracts. O padrão define as funções e eventos exigidos para que um contrato de token seja interoperável com diferentes aplicações.

??? code "ERC20.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/erc20/erc20.sol'
    ```

!!! note
    A precompilada ERC-20 não inclui as funções `deposit` e `withdraw` nem os eventos associados esperados de um token embrulhado, como o WETH.

## Interagir com a Interface Solidity {: #interact-with-the-solidity-interface }

### Verificando Pré-requisitos {: #checking-prerequisites }

Para acompanhar este tutorial, você precisará ter sua carteira configurada para funcionar com sua rede EVM com Tanssi e uma conta com tokens nativos. Você pode adicionar sua rede EVM ao MetaMask com um clique no [Tanssi dApp](https://apps.tanssi.network){target=\_blank}. Ou, se preferir, [configure o MetaMask para Tanssi com a rede EVM de demonstração](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

### Adicionar token a uma carteira EVM {: #add-token-to-evm-wallet }

Se quiser interagir com o token nativo da rede como faria com um ERC-20, adicione um token personalizado à sua carteira compatível com EVM usando o endereço da precompilada. Esta seção mostra como adicionar um ativo externo ao [MetaMask](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

Para começar, abra o MetaMask, conecte-se à sua rede e:

1. Acesse a aba **Assets**
2. Clique em **Import tokens**

![Importar tokens na aba Assets do MetaMask](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-1.webp)

Agora, crie o token personalizado:

1. Informe o endereço da precompilada para o endereço do contrato do token: `{{networks.demo_evm.precompiles.erc20 }}`. Ao inserir o endereço, os campos **Token Symbol** e **Token Decimal** devem preencher automaticamente. Caso não aconteça, use `UNIT` como símbolo e `18` como casas decimais. Lembre que o padrão de casas decimais das redes EVM da Tanssi é `18`, o mesmo do Ethereum
2. Clique em **Next**

![Adicionar token customizado](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-2.webp)

O MetaMask solicitará a confirmação da importação. Revise os detalhes e clique em **Import Tokens** para importar os tokens UNIT na carteira.

![Confirmar e importar tokens](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-3.webp)

Pronto! Você adicionou o token UNIT como um ERC-20 personalizado na sua rede EVM do Tanssi.

### Configuração do Remix {: #remix-set-up }

Você pode interagir com a precompilada ERC-20 usando o [Remix](https://remix.ethereum.org){target=\_blank}. Para adicioná-la ao Remix, você precisará:

1. Obter uma cópia de [`ERC20.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/ERC20.sol){target=\_blank}
2. Colar o conteúdo em um arquivo do Remix chamado `IERC20.sol`

### Compilar o Contrato {: #compile-the-contract }

Em seguida, compile a interface no Remix:

1. Clique na aba **Compile** (segunda de cima)
2. Compile a interface clicando em **Compile IERC20.sol**

![Compilando IERC20.sol](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-4.webp)

Quando a compilação for concluída, um check verde aparecerá ao lado da aba **Compile**.

### Acessar o Contrato {: #access-the-contract }

Em vez de implantar a precompilada ERC-20, você acessará a interface informando o endereço do contrato pré-compilado:

1. Clique na aba **Deploy and Run** logo abaixo da aba **Compile** no Remix. Observe que contratos pré-compilados já estão acessíveis em seus respectivos endereços, portanto não há etapa de implantação
2. Certifique-se de que **Injected Web3** está selecionado em **ENVIRONMENT**. Ao selecionar **Injected Web3**, o MetaMask pode solicitar conexão ao Remix caso ainda não esteja
3. Verifique se a conta correta aparece em **ACCOUNT**
4. Garanta que **IERC20 - IERC20.sol** esteja selecionado em **CONTRACT**. Por ser um contrato pré-compilado, não há implantação; em vez disso, informe o endereço da precompilada no campo **At Address**
5. Informe o endereço da precompilada ERC-20: `{{networks.demo_evm.precompiles.erc20}}` e clique em **At Address**

![Acessar o endereço](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-5.webp)

A precompilada **IERC20** aparecerá na lista de **Deployed Contracts**.

### Obter Informações Básicas do Token {: #get-basic-token-information }

A interface ERC-20 permite obter rapidamente informações como oferta total, nome, símbolo e casas decimais. Para recuperar essas informações:

1. Expanda o contrato **IERC20** em **Deployed Contracts**
2. Clique em **decimals** para obter as casas decimais do token nativo
3. Clique em **name** para obter o nome do token
4. Clique em **symbol** para obter o símbolo do token
5. Clique em **totalSupply** para obter a oferta total de tokens nativos na rede

![Oferta total (Total Supply)](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-6.webp)

Os resultados de cada chamada são exibidos abaixo das respectivas funções.

### Consultar Saldo de uma Conta {: #get-account-balance }

Você pode verificar o saldo de qualquer endereço na rede chamando `balanceOf` e fornecendo um endereço:

1. Expanda a função **balanceOf**
2. Informe o endereço que deseja consultar no campo **owner**
3. Clique em **call**

![Obter saldo de uma conta](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-7.webp)

O saldo será exibido abaixo da função `balanceOf`.

### Aprovar um Gasto {: #approve-a-spend }

Para aprovar uma permissão de gasto, forneça um endereço para o spender e o número de tokens que ele pode gastar. O spender pode ser uma conta externa (EOA) ou um smart contract. Neste exemplo, você aprovará uma allowance de 1 token UNIT. Siga:

1. Expanda a função **approve**
2. Informe o endereço do spender. Você deve ter criado duas contas antes de começar; use a segunda conta como spender
3. Informe o valor de tokens que o spender pode gastar em **value**. Para este exemplo, permita 1 token UNIT em Wei (`1000000000000000000`)
4. Clique em **transact**
5. A MetaMask aparecerá; revise os detalhes e clique em **Confirm** para enviar

![Confirmar transação de approve](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-8.webp)

Após a confirmação, o saldo da sua conta permanece o mesmo: você apenas aprovou a permissão e o spender ainda não gastou os fundos. Na próxima seção, você usará `allowance` para verificar que o spender pode gastar 1 token UNIT em seu nome.

### Obter Allowance do Spender {: #get-allowance-of-spender }

Para conferir se o spender recebeu a allowance aprovada em [Aprovar um Gasto](#approve-a-spend):

1. Expanda a função **allowance**
2. Informe seu endereço em **owner**
3. Informe o endereço do **spender** usado na seção anterior
4. Clique em **call**

![Obter allowance do spender](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-9.webp)

Quando a chamada finalizar, a allowance do spender será exibida e deve ser equivalente a 1 token UNIT (`1000000000000000000`).

### Enviar Transferência {: #send-transfer }

Para enviar tokens diretamente da sua conta para outra, chame `transfer`:

1. Expanda a função **transfer**
2. Informe o endereço para o qual deseja enviar tokens UNIT
3. Informe a quantidade de tokens UNIT a enviar. Neste exemplo, envie 1 UNIT (`1000000000000000000`)
4. Clique em **transact**
5. A MetaMask aparecerá; revise os detalhes e clique em **Confirm** para enviar

![Enviar transferência padrão](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-10.webp)

Após a transação, você pode [checar seu saldo](#get-account-balance) usando `balanceOf` ou pelo MetaMask. Verá que seu saldo diminuiu em 1 UNIT. Use `balanceOf` também para confirmar que o saldo do destinatário aumentou em 1 UNIT conforme esperado.

### Enviar Transferência de uma Conta Específica {: #send-transferfrom }

Até agora, você aprovou uma allowance de 1 UNIT para o spender e enviou 1 UNIT via `transfer`. A função `transferFrom` difere da `transfer` padrão porque permite definir de qual endereço os tokens serão enviados. Você pode informar um endereço com allowance ou seu próprio endereço (se houver saldo). Neste exemplo, use a conta do spender para iniciar a transferência dos fundos permitidos do owner para o próprio spender. O spender poderia enviar para qualquer conta, mas aqui enviaremos do owner para o spender.

Primeiro, mude para a conta do spender no MetaMask. Ao trocar, o endereço selecionado no Remix em **Accounts** passará a ser o do spender.

![Trocar contas no Remix](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-11.webp)

Agora, inicie e envie a transferência:

1. Expanda a função **transferFrom**
2. Informe seu endereço (do owner) no campo **from**
3. Informe o endereço do destinatário, que deve ser o endereço do spender, no campo **to**
4. Informe a quantidade de tokens UNIT a enviar. O spender só pode enviar 1 UNIT, então insira `1000000000000000000`
5. Clique em **transact**

![Enviar transferência padrão](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-12.webp)

Após a transação, [verifique o saldo](#get-account-balance) do owner e do spender usando `balanceOf`. O saldo do spender deve ter aumentado em 1 UNIT, e a allowance deve ter sido consumida. Para confirmar que o spender não tem mais allowance, chame `allowance` informando os endereços de owner e spender; o resultado deve ser 0.

![Zerar allowance](/images/builders/toolkit/ethereum-api/precompiles/erc20/erc-13.webp)

E é isso! Você interagiu com a precompilada ERC-20 usando MetaMask e Remix!

--8<-- 'text/_disclaimers/third-party-content.md'
