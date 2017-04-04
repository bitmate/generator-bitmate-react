'use strict';

const bitmate = require('@oligibson/bitmate-generator');

module.exports = bitmate.Base.extend({
  writing() {
    const files = [
      'client/index.js',
      'client/index.css',
      'client/app/main.js',
      'client/app/main.css',
      'client/app/main.spec.js'
    ];

    files.map(file => {
      return this.copyTemplate(file, file);
    });
  }
});
