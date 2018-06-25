import React                from 'react';
import { Link }             from 'react-router-dom';
import { connect }          from 'react-redux';
import $                    from 'jquery';
import { deleteTokenFromStore } from '../actions/token-actions';

import { removeState } from '../assets/LocalStorage';

class Navigation extends React.Component {

    logout(request) { 
        $.ajax({
            url: '/api/auth',
            method: 'delete',
            accept: 'application/json',
            contentType: 'application/json',
            data: JSON.stringify(request),
            success: (data, textStatus, jqXHR) => {
                // const token = {
                //     authorized: false
                // }
                // this.props.deleteTokenFromStore(token);
                // removeState();
                // console.log(this.props)
                // this.props.history.push('/');
            },
            error: error => {
                const token = {
                    authorized: false
                }
                this.props.deleteTokenFromStore(token);
                removeState();
                console.log(this.props)
            }
        });
    }

    render() {
      return (
            <header className="row mb-4 header">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                                        hidden={
                                            this.props.token !== undefined ? 
                                            this.props.token.authorized ? true : false :
                                            false}>Registration</Link>
                                </li>
                                <li className="nav-item">
                                    <Link 
                                        to='/login' 
                                        className="nav-link"
                                        hidden={
                                            this.props.token !== undefined ? 
                                            this.props.token.authorized ? true : false :
                                            false}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <a 
                                        className="nav-link"
                                        hidden={this.props.token !== undefined ?
                                                this.props.token.authorized ? false : true :
                                                true}
                                        href="/" 
                                        onClick={(e) => {e.preventDefault(); this.logout(this.props.token.token)}}>
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
        token: store.tokenState.token
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        deleteTokenFromStore: (token) => {
            dispatch(deleteTokenFromStore(token))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);