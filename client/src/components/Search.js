import React                  from 'react';
import { connect }            from 'react-redux';
import { validateForm }       from '../assets/validateForm';

import { storeFieldData }     from '../actions/form-actions';
import { fetchUser }          from '../actions/user-actions';
import { fetchSearch }        from '../actions/search-actions';


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
        let { value, name, id, type, tagName, dataset } = event.target;
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
                    this.props.fetchSearch(methods.SEARCH_USERS, form);
                } else {
                    console.log('form invalid')
                }
            }
            if(tagName === 'I') {
                if(dataset.friend == 'true') {
                    console.log(dataset.friend)
                    this.props.fetchUser(methods.REMOVE_FRIEND, {friend: id})
                } else {
                    console.log(dataset.friend)
                    this.props.fetchUser(methods.ADD_FRIEND, {friend: id})
                }
            }     
        }
    }
    
    render() {
        const {
            form,
            ready,
            response,
            user
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
                        <SearchResult searchResult={{response, user, ready}} onUpdate={this.onUpdate}/>
                    </section>
                </div>
            </div>
        )
    }

}

const mapStateToProps = function(store) {
    return {
        form:         store.formData.form,
        ready:        store.searchData.ready,
        fetching:     store.searchData.fetching,
        response:     store.searchData.response,
        user:         store.userData.user
    }
};
  
  const mapDispatchToProps = (dispatch, state) => {
    return {
        storeFieldData: (name, type, value) => {
            dispatch(storeFieldData(name, type, value));
        },
        fetchSearch: (method, data) => {
            dispatch(fetchSearch (method, data));
        },
        fetchUser: (method, data) => {
            dispatch(fetchUser (method, data));
        }
    }
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Search);