# Docker-Postgresql

  Based on [flynn-postgres](https://github.com/flynn/flynn-postgres)   
  and [orchardup-postgresql](https://github.com/orchardup/docker-postgresql).

  ***NOTE: `ssl:true` was turned off***.

      In docker server.

      $ sudo apt-get install postgresql-client-9.3
      $ docker run -d -p 5432:5432 -e POSTGRESQL_USER=test -e POSTGRESQL_PASS=oe9jaacZLbR9pN -e POSTGRESQL_DB=test fundon/postgresql
      da809981545f
      $ psql -h localhost -U test test
      Password for user test:
      psql (9.3.4)
      Type "help" for help.

      test=#

### Links

* https://github.com/orchardup/docker-postgresql
