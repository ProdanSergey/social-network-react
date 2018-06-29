import React                  from 'react';
import { connect }            from 'react-redux';
import { validateInput }      from '../assets/validateInput';
import { validateForm }       from '../assets/validateForm';
import { inputClass }         from '../assets/inputsClassHendler';
import { createSelectItems }  from '../assets/createSelectItems';
import { saveState }          from '../assets/LocalStorage';

import { loadTokenToStore }   from '../actions/token-actions';
import { storeFieldData }     from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';
import { push }               from 'connected-react-router';

import * as methods           from '../constants/fetch';

class RegForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      inputs: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  componentWillReceiveProps(nextProps) {
    if (this.props.response !== nextProps.response) {
      if (nextProps.response.registered) {
        const token = nextProps.response.token;
        saveState(token);
        this.props.loadTokenToStore(token);
        this.props.push('/registration:success');
      }
    }
  } 

  handleChange(event) {
    const { value, name, type } = event.target;
      this.setState({inputs: {...this.state.inputs, 
        [name]: {
          isFilled: !!value.length,
          isValid: validateInput(type, value)
        }
      }
    });
  }

  handleBlur(event) {
    let { value, name, files, type} = event.target;
    if(!!value.length) {
      const { isValid } = this.state.inputs[name]
      if(isValid) {
        this.props.storeFieldData(name, type !== 'file' ? value : files[0], true);
      } else {
        this.props.storeFieldData(name, type !== 'file' ? value : files[0], false);
      }
    }
  }

  handleUpload(event) {
    console.dir(event.target)
    const { files, name, type } = event.target;
    const image = files[0];
      this.setState({inputs: {...this.state.inputs, 
        [name]: {
          isFilled: !!image,
          isValid: image ? validateInput(type, image) : false
        }
      }
    });
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
                  className={inputClass(this.state.inputs.firstName)}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  placeholder="Enter your first name" required="required"/>
                  <small id="firstNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <input 
                  type="text"
                  name="middleName"
                  className={inputClass(this.state.inputs.middleName)}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  placeholder="Enter your middle name"/>
                  <small id="middleNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text"
                  name="lastName"
                  className={inputClass(this.state.inputs.lastName)}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  placeholder="Enter your last name" required="required"/>
                  <small id="lastNameHelp" className="form-text text-muted">Only latin characters and number allowed.</small>
              </div>
              <div className="form-group">
                <div className="row">
                    <div className="col-6">
                      <label htmlFor="gender">Gender</label>
                      <select 
                        name="gender"
                        className={inputClass(this.state.inputs.gender)}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
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
                        className={inputClass(this.state.inputs.age)}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
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
                  className={inputClass(this.state.inputs.email)}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  aria-describedby="emailHelp"
                  placeholder="Enter email" required="required"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="image">Choose photo...</label>
                <input
                  type="file"
                  className={inputClass(this.state.inputs.image)}
                  name="image"
                  onChange={this.handleUpload}
                  onBlur={this.handleBlur}
                  />
              </div>
              <div className="form-group">
                <button 
                  type="submit"
                  disabled={this.props.fetching}
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
    fetching: store.userData.fetching,
    response: store.userData.response
  }
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    loadTokenToStore: (token) => {
      dispatch(loadTokenToStore(token));
    },
    storeFieldData: (name, value, flag) => {
      dispatch(storeFieldData(name, value, flag));
    },
    fetchUser: (userForm, method) => {
      dispatch(fetchUser(userForm, method));
    },
    push: (path) => {
      dispatch(push(path));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);
