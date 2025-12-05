## Requisitos de hardware {: #hardware-requirements }

Para operar um sequenciador com sucesso, é imprescindível usar hardware de ponta. Configurações abaixo do ideal podem fazer o nó ficar para trás, perdendo rodadas de autoria e recompensas.

Como o processo de produção/importação de blocos é quase totalmente single-thread, um desempenho maior por thread traz melhores resultados do que um maior número de núcleos.

Algumas recomendações de hardware que funcionam bem:

- **CPUs recomendadas** - Intel Xeon E-2386/2388 ou Ryzen 9 5950x/5900x
- **NVMe recomendado** - 1 TB NVMe
- **RAM recomendada** - 32 GB

!!! warning 
    Você é responsável não apenas pelo próprio stake, mas também pelo stake dos seus delegadores. Monitorar o desempenho do sequenciador e mantê-lo atualizado e seguro é fundamental para maximizar recompensas e construir reputação.

### Portas em uso {: #running-ports }

Como mencionado na [Introdução](#introduction), os sequenciadores serão designados para produzir blocos para qualquer rede ativa no ecossistema Tanssi ou para o próprio protocolo Tanssi. Para produzir blocos com sucesso, o nó deve conseguir sincronizar e participar de três redes P2P diferentes. Para isso, as seguintes portas precisam estar abertas para conexões de **qualquer** origem:

|       Rede           |    Porta    |
|:--------------------:|:-----------:|
|   **Cadeia Tanssi**  | 30333 (TCP) |
|   **Relay Chain**    | 30334 (TCP) |
| **Rede atribuída**   | 30335 (TCP) |
