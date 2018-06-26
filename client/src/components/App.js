import React from 'react';
import Navigation from '../views/Navigation';
import Main from '../views/Main';
import { Sidebar } from '../views/wall/sidebar'

class App extends React.Component {
  render(){
    return (
    <div className="container">
      <Navigation />
      <main className="row main no-gutters">
        <Sidebar />
        <Main />
      </main>
    </div>
    )
  }
}

export default App;