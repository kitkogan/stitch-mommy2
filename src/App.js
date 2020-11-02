import './App.css';
import React, { Component } from 'react';
import Header from './components/Header/Header';

class App extends Component {
  state = {
    newCount: {
      type: '',
      startcount: '',
    },
    countList: [
      {type: 'blue', startcount: 20},
      {type: 'double', startcount: 50},
      {type: 'white', startcount: 12},
    ],
  };

  handleChangeFor = (event, propertyName) => {
    console.log(event.target.value);
    this.setState({
      newCount: {
        ...this.state.newCount,
        [propertyName]: event.target.value,
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted!!');
    this.setState({
      newCount: {
        type: '',
        startcount: '',
      },
      countList: [...this.state.countList, this.state.newCount],
    });
  }

  render() { 
    return (
      <div className="App">
        <Header />
        <p>The new start count is {this.state.newCount.startcount} and the rows will be of type: {this.state.newCount.type}</p>

        <form onSubmit={this.handleSubmit}>
          <input value={this.state.newCount.type} onChange={(event) => this.handleChangeFor(event, 'type')} />
          <input value={this.state.newCount.startcount} onChange={(event) => this.handleChangeFor(event, 'startcount')} />
          <input type="submit" value="Add New Count" />
        </form>
        <ul>
          { this.state.countList.map( count => 
            <li ley={count.type}>
              I need to stitch {count.startcount} rows of {count.type}.
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
