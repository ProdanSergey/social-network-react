import React from 'react';

class EditSwitcher extends React.Component {

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name } = event.target.dataset
        this.props.onUpdate({event: 'switch', name});
    }

    render() {
        return(
            <i 
                className="icon edit"
                onClick={this.handleChange}
                data-name={this.props.fieldName}>
            </i>
        )
    }
}

export default EditSwitcher;