import React, { Component } from 'react';

class Form extends Component {
    render() {
      return (
        <div>
            <h2>Enter the stitch type and number of repetitions you would like StitchMommy to mind for you</h2>

            <form onSubmit={this.props.handleSubmit}>
            <input value={this.props.newCount.type} onChange={(event) => this.props.handleChangeFor(event, 'type')} placeholder="Type of stitch to track" />
            <input value={this.props.newCount.startcount} onChange={(event) => this.props.handleChangeFor(event, 'startcount')} placeholder="Rows or stitches to track" />
            <input type="submit" value="Add New Count" />
            </form>
        </div>
      );
    }
  }

  export default Form;