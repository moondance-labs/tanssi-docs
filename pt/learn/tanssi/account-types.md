---
title: Contas no Protocolo Tanssi
description: Visão geral das chaves criptográficas essenciais para o protocolo Tanssi, detalhando os tipos de contas usados e suas funções gerais.
icon: octicons-key-24
categories: Basics
---

# Contas no Protocolo Tanssi

## Introdução {: #introduction }

A tecnologia blockchain baseia-se na criptografia de chaves [público-privadas](https://en.wikipedia.org/wiki/Public-key_cryptography){target=\_blank} para propriedade segura de ativos e verificação de transações. Chaves privadas autorizam transações, enquanto chaves públicas servem como endereços para verificação. Devido à natureza híbrida [Substrate](/pt/learn/framework/overview/#substrate-framework){target=\_blank} e Ethereum do protocolo Tanssi, entender os diferentes tipos de conta é crucial para usuários e operadores.

## Tipos de Conta no Protocolo Tanssi {: #key-types-in-tanssi-protocol }

| **Tipo de Conta** | **Algoritmo Subjacente** | **Uso Principal no Tanssi** |
| --- | --- | --- |
| [Sr25519](https://wiki.polkadot.com/learn/learn-cryptography/){target=\_blank} | Assinaturas Schnorr no grupo Ristretto | Esquema padrão de assinatura para transações baseadas em Substrate e identidade de operador. |
| [Ed25519](https://wiki.polkadot.com/learn/learn-cryptography/){target=\_blank} | EdDSA usando Curve25519 | Usado para funções específicas de consenso (ex.: produção de blocos, finalidade) no Substrate. |
| [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm){target=\_blank} | Algoritmo de Assinatura Digital de Curva Elíptica | Recebimento de recompensas via protocolo Symbiotic baseado em Ethereum para operadores. |

## Identidade e Operações {: #identity-and-operations }

A Tanssi, construída com o framework Substrate, utiliza esquemas criptográficos distintos para funções diferentes, principalmente _Sr25519_ e _Ed25519_. Esses tipos de conta são essenciais para interagir com os componentes Substrate do protocolo, assinando transações.

**Sr25519 (Schnorrkel/Ristretto x25519)** – é o tipo de conta principal usado na maioria das operações voltadas ao usuário dentro da Tanssi. Seus pontos fortes são segurança e eficiência. **Contas Sr25519 servem como sua identidade on-chain, usadas para manter tokens, participar de governança, pagar taxas de transação e outras interações gerais com a rede.**

**Ed25519 (Algoritmo de Assinatura Digital de Curva Edwards)** – enquanto Sr25519 cuida da identidade e transações gerais, Ed25519 é usado por seu alto desempenho em assinatura criptográfica, ideal para operações de consenso. **Na Tanssi, contas Ed25519 são usadas por operadores de nó para mecanismos críticos, como produção de blocos e finalidade.** Usuários comuns normalmente não criam ou usam diretamente contas Ed25519, mas elas são fundamentais para a segurança e operação da rede.

Operadores de nó na Tanssi precisam de uma conta Substrate para registrar suas atividades, incluindo validadores que protegem a rede e sequenciadores que produzem blocos. Esta conta também rastreia recompensas, com chaves de sessão mapeadas para ela para maior segurança.

## Segurança e Recompensas no Ethereum {: #security-and-rewards-on-ethereum }

O Algoritmo de Assinatura Digital de Curva Elíptica (ECDSA) é fundamental para o Ethereum e é usado pela Tanssi para integrar-se à rede Ethereum via Symbiotic. Essa parceria alavanca a segurança do Ethereum para redes com tecnologia Tanssi.

Operadores Tanssi precisam de uma conta ECDSA para receber recompensas distribuídas no Ethereum, geralmente via protocolo Symbiotic. A necessidade de contas Substrate e ECDSA destaca o design híbrido da Tanssi, em que as operações são baseadas em Substrate, e a segurança e as recompensas estão vinculadas ao Ethereum.

## Mapeamentos de Conta na Tanssi {: #account-mappings-in-tanssi }

### Vinculação Interna de Chaves (_Sr25519_ e _Ed25519_)

Dentro do protocolo Substrate da Tanssi, a identidade _Sr25519_ primária de um operador se vincula a chaves _Ed25519_ específicas usadas para tarefas de consenso (como produção de blocos). Os operadores criam essa vinculação com uma transação on-chain, mapeando suas chaves públicas internas (“chaves de sessão”) para a conta de stash. Esse registro on-chain garante que a rede atribua corretamente todas as ações das chaves de sessão à identidade primária do operador.

### Mapeamento de Recompensas entre Ecossistemas (_Sr25519_ e _ECDSA_)

Para recompensas no Ethereum (por exemplo, via [Symbiotic](/pt/learn/tanssi/external-security-providers/symbiotic/){target=\_blank}), a identidade _Sr25519_ do operador é mapeada para um endereço _ECDSA_ no Ethereum. As duas contas são vinculadas pelo middleware da Tanssi, garantindo que as recompensas do trabalho do operador na rede Tanssi sejam roteadas para a conta Ethereum designada.
