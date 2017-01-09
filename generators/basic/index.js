'use strict';

const bitmate = require('bitmate-generator');

module.exports = bitmate.Base.extend({
  writing() {
    const files = [
      'client/app/app.js',
      'client/app/app.css',
      'client/app/main/main.js',
      'client/app/main/main.css',
      'client/app/main/main.spec.js'
    ];

    files.map(file => {
      return this.copyTemplate(file, file);
    });
  }
});
