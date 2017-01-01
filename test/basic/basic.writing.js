const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const Utils = require('bitmate-generator').TestUtils;

let context;

const files = [
  'app/app.js',
  'app/app.css',
  'app/main/main.js',
  'app/main/main.css',
  'app/main/main.spec.js'
];

test.before(() => {
  context = Utils.mock('basic');
  require('../../generators/basic/index');
  process.chdir('../../');
});

test(`Call this.copyTemplate 5 times`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  Utils.call(context, 'writing', {
    router: 'router',
    css: 'less',
    js: 'babel',
    styling: 'bootstrap',
    modules: 'bower'
  });
  expect(spy).to.have.been.called.exactly(files.length);
  files.forEach(file => t.true(context.copyTemplate[`client/${file}`].length > 0));
});
