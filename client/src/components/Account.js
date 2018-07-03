import React                  from 'react';
import { connect }            from 'react-redux';
import { validateForm }       from '../assets/validateForm';

import { 
    storeFieldData, 
    clearFormData }           from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';

import * as methods           from '../constants/fetch';
import Spinner                from '../views/Spinner';

import EditableAccountInput   from '../views/AccountPage/EditableAccountInput';
import EditSwitcher           from '../views/AccountPage/EditSwitcher';

class Account extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isEditMode: false
        };

        this.onSwitch = this.onSwitch.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        if (!this.props.response.authenticated)
            this.props.fetchUser(this.props.token, methods.GET_USER);
            
    }

    componentWillUnmount() {
        this.props.clearFormData();
    }

    onUpdate(payload) {
        const { event, value, name, type } = payload;
        if (event === 'change') {
            this.props.storeFieldData(name, type, value);
        } 
        if (event === 'submit') {
            const form = validateForm({
                data: this.props.form, 
                asFormData: true
            });
            if (form) {
                this.props.fetchUser(form, methods.PUT_USER);
            } else {
                console.log('form invalid')
            }
        }
    }

    onSwitch(payload) {
        const { checked } = payload.target;
        this.setState({isEditMode: checked})
    }

    render() {
        const {
            fetching,
            response: {
                firstName,
                middleName,
                lastName,
                avatar
            },
            form
        } = this.props
        const {
            isEditMode
        } = this.state
        return(
            <div className="col-11">
                <div className="row account no-gutters">
                    <section className="account__info col">
                        <Spinner hidden={!fetching}/>
                        <form hidden={fetching}>
                            <label htmlFor="firstName">First Name</label>
                            <EditableAccountInput
                                fieldName={'firstName'}
                                fieldType={'text'}
                                fieldValue={firstName}
                                form={form}
                                formState={isEditMode}
                                onUpdate={this.onUpdate}
                            />
                            <label htmlFor="middleName">Middle Name</label>
                            <EditableAccountInput
                                fieldName={'middleName'}
                                fieldType={'text'}
                                fieldValue={middleName}
                                form={form}
                                formState={isEditMode}
                                onUpdate={this.onUpdate}
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <EditableAccountInput
                                fieldName={'lastName'}
                                fieldType={'text'}
                                fieldValue={lastName}
                                form={form}
                                formState={isEditMode}
                                onUpdate={this.onUpdate}
                            />
                            <EditSwitcher onSwitch={this.onSwitch}/>
                        </form>
                    </section>
                    <section className="account__avatar col">
                        <Spinner hidden={!fetching}/>
                        <form hidden={fetching}>
                            <label htmlFor="image">Avatar</label>
                            <div className="image">
                                <img src={avatar} alt="user avatar"/>
                            </div>
                            <EditableAccountInput
                                fieldName={'image'}
                                fieldType={'file'}
                                form={form}
                                formState={isEditMode}
                                onUpdate={this.onUpdate}
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
        form:     store.formData.form,
        fetching: store.userData.fetching,
        response: store.userData.response,
        token:    store.tokenState.token
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
  

export default connect(mapStateToProps, mapDispatchToProps)(Account);