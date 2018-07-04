import React from 'react';

class Spinner extends React.Component {

    render() {
        const { hidden } = this.props
        return(
            <div className="spinner" hidden={hidden}>
                <img src="/icons/spinner.svg" alt="loading"/>
            </div>
        )
    }
}

export default Spinner