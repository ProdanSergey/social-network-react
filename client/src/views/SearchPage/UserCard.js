import React from 'react';

class UserCard extends React.Component {

    genderIconHandler(gender) {
        return gender.toLowerCase() === 'male' ? 'gender-male' : 'gender-female'
    }

    render() {
        const {
            user: {
                _id,
                firstName,
                lastName,
                gender,
                age,
                avatar
            },
            isFriend,
            onUpdate
        } = this.props
        return(
            <div className="usercard">
                <div className="usercard__image">
                    <img src={avatar} alt=""/>
                </div>
                <h1 className="usercard__name">{`${firstName} ${lastName}`}</h1>
                <p className="usercard__info"><i className={`icon ${this.genderIconHandler(gender)}`}></i><span>{age} years</span></p>
                <div className="usercard__follow">
                    <i 
                        id={_id} 
                        className={`icon star-${isFriend ? 'filled' : 'blank'}`} 
                        data-friend={isFriend} 
                        onClick={onUpdate}>
                    </i>
                </div>
            </div>
        ) 
    }

}

export default UserCard