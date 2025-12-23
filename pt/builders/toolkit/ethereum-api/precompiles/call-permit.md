---
title: O Call Permit Precompile 
description: Aprenda a usar o Call Permit Precompile em redes EVM powered by Tanssi para assinar um permit para qualquer chamada EVM que possa ser despachada por qualquer pessoa ou contrato inteligente.
keywords: solidity, ethereum, call permit, permit, gasless transaction, moonbeam, precompiled, contracts, tanssi
icon: octicons-arrow-up-right-24
categories: EVM-Template
---

# Interagindo com o Call Permit Precompile

## Introdução {: #introduction }

O Call Permit Precompile em redes EVM powered by Tanssi permite que um usuário assine um permit, uma mensagem assinada [EIP-712](https://eips.ethereum.org/EIPS/eip-712){target=\_blank}, para qualquer chamada EVM, podendo ser despachada por qualquer pessoa ou contrato inteligente. É semelhante ao Permit Signing das aprovações ERC-20 introduzidas no [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612){target=\_blank}, exceto que se aplica a qualquer chamada EVM em vez de apenas aprovações.

Quando o call permit é despachado, isso é feito em nome do usuário que assinou o permit e o usuário ou contrato que despacha o permit é responsável por pagar as taxas de transação. Assim, o precompile pode ser usado para realizar transações sem gás para o signatário.

Por exemplo, Alice assina um call permit e Bob o despacha, executando a chamada em nome de Alice. Bob paga as taxas de transação; portanto, Alice não precisa ter moeda nativa para pagar a transação, a menos que a chamada inclua uma transferência.

O Call Permit Precompile está localizado no seguinte endereço:

```text
{{ networks.demo_evm.precompiles.call_permit }}
```

--8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/security-note.md'

## Interface Solidity do Call Permit {: #the-call-permit-interface }

[`CallPermit.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/CallPermit.sol){target=\_blank} é uma interface Solidity que permite interagir com três métodos do precompile.

??? code "CallPermit.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/call-permit/call-permit.sol'
    ```

A interface inclui as seguintes funções:

???+ function "**dispatch**(*address* from, *address* to, *uint256* value, *bytes* data, *uint64[]* gaslimit, *uint256* deadline, *uint8* v, *bytes32* r, *bytes32* s) — despacha uma chamada em nome de outro usuário com um permit EIP-712. Qualquer pessoa ou contrato pode chamar. A transação reverte se o permit for inválido ou se a chamada despachada reverter/errar (por exemplo, out of gas). Se for bem-sucedida, o nonce do signatário é incrementado para evitar replay"

    === "Parâmetros"

        - `from` - signatário do permit. A chamada será despachada em nome deste endereço
        - `to` - endereço para o qual a chamada é feita
        - `value` - valor transferido da conta `from`
        - `data` - call data, ou ação a executar
        - `value` - valor transferido da conta `from`
        - `gasLimit` - limite de gás exigido pela chamada despachada. Informar este parâmetro evita que o despachante manipule o gas limit
        - `deadline` - tempo em segundos UNIX após o qual o permit não será mais válido. Em JavaScript, você pode obter o tempo UNIX atual executando `console.log(Date.now())` em um script ou no console do navegador
        - `v` - recovery ID da assinatura (1 byte final da assinatura concatenada)
        - `r` - primeiros 32 bytes da assinatura concatenada
        - `s` - segundos 32 bytes da assinatura concatenada

??? function "**nonces**(*address* owner) — retorna o nonce atual para o owner informado"

    === "Parâmetros"

        - `owner` - endereço da conta a verificar

??? function "**DOMAIN_SEPARATOR**() — retorna o separador de domínio EIP-712 usado para evitar ataques de replay. Segue a implementação do [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612#specification){target=\_blank}"

    === "Parâmetros"

        Nenhum

    === "Retorno"
        O separador de domínio EIP-712 usado para evitar ataques de replay.

O separador de domínio é definido no [padrão EIP-712](https://eips.ethereum.org/EIPS/eip-712){target=\_blank} e calculado como:

```text
keccak256(PERMIT_DOMAIN, name, version, chain_id, address)
```

Os parâmetros do hash podem ser decompostos assim:

 - **PERMIT_DOMAIN** - é o `keccak256` de `EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)`
 - **name** - é o nome do domínio de assinatura e deve ser exatamente `'Call Permit Precompile'`
 - **version** - é a versão do domínio de assinatura. Aqui, **version** é `1`
 - **chainId** - é o Chain ID da sua rede
 - **verifyingContract** - é o endereço do contrato que verificará a assinatura. Neste caso, o endereço do Call Permit Precompile

Quando `dispatch` é chamado, o permit precisa ser verificado antes de despachar a chamada. O primeiro passo é [calcular o separador de domínio](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L138){target=\_blank}. O cálculo pode ser visto na [implementação do Moonbeam](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L112-L126){target=\_blank} ou em um exemplo prático no [contrato EIP712 do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4a9cc8b4918ef3736229a5cc5a310bdc17bf759f/contracts/utils/cryptography/draft-EIP712.sol#L70-L84){target=\_blank}.

A partir daí, um [hash da assinatura e dos argumentos](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L140-L151){target=\_blank} é gerado, garantindo que a assinatura só possa ser usada para o call permit. Ele usa um nonce para evitar replay. É semelhante ao contrato [`ERC20Permit` do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4a9cc8b4918ef3736229a5cc5a310bdc17bf759f/contracts/token/ERC20/extensions/draft-ERC20Permit.sol#L52){target=\_blank}, exceto que o `PERMIT_TYPEHASH` é para call permit e os argumentos correspondem aos da função dispatch mais o nonce.

O separador de domínio e o hash struct podem ser usados para construir o [hash final](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L153-L157){target=\_blank} da mensagem totalmente codificada. Um exemplo prático está no [contrato EIP712 do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4a9cc8b4918ef3736229a5cc5a310bdc17bf759f/contracts/utils/cryptography/draft-EIP712.sol#L101){target=\_blank}.

Com o hash final e os valores v, r e s, a assinatura pode ser [verificada e recuperada](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L211-L223){target=\_blank}. Se verificada com sucesso, o nonce é incrementado em um e a chamada é despachada.

## Preparar os contratos {: #setup-the-example-contract }

Neste exemplo, você aprenderá a assinar um call permit que atualiza uma mensagem em um contrato simples, [`SetMessage.sol`](#example-contract). Antes de gerar a assinatura do call permit, é preciso implantar o contrato e definir os argumentos da função `dispatch` para o permit.

Depois de configurar o contrato de exemplo, você poderá configurar o contrato do Call Permit Precompile.

### Verificando Pré-requisitos {: #checking-prerequisites }

Para acompanhar este tutorial, configure sua carteira para sua rede EVM e tenha uma conta com tokens nativos. Você pode adicionar sua rede EVM à MetaMask com um clique no [Tanssi dApp](https://apps.tanssi.network/){target=\_blank}. Ou [configurar a MetaMask para a Tanssi com a rede EVM de demonstração](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

### Contrato de Exemplo {: #example-contract }

O contrato `SetMessage.sol` é perfeito para demonstrar o uso do Call Permit Precompile.

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/precompiles/call-permit/set-message.sol'
```

### Configuração do Remix {: #remix-set-up }

Você pode usar o [Remix](https://remix.ethereum.org/){target=\_blank} para compilar e implantar o contrato de exemplo. Tenha uma cópia de [`SetMessage.sol`](#example-contract){target=\_blank} e de [`CallPermit.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/CallPermit.sol){target=\_blank}. Para adicioná-los ao Remix:

1. Clique na aba **File explorer** 
2. Cole o contrato `CallPermit.sol` em um arquivo do Remix chamado `CallPermit.sol`
3. Cole o contrato `SetMessage.sol` em um arquivo do Remix chamado `SetMessage.sol`

![Copiando e colando o contrato de exemplo no Remix](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-1.webp)

### Compile e implante o contrato de exemplo {: #compile-deploy-example-contract }

Primeiro, compile o contrato de exemplo:

1. Clique na aba **Compile**
2. Para compilar a interface, clique em **Compile SetMessage.sol**

![Compiling SetMessage.sol](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-2.webp)

Em seguida, implante-o:

1. Clique na aba **Deploy and Run**, logo abaixo da aba **Compile** no Remix. Observação: aqui você está implantando um contrato
2. Certifique-se de que **Injected Provider - Metamask** está selecionado no menu **ENVIRONMENT**
3. Garanta que **SetMessage.sol** esteja selecionado no menu **CONTRACT**
4. Clique em **Deploy**
5. A MetaMask aparecerá e você deverá **Confirmar** a transação

![Provide the address](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-3.webp)

O contrato aparecerá na lista de **Deployed Contracts** no painel à esquerda. Copie o endereço do contrato, pois você precisará dele para gerar a assinatura do call permit na próxima seção.

### Compile e acesse o Call Permit Precompile {: #compile-access-call-permit }

Primeiro, compile o contrato Call Permit Precompile:

1. Clique na aba **Compile**
2. Para compilar a interface, clique em **Compile CallPermit.sol**

![Compiling SetMessage.sol](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-4.webp)

Depois, em vez de implantar o contrato, basta acessá-lo informando o endereço do precompile:

1. Clique na aba **Deploy and Run**, logo abaixo da aba **Compile** no Remix. Observação: aqui você não implanta um contrato; apenas acessa um contrato pré-compilado já implantado
2. Certifique-se de que **Injected Provider - Metamask** está selecionado no menu **ENVIRONMENT**
3. Garanta que **CallPermit.sol** esteja selecionado no menu **CONTRACT**. Como é um contrato pré-compilado, não há etapa de deployment. Forneça o endereço do precompile no campo **At Address**
4. Forneça o endereço do Call Permit Precompile para redes EVM powered by Tanssi: `{{networks.demo_evm.precompiles.call_permit}}` e clique em **At Address**
5. O Call Permit Precompile aparecerá na lista de **Deployed Contracts**

![Provide the address](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-5.webp)

## Gerar a Assinatura do Call Permit {: #generate-call-permit-signature}

Para interagir com o Call Permit Precompile, você precisa ter ou gerar uma assinatura para despachar o call permit. Há várias formas de gerar a assinatura. Este guia mostra como fazê-lo usando o [Ethers.js](https://docs.ethers.org/v6/){target=\_blank}.

Veja um resumo dos passos para obter a assinatura:

1. Criar a `message`, incluindo parte dos dados necessários para o call permit: os argumentos da função `dispatch` e o nonce do signatário
2. Montar a estrutura JSON dos dados a serem assinados, incluindo todos os tipos dos argumentos de `dispatch` e o nonce. Isso gera o tipo `CallPermit`, salvo como `primaryType`
3. Criar o domain separator usando exatamente `"Call Permit Precompile"` para o nome, a versão do seu dApp ou plataforma, o Chain ID da rede em que a assinatura será usada e o endereço do contrato que verificará a assinatura. Você deve especificar o Chain ID da sua rede no script para gerar a assinatura correta
4. Assinar todos os dados montados usando Ethers.js
5. A assinatura será retornada; use o [`Signature.from`](https://docs.ethers.org/v6/api/crypto/#Signature_from){target=\_blank} do Ethers.js para obter os valores `v`, `r` e `s`

### Argumentos do Call Permit {: #call-permit-arguments }

Como visto na seção [Interface do Call Permit](#the-call-permit-interface), a função `dispatch` recebe os parâmetros: `from`, `to`, `value`, `data`, `gasLimit`, `deadline`, `v`, `r` e `s`.

Para obter os argumentos da assinatura (`v`, `r` e `s`), você deve assinar uma mensagem contendo os argumentos para os demais parâmetros acima, além do nonce do signatário.

- `from` - endereço da conta com a qual você assinará o call permit
- `to` - endereço do contrato `SetMessage.sol`
- `value` - pode ser `0` neste exemplo, já que apenas definiremos uma mensagem (sem transferir fundos)
- `data` - você pode enviar qualquer mensagem; precisa da representação hex da mensagem a definir no contrato `SetMessage.sol`. Ela inclui o function selector da função `set` e a string da mensagem. Para este exemplo, use `hello world` com a seguinte representação hex:
     ```text
     0x4ed3885e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c64000000000000000000000000000000000000000000
     ```
- `gasLimit` - `100000` é suficiente para enviar a chamada despachada
- `deadline` - obtenha o horário UNIX atual executando `console.log(Date.now())` em um script JavaScript ou no console do navegador. Depois, adicione segundos extras para definir quando o call permit expira

O nonce do signatário também é necessário. Se for a primeira vez que assina um call permit, o nonce será `0`. Você também pode verificar o nonce no Remix:

1. Expanda o contrato do call permit
2. Ao lado da função **nonces**, insira o endereço do signatário e clique em **nonces**
3. O resultado aparecerá logo abaixo da função

![Get the nonce](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-6.webp)

### Use Ethers para Criar a Assinatura {: #use-ethers-to-create-the-signature }

Para gerar a assinatura do call permit usando JavaScript e Ethers, primeiro crie um projeto local:

```bash
mkdir call-permit-example && cd call-permit-example && touch getSignature.js
npm init -y
```

Agora você tem um arquivo para o script e um `package.json`. Abra o `package.json` e abaixo de `"dependencies"` adicione:

```json
"type": "module"
```

Em seguida, instale o [Ethers.js](https://docs.ethers.org/v6/){target=\_blank}:

```bash
npm i ethers
```

!!! remember
    Nunca revele suas chaves privadas, pois elas dão acesso direto aos fundos. Os passos a seguir são apenas demonstrativos.

No arquivo `getSignature.js`, copie e edite o trecho a seguir. Além dos campos discutidos na seção [Argumentos do Call Permit](#call-permit-arguments), você deve inserir o Chain ID da sua rede no Domain Separator para gerar a assinatura corretamente. Se usar um Chain ID incorreto, a assinatura será inválida e nenhuma transação poderá ser despachada.

???+ code "getSignature.js"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/call-permit/getSignature.js'
    ```

Para executar o script:

```bash
node getSignature.js
```

No console, você verá a assinatura concatenada e os valores `v`, `r` e `s`. Copie-os, pois serão usados ao interagir com o Call Permit Precompile nas próximas seções.

![Signature values in the console](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-7.webp)

!!! note
    Tome cuidado ao copiar os valores `v`, `r` e `s` para o método `dispatch` do precompile. A ordem no precompile pode não coincidir com a ordem de saída do script.

## Interaja com a Interface Solidity {: #interact-with-the-solidity-interface }

Agora que você gerou a assinatura do call permit, poderá testar a chamada da função `dispatch` do Call Permit Precompile.

### Despachar uma Chamada {: #dispatch-a-call }

Ao enviar a função `dispatch`, use os mesmos argumentos que serviram para assinar o call permit. Para começar, volte à aba **Deploy and Run** no Remix e, em **Deployed Contracts**, expanda o contrato do call permit. Certifique-se de estar conectado à conta que consumirá o call permit e pagará as taxas. Em seguida:

1. No campo **from**, informe o endereço da conta usada para assinar o call permit
2. Copie e cole o endereço do contrato `SetMessage.sol`
3. Informe `0` no campo **value**
4. Insira a representação hex do function selector da função `set` e a string que deseja definir como mensagem no contrato `SetMessage.sol`. Para este exemplo, use `hello world`:
     ```text
     0x4ed3885e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c64000000000000000000000000000000000000000000
     ```
5. Informe `100000` no campo **gasLimit**
6. Informe o `deadline` usado ao assinar o call permit
7. Copie o valor `v` obtido ao gerar a assinatura do call permit e cole em **v**
8. Copie o valor `r` obtido ao gerar a assinatura do call permit e cole em **r**
9. Copie o valor `s` obtido ao gerar a assinatura do call permit e cole em **s**
10. Clique em **transact** para enviar a transação
11. A MetaMask aparecerá para confirmar; clique em **Confirm**

![Dispatch the call permit](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-8.webp)

Quando a transação for concluída, você poderá verificar se a mensagem foi atualizada para `hello world`. Para isso:

1. Expanda o contrato `SetMessage.sol`
2. Clique em **get**
3. O resultado aparecerá abaixo da função e deve exibir `hello world`

![Verify the dispatch was executed as intended](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-9.webp)

Parabéns! Você gerou uma assinatura de call permit e a usou para despachar uma chamada em nome do signatário.

--8<-- 'text/_disclaimers/third-party-content.md'
