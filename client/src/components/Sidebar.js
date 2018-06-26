import React          from 'react';
import { Link }       from 'react-router-dom';
import { connect }    from 'react-redux';

class Sidebar extends React.Component {
  render() {
    return ( 
      <aside className="col sidebar">
        <div className="sidebar__menu" hidden={this.props.token && this.props.token.authorized ? false : true}>
          <ul>
            <li><Link to='/account'><i className="icon account"></i></Link></li>
            <li><Link to='/friends'><i className="icon friends"></i></Link></li>
            <li><Link to='/feed'><i className="icon news"></i></Link></li>
            <li><Link to='/search'><i className="icon search"></i></Link></li>
            <li><Link to='/settings'><i className="icon settings"></i></Link></li>
          </ul>
        </div>
      </aside>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);