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

test('Set framework and call this.bitmatePrompts', t => {
  context.bitmatePrompts = () => {};
  const spy = chai.spy.on(context, 'bitmatePrompts');
  TestUtils.call(context, 'prompting.bitmate');
  t.is(context.options.server, 'none');
  t.is(context.options.client, 'react');
  expect(spy).to.have.been.called.once();
});

test('Set server to passed server if it exists', t => {
  context.bitmatePrompts = () => {};
  context.options.server = 'express';
  TestUtils.call(context, 'prompting.bitmate');
  t.is(context.options.server, 'express');
});
