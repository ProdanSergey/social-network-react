import React                 from 'react';
import { loadUserToStore }   from '../actions/user-actions';
import { getUser }           from '../assets/userData';
import { connect }           from 'react-redux';

class Account extends React.Component {

    componentDidMount() {
        if(!(this.props.token && this.props.token.authorized)) {
            this.props.history.push('/');
        } else {
            const token = this.props.token.token;
            if (!this.props.user) {
                getUser(token).then(user => {
                    let avatar = user.avatar.replace(/..\\client\\public/, '')
                    this.props.loadUserToStore({...user, avatar})
                })
            }
        }
    }

    render() {
        return(
            <div className="col-11">
                <div className="row account no-gutters">
                    <div className="col">
                        <section className="account__info">{
                            !this.props.user ?
                            <div className="spinner">
                                <img src="/icons/spinner.svg" alt="loading"/>
                            </div> :
                            <form>
                                <label htmlFor="firstName">First Name</label>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={
                                            this.props.user ?
                                            this.props.user.firstName :
                                            ''
                                        }
                                        placeholder="First Name" 
                                        aria-label="First Name"
                                        readOnly="true"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" disabled>Button</button>
                                    </div>
                                </div>
                                <label htmlFor="middleName">Middle Name</label>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text"
                                        name="middleName"
                                        className="form-control"
                                        value={
                                            this.props.user ?
                                            this.props.user.middleName :
                                            ''
                                        }
                                        placeholder="Middle Name" 
                                        aria-label="Middle Name"
                                        readOnly="true"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" disabled>Button</button>
                                    </div>
                                </div>
                                <label htmlFor="lastName">Last Name</label>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={
                                            this.props.user ?
                                            this.props.user.lastName :
                                            ''
                                        }
                                        placeholder="Last Name" 
                                        aria-label="Last Name"
                                        readOnly="true"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" disabled>Button</button>
                                    </div>
                                </div>
                            </form>
                            }
                        </section>
                    </div>
                    <div className="col">
                        <section className="account__avatar">{
                            !this.props.user ?
                            <div className="spinner">
                                <img src="/icons/spinner.svg" alt="loading"/>
                            </div> :
                            <form>
                                <div className="image">
                                    <img src={
                                        this.props.user ?
                                        this.props.user.avatar :
                                        ''
                                    } alt="user avatar"/>
                                </div>
                                <label htmlFor="image">Avatar</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Upload</span>
                                    </div>
                                    <div className="custom-file">
                                        <input type="file" name="image" className="custom-file-input" disabled/>
                                        <label className="custom-file-label" htmlFor="image">Choose file</label>
                                    </div>
                                </div>
                            </form>
                            }
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userData.user,
        token: store.tokenState.token
    }
};
  
  const mapDispatchToProps = (dispatch, state) => {
    return {
        loadUserToStore: (user) => {
            dispatch(loadUserToStore(user))
        }
    }
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Account);