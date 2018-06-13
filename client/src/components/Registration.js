import React from 'react'

class RegForm extends React.Component {
  render() {
    return(
      <div className="col-6">
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" id="firstName" placeholder="Enter your first name" required="required"/>
          </div>
          <div className="form-group">
            <label htmlFor="middleName">Middle Name</label>
            <input type="text" className="form-control" id="middleName" placeholder="Enter your middle name"/>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" id="lastName" placeholder="Enter your last name" required="required"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default RegForm;
