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

