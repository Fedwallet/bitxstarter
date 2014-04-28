FROM ubuntu:latest
MAINTAINER Fangdun Cai "<cfddream@gmail.com>" @fundon

ENV DEBIAN_FRONTEND noninteractive
RUN locale-gen en_US.UTF-8

RUN apt-get update -q && \
    apt-get install -qy \
      python-dev \
      g++ \
      make \
      zlib1g-dev \
      libssl-dev \
      curl \
      man \
      git

RUN useradd -m worker -s /bin/bash
WORKDIR /home/worker
USER worker
ENV HOME /home/worker
ENV NVM_DIR $HOME/.nvm
RUN git clone https://github.com/creationix/nvm.git $HOME/.nvm
RUN echo "\nsource $HOME/.nvm/nvm.sh" >> ~/.bashrc
RUN /bin/bash -c "echo $NVM_DIR;source $HOME/.nvm/nvm.sh; nvm install 0.10; nvm alias default 0.10"
