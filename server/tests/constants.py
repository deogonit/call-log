from datetime import datetime, timedelta, time
import random
from unittest import mock

DATETIME_FORMAT = '%b %d, %Y %H:%M:%S'


def get_generated_number():
    template = '+380'
    return template + ''.join(
        [str(random.randint(0, 9)) for _ in range(10)])


class ConstantsHeaders:
    RESPONSE_HEADERS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, '
                                        'Accept, '
                                        'Content-Type, '
                                        'X-Requested-With, '
                                        'X-CSRF-Token',
        'Content-Type': 'application/json',
        'Content-Length': mock.ANY
    }


class ConstantsLogs:
    SIZE_OF_PAGE = 3

    TEST_LOGS = [
        {
            'number_user': get_generated_number(),
            'number_answerer': get_generated_number(),
            'datetime_call': datetime.today() + timedelta(days=2),
            'duration_call': time(0, 1, 45),
        },
        {
            'number_user': '+380969643249',
            'number_answerer': get_generated_number(),
            'datetime_call': datetime.today() + timedelta(days=-1),
            'duration_call': time(4, 25, 12),
        },
        {
            'number_user': '+38096964789',
            'number_answerer': '+380963228123',
            'datetime_call': datetime.strptime('Apr 21, 2020 11:56:55',
                                               DATETIME_FORMAT),
            'duration_call': time(12, 54, 12),
        },
        {
            'number_user': get_generated_number(),
            'number_answerer': get_generated_number(),
            'datetime_call': datetime.strptime('Apr 6, 2020 11:56:55',
                                               DATETIME_FORMAT),
            'duration_call': time(10, 54, 12),
        }
    ]

    FORMATTED_LOGS = [{
        'number_user': log['number_user'],
        'number_answerer': log['number_answerer'],
        'datetime_call': log['datetime_call'].strftime(DATETIME_FORMAT),
        'duration_call': str(log['duration_call'])
    } for log in TEST_LOGS[:]]


class ConstantsFilters:
    FILTERS_ONE = {
        'filters': {
            'numberUser': ConstantsLogs.TEST_LOGS[2]['number_user'][1:],
            'numberAnswerer': ConstantsLogs.TEST_LOGS[2]['number_answerer'][1:]
        }
    }

    FILTERS_TWO = {
        'filters': {
            'callStartDateFrom': 'Apr 5, 2020 11:56:55',
            'callStartDateTill': 'Apr 7, 2020 11:56:55',
        }
    }

    FILTERS_THREE = {
        'filters': {
            'callStartDateFrom': datetime.today().strftime(DATETIME_FORMAT),
        }
    }
