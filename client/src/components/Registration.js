import React                  from 'react';
import { connect }            from 'react-redux';
import { validateForm }       from '../assets/validateForm';
import { createSelectItems }  from '../assets/createSelectItems';

import { storeFieldData }     from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';

import * as methods           from '../constants/fetch';
import * as constants         from '../constants/global';

import Input from '../views/Input';

class RegForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 


  onUpdate(event) {
    let { value, name, type, files } = event;
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
                <Input 
                  fieldName={'firstName'}
                  fieldType={'text'}
                  fieldValue={'Enter your first name'}
                  fieldHelp={'firstNameHelp'}
                  required={true}
                  helpText={constants.INPUT_ALERT_INVALID}
                  form={form}
                  onUpdate={this.onUpdate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <Input 
                  fieldName={'middleName'}
                  fieldType={'text'}
                  fieldValue={'Enter your middle name'}
                  fieldHelp={'middleNameHelp'}
                  required={false}
                  helpText={constants.INPUT_ALERT_INVALID}
                  form={form}
                  onUpdate={this.onUpdate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Input 
                  fieldName={'lastName'}
                  fieldType={'text'}
                  fieldValue={'Enter your last name'}
                  fieldHelp={'lastNameHelp'}
                  required={true}
                  helpText={constants.INPUT_ALERT_INVALID}
                  form={form}
                  onUpdate={this.onUpdate}
                />
              </div>
              <div className="form-group">
                <div className="row p-0">
                    <div className="col-6">
                      <label htmlFor="gender">Gender</label>
                      <Input 
                        fieldName={'gender'}
                        fieldType={'select'}
                        fieldValue={'Choose...'}
                        defaultValue={'default'}
                        form={form}
                        options={['Male', 'Female']}
                        onUpdate={this.onUpdate}
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="age">Age</label>
                      <Input 
                        fieldName={'age'}
                        fieldType={'select'}
                        fieldValue={'Choose...'}
                        defaultValue={'default'}
                        form={form}
                        options={createSelectItems(1,99)}
                        onUpdate={this.onUpdate}
                      />
                    </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <Input 
                  fieldName={'email'}
                  fieldType={'email'}
                  fieldValue={'Enter your email'}
                  fieldHelp={'emailHelp'}
                  required={true}
                  helpText={constants.INPUT_ALERT_INVALID}
                  form={form}
                  onUpdate={this.onUpdate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Choose photo...</label>
                <Input 
                  fieldName={'image'}
                  fieldType={'file'}
                  fieldValue={'Choose your photo'}
                  fieldHelp={'imageHelp'}
                  required={true}
                  helpText={constants.INPUT_ALERT_INVALID}
                  form={form}
                  onUpdate={this.onUpdate}
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
    fetchUser: (userForm, method) => {
      dispatch(fetchUser(userForm, method));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);
