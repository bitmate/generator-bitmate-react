'use strict';

const bitmate = require('@oligibson/bitmate-generator');

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

  configuring: {
    pkg() {
      const pkg = Object.assign({}, {
        name: 'app',
        version: '0.0.0',
        dependencies: {
          react: '15.4.2'
        },
        devDependencies: {}
      });

      if (this.props.modules !== 'bower') {
        pkg.dependencies['react-dom'] = '15.4.2';
        pkg.devDependencies['react-addons-test-utils'] = '15.4.2';
      }

      if (this.props.router === 'router') {
        const routerVersion = this.props.modules === 'bower' ?
          'https://cdnjs.cloudflare.com/ajax/libs/react-router/3.0.3/ReactRouter.min.js' :
          '3.0.3';
        pkg.dependencies['react-router'] = routerVersion;
      }

      if (this.props.styling === 'bootstrap') {
        if (this.props.modules !== 'bower') {
          pkg.dependencies.jquery = '3.2.1';
        }
        if (this.props.modules === 'bower' && this.props.css === 'scss') {
          pkg.dependencies['bootstrap-sass'] = '3.3.7';
        }
        pkg.dependencies.bootstrap = '3.3.7';
        pkg.dependencies['react-bootstrap'] = '0.30.8';
      }

      if (this.props.modules === 'bower') {
        this.mergeJson('bower.json', pkg);
      } else {
        this.mergeJson('package.json', pkg);
      }
    },

    babel() {
      if (this.props.js !== 'typescript') {
        const presets = ['react'];

        this.mergeJson('.babelrc', {presets});
      }
    }
  },

  composing() {
    const options = {
      client: this.props.client,
      modules: this.props.modules,
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
