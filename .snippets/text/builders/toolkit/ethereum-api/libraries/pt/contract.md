O contrato que você compilará e implantará nas próximas seções é um simples incrementador, chamado arbitrariamente de `Incrementer.sol`. Comece criando o arquivo do contrato:

```
touch Incrementer.sol
```

Em seguida, adicione o código Solidity ao arquivo:

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/Incrementer.sol'
```

A função `constructor`, executada no deploy, define o valor inicial da variável armazenada on-chain (padrão é 0). A função `increment` soma o `_value` fornecido ao número atual, exigindo o envio de uma transação que modifica o dado armazenado. Por fim, a função `reset` redefine o valor armazenado para zero.

!!! note
    Este contrato é um exemplo simples apenas para ilustração.
