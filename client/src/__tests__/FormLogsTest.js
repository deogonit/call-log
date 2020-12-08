import React from 'react';
import {render} from '@testing-library/react';
import {shallow, mount} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'
import FormLogs from "../components/form-logs/form-logs";
import DateInput from "../components/form-logs/date-input";
import DummyCallLogService from "../services/dummy-call-log-service";
import moment from "moment";


describe('FormLogs', () => {
    const service = new DummyCallLogService();
    const output = shallow(<FormLogs/>);


    it('should render correctly', () => {
        expect(shallowToJson(output)).toMatchSnapshot();
        expect(output.find('TextInput')).toHaveLength(2);
        expect(output.find('DateInput')).toHaveLength(2);
        expect(output.find('Alert')).toHaveLength(0);
    });

    describe.each(['numberUser', 'numberAnswerer'])('check input with numbers', (nameField) => {
        const number = '+38012346689';

        beforeEach(() => {
            output.find(`[name='${nameField}']`).simulate('change', {
                target: {
                    name: nameField,
                    value: number
                }
            });
        })
        it('should change input numbers', () => {
            expect(output.state()['filters'][nameField]).toEqual(number);
        });
        afterEach(() => {
            output.setState({[nameField]: ''})
        });
    });

    describe('check the errors', () => {
        const props = {hasError: true, messageError: "Error message"};
        beforeAll(() => {
            output.setState(props);
        });
        it('should check error', () => {
            expect(output.find('Alert')).toHaveLength(1);
            expect(output.find('Alert').text()).toEqual(props.messageError);
        });

        afterAll(() => {
            output.setState({hasError: false, messageError: ""});
        });

        expect(output.find('Alert')).toHaveLength(0);
    });

    describe('check the warning', () => {
        const props = {hasWarning: true};
        beforeAll(() => {
            output.setState(props);
        });
        it('should check warning', () => {
            expect(output.find('Alert')).toHaveLength(1);
            expect(output.find('Alert').text()).toEqual("You send a empty filters inputs");
        });

        afterAll(() => {
            output.setState({hasWarning: false});
        });

        expect(output.find('Alert')).toHaveLength(0);
    });
});