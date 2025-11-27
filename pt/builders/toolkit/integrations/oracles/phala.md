---
title: Using Phala for Price Feed Oracles
description: Learn how to use Phala's off-chain computing network to get reliable Ethereum Mainnet Chainlink Oracle token price feed data on your Tanssi-powered EVM network.
icon: octicons-eye-24
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/integrations/oracles/phala.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "97e26a553def1aa1dd38019ed8b5483a2ca8ee6922f4b5e830f7ab1123bf62b2",
  "content": "--- \ntitle: Using Phala for Price Feed Oracles\ndescription: Learn how to use Phala's off-chain computing network to get reliable Ethereum Mainnet Chainlink Oracle token price feed data on your Tanssi-powered EVM network.\nicon: octicons-eye-24\ncategories: EVM-Template\n---\n\n# Launching Price Feeds with Phala\n\n## Introduction {: #introduction }\n\n[Phala Network](https://phala.com/){target=\\_blank} is an off-chain compute network powered by [Secure Enclaves](https://docs.phala.com/network/tech-specs/blockchain/overview#the-architecture){target=\\_blank} that enables developers to build powerful smart contracts that connect to off-chain components called Phat Contracts. Phat Contracts are designed to enable functionality that surpasses the limitations of traditional smart contracts, such as storage, cost, and compute limitations while remaining trustless, verifiable, and permissionless. For more information about Phala's architecture, be sure to check out the [Phala docs](https://docs.phala.com/overview/phala-network){target=\\_blank}.\n\nPhala is not an oracle network itself; rather, Phala enables a variety of off-chain compute capabilities, such as a decentralized oracle network. Phala also provides a toolset called [Phala Bricks](https://bricks.phala.network){target=\\_blank} that makes it easy to quickly launch these types of features without having to build them from scratch.\n\nThis tutorial will walk through a demo of [interacting with price feeds](#fetch-price-data) enabled by Phat contracts on the demo Tanssi-powered EVM-compatible network. Next, you'll learn how to [deploy price feeds to your Tanssi EVM-compatible network](#launching-price-feeds-on-an-evm-network). Please be advised that the steps shown in this tutorial are for demonstration purposes only - it's highly recommended that you [contact the Phala team directly](https://dashboard.phala.network){target=\\_blank} as they can assist you with launching price feeds on a network to ensure the integrity of the deployment process.\n\n## How Phala Enables Price Feeds {: #how-phala-enables-price-feeds }\n\nPhala mirrors [Chainlink Price Feeds](https://docs.chain.link/data-feeds/price-feeds){target=\\_blank} from Ethereum MainNet. Chainlink Price Feeds have stood the test of time and have wide industry adoption. As a reminder, Chainlink Price Feeds don't rely on any single source of truth, rather, their pricing data is collected and aggregated from a variety of data sources gathered by a decentralized set of independent node operators. This helps to prevent manipulation and erratic pricing data.\n\nThe core component of Phala's system design is the [Secure Enclave](https://docs.phala.com/network/tech-specs/blockchain/overview#the-architecture){target=\\_blank}, which processes the inputs it receives from the Phala blockchain, acting as an encrypted message queue, and guarantees secure and faithful execution, regardless of the presence of malicious workers. In this sense, the Phala blockchain requests a price feed update, which the Phala off-chain workers fetch from Ethereum MainNet, and return to the Phala blockchain.\n\nIt's important to note that Phala isn't limited to replicating existing Oracles. You can create entirely new Oracles by sourcing off-chain data via Phat Contracts. In this [Phat-EVM Oracle example](https://github.com/Phala-Network/phat-offchain-rollup/blob/main/EvmRollup.md){target=\\_blank}, pricing data is sourced from the CoinGecko API. Price quote updates can then be constantly streamed from the Phat contract (push design), or the EVM smart contract can ask for a refreshed quote from the Phat contract (pull design).\n\n## Fetch Price Data {: #fetch-price-data }\n\nThere are several price feeds available on the demo EVM network that you can interact with. The price feeds enabled by Phat Contracts use the same interface as the Chainlink price feeds. The data lives in a series of smart contracts (one per price feed) and can be fetched with the aggregator interface:\n\n???+ code \"AggregatorV3Interface.sol\"\n\n    ```solidity\n    --8<-- 'code/builders/toolkit/integrations/oracles/phala/AggregatorV3Interface.sol'\n    ```\n\nAs seen above in the interface, there are five functions for fetching data: `decimals`, `description`, `version`, `getRoundData`, and `latestRoundData`. For more information about the `AggregatorV3Interface.sol`, see the [Chainlink API Reference](https://docs.chain.link/data-feeds/api-reference){target=\\_blank}.\n\n### Supported Assets {: #supported-assets }\n\nPhala sources its price feed data by mirroring Chainlink's price feeds from Ethereum MainNet. Currently, there are data feed contracts for [the demo EVM network](/builders/tanssi-network/testnet/demo-evm-network/){target=\\_blank} for the following asset pairs:\n\n=== \"Tanssi Demo EVM Network\"\n    | Asset & Base Pair |                                                                          Aggregator Contract                                                                          |\n    |:-----------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------:|\n    |    AAVE to USD    | [{{ networks.demo_evm.oracles.phala.aave_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x2E1640853bB2dD9f47831582665477865F9240DB){target=\\_blank} |\n    |    BTC to USD     | [{{ networks.demo_evm.oracles.phala.btc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x89BC5048d634859aef743fF2152363c0e83a6a49){target=\\_blank}  |\n    |    CRV to USD     | [{{ networks.demo_evm.oracles.phala.crv_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xf38b25b79A72393Fca2Af88cf948D98c64726273){target=\\_blank}  |\n    |    DAI to USD     | [{{ networks.demo_evm.oracles.phala.dai_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x1f56d8c7D72CE2210Ef340E00119CDac2b05449B){target=\\_blank}  |\n    |    ETH to USD     | [{{ networks.demo_evm.oracles.phala.eth_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x739d71fC66397a28B3A3b7d40eeB865CA05f0185){target=\\_blank}  |\n    |    USDC to USD    | [{{ networks.demo_evm.oracles.phala.usdc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x4b8331Ce5Ae6cd33bE669c10Ded9AeBA774Bf252){target=\\_blank} |\n    |    USDT to USD    | [{{ networks.demo_evm.oracles.phala.usdt_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x5018c16707500D2C89a0446C08f347A024f55AE3){target=\\_blank} |\n\n=== \"Ethereum MainNet\"\n    | Asset & Base Pair |                                                          Aggregator Contract                                                           |\n    |:-----------------:|:--------------------------------------------------------------------------------------------------------------------------------------:|\n    |    AAVE to USD    | [0x547a514d5e3769680Ce22B2361c10Ea13619e8a9](https://etherscan.io/address/0x547a514d5e3769680Ce22B2361c10Ea13619e8a9){target=\\_blank} |\n    |    BTC to USD     | [0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c](https://etherscan.io/address/0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c){target=\\_blank} |\n    |    CRV to USD     | [0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f](https://etherscan.io/address/0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f){target=\\_blank} |\n    |    DAI to USD     | [0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9](https://etherscan.io/address/0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9){target=\\_blank} |\n    |    ETH to USD     | [0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419](https://etherscan.io/address/0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419){target=\\_blank} |\n    |    USDC to USD    | [0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6](https://etherscan.io/address/0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6){target=\\_blank} |\n    |    USDT to USD    | [0x3E7d1eAB13ad0104d2750B8863b489D65364e32D](https://etherscan.io/address/0x3E7d1eAB13ad0104d2750B8863b489D65364e32D){target=\\_blank} |\n\n### Interacting with Price Feeds on the Tanssi Demo EVM Network {: #interacting-with-price-feeds-demo-evm-network }\n\nNext, this tutorial will showcase interacting with the price feed contracts on the demo EVM network. These contracts are already deployed on the demo EVM network, so you can interact with them by accessing the aggregator contract corresponding to your desired asset.\n\nFor a refresher on setting up Remix to interface with the demo EVM network, see the [Deploy Smart Contracts with Remix](/builders/toolkit/ethereum-api/dev-env/remix/){target=\\_blank} guide. Secondly, make sure you have [connected MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\\_blank} to the demo EVM network.\n\nPaste the [aggregator contract](https://github.com/smartcontractkit/chainlink-evm/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\\_blank} into a new file in Remix and compile it.\n\n![Compile aggregator contract](/images/builders/toolkit/integrations/oracles/phala/phala-1.webp)\n\nThen, take the following steps:\n\n1. Head to the **Deploy and Run Transactions** tab\n2. Set the **ENVIRONMENT** to **Injected Provider -- MetaMask**\n3. Select the **AggregatorV3Interface** contract from the **CONTRACT** dropdown\n4. Enter the data feed contract address corresponding to `BTC to USD`, which is `0x89BC5048d634859aef743fF2152363c0e83a6a49` on the demo EVM network in the **At Address** field and click the **At Address** button\n\n![Access aggregator contract](/images/builders/toolkit/integrations/oracles/phala/phala-2.webp)\n\nThe aggregator contract should now be accessible. To interact with the aggregator contract, take the following steps:\n\n1. Expand the **AggregatorV3Interface** contract to reveal the available functions\n2. Click **decimals** to query how many digits after the decimal point are included in the returned price data\n3. Click **description** to verify the asset pair of the price feed\n4. Click **latestRoundData** to see the most recent price data for the asset pair. The price data for the pair is returned as the **int256 answer**\n\n![Check price data](/images/builders/toolkit/integrations/oracles/phala/phala-3.webp)\n\nNote that to obtain a readable price, you must account for the decimals of the price feed, which is available with the `decimals()` method. So in this example, where the price feed returned a value of `5230364122303`, the decimal point will need to be moved eight places, which corresponds to a Bitcoin price of `$52,303.64` at the time of writing.\n\n## Launching Price Feeds on an EVM Network {: #launching-price-feeds-on-an-evm-network }\n\nIt's easy to launch price feeds on a Tanssi-powered EVM network! The following sections will walk through the process of launching a variety of price feeds. This process can be followed for quick Trial networks and dedicated networks on [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\_blank}. Please be advised that these instructions are for demonstration purposes only, and it's highly recommended that you [contact the Phala Team](https://dashboard.phala.network){target=\\_blank} for assistance in any production scenarios.\n\n### Setup {: #setup }\n\nTo get started, clone the [Phala Mirrored Price Feed repo](https://github.com/Phala-Network/mirrored-price-feed){target=\\_blank} to a local directory. Then, run the following command:\n\n```bash\ncd mirrored-price-feed/ && yarn install\n```\n\nThen, you'll need to configure your `.env` file. There's a convenient sample file in the repo that you can refer to. From the command line, run:  \n\n```bash\ncp env.example .env\n```\n\nNext, edit your `.env` to insert the private key of an account funded on your network, and the RPC URL of your network. If building on your own network, you can fund a dummy account from the Sudo account of your network. Your network's Sudo address and RPC URL are both accessible from your dashboard on the [Tanssi DApp](https://apps.tanssi.network){target=\\_blank}. You can leave the other fields in the `.env` blank. Your `.env` should resemble the below:\n\n```bash\n--8<-- 'code/builders/toolkit/integrations/oracles/phala/env.txt'\n```\n\n!!! note\n    You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.\n\n### Configure Deployment Script {: #configure-deployment-script }\n\nNext, you'll need to edit the `OffchainAggregator.s.sol` file located in the scripts directory. `OffchainAggregator.sol` takes two parameters upon deployment, a `decimals` value, and a description of the price feed. The decimal value can remain unchanged at `8`, and the description should be changed to the price feed that you'd like to add to your network. In this case, `BTC / USD` is specified. Take care to copy the description exactly as shown, and remember that only specified assets shown in the [Fetch Price Feed Data](#supported-assets) section are supported. If you specify an asset not supported by Phala, the price feed will not work correctly. Your `OffchainAggregator.s.sol` should resemble the following:\n\n???+ code \"OffchainAggregator.s.sol\"\n\n    ```solidity\n    --8<-- 'code/builders/toolkit/integrations/oracles/phala/OffchainAggregator.s.sol'\n    ```\n\nThere are a few more changes that you need to make in `feeder.ts`, the file that maintains and updates your price feeds. You'll need to insert the details of your EVM network as follows:\n\n```typescript\n--8<-- 'code/builders/toolkit/integrations/oracles/phala/define-chain.ts'\n```\n\nYou'll also see two arrays of contract addresses at the top of `feeder.ts`. The first array, named `mainnetFeedContracts` refers to Ethereum MainNet aggregator contract addresses, and you can leave that untouched. The second array, named `aggregatorContracts ` still contains the addresses of the aggregator contracts on the demo EVM network. You should erase this array such that it is empty. Later in this guide, you'll return to it and add the contract addresses of your aggregator contracts specific to your Tanssi EVM network once they are deployed.\n\nOnce you're finished editing, your `feeder.ts` file should resemble the below:\n\n???+ code \"feeder.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/integrations/oracles/phala/feeder.ts'\n    ```\n\n### Build and Test {: #build-and-test }\n\nRun the following commands to build and test the project:\n\n```bash\nyarn build\n```\n\n```bash\nyarn test\n```\n\nIf everything was successful, you'll see output like the following:\n\n--8<-- 'code/builders/toolkit/integrations/oracles/phala/terminal/build.md'\n\n### Deploy {: #deploy }\n\nTo deploy your aggregator contract for the specified asset/base pair to your EVM network, use the following command:\n\n```bash\nyarn deploy\n```\n\nYou'll get a transaction status as well as a contract address. Copy this contract address, as you'll need to refer to it in the following steps.\n\n--8<-- 'code/builders/toolkit/integrations/oracles/phala/terminal/deploy.md'\n\n### Access Aggregator Contract {: #access-aggregator-contract }\n\nNext, this tutorial will demonstrate interacting with the newly deployed aggregator contract. Make sure that your MetaMask wallet is connected to your EVM network. You can add your network to your MetaMask by pressing **Add to MetaMask** on your dashboard on the [Tanssi dApp](https://apps.tanssi.network){target=\\_blank}.\n\nPaste the [aggregator contract](https://github.com/smartcontractkit/chainlink-evm/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\\_blank} into a new file in Remix and compile it.\n\nThen, take the following steps:\n\n1. Head to the **Deploy and Run Transactions** tab\n2. Set the **ENVIRONMENT** to **Injected Provider -- MetaMask** and ensure that your MetaMask is on the network of your EVM network. You can verify the EVM chain ID in Remix if you are unsure\n3. Select the **AggregatorV3Interface** contract from the **CONTRACT** dropdown\n4. Enter the data feed contract address corresponding to your desired asset pair that was returned on the command line in the prior section in the **At Address** field and click the **At Address** button\n\n![Access aggregator contract](/images/builders/toolkit/integrations/oracles/phala/phala-4.webp)\n\nExpand the **AggregatorV3Interface** contract to reveal the available functions and click **latestRoundData** to see the most recent price data for the asset pair. You should see `0` values for all. This is because your aggregator contract has been deployed, but it hasn't yet fetched price data. You can fix this with a quick price feed update.\n\n![Get output of deployed aggregator contract](/images/builders/toolkit/integrations/oracles/phala/phala-5.webp)\n\n### Trigger Price Feed Update {: #Trigger Price Feed Update }\n\nIn a prior section, you cleared out the array of aggregator contracts, but since you've now deployed an aggregator contract, you should specify it in the `feeder.ts` file so that you can manually trigger a refresh of the price data. Edit the `aggregatorContracts` array as follows:\n\n```typescript\nconst aggregatorContracts = {\n  'BTC-USD': 'INSERT_AGGREGATOR_CONTRACT_ADDRESS',\n}\n```\n\nThen, from the command line, run the following command:\n\n```bash\nnpx tsx feeder.ts \n```\n\n--8<-- 'code/builders/toolkit/integrations/oracles/phala/terminal/update.md'\n\nUpon returning to Remix, click **latestRoundData** once more, and after waiting a moment, you should see an accurate value returned.\n\n![Check price data](/images/builders/toolkit/integrations/oracles/phala/phala-6.webp)\n\nFor more information about using Phala to access off-chain data, be sure to check out the [Phala docs site](https://docs.phala.com/overview/phala-network){target=\\_blank}.\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle: Usando Phala para Oráculos de Feed de Preços\ndescription: Aprenda como usar a rede de computação off-chain da Phala para obter dados confiáveis de feed de preços de tokens do Oracle Chainlink da Ethereum Mainnet em sua rede EVM com tecnologia Tanssi.\nicon: octicons-eye-24\ncategories: EVM-Template\n---\n\n# Lançando Feeds de Preços com Phala\n\n## Introdução {: #introduction }\n\n[Phala Network](https://phala.com/){target=\\_blank} é uma rede de computação off-chain alimentada por [Enclaves Seguros](https://docs.phala.com/network/tech-specs/blockchain/overview#the-architecture){target=\\_blank} que permite aos desenvolvedores construir contratos inteligentes poderosos que se conectam a componentes off-chain chamados de Contratos Phat. Os Contratos Phat são projetados para habilitar funcionalidades que superam as limitações dos contratos inteligentes tradicionais, como armazenamento, custo e limitações de computação, permanecendo sem confiança, verificáveis e sem permissão. Para obter mais informações sobre a arquitetura da Phala, certifique-se de verificar os [documentos da Phala](https://docs.phala.com/overview/phala-network){target=\\_blank}.\n\nA Phala não é uma rede de oráculos em si; em vez disso, a Phala permite uma variedade de capacidades de computação off-chain, como uma rede de oráculos descentralizada. A Phala também fornece um conjunto de ferramentas chamado [Phala Bricks](https://bricks.phala.network){target=\\_blank} que facilita o lançamento rápido desses tipos de recursos sem ter que construí-los do zero.\n\nEste tutorial irá guiá-lo por uma demonstração de [interação com feeds de preços](#fetch-price-data) habilitados por contratos Phat na rede compatível com EVM com tecnologia Tanssi de demonstração. Em seguida, você aprenderá como [implantar feeds de preços em sua rede compatível com EVM Tanssi](#lançando-feeds-de-preços-em-uma-rede-evm). Esteja ciente de que as etapas mostradas neste tutorial são apenas para fins de demonstração - é altamente recomendável que você [entre em contato com a equipe da Phala diretamente](https://dashboard.phala.network){target=\\_blank}, pois eles podem ajudá-lo a lançar feeds de preços em uma rede para garantir a integridade do processo de implantação.\n\n## Como Phala Habilita Feeds de Preços {: #how-phala-enables-price-feeds }\n\nA Phala espelha [Feeds de Preços Chainlink](https://docs.chain.link/data-feeds/price-feeds){target=\\_blank} da Ethereum MainNet. Os feeds de preços da Chainlink resistiram ao teste do tempo e têm ampla adoção na indústria. Como lembrete, os feeds de preços da Chainlink não dependem de uma única fonte de verdade, mas, em vez disso, seus dados de preços são coletados e agregados de uma variedade de fontes de dados reunidas por um conjunto descentralizado de operadores de nós independentes. Isso ajuda a impedir a manipulação e dados de preços erráticos.\n\nO componente principal do projeto do sistema da Phala é o [Enclave Seguro](https://docs.phala.com/network/tech-specs/blockchain/overview#the-architecture){target=\\_blank}, que processa as entradas que recebe da blockchain da Phala, atuando como uma fila de mensagens criptografadas, e garante a execução segura e fiel, independentemente da presença de trabalhadores maliciosos. Nesse sentido, a blockchain da Phala solicita uma atualização de feed de preços, que os trabalhadores off-chain da Phala buscam na Ethereum MainNet e retornam para a blockchain da Phala.\n\nÉ importante notar que a Phala não se limita a replicar os Oráculos existentes. Você pode criar Oráculos totalmente novos obtendo dados off-chain por meio de Contratos Phat. Neste [exemplo de Oráculo Phat-EVM](https://github.com/Phala-Network/phat-offchain-rollup/blob/main/EvmRollup.md){target=\\_blank}, os dados de preços são obtidos da API CoinGecko. As atualizações de cotação de preços podem então ser transmitidas constantemente do contrato Phat (design push), ou o contrato inteligente EVM pode solicitar uma cotação atualizada do contrato Phat (design pull).\n\n## Buscar Dados de Preço {: #fetch-price-data }\n\nHá vários feeds de preços disponíveis na rede EVM de demonstração com os quais você pode interagir. Os feeds de preços habilitados por Contratos Phat usam a mesma interface dos feeds de preços da Chainlink. Os dados residem em uma série de contratos inteligentes (um por feed de preço) e podem ser buscados com a interface do agregador:\n\n???+ code \"AggregatorV3Interface.sol\"\n\n    ```solidity\n    --8<-- 'code/builders/toolkit/integrations/oracles/phala/AggregatorV3Interface.sol'\n    ```\n\nComo visto acima na interface, existem cinco funções para buscar dados: `decimals`, `description`, `version`, `getRoundData` e `latestRoundData`. Para obter mais informações sobre o `AggregatorV3Interface.sol`, consulte a [Referência da API Chainlink](https://docs.chain.link/data-feeds/api-reference){target=\\_blank}.\n\n### Ativos Suportados {: #supported-assets }\n\nA Phala obtém seus dados de feed de preços espelhando os feeds de preços da Chainlink da Ethereum MainNet. Atualmente, existem contratos de feed de dados para [a rede EVM de demonstração](/builders/tanssi-network/testnet/demo-evm-network/){target=\\_blank} para os seguintes pares de ativos:\n\n=== \"Rede EVM de Demonstração Tanssi\"\n    | Par de Ativo e Base |                                                                          Contrato do Agregador                                                                          |\n    |:-----------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------:|\n    |    AAVE para USD    | [{{ networks.demo_evm.oracles.phala.aave_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x2E1640853bB2dD9f47831582665477865F9240DB){target=\\_blank} |\n    |    BTC para USD     | [{{ networks.demo_evm.oracles.phala.btc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x89BC5048d634859aef743fF2152363c0e83a6a49){target=\\_blank}  |\n    |    CRV para USD     | [{{ networks.demo_evm.oracles.phala.crv_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xf38b25b79A72393Fca2Af88cf948D98c64726273){target=\\_blank}  |\n    |    DAI para USD     | [{{ networks.demo_evm.oracles.phala.dai_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x1f56d8c7D72CE2210Ef340E00119CDac2b05449B){target=\\_blank}  |\n    |    ETH para USD     | [{{ networks.demo_evm.oracles.phala.eth_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x739d71fC66397a28B3A3b7d40eeB865CA05f0185){target=\\_blank}  |\n    |    USDC para USD    | [{{ networks.demo_evm.oracles.phala.usdc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x4b8331Ce5Ae6cd33bE669c10Ded9AeBA774Bf252){target=\\_blank} |\n    |    USDT para USD    | [{{ networks.demo_evm.oracles.phala.usdt_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x5018c16707500D2C89a0446C08f347A024f55AE3){target=\\_blank} |\n\n=== \"Ethereum MainNet\"\n    | Par de Ativo e Base |                                                          Contrato do Agregador                                                           |\n    |:-----------------:|:--------------------------------------------------------------------------------------------------------------------------------------:|\n    |    AAVE para USD    | [0x547a514d5e3769680Ce22B2361c10Ea13619e8a9](https://etherscan.io/address/0x547a514d5e3769680Ce22B2361c10Ea13619e8a9){target=\\_blank} |\n    |    BTC para USD     | [0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c](https://etherscan.io/address/0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c){target=\\_blank} |\n    |    CRV para USD     | [0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f](https://etherscan.io/address/0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f){target=\\_blank} |\n    |    DAI para USD     | [0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9](https://etherscan.io/address/0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9){target=\\_blank} |\n    |    ETH para USD     | [0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419](https://etherscan.io/address/0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419){target=\\_blank} |\n    |    USDC para USD    | [0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6](https://etherscan.io/address/0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6){target=\\_blank}

















    ```solidity

    ```



































































```bash

```

```bash


```


```bash

```solidity
```

````

```typescript

```

````

```ts

    ```solidity

````
    ```

```bash

```

```typescript
```bash

```

```bash

```

```typescript

    ```ts

    ```


```bash

```

```bash

```

```bash

```









```bash

```




























```typescript



```



```bash

```
