Initial Server Setup with Ubuntu
--------------------------------


### Root Login

```
ssh root@server_ip_address
```


### Change Your Password

```
passwd
# passwd demo
```


### Create/Remove a New User

```
adduser demo
# Add user to sudo group
usermod -aG sudo demo
userdel demo
# rm -rf /home/demo; remove the user's home directory
```


### Check the New User

```
id demo
groups demo
```


### Root Privileges

```
visudo

# User privilege specification
root    ALL=(ALL:ALL) ALL
demo    ALL=(ALL:ALL) ALL
```


### Configure SSH (Optional)

```
vim /etc/ssh/sshd_config
```

```
Port 2222
PermitRootLogin no
AllowUsers demo dokku
```

#### Change SSH Port

FROM
```
Port 22
```
TO
```
Port 2222
```

#### Restrict Root Login

FROM
```
PermitRootLogin yes
```
TO
```
PermitRootLogin no
```

#### Explicitly Permit Certain Users

```
AllowUsers demo
```


### Reload SSH

```
service ssh restart
```


### Re-login

```
ssh -p 2222 demo@server_ip_address
```



### Referecens

* [Initial Server Setup with Ubuntu 14.0](https://www.digitalocean.com/community/articles/initial-server-setup-with-ubuntu-14-04)
* [How To Set Up and Test DNS Subdomains with DigitalOcean's DNS Panel](https://www.digitalocean.com/community/articles/how-to-set-up-and-test-dns-subdomains-with-digitalocean-s-dns-panel)
