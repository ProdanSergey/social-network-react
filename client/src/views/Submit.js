import React           from 'react';

class Submit extends React.Component {

    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onUpdate(event.target);
    }

    render(){
        const {
            button = false
        } = this.props

        return(
            <div hidden={!button} className={`input-button`}>
                    <button className={`btn btn-outline-${button.buttonClass}`} type="button" onClick={this.handleSubmit}>{button.buttonText}</button>
            </div>
        )
    }
}

export default Submit