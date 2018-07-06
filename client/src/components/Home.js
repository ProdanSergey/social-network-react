import React          from 'react';
import Wall           from './Wall';
import Welcome        from './Welcome';

import { connect }    from 'react-redux';

class Home extends React.Component {
  
  render() {
    return (
      <div className="col-11">
        {this.props.token ? 
              <Wall/> :
                <Welcome/>}
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
