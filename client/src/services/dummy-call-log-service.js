export default class DummyCallLogService {
    _logs = [
        {
            id: 0,
            number_user: '+380987563421',
            number_answerer: '+380123456789',
            datetime_call: 'Apr 21, 2020 11:56:55',
            duration_call: '00:01:45',
        },
        {
            id: 1,
            number_user: '+380969643249',
            number_answerer: '+3803297162814',
            datetime_call: 'May 04, 2020 17:59:28',
            duration_call: '04:25:12',
        },
        {
            id: 2,
            number_user: '+38096964789',
            number_answerer: '+380963228123',
            datetime_call: 'Apr 21, 2020 11:56:55',
            duration_call: '12:54:12',
        },
        {
            id: 3,
            number_user: '+3807148469487',
            number_answerer: '+3807800505760',
            datetime_call: 'Apr 06, 2020 11:56:55',
            duration_call: '10:54:12',
        },
    ];

    getAllLogs = () => {
        return this._logs;
    }
}

