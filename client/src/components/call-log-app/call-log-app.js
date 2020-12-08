import React, {Component} from 'react';

import TableLogs from '../table-logs';
import FormLogs from "../form-logs";
import Pagination from "../pagination";
import CallLogService from "../../services/call-log-service";

import './call-log-app.css';


export default class CallLogApp extends Component {
    _service = new CallLogService();

    constructor(props) {
        super(props);
        this.state = {
            logs: props.logs ? props.logs : [],
            totalLogs: undefined,
            postPerPage: 3,
            page: 1,
            pages: undefined,
            filters: {}
        };
    }

    componentDidMount() {
        this._service
            .getAllLogs()
            .then(response => {
                this.setState(response);
            })
            .catch(error => {
                this.setState({logs: []});
            });
    }

    paginate = (event, pageNumber) => {
        event.preventDefault();
        const {filters} = this.state;
        const response = filters ?
            this._service.getFilteringLogs(filters, pageNumber):
            this._service.getAllLogs(pageNumber);
        response
            .then(response => {
                this.setState(response);
            })
            .catch(error => {
                this.setState({logs: []});
            });
    }

    onChange = (state) => {
        this.setState(state);
    }

    render() {
        const pagination = this.state.pages > 1 ?
            <Pagination totalPosts={this.state.totalLogs}
                        postsPerPage={this.state.postPerPage}
                        paginate={this.paginate}
                        currentPage={this.state.page}/> :
            null;
        return (
            <div className="container">
                <h1>Call log</h1>
                <TableLogs logs={this.state.logs}/>
                {pagination}
                <h2>Search a call</h2>
                <FormLogs onChange={this.onChange}
                          currentPage={this.state.page}
                          service={this._service}
                          sendRequest={this.paginate}
                />
            </div>
        )
    }
}
