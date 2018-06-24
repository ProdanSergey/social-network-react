import React                from 'react';
import { connect }          from 'react-redux';
import $                    from 'jquery';
import { Validation }       from '../assets/validation';
import { saveState }        from '../assets/LocalStorage';
import { loadTokenToStore } from '../actions/token-actions';
import { addUser, formValid, formInvalid } from '../actions/log-actions';

const initialInput = "form-control";
const validInput = "form-control is-valid";
const invalidInput = "form-control is-invalid";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          inputs: {
    
          }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.token !== undefined) {
            if(this.props.token.authorized) this.props.history.push('/');
        } 
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userDataIsReady !== nextProps.userDataIsReady) {
            this.loadUser(nextProps.user);
        }
        // if (this.props.response !== nextProps.response) {
        //     if(nextProps.response.registered) {
        //         this.props.history.push('/registration:success')
        //     }
        // }
    } 

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const type = target.type;
          this.setState({inputs: {...this.state.inputs, 
            [name]: {
              value,
              isFilled: !!value.length,
              isValid: Validation(type, value)
            }
          }
        });
    }
    
    handleBlur(event) {
        const inputs = this.state.inputs || false;
        const valid = this.props.formValid
        const invalid = this.props.formInvalid
        const firstFalse = obj => {
          for (let field in obj) {
            if (!obj[field].isValid) return true;
          }
          return false;
        }
        firstFalse(inputs) ? invalid() : valid();
    }

    handleSubmit(event) {
        event.preventDefault();
        const valid = this.props.formIsValid;
        if (valid) {
            let data = {};
            let dataToSerialize = this.state.inputs;
            for (let prop in dataToSerialize) {
                data = {...data,  [prop]: dataToSerialize[prop].value}
            }
            this.props.addUser(data)
        } else {
            console.log('form invalid')
        }
        // this.loadUser(data)
    }

    loadUser(request) { 
        $.ajax({
            url: '/api/auth',
            method: 'post',
            accept: 'application/json',
            contentType: 'application/json',
            data: JSON.stringify(request),
            success: (data, textStatus, jqXHR) => {
                const body = jqXHR.responseJSON;
                if (body.authorized) {
                    const token = {
                        authorized: body.authorized,
                        date: body.date,
                        token: body.token
                    };
                    let promise = new Promise((resolve, reject) => { resolve(saveState(token))});
                    promise.then( result => this.props.loadTokenToStore(token)).then( result => this.props.history.push('/'))
                } else {
                    console.log(body.message)
                }
            },
            error: error => {
                console.log(error);
            }
        });
    }

    render() {
        console.log(this.props)
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email"
                        name="email"
                        className={
                            typeof this.state.inputs.email === "undefined" ? 
                            initialInput :
                            (this.state.inputs.email.isFilled ?
                             this.state.inputs.email.isValid ?
                              validInput : 
                                invalidInput : 
                                  initialInput)}
                          value={this.state.value} 
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
                        className={
                            typeof this.state.inputs.password === "undefined" ? 
                            initialInput :
                            (this.state.inputs.password.isFilled ?
                             this.state.inputs.password.isValid ?
                              validInput : 
                                invalidInput : 
                                  initialInput)}
                          value={this.state.value} 
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                        placeholder="Password"/>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary">
                    Submit
                </button>
            </form>
        )
    }

}

const mapStateToProps = function(store) {
    return {
        user:             store.loginData.user,
        formIsValid:      store.loginData.formIsValid,
        userDataIsReady:  store.userData.userDataIsReady,
        token:            store.tokenState.token
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        loadTokenToStore: (token) => {
            dispatch(loadTokenToStore(token));
        },
        addUser: (user) => {
            dispatch(addUser(user));
        },
        formValid: () => {
            dispatch(formValid());
        },
        formInvalid: () => {
            dispatch(formInvalid());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);