import React                  from 'react';
import { connect }            from 'react-redux';
import { validateForm }       from '../assets/validateForm';
import { inputClass }         from '../assets/inputsClassHendler';

import { 
    storeFieldData, 
    clearFormData }           from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';

import * as methods           from '../constants/fetch';


class Login extends React.Component {

    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.clearFormData();
    }

    handleChange(event) {
        let { value, name, type } = event.target;
        this.props.storeFieldData(name, type, value);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const form = validateForm({
            data: this.props.form, 
            asFormData: false
        });
        if (form) {
            this.props.fetchUser(form, methods.AUTH_USER);
        } else {
            console.log('form invalid')
        }
    }

    render() {
        const {
            form,
            fetching
        } = this.props
        return (
            <div className="col-11">
                <div className="row login">
                    <div className="col-5">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input 
                                    type="email"
                                    name="email"
                                    className={inputClass(form.email)}
                                    onChange={this.handleChange}
                                    aria-describedby="emailHelp" placeholder="Enter email"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password"
                                    name="password"
                                    className={inputClass(form.password)}
                                    onChange={this.handleChange}
                                    placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <button 
                                type="submit"
                                disabled={fetching}
                                className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-7">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae qui alias, aspernatur quidem itaque aliquam harum porro cum facilis. Veritatis quae pariatur repellendus odio ex deserunt aliquid ad facere ipsum.
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = function(store) {
    return {
        form:             store.formData.form,
        fetching:         store.userData.fetching,
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);