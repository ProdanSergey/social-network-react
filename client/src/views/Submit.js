import React           from 'react';

class Submit extends React.Component {

    render(){
        const {
            button = false,
            onUpdate
        } = this.props

        return(
            <div hidden={!button} className={`input-button`}>
                    <button className={`btn btn-outline-${button.buttonClass}`} type="button" onClick={onUpdate}>{button.buttonText}</button>
            </div>
        )
    }
}

export default Submit