import math
from datetime import datetime

from bottle import request, response

from app.app import app
from app.models import CallLog
from app.app import app_logger


def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers[
            'Access-Control-Allow-Methods'] = 'GET, ' \
                                              'POST, ' \
                                              'PUT, ' \
                                              'OPTIONS'
        response.headers[
            'Access-Control-Allow-Headers'] = 'Origin, ' \
                                              'Accept, ' \
                                              'Content-Type, ' \
                                              'X-Requested-With, ' \
                                              'X-CSRF-Token'
        response.headers['Content-type'] = 'application/json'
        if request.method != 'OPTIONS':
            return fn(*args, **kwargs)

    return _enable_cors


def pagination(query, page):
    total = query.count()
    size = 3
    pages = math.ceil(total / size)
    page = page if pages >= page else 1
    result = {
        'pages': pages if pages > 0 else 1,
        'page': page,
        'size': size,
        'total': total,
        'logs': [log.jsonify() for log in query[(page - 1) * size:page * size]]
    }
    return result


def handle_error(code: int, message: str):
    response.status = code
    response.content_type = 'application/json'
    return {'error': message}


@app.route('/logs', method=['GET', 'OPTIONS', 'POST'])
@enable_cors
def get_log():
    query = CallLog.select()
    if request.method == 'GET':
        app_logger.info("{}: GET request".format(datetime.today()))
    if request.method == 'POST':
        json: dict = request.json if request.json else {}
        filters: dict = json.get('filters', {})
        app_logger.info(
            "{}: POST request with filters".format(datetime.today()))
        app_logger.info(filters)
        for filter_name in filters.keys():
            if filter_name in ['numberUser', 'numberAnswerer']:
                number: str = filters[filter_name]
                if not number.isdigit():
                    return handle_error(404, "Phone number must contain digit")

                if filter_name == 'numberUser':
                    query = query.where(
                        CallLog.number_user.contains(number))
                if filter_name == 'numberAnswerer':
                    query = query.where(
                        CallLog.number_answerer.contains(number))

            if filter_name == 'callStartDateFrom':
                query = query.where(
                    CallLog.datetime_call >= filters[filter_name])
            if filter_name == 'callStartDateTill':
                query = query.where(
                    CallLog.datetime_call <= filters[filter_name])

    page = request.query.dict.get('page', 1)
    if isinstance(page, list):
        page = int(page[0])
    result = pagination(query, page)
    app_logger.info(result)

    return result
