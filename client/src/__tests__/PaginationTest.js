import React from 'react';
import {render} from '@testing-library/react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Pagination from "../components/pagination/pagination";
import DummyCallLogService from "../services/dummy-call-log-service";

describe('Pagination', () => {
    const service = new DummyCallLogService();
    const logs = service.getAllLogs();
    const mockPaginate = jest.fn();
    const nextProps = {
        postsPerPage: 3,
        totalPosts: logs.length,
        paginate: mockPaginate,
        currentPage: 1
    };
    const numbers = [];
    for (let i = 1; i <= Math.ceil(nextProps.totalPosts / nextProps.postsPerPage); i++){
        numbers.push(i);
    }
    const output = shallow(<Pagination {...nextProps} />);

    it('should render corrctly',() => {
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should render right\'s count of list items',() => {
        expect(output.find('li')).toHaveLength(numbers.length);
    });

    it.each(numbers)('should check anchor', (numberPage) => {
        expect(output.find(`[id=${numberPage}]`).text()).toEqual(numberPage.toString())
    });

    it.each(numbers)('should check calling a function paginate', (numberPage) => {
        output.find(`[id=${numberPage}]`).simulate('click');
        expect(mockPaginate).toHaveBeenCalledTimes(numberPage);
    });

});


