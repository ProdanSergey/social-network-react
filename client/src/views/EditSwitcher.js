import React from 'react';

class EditSwitcher extends React.Component {

    render() {
        const {
            fieldName,
            onUpdate
        } = this.props.inputOptions
        return(
            <i 
                className="icon edit"
                onClick={onUpdate}
                data-name={fieldName}>
            </i>
        )
    }
}

export default EditSwitcher;