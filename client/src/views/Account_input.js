import React                 from 'react';
import { inputClass }        from '../assets/inputsClassHendler';

class AccountInput extends React.Component {

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { value, name, type } = event.target;
        this.props.onUpdate({event: 'change', value, name, type});
    }
    handleSubmit(event) {
        event.preventDefault();
        const target = document.querySelector(`input[name="${event.target.name}"]`);
        const { name, value } = target;
        if (value) this.props.onUpdate({event: 'submit', name, value});
    }

    render () {
        const { fieldName, placeholder, form } = this.props.passValue
        return (
            <div className="input-group mb-3">
                <input 
                    type="text"
                    name={fieldName}
                    className={inputClass(form[fieldName])}
                    placeholder={placeholder}
                    onChange={this.handleChange}/>
                <div className="input-group-append">
                    <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    name={fieldName}
                    onClick={this.handleSubmit}>
                    Send</button>
                </div>
            </div>
        )   
    }

}

export default AccountInput;