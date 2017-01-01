'use strict';

const bitmate = require('bitmate-generator');

module.exports = bitmate.Base.extend({
  writing() {
    const files = [
      'app/app.js',
      'app/app.css',
      'app/main/main.js',
      'app/main/main.css',
      'app/main/main.spec.js'
    ];

    files.map(file => {
      return this.copyTemplate(file, `client/${file}`);
    });
  }
});
