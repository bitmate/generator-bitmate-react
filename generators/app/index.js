'use strict';

const bitmate = require('bitmate-generator');

module.exports = bitmate.Base.extend({
  prompting: {
    bitmate() {
      this.options.server = (this.options.server) ? this.options.server : 'none';
      this.options.client = 'react';
      return this.bitmatePrompts();
    },

    reactOptions() {
      // Can add more prompts that are angular specific here...
      this.option('router', {type: String, required: true});
      this.option('styling', {type: String, required: false});

      const prompts = [{
        when: !this.options.router,
        type: 'list',
        name: 'router',
        message: 'Would you like a router?',
        choices: [
          {name: 'React Router', value: 'router'},
          {name: 'None', value: 'none'}
        ]
      }, {
        when: !this.options.styling,
        type: 'list',
        name: 'styling',
        message: 'Which CSS Styling Framework would you like?',
        choices: [
          {name: 'Bootstrap', value: 'bootstrap'},
          {name: 'None', value: 'none'}
        ]
      }];

      return this.prompt(prompts).then(props => {
        Object.assign(this.props, props);
      });
    }
  },

  configuring() {
    this.config.set('props', this.props);
    const bower = Object.assign({}, {
      name: "app",
      version: "0.0.0",
      dependencies: {
        react: '^15.0.1'
      }
    });

    if (this.props.router === 'router') {
      if (this.props.modules === 'bower') {
        bower.dependencies['react-router'] = '^3.0.0';
      }
    }

    if (this.props.styling === 'bootstrap') {
      bower.dependencies.bootstrap = '3.3.4';
      bower.dependencies['react-bootstrap'] = '^0.30.7';
    }
    this.mergeJson('bower.json', bower);
  },

  composing() {
    const options = {
      framework: this.props.client,
      html: this.props.html,
      css: this.props.css,
      js: this.props.js,
      router: this.props.router,
      styling: this.props.styling,
      skipInstall: this.props.skipInstall,
      skipCache: this.props.skipCache
    };

    this.composeWith(`bitmate-react:basic`, {options}, {
      local: require.resolve(`../basic`)
    });
  },

  writing() {
    const files = [
      'client/favicon.ico',
      'client/robots.txt',
      'client/.htaccess',
      'client/index.html'
    ];

    files.forEach(file => {
      this.copyTemplate(file, file, this.props);
    });
  }
});
