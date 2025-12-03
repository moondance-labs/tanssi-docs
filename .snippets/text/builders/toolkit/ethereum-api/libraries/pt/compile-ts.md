Nesta seção, você criará um script que usa o compilador Solidity para gerar o bytecode e a interface (ABI) do contrato `Incrementer.sol`. Comece criando o arquivo `compile.ts`:

```bash
touch compile.ts
```

Depois, escreva o script neste arquivo e siga as etapas:

1. Importe os pacotes `fs` e `solc`
2. Use `fs.readFileSync` para ler e salvar o conteúdo de `Incrementer.sol` em `source`
3. Monte o objeto `input` do compilador Solidity, especificando `language`, `sources` e `settings`
4. Compile o contrato com `solc.compile` usando o `input`
5. Extraia o contrato compilado e exporte-o para o script de deploy
