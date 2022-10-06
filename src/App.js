import React, { Component } from 'react';
import Counter from './counter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mount: true,
      ignoreProp: 0,
      seed: 40,
      showErrorComponent: false,
    };

    this.mountCounter = () => this.setState({ mount: true });
    this.unmountCounter = () => this.setState({ mount: false });

    this.ignoreProp = () => this.setState({ ignoreProp: Math.random() });
    this.seedGenerator = () => this.setState({ seed: Number.parseInt(Math.random() * 100) });
    this.toggleError = () => this.setState({ showErrorComponent: !this.state.showErrorComponent });
  }

  render() {
    return (
      <div>
        <button onClick={this.mountCounter} disabled={this.state.mount} type="button">Mount Counter</button>
        <button onClick={this.unmountCounter} disabled={!this.state.mount} type="button">Unmount Counter</button>
        <button onClick={this.ignoreProp} type="button">Ignore Prop</button>
        <button onClick={this.seedGenerator} type="button">Generate Seed</button>
        <button onClick={this.toggleError} type="button">Toggle Error</button>
        {this.state.mount
          ? (
            <Counter
              ignoreProp={this.state.ignoreProp}
              seed={this.state.seed}
              showErrorComponent={this.state.showErrorComponent}
            />
          )
          : null}
      </div>
    );
  }
}

export default App;
