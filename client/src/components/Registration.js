import React from 'react'

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

class RegForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: {}, 
      isRegSuccess: false, 
      input: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    const regex = /^[^а-яА-Я\s\W]+$/;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    regex.test(value) ? 
      this.setState({input: {...this.state.input, [name]: true}}) :
      this.setState({input: {...this.state.input, [name]: false}});
    this.setState({user: {...this.state.user, [name]: value}});
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
    const validInput = "form-control is-valid";
    const invalidInput = "form-control is-invalid";
    // console.log(this.state.input)
    return(
      <div className="col-6">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className={this.state.input.firstName ? validInput : invalidInput} name="firstName" value={this.state.value} onChange={this.handleChange} placeholder="Enter your first name" required="required"/>
          </div>
          <div className="form-group">
            <label htmlFor="middleName">Middle Name</label>
            <input type="text" className={this.state.input.middleName ? validInput : invalidInput} name="middleName" value={this.state.value} onChange={this.handleChange} placeholder="Enter your middle name"/>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className={this.state.input.lastName ? validInput : invalidInput} name="lastName" value={this.state.value} onChange={this.handleChange} placeholder="Enter your last name" required="required"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" required="required"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="image">Choose photo...</label>
            <input type="file" class="form-control" name="image"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default RegForm;
