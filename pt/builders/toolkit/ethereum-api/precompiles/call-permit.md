---
title: Call Permit
description: Learn how to use the Call Permit Precompile on Tanssi EVM networks to sign a permit for any EVM call that can be dispatched by anyone or any smart contract.
keywords: solidity, ethereum, call permit, permit, gasless transaction, moonbeam, precompiled, contracts, tanssi
icon: octicons-arrow-up-right-24
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/ethereum-api/precompiles/call-permit.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "6d097ec5fde2fb290d0412370947878f6c406fc58f02ac175ac41b3f2863eb0d",
  "content": "--- \ntitle:  Call Permit\ndescription: Learn how to use the Call Permit Precompile on Tanssi EVM networks to sign a permit for any EVM call that can be dispatched by anyone or any smart contract.\nkeywords: solidity, ethereum, call permit, permit, gasless transaction, moonbeam, precompiled, contracts, tanssi\nicon: octicons-arrow-up-right-24\ncategories: EVM-Template\n---\n\n# Interagindo com o Call Permit Precompile\n\n## Introdução {: #introduction }\n\nO Call Permit Precompile nas redes EVM com tecnologia Tanssi permite que um usuário assine um permit, uma mensagem assinada [EIP-712](https://eips.ethereum.org/EIPS/eip-712){target=\\_blank}, para qualquer chamada EVM e pode ser despachado por qualquer pessoa ou qualquer contrato inteligente. É semelhante à Assinatura de Permissão de Aprovações ERC-20 introduzida em [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612){target=\\_blank}, exceto que se aplica a qualquer chamada EVM em vez de apenas aprovações.\n\nQuando o call permit é despachado, ele é feito em nome do usuário que assinou o permit, e o usuário ou contrato que despacha o permit é responsável por pagar as taxas de transação. Como tal, o precompile pode ser usado para realizar transações sem gás.\n\nPor exemplo, Alice assina um call permit e Bob o despacha e realiza a chamada em nome de Alice. Bob paga as taxas de transação e, como tal, Alice não precisa ter nenhuma da moeda nativa para pagar pela transação, a menos que a chamada inclua uma transferência.\n\nO Call Permit Precompile está localizado no seguinte endereço:\n\n```text\n{{ networks.demo_evm.precompiles.call_permit }}\n```\n\n--8<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'\n\n## A Interface Solidity Call Permit {: #the-call-permit-interface }\n\n[`CallPermit.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/CallPermit.sol){target=\\_blank} é uma interface Solidity que permite aos desenvolvedores interagir com os três métodos do precompile.\n\n??? code \"CallPermit.sol\"\n\n    ```solidity\n    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/call-permit/call-permit.sol'\n    ```\n\nA interface inclui as seguintes funções:\n\n???+ function \"**dispatch**(*address* from, *address* to, *uint256* value, *bytes* data, *uint64[]* gaslimit, *uint256* deadline, *uint8* v, *bytes32* r, *bytes32* s) — despacha uma chamada em nome de outro usuário com um permit EIP-712. Esta função pode ser chamada por qualquer pessoa ou qualquer contrato inteligente. A transação será revertida se o permit não for válido ou se a chamada despachada for revertida ou apresentar erros (como falta de gás). Se for bem-sucedida, o nonce do signatário é aumentado para impedir que este permit seja reproduzido\"\n\n    === \"Parâmetros\"\n\n        - `from` - o signatário do permit. A chamada será despachada em nome deste endereço\n        - `to` - o endereço para o qual a chamada é feita\n        - `value` - o valor que está sendo transferido da conta `from`\n        - `data` - os dados da chamada, ou ação a ser executada\n        - `value` - o valor que está sendo transferido da conta `from`\n        - `gasLimit` - o limite de gás que a chamada despachada requer. Fornecer um argumento para este parâmetro impede que o despachante manipule o limite de gás\n        - `deadline` - o tempo em segundos UNIX após o qual o permit não será mais válido. Em JavaScript, você pode obter o tempo atual em segundos UNIX executando `console.log(Date.now())` em um script JavaScript ou no console do navegador\n        - `v` - o ID de recuperação da assinatura. O último byte da assinatura concatenada\n        - `r` - os primeiros 32 bytes da assinatura concatenada\n        - `s` - os segundos 32 bytes da assinatura concatenada\n\n\n??? function \"**nonces**(*address* owner) — retorna o nonce atual para determinado proprietário\"\n\n    === \"Parâmetros\"\n\n        - `owner` - o endereço da conta a ser verificada\n\n??? function \"**DOMAIN_SEPARATOR**() — retorna o separador de domínio EIP-712 que é usado para evitar ataques de replay. Ele segue a implementação [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612#specification){target=\\_blank}\"\n\n    === \"Parâmetros\"\n\n        Nenhum\n\n    === \"Retorna\"\n        O separador de domínio EIP-712 que é usado para evitar ataques de replay.\n\n\nO separador de domínio é definido no [padrão EIP-712](https://eips.ethereum.org/EIPS/eip-712){target=\\_blank} e é calculado como:\n\n```text\nkeccak256(PERMIT_DOMAIN, name, version, chain_id, address)\n```\n\nOs parâmetros do hash podem ser divididos da seguinte forma:\n\n - **PERMIT_DOMAIN** - é o `keccak256` de `EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)`\n - **name** - é o nome do domínio de assinatura e deve ser `'Call Permit Precompile'` exatamente\n - **version** - é a versão do domínio de assinatura. Para este caso, **version** é definido como `1`\n - **chainId** - é o ID da corrente da sua rede\n - **verifyingContract** - é o endereço do contrato que verificará a assinatura. Neste caso, o endereço do Call Permit Precompile\n\nQuando `dispatch` é chamado, o permit precisa ser verificado antes que a chamada seja despachada. A primeira etapa é [calcular o separador de domínio](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L138){target=\\_blank}. O cálculo pode ser visto na [implementação do Moonbeam](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L112-L126){target=\\_blank} ou você pode verificar um exemplo prático no [contrato EIP712 da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4a9cc8b4918ef3736229a5cc5a310bdc17bf759f/contracts/utils/cryptography/draft-EIP712.sol#L70-L84){target=\\_blank}.\n\nA partir daí, um [hash da assinatura e dos argumentos fornecidos](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L140-L151){target=\\_blank} é gerado, o que garante que a assinatura só possa ser usada para o call permit. Ele usa um nonce fornecido para garantir que a assinatura não esteja sujeita a um ataque de replay. É semelhante ao [contrato `ERC20Permit` da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4a9cc8b4918ef3736229a5cc5a310bdc17bf759f/contracts/token/ERC20/extensions/draft-ERC20Permit.sol#L52){target=\\_blank}, exceto que o `PERMIT_TYPEHASH` é para um call permit, e os argumentos correspondem aos da função dispatch mais o nonce.\n\nO separador de domínio e a estrutura de hash podem ser usados ​​para construir o [hash final](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L153-L157){target=\\_blank} da mensagem totalmente codificada. Um exemplo prático é mostrado no [contrato EIP712 da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4a9cc8b4918ef3736229a5cc5a310bdc17bf759f/contracts/utils/cryptography/draft-EIP712.sol#L101){target=\\_blank}.\n\nCom o hash final e os valores v, r e s, a assinatura pode ser [verificada e recuperada](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L211-L223){target=\\_blank}. Se for verificado com sucesso, o nonce aumentará em um e a chamada será despachada.\n\n## Configurar os Contratos {: #setup-the-example-contract }\n\nPara este exemplo, você aprenderá como assinar um call permit que atualiza uma mensagem em um contrato de exemplo simples, [`SetMessage.sol`](#example-contract). Antes de poder gerar a assinatura do call permit, você precisará implantar o contrato e definir os argumentos da função `dispatch` para o call permit.\n\nDepois de configurar o contrato de exemplo, você pode configurar o contrato Call Permit Precompile.\n\n### Verificando Pré-requisitos {: #checking-prerequisites }\n\nPara acompanhar este tutorial, você precisará ter sua carteira configurada para funcionar com sua rede EVM e uma conta financiada com tokens nativos. Você pode adicionar sua rede EVM ao MetaMask com um clique no [Tanssi dApp](https://apps.tanssi.network/){target=\\_blank}. Ou, você pode [configurar o MetaMask para Tanssi com a rede EVM de demonstração](/builders/toolkit/ethereum-api/wallets/metamask/){target=\\_blank}.\n\n### Contrato de Exemplo {: #example-contract }\n\nO contrato `SetMessage.sol` é um exemplo perfeito para demonstrar o uso do Call Permit Precompile.\n\n```solidity\n--8<-- 'code/builders/toolkit/ethereum-api/precompiles/call-permit/set-message.sol'\n```\n\n### Configuração do Remix {: #remix-set-up }\n\nVocê pode usar o [Remix](https://remix.ethereum.org/){target=\\_blank} para compilar o contrato de exemplo e implantá-lo. Você precisará de uma cópia de [`SetMessage.sol`](#example-contract){target=\\_blank} e [`CallPermit.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/CallPermit.sol){target=\\_blank}. Para adicionar os contratos ao Remix, você pode seguir as seguintes etapas:\n\n1. Clique na aba **File explorer**\n2. Cole o contrato `CallPermit.sol` em um arquivo Remix chamado `CallPermit.sol`\n3. Cole o contrato `SetMessage.sol` em um arquivo Remix chamado `SetMessage.sol`\n\n![Copiando e colando o contrato de exemplo no Remix](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-1.webp)\n\n### Compile e Implante o Contrato de Exemplo {: #compile-deploy-example-contract }\n\nPrimeiro, você precisará compilar o contrato de exemplo:\n\n1. Clique na aba **Compile**\n2. Em seguida, para compilar a interface, clique em **Compile SetMessage.sol**\n\n![Compilando SetMessage.sol](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-2.webp)\n\nEm seguida, você pode implantá-lo:\n\n1. Clique na aba **Deploy and Run**, diretamente abaixo da aba **Compile** no Remix. Observação: você não está implantando um contrato aqui, em vez disso, você está acessando um contrato pré-compilado que já está implantado\n2. Certifique-se de que **Injected Provider - Metamask** esteja selecionado no menu suspenso **ENVIRONMENT**\n3. Certifique-se de que **SetMessage.sol** esteja selecionado no menu suspenso **CONTRACT**\n4. Clique em **Deploy**\n5. MetaMask aparecerá e você precisará **Confirmar** a transação\n\n![Forneça o endereço](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-3.webp)\n\nO contrato aparecerá na lista de **Deployed Contracts** no painel do lado esquerdo. Copie o endereço do contrato, pois você precisará usá-lo para gerar a assinatura do call permit na próxima seção.\n\n### Compile e acesse o Call Permit Precompile {: #compile-access-call-permit }\n\nPrimeiro, você precisará compilar o contrato Call Permit Precompile:\n\n1. Clique na aba **Compile**\n2. Em seguida, para compilar a interface, clique em **Compile CallPermit.sol**\n\n![Compilando SetMessage.sol](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-4.webp)\n\nEm seguida, em vez de implantar o contrato, você só precisará acessá-lo com o endereço do precompile:\n\n1. Clique na aba **Deploy and Run**, diretamente abaixo da aba **Compile** no Remix. Observação: você não está implantando um contrato aqui, em vez disso, você está acessando um contrato pré-compilado que já está implantado\n2. Certifique-se de que **Injected Provider - Metamask** esteja selecionado no menu suspenso **ENVIRONMENT**\n3. Certifique-se de que **CallPermit.sol** esteja selecionado no menu suspenso **CONTRACT**. Como este é um contrato pré-compilado, não há etapa de implantação. Em vez disso, você fornecerá o endereço do precompile no campo **At Address**\n4. Forneça o endereço do Call Permit Precompile para as redes EVM com tecnologia Tanssi: `{{networks.demo_evm.precompiles.call_permit}}` e clique em **At Address**\n5. O Call Permit Precompile aparecerá na lista de **Deployed Contracts**\n\n![Forneça o endereço](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-5.webp)\n\n## Gerar Assinatura do Call Permit {: #generate-call-permit-signature}\n\nPara interagir com o Call Permit Precompile, você deve ter ou gerar uma assinatura para despachar o call permit. Existem várias maneiras de gerar a assinatura. Este guia mostrará como gerar a assinatura usando [Ethers.js](https://docs.ethers.org/v6/){target=\\_blank}.\n\nAqui está uma visão geral das etapas que você precisará seguir para obter a assinatura:\n\n1. A `message` será criada e incluirá alguns dos dados necessários para criar o call permit. Ele inclui os argumentos que serão passados ​​para a função `dispatch` e o nonce do signatário\n2. Uma estrutura JSON dos dados que o usuário precisa assinar será montada para o call permit e incluirá todos os tipos para os argumentos `dispatch` e o nonce. Isso resultará no tipo `CallPermit` e será salvo como `primaryType`\n3. O separador de domínio será criado usando exatamente \"Call Permit Precompile\" para o nome, a versão do seu dApp ou plataforma, o ID da cadeia da rede na qual a assinatura deve ser usada e o endereço do contrato que verificará a assinatura. Observe que você precisará especificar a ID da cadeia da sua rede no script para gerar a assinatura correta\n4. Todos os dados montados serão assinados usando o Ethers.js\n5. A assinatura será retornada e você pode usar o [método `Signature.from` do Ethers.js](https://docs.ethers.org/v6/api/crypto/#Signature_from){target=\\_blank} para retornar os valores `v`, `r` e `s` da assinatura\n\n### Os Argumentos do Call Permit {: #call-permit-arguments }\n\nComo visto na seção [Interface Call Permit](#the-call-permit-interface), a função `dispatch` recebe os seguintes parâmetros: `from`, `to`, `value`, `data`, `gasLimit`, `deadline`, `v`, `r` e `s`.\n\nPara obter os argumentos de assinatura (`v`, `r` e `s`), você precisa assinar uma mensagem contendo os argumentos para o restante dos parâmetros mencionados acima, mais o nonce do signatário.\n\n- `from` - o endereço da conta com a qual você deseja assinar o call permit\n- `to` - o endereço do contrato para o contrato `SetMessage.sol`\n- `value` - pode ser `0` para este exemplo, pois você apenas definirá uma mensagem em vez de transferir quaisquer fundos\n- `data` - você pode enviar qualquer mensagem que desejar. Você só precisará da representação hexadecimal da mensagem que deseja definir usando o contrato `SetMessage.sol`. Isso conterá o seletor da função `set` e a string da mensagem. Para este exemplo, você pode enviar `hello world`. Para fazer isso, você pode usar esta representação hexadecimal:\n     ```text\n     0x4ed3885e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c64000000000000000000000000000000000000000000\n     ```\n- `gasLimit` - `100000` será suficiente para enviar a chamada despachada\n- `deadline` - você pode obter o tempo atual em segundos UNIX executando `console.log(Date.now())` em um script JavaScript ou no console do navegador. Depois de ter o tempo atual, você deve adicionar generosamente segundos adicionais para representar quando o call permit expirará\n\nO nonce do signatário também será necessário. Se esta for a primeira vez que você assina um call permit, o nonce será `0`. Você também pode verificar o nonce no Remix:\n\n1. Expanda o contrato call permit\n2. Próximo à função **nonces**, insira o endereço do signatário e clique em **nonces**\n3. O resultado será retornado diretamente abaixo da função\n\n![Obtenha o nonce](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-6.webp)\n\n### Use Ethers para Criar a Assinatura {: #use-ethers-to-create-the-signature }\n\nPara gerar a assinatura do call permit usando JavaScript e Ethers, você precisará primeiro criar um projeto localmente. Você pode fazer isso com os seguintes comandos:\n\n```bash\nmkdir call-permit-example && cd call-permit-example && touch getSignature.js\nnpm init -y\n```\n\nAgora você deve ter um arquivo onde pode criar o script para obter a assinatura junto com um arquivo `package.json`. Abra o arquivo `package.json` e, abaixo da seção `"dependencies"`, adicione:\n\n```json\n\"type\": \"module\"\n```\n\nEm seguida, você pode instalar [Ethers.js](https://docs.ethers.org/v6/){target=\\_blank}:\n\n```bash\nnpm i ethers\n```\n\n!!! remember\n    Nunca revele suas chaves privadas, pois elas dão acesso direto aos seus fundos. As etapas a seguir são apenas para fins de demonstração.\n\nNo arquivo `getSignature.js`, você pode copiar e editar o seguinte trecho de código. Além dos campos discutidos acima na [seção Argumentos do Call Permit](#call-permit-arguments), você precisará inserir o ID da cadeia da sua rede no componente Domain Separator para gerar corretamente a assinatura. Se você usar um ID de cadeia incorreto, a assinatura gerada será inválida e nenhuma transação poderá ser despachada.\n\n???+ code \"getSignature.js\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/call-permit/getSignature.js'\n    ```\n\nPara executar o script, use o seguinte comando:\n\n```bash\nnode getSignature.js\n```\n\nNo console, você deverá ver a assinatura concatenada junto com os valores da assinatura, incluindo os valores `v`, `r` e `s`. Copie esses valores, pois você precisará deles ao interagir com o Call Permit Precompile nas seções a seguir.\n\n![Valores de assinatura no console](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-7.webp)\n\n!!! note\n    Tenha cuidado ao copiar os valores `v`, `r` e `s` para o método `dispatch` do precompile. A ordem dos valores `v`, `r` e `s` no precompile pode não ser a mesma da saída do script.\n\n## Interaja com a Interface Solidity {: #interact-with-the-solidity-interface }\n\nAgora que você gerou a assinatura do call permit, poderá testar a chamada da função `dispatch` do Call Permit Precompile.\n\n### Despachar uma Chamada {: #dispatch-a-call }\n\nQuando você enviar a função `dispatch`, precisará dos mesmos argumentos que você usou para assinar o call permit. Para começar, volte para a aba **Deploy and Run** no Remix e, na seção **Deployed Contracts**, expanda o contrato call permit. Certifique-se de estar conectado à conta que você deseja consumir o call permit e pagar as taxas de transação. Em seguida, siga estas etapas:\n\n1. Para o campo **from**, insira o endereço da conta que você usou para assinar o call permit\n2. Copie e cole o endereço do contrato de `SetMessage.sol`\n3. Insira `0` para o campo **value**\n4. Insira a representação hexadecimal do seletor de função para a função `set` e a string que você deseja definir como a mensagem para o contrato `SetMessage.sol`. Para este exemplo, `hello world` pode ser usado:\n     ```text\n     0x4ed3885e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c64000000000000000000000000000000000000000000\n     ```\n5. Insira `100000` para o campo **gasLimit**\n6. Insira a `deadline` que você usou ao assinar o call permit\n7. Copie o valor `v` que você deve ter recuperado ao gerar a assinatura do call permit e cole-o no campo **v**\n8. Copie o valor `r` que você deve ter recuperado ao gerar a assinatura do call permit e cole-o no campo **r**\n9. Copie o valor `s` que você deve ter recuperado ao gerar a assinatura do call permit e cole-o no campo **s**\n10. Clique em **transact** para enviar a transação\n11. MetaMask deve aparecer e você pode confirmar a transação\n\n![Despachando o call permit](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-8.webp)\n\nDepois que a transação for concluída, você poderá verificar se a mensagem foi atualizada para `hello world`. Para fazer isso, você pode:\n\n1. Expanda o contrato `SetMessage.sol`\n2. Clique em **get**\n3. O resultado aparecerá abaixo da função e deverá mostrar `hello world`\n\n![Verifique se o despacho foi executado conforme o pretendido](/images/builders/toolkit/ethereum-api/precompiles/call-permit/call-9.webp)\n\nParabéns! Você gerou com sucesso uma assinatura de call permit e a usou para despachar uma chamada em nome do signatário do call permit.\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle:  Call Permit\ndescription: Aprenda como usar o Call Permit Precompile nas redes EVM com tecnologia Tanssi para assinar um permit para qualquer chamada EVM que possa ser despachada por qualquer pessoa ou qualquer contrato inteligente.\nkeywords: solidity, ethereum, call permit, permit, gasless transaction, moonbeam, precompiled, contracts, tanssi\nicon: octicons-arrow-up-right-24\ncategories: EVM-Template\n---\n\n# Interagindo com o Call Permit Precompile\n\n## Introdução {: #introduction }\n\nO Call Permit Precompile nas redes EVM com tecnologia Tanssi permite que um usuário assine um permit, uma mensagem assinada [EIP-712](https://eips.ethereum.org/EIPS/eip-712){target=\\_blank}, para qualquer chamada EVM e pode ser despachado por qualquer pessoa ou qualquer contrato inteligente. É semelhante à Assinatura de Permissão de Aprovações ERC-20 introduzida em [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612){target=\\_blank}, exceto que se aplica a qualquer chamada EVM em vez de apenas aprovações.\n\nQuando o call permit é despachado, ele é feito em nome do usuário que assinou o permit, e o usuário ou contrato que despacha o permit é responsável por pagar as taxas de transação. Como tal, o precompile pode ser usado para realizar transações sem gás.\n\nPor exemplo, Alice assina um call permit e Bob o despacha e realiza a chamada em nome de Alice. Bob paga as taxas de transação e, como tal, Alice não precisa ter nenhuma da moeda nativa para pagar pela transação, a menos que a chamada inclua uma transferência.\n\nO Call Permit Precompile está localizado no seguinte endereço:\n\n```text\n{{ networks.demo_evm.precompiles.call_permit }}\n```\n\n--8<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'\n\n## A Interface Solidity Call Permit {: #the-call-permit-interface }\n\n[`CallPermit.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/CallPermit.sol){target=\\_blank} é uma interface Solidity que permite aos desenvolvedores interagir com os três métodos do precompile.\n\n??? code \"CallPermit.sol\"\n\n    ```solidity\n    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/call-permit/call-permit.sol'\n    ```\n\nA interface inclui as seguintes funções:\n\n???+ function \"**dispatch**(*address* from, *address* to, *uint256* value, *bytes* data, *uint64[]* gaslimit, *uint256* deadline, *uint8* v, *bytes32* r, *bytes32* s) — despacha uma chamada em nome de outro usuário com um permit EIP-712. Esta função pode ser chamada por qualquer pessoa ou qualquer contrato inteligente. A transação será revertida se o permit não for válido ou se a chamada despachada for revertida ou apresentar erros (como falta de gás). Se for bem-sucedida, o nonce do signatário é aumentado para impedir que este permit seja reproduzido\"\n\n    === \"Parâmetros\"\n\n        - `from` - o signatário do permit. A chamada será despachada em nome deste endereço\n        - `to` - o endereço para o qual a chamada é feita\n        - `value` - o valor que está sendo transferido da conta `from`\n        - `data` - os dados da chamada, ou ação a ser executada\n        - `value` - o valor que está sendo transferido da conta `from`\n        - `gasLimit` - o limite de gás que a chamada despachada requer. Fornecer um argumento para este parâmetro impede que o despachante manipule o limite de gás\n        - `deadline` - o tempo em segundos UNIX após o qual o permit não será mais válido. Em JavaScript, você pode obter o tempo atual em segundos UNIX executando `console.log(Date.now())` em um script JavaScript ou no console do navegador\n        - `v` - o ID de recuperação da assinatura. O último byte da assinatura concatenada\n        - `r` - os primeiros 32 bytes da assinatura concatenada\n        - `s` - os segundos 32 bytes da assinatura concatenada\n\n\n??? function \"**nonces**(*address* owner) — retorna o nonce atual para determinado proprietário\"\n\n    === \"Parâmetros\"\n\n        - `owner` - o endereço da conta a ser verificada\n\n??? function \"**DOMAIN_SEPARATOR**() — retorna o separador de domínio EIP-712 que é usado para evitar ataques de replay. Ele segue a implementação [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612#specification){target=\\_blank}\"\n\n    === \"Parâmetros\"\n\n        Nenhum\n\n    === \"Retorna\"\n        O separador de domínio EIP-712 que é usado para evitar ataques de replay.\n\n\nO separador de domínio é definido no [padrão EIP-712](https://eips.ethereum.org/EIPS/eip-712){target=\\_blank} e é calculado como:\n\n```text\nkeccak256(PERMIT_DOMAIN, name, version, chain_id, address)\n```\n\nOs parâmetros do hash podem ser divididos da seguinte forma:\n\n - **PERMIT_DOMAIN** - é o `keccak256` de `EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)`\n - **name** - é o nome do domínio de assinatura e deve ser `'Call Permit Precompile'` exatamente\n - **version** - é a versão do domínio de assinatura. Para este caso, **version** é definido como `1`\n - **chainId** - é o ID da corrente da sua rede\n - **verifyingContract** - é o endereço do contrato que verificará a assinatura. Neste caso, o endereço do Call Permit Precompile\n\nQuando `dispatch` é chamado, o permit precisa ser verificado antes que a chamada seja despachada. A primeira etapa é [calcular o separador de domínio](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L138){target=\\_blank}. O cálculo pode ser visto na [implementação do Moonbeam](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs#L112-L126){target=\\_blank} ou você pode verificar um exemplo prático no [contrato EIP712 da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4a9cc8b4918ef3736229a5cc5a310bdc17bf759f/contracts/utils/cryptography/draft-EIP712.sol#L70-L84){target=\\_blank}.\n\nA partir daí, um [hash da assinatura e dos argumentos fornecidos](https://github.com/moonbeam-foundation/moonbeam/blob/ae705bb2e9652204ace66c598a00dcd92445eb81/precompiles/call-permit/src/lib.rs





```text

```

````

```solidity

```

````

```text

    ```solidity

    ```


````
 ```text

 ```
````

```bash


```

```json

```

```bash

```

````
```js

```
````

```bash

```

````
 ```text

 ```
````

```text

```































```solidity

```









































































     ```text

     ```















```bash


```



```json

```



```bash

```








    ```js

    ```



```bash

```




















     ```text

     ```
