import React          from 'react';
import { connect }    from 'react-redux';
import { WallHeader } from '../views/wall/header'

class Home extends React.Component {
  
  render() {
    return (
      <article className="col-11 wall">
        {this.props.token !== undefined ? 
        this.props.token.authorized ? <WallHeader/> :
        <h1>Hello dear user! Pls register, or login!</h1> : <h1>Hello dear user! Pls register, or login!</h1>}
      </article>
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
