# docker-redis

Redis on Docker, based on [orchardup/redis](https://github.com/orchardup/docker-redis).

    $ docker run -d -p 6379:6379 fundon/redis
    $ nc localhost 6379
    incr foo
    :1


