#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" <<-EOSQL
    GRANT ALL ON ALL TABLES IN SCHEMA public TO "$DB_USER";
EOSQL