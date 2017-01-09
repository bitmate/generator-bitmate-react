<% if (modules !== 'bower') { -%>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import { Main } from './main';
<% } else { -%>
const TestUtils = React.addons.TestUtils;
<% } -%>

describe('main component', function() {
  it('should render hello world', function() {
    const main = TestUtils.renderIntoDocument(<Main/>);
    const h1 = TestUtils.findRenderedDOMComponentWithTag(main, 'h1');
    expect(h1.textContent).toEqual('Hello World!');
  });
});
