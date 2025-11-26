---
title: Glossário
description: The Tanssi network's architecture is rich and complex. Here's a technical glossary for understanding Tanssi, including key terms, concepts, and definitions.
icon: octicons-book-24
---

# Glossário

## Introdução {: #introduction }

O protocolo Tanssi oferece uma ampla gama de recursos e arquitetura em camadas, tornando-o rico e complexo. Há uma grande quantidade de terminologia específica para Tanssi, Appchains, Symbiotic e o espaço web3 em geral. Compilamos uma lista de termos que você vai querer conhecer ao revisar a documentação do Tanssi.

## Appchain {: #appchain }

Um blockchain personalizável específico para aplicações implantado através do Tanssi que entra em operação em minutos, beneficiando-se da segurança compartilhada, serviços de produção de blocos, bridging integrado e outros serviços.

## BEEFY {: #beefy }

BEEFY significa _Bridge Efficiency Enabling Finality Yielder_. É um protocolo de consenso que o Tanssi utiliza para bridging eficiente e sem confiança para o Ethereum.

## Bridge {: #bridge }

Uma bridge no contexto web3 conecta dois blockchains soberanos diferentes. Tanssi oferece uma bridge integrada baseada no Snowbridge, conectando a rede Tanssi ao Ethereum de forma descentralizada e sem confiança.

## Dancelight {: #dancelight }

A TestNet oficial do Tanssi para implantação e experimentação rápida de redes.

## Data Preservers {: #data-preservers }

Nós de arquivamento completo que garantem a disponibilidade de dados e fornecem infraestrutura RPC para as redes Tanssi e com tecnologia Tanssi.

## ECDSA {: #ecdsa }

ECDSA significa _Elliptic Curve Digital Signature Algorithm_, que é o esquema criptográfico usado para contas Ethereum.

## Ed25519 {: #ed25519 }

É o esquema criptográfico para produzir assinaturas digitais usado por operadores de nós para mecanismos de consenso como produção de blocos.

## Gateway Contract {: #gateway }

Um dos componentes da bridge Tanssi-Ethereum. Ele serve como o ponto central de mensagens do Ethereum que recebe e valida mensagens do Tanssi.

## Light Client {: #light-client }

Um dos componentes da bridge Tanssi-Ethereum. Serve como um verificador on-chain para a legitimidade dos dados em uma rede.

Um cliente leve é um software que permite interagir com um blockchain sem ter que baixar todos os dados. Ele utiliza um subconjunto de informações (como cabeçalhos de blocos) e usa ferramentas como provas de Merkle para verificar a autenticidade de transações e dados. Isso torna os clientes leves mais eficientes em termos de recursos do que os nós completos.

## Merkle Root {: #merkle-root }

Um único hash criptográfico que permite a verificação de um conjunto inteiro de dados, como todas as transações em um bloco.

## Operator {: #operator }

Um nó que valida transações, fornecendo segurança através de um protocolo de restaking para Tanssi e todas as appchains movidas a Tanssi.

## Relayer {: #relayer }

Um componente sem estado que transporta mensagens e provas entre diferentes redes blockchain, como Tanssi e Ethereum.

## Restaking {: #restaking }

A prática de usar tokens já apostados para proteger protocolos ou serviços adicionais.

## Sequencer {: #sequencer }

Um nó responsável por executar transações e produzir blocos para appchains movidas a Tanssi.

## Session {: #session }

Um período de tempo durante o qual o mesmo conjunto de autoridades (sequencers ou validadores) está ativo.

## Sr25519 {: #sr25519 }

O principal esquema de assinatura que é usado para a maioria das operações voltadas para o usuário dentro da rede Tanssi.

## Substrate {: #substrate }

Uma estrutura de desenvolvimento de blockchain modular e de alto desempenho usada para construir Tanssi e appchains Tanssi.

## Symbiotic {: #symbiotic }

Um protocolo de restaking baseado em Ethereum, fornecendo serviços de restaking e segurança econômica para Tanssi e appchains com tecnologia Tanssi.

## $TANSSI(Substrate) {: #tanssi-substrate }

O token de utilidade nativo do protocolo Tanssi. É usado para staking, governança, operações de rede e muito mais.

## $TANSSI(ERC20) {: #tanssi-erc20 }

A representação ERC20 Ethereum do token Tanssi. É usado para pagar recompensas aos operadores e muito mais.

## Trustless {: #trustless }

Assim como uma _bridge sem confiança_, ela permite a operação sem exigir confiança em intermediários centralizados, contando, em vez disso, com provas criptográficas.

## Vault {: #vault }

Um componente Symbiotic que recebe e gerencia colaterais em restaking, delegando aos operadores e fornecendo segurança econômica às redes.

## Verifier {: #verifier }

O componente que valida provas criptográficas.
