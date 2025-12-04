---
title: Como usar o thirdweb
description: Este guia mostra recursos do thirdweb, incluindo criar, testar e implantar contratos para lançar dApps na Tanssi.
icon: octicons-code-square-24
categories: EVM-Template
---

# Usando thirdweb na Tanssi

## Introdução {: #introduction }

[thirdweb](https://thirdweb.com){target=_blank} é um framework completo de desenvolvimento Web3 com ferramentas para criar contratos, dApps e muito mais. Você pode usar contratos predefinidos ou criar os seus, implantar via CLI e interagir com SDKs em várias linguagens (React, TypeScript, etc.). Para ver tudo o que o thirdweb oferece, consulte a [documentação oficial](https://portal.thirdweb.com){target=_blank}.

## Criar contrato {: #create-contract }

Para criar um novo contrato com a [CLI do thirdweb](https://portal.thirdweb.com/cli){target=_blank}:

1. No terminal:
   ```bash
   npx thirdweb create contract
   ```
2. Responda aos prompts:
   - Nome do projeto
   - Framework: **Hardhat** ou **Foundry**
   - Nome do contrato
   - Tipo base: **Empty**, **ERC20**, **ERC721**, ou **ERC1155**
   - Extensões opcionais ([lista](https://portal.thirdweb.com/contracts/extensions){target=_blank})
3. Abra o projeto no editor; o contrato estará em `contracts/`.

Exemplo de contrato `ERC721Base` sem extensões:

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

Ele herda `ERC721Base` importando o contrato, declarando a herança e implementando o construtor.

Depois de ajustar a lógica, implante na rede EVM da Tanssi (veja [Implantar](#deploy-contract)).

Também é possível implantar contratos prontos (NFT, token, marketplace) direto da página Explore:

1. Acesse a [página Explore](https://thirdweb.com/explore){target=_blank}
2. Escolha o tipo de contrato
3. Siga os prompts para configurar e implantar

## Implantar contrato {: #deploy-contract }

O `deploy` do thirdweb implanta contratos em qualquer rede EVM sem expor chave privada ou configurar RPC manualmente.

1. No diretório `contracts` do projeto, execute:
   ```bash
   npx thirdweb deploy
   ```
   Isso compila os contratos, permite escolher qual implantar e envia o ABI para o IPFS.
2. No dashboard que abre, preencha parâmetros como:
   - `_name` – nome do contrato
   - `_symbol` – símbolo
   - `_royaltyRecipient` – carteira que recebe royalties de vendas secundárias
   - `_royaltyBps` – basis points (ex.: 500 = 5%)
3. Selecione a rede (demo EVM da Tanssi ou sua própria).
4. Ajuste configurações extras no dashboard (subir NFTs, permissões, etc.).

![thirdweb deploy](/images/builders/toolkit/ethereum-api/dev-environments/thirdweb/thirdweb-2.webp)

Mais detalhes em [thirdweb Deploy](https://portal.thirdweb.com/contracts/){target=_blank}.

## Criar aplicação {: #create-application }

O thirdweb oferece SDKs para React, React Native, TypeScript, Unity, etc. Para criar um app:

1. No terminal:
   ```bash
   npx thirdweb create --app
   ```
2. Escolha:
   - Nome do projeto
   - Framework: **Next.js**, **Vite** ou **React Native** (exemplo usa Vite)

Depois use o SDK (React/TypeScript) para interagir com o contrato.

### Informar Client ID {: #specify-client-id }

Você precisa de um Client ID (API key) do thirdweb. Crie um gratuitamente em [Settings → API Keys](https://thirdweb.com/dashboard/settings/api-keys){target=_blank}:

1. Dê um nome ao API key
2. Defina domínios permitidos (para dev, pode permitir todos)
3. Confirme

Coloque o Client ID no `.env` na raiz do projeto. Exemplo (app Vite) em `client.ts`:

```typescript title="client.ts"
import { createThirdwebClient } from 'thirdweb';

// Substitua pelo seu Client ID
const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: clientId,
});
```

!!! nota
    Se não definir o Client ID corretamente no `.env`, o app pode aparecer em branco. Corrija o Client ID primeiro.

### Rodar localmente {: #run-locally }

Para testar local:

```bash
yarn dev
```

Veja o endereço/porta no console e abra no navegador.

### Configurar chain {: #configure-chain }

Como Tanssi não vem na lista padrão de `@thirdweb/chains`, defina uma chain customizada com [`defineChain`](https://portal.thirdweb.com/references/typescript/v5/defineChain){target=_blank}:

```typescript title="chains.ts"
import { defineChain } from 'thirdweb';
const tanssi = defineChain({
  id: {{ networks.dancelight.demo_evm_chain_id }},
  rpc: '{{ networks.dancelight.demo_evm_rpc_url }}',
});
```

## SDK do thirdweb {: #thirdweb-sdk }

Resumo de métodos comuns do SDK:

### Contas e carteiras {: #accounts-and-wallets }

Conta (SDK) = um endereço capaz de assinar; não “conecta/desconecta”. Carteira agrupa contas, conecta/desconecta e delega assinatura.

Exemplo: inicializar e conectar MetaMask, assinar e enviar transação. (Ver snippet `initialize.ts`):

???+ code "initialize.ts"
    ```typescript
    --8<-- 'code/builders/toolkit/ethereum-api/dev-env/thirdweb/initialize.ts'
    ```

### Obter contrato {: #get-contract }

Use [`getContract`](https://portal.thirdweb.com/references/typescript/v5/getContract){target=_blank} para conectar-se a um contrato (ex.: incrementer na rede demo EVM da Tanssi):

```typescript
import { getContract } from 'thirdweb';

const contract = await getContract({
  client,
  address: '0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D',
});
```

### Ler dados {: #read-data }

Use [`readContract`](https://portal.thirdweb.com/references/typescript/v5/readContract){target=_blank} para ler estados:

```typescript
import { readContract } from 'thirdweb';

const value = await readContract({
  contract,
  method: 'function number() view returns (uint256)',
  params: [],
});
```

### Escrever transações {: #write-transactions }

Use [`sendTransaction`](https://portal.thirdweb.com/references/typescript/v5/sendTransaction){target=_blank} para enviar transações (lembre-se de conectar carteira/conta):

```typescript
import { sendTransaction, prepareContractCall } from 'thirdweb';

const transaction = prepareContractCall({
  contract,
  method: 'function increment()',
  params: [],
});

const { transactionHash } = await sendTransaction({
  account,
  transaction,
});
```

### Eventos {: #events }

Obtenha logs com [`getContractEvents`](https://portal.thirdweb.com/references/typescript/v5/getContractEvents){target=_blank}:

```typescript
import { getContractEvents } from 'thirdweb';

const events = await getContractEvents({
  contract,
  fromBlock: 0n,
  toBlock: 'latest',
});
```

### Armazenamento IPFS {: #storage }

Use [`upload`](https://portal.thirdweb.com/references/typescript/v5/upload){target=_blank} para enviar dados ao IPFS:

```typescript
import { upload } from 'thirdweb/storage';

const uri = await upload({
  client,
  files: [
    {
      name: 'metadata.json',
      data: JSON.stringify({ name: 'Meu NFT', description: 'Exemplo' }),
    },
  ],
});
```

## Conclusão

Com a CLI, o Deploy e os SDKs do thirdweb, você consegue criar, implantar e interagir com contratos na sua rede EVM da Tanssi com rapidez. Consulte a [documentação do thirdweb](https://portal.thirdweb.com){target=_blank} para recursos avançados.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
