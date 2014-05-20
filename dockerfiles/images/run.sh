# Configs

# Nginx
docker pull fundon/nginx:latest
docker run -p 88:80 -d fundon/nginx

# Redis
docker pull fundon/redis:latest
docker run -p 6379:6379 -d fundon/redis

# Redis
docker pull fundon/postgresql:latest
docker run -p 5432:5432 -e POSTGRESQL_USER=$POSTGRESQL_USER -e POSTGRESQL_PASS=$POSTGRESQL_PASS -e POSTGRESQL_DB=$POSTGRESQL_DB -d fundon/postgresql
