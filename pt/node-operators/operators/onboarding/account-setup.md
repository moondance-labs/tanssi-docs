---
title: Configure sua Conta de Operador
description: Aprenda a mapear a conta do seu nó com sua conta stash, tornando-o elegível para proteger o Tanssi e as redes alimentadas pelo Tanssi e receber recompensas.
icon: octicons-tools-24
categories: Operadores
---

# Configure sua Conta para Proteger o Ecossistema Tanssi

## Introdução {: #introduction }

Como apresentado na [seção de integração](/pt/node-operators/operators/onboarding/){target=\_blank}, assim que você [optar com sucesso para um cofre habilitado para Tanssi](/pt/node-operators/operators/onboarding/opt-in-to-tanssi/#opt-in-tanssi-vaults){target=\_blank}, [optar para a rede Tanssi](/pt/node-operators/operators/onboarding/opt-in-to-tanssi/#opt-in-tanssi){target=\_blank}, e [preencher o formulário de inscrição](https://www.tanssi.network/node-operators-application){target=\_blank}, esta é a sexta etapa do processo. Após esta etapa, seu nó estará apto a participar do protocolo Tanssi.

Nesta etapa, você mapeará sua conta de stash do Substrate (a que acompanha suas recompensas) para as chaves de sessão do seu nó (aquelas utilizadas para comunicação e consenso), permitindo que o protocolo inclua seu nó no conjunto ativo.

Este guia te orienta na geração de chaves de sessão para o seu nó, mapeando-as para sua conta através do portal do desenvolvedor Tanssi e verificando se a associação foi estabelecida corretamente.

## Verificando Pré-requisitos {: #checking-prerequisites }

Antes de configurar sua conta, certifique-se de que:

- Você tem um nó corretamente [configurado e em execução](/pt/node-operators/operators/onboarding/run-an-operator/){target=\_blank}
- Você [se registrou como operador](/pt/node-operators/operators/onboarding/register-in-symbiotic/){target=\_blank} no registro Symbiotic
- Você [optou pela Rede Tanssi e um cofre habilitado para Tanssi](/pt/node-operators/operators/onboarding/opt-in-to-tanssi/){target=\_blank}

## Mapear uma Conta para Seu Nó {: #map-account }

A primeira etapa é um processo de duas etapas que gera e mapeia as chaves de sessão para sua conta. Chaves de sessão podem ser comparadas ao ID do nó, e são usadas para executar operações na rede, como assinar provas de validade, enquanto sua conta acompanha seu trabalho e recompensas relacionadas, e pode ter uma identidade na cadeia.

Você precisará criar chaves de sessão para seus servidores principal e de backup. Cada servidor deve ter suas próprias chaves exclusivas. Como as chaves nunca saem de seus servidores, você pode considerá-las um ID exclusivo para aquele servidor.

### Gerar Chaves de Sessão {: #generate-session-keys }

Para gerar chaves de sessão, envie uma chamada RPC usando o método `author_rotateKeys` para o endpoint HTTP do seu nó. Para referência, se o endpoint HTTP do seu nó estiver na porta `9944`, a chamada JSON-RPC pode ser assim:

```bash
"Content-Type:application/json;charset=utf-8" -d \
  '{  
    "jsonrpc":"2.0",
    "id":1,
    "method":"author_rotateKeys",
    "params": []
  }'
```

Suas chaves de sessão codificadas em hexadecimal serão impressas no terminal no campo `"result"`.

--8<-- 'code/node-operators/operators/onboarding/account-setup/terminal/generate-session-keys.md'

!!! nota
  Certifique-se de anotar suas chaves de sessão. Na próxima seção, você precisará mapeá-las para sua conta.

### Mapear Chaves de Sessão {: #map-session-keys }

Para executar a etapa seguinte e mapear suas chaves de sessão para sua conta, abra o portal do desenvolvedor e vá para a aba **Desenvolvedor**, seção **Extrinsics**. O seguinte link o levará diretamente para lá:

=== "Tanssi MainNet"

```
[Portal do desenvolvedor da Mainnet](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/extrinsics){target=\_blank}
```

=== "Dancelight TestNet"

```
[Portal do desenvolvedor da TestNet](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}
```

Agora, siga estas etapas:

1. Selecione sua conta, que deve ser a mesma conta que você registrou com a Tanssi anteriormente
2. Selecione o módulo **session** e a extrínseca **setKeys**
3. Para **keys**, insira suas chaves de sessão
4. Para **proof**, insira `0x`
5. Clique em **Enviar Transação** e assine e envie a transação de sua carteira

![Crie e envie uma transação para definir as chaves de sessão no Polkadot.js Apps](/images/node-operators/operators/onboarding/account-setup/account-setup-1.webp)

## Verifique o Mapeamento das Chaves {: #verify-keys-mapping }

Usar o método `session.keyOwner` permite verificar se suas chaves de sessão foram mapeadas para sua conta conforme o esperado. Este método é acessível através do portal do desenvolvedor, na aba **Desenvolvedor**, seção **Chain state**. O link a seguir o levará direto para lá:

=== "Tanssi MainNet"

```
[Portal do desenvolvedor da Mainnet](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/chainstate){target=\_blank}
```

=== "Dancelight TestNet"

```
[Portal do desenvolvedor da TestNet](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/chainstate){target=\_blank}
```

Agora, siga estas etapas:

1. Selecione o módulo **session** e o query **keyOwner**
2. Insira `gran` no campo **SpCoreCryptoKeyTypeId**
3. Para **Bytes**, insira os primeiros sessenta e seis caracteres codificados em hexadecimal de suas chaves de sessão (por exemplo, `0x00a12170e0925a9bf98f31bbdd7988550c1bf587766a2d2735e969aa5b4291dc`)
4. Clique no botão **+** ao lado do campo extrínseco
5. A conta associada às chaves de sessão, que deve ser sua conta, será exibida na parte inferior da página

![Crie e envie uma consulta para verificar as chaves de sessão no portal do desenvolvedor](/images/node-operators/operators/onboarding/account-setup/account-setup-2.webp)

E é isso! Você mapeou sua conta com sucesso, e seu nó agora está qualificado para participar do protocolo.
