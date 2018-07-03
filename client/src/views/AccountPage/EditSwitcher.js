import React from 'react';

class EditSwitcher extends React.Component {

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onSwitch(event);
    }

    render() {
        return(
            <div className="btn-group-toggle read-only-toggler" data-toggle="buttons">
                <label className="btn btn-secondary active">
                    Edit
                    <input 
                    id="edit" 
                    onChange={this.handleChange}
                    type="checkbox"/>
                </label>
            </div>
        )
    }
}

export default EditSwitcher;