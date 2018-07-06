import React from 'react';
import * as constants from '../../constants/global';
import UserCard from './UserCard';

class SearchResult extends React.Component {

    render() {
        const {
            searchResult: {
                    search = false,
                    users
            }
        } = this.props
        if(search === null) return <p className="mb-0">{constants.SEARCH_NOTHING_FOUND}</p>
        if(search) {
            return (
                <div className="row users">
                    {users.map((user, index) => <UserCard key={index} user={user}/>)}
                </div>
            )
        } else {
            return <p className="mb-0">{constants.SEARCH_INITIAL_TEXT}</p>
        }
        
    }

}

export default SearchResult