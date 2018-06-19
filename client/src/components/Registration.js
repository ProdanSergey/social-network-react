import React from 'react';

// Connect to Redux Store
import { connect } from 'react-redux';

// Load action
import { addUser } from '../actions/user-actions';
import { regSuccess, regFailed } from '../actions/regStatus-actions';

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
      isFormValid: false,
      userMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const regex = name === 'email' ? /^[a-z0-9._@-]+$/i : /^[^а-яА-Я\s\W]+$/;
    this.setState({values: {...this.state.values, [name]: value}});
    this.setState({isFilled: {...this.state.isFilled, [name]: !!value.length}})
    this.setState({isValid: {...this.state.isValid, [name]: regex.test(value) && value.length < 32}}); // Note: add exclude for email field
    this.setState({isFormValid: this.isFormValid(this.state.isValid)})
  }

  handleUpload(event) {
    const target = event.target;
    const image = target.files[0];
    const name = target.name;
    if (!image) {
      this.setState({isFilled: {...this.state.isFilled, [name]: false}});
      this.setState({values: {...this.state.values, [name]: null}});
      return
    }
    this.setState({isFilled: {...this.state.isFilled, [name]: true}});
    let invalid = (image.size < 4e+4 || image.size > 5e+6 || image.type !== 'image/jpeg');
    this.setState({isValid: {...this.state.isValid, [name]: !invalid}});
    this.setState({values: {...this.state.values, [name]: image}});
  }

  handleSubmit(event) {
    // Prevent default action
    event.preventDefault();
    // Dispatch user data object to Redux Store
    this.props.dispatch(addUser(this.state.values));
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.userDataIsReady !== nextProps.userDataIsReady) {
      // Send request to server-side
      this.createUser(nextProps.user);
    }
  } 

  isFormValid(obj) {
    for (let key in obj) {
      if(obj[key]){
        continue;
      } else {
        return false;
      }
    }
    return true;
  }

  createUser(dataObject) {
    let self = this;
    fetch('/api', {
      method: 'post',
      body: JSON.stringify(dataObject),
      headers: myHeaders
    })
    .then(function (response) {
      if (response.statusText === 'It\'s ok!') {
        self.props.dispatch(regSuccess()); // Dispatch flag regIsSuccess = true
        self.setState({userMessage: response.statusText})
      } else {
        self.props.dispatch(regFailed()); // Dispatch flag regIsSuccess = false
        self.setState({userMessage: response.statusText})
      }
      return response;
    })
    .then(function (data) {
      console.log('Request succeeded with JSON response', data); 
    })  
    .catch(function (error) {  
      console.log('Request failed', error);
    });
  }

  createSelectItems(from, to) {
    let items = [];
    for(let i = from; i <= to; i++) {
      items.push(<option key={i} value={i}>{i}</option>)
    }
    return items;
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
              <div className="row">
                  <div className="col-6">
                    <label htmlFor="gender">Gender</label>
                    <select 
                      className={this.state.isFilled.gender ?
                        validInput :
                            initialInput}
                      name="gender"
                      onChange={this.handleChange}
                      defaultValue="default">
                      <option disabled value="default">Choose...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="age">Age</label>
                    <select 
                      className={this.state.isFilled.age ?
                          validInput :
                              initialInput}
                      name="age"
                      onChange={this.handleChange}
                      defaultValue="default">
                      <option disabled value="default">Choose...</option>
                      {this.createSelectItems(1,99)}
                    </select>
                  </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input 
                type="email"
                name="email"
                className={this.state.isFilled.email ?
                  this.state.isValid.email ?
                    validInput : 
                      invalidInput : 
                        initialInput}
                value={this.state.value}
                onChange={this.handleChange}
                aria-describedby="emailHelp"
                placeholder="Enter email" required="required"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="image">Choose photo...</label>
              <input
                type="file"
                className={this.state.isFilled.image ?
                  this.state.isValid.image ?
                    validInput : 
                      invalidInput : 
                        initialInput}
                name="image"
                onChange={this.handleUpload}
                />
            </div>
            <div className="row">
              <div className="col-3">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={!this.state.isFormValid}>
                    Submit
                </button> 
              </div>
              <div className="col-9">
                <p>{this.state.userMessage}</p>
              </div>
            </div>
               
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
    userDataIsReady: store.userData.userDataIsReady,
    user: store.userData.user,
    regIsSuccess: store.regState.regIsSuccess,
    language: store.langState.language
  };
};

export default connect(mapStateToProps)(RegForm);
