Executar um nó de appchain com Tanssi permite conectar e interagir com a appchain usando sua própria infraestrutura via HTTP ou WebSocket.

Os nós armazenam dados de blocos e estado da rede. Há diferentes tipos que os desenvolvedores podem operar:

- **Nó Arquivo Completo** - armazena todos os dados de blocos e estados da rede em todas as alturas. Útil para consultar dados históricos, mas consome muito espaço
- **Nó Podado Completo** - armazena dados de blocos e estado até um certo número de blocos antes da altura atual. Útil para consultar dados recentes ou enviar transações pela sua infraestrutura. Requer bem menos espaço que um nó arquival, mas não mantém todo o estado da rede
