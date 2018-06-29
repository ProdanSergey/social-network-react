import React from 'react';

class Spinner extends React.Component {

    render() {
        return(
            <div className="spinner">
                <img src="/icons/spinner.svg" alt="loading"/>
            </div>
        )
    }
}

export default Spinner