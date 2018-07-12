import React        from 'react';
import { Link }     from 'react-router-dom';
import { connect }  from 'react-redux';
import { logout }   from '../actions/user-actions';

class Navigation extends React.Component {

    render() {
    const { isLogin } = this.props    
    return (
            <header className="row header no-gutters">
                <div className="col logo"><i className="icon logo-badge"></i></div>
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
                                        hidden={isLogin}>Registration</Link>
                                </li>
                                <li className="nav-item">
                                    <Link 
                                        to='/login' 
                                        className="nav-link"
                                        hidden={isLogin}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <a 
                                        className="nav-link"
                                        hidden={!isLogin}
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
        isLogin: store.userData.isLogin,
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