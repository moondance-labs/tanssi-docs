---
title: Como usar o thirdweb
description: Este guia mostra recursos do thirdweb, incluindo criar, testar e implantar templates de smart contracts para lançar dApps na Tanssi.
icon: octicons-code-square-24
categories: EVM-Template
---

# Usando thirdweb na Tanssi

## Introdução {: #introduction }

[thirdweb](https://thirdweb.com){target=\_blank} é um framework completo de desenvolvimento Web3 que fornece tudo o que você precisa para criar smart contracts, desenvolver dApps e muito mais.

Com o thirdweb, você acessa ferramentas para todas as fases do ciclo de desenvolvimento de dApps. É possível criar seus próprios contratos personalizados ou usar qualquer um dos contratos predefinidos do thirdweb para começar rapidamente. Em seguida, use a CLI do thirdweb para implantar seus smart contracts. Depois, interaja com eles criando uma aplicação Web3 na linguagem de sua escolha, incluindo, entre outras, React e TypeScript.

Este guia mostra alguns recursos do thirdweb que você pode usar para desenvolver smart contracts e dApps em redes EVM da Tanssi. Para ver todos os recursos que o thirdweb oferece, consulte o [site de documentação do thirdweb](https://portal.thirdweb.com){target=\_blank}.

## Criar Contrato {: #create-contract }

Para criar um novo smart contract usando a [CLI do thirdweb](https://portal.thirdweb.com/cli){target=\_blank}, siga estes passos:

1. No terminal, execute:

    ```bash
    npx thirdweb create contract
    ```

2. Informe suas preferências nos prompts da linha de comando:
    1. Dê um nome ao projeto
    2. Escolha o framework: **Hardhat** ou **Foundry**
    3. Nomeie seu smart contract
    4. Escolha o tipo de contrato base: **Empty**, **ERC20**, **ERC721** ou **ERC1155**
    5. Adicione as [extensões](https://portal.thirdweb.com/contracts/extensions){target=\_blank} desejadas
3. Após criar, navegue até o diretório do projeto e abra-o no editor de código de sua preferência
4. Ao abrir a pasta `contracts`, você encontrará seu smart contract escrito em Solidity

    O código a seguir é de um contrato `ERC721Base` sem extensões especificadas. Ele implementa toda a lógica contida no contrato [`ERC721Base.sol`](https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Base.sol){target=\_blank}, que por sua vez implementa o padrão [`ERC721A`](https://github.com/thirdweb-dev/contracts/blob/main/contracts/eip/ERC721A.sol){target=\_blank}.

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import '@thirdweb-dev/contracts/base/ERC721Base.sol';

    contract Contract is ERC721Base {
        constructor(
            string memory _name,
            string memory _symbol,
            address _royaltyRecipient,
            uint128 _royaltyBps
        ) ERC721Base(_name, _symbol, _royaltyRecipient, _royaltyBps) {}
    }
    ```

    Este contrato herda a funcionalidade de `ERC721Base` pelas etapas:

    - Importar o contrato `ERC721Base`
    - Declarar que seu contrato herda `ERC721Base`
    - Implementar os métodos necessários, como o builder

5. Depois de ajustar seu contrato com a lógica desejada, você pode implantá-lo em uma rede EVM da Tanssi usando o [Deploy](#deploy-contract). Isso é coberto na próxima seção!

Como alternativa, é possível implantar um contrato predefinido para NFTs, tokens ou marketplace diretamente na página Explore do thirdweb:

1. Acesse a [página Explore do thirdweb](https://thirdweb.com/explore){target=\_blank}

    ![Explorar contratos no thirdweb](/images/builders/toolkit/ethereum-api/dev-environments/thirdweb/thirdweb-1.webp)

2. Escolha o tipo de contrato que deseja implantar entre as opções disponíveis: NFTs, tokens, marketplace e mais
3. Siga os prompts na tela para configurar e implantar seu contrato

Para mais informações sobre os diferentes contratos disponíveis no Explore, consulte a [documentação do thirdweb sobre contratos predefinidos](https://portal.thirdweb.com/contracts){target=\_blank}.

## Implantar Contrato {: #deploy-contract }

O Deploy é a ferramenta do thirdweb que permite implantar um smart contract em qualquer rede compatível com EVM sem configurar URLs RPC, expor chaves privadas, escrever scripts ou outras etapas adicionais como verificação do contrato.

1. Para implantar seu smart contract usando o Deploy, navegue até o diretório `contracts` do projeto e execute:

    ```bash
    npx thirdweb deploy
    ```

    Executar este comando aciona as seguintes ações:

    - Compila todos os contratos no diretório atual
    - Oferece a opção de escolher quais contratos você deseja implantar
    - Envia o código-fonte (ABI) do seu contrato para o IPFS

2. Ao concluir, abrirá um dashboard para preencher os parâmetros:

    - `_name` - nome do contrato
    - `_symbol` - símbolo ou “ticker”
    - `_royaltyRecipient` - endereço da carteira que receberá royalties de vendas secundárias
    - `_royaltyBps` - basis points (bps) que serão pagos ao beneficiário a cada venda secundária, ex.: 500 = 5%

3. Selecione a rede desejada, por exemplo, a rede EVM de demonstração da Tanssi ou sua própria rede
4. Gerencie configurações adicionais no dashboard do contrato conforme necessário, como fazer upload de NFTs, configurar permissões e mais

    ![Implantar com thirdweb deploy](/images/builders/toolkit/ethereum-api/dev-environments/thirdweb/thirdweb-2.webp)

Para informações adicionais sobre o Deploy, consulte a [documentação do thirdweb](https://portal.thirdweb.com/contracts/){target=\_blank}.

## Criar Aplicação {: #create-application }

O thirdweb oferece SDKs para várias linguagens, como React, React Native, TypeScript e Unity. Você começará criando uma aplicação e depois poderá escolher qual SDK usar:

1. No terminal, execute:

    ```bash
    npx thirdweb create --app
    ```

2. Informe suas preferências nos prompts:

    1. Dê um nome ao projeto
    2. Escolha o framework: **Next.js**, **Vite** ou **React Native**. Para este exemplo, selecione **Vite**

3. Use o SDK de React ou TypeScript para interagir com as funções da sua aplicação. Isso será abordado na próxima seção sobre interação com contratos

### Especificar o Client ID {: #specify-client-id }

Antes de lançar seu dApp (localmente ou em produção), você deve ter um Client ID do thirdweb associado ao projeto. O Client ID do thirdweb equivale a uma chave de API. Você pode criar uma chave de API gratuita [fazendo login na sua conta do thirdweb, indo em **Settings** e clicando em **API Keys**](https://thirdweb.com/dashboard/settings/api-keys){target=\_blank}.

Clique em **Create API Key** e siga estes passos:

1. Dê um nome para sua chave de API
2. Informe os domínios permitidos para receber requisições. É recomendado permitir apenas os domínios necessários; para desenvolvimento, pode selecionar **Allow all domains**
3. Clique em **Next** e confirme o prompt na página seguinte

![Criar API key no thirdweb](/images/builders/toolkit/ethereum-api/dev-environments/thirdweb/thirdweb-3.webp)

!!! note
    O nome da variável do Client ID varia conforme o framework escolhido; por exemplo, no Vite será `VITE_TEMPLATE_CLIENT_ID`, no Next.js será `NEXT_PUBLIC_TEMPLATE_CLIENT_ID` e no React Native será `EXPO_PUBLIC_THIRDWEB_CLIENT_ID`.

Por fim, informe seu Client ID (API Key) no arquivo `.env`. O `.env` deve estar no diretório raiz do projeto (por exemplo, não na pasta `src`).

Se você gerou o app thirdweb com Vite, terá um arquivo `client.ts` parecido com o abaixo. Se você criou o `.env` com a chave de API do thirdweb definida em `VITE_TEMPLATE_CLIENT_ID`, pode deixar o `client.ts` como está e seguir para a próxima seção.

```typescript title="client.ts"
import { createThirdwebClient } from 'thirdweb';

// Substitua pela sua string de client ID.
// Consulte https://portal.thirdweb.com/typescript/v5/client para obter um client ID
const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: clientId,
});
```

!!! note
    Se você não criar um Client ID e não o especificar corretamente no `.env`, verá uma tela em branco ao tentar gerar o app. Não aparece mensagem de erro sem abrir o console, então certifique-se de configurar o Client ID corretamente.

### Executar Localmente {: #run-locally }

Para executar seu dApp localmente para testes e depuração, use:

```bash
yarn dev
```

O app será compilado e mostrará o host e a porta para acessar no navegador.

![Executar thirdweb localmente](/images/builders/toolkit/ethereum-api/dev-environments/thirdweb/thirdweb-4.webp)

### Configurar Rede {: #configure-chain }

O thirdweb oferece poucas redes em `@thirdweb/chains` e não inclui as redes Tanssi, então você precisa especificar os detalhes da rede, como Chain ID e URL RPC. Crie uma rede personalizada com [`defineChain`](https://portal.thirdweb.com/references/typescript/v5/defineChain){target=\_blank}:

```typescript title="chains.ts"
    import { defineChain } from 'thirdweb';
    const tanssi = defineChain({
      id: {{ networks.dancelight.demo_evm_chain_id }},
      rpc: '{{ networks.dancelight.demo_evm_rpc_url }}',
    });
```

## thirdweb SDK {: #thirdweb-sdk }

As seções a seguir dão uma visão geral de métodos fundamentais do SDK do thirdweb e como interagir com eles. Cada trecho de código mostra os imports relevantes e demonstra o uso em um cenário típico. Este guia serve como referência rápida para os métodos mais comuns do thirdweb usados por desenvolvedores de dApps. Para detalhes de todos os recursos do thirdweb, visite o [site de documentação](https://portal.thirdweb.com/){target=\_blank}.

### Contas e Carteiras {: #accounts-and-wallets }

O thirdweb diferencia contas e carteiras no SDK. Para o SDK, uma conta sempre tem um endereço de blockchain e pode assinar mensagens, transações e dados tipados, mas não pode ser “conectada” ou “desconectada”. Já uma carteira contém uma ou mais contas, pode ser conectada ou desconectada e delega a assinatura às contas.

O snippet abaixo mostra como inicializar e conectar uma carteira MetaMask com o SDK do thirdweb, depois assinar e enviar uma transação recuperando o hash. Esse processo se aplica a qualquer um dos mais de 300 conectores de carteira suportados pelo SDK.

???+ code "initialize.ts"
    ```typescript
    --8<-- 'code/builders/toolkit/ethereum-api/dev-env/thirdweb/initialize.ts'
    ```

### Obter contrato {: #get-contract }

Para conectar ao seu contrato, use o método [`getContract`](https://portal.thirdweb.com/references/typescript/v5/getContract){target=\_blank} do SDK. Por exemplo, você pode buscar dados de um [contrato incrementer na rede EVM de demonstração da Tanssi]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D?tab=contract){target=\_blank}.

```typescript
import { getContract } from 'thirdweb';
import { client } from './client';

const myContract = getContract({
  client,
  chain: tanssi,
  address: 0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D, // Endereço do contrato Incrementer na demo EVM
  abi: '[{\"inputs\":[],\"name\":\"increment\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"number\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"timestamp\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]';
});
```

### Chamar funções do contrato {: #calling-contract-functions }

Para chamar um contrato na versão mais recente do SDK, use [`prepareContractCall`](https://portal.thirdweb.com/typescript/v5/transactions/prepare){target=\_blank}.

```typescript
import { prepareContractCall, toWei } from 'thirdweb';

const tx = prepareContractCall({
  contract,
  // Assine a função que deseja chamar
  method: 'function mintTo(address to, uint256 amount)',
  // Passe os parâmetros para o método.
  // Os tipos são inferidos automaticamente pela assinatura
  params: ['0x123...', toWei('100')],
});
```

Voltando ao [contrato incrementer]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D?tab=contract){target=\_blank}, preparar uma chamada para incrementar o contrato fica assim:

```typescript
import { prepareContractCall } from 'thirdweb';

const tx = prepareContractCall({
  contract,
  // Assine a função que deseja chamar
  method: 'function increment()',
  // Increment não recebe parâmetros, então deixe um array vazio
  params: [],
});
```

### Preparar transações brutas {: #preparing-raw-transactions }

Você também pode preparar uma transação diretamente com dados codificados. Para isso, use o método [`prepareTransaction`](https://portal.thirdweb.com/typescript/v5/transactions/prepare){target=\_blank} do thirdweb e especifique diretamente `to`, `value`, `chain` e `client`.

```typescript
import { prepareTransaction, toWei } from 'thirdweb';

const transaction = prepareTransaction({
  // Conta que receberá
  to: '0x456...',
  // Valor em ether a enviar na transação
  value: toWei('1'),
  // Rede onde a transação será executada. Assume que você já configurou
  // a rede EVM demo da Tanssi como chain personalizada, conforme mostrado na seção de configuração
  chain: tanssi,
  // Seu client thirdweb
  client,
});
```

### Ler Estado do Contrato {: #read-contract-state }

Use a função [`readContract`](https://portal.thirdweb.com/typescript/v5/transactions/read){target=\_blank} para chamar funções de leitura do contrato informando a assinatura do método Solidity e eventuais parâmetros.

```typescript
import { readContract } from 'thirdweb';

const balance = await readContract({
  contract: contract,
  method: 'function balanceOf(address) view returns (uint256)',
  params: ['0x123...'],
});
```

Para uma função sem parâmetros, como `number`, que retorna o número atual armazenado no [contrato incrementer]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D?tab=contract){target=\_blank}, basta informar o nome da função:

```typescript
import { readContract } from 'thirdweb';

const number = await readContract({
  contract: contract,
  method: 'number',
  params: [],
});
```

Você sabia? Com a [CLI do thirdweb](https://portal.thirdweb.com/cli){target=\_blank}, você gera facilmente funções para todas as chamadas possíveis de um contrato. Para isso, execute:

```bash
npx thirdweb generate INSERT_CHAIN_ID/INSERT_CONTRACT_ADDRESS
```

Chain ID e endereço do contrato são obrigatórios. Por exemplo, para gerar funções do [contrato incrementer na demo EVM da Tanssi]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D?tab=contract){target=\_blank}, use:

```bash
npx thirdweb generate {{ networks.dancelight.demo_evm_chain_id }}/0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D
```

O arquivo gerado com todos os métodos correspondentes ficará em `thirdweb/CHAIN_ID/CONTRACT_ADDRESS`. No exemplo acima, o arquivo de saída fica em `thirdweb/{{ networks.dancelight.demo_evm_chain_id }}/0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D.ts`. Para mais informações, veja a [documentação do thirdweb sobre a CLI](https://portal.thirdweb.com/cli/generate){target=\_blank}.

### Enviar uma Transação {: #sending-a-transaction }

Toda transação enviada com o SDK precisa ser preparada primeiro. Essa preparação é síncrona e leve, sem requisições de rede. Além disso, fornece definições type-safe para as chamadas de contrato.

Você pode preparar uma transação assim:

```typescript title="Prepare uma transação"
import { prepareTransaction, toWei } from 'thirdweb';

const transaction = prepareTransaction({
  to: '0x1234567890123456789012345678901234567890',
  chain: tanssi,
  client: thirdwebClient,
  value: toWei('1.0'),
  gasPrice: 150n,
});
```

Depois de preparada, envie a transação assim:

```typescript title="Enviar uma transação"
import { sendTransaction } from 'thirdweb';

const { transactionHash } = await sendTransaction({
  account,
  transaction,
});
```

Opcionalmente, use `sendAndConfirmTransaction` para aguardar a mineração. Isso é útil se você quiser bloquear o usuário até a confirmação.

```typescript title="Enviar e confirmar uma transação"
import { sendAndConfirmTransaction } from 'thirdweb';
import { createWallet } from 'thirdweb/wallets';

const wallet = createWallet('io.metamask');
const account = await wallet.connect({ client });

const receipt = await sendAndConfirmTransaction({
  transaction,
  account,
});
```

### Utilidades de Transação {: #transaction-utilites }

O thirdweb fornece diversos utilitários para preparar e enviar transações.

Você pode estimar o gas usado por uma transação:

```typescript title="Estimando gas"
import { estimateGas } from 'thirdweb';

const gasEstimate = await estimateGas({ transaction });
console.log('gas estimado', gasEstimate);
```

Também é possível estimar o custo em Ether e Wei:

```typescript title="Estimando custo de gas"
import { estimateGas } from 'thirdweb';

const gasCost = await estimateGasCost({ transaction });
console.log('custo em ether', gasCost.ether);
```

O thirdweb também oferece uma forma prática de simular transações e verificar a integridade antes de submetê-las. Você pode simular uma transação assim:

```typescript title="Simular uma transação"
import { simulateTransaction } from 'thirdweb';

const result = await simulateTransaction({ transaction });
console.log('resultado da simulação', result);
```

Você pode codificar dados da transação para usar depois:

```typescript title="Codificar dados da transação"
import { encode } from 'thirdweb';

const data = await encode(transaction);
console.log('dados codificados', data);
```

### ConnectButton {: #connect-button }

Provavelmente a primeira interação do usuário com seu dApp será conectar a carteira. O thirdweb fornece uma maneira fácil e altamente personalizável de habilitar isso. O [`ConnectButton`](https://portal.thirdweb.com/react/v5/components/ConnectButton){target=\_blank} pode ser adaptado às carteiras desejadas. O `ConnectButton` aceita um parâmetro opcional `wallets` com um array de carteiras. Você pode adicionar ou remover carteiras do array para alterar as opções disponíveis aos usuários. O thirdweb também oferece um [Playground do ConnectButton](https://thirdweb.com/dashboard/connect/playground){target=\_blank} para personalizar e ver as alterações em tempo real, dada a alta flexibilidade do botão.

```typescript title="ConnectButton"
import { ConnectButton } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
 
const wallets = [
  inAppWallet(),
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('me.rainbow'),
];
 
function Example() {
  return (
    <div>
      <ConnectButton client={client} wallets={wallets} />
    </div>
  );
}
```

## Implantar a Aplicação {: #deploy-application }

Relembrando, você pode compilar o projeto de exemplo localmente executando:

```bash
yarn dev
```

Para hospedar sua aplicação web estática em armazenamento descentralizado, execute:

```bash
npx thirdweb deploy --app
```

Executar esse comando cria a build de produção e armazena usando o [Storage](https://portal.thirdweb.com/references/typescript/v5/functions#storage){target=\_blank}, a solução descentralizada de arquivos do thirdweb. Ele envia a aplicação construída para o IPFS, uma rede de armazenamento descentralizada, e gera uma URL única que fornece um local persistente para hospedar sua aplicação na web.

Se tiver dúvidas ou encontrar problemas durante o processo, contate o suporte do thirdweb em [support.thirdweb.com](http://support.thirdweb.com){target=\_blank}.

--8<-- 'text/_disclaimers/third-party-content.md'
