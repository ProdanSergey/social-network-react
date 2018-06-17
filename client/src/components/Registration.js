import React from 'react';

// Connect to Redux Store
import { connect } from 'react-redux';

// Load action
import { addUser } from '../actions/user-actions';

// Generate header
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

// Input classNames
const initialInput = "form-control";
const validInput = "form-control is-valid";
const invalidInput = "form-control is-invalid";

// Component constructor

class RegForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      isTouched: {},
      isFilled: {},
      isValid: {},
      isFormValid: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const regex = /^[^а-яА-Я\s\W]+$/;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({values: {...this.state.values, [name]: value}});
    if (value.length) {
      this.setState({isFilled: {...this.state.isFilled, [name]: true}})
    } else {
      this.setState({isFilled: {...this.state.isFilled, [name]: false}})
    }
    this.setState({isValid: {...this.state.isValid, [name]: regex.test(value)}});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.isValid) {
      // Dispatch user data object to Redux Store
      this.props.dispatch(addUser(this.state.values))
    }
    else {
      alert('Form invalid!') // for test purposes
    }
    // this.createUser(this.state.user, this);
  }

  createUser(dataObject, target) {
    fetch('/api', {
      method: 'post',
      body: JSON.stringify(dataObject),
      headers: myHeaders
    })
    .then(function (response) {
      return response;
    })
    .then(function (data) {  
      console.log('Request succeeded with JSON response', data);
      target.setState({isRegSuccess: true});
    })  
    .catch(function (error) {  
      console.log('Request failed', error);  
    });
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)
    return(
      <main className="row main">
        <div className="col-6">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text"
                name="firstName" 
                className={this.state.isFilled.firstName ?
                            this.state.isValid.firstName ?
                              validInput : 
                                invalidInput : 
                                  initialInput}
                value={this.state.value} 
                onChange={this.handleChange}
                placeholder="Enter your first name" required="required"/>
                <small id="firstNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
            </div>
            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input 
                type="text"
                name="middleName"
                className={this.state.isFilled.middleName ?
                  this.state.isValid.middleName ?
                    validInput : 
                      invalidInput : 
                        initialInput}
                value={this.state.value} 
                onChange={this.handleChange}
                placeholder="Enter your middle name"/>
                <small id="middleNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text"
                name="lastName"
                className={this.state.isFilled.lastName ?
                  this.state.isValid.lastName ?
                    validInput : 
                      invalidInput : 
                        initialInput}
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Enter your last name" required="required"/>
                <small id="lastNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input 
                type="email"
                className="form-control"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email" required="required"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="image">Choose photo...</label>
              <input
                type="file"
                className="form-control"
                name="image"/>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={!this.state.isFormValid}>
              Submit
            </button>
          </form>
        </div>
        <div className="col-6">
          <h1>Welcome to, Social Network React!</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellat facilis sed libero eveniet porro aperiam error reprehenderit, fugit magni! Ab officiis magnam vitae voluptate vel laboriosam eos, explicabo accusamus.</p>
        </div>
      </main>
    );
  }
};

// Map props from Redux Store
const mapStateToProps = function(store) {
  return {
    user: store.userData.user,
    userIsRegistered: store.userRegStatus.userIsRegistered,
    language: store.langState.language
  };
};

export default connect(mapStateToProps)(RegForm);
