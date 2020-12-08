import React, {Component} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class DateInput extends Component {
    render() {
        let {name, selectedValue, onChangeHandler, placeholder} = this.props;
        return (
            <div className="col-6">
                <DatePicker style={{width: '100%'}}
                            name={name}
                            className='form-control'
                            selected={selectedValue}
                            onChange={onChangeHandler}
                            placeholderText={placeholder}
                            showTimeSelect
                            timeIntervals={30}
                            timeFormat='HH:mm'
                            dateFormat="MMM dd, yyyy HH:mm:ss"/>
            </div>
        );
    }
}