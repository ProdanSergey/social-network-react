import React from 'react';
import * as constants from '../../constants/global';
import UserCard from '../SearchPage/UserCard';

class FriendResult extends React.Component {

    render() {
        const {
            friendsResult: {     
                ready,
                friends: {
                    users
                },
                user: {
                    friends
                }
            }
        } = this.props
        if (ready) {
            if (!users.length) return <p className="mb-0">{constants.SEARCH_NOTHING_FOUND}</p>
            return (
                <div className="row users">
                    {users.map((user) => <UserCard key={user._id} user={user} isFriend={friends.includes(user._id)} onUpdate={this.props.onUpdate}/>)}
                </div>
            )
        } else {
            return <p className="mb-0">{constants.SEARCH_INITIAL_TEXT}</p>
        }
        
    }

}

export default FriendResult