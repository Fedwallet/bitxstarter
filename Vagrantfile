# -*- mode: ruby -*-
# vi: set ft=ruby :

COREOS_BOX_URL = "http://storage.core-os.net/coreos/amd64-generic/dev-channel/coreos_production_vagrant.box"
VAGRANT_BOX_URL = "http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"

BOX_NAME    = ENV["BOX_NAME"] || "trusty"
BOX_URI     = ENV["BOX_URI"] || "$VAGRANT_BOX_URL"
BOX_MEMORY  = ENV["BOX_MEMORY"] || "1024"
DOCKER_DOMAIN  = ENV["BXS_DOMAIN"] || "docker.dev"
DOCKER_IP      = ENV["BXS_IP"] || "10.0.0.2"

CURRENT_DIR = File.dirname(__FILE__)
PROJECT_NAME = File.split(File.realpath(CURRENT_DIR))[1] || ""

Vagrant.configure("2") do |config|
  config.vm.box = BOX_NAME
  config.vm.box_url = BOX_URI
  config.vm.synced_folder CURRENT_DIR, "/home/vagrant/#{PROJECT_NAME}"
  config.vm.hostname = DOCKER_DOMAIN
  config.vm.network :private_network, ip: DOCKER_IP
  config.vm.network :forwarded_port, guest: 88, host: 8080
  config.vm.network :forwarded_port, guest: 4243, host: 4243

  config.vm.provider :virtualbox do |v|
    v.name = DOCKER_DOMAIN
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    v.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
    v.customize ["modifyvm", :id, "--memory", BOX_MEMORY]
  end

  # plugin conflict
  if Vagrant.has_plugin?("vagrant-vbguest")
      config.vbguest.auto_update = false
  end

$init = <<EOFE
echo "Installing Dokku & Docker..."
export DEBIAN_FRONTEND=noninteractive
locale-gen en_US.UTF-8
sudo su -c "cat<<EOF > /etc/apt/sources.list
deb http://mirrors.163.com/ubuntu/ trusty main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ trusty-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ trusty-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ trusty-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ trusty main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ trusty-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ trusty-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ trusty-backports main restricted universe multiverse
EOF"
sudo apt-get update
sudo apt-get upgrade
wget -qO- https://raw.github.com/progrium/dokku/master/bootstrap.sh | sudo bash
sudo apt-get autoclean
EOFE

  config.vm.provision :shell, :inline => $init, :privileged => false

  config.vm.provision :docker
end
