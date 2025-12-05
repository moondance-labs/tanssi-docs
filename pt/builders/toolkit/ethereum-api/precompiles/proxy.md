---
title: Proxy Precompile
description: Saiba como interagir com o Proxy Precompile para adicionar e remover contas proxy que executam transações em nome de outra conta.
keywords: solidity, ethereum, proxy, tanssi, precompiled, contracts, substrate
icon: octicons-shield-lock-24
categories: EVM-Template
---

# Interagindo com o Proxy Precompile

## Introdução {: #introduction }

A Proxy Precompile permite que as contas definam contas proxy por meio da API Ethereum. As contas proxy podem realizar ações limitadas em nome da conta com proxy, como governança, transferências de saldo, gerenciamento ou transações privilegiadas, entre outras.

Se um usuário quisesse fornecer a outro usuário acesso a um número limitado de ações em seu nome, tradicionalmente, o único método para fazê-lo seria compartilhar a chave privada dessa conta. No entanto, as redes EVM com tecnologia Tanssi incluem o módulo proxy, fornecendo uma camada adicional de segurança. Com proxies, muitas contas podem realizar ações para uma conta primária, e tais permissões podem ser revogadas a qualquer momento. Isto é melhor se, por exemplo, um usuário quiser manter sua carteira segura em armazenamento a frio, mas ainda quiser acessar partes da funcionalidade da carteira, como governança ou staking.

!!! nota
    O Proxy Precompile só pode ser chamado de uma Externally Owned Account (EOA) ou pela [Batch Precompile](/pt/builders/toolkit/ethereum-api/precompiles/batch/){target=\_blank}.

Para saber mais sobre contas proxy e como configurá-las para seus próprios propósitos sem o uso do Proxy Precompile, visite a página [Proxy Accounts](/pt/builders/account-management/proxy-accounts/){target=\_blank}.

A Proxy Precompile está localizada no seguinte endereço:

```text
{{networks.demo_evm.precompiles.proxy}}
```

--8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/security-note.md'

## Pré-requisitos {: #prerequisites }

Para acompanhar o conteúdo deste guia, você precisará:

- Acesso a uma rede EVM com tecnologia Tanssi executando [runtime 700](https://github.com/moondance-labs/tanssi/releases/tag/runtime-700){target=\_blank} ou superior
- Uma [carteira compatível com EVM](/pt/builders/toolkit/ethereum-api/wallets/){target=\_blank} configurada para funcionar com sua rede. Você também pode conectar sua carteira à [rede EVM de demonstração](https://apps.tanssi.network/demo){target=\_blank}
- Uma conta com fundos suficientes para pagar as taxas e depósitos necessários
- Uma segunda conta que você controla para usar como proxy

## A Interface Solidity do Proxy {: #the-proxy-solidity-interface }

[`Proxy.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/Proxy.sol){target=\_blank} é uma interface que permite que desenvolvedores interajam com as funções da precompilação.

??? code "Proxy.sol"

    ```solidity

    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/proxy/proxy.sol'

    ```


A interface inclui as estruturas de dados necessárias, juntamente com as seguintes funções:

???+ function "**addProxy**(delegate, proxyType, delay) — registra uma conta proxy para o remetente após um número especificado de blocos `delay` (geralmente zero). Falhará se um proxy para o chamador já existir"

    === "Parâmetros"

        - `delegate` ++"address"++ - o endereço do proxy
        - `proxyType` ++"ProxyType"++ - o tipo de delegação que define as funções específicas que o proxy terá permissão para executar
        - `delay` ++"uint32"++ - número de blocos a esperar até que o proxy seja habilitado

    === "Exemplo"

        - `delegate` - 0x3f0Aef9Bd799F1291b80376aD57530D353ab0217
        - `proxyType` - "Any"
        - `delay` - 0


??? function "**removeProxy**(delegate, proxyType, delay) — remove um proxy registrado para o remetente"

    
    === "Parâmetros"

        - `delegate` ++"address"++ - o endereço do proxy a ser removido
        - `proxyType` ++"ProxyType"++ - o tipo de delegação a ser removido
        - `delay` ++"uint32"++ - número de blocos a esperar até que a remoção entre em vigor

    === "Exemplo"

        - `delegate` - 0x3f0Aef9Bd799F1291b80376aD57530D353ab0217
        - `proxyType` - "Any"
        - `delay` - 0
    

??? function "**removeProxies**() — remove todas as contas proxy delegadas ao remetente"

??? function "**isProxy**(real, delegate, proxyType, delay) — retorna `true` se o endereço delegado for um proxy do tipo `proxyType`, para o endereço `real`, com o `delay` especificado"

    
    === "Parâmetros"

        - `real` ++"address"++ - a conta que concede permissões ao proxy
        - `delegate` ++"address"++ - o endereço do proxy
        - `proxyType` ++"ProxyType"++ - o tipo de delegação
        - `delay` ++"uint32"++ - número de blocos a aguardar

    === "Exemplo"

        - `delegate` - 0xbB8919d5DDfc85F4D15820a9e58018f1cfB39a2F
        - `proxyType` - "Any"
        - `delay` - 0

    

[O parâmetro `proxyType`](#proxy-types) é definido pela seguinte enumeração `ProxyType`, onde os valores começam em `0` com o tipo de proxy mais permissivo e são representados como valores `uint8`:

```solidity

enum ProxyType {
    Any,
    NonTransfer,
    Governance,
    Staking,
    CancelProxy,
    Balances,
    AuthorMapping,
    IdentityJudgement
}
```

### Tipos de Proxy {: #proxy-types }

Há vários tipos de funções de proxy que podem ser delegadas a contas, representadas em `Proxy.sol` através da enumeração `ProxyType`. A lista a seguir inclui todos os proxies possíveis e o tipo de transações que eles podem fazer em nome da conta principal:

- **Any** — o proxy any permitirá que a conta proxy faça qualquer tipo de transação. Observe que as transferências de saldo só são permitidas para EOAs, não para contratos ou Precompiles
- **NonTransfer** — o proxy de não transferência permite que a conta proxy faça qualquer tipo de transação em que o `msg.value` seja verificado como zero
- **Governance** - o proxy de governança permitirá que a conta proxy faça qualquer tipo de transação relacionada à governança
- **CancelProxy** - o proxy de cancelamento permitirá que a conta proxy rejeite e remova anúncios de proxy atrasados ​​(da conta principal). Atualmente, esta não é uma ação suportada pelo Proxy Precompile
- **Balances** - o proxy de saldos permitirá que a conta proxy faça apenas transferências de saldo para EOAs

!!! nota
    A interface Solidity contém mais tipos de proxy do que os listados acima. A lista anterior inclui apenas os tipos de proxy implementados no [baseline EVM Template](/builders/build/templates/evm/){target=\_blank}.

## Interaja com a interface Solidity via Remix {: #interact-with-the-solidity-interface-via-remix }

Esta seção irá guiá-lo pelas etapas para criar um proxy, verificar sua criação e revogar os privilégios do proxy. Estes exemplos são baseados na [Tanssi demo EVM Network](https://apps.tanssi.network/demo){target=\_blank} e usam [Metamask](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}. Este guia pode ser adaptado para sua própria rede EVM com tecnologia Tanssi adicionando a URL RPC da sua rede para a carteira EVM de sua escolha.

### Configuração do Remix {: #remix-set-up }

Você pode interagir com a precompilação do Proxy usando [Remix](https://remix.ethereum.org){target=\_blank}. Para adicionar a precompilação ao Remix, você precisará:

1. Obter uma cópia de [`Proxy.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/Proxy.sol){target=\_blank}
2. Cole o conteúdo do arquivo em um arquivo Remix chamado `Proxy.sol`

### Compile o Contrato {: #compile-the-contract }

Em seguida, você precisará compilar a interface no Remix:

1. Clique na guia **Compilar**, a segunda de cima
2. Em seguida, para compilar a interface, clique em **Compilar Proxy.sol**

![Compilando Proxy.sol](/images/builders/toolkit/ethereum-api/precompiles/proxy/proxy-1.webp)

Quando a compilação estiver concluída, você verá uma marca de seleção verde ao lado da guia **Compilar**.

### Acessar o Contrato {: #access-the-contract }

Em vez de implantar o contrato inteligente, você acessará a interface através de seu endereço:

1. Clique na guia **Deploy and Run** diretamente abaixo da guia **Compile** no Remix
2. Certifique-se de que **Injected Provider - Metamask** esteja selecionado no menu suspenso **ENVIRONMENT**. Você pode ser solicitado pelo MetaMask para conectar sua conta ao Remix, caso ainda não esteja conectado
3. Certifique-se de que a conta primária seja exibida em **ACCOUNT**
4. Certifique-se de que **Proxy - Proxy.sol** esteja selecionado no menu suspenso **CONTRACT**. Dado que é um contrato pré-compilado, não há etapa de implantação. Em vez disso, você fornecerá o endereço da precompilação no campo **At Address**
5. Forneça o endereço da precompilação do Proxy (que é `{{networks.demo_evm.precompiles.proxy}}` neste exemplo) e clique em **At Address**
6. A precompilação do **Proxy** aparecerá na lista de **Deployed Contracts**
![Acessar o endereço](/images/builders/toolkit/ethereum-api/precompiles/proxy/proxy-2.webp)

### Adicionar um Proxy {: #add-proxy }

Você pode adicionar proxies para sua conta chamando as funções de precompilação. No exemplo a seguir, você adicionará um proxy autorizado a executar qualquer transação em seu nome:

1. Expanda o contrato Proxy Precompile para ver as funções disponíveis
2. Encontre a função **addProxy** e pressione o botão para expandir a seção
3. Insira o endereço de sua segunda conta como **delegate**, `0` como **proxyType**, o que significa `any`, e `0` como **delay**
4. Clique em **transact**
5. O MetaMask aparecerá e você será solicitado a revisar os detalhes da transação. Clique em Confirmar para executar a transação

!!! nota
    Ao construir a transação no Remix, o **proxyType** é representado como um `uint8`, em vez do enum `ProxyType` esperado. Em Solidity, os enums são compilados como `uint8`, então, quando você passa `0` para **proxyType**, você indica o primeiro elemento no enum `ProxyType`, que é o proxy `any`.

![Chamar a função addProxy](/images/builders/toolkit/ethereum-api/precompiles/proxy/proxy-3.webp)

### Verifique uma existência de Proxy {: #check-proxy }

A função `isProxy` verifica se uma conta proxy existe. Após criar um proxy na [etapa anterior](#add-proxy), use os mesmos parâmetros para verificar se o proxy foi adicionado com sucesso:

1. Expanda a função **isProxy**
2. Insira sua conta principal como **real**, sua segunda conta (proxy) como **delegate**, `0` como **proxyType** e `0` como **delay**
3. Clique em **call**
4. As funções retornam se existe um proxy ou não. Neste exemplo, o proxy existe, portanto, a função retorna `true`

![Chamar a função isProxy](/images/builders/toolkit/ethereum-api/precompiles/proxy/proxy-4.webp)

### Remover um Proxy {: #remove-proxy }

Você pode revogar uma permissão de proxy quando não for mais necessária. Após criar um proxy na [Adicionar Proxy](#add-proxy), etapa, ele pode ser removido seguindo estas etapas:

1. Expanda a função **removeProxy**
2. Insira a conta proxy como **delegate**, `0` como **proxyType** e `0` como **delay**
3. Clique em **transact**
4. O MetaMask aparecerá e você será solicitado a revisar os detalhes da transação. Clique em Confirmar para executar a transação

Depois que a transação for confirmada, se você repetir as etapas para [verificar a existência de um proxy](#check-proxy), o resultado deverá ser `false`.

![Chamar a função removeProxy](/images/builders/toolkit/ethereum-api/precompiles/proxy/proxy-5.webp)

E é isso! Você interagiu com sucesso com a precompilação do Proxy usando MetaMask e Remix!

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
