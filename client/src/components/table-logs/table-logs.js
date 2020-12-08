import React, {Component} from "react";
import * as ReactBootstrap from "react-bootstrap";

import TableRawLog from "./table-raw-log";


export default class TableLogs extends Component {
    render() {
        let {logs} = this.props;
        return (
            <div className="logs">
                <ReactBootstrap.Table striped bordered hover className='table-logs'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User number</th>
                        <th>Number who answered</th>
                        <th>Date and time of call</th>
                        <th>Duration call</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (logs.length > 0) ?
                            logs.map((log, id) => {
                                return (
                                    <TableRawLog key={id} id={id} log={log}/>
                                );
                            }) :
                            <tr>
                                <td colSpan="5">Loading...</td>
                            </tr>
                    }
                    </tbody>
                </ReactBootstrap.Table>
            </div>
        )
    }
}
