'use strict';

const test = require('ava');
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('@oligibson/bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
});

test.beforeEach(() => {
  context.mergeJson['bower.json'] = {};
  context.mergeJson['.babelrc'] = {};
  context.config = {
    set: () => {
    }
  };
});

test(`Add react to bower.json dependencies`, t => {
  context.props = {modules: 'bower'};
  TestUtils.call(context, 'configuring.pkg');
  t.is(context.mergeJson['bower.json'].dependencies.react, '15.4.2');
});

test(`Add react-dom and react-addons-test-utils to package.json dependencies`, t => {
  context.props = {modules: 'webpack'};
  TestUtils.call(context, 'configuring.pkg');
  t.is(context.mergeJson['package.json'].dependencies['react-dom'], '15.4.2');
  t.is(context.mergeJson['package.json'].devDependencies['react-addons-test-utils'], '15.4.2');
});

test(`Add 'react-router' to bower.json dependencies`, t => {
  context.props = {router: 'router', modules: 'bower'};
  TestUtils.call(context, 'configuring.pkg');
  t.is(context.mergeJson['bower.json'].dependencies['react-router'], 'https://cdnjs.cloudflare.com/ajax/libs/react-router/3.0.3/ReactRouter.min.js');
});

test(`Add 'react-router' to package.json dependencies`, t => {
  context.props = {router: 'router', modules: 'webpack'};
  TestUtils.call(context, 'configuring.pkg');
  t.is(context.mergeJson['package.json'].dependencies['react-router'], '3.0.3');
});

test(`Add 'bootstrap' to bower.json dependencies`, t => {
  context.props = {styling: 'bootstrap', modules: 'bower'};
  TestUtils.call(context, 'configuring.pkg');
  t.is(context.mergeJson['bower.json'].dependencies.bootstrap, '3.3.7');
  t.is(context.mergeJson['bower.json'].dependencies['react-bootstrap'], '0.30.8');
});

test(`Add 'bootstrap-sass' to bower.json dependencies`, t => {
  context.props = {styling: 'bootstrap', modules: 'bower', css: 'scss'};
  TestUtils.call(context, 'configuring.pkg');
  t.is(context.mergeJson['bower.json'].dependencies.bootstrap, '3.3.7');
  t.is(context.mergeJson['bower.json'].dependencies['react-bootstrap'], '0.30.8');
  t.is(context.mergeJson['bower.json'].dependencies['bootstrap-sass'], '3.3.7');
});

test(`Add 'jQuery' to package.json dependencies`, t => {
  context.props = {styling: 'bootstrap', modules: 'webpack'};
  TestUtils.call(context, 'configuring.pkg');
  t.is(context.mergeJson['package.json'].dependencies.jquery, '3.2.1');
});

test(`Add 'react' to '.babelrc' when modules is 'systemjs'`, t => {
  context.props = {js: 'babel', modules: 'systemjs'};
  TestUtils.call(context, 'configuring.babel');
  t.deepEqual(context.mergeJson['.babelrc'].presets, ['react']);
});

test(`Not add 'react' to '.babelrc'`, t => {
  context.props = {js: 'typescript'};
  TestUtils.call(context, 'configuring.babel');
  t.deepEqual(context.mergeJson['.babelrc'], {});
});
