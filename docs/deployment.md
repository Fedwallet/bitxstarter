Node.js Deployments with Docker, Dokku & Digital Ocean
======================================================


  Dependence  |   Version
--------------|-----------
  Ubuntu      |   14.04
--------------|-----------
  Docker      |   0.10.0
--------------|-----------
  Dokku       |   0.2.4


### Update & Upgrade

SERVER
```
aptitude upgrade && aptitude update
```


SERVER
```
vim /etc/ssh/sshd_config
```

### AUFS

SERVER
```
aptitude install linux-image-extra-`uname -r`
```


### Install [Dokku][] & [Docker][]

SERVER
```
wget -qO- https://raw.github.com/progrium/dokku/master/bootstrap.sh | sudo bash
```

### Configure

SERVER
```
touch /home/dokku/VHOST
echo xxx.com > /home/dokku/VHOST
# echo $HOSTNAME > /home/dokku/VHOST
```

CLIENT
```
cat ~/.ssh/id_rsa.pub | ssh xxx.com "sudo sshcommand acl-add dokku [username]"
```

### Install plugins

SERVER
```
cd /var/lib/dokku/plugins
git clone https://github.com/Kloadut/dokku-pg-plugin.git postgresql
dokku plugins-install
```

#### Plugins

* [plugins wiki](https://github.com/progrium/dokku/wiki/Plugins)
* [domains](https://github.com/wmluke/dokku-domains-plugin)
* [postgresql](https://github.com/Kloadut/dokku-pg-plugin)
* [redis](https://github.com/luxifer/dokku-redis-plugin)


### Dokku Commands

SERVER
```
dokku help
```


### Deploy an App

CLIENT
```
cd node-js-sample
git remote add [name] dokku@xxx.com:node-js-app
git push [name] master
```


### Referecens

* http://catalyst-zero.com/release-your-app/
* http://blog.yld.io/2014/03/26/node-js-deployments-with-docker-dokku-digital-ocean/
* https://www.digitalocean.com/community/articles/how-to-use-the-dokku-one-click-install-image-to-deploy-your-app
* https://www.digitalocean.com/community/articles/how-to-use-dokku-plugins-to-access-additional-functionality
* http://blog.aranw.net/using-dokku-for-easy-deployments-with-digital-ocean/
* https://gun.io/blog/deploying-django-app-on-dokku/ Oldest!

[Dokku]: https://github.com/progrium/dokku
[Docker]: https://docker.io
