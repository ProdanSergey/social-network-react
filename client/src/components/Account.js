import React                  from 'react';
import { connect }            from 'react-redux';
import { validateForm }       from '../assets/validateForm';

import { 
    storeFieldData,
    switchFieldMode }           from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';

import * as methods           from '../constants/fetch';
import Spinner                from '../views/Spinner';

import EditableAccountInput   from '../views/AccountPage/EditableAccountInput';

class Account extends React.Component {

    constructor(props) {
        super(props)

        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        if (!this.props.response.authenticated)
            this.props.fetchUser(null, methods.GET_USER);
    }

    onUpdate(payload) {
        const { event, value, name, type } = payload;
        const { storeFieldData, switchFieldMode} = this.props;
        if (event === 'change') {
            storeFieldData(name, type, value);
        } 
        if (event === 'submit') {
            const form = validateForm({
                data: this.props.form, 
                asFormData: true
            });
            if (form) {
                this.props.fetchUser(form, methods.PUT_USER);
                switchFieldMode(name, false);
            } else {
                console.log('form invalid')
            }
        }
        if (event === 'switch') {
            switchFieldMode(name, true)
        }
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
            form,
            switchers
        } = this.props
        return(
            <div className="col-11">
                <div className="row accountpage no-gutters">
                    <section className="col mr-4 accountpage__info">
                        <Spinner hidden={!fetching}/>
                        <form hidden={fetching}>
                            <label htmlFor="firstName">First Name</label>
                            <EditableAccountInput
                                fieldName={'firstName'}
                                fieldType={'text'}
                                fieldValue={firstName}
                                form={form}
                                switchers={switchers}
                                onUpdate={this.onUpdate}
                            />
                            <label htmlFor="middleName">Middle Name</label>
                            <EditableAccountInput
                                fieldName={'middleName'}
                                fieldType={'text'}
                                fieldValue={middleName}
                                form={form}
                                switchers={switchers}
                                onUpdate={this.onUpdate}
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <EditableAccountInput
                                fieldName={'lastName'}
                                fieldType={'text'}
                                fieldValue={lastName}
                                form={form}
                                switchers={switchers}
                                onUpdate={this.onUpdate}
                            />
                        </form>
                    </section>
                    <section className="col accountpage__avatar">
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
                                switchers={switchers}
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
        form:      store.formData.form,
        switchers: store.formData.switchers,
        fetching:  store.userData.fetching,
        response:  store.userData.response,
    }
};
  
  const mapDispatchToProps = (dispatch, state) => {
    return {
        storeFieldData: (name, type, value) => {
            dispatch(storeFieldData(name, type, value));
        },
        switchFieldMode: (name, value) => {
            dispatch(switchFieldMode(name, value));
        },
        fetchUser: (userForm, method) => {
            dispatch(fetchUser(userForm, method));
        }
    }
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Account);