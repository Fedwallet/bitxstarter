FROM ubuntu:latest
MAINTAINER Fangdun Cai "<cfddream@gmail.com>" @fundon

# Ensure UTF-8
ENV DEBIAN_FRONTEND noninteractive
RUN locale-gen en_US.UTF-8
ENV LANG       en_US.UTF-8
ENV LC_ALL     en_US.UTF-8

RUN echo "#!/bin/sh\nexit 101" > /usr/sbin/policy-rc.d; chmod +x /usr/sbin/policy-rc.d &&\
    apt-get update -qq &&\
    apt-get -qy --fix-missing --force-yes install language-pack-en &&\
    update-locale LANG=en_US.UTF-8 LANGUAGE=en_US.UTF-8 LC_ALL=en_US.UTF-8 &&\
    dpkg-reconfigure locales &&\
    apt-get install -y curl &&\
    curl -s http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | apt-key add - &&\
    su -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' &&\
    apt-get update -qq &&\
    apt-get install -y postgresql-9.3 postgresql-contrib-9.3 postgresql-9.3-pgextwlist libpq-dev &&\
    apt-get clean &&\
    rm /usr/sbin/policy-rc.d
  
ADD postgresql.conf /etc/postgresql/9.3/main/postgresql.conf
ADD pg_hba.conf /etc/postgresql/9.3/main/pg_hba.conf

# Add launch shell
ADD run /usr/local/bin/run
RUN chmod +x /usr/local/bin/run

# Expose the PostgreSQL port
EXPOSE 5432

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME	["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

# Set the default command to run when starting the container
CMD ["/usr/local/bin/run"]
