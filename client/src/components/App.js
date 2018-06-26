import React        from 'react';
import Navigation   from './Navigation';
import Main         from './Main';
import Sidebar      from './Sidebar';

class App extends React.Component {
  render(){
    return (
    <div className="container">
      <Navigation />
      <main className="row main no-gutters">
        <Sidebar /><Main />
      </main>
    </div>
    )
  }
}

export default App;