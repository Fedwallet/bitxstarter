FROM fundon/node:koa
MAINTAINER Fangdun Cai "<cfddream@gmail.com>" @fundon

ENV DEBIAN_FRONTEND noninteractive
RUN locale-gen en_US.UTF-8

USER root
RUN apt-get install -qy \
      vim

USER worker
RUN mkdir bitxstarter
WORKDIR bitxstarter
VOLUME ["/home/worker/bitxstarter"]
ENV BITXSTARTER_DIR /home/worker/bitxstarter

EXPOSE 2333

CMD 
