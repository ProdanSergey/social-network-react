import React                from 'react';
import { connect }          from 'react-redux';
import $                    from 'jquery';
import { saveState }        from '../assets/LocalStorage';
import { loadTokenToStore } from '../actions/token-actions';
import { 
    logData, 
    logFormValid, 
    logFormInvalid, 
    logResponse 
  }                         from '../actions/log-actions';
import { Validation }       from '../assets/validation';

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
        if(this.props.token && this.props.token.authorized) this.props.history.push('/');  
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user !== nextProps.user) {
            this.loadUser(nextProps.user);
        }
        if (this.props.response !== nextProps.response) {
            if(nextProps.response.authorized) {
              this.props.history.push('/')
            }
        }
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
        const valid = this.props.logFormValid
        const invalid = this.props.logFormInvalid
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
            this.props.logData(data)
        } else {
            console.log('form invalid')
        }
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
                    this.props.logResponse({
                        message: body.message,
                        authorized: body.authorized,
                    });
                    const token = {
                        authorized: body.authorized,
                        date: body.date,
                        token: body.token
                    };
                    console.log(token)
                    let promise = new Promise((resolve, reject) => { resolve(saveState(token))});
                    promise.then( result => this.props.loadTokenToStore(token))
                } else {
                    this.props.logResponse({
                        message: body.message,
                        authorized: body.authorized,
                    });
                }
            },
            error: error => {
                this.props.logResponse({
                    message: error.message,
                    authorized: error.authorized,
                });
            }
        });
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
                            <div className="form-group d-flex">
                            <div className="col-3">
                                <button 
                                type="submit" 
                                className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                            <div className="col-9">
                                <p 
                                className="alert alert-warning mb-0" 
                                role="alert" 
                                hidden={!(!!this.props.response.message) && !this.props.response.authorized}>
                                {this.props.response.message}</p>
                            </div>
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
        user:             store.loginData.user,
        formIsValid:      store.loginData.formIsValid,
        response:         store.loginData.response,
        token:            store.tokenState.token
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        loadTokenToStore: (token) => {
            dispatch(loadTokenToStore(token));
        },
        logData: (user) => {
            dispatch(logData(user));
        },
        logFormValid: () => {
            dispatch(logFormValid());
        },
        logFormInvalid: () => {
            dispatch(logFormInvalid());
        },
        logResponse: (response) => {
            dispatch(logResponse(response));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);