var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <header className="hero-unit" id="banner">
        <div className="container">
          <h1>{'Hello World!'}</h1>
          <p className="lead">{'Kick Start Your Project With BitMate'}</p>
        </div>
      </header>
    );
  }
});
