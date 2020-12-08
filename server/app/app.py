import logging

from bottle import Bottle
from peewee import PostgresqlDatabase

from app.settings import ConfigurationLogger, DatabaseSettings


def init_logger():
    logger = logging.getLogger(ConfigurationLogger.APP_NAME)
    logger.setLevel(logging.INFO)
    file_handler = logging.FileHandler(ConfigurationLogger.NAME_FILE_LOG)
    formatter = logging.Formatter(ConfigurationLogger.FORMAT)
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return logger


app = Bottle()

app_logger = init_logger()

database = PostgresqlDatabase(
    DatabaseSettings.NAME,
    user=DatabaseSettings.USER,
    password=DatabaseSettings.PASSWORD,
    host=DatabaseSettings.HOST,
    port=DatabaseSettings.PORT
)
