/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
<% if (router === 'router') { -%>
import {Router, Route, browserHistory} from 'react-router';
<% } -%>

import {Main} from './main/main';

import './app.<%- css %>';

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
