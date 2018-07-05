import React                from 'react';
import { connect }          from 'react-redux';
import { fetchShowMessage } from '../actions/user-actions';
import * as constants       from '../constants/global';

class MessageBox extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.fetchShowMessage();
    }

    render() {
        const { alert, response: {message, password} } = this.props
        return(
            <div className="message" hidden={!alert}>
                <p>{message}</p>
                <p>{constants.MESSAGE_PASSWORD_PLACEHOLDER} {password}</p>
                <button className="message__handler" onClick={this.handleClick}><i className="icon close-toggler"></i></button>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        alert:    store.userData.alert,
        response: store.userData.response
    }
};
  
const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchShowMessage: () => {
            dispatch(fetchShowMessage());
        },
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);