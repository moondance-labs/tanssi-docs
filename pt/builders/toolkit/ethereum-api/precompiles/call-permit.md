---
title: Call Permit Precompile
description: Aprenda a usar o Call Permit Precompile em redes EVM com tecnologia Tanssi para assinar e despachar chamadas EVM usando permissões EIP-712.
keywords: solidity, ethereum, call permit, gasless, tanssi, precompiled, contracts
icon: octicons-arrow-up-right-24
categories: EVM-Template
---

# Interagindo com o Call Permit Precompile

## Introdução {: #introduction }

O Call Permit Precompile permite que um usuário assine um permit EIP-712 para qualquer chamada EVM, que pode ser despachada por qualquer pessoa ou contrato inteligente. O despachante paga as taxas, viabilizando transações “gasless” para o signatário (desde que a chamada não envie valor).

O Call Permit Precompile está localizado no seguinte endereço:

```text
{{ networks.demo_evm.precompiles.call_permit }}
```

--8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/security-note.md'

## Interface Solidity {: #the-call-permit-interface }

[`CallPermit.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/CallPermit.sol){target=\_blank} expõe três funções principais:

??? code "CallPermit.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/call-permit/call-permit.sol'
    ```

- **dispatch(from, to, value, data, gasLimit, deadline, v, r, s)** — executa a chamada assinada; falha se o permit for inválido ou se a chamada revertir. Aumenta o nonce do signatário após sucesso.  
- **nonces(owner)** — retorna o nonce atual de `owner`.  
- **DOMAIN_SEPARATOR()** — retorna o separador de domínio EIP-712 usado para evitar replay.

### DOMAIN_SEPARATOR e assinatura

O separador segue o EIP-712 com `name = "Call Permit Precompile"`, `version = "1"`, `chainId` da rede e o endereço do precompile como `verifyingContract`. A mensagem assinada inclui `from`, `to`, `value`, `data`, `gasLimit`, `deadline` e o `nonce` atual.

## Preparar contratos de exemplo {: #setup-the-example-contract }

Use o contrato `SetMessage.sol` para demonstrar:

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/precompiles/call-permit/set-message.sol'
```

No Remix:

1. Crie arquivos **CallPermit.sol** e **SetMessage.sol**.  
2. Compile ambos.  
3. Implemente **SetMessage.sol** normalmente.  
4. Acesse o Call Permit Precompile clicando em **At Address** e informando `{{networks.demo_evm.precompiles.call_permit}}`.

## Gerar a assinatura {: #generate-call-permit-signature }

Você pode gerar a assinatura com Ethers.js usando EIP-712:

```js
--8<-- 'code/builders/toolkit/ethereum-api/precompiles/call-permit/getSignature.js'
```

Preencha:

- `from`: endereço que autoriza.  
- `to`: endereço do contrato alvo.  
- `value`: normalmente `0` (a menos que envie valor).  
- `data`: dados da chamada (ABI-encoded).  
- `gasLimit`: limite de gás desejado para a chamada.  
- `deadline`: timestamp UNIX em que o permit expira.  
- `chainId`: ID da rede.  
- `nonce`: obtido via `nonces(from)` no precompile.

Execute `node getSignature.js` e copie `v`, `r`, `s` para usar na chamada `dispatch`.

!!! remember
    Guarde chaves privadas em segurança; o exemplo destina-se apenas a testes.

## Despachar a chamada {: #dispatch-a-call }

1. No Remix, expanda o contrato Call Permit.  
2. Preencha os mesmos argumentos usados para assinar (`from`, `to`, `value`, `data`, `gasLimit`, `deadline`, `v`, `r`, `s`).  
3. Clique em **transact** e confirme no MetaMask.  
4. Verifique o efeito no contrato (`SetMessage.sol` > **get** deve retornar a nova mensagem).

Parabéns! Você assinou e despachou uma chamada com o Call Permit Precompile.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
