Nesta seção, você criará um script que usa o compilador Solidity para gerar o bytecode e a interface (ABI) do contrato `Incrementer.sol`. Comece criando o arquivo `compile.js`:

```
touch compile.js
```

Em seguida, crie o script neste arquivo e conclua as etapas:

1. Importe os pacotes `fs` e `solc`
2. Use `fs.readFileSync` para ler e salvar o conteúdo de `Incrementer.sol` em `source`
3. Monte o objeto `input` para o compilador Solidity, especificando `language`, `sources` e `settings`
4. Com o `input`, compile o contrato usando `solc.compile`
5. Extraia o contrato compilado e exporte-o para uso no script de deploy

```js
--8<-- 'code/builders/toolkit/ethereum-api/compile.js'
```
