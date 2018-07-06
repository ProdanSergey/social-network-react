import React                from 'react';
import { connect }          from 'react-redux';
import * as constants       from '../constants/global';

class MessageBox extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
    }

    render() {
        const { response: {registered, alert, message, password} } = this.props
        return(
            <div className="message" hidden={!alert}>
                <p>{message}</p>
                <p hidden={!registered}>{constants.MESSAGE_PASSWORD_PLACEHOLDER} {password}</p>
                <button className="message__handler" onClick={this.handleClick}><i className="icon close-toggler"></i></button>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        response: store.userData.response
    }
};
  
  
export default connect(mapStateToProps)(MessageBox);