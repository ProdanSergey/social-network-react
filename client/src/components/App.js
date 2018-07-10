import React        from 'react';
import { connect }  from 'react-redux';
import { withRouter } from 'react-router';
import Navigation   from './Navigation';
import Main         from './Main';
import Sidebar      from './Sidebar';
import MessageBox   from './MessageBox';

import { loadState }          from '../assets/LocalStorage';
import { relogin }            from '../actions/token-actions';

import * as methods           from '../constants/fetch';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css';

class App extends React.Component {

  componentDidMount() {
    const userState = loadState();
    if (userState) this.props.relogin(methods.GET_USER, userState);
  }

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

const mapStateToProps = function(store) {
  return {
  }
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    relogin: (method, data) => {
      dispatch(relogin(method, data));
    }
  }
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(App));