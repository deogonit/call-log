import React from 'react';
import {render} from '@testing-library/react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'
import CallLogApp from "../components/call-log-app/call-log-app";
import DummyCallLogService from "../services/dummy-call-log-service";

describe('CallLogApp', () => {
    const output = shallow(<CallLogApp />);
    const service = new DummyCallLogService();

    it('should render correctly', () => {
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should check initial state', () => {
        expect(output.state().logs).toEqual([]);
        expect(output.state().page).toEqual(1);
    });

    it('should check component\'s children', () => {
        expect(output.children()).toHaveLength(4);
    });

    it('should check component doesn\'t render pagination component', () => {
        expect(output.find('Pagination')).toHaveLength(0);
        expect(output.find('TableLogs')).toHaveLength(1);
        expect(output.find('FormLogs')).toHaveLength(1);
    });

    it('should check component render pagination and table components', () => {
        const stateAfterRequest = {
            pages: 2,
            page: 1,
            totalLogs: 4,
            postsPerPage: 3,
            logs: service.getAllLogs(),
            filters: {}
        };
        output.setState(stateAfterRequest);
        expect(output.find('Pagination')).toHaveLength(1);
        expect(output.find('TableLogs')).toHaveLength(1);
        expect(output.find('FormLogs')).toHaveLength(1);
    });
});

