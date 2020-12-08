import React from 'react';
import ReactDOM from 'react-dom';
import CallLogApp from "./components/call-log-app/call-log-app";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <CallLogApp logs={[]}/>
  </React.StrictMode>,
  document.getElementById('root')
);
