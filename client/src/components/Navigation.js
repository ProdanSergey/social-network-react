import React        from 'react';
import { Link }     from 'react-router-dom';
import { connect }  from 'react-redux';
import { logout }   from '../actions/token-actions';

class Navigation extends React.Component {

    render() {
      return (
            <header className="row header no-gutters">
                <div className="col logo"><img src="/icons/react.svg" width="50" height="50" className="d-inline-block align-top" alt=""/></div>
                <div className="col-11">
                    <nav className="navbar navbar-expand-lg">
                        <Link to='/' className="navbar-brand">Social Network</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link 
                                        to='/registration' 
                                        className="nav-link" 
                                        hidden={this.props.token}>Registration</Link>
                                </li>
                                <li className="nav-item">
                                    <Link 
                                        to='/login' 
                                        className="nav-link"
                                        hidden={this.props.token}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <a 
                                        className="nav-link"
                                        hidden={!this.props.token}
                                        href="/" 
                                        onClick={(e) => {e.preventDefault(); this.props.logout()}}>
                                        Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>  
            </header>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        token: store.tokenState.token,
        response: store.userData.response
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);