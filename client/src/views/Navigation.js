import React from 'react';
import { Link } from 'react-router-dom';

// Remove state function
import { removeState } from '../assets/LocalStorage';

class Navigation extends React.Component {
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
                                    <Link to='/registration' className="nav-link">Registration</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/" onClick={removeState()}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>  
            </header>
        );
    }
}

export default Navigation;