import React from 'react';

import FriendCard from '../views/FriendsPage/FriendCard';

class Friends extends React.Component {

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

export default Friends;