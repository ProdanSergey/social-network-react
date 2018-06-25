import React          from 'react';
import { connect }    from 'react-redux';
import $              from 'jquery';
import { 
  regData, 
  regFormValid, 
  regFormInvalid, 
  regResponse 
}                     from '../actions/reg-actions';
import { Validation } from '../assets/validation';

// Input classNames
const initialInput = "form-control";
const validInput = "form-control is-valid";
const invalidInput = "form-control is-invalid";

// Component constructor

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

  componentDidMount() {
    if(this.props.token !== undefined) {
      if(this.props.token.authorized) this.props.history.push('/');
    } 
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.createUser(nextProps.user);
    }
    if (this.props.response !== nextProps.response) {
      if (nextProps.response.registered) {
        this.props.history.push('/registration:success');
      }
    }
  } 

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const type = target.type;
      this.setState({inputs: {...this.state.inputs, 
        [name]: {
          value,
          isFilled: !!value.length,
          isValid: Validation(type, value)
        }
      }
    });
  }

  handleBlur(event) {
    const inputs = this.state.inputs || false;
    const valid = this.props.regFormValid
    const invalid = this.props.regFormInvalid
    const firstFalse = obj => {
      for (let field in obj) {
        if (!obj[field].isValid) return true;
      }
      return false;
    }
    firstFalse(inputs) ? invalid() : valid();
  }

  handleUpload(event) {
    const target = event.target;
    const image = target.files[0];
    const name = target.name;
    if (!image) {
      this.setState({inputs: {...this.state.inputs, 
          [name]: {
            value: null,
            isFilled: false
          }
        }
      }) 
    return
    }
      this.setState({inputs: {...this.state.inputs, 
        [name]: {
          value: image,
          isFilled: !!image,
          isValid: (image.size > 4e+4 && image.size < 5e+6) || image.type !== 'image/jpeg'
        }
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const valid = this.props.formIsValid;
    if (valid) {
      var form = new FormData();
      let dataToSerialize = this.state.inputs;
      for (let prop in dataToSerialize) {
        form.append(`${prop}`, dataToSerialize[prop].value)
      }
      this.props.regData(form);
    } else {
      console.log('form invalid')
    }
  }

  createUser(dataObject) {
    $.ajax({
      url: '/api',
      method: 'post',
      accept: 'application/json',
      data: dataObject,
      contentType: false,
      processData: false,
      success: (data, textStatus, jqXHR) => {
        if (jqXHR.status === 201) {
          this.props.regResponse({
            message: data.message,
            registered: data.registered,
            password: data.password
          });
        } else {
          this.props.regResponse({
            message: data.message,
            registered: data.registered,
          });
        }
      },
      error: error => {
        console.log(error);
      }
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
                  className={
                    typeof this.state.inputs.firstName === "undefined" ? 
                    initialInput :
                    (this.state.inputs.firstName.isFilled ?
                    this.state.inputs.firstName.isValid ?
                      validInput : 
                        invalidInput : 
                          initialInput)}
                  value={this.state.value} 
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
                  className={
                    typeof this.state.inputs.middleName === "undefined" ? 
                    initialInput :
                    (this.state.inputs.middleName.isFilled ?
                    this.state.inputs.middleName.isValid ?
                      validInput : 
                        invalidInput : 
                          initialInput)}
                  value={this.state.value} 
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
                  className={
                    typeof this.state.inputs.lastName === "undefined" ? 
                    initialInput :
                    (this.state.inputs.lastName.isFilled ?
                    this.state.inputs.lastName.isValid ?
                      validInput : 
                        invalidInput : 
                          initialInput)}
                  value={this.state.value} 
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
                        className={
                          typeof this.state.inputs.gender === "undefined" ? 
                          initialInput :
                          (this.state.inputs.gender.isFilled ?
                            validInput : 
                              initialInput)}
                        name="gender"
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
                        className={
                          typeof this.state.inputs.age === "undefined" ? 
                          initialInput :
                          (this.state.inputs.age.isFilled ?
                            validInput : 
                              initialInput)}
                        name="age"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
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
                  className={
                    typeof this.state.inputs.email === "undefined" ? 
                    initialInput :
                    (this.state.inputs.email.isFilled ?
                    this.state.inputs.email.isValid ?
                      validInput : 
                        invalidInput : 
                          initialInput)}
                  value={this.state.value}
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
                  className={
                    typeof this.state.inputs.image === "undefined" ? 
                    initialInput :
                    (this.state.inputs.image.isFilled ?
                    this.state.inputs.image.isValid ?
                      validInput : 
                        invalidInput : 
                          initialInput)}
                  name="image"
                  onChange={this.handleUpload}
                  onBlur={this.handleBlur}
                  />
              </div>
              <div className="form-group d-flex">
                <div className="col-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary">
                      Submit
                  </button>
                </div>
                <div className="col-9">
                  <p 
                    className="alert alert-warning mb-0" 
                    role="alert" 
                    hidden={!(!!this.props.response.message)}>
                    {this.props.response.message}</p>
                </div>
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
    user:             store.regData.user,
    formIsValid:      store.regData.formIsValid,
    response:         store.regData.response,
    token:            store.tokenState.token
  }
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    regData: (user) => {
      dispatch(regData(user));
    },
    regFormInvalid: () => {
      dispatch(regFormInvalid());
    },
    regFormValid: () => {
      dispatch(regFormValid());
    },
    regResponse: (response) => {
      dispatch(regResponse(response))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);
