import React       from 'react';
import { connect } from 'react-redux';

import '../css/alerts.css';

class RegSuccess extends React.Component {
    
    render() {
        console.log(this.props)
        return(
            <div className="alert alert-success mx-auto" role="alert">
                <h4 className="alert-heading">Congratulations!</h4>
                    <p>You are successfully finished registration! You can start using your account now. Have a nice day!</p>
                    <hr/>
                <p className="mb-0">Your password is <span className="d-inline bg-primary text-white ">
                        {   this.props.response ?
                            this.props.response.password : ''}
                    </span> remember it to be able login next time
                </p>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        response: store.regState.response
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(RegSuccess);