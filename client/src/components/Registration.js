import React from 'react'

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const validInput = "form-control is-valid";
const invalidInput = "form-control is-invalid";

class RegForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: {}, 
      isRegSuccess: false, 
      inputValid: {},
      inputTouched: {
        firstName: false,
        middleName: false,
        lastName: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    const regex = /^[^а-яА-Я\s\W]+$/;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    regex.test(value) ? 
      this.setState({inputValid: {...this.state.inputValid, [name]: true}}) :
      this.setState({inputValid: {...this.state.inputValid, [name]: false}});
    
    this.setState({user: {...this.state.user, [name]: value}});
  }
  
  handleBlur(event) {
    const target = event.target;
    const name = target.name;
    this.setState({inputTouched: {...this.state.inputTouched, [name]: true}})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createUser(this.state.user, this);
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
    return(
      <div className="col-6">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className={!this.state.inputTouched.firstName ? 
              validInput : 
                this.state.inputValid.firstName ?
                  validInput :
                   invalidInput} 
              name="firstName" 
              value={this.state.value} 
              onChange={this.handleChange} 
              onBlur={this.handleBlur} 
              placeholder="Enter your first name" required="required"/>
              <small id="firstNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
          </div>
          <div className="form-group">
            <label htmlFor="middleName">Middle Name</label>
            <input type="text" className={!this.state.inputTouched.middleName ? 
              validInput : 
                this.state.inputValid.middleName ?
                  validInput :
                   invalidInput} 
              name="middleName" 
              value={this.state.value} 
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="Enter your middle name"/>
              <small id="middleNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className={!this.state.inputTouched.lastName ? 
              validInput : 
                this.state.inputValid.lastName ?
                  validInput :
                   invalidInput} 
              name="lastName" value={this.state.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="Enter your last name" required="required"/>
              <small id="lastNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" required="required"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="image">Choose photo...</label>
            <input type="file" className="form-control" name="image"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default RegForm;
