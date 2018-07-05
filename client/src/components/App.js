import React        from 'react';
import Navigation   from './Navigation';
import Main         from './Main';
import Sidebar      from './Sidebar';
import MessageBox   from './MessageBox';

class App extends React.Component {
  render(){
    return (
    <div className="container">
      <Navigation />
      <main className="row main no-gutters">
        <Sidebar /><Main /><MessageBox />
      </main>
    </div>
    )
  }
}

export default App;