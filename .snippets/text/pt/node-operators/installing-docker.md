### Instalando o Docker {: #installing-docker}

Para começar, você precisará de um computador com Linux e instalar o [Docker](https://docs.docker.com/desktop/setup/install/linux/){target=\blank}.

Execute o comando a seguir para instalar o Docker em um Ubuntu:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

E o comando abaixo para verificar a instalação:

```bash
sudo docker run hello-world
```

Uma execução bem-sucedida no terminal se parece com isto:

--8<-- 'code/node-operators/terminal/hello-world.md'
