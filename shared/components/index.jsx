import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="app-view">
        <h1>Adam D. Graham's Blog Party</h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
