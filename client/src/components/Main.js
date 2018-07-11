import React                        from 'react';
import { Switch, Route, Redirect }  from 'react-router-dom';
import { loadState }                from '../assets/LocalStorage';

import Wall               from './Wall';
import Login              from './Login';
import Registration       from './Registration';

import Account            from './Account';
import Friends            from './Friends';
import Feed               from './Feed';
import Search             from './Search';
import Settings           from './Settings';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (  
  <Route {...rest} render={props => (
    loadState() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class Main extends React.Component {
  render(){
    return(
    <Switch>
      <AuthenticatedRoute exact path='/' component={Wall}/>;
      <Route path='/login' component={Login}/>;
      <Route path='/registration' component={Registration}/>;
      <AuthenticatedRoute path='/account' component={Account}/>;
      <AuthenticatedRoute path='/friends' component={Friends}/>;
      <AuthenticatedRoute path='/feed' component={Feed}/>;
      <AuthenticatedRoute path='/search' component={Search}/>;
      <AuthenticatedRoute path='/settings' component={Settings}/>;
    </Switch>
    )
  }
}

export default Main