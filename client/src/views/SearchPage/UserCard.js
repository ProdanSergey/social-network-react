import React from 'react';

class UserCard extends React.Component {

    genderIconHandler(gender) {
        return gender.toLowerCase() === 'male' ? 'gender-male' : 'gender-female'
    }

    render() {
        const {
            user: {
                firstName,
                lastName,
                gender,
                age,
                avatar
            }
        } = this.props
        return(
            <div className="card">
                <div className="card__image">
                    <img src={avatar} alt=""/>
                </div>
                <h1 className="card__name">{`${firstName} ${lastName}`}</h1>
                <p className="card__info"><i className={`icon news ${this.genderIconHandler(gender)}`}></i><span>{age} years</span></p>
            </div>
        ) 
    }

}

export default UserCard