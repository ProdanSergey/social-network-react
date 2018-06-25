import React       from 'react';
import { connect } from 'react-redux';

class RegSuccess extends React.Component {
    
    componentDidMount() {
        if(this.props.token !== undefined) {
            if(this.props.token.authorized) this.props.history.push('/');
        }
    }

    render() {
        return(
            <div className="col-11">
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
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        response: store.regData.response,
        token:    store.tokenState.token
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(RegSuccess);