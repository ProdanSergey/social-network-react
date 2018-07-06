import React                  from 'react';
import { connect }            from 'react-redux';
import { validateForm }       from '../assets/validateForm';
import { storeFieldData }     from '../actions/form-actions';

import { fetchUser }          from '../actions/user-actions';
import * as methods           from '../constants/fetch';
import * as constants         from '../constants/global';

import Input from '../views/Input';

class Search extends React.Component {

    constructor(props) {
        super(props);
    
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(event) {
        let { value, name, type } = event;
        this.props.storeFieldData(name, type, value);
    }
    
    render() {
        const {
            form,
            fetching
        } = this.props
        return(
            <div className="col-11">
                <div className="row searchpage no-gutters">
                    <section className="col searchpage__info ">
                        <form>
                        <div className="form-group">
                            <label htmlFor="search">Search your friends!</label>
                            <Input 
                                fieldName={'search'}
                                fieldType={'search'}
                                fieldValue={'Search...'}
                                fieldHelp={'searchHelp'}
                                helpText={constants.INPUT_ALERT_INVALID}
                                form={form}
                                onUpdate={this.onUpdate}
                            />
                        </div>
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