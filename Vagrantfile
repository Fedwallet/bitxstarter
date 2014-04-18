# -*- mode: ruby -*-
# vi: set ft=ruby :

BOX_NAME    = ENV["BOX_NAME"] || "trusty"
BOX_URI     = ENV["BOX_URI"] || "http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
BOX_MEMORY  = ENV["BOX_MEMORY"] || "512"
# bitxstarter
BXS_DOMAIN  = ENV["BXS_DOMAIN"] || "bitxstarter.com"
BXS_IP      = ENV["BXS_IP"] || "10.0.0.2"

Vagrant.configure("2") do |config|
  config.vm.box = BOX_NAME
  config.vm.box_url = BOX_URI
  config.vm.synced_folder File.dirname(__FILE__), "/root/bitxstarter"
  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.hostname = "#{BXS_DOMAIN}"
  config.vm.network :private_network, ip: BXS_IP

  config.vm.provider :virtualbox do |v|
    v.name = "bitappstore.docker"
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    v.customize ["modifyvm", :id, "--ostype", "Ubuntu_64"]
    v.customize ["modifyvm", :id, "--memory", BOX_MEMORY]
  end

$init = <<EOF
echo Installing Docker...
apt-get update
apt-get install linux-image-extra-`uname -r` -y -q
sh -c "wget -qO- https://get.docker.io/gpg | apt-key add -"
sh -c "echo deb http://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"
apt-get update
apt-get install lxc-docker -y -q
echo Docker installed...
EOF

  config.vm.provision :shell, :inline => $init, :privileged => false
end
