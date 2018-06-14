import React from 'react'

class RegForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {user: {}};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({user: {...this.state.user, [name]: value}});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return(
      <div className="col-6">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" name="firstName" value={this.state.value} onChange={this.handleChange} placeholder="Enter your first name" required="required"/>
          </div>
          <div className="form-group">
            <label htmlFor="middleName">Middle Name</label>
            <input type="text" className="form-control" name="middleName" value={this.state.value} onChange={this.handleChange} placeholder="Enter your middle name"/>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" name="lastName" value={this.state.value} onChange={this.handleChange} placeholder="Enter your last name" required="required"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default RegForm;
