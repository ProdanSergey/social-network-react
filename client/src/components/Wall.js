import React                 from 'react';
import { connect }           from 'react-redux';

import Spinner from '../views/Spinner'

class Wall extends React.Component {

    render() {
        const { response, fetching } = this.props
        if (fetching) return <Spinner/>
        return(
            <div className="row wallpage no-gutters">
                <section className=" col wallpage__header p-0">
                    <div className="image"><img src="/mount.jpeg" alt=""/></div>
                    <div className="menu">
                    <div className="user">
                        <div className="user__pic">
                        <img src={response.avatar}
                        alt="user avatar"/>
                        </div>
                        <div className="user__name">
                        <h2>{response.firstName +' '+ response.lastName}</h2>
                        </div>
                    </div>
                    </div> 
                </section>
            </div>
        )
    }

}

const mapStateToProps = function(store) {
    return {
        fetching: store.userData.fetching,
        response: store.userData.response,
        token: store.tokenState.token
    }
};

export default connect(mapStateToProps)(Wall);