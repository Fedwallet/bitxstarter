# [Docker][] on [Digitalocean][]


### Installing Docker on Ubuntu (Latest)

```sh
wget -q -O - https://get.docker.io/gpg | apt-key add -
echo deb http://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list
apt-get update -qq
apt-get install -q -y --force-yes lxc-docker
usermod -a -G docker vagrant
docker version
su - vagrant -c 'echo alias d=docker >> ~/.bash_aliases'
echo export DOCKER_OPTS=\"-H 127.0.0.1:4243\" | sudo tee -a /etc/default/docker
echo export DOCKER_HOST=127.0.0.1:4243 >> ~/.bashrc
sudo stop docker
sudo start docker
```


### Commands

```sh
docker version
docker info
docker search <image>                             # search images
docker pull <image>                               # download container images
docker run <image> echo "hello world"             # run comand in a container
docker run <image> apt-get install -y ping
docker ps                                         # list all running containers
docker ps -a
docker ps -l                                      # list containers your created
docker commit <id> <image>                        # save your changes
docker diff <id>                                  # diff
docker run <image> ping google.com                # run your new image
docker run -t -i <image> /bin/bash                # keep stdin open and run bash
docker inspect <id>                               # check your running image
docker images                                     # list all images
docker push <image>                               # push your image to index
docker build -t <name>:<version> --rm image       # build image from Dockerfile
docker tag <name>:<version> <name>:latest         # tag latest
docker push <name>                                # release
git tag <version> && git push origin <version>    # create a git tag

# Volumes           Host        : Contaier
docker run -i -t -v /home/vagrant:/var/www 03476d /bin/bash

# Run a container
#           host:container
docker run -p 80:80 -d <name>:<version>

# Remove <none:none> images
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")

# Remove temporary built images
docker images --no-trunc| grep none | awk '{print $3}' | xargs -r docker rmi

# Remove Docker containers with Exit status
docker ps -a --no-trunc | grep 'Exit' | awk '{print $1}' | xargs -r docker rm

# Remove all stopped containers.
docker rm $(docker ps -a -q)
```


### Docker Server

Docker VM Box
```
# Manual
/usr/bin/docker -d -H unix:///var/run/docker.sock -H tcp://0.0.0.0:4243 > /var/lib/docker/docker.log 2>&1 &

# Or edit `/etc/default/docker`
echo 'DOCKER_OPTS=" -H unix:///var/run/docker.sock -H tcp://0.0.0.0:4243"' >> /etc/default/docker

# Then
docker info
```

Host
```
export DOCKER_HOST="tcp://127.0.0.1:4243"
docker info
docker login
```



### Dockerfile


### Links

* [Getting Started][]
* [Docker Basics][]
* [Dockerfile tutorial][]
* [Docker index][]
* [Getting Started with Docker][]
* [Getting Started withc docker and coreos using vagrant][]


[Docker]: https://docker.io
[Docker Basics]: http://docs.docker.io/use/basics/
[Dockerfile tutorial]: https://www.docker.io/learn/dockerfile/
[Docker index]: https://index.docker.io/
[getting started]: https://www.docker.io/gettingstarted/
[getting started with docker]: http://serversforhackers.com/articles/2014/03/20/getting-started-with-docker/
[Digitalocean]: https://www.digitalocean.com
[Getting Started withc docker and coreos using vagrant]: http://lukebond.ghost.io/getting-started-with-coreos-and-docker-using-vagrant/

