- `--name INSERT_NAME` - nome legível para este nó
- `--rpc-port INSERT_PORT` - define a porta TCP do JSON-RPC na qual o nó ouve
- `--unsafe-rpc-external` - expõe o serviço RPC em todas as interfaces
- `--state-pruning INSERT_STATE_PRUNING_TYPE` - define quando o estado da rede alimentada pelo Tanssi deve ser removido do banco de dados. Pode ser `archive` (nó atua como completo mantendo todo o estado), `archive-canonical` (mantém apenas estados de blocos finalizados) ou um `number` (quantidade de blocos cujos estados serão mantidos)
- `--blocks-pruning INSERT_BLOCKS_PRUNING_TYPE` - define quantos blocos devem ser mantidos no banco de dados. Pode ser `archive` (nó completo mantendo todos os blocos), `archive-canonical` (mantém apenas blocos finalizados) ou um `number` (quantidade de blocos finalizados a manter)
- `--detailed-log-output` - habilita saída detalhada de logs

!!! warning
    O parâmetro `--unsafe-rpc-external` permite acesso externo à interface RPC do seu nó, tornando-a acessível de qualquer endereço IP. Certifique-se de que controles de segurança adequados estejam configurados.

Para ver a lista completa de flags disponíveis, descrição e valores possíveis, execute:
