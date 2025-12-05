---
title: Funcionalidades Principais do Runtime
description: Saiba sobre os recursos centrais de uma rede Tanssi, os tipos de transações, como são executadas e incluídas em um bloco, e as atualizações de runtime sem fork.
icon: octicons-package-24
categories: Basics
---

# Funcionalidades Principais do Runtime {: #core-runtime-features }

## Introdução {: #introduction}

As redes implantadas via Tanssi têm [muitos benefícios](/pt/learn/tanssi/overview/#what-tanssi-provides){target=\_blank} graças à sua [arquitetura](/pt/learn/tanssi/overview/#tanssi-architecture){target=\_blank} única.

Além disso, as redes com tecnologia Tanssi também são especiais por causa do [framework](/pt/learn/framework/){target=\_blank} (Substrate) sobre o qual são construídas, que oferece características que os desenvolvedores podem aproveitar para ajustar comportamentos específicos no runtime.

Esta seção aborda algumas dessas funcionalidades centrais: as diferentes origens que uma transação pode ter, os tipos de transações e como são executadas e incluídas em um bloco, a conta especial _SUDO_ e o recurso de atualizações de runtime sem fork.

## Origens {: #origins}

Em uma rede Tanssi, todas as chamadas têm uma origem, conceito análogo ao _msg.sender_ em EVM, porém com mais flexibilidade e níveis de privilégio:

- **Root** – origem de nível de sistema, com o privilégio mais alto; pode executar qualquer chamada.
- **Signed** – origem de uma transação assinada pela chave privada de uma conta on-chain; inclui o endereço como signatário.
- **None** – ausência de origem, usada para ações acordadas no nível de runtime (por exemplo, aplicar uma atualização pré-autorizada sem taxa).
- **Custom** – origens personalizadas para casos específicos (por exemplo, faixas de governança).

## Tipos de Transação {: #transaction-types}

- **Transações assinadas** – carga assinada solicitando uma chamada de runtime; normalmente cobram taxa da conta associada.
- **Transações não assinadas** – sem conta associada; exigem regras no runtime para evitar spam ou repetição (ex.: acionar uma atualização pré-aprovada).
- **Transações inerentes** – inseridas pelo sequenciador ao inicializar o bloco; não ficam no pool de transações; usadas para dados como timestamp do bloco.

## Execução de Transações {: #transaction-execution}

Transações assinadas são validadas pelas regras do runtime e enfileiradas no pool. Há duas filas: **pronta** (podem entrar no próximo bloco) e **futura** (ainda não atendem aos critérios, como nonce futuro). Transações inválidas são rejeitadas.

Durante a construção do bloco, um sequenciador usa um [sistema de prioridade](https://github.com/paritytech/substrate/blob/fb24fda76d613305ebb2e5728c75362c94b64aa1/frame/transaction-payment/src/lib.rs#L614-L681){target=\_blank}:

- **Inicialização (`on_initialize`)** – lógica executada antes das demais transações (ex.: timestamp inerente). Depois, o módulo confere hash pai e raiz da trie.
- **Execução de transações** – executa cada transação válida pela prioridade. Como o estado não é armazenado em cache antes, uma falha no meio invalida o bloco; o runtime deve validar bem.
- **Finalização (`on_idle`/`on_finalize`)** – lógica extra executada ao finalizar; ao fim, o módulo garante que digest e raiz de armazenamento correspondam ao esperado.

## Atualizações Sem Fork {: #forkless-upgrades}

[Atualizações sem fork](https://docs.polkadot.com/develop/parachains/maintenance/runtime-upgrades/){target=\_blank} permitem mudar a função de transição de estado sem bifurcar a rede. O runtime (blob Wasm) fica on-chain tanto na rede Tanssi quanto na rede alimentada pelo Tanssi. Após o período de atraso configurado, um sequenciador produz um bloco que referencia o novo runtime, e todos os operadores validam com a versão atualizada.

![Runtime Upgrade Process Tanssi Networks](/images/learn/decentralized-networks/runtime-features/runtime-features-1.webp)

## Conta SUDO {: #sudo-account}

O módulo [SUDO](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/pallet/struct.Pallet.html){target=\_blank} introduz uma conta _SUDO_ capaz de executar chamadas com origem [_Root_](#origins), como:

- Cunhar novos tokens nativos.
- Executar [atualizações de runtime sem fork](#forkless-upgrades).
- Enviar chamadas em nome de outros [tipos de origens](#origins).

SUDO é útil em testnets para mudanças rápidas, mas traz riscos de centralização em produção; recomenda-se guarda segura das chaves e uso de proxys. Avalie cuidadosamente antes de manter SUDO ativo em ambientes produtivos.
