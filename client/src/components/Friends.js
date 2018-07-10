import React            from 'react';
import { connect }      from 'react-redux';

import { fetchFriends } from '../actions/friends-action';

import FriendCard       from '../views/FriendsPage/FriendCard';

import * as methods     from '../constants/fetch';

class Friends extends React.Component {

    componentDidMount() {
        const { fetchFriends } = this.props
        fetchFriends(methods.GET_FRIENDS)
    }

    render() {
        return(
            <div className="col-11">
                <div className="row friendspage no-gutters">
                    <section className="col friendspage__list p-0">
                        <div className="row friendslist">
                            <FriendCard/>
                        </div>
                    </section>
                </div>
            </div>
        )
    }

}

const mapStateToProps = function(store) {
    return {
        ready:  store.friendsData.ready,
        fetching:  store.friendsData.fetching,
        response:  store.friendsData.response
    }
};
  
const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchFriends: (method) => {
            dispatch(fetchFriends(method));
        }
    }
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Friends);