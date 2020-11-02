import './App.css';
import React, { Component } from 'react';
import Header from './components/Header/Header';
import axios from 'axios';
import Swal from 'sweetalert2';

class App extends Component {
  state = {
    newCount: {
      type: '',
      startcount: '',
    },
    countList: [],
  };

  componentDidMount() {
    console.log('component has mounted');
    this.getCount();
  }

  getCount() {
    axios.get('/count')
      .then( (response) => {
        this.setState({ countList: response.data })
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addCount() {
    axios.post(`/count`, this.state.newCount)
    .then( (response) => {
      console.log(response);
      this.getCount();
    })
    .catch(function (error) {
      console.log(error);
    });
   }

  handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteCount(id);
        Swal.fire(
          'Deleted!',
          'Your count has been deleted.',
          'success'
        )
      }
    })
  }

  deleteCount(id) {
   axios.delete(`/count/${id}`)
   .then( (response) => {
     console.log(response);
     this.getCount();
   })
   .catch(function (error) {
     console.log(error);
  });
}  

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
    this.addCount();
  }

  render() { 
    return (
      <div className="App">
        <Header />
        <p>The new start count is {this.state.newCount.startcount} and the rows will be of type: {this.state.newCount.type}</p>

        <form onSubmit={this.handleSubmit}>
          <input value={this.state.newCount.type} onChange={(event) => this.handleChangeFor(event, 'type')} placeholder="Type of stitch to track" />
          <input value={this.state.newCount.startcount} onChange={(event) => this.handleChangeFor(event, 'startcount')} placeholder="Rows or stitches to track" />
          <input type="submit" value="Add New Count" />
        </form>
        <ul>
          { this.state.countList.map( count => 
            <li key={count.id}>
              I need to stitch {count.startcount} rows of {count.type}. <button onClick={() => {this.handleDeleteClick(count.id)}}>DELETE COUNT</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
