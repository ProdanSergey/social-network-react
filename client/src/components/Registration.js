import React                  from 'react';
import { connect }            from 'react-redux';
import { validateForm }       from '../assets/validateForm';
import { inputClass }         from '../assets/inputsClassHendler';
import { createSelectItems }  from '../assets/createSelectItems';

import { 
  storeFieldData, 
  clearFormData }             from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';

import * as methods           from '../constants/fetch';

class RegForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  componentWillUnmount() {
    this.props.clearFormData();
  }

  handleChange(event) {
    let { value, name, type, files } = event.target;
    if (type === 'file') value = files[0] || false;
    this.props.storeFieldData(name, type, value);
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = validateForm({
      data: this.props.form, 
      asFormData: true
    });
    if (form) {
      this.props.fetchUser(form, methods.ADD_USER);
    } else {
      console.log('form invalid')
    }
  }
  
  render() {
    const {
      form,
      fetching
    } = this.props
    return(
      <div className="col-11">
        <div className="row registration">
          <div className="col-6">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text"
                  name="firstName" 
                  className={inputClass(form.firstName)}
                  onChange={this.handleChange}
                  placeholder="Enter your first name" required="required"/>
                  <small id="firstNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <input 
                  type="text"
                  name="middleName"
                  className={inputClass(form.middleName)}
                  onChange={this.handleChange}
                  placeholder="Enter your middle name"/>
                  <small id="middleNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text"
                  name="lastName"
                  className={inputClass(form.lastName)}
                  onChange={this.handleChange}
                  placeholder="Enter your last name" required="required"/>
                  <small id="lastNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
              </div>
              <div className="form-group">
                <div className="row">
                    <div className="col-6">
                      <label htmlFor="gender">Gender</label>
                      <select 
                        name="gender"
                        className={inputClass(form.gender)}
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
                        name="age"
                        className={inputClass(form.age)}
                        onChange={this.handleChange}
                        defaultValue="default">
                        <option disabled value="default">Choose...</option>
                        {createSelectItems(1,99)}
                      </select>
                    </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input 
                  type="email"
                  name="email"
                  className={inputClass(form.email)}
                  onChange={this.handleChange}
                  aria-describedby="emailHelp"
                  placeholder="Enter email" required="required"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="image">Choose photo...</label>
                <input
                  type="file"
                  className={inputClass(form.image)}
                  name="image"
                  onChange={this.handleChange}
                  // required="required"
                  />
              </div>
              <div className="form-group">
                <button 
                  type="submit"
                  disabled={fetching}
                  className="btn btn-primary">
                    Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-6">
            <h1>Welcome to, Social Network React!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellat facilis sed libero eveniet porro aperiam error reprehenderit, fugit magni! Ab officiis magnam vitae voluptate vel laboriosam eos, explicabo accusamus.</p>
          </div>
        </div>
      </div>  
    );
  }

};

const mapStateToProps = function(store) {
  return {
    form:  store.formData.form,
    fetching: store.userData.fetching
  }
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    storeFieldData: (name, value, flag) => {
      dispatch(storeFieldData(name, value, flag));
    },
    clearFormData: () => {
      dispatch(clearFormData());
    },
    fetchUser: (userForm, method) => {
      dispatch(fetchUser(userForm, method));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);
