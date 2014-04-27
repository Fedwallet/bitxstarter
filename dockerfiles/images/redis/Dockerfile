FROM ubuntu:latest
MAINTAINER Fangdun Cai "<cfddream@gmail.com>" @fundon

ENV DEBIAN_FRONTEND noninteractive
RUN locale-gen en_US.UTF-8

RUN apt-get install -y software-properties-common sudo && \
    add-apt-repository ppa:chris-lea/redis-server && \
    apt-get update -qq && \
    apt-get install -y \
      redis-server

ADD redis.conf /etc/redis/redis.conf
ADD run /usr/local/bin/run
RUN chmod +x /usr/local/bin/run
EXPOSE  6379
VOLUME  ["/var/lib/redis"]
CMD ["/usr/local/bin/run"]
