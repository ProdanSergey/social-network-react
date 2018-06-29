import React                  from 'react';
import { connect }            from 'react-redux';
import { validateInput }      from '../assets/validateInput';
import { validateForm }       from '../assets/validateForm';
import { inputClass }         from '../assets/inputsClassHendler';
import { saveState }          from '../assets/LocalStorage';

import { loadTokenToStore }   from '../actions/token-actions';
import { 
    storeFieldData, 
    clearFormData }           from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';
import { push }               from 'connected-react-router';

import * as methods           from '../constants/fetch';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          inputs: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.response !== nextProps.response) {
            if(nextProps.response.authorized) {
                const token = nextProps.response.token;
                saveState(token);
                this.props.loadTokenToStore(token);
                this.props.clearFormData();
            }
        }
        if (this.props.token !== nextProps.token) {
            this.props.push('/');
        }
    } 

    handleChange(event) {
        const { value, name, type } = event.target;
            this.setState({inputs: {...this.state.inputs, 
                [name]: {
                isFilled: !!value.length,
                isValid: validateInput(type, value)
                }
            }
        });
    }
    
    handleBlur(event) {
        let { value, name } = event.target;
            if(!!value.length) {
            const { isValid } = this.state.inputs[name]
            if(isValid) {
                this.props.storeFieldData(name, value, true);
            } else {
                this.props.storeFieldData(name, value, false);
            }
        }
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
                                    className={inputClass(this.state.inputs.email)}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    aria-describedby="emailHelp" placeholder="Enter email"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password"
                                    name="password"
                                    className={inputClass(this.state.inputs.password)}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <button 
                                type="submit"
                                disabled={this.props.fetching}
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
        response:         store.userData.response,
        token:            store.tokenState.token
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        loadTokenToStore: (token) => {
            dispatch(loadTokenToStore(token));
        },
        storeFieldData: (name, value, flag) => {
            dispatch(storeFieldData(name, value, flag));
        },
        clearFormData: () => {
            dispatch(clearFormData());
        },
        fetchUser: (userForm, method) => {
            dispatch(fetchUser(userForm, method));
        },
        push: (path) => {
            dispatch(push(path));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);