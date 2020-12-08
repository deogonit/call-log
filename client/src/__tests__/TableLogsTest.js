import React from 'react';
import {render} from '@testing-library/react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import TableLogs from "../components/table-logs/table-logs";

import DummyCallLogService from "../services/dummy-call-log-service";


describe('TableLogs', () => {
    describe('Without logs', () => {
        const output = shallow(<TableLogs logs={[]}/>);
        it('should render correctly', () => {
            expect(shallowToJson(output)).toMatchSnapshot();
        });

        it('should correct render headers of table', () => {
            expect(output.find('th')).toHaveLength(5);
        });

        it('should show a loading... in table', () => {
            expect(output.find('td')).toHaveLength(1);
            expect(output.find('td').text()).toEqual('Loading...');
        });
    });

    describe('With logs', () => {
        const service = new DummyCallLogService();
        const output = shallow(<TableLogs logs={service.getAllLogs()}/>);

        it('should render correctly', () => {
            expect(shallowToJson(output)).toMatchSnapshot();
        });

        it('should render table\'s raws', () => {
            expect(output.find('TableRawLog')).toHaveLength(service.getAllLogs().length);
        });
    });
});

