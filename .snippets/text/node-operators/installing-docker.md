### Installing Docker {: #installing-docker}

To get started, you'll need access to a computer running a Linux OS and install [Docker](https://docs.docker.com/desktop/install/linux-install/){target=\blank}.

Run the following command to install Docker on a Linux Ubuntu platform:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

And the following command to check the installation:

```bash
sudo docker run hello-world
```

This is what a successful execution in the terminal looks like:

--8<-- 'code/node-operators/terminal/hello-world.md'
