import React, { Component } from 'react';

const ErrorComponent = () => <div>{props.ignore}</div>;

export default class Counter extends Component {
  constructor(props) {
    console.log('Constructor');
    super(props);

    this.state = {
      counter: 0,
      seed: 0,
      initializing: true,
    };

    this.increment = () => this.setState({ counter: this.state.counter + 1 });
    this.decrement = () => this.setState({ counter: this.state.counter - 1 });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.seed && state.seed !== props.seed) {
      return {
        seed: props.seed,
        counter: props.seed,
      };
    }
    return null;
  }

  componentDidMount() {
    console.log('Component Did Mount');
    setTimeout(() => {
      this.setState({ initializing: false });
    }, 1000);
    console.log('-------------------');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('-------------------');

    if (nextProps.ignoreProp
        && this.props.ignoreProp !== nextProps.ignoreProp) {
      console.log('Should Component Update - DO NOT RENDER');
      console.log('-------------------');
      return false;
    }
    console.log('Should Component Update - RENDER');
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Component Did Update');
    console.log('-------------------');
  }

  componentDidCatch(error, info) {
    console.log('Component Did Catch');
    this.setState({ error, info });
  }

  componentWillUnmount() {
    console.log('Component will Unmount');
    console.log('-------------------');
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Get Snapshot Before Update');
    return null;
  }

  render() {
    const { counter } = this.state;
    console.log('Render');

    if (this.state.initializing) {
      return (
        <div>Initializing...</div>
      );
    }

    if (this.props.showErrorComponent && this.state.error) {
      return (
        <div>
          We have encountered an error!
          {' '}
          {this.state.error.message}
        </div>
      );
    }

    return (
      <div>
        <button onClick={this.increment} type="button">Increment</button>
        <button onClick={this.decrement} type="button">Decrement</button>
        <div className="counter">
          Counter:
          {' '}
          {counter}
        </div>
        {this.props.showErrorComponent ? <ErrorComponent /> : null}
      </div>
    );
  }
}
