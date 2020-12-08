from bottle import run

from app import app, app_logger
from config import Configuration

if __name__ == '__main__':
    app_logger.info("Start call log application")
    run(app, host=Configuration.HOST,
        port=Configuration.PORT, debug=Configuration.DEBUG)
