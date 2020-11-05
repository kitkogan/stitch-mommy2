import './App.css';
import React, { Component } from 'react';
import Header from '../Header/Header';
import Form from '../Form/Form'
import axios from 'axios';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

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
   axios.delete(`count/${id}`)
   .then( (response) => {
     console.log(response);
     this.getCount();
   })
   .catch(function (error) {
     console.log(error);
  });
}  

  decrementCount(id) {
    axios.put(`count/${id}`)
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
        <Form newCount={this.state.newCount}
          handleChangeFor={this.handleChangeFor}
          handleSubmit={this.handleSubmit} />
        { this.state.countList.map( count => 
          <div className="stitchContainer" key={count.id}>
            Stitch Type: {count.type} 
            Number remaining: {count.startcount} 
            <button onClick={() => {this.decrementCount(count.id)}}>CLICK TO TRACK COUNT</button>
            <button onClick={() => {this.handleDeleteClick(count.id)}}>DELETE COUNT</button>
          </div>
        )}
          <div>
          <button onClick={() => this.props.dispatch({ type: 'BUTTON_1' })}>Button One</button>
          <button onClick={() => this.props.dispatch({ type: 'BUTTON_2' })}>Button Two</button>          </div>
      </div>
    );
  }
}

export default connect()(App);
