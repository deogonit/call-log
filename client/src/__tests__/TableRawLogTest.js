import React from 'react';
import {render} from '@testing-library/react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import TableRawLog from "../components/table-logs/table-raw-log";

import DummyCallLogService from "../services/dummy-call-log-service";

describe('Raws', () => {
    const service = new DummyCallLogService();
    const logs = service.getAllLogs();

    describe.each(logs)('TableRawLog', (log) => {
        const output = shallow(<TableRawLog id={log.id} log={log}/>)
        it('should render correctly', () => {
            expect(shallowToJson(output)).toMatchSnapshot();
        });

        it('should render the right values', () => {
            const cell = <td>{log.number_user}</td>;
            expect(output.contains(cell)).toEqual(true);
        });
    });
});