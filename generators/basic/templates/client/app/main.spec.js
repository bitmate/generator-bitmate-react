/* eslint-env jasmine */
<% if (modules === 'webpack') { -%>
var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var Main = require('./main');
<% } -%>
<% if (modules === 'systemjs') { -%>
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Main from './main';
<% } -%>
<% if (modules === 'bower') { -%>
var TestUtils = React.addons.TestUtils;
<% } -%>

describe('main component', function () {
  it('should render hello world', function () {
    var main = TestUtils.renderIntoDocument(<Main/>);
    var h1 = TestUtils.findRenderedDOMComponentWithTag(main, 'h1');
    expect(h1.textContent).toEqual('Hello World!');
  });
});
