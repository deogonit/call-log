import React, {Component} from "react";

import {FormControl} from "react-bootstrap";

export default class TextInput extends Component {
    render() {
        let {name, placeholder, value, onChange} = this.props
        return (
            <div className="col-6">
                <FormControl name={name}
                             placeholder={placeholder}
                             value={value}
                             onChange={onChange}/>
            </div>
        );
    }
}
