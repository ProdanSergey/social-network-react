import React from 'react';

// Connect to Redux Store
import { connect } from 'react-redux';

class Home extends React.Component {
  
  render() {
    return (
      <div className="col-12">
        <h1>Hello dear user! {this.props.token !== undefined ? 
        this.props.token.authorized ? 'You are login now!' :
        'You need to register first' : 'You need to register first'}
        </h1>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    token: store.tokenState.token,
  }
};

const mapDispatchToProps = (dispatch, state) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
