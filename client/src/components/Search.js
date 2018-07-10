import React                  from 'react';
import { connect }            from 'react-redux';
import { validateForm }       from '../assets/validateForm';
import { storeFieldData }     from '../actions/form-actions';

import { fetchUser }          from '../actions/user-actions';
import * as methods           from '../constants/fetch';
import * as constants         from '../constants/global';

import Input from '../views/Input';
import SearchResult from '../views/SearchPage/SearchResult';

class Search extends React.Component {

    constructor(props) {
        super(props);
    
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(event) {
        let { value, name, type, tagName } = event.target;
        if (event.type === 'change') {
            this.props.storeFieldData(name, type, value);
        }
        if (event.type === 'click') {
            if(tagName === 'BUTTON') {
                const form = validateForm({
                    data: this.props.form, 
                    asFormData: false
                });
                if (form) {
                    this.props.fetchUser(form, methods.SEARCH_USERS);
                } else {
                    console.log('form invalid')
                }
            }
        }
    }
    
    render() {
        const {
            form,
            response = false
        } = this.props
        const inputOptions = {
            autofocus: false,
            button: false,
            required: false,
            helpText: constants.INPUT_ALERT_INVALID,
            form: form,
            onUpdate: this.onUpdate
        }
        return(
            <div className="col-11">
                <div className="row searchpage no-gutters">
                    <section className="col searchpage__form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="search">Search your friends!</label>
                                <Input
                                    inputOptions={{...inputOptions,
                                        fieldName: 'search',
                                        fieldType: 'search',
                                        fieldValue: 'Search...',
                                        fieldHelp: 'searchHelp',
                                        required: true,
                                        button: {
                                            buttonSide: 'append',
                                            buttonClass: 'primary',
                                            buttonText: 'Search'
                                        }
                                    }}
                                />
                            </div>
                        </form>
                    </section>
                </div>
                <div className="row searchpage no-gutters">
                    <section className="col searchpage__result">    
                        <SearchResult searchResult={response}/>
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
        response:  store.userData.response,
    }
};
  
  const mapDispatchToProps = (dispatch, state) => {
    return {
        storeFieldData: (name, type, value) => {
            dispatch(storeFieldData(name, type, value));
        },
        fetchUser: (userForm, method) => {
            dispatch(fetchUser(userForm, method));
        }
    }
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Search);