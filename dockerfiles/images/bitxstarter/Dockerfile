FROM fundon/node:koa
MAINTAINER Fangdun Cai "<cfddream@gmail.com>" @fundon

USER root
ENV DEBIAN_FRONTEND noninteractive
RUN locale-gen en_US.UTF-8

RUN apt-get update -q &&\
    apt-get install -qqy --yes --force-yes zip wget ca-certificates build-essential &&\
    apt-get install -qqy \
      vim

USER worker
#VOLUME ["/home/worker/bitxstarter"]
ENV BITXSTARTER /home/worker/bitxstarter
#WORKDIR /bitxstarter

#CMD ["/bin/bash"]
