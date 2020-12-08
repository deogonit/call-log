import os


class DatabaseSettings:
    NAME = os.environ.get('POSTGRES_DB')
    USER = os.environ.get('POSTGRES_USER')
    PASSWORD = os.environ.get('POSTGRES_PASSWORD')
    PORT = os.environ.get('POSTGRES_PORT')
    HOST = os.environ.get('POSTGRES_HOST')


class ConfigurationLogger:
    APP_NAME = 'app'
    NAME_FILE_LOG = 'app.log'
    FORMAT = '%(msg)s'
