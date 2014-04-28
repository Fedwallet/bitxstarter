FROM fundon/nvm:latest
MAINTAINER Fangdun Cai "<cfddream@gmail.com>" @fundon

USER worker
RUN /bin/bash -c "echo $NVM_DIR;source $HOME/.nvm/nvm.sh; nvm install 0.11; nvm alias default 0.11; npm install koa -g;"
RUN echo "alias node='node --harmony'" >> .bashrc
