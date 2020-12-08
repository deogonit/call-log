import requests
from wsgi_intercept import requests_intercept, add_wsgi_intercept

import json
import math
import unittest

from run import app
from tests.constants import ConstantsFilters, ConstantsHeaders, ConstantsLogs
from app.models import CallLog


def make_app():
    return app


class ApplicationTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.host = '0.0.0.0'
        self.port = 8000
        self.url = 'http://{}:{}'.format(self.host, self.port)
        requests_intercept.install()
        add_wsgi_intercept(self.host, self.port, make_app)
        CallLog.delete().where(CallLog.number_user.contains('+380')).execute()
        CallLog.insert(ConstantsLogs.TEST_LOGS).execute()

    def tearDown(self) -> None:
        CallLog.delete().where(CallLog.number_user.contains('+380')).execute()
        requests_intercept.uninstall()


class ApplicationConnectionTests(ApplicationTestCase):
    def setUp(self) -> None:
        super().setUp()

    def test_response_error(self):
        response = requests.get(self.url + '/')
        self.assertEqual(response.status_code, 404)

    def test_response_ok(self):
        response = requests.get(self.url + '/logs')
        self.assertEqual(response.status_code, 200)

    def test_check_response_headers(self):
        response = requests.get(self.url + '/logs')
        headers: dict = response.headers
        self.assertEqual(headers, ConstantsHeaders.RESPONSE_HEADERS)


class ApplicationGetLogs(ApplicationTestCase):
    def setUp(self) -> None:
        super().setUp()
        self.response = requests.get(self.url + '/logs')

    def test_check_get_request(self):
        request = self.response.request
        self.assertEqual(request.method, 'GET')

    def test_getting_all_logs(self):
        logs = json.loads(self.response.text)['logs']
        self.assertEqual(ConstantsLogs.SIZE_OF_PAGE, len(logs))


class ApplicationGetFilteringLogs(ApplicationTestCase):
    def setUp(self) -> None:
        super().setUp()

    def test_check_post_request(self):
        response = requests.post(self.url + '/logs', json={'filters': {}})
        self.assertEqual(response.request.method, 'POST')

    def test_search_number_user(self):
        response = requests.post(self.url + '/logs',
                                 json=ConstantsFilters.FILTERS_ONE)
        logs = json.loads(response.text)['logs']
        self.assertEqual(logs[0]['number_user'],
                         ConstantsLogs.TEST_LOGS[2]['number_user'])
        self.assertEqual(1, len(logs))

    def test_search_date_between(self):
        response = requests.post(self.url + '/logs',
                                 json=ConstantsFilters.FILTERS_TWO)
        logs = json.loads(response.text)['logs']
        self.assertEqual(logs[0]['number_user'],
                         ConstantsLogs.TEST_LOGS[3]['number_user'])
        self.assertEqual(1, len(logs))

    def test_search_date_from(self):
        response = requests.post(self.url + '/logs',
                                 json=ConstantsFilters.FILTERS_THREE)
        logs = json.loads(response.text)['logs']
        self.assertEqual(logs[0]['number_user'],
                         ConstantsLogs.TEST_LOGS[0]['number_user'])
        self.assertEqual(1, len(logs))


class ApplicationInvalidPostData(ApplicationTestCase):
    def setUp(self) -> None:
        super().setUp()

    def test_post_invalid_number(self):
        response = requests.post(self.url + '/logs',
                                 json={'filters': {
                                     'numberUser': '+38asd'
                                 }})
        error_message = json.loads(response.text)['error']
        self.assertEqual(response.status_code, 404)
        self.assertEqual(error_message, "Phone number must contain digit")


class PaginationTest(ApplicationTestCase):
    def setUp(self) -> None:
        super().setUp()
        self.count_of_pages = math.ceil(
            len(ConstantsLogs.FORMATTED_LOGS) / ConstantsLogs.SIZE_OF_PAGE)

    def test_check_response(self):
        response = requests.get(self.url + '/logs')
        response = json.loads(response.text)
        self.assertListEqual(list(response.keys()),
                             ['pages', 'page', 'size', 'total', 'logs'])

    def test_count_pages(self):
        response = requests.get(self.url + '/logs')
        response = json.loads(response.text)
        self.assertEqual(int(response['pages']), self.count_of_pages)
        self.assertEqual(int(response['page']), 1)

    def test_number_of_page(self):
        number_of_page = 2
        response = requests.get(self.url + '/logs?page=' + str(number_of_page))
        response = json.loads(response.text)
        logs = ConstantsLogs.FORMATTED_LOGS[
               (number_of_page - 1) * ConstantsLogs.SIZE_OF_PAGE:
               number_of_page * ConstantsLogs.SIZE_OF_PAGE]
        self.assertEqual(len(response['logs']), len(logs))
        self.assertEqual(int(response['page']), number_of_page)


class CallLogModelTest(ApplicationTestCase):
    def setUp(self) -> None:
        super().setUp()

    def test_check_str_method(self):
        log = CallLog.select().first()
        test_log = ConstantsLogs.TEST_LOGS[0]
        self.assertEqual(
            str(log),
            'User with number {} has called '
            'to user with number {}'.format(test_log['number_user'],
                                            test_log['number_answerer']))

    def test_check_jsonify(self):
        log = CallLog.select().first()
        test_log = ConstantsLogs.FORMATTED_LOGS[0]
        self.assertDictEqual(log.jsonify(), test_log)
