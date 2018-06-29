import React                 from 'react';
import { validateInput }     from '../assets/validateInput';
import { inputClass }        from '../assets/inputsClassHendler';

class AccountInput extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            inputs: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }

    update = (event) => {
        event.preventDefault();
        const target = document.querySelector(`input[name="${event.target.name}"]`);
        const { name, value } = target;
        this.props.onUpdate(value);
    };

    handleChange(event) {
        const { value, name, type } = event.target;
            this.setState({inputs: {...this.state.inputs, 
                [name]: {
                    isFilled: !!value.length,
                    isValid: validateInput(type, value)
                }
            }
        });
    }

    render () {
        return (
            <div className="input-group mb-3">
                <input 
                    type="text"
                    name={this.props.passValue.fieldName}
                    className={inputClass(this.state.inputs[this.props.passValue.fieldName])}
                    placeholder={this.props.passValue.placeholder}
                    onChange={this.handleChange}/>
                <div className="input-group-append">
                    <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    name={this.props.passValue.fieldName}
                    onClick={this.update}>
                    Send</button>
                </div>
            </div>
        )   
    }

}

export default AccountInput;