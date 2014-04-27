FROM ubuntu:latest
MAINTAINER Fangdun Cai "<cfddream@gmail.com>" @fundon

ENV DEBIAN_FRONTEND noninteractive
RUN locale-gen en_US.UTF-8

RUN apt-get install -y software-properties-common &&\
    add-apt-repository ppa:nginx/development &&\
    apt-get update -qq &&\
    apt-get install -y \
      nginx

RUN mv /etc/nginx /etc/nginx-previous
ADD nginx /etc/nginx
RUN mkdir -p /var/log/nginx/logs

# Attach volumes.
VOLUME ["/etc/nginx", "/var/log/nginx"]

# Set working directory.
WORKDIR /etc/nginx

# Expose ports.
EXPOSE 80

#CMD service nginx start
CMD ["nginx"]

