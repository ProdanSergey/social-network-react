import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Home from './Home';
import Registration from '../components/Registration';
import RegSuccess from '../components/RegistationSuccess';

class Main extends React.Component {
  render(){
    return(
    <Switch>
      <Route exact path='/' component={Home}/>;
      <Route path='/registration' component={Registration}/>;
      <Route path='/registration:success' component={RegSuccess}/>;
    </Switch>
    )
  }
}

export default withRouter(Main)