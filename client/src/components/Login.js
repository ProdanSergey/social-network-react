import React from 'react';

// Connect to Redux Store
import { connect } from 'react-redux';

//jQuery
import $ from 'jquery';

// import validator
import { Validation } from '../assets/validation';

// Save state function
import { saveState } from '../assets/LocalStorage';

// Input classNames
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
        this.props.userIsAuthorized ? 
          this.props.history.push('/') : false
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
        // const inputs = this.state.inputs || false;
        // const valid = this.props.formValid
        // const invalid = this.props.formInvalid
        // // const firstFalse = obj => {
        // //   for (let field in obj) {
        // //     if (!obj[field].isValid) return true;
        // //   }
        // //   return false;
        // // }
        // // firstFalse(inputs) ? invalid() : valid();
    }

    handleSubmit(event) {
        // Prevent default action
        event.preventDefault();
        let data = {};
        let dataToSerialize = this.state.inputs;
        for (let prop in dataToSerialize) {
            data = {...data,  [prop]: dataToSerialize[prop].value}
        }
        console.log(data)
        this.loadUser(data)
    }

    loadUser(request) { 
        $.ajax({
            url: '/api/login',
            method: 'post',
            accept: 'application/json',
            contentType: 'application/json',
            data: JSON.stringify(request),
            success: (data, textStatus, jqXHR) => {
                const body = jqXHR.responseJSON;
                const date = new Date();
                const login = body.email;
                saveState({
                    authorized: date.toString(),
                    login
                });
            },
            error: error => {
                console.log(error);
            }
        });
    }

    render() {
        console.log(this.state)
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
                <div className="form-group form-check">
                    <input 
                        type="checkbox" 
                        name="checkbox"
                        className="form-check-input"/>
                    <label className="form-check-label" htmlFor="checkbox">Check me out</label>
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
        userIsAuthorized: store.loginState.userIsAuthorized
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);