import './App.css';
import React from 'react';
import Header from './components/Header/Header';

class App extends React.Component {
  render() { 
    return (
      <div className="App">
       <Header/>
        <input onChange={this.onInputChange} />
      </div>
    );
  }
}

export default App;
