import React                  from 'react';
import { connect }            from 'react-redux';
import { validateForm }       from '../assets/validateForm';

import { storeFieldData }     from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';

import * as methods           from '../constants/fetch';
import * as constants         from '../constants/global';

import Input from '../views/Input';


class Login extends React.Component {

    constructor(props) {
        super(props);
    
        this.onUpdate = this.onUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onUpdate(event) {
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
            this.props.fetchUser(methods.AUTH_USER, form);
        } else {
            console.log('form invalid')
        }
    }

    render() {
        const {
            form,
            fetching
        } = this.props
        const inputOptions = {
            autofocus: false,
            button: false,
            required: false,
            helpText: constants.INPUT_ALERT_INVALID,
            form: form,
            onUpdate: this.onUpdate
        }
        return (
            <div className="col-11">
                <div className="row login">
                    <div className="col-5">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <Input 
                                    inputOptions={{...inputOptions,
                                        fieldName: 'email',
                                        fieldType: 'email',
                                        fieldValue: 'Enter your email',
                                        fieldHelp: 'emailHelp',
                                        required: true
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input 
                                    inputOptions={{...inputOptions,
                                        fieldName: 'password',
                                        fieldType: 'password',
                                        fieldValue: 'Enter your password',
                                        fieldHelp: 'passwordHelp',
                                        required: true
                                    }}
                                />
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
        storeFieldData: (name, type, value) => {
            dispatch(storeFieldData(name, type, value));
        },
        fetchUser: (method, data) => {
            dispatch(fetchUser(method, data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);