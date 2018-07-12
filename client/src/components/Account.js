import React                  from 'react';
import { connect }            from 'react-redux';

import { validateForm }       from '../assets/validateForm';
import { parseUploadFile }    from '../assets/parseUploadFile';

import { storeFieldData }     from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';

import * as methods           from '../constants/fetch';
import * as constants         from '../constants/global';

import Spinner                from '../views/Spinner';
import EditableAccountInput   from '../views/AccountPage/EditableAccountInput';

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar_preview: null,
            switchers: {
                firstName: false,
                middleName: false,
                lastName: false,
                image: false
            },
        };

        this.focus = this.focus.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(event) {
        let { value, name, type, tagName, dataset, files } = event.target;
        const { switchers } = this.state;
        if (event.type === 'change') {
            this.props.storeFieldData(name, type, value);
            if(type === 'file') {
                value = files[0] || false;
                parseUploadFile(value)
                    .then(file => this.setState({ avatar_preview: file.target.result }))
                    .catch(error => this.setState({ avatar_preview: null }))
            }
        }
        if (event.type === 'click') {
            if(tagName === 'BUTTON') {           
                console.log(event)
                const form = validateForm({
                    data: this.props.form, 
                    asFormData: true
                });
                if (form) {
                    this.props.fetchUser(methods.PUT_USER, form);
                } else {
                    console.log('form invalid')
                }
            }
            if(tagName === 'I') {
                this.setState({ switchers: {...switchers, [dataset.name]: !switchers[dataset.name]} })
            }
        }
        if (event.type === 'blur') {
            if (type !== 'file') {
                setTimeout(() => {
                    this.setState({ switchers: {...switchers, [name]: !switchers[name]} })
                }, 100)
            }
        }
        event.preventDefault();
    }

    focus() {
        this.textInput.focus();
    }

    render() {
        const {
            fetching,
            user: {
                firstName,
                middleName,
                lastName,
                avatar
            },
            form
        } = this.props

        const {
            avatar_preview,
            switchers
        } = this.state

        const inputOptions = {
            autofocus: true,
            required: false,
            helpText: constants.INPUT_ALERT_INVALID,
            switchers: switchers,
            ref: (input) => { this.textInput = input; },
            button: {
                buttonSide: 'append',
                buttonClass: 'secondary',
                buttonText: 'Send'
            },
            form: form,
            onUpdate: this.onUpdate
        }
        return(
            <div className="col-11">
                <div className="row accountpage no-gutters">
                    <section className="col mr-4 accountpage__info">
                        <Spinner hidden={!fetching}/>
                        <form hidden={fetching}>
                            <label htmlFor="firstName">First Name</label>
                            <EditableAccountInput
                                inputOptions={{...inputOptions,
                                    fieldName: 'firstName',
                                    fieldType: 'text',
                                    fieldValue: firstName,
                                    fieldHelp: 'firstNameHelp',  
                                }}
                            />
                            <label htmlFor="middleName">Middle Name</label>
                            <EditableAccountInput
                                inputOptions={{...inputOptions,
                                    fieldName: 'middleName',
                                    fieldType: 'text',
                                    fieldValue: middleName,
                                    fieldHelp: 'middleNameHelp',  
                                }}
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <EditableAccountInput
                                inputOptions={{...inputOptions,
                                    fieldName: 'lastName',
                                    fieldType: 'text',
                                    fieldValue: lastName,
                                    fieldHelp: 'lastNameHelp',  
                                }}
                            />
                        </form>
                    </section>
                    <section className="col accountpage__avatar">
                        <Spinner hidden={!fetching}/>
                        <form hidden={fetching}>
                            <label htmlFor="image">Avatar</label>
                            <div className="image">
                                <img src={avatar_preview || avatar} alt="user avatar"/>
                            </div>
                            <EditableAccountInput
                                inputOptions={{...inputOptions,
                                    autofocus: false,
                                    fieldName: 'image',
                                    fieldType: 'file',
                                    fieldValue: 'Choose your photo',
                                    fieldHelp: 'imageHelp', 
                                }}
                            />
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        form:      store.formData.form,
        fetching:  store.userData.fetching,
        user:      store.userData.user,
    }
};
  
const mapDispatchToProps = (dispatch, state) => {
    return {
        storeFieldData: (name, type, value) => {
            dispatch(storeFieldData(name, type, value));
        },
        fetchUser: (method, data) => {
            dispatch(fetchUser(method, data));
        }
    }
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Account);