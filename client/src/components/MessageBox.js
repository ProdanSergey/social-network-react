import React                from 'react';
import { connect }          from 'react-redux';
import { hideMessage }      from '../actions/message-action';
import * as constants       from '../constants/global';

class MessageBox extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.hideMessage();
    }

    render() {
        const { body, alert } = this.props
        if (!alert) return false 
        return (
            <div className="message">
                <p>{body.message}</p>
                <p hidden={!body.registered}>{constants.MESSAGE_PASSWORD_PLACEHOLDER} {body.password}</p>
                <button className="message__handler" onClick={this.handleClick}><i className="icon close-toggler"></i></button>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        alert: store.messageData.alert,
        body:  store.messageData.body
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        hideMessage: () => {
            dispatch(hideMessage());
        }
    }
};
  
  
export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);