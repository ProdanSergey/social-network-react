import React          from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router';
import Navigation     from './Navigation';
import Main           from './Main';
import Sidebar        from './Sidebar';
import MessageBox     from './MessageBox';

import { loadTokenToStore } from '../actions/token-actions';
import { fetchUser }        from '../actions/user-actions';
import { clearFormData }    from '../actions/form-actions';

import { loadState }        from '../assets/LocalStorage';
import * as methods         from '../constants/fetch';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css';

class App extends React.Component {

  componentDidMount() {
    const { isLogin, fetchUser, loadTokenToStore } = this.props
    const userToken = loadState();
    if (userToken) {
      loadTokenToStore(userToken)
      if(!isLogin) {
        fetchUser(methods.GET_USER)
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {location: {pathname}, clearFormData } = this.props
    if (prevProps.location.pathname !== pathname) clearFormData(); 
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
    token:    store.tokenState.token,
    isLogin:  store.userData.isLogin,
    location: store.router.location
  }
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    loadTokenToStore: token => {
      dispatch(loadTokenToStore(token));
    },
    fetchUser: (method, data) => {
      dispatch(fetchUser(method, data));
    },
    clearFormData: () => {
      dispatch(clearFormData());
    }
  }
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(App));