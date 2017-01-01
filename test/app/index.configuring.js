'use strict';

const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
});

test.beforeEach(() => {
  context.mergeJson['bower.json'] = {};
  context.config = {
    set: () => {
    }
  };
});

test('Call this.config.set twice', () => {
  context.config = {
    set: () => {}
  };
  const spy = chai.spy.on(context.config, 'set');
  TestUtils.call(context, 'configuring');
  expect(spy).to.have.been.called.once();
  expect(spy).to.have.been.called.with('props');
});

test(`Add angular deps to bower.json dependencies`, t => {
  context.props = {};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies.react, '^15.0.1');
});

test(`Add 'react-router' to bower.json dependencies`, t => {
  context.props = {router: 'router', modules: 'bower'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies['react-router'], '^3.0.0');
});

test(`Don't add 'react-router' to bower.json when modules is 'webpack'`, t => {
  context.props = {router: 'router', modules: 'webpack'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies['react-router'], undefined);
});

test(`Add 'bootstrap' to bower.json dependencies`, t => {
  context.props = {styling: 'bootstrap'};
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['bower.json'].dependencies.bootstrap, '3.3.4');
  t.is(context.mergeJson['bower.json'].dependencies['react-bootstrap'], '^0.30.7');
});
