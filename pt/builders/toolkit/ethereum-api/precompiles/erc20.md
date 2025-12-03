---
title: Pré-compilado ERC-20 do Token Nativo
description: Saiba como acessar e interagir com a representação ERC-20 do token nativo em redes EVM com tecnologia Tanssi.
keywords: solidity, ethereum, token nativo, erc20, tanssi, precompiled
icon: material-circle-outline
categories: EVM-Template
---

# Pré-compilado ERC-20 do Token Nativo

Este precompile expõe o token nativo como um ERC-20, eliminando a necessidade de contratos “wrapped” separados. dApps podem usar a interface ERC-20 diretamente para transferir o token da rede.

O precompile está localizado em:

```text
{{networks.demo_evm.precompiles.erc20}}
```

--8<-- 'text/builders/toolkit/ethereum-api/precompiles/pt/security-note.md'

## Interface Solidity {: #the-erc20-interface }

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/precompiles/erc20/erc20.sol'
```

Funções comuns incluídas:
- `totalSupply()`, `balanceOf(address)`  
- `allowance(owner, spender)`, `approve(spender, value)`  
- `transfer(to, value)`, `transferFrom(from, to, value)`  
- Eventos `Transfer` e `Approval`

## Usando via Remix {: #remix }

1. Abra [Remix](https://remix.ethereum.org){target=\_blank} e crie **ERC20.sol** com o conteúdo acima.  
2. Na aba **Deploy and Run**, selecione **Injected Provider - MetaMask**.  
3. Em **CONTRACT**, escolha **ERC20 - ERC20.sol** e, no campo **At Address**, insira `{{networks.demo_evm.precompiles.erc20}}`.  
4. As funções ERC-20 ficam disponíveis em **Deployed Contracts** para consultar saldo, aprovar e transferir.

## Endereços adicionais

Outros precompiles ERC-20 expostos na rede demo:

```text
{{networks.demo_evm.precompiles.deployment_fee_erc20}}
{{networks.demo_evm.precompiles.data_availability_erc20}}
```

Use o mesmo ABI para interagir com esses endereços se estiverem habilitados na sua rede.

--8<-- 'text/_disclaimers/third-party-content.pt.md'
