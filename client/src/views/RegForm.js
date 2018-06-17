import React from 'react';

class RegForm extends React.Component {

render() {
    console.log(this)
    return(
      <main className="row main">
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
              <input type="email" className="form-control" name="email" aria-describedby="emailHelp" 
                onChange={this.handleChange}
                placeholder="Enter email" required="required"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="image">Choose photo...</label>
              <input type="file" className="form-control" name="image"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-6">
          <h1>Welcome to, Social Network React!</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellat facilis sed libero eveniet porro aperiam error reprehenderit, fugit magni! Ab officiis magnam vitae voluptate vel laboriosam eos, explicabo accusamus.</p>
        </div>
      </main>
    );
  }
}

export default RegForm;