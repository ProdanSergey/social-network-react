import React                 from 'react';
import { connect }           from 'react-redux';
import { fetchUser }          from '../actions/user-actions';

import * as methods           from '../constants/fetch';
import Spinner from '../views/Spinner'

class Account extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isEditMode: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.response.auth)
            this.props.fetchUser(this.props.token, methods.GET_USER);
    }

    handleChange(event) {
        const { id } = event.target;
        if(id === 'edit') {
            this.setState({isEditMode: !this.state.isEditMode})
        }
    }

    render() {

        return(
            <div className="col-11">
                <div className="row account no-gutters">
                    <div className="col">
                        <section className="account__info">
                            { this.props.fetching ?
                            <Spinner/> :
                            <form>
                                <label htmlFor="firstName">First Name</label>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={this.props.response.firstName}
                                        placeholder="First Name" 
                                        aria-label="First Name"
                                        onChange={this.handleChange}
                                        readOnly={!this.state.isEditMode}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" disabled>Button</button>
                                    </div>
                                </div>
                                <label htmlFor="middleName">Middle Name</label>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text"
                                        name="middleName"
                                        className="form-control"
                                        value={this.props.response.middleName}
                                        placeholder="Middle Name" 
                                        aria-label="Middle Name"
                                        onChange={this.handleChange}
                                        readOnly={!this.state.isEditMode}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" disabled>Button</button>
                                    </div>
                                </div>
                                <label htmlFor="lastName">Last Name</label>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={this.props.response.lastName}
                                        placeholder="Last Name" 
                                        aria-label="Last Name"
                                        onChange={this.handleChange}
                                        readOnly={!this.state.isEditMode}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" disabled>Button</button>
                                    </div>
                                </div>
                                <div className="btn-group-toggle read-only-toggler" data-toggle="buttons">
                                    <label className="btn btn-secondary active">
                                        Edit
                                        <input 
                                        id="edit" 
                                        onChange={this.handleChange}
                                        type="checkbox"/>
                                    </label>
                                </div>
                            </form>
                            }
                        </section>
                    </div>
                    <div className="col">
                        <section className="account__avatar">
                            { this.props.fetching ?
                            <Spinner/> :
                            <form>
                                <div className="image">
                                    <img src={this.props.response.avatar} alt="user avatar"/>
                                </div>
                                <label htmlFor="image">Avatar</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Upload</span>
                                    </div>
                                    <div className="custom-file">
                                        <input type="file" name="image" className="custom-file-input" disabled/>
                                        <label className="custom-file-label" htmlFor="image">Choose file</label>
                                    </div>
                                </div>
                            </form>
                            }
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        fetching: store.userData.fetching,
        response: store.userData.response,
        token: store.tokenState.token
    }
};
  
  const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchUser: (token, method) => {
            dispatch(fetchUser(token, method));
        },
    }
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Account);