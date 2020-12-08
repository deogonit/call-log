import React, {Component} from 'react';
import {Button, Alert} from "react-bootstrap";
import _ from 'lodash'

import TextInput from "./text-input";
import DateInput from "./date-input";

import './form-logs.css'

export default class FormLogs extends Component {
    constructor() {
        super();
        this.state = {
            filters: {
                numberUser: '',
                numberAnswerer: '',
                callStartDateFrom: '',
                callStartDateTill: '',
            },
            hasWarning: false,
            hasError: false,
            messageError: ''
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        const filters = {...this.state.filters};
        _.keys(filters).forEach((key) => {
            if (filters[key] === '' || filters[key] === undefined) {
                delete filters[key]
            }
        });
        this.props.onChange({filters: filters});
        if (_.isEmpty(filters)) {
            this.setState({hasWarning: true});
        } else {
            this.props.service
                .getFilteringLogs(filters)
                .then(response => {
                    this.props.onChange(response);
                    this.setState({hasError: false, hasWarning: false,})
                })
                .catch(error => {
                    const msgError = error.response ?
                        error.response.body.error :
                        "Internal sever error";
                    this.setState({
                        hasError: true,
                        hasWarning: false,
                        messageError: msgError
                    });
                    this.props.onChange({logs: [], pages: null})
                });
        }
    }

    onCleanFields = () => {
        const filters = {
            filters: {
                numberUser: '',
                numberAnswerer: '',
                callStartDateFrom: '',
                callStartDateTill: '',
            }
        }
        this.setState(filters);
        this.props.onChange({filters: {}})
    }

    getAllLogs = (event) => {
        event.preventDefault();
        this.onCleanFields();
        this.props.service
            .getAllLogs()
            .then(response => {
                this.props.onChange(response)
                this.setState({hasError: false, hasWarning: false})
            })
            .catch((error) => {
                this.setState({
                    hasError: true,
                    hasWarning: false,
                    messageError: error.response.body.error
                });
                this.props.onChange({logs: [], pages: null})
            });
    }

    handleInputChange = (event) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [event.target.name]: event.target.value
            }
        })
    }

    handleFromDateChange = (date) => {
        this.setState({
            filters: {
                ...this.state.filters,
                callStartDateFrom: date
            }
        })
    }

    handleTillDateChange = (date) => {
        this.setState({
            filters: {
                ...this.state.filters,
                callStartDateTill: date
            }
        })
    }

    render() {
        const {
            hasError,
            messageError,
            hasWarning
        } = this.state;
        const {
            numberUser,
            numberAnswerer,
            callStartDateFrom,
            callStartDateTill
        } = this.state.filters;
        const error = hasError ?
            <Alert show={hasError} variant='danger'>
                {messageError}
            </Alert> : null;
        const warning = hasWarning ?
            <Alert show={hasWarning} variant='warning'>
                {"You send a empty filters inputs"}
            </Alert> : null;
        return (
            <div className="form-logs">
                {error}
                {warning}
                <form className='row'>
                    <div className='col'>
                        <div className="row justify-content-start">
                            <TextInput name='numberUser'
                                       placeholder='Number who called'
                                       value={numberUser}
                                       onChange={this.handleInputChange}/>

                            <TextInput name='numberAnswerer'
                                       placeholder='Number who answered'
                                       value={numberAnswerer}
                                       onChange={this.handleInputChange}/>
                        </div>
                        <div className='row mt-4'>
                            <DateInput name='callStartDateFrom'
                                       selectedValue={callStartDateFrom}
                                       onChangeHandler={this.handleFromDateChange}
                                       placeholder='Call start date from'/>

                            <DateInput name='callStartDateTill'
                                       selectedValue={callStartDateTill}
                                       onChangeHandler={this.handleTillDateChange}
                                       placeholder='Call start date till'/>
                        </div>
                    </div>

                    <Button className='btn-block mt-3'
                            type='submit'
                            onClick={this.onSubmit}
                            variant='success'>
                        Search logs
                    </Button>
                    <Button className='btn-block mt-3'
                            onClick={this.getAllLogs}
                            variant='primary'
                            type='button'>
                        Get all logs
                    </Button>
                    <Button className='btn-block mt-3'
                            onClick={this.onCleanFields}
                            variant='secondary'
                            type='button'>
                        Erase fields
                    </Button>
                </form>
            </div>
        );
    }
}