import React, { Component } from 'react';

class Data extends Component {
  state = {users: []};
  
  componentDidMount() {
    fetch('/api')
      .then(function(response){
        return response.json();
      })
      .then(users => this.setState({ users }));
  }
  
  render() {
    return (
      <div>
          {this.state.users.map(item => <h3 key={item.id}>Hello, dear {item.username}</h3>)}
      </div>
    );
  }
}

export default Data;