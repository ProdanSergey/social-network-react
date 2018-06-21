import React from 'react';

// Connect to Redux Store
import { connect } from 'react-redux';

import '../css/alerts.css';

// Import view
// import { AlertSuccess } from '../views/Messages';

class RegSuccess extends React.Component {
    
    render() {
        console.log(this.props)
        return(
            <div className="alert alert-success mx-auto" role="alert">
                <h4 className="alert-heading">Congratulations!</h4>
                    <p>You are successfully finished registration! You can start using your account now. Have a nice day!</p>
                    <hr/>
                <p className="mb-0">Your password is <span className="d-inline bg-primary text-white ">{this.props.alertText.password}</span> remember it to be able login next time</p>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
            alertText: store.regState.alertText
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(RegSuccess);