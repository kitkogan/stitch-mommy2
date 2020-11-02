import './App.css';
import React, { Component } from 'react';
import Header from './components/Header/Header';

class App extends Component {
  state = {
    user: ''
  }

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({user: event.target.value});
  }
  render() { 
    return (
      <div className="App">
      <Header />
        <br/>
        <h2>React Local State</h2>
        <br/>
        <input onChange={this.handleChange} />
        You typed: {this.state.user}
        
      </div>
    );
  }
}

export default App;
