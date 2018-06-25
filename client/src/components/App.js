import React from 'react';
import Navigation from '../views/Navigation';
import Main from '../views/Main';
import Footer from '../views/Footer';

class App extends React.Component {
  render(){
    return (
    <div className="container">
      <Navigation />
      <main className="row main">
        <Main />
      </main>
      <Footer />
    </div>
    )
  }
}

export default App;