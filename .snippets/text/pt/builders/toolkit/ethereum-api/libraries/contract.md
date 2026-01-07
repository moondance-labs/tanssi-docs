O contrato que você irá compilar e implantar nas próximas seções é um simples incrementador, chamado `Incrementer.sol`. Comece criando o arquivo do contrato:

```
touch Incrementer.sol
```

Depois, adicione o código Solidity ao arquivo:

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/Incrementer.sol'
```

A função `constructor`, executada quando o contrato é implantado, define o valor inicial da variável `number` armazenada on-chain (padrão é 0). A função `increment` soma o `_value` informado ao número atual, mas exige uma transação, pois modifica o dado armazenado. Por fim, a função `reset` zera o valor armazenado.

!!! note
    Este contrato é apenas um exemplo simples para fins ilustrativos.
