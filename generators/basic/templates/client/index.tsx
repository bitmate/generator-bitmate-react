import * as React from 'react';
import * as ReactDOM from 'react-dom';
<% if (router === 'router') { -%>
import {Router, Route, browserHistory} from 'react-router';
<% } -%>
<% if (styling === 'bootstrap' && modules !== 'bower') { -%>
import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';
<% } -%>

import {Main} from './app/main';
import './index.<%- css %>';

ReactDOM.render(
<% if (router === 'router') { -%>
  <Router history={browserHistory}>
    <Route path='/' component={Main}/>
  </Router>,
<% } else { -%>
  <Main/>,
<% } -%>
  document.getElementById('root')
);
