PostgreSQL
==========

## Init

### Create User

```
createuser -P walle
```

### Create Database

```
createdb -O walle bitappstore_dev
# password: eve
```

### Enable extension

```
# hstore
psql -d dbname -U superuser -c "CREATE EXTENSION hstore"
```

### Import sql

```
psql -d dbname < schema.sql
```

### Set Time Zone

```
dbname=> SHOW TIME ZONE;
dbname=> SET TIME ZONE UTC;
```

### SQL Operations

```sql

-- Show current database
SELECT current_database();

-- List of roles
\du

# List of installed extensions
\dx

-- Alter role
ALTER role user_name WITH superuser;

-- Alter sequence index
ALTER sequence "SequelizeMeta_id_seq" RESTART WITH 1;

```

## Links

* http://postgresguide.com/
* http://stackful-dev.com/setting-up-nodejs-and-postgresql-on-ubuntu-servers.html
* https://devcenter.heroku.com/articles/heroku-postgres-import-export
* http://www.postgresql.org/docs/9.3/static/hstore.html
