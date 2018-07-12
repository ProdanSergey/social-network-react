import React                 from 'react';
import { connect }           from 'react-redux';

import Spinner from '../views/Spinner';

class Wall extends React.Component {

    render() {
        const { 
            user: {
                avatar,
                firstName,
                lastName
            },
            fetching
        } = this.props
        if (fetching) return <Spinner/>
        return(
            <div className="col-11">
                <div className="row wallpage no-gutters">
                    <section className=" col wallpage__header p-0">
                        <div className="image"><img src="/mount.jpeg" alt=""/></div>
                        <div className="menu">
                        <div className="user">
                            <div className="user__pic">
                            <img src={avatar}
                            alt="user avatar"/>
                            </div>
                            <div className="user__name">
                            <h2>{firstName +' '+ lastName}</h2>
                            </div>
                        </div>
                        </div> 
                    </section>
                </div>
            </div>
        )

    }

}

const mapStateToProps = function(store) {
    return {
        fetching: store.userData.fetching,
        user:     store.userData.user,
        isLogin:  store.userData.isLogin
    }
};

export default connect(mapStateToProps)(Wall);