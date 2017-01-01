'use strict';

const test = require('ava');
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
});

test(`Set reactOptions router of 'router' and styling of 'bootstrap'`, async t => {
  context.option = () => {
  };
  context.prompt = () => new Promise(resolve => resolve({styling: 'bootstrap', router: 'router'}));
  TestUtils.call(context, 'prompting.reactOptions').then(() => {
    t.is(context.props.router, 'router');
    t.is(context.props.styling, 'bootstrap');
  });
});
