import React            from 'react';
import { connect }      from 'react-redux';

import { fetchFriends } from '../actions/friends-actions';

import FriendResult from '../views/FriendsPage/FriendResult';

import * as methods     from '../constants/fetch';

class Friends extends React.Component {

    componentDidMount() {
        const { fetchFriends } = this.props
        fetchFriends(methods.GET_FRIENDS)
    }

    render() {
        const {
            ready,
            response,
            user,
            friends
        } = this.props
        return(
            <div className="col-11">
                <div className="row friendspage no-gutters">
                    <section className="col friendspage__list p-0">
                        <FriendResult friendsResult={{response, user, friends, ready}} onUpdate={this.onUpdate}/>
                    </section>
                </div>
            </div>
        )
    }

}

const mapStateToProps = function(store) {
    return {
        ready:     store.friendsData.ready,
        fetching:  store.friendsData.fetching,
        response:  store.friendsData.response,
        friends:   store.friendsData.friends,
        user:      store.userData.user
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