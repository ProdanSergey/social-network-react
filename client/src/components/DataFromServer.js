import React, { Component } from 'react';

class Data extends Component {
  state = {users: []};
  
  componentDidMount() {
    console.log(this)
    fetch('/api')
      .then(function(response){
        return response.json();
      })
      .then(users => this.setState({ users }));
  }
  
  render() {
    return (
      <div>
          {this.state.users.map(function(item){
            console.log(item)
            return <p>{item.toString()}</p>;
          })}
      </div>
    );
  }
}

export default Data;