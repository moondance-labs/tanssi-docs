Uma das principais propostas do Tanssi é oferecer produção de blocos descentralizada e sem confiança para suas redes. O runtime do Tanssi gerencia a atribuição de sequenciadores para todas as redes ativas no ecossistema.

O algoritmo de atribuição distribui o conjunto disponível de sequenciadores a cada sessão, designando-os para uma cadeia aleatória. Assim, eles produzem blocos para a mesma rede por um período relativamente curto, aumentando a segurança geral do ecossistema.

Para isso, o binário do Tanssi (software usado para rodar nós) já possui um mecanismo embutido que alterna automaticamente a produção de blocos para a cadeia designada sem exigir alterações do operador. O binário inclui a lógica para sincronizar a nova cadeia e produzir blocos quando a sessão muda. Portanto, os sequenciadores precisam executar o binário do Tanssi, e não o das redes individuais (como fazem os nós completos).
