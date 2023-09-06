import React, { Component } from 'react';
import Timer from './Timer';

class App extends Component {
  state = {
    timerIDs: [],
  };

  // Add componentDidMount method
  componentDidMount() {
    this.handleAddTimer();
  }

  // Add componentWillUnmount method (clean up intervals)
  componentWillUnmount() {
    this.state.timerIDs.forEach((id) => {
      const timerComponent = this.refs[id]; // Use refs to access Timer components
      if (timerComponent) {
        timerComponent.cleanUpInterval();
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>MultiTimer</h1>
        <button onClick={this.handleAddTimer}>Add New Timer</button>

        <div className="TimerGrid">
          {this.renderTimers()}
        </div>
      </div>
    );
  }

  renderTimers = () => this.state.timerIDs.map((id) => (
    <Timer key={id} id={id} removeTimer={this.removeTimer} ref={id => this[id] = id} />
  ));

  handleAddTimer = () => {
    this.setState((prevState) => ({
      timerIDs: [...prevState.timerIDs, Math.floor(Math.random() * 1000)],
    }));
  };

  removeTimer = (id) => {
    this.setState((prevState) => ({
      timerIDs: prevState.timerIDs.filter((timer_id) => timer_id !== id),
    }));
  };
}

export default App;


