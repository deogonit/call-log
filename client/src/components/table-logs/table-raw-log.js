import React, {Component} from "react";


export default class TableRawLog extends Component {
    render() {
        let {id, log} = this.props;
        return (
            <tr key={id}>
                <td>{id + 1}</td>
                <td>{log.number_user}</td>
                <td>{log.number_answerer}</td>
                <td>{log.datetime_call}</td>
                <td>{log.duration_call}</td>
            </tr>
        )
    }
}
