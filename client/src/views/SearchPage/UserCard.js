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
            <div className="card">
                <div className="card__image">
                    <img src={avatar} alt=""/>
                </div>
                <h1 className="card__name">{`${firstName} ${lastName}`}</h1>
                <p className="card__info"><i className={`icon ${this.genderIconHandler(gender)}`}></i><span>{age} years</span></p>
                <div className="card__follow">
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