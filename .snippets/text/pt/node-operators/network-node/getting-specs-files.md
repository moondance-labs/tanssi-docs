## Obtendo os arquivos de especificação {: #getting-specifications-files }

Um nó de appchain precisa de informações sobre duas blockchains para funcionar corretamente: a própria appchain e a cadeia de orquestração do Tanssi.

Essas informações ficam em um arquivo de especificações de cadeia, que inclui, entre outras coisas, o estado gênesis, permitindo que o nó verifique e sincronize corretamente os blocos e estados recebidos de outros nós.

Para obter o arquivo de especificação do Tanssi, execute:

=== "Tanssi MainNet"

    ```bash
    wget https://raw.githubusercontent.com/moondance-labs/tanssi/75e576add204abd321c48cded556c8de14d65618/chains/orchestrator-relays/node/tanssi-relay-service/chain-specs/starlight-raw-specs.json
    ```

=== "Dancelight TestNet"
    
    ```bash
    wget https://raw.githubusercontent.com/moondance-labs/tanssi/75e576add204abd321c48cded556c8de14d65618/chains/orchestrator-relays/node/tanssi-relay-service/chain-specs/dancelight-raw-specs.json
    ```

Para obter o arquivo de especificação da appchain, baixe-o no dashboard do [dApp](https://apps.tanssi.network){target=\_blank} clicando no link **Network Data**.

![Getting the chain specs](/images/node-operators/network-node/rpc-systemd/rpc-systemd-1.webp)
