import React                 from 'react';
import { connect }           from 'react-redux';
import { fetchUser }          from '../actions/user-actions';

import * as methods           from '../constants/fetch';
import Spinner from '../views/Spinner'

class Wall extends React.Component {

    componentDidMount() {
        if (!this.props.response.authenticated)
            this.props.fetchUser(this.props.token, methods.GET_USER);
    }

    render() {
        const { response, fetching } = this.props
        if (fetching) return <Spinner/>
        return(
            <div className="wall__header">
                <div className="image"><img src="/mount.jpeg" alt=""/></div>
                <div className="menu">
                <div className="user">
                    <div className="user__pic">
                    <img src={response.avatar}
                    alt="user avatar"/>
                    </div>
                    <div className="user__name">
                    <h2>{response.firstName +' '+ response.lastName}</h2>
                    </div>
                </div>
                </div> 
            </div>
        )
    }

}

const mapStateToProps = function(store) {
    return {
        fetching: store.userData.fetching,
        response: store.userData.response,
        token: store.tokenState.token
    }
};
  
const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchUser: (token, method) => {
            dispatch(fetchUser(token, method));
        },
    }
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Wall);