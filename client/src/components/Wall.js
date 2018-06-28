import React                 from 'react';
import { loadUserToStore }   from '../actions/user-actions';
import { getUser }           from '../assets/userData';
import { connect }           from 'react-redux';

class Wall extends React.Component {

    componentDidMount() {
        const token = this.props.token.token;
        if (!this.props.user) {
            getUser(token).then(user => {
                let avatar = user.avatar.replace(/..\\client\\public/, '')
                this.props.loadUserToStore({...user, avatar})
            })
        }
    }

    render() {
        return(
            <div>
                {
                !this.props.user ? 
                    <div className="spinner">
                        <img src="/icons/spinner.svg" alt="loading"/>
                    </div> :
                <div className="wall__header">
                    <div className="image"><img src="/mount.jpeg" alt=""/></div>
                    <div className="menu">
                    <div className="user">
                        <div className="user__pic">
                        <img src={
                            this.props.user ?
                            this.props.user.avatar :
                            ''
                        }alt="user avatar"/>
                        </div>
                        <div className="user__name">
                        <h2>{`
                            ${
                            this.props.user ?
                            this.props.user.firstName :
                            ''}
                            ${
                            this.props.user ?
                            this.props.user.lastName :
                            ''}
                            `}</h2>
                        </div>
                    </div>
                    </div> 
                </div>
                }
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
  

export default connect(mapStateToProps, mapDispatchToProps)(Wall);