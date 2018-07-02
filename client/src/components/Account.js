import React                  from 'react';
import { connect }            from 'react-redux';
import { validateForm }       from '../assets/validateForm';

import { 
    storeFieldData, 
    clearFormData }           from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';

import * as methods           from '../constants/fetch';
import Spinner from '../views/Spinner'

import AccountInput from '../views/Account_input';

class Account extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isEditMode: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        if (!this.props.response.authenticated)
            this.props.fetchUser(this.props.token, methods.GET_USER);
    }

    componentWillUnmount() {
        this.props.clearFormData();
    }

    handleChange(event) {
        const { id } = event.target;
        if(id === 'edit') {
            this.setState({isEditMode: !this.state.isEditMode})
        }
    }

    onUpdate(payload) {
        const { event, value, name, type } = payload;
        if (event === 'change') {
            this.props.storeFieldData(name, type, value);
        } 
        if (event === 'submit') {
            const form = validateForm({
                data: {
                    [name]: {
                        value,
                        valid: this.props.form[name].valid
                    }
                },
                asFormData: true
            });
            if (form) {
                this.props.fetchUser(form, methods.PUT_USER);
            } else {
                console.log('form invalid')
            }
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
                                { 
                                    this.state.isEditMode ?
                                    <AccountInput 
                                    passValue={{
                                            fieldName: 'firstName',
                                            placeholder: this.props.response.firstName,
                                            form: this.props.form
                                    }}
                                    onUpdate={this.onUpdate}
                                    /> :
                                    <div className="data-field">{this.props.response.firstName}</div>
                                }
                                <label htmlFor="middleName">Middle Name</label>
                                { 
                                    this.state.isEditMode ?
                                    <AccountInput
                                    passValue={{
                                        fieldName: 'middleName',
                                        placeholder: this.props.response.middleName,
                                        form: this.props.form
                                    }}
                                    onUpdate={this.onUpdate}
                                    /> :
                                    <div className="data-field">{this.props.response.middleName}</div>
                                }
                                <label htmlFor="lastName">Last Name</label>
                                { 
                                    this.state.isEditMode ?
                                    <AccountInput
                                    passValue={{
                                        fieldName: 'lastName',
                                        placeholder: this.props.response.lastName,
                                        form: this.props.form
                                    }}
                                    onUpdate={this.onUpdate}
                                    /> :
                                    <div className="data-field">{this.props.response.lastName}</div>
                                }
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
        form:     store.formData.form,
        fetching: store.userData.fetching,
        response: store.userData.response,
        token:    store.tokenState.token
    }
};
  
  const mapDispatchToProps = (dispatch, state) => {
    return {
        storeFieldData: (name, value, flag) => {
            dispatch(storeFieldData(name, value, flag));
        },
        clearFormData: () => {
            dispatch(clearFormData());
        },
        fetchUser: (userForm, method) => {
            dispatch(fetchUser(userForm, method));
        }
    }
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Account);