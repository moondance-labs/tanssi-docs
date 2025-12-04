Nesta seção, você criará um script que usa o compilador Solidity para gerar o bytecode e a interface (ABI) do contrato `Incrementer.sol`. Para começar, crie o arquivo `compile.js` executando:

```
touch compile.js
```

Em seguida, escreva o script e conclua estas etapas:

1. Importe os pacotes `fs` e `solc`
2. Use `fs.readFileSync` para ler e salvar o conteúdo de `Incrementer.sol` em `source`
3. Monte o objeto `input` para o compilador Solidity especificando `language`, `sources` e `settings`
4. Compile o contrato usando `solc.compile` com o objeto `input`
5. Extraia o contrato compilado e exporte-o para ser usado no script de implantação

```js
--8<-- 'code/builders/toolkit/ethereum-api/compile.js'
```
