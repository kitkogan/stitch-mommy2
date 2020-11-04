import React, { Component } from 'react';

class List extends Component {
    render() {
      return (
        <>
            { this.props.countList.map( count => 
                <div className="stitchContainer" key={count.id}>
                Stitch Type: {count.type} 
                Number remaining: {count.startcount} 
               
                <button onClick={() => {this.handleDeleteClick(count.id)}}>DELETE COUNT</button>
                </div>
            )}
        </>
      );
    }
  }

  export default List;