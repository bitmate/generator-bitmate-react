import * as React from 'react';

interface MainProps {};

interface MainState {};

export class Main extends React.Component<MainProps, MainState> {
  render() {
    return (
      <h1>{'Hello world!'}</h1>
    );
  }
}
