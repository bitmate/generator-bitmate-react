'use strict';

const path = require('path');
const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('@oligibson/bitmate-generator').TestUtils;

let context;

const files = [
  'client/index.html',
  'client/favicon.ico',
  'client/robots.txt',
  'client/.htaccess'
];

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test.beforeEach(() => {
  context.copyTemplate['client/index.html'] = null;
});

test(`Write 'index.html'`, t => {
  context.props = {};
  TestUtils.call(context, 'writing');
  t.true(context.copyTemplate['client/index.html'].length > 0);
});

test(`Call this.copyTemplate 4 times`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'writing');
  expect(spy).to.have.been.called.exactly(files.length);
  files.forEach(file => t.true(context.copyTemplate[file].length > 0));
});
