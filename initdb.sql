CREATE USER user1 PASSWORD 'password';

CREATE DATABASE testdb OWNER user1;

\c testdb


CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

CREATE TABLE calllog
(
    id uuid,
    number_user     character varying(32)                     not null,
    number_answerer character varying(32)                     not null,
    datetime_call   timestamp without time zone default now() unique not null,
    duration_call   time without time zone                    not null
);
SELECT create_hypertable('calllog', 'datetime_call', migrate_data => true, chunk_time_interval => 3600000000);

INSERT INTO calllog (number_user, number_answerer, datetime_call, duration_call)
VALUES ('+3807953658482', '+3809022848666', '2020-04-19 16:30:55.159154', '00:01:45'),
       ('+3809696432491', '+3805846941032', '2020-04-16 16:30:55.159341', '04:25:12'),
       ('+3809696478932', '+3809632281231', '2020-04-17 16:30:55.159233', '12:54:12');

GRANT SELECT, INSERT, DELETE ON calllog TO user1;
