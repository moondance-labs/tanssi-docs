---
title: Modelo EVM Base
description: O repositório Tanssi inclui um modelo EVM que fornece todas as configurações necessárias para lançar uma rede totalmente compatível com o Ethereum.
icon: material-ethereum
categories: EVM-Template
---

# Modelo EVM Base {: #baseline-evm-template }

## Introdução {: #introduction }

O modelo de rede EVM (Ethereum Virtual Machine) da Tanssi foi projetado para equipes que desenvolvem suas aplicações em cima de contratos inteligentes EVM. Ele inclui todos os componentes essenciais necessários para uma rede totalmente compatível com o Ethereum:

- **EVM** - adiciona uma camada de execução da Ethereum Virtual Machine para aplicações de contratos inteligentes baseados em EVM
- **Suporte Etherum JSON RPC** - as redes EVM da Tanssi são totalmente compatíveis com [Ethereum JSON RPC](https://ethereum.org/developers/docs/apis/json-rpc/){target=\_blank}. Consequentemente, todas as ferramentas baseadas em Ethereum como [MetaMask](https://metamask.io){target=\_blank}, [Ethers.js](https://docs.ethers.org/v6/){target=\_blank}, [Viem](https://viem.sh){target=\_blank}, [Hardhat](https://hardhat.org){target=\_blank}, [Foundry](https://getfoundry.sh/){target=\_blank} e muito mais, funcionam perfeitamente
- **Contas Unificadas** - permite que as redes EVM da Tanssi apresentem contas ECDSA no estilo Ethereum

## EVM Network Template {: #evm-network-template }

O modelo já inclui a configuração necessária para integração perfeita com o protocolo Tanssi e o provedor de segurança escolhido, por exemplo, [Symbiotic](https://symbiotic.fi/){target=\_blank} no Ethereum. Portanto, este modelo não requer alterações adicionais no tempo de execução se o aplicativo for construído em cima do EVM.

Isso significa que este modelo está pronto para ser implantado como está através da Tanssi, desbloqueando muitos recursos, como:

- Utilizar a [produção de blocos como serviço](/pt/learn/tanssi/network-services/block-production/){target=\_blank} da Tanssi
- Obter finalidade de transação determinística em segundos
- Escolher o provedor de segurança que melhor se adapta às suas necessidades. Por exemplo, aproveitar a segurança de nível Ethereum do [Symbiotic](https://symbiotic.fi/){target=\_blank}
- Construir dApps interagindo com sua rede através de uma [API](/pt/builders/toolkit/substrate-api/libraries/polkadot-js-api/){target=\_blank}
- Conectar qualquer carteira Ethereum, como [Metamask](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank} e Ledger
- Usar bibliotecas Ethereum bem conhecidas como [Ethers.js](/pt/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank}, [Web3.js](pt/builders/toolkit/ethereum-api/libraries/web3js/){target=\_blank}, [Web3.py](/pt/builders/toolkit/ethereum-api/libraries/web3py/){target=\_blank}, e mais
- Implantar contratos inteligentes EVM com ferramentas como [Remix](https://remix.ethereum.org){target=\_blank}, [Hardhat](https://hardhat.org){target=\_blank}, [Foundry](https://github.com/foundry-rs/foundry){target=\_blank}, e mais

## Módulos Incluídos {: #included-modules }

Alem dos módulos e configurações que tornam o modelo de rede Tanssi EVM compatível com o protocolo Tanssi, ele também inclui [muitos módulos](/pt/builders/build/templates/overview/#included-modules){target=\_blank} para fornecer funcionalidades básicas.

Para atingir a compatibilidade total com o Ethereum, esses módulos específicos também estão incluídos:

- **[EVM](https://docs.rs/pallet-evm/latest/pallet_evm){target=\_blank}** - adiciona suporte para execução de bytecode EVM não modificado em uma rede com tecnologia Tanssi. Ele usa o [SputnikVM](https://github.com/rust-ethereum/evm){target=\_blank} baseado em Rust como o mecanismo EVM subjacente
- **[Ethereum](https://docs.rs/pallet-ethereum/latest/pallet_ethereum){target=\_blank}** - funciona em conjunto com o módulo EVM para fornecer emulação completa para o processamento de blocos Ethereum. Entre muitas outras tarefas, é responsável por criar blocos Ethereum emulados para componentes específicos do Ethereum, como logs EVM

Ambos os módulos fazem parte do projeto [Frontier](https://github.com/polkadot-evm/frontier){target=\_blank}, que é a espinha dorsal das redes com tecnologia Tanssi compatíveis com Ethereum.
