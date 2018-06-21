import React from 'react';

// Connect to Redux Store
import { connect } from 'react-redux';

class Home extends React.Component {
  
  render() {
    return (
      <div className="col-12">
        <h1>Hello dear user! {this.props.userIsAuthorized ? 'You are login now!' : 'You need to register first'}</h1>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    userIsAuthorized: store.loginState.userIsAuthorized,
  }
};

const mapDispatchToProps = (dispatch, state) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
