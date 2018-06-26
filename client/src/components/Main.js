import React              from 'react';
import { Switch, Route }  from 'react-router-dom';
import { withRouter }     from 'react-router-dom';

import Home               from './Home';
import Login              from './Login';
import Registration       from './Registration';
import RegSuccess         from './RegistationSuccess';

import Account            from './Account';
import Friends            from './Friends';
import Feed               from './Feed';
import Search             from './Search';
import Settings           from './Settings';

class Main extends React.Component {
  render(){
    return(
    <Switch>
      <Route exact path='/' component={Home}/>;
      <Route path='/login' component={Login}/>;
      <Route path='/registration' component={Registration}/>;
      <Route path='/registration:success' component={RegSuccess}/>;
      <Route path='/account' component={Account}/>;
      <Route path='/friends' component={Friends}/>;
      <Route path='/feed' component={Feed}/>;
      <Route path='/search' component={Search}/>;
      <Route path='/settings' component={Settings}/>;
    </Switch>
    )
  }
}

export default withRouter(Main)