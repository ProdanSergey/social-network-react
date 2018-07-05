import React           from 'react';
import { inputClass }  from '../assets/inputsClassHendler';

class Input extends React.Component {

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onUpdate(event.target);
    }

    render(){
        const { 
            fieldName,
            fieldType,
            fieldValue,
            fieldHelp,
            helpText,
            required,
            defaultValue,
            form
        } = this.props
        if(fieldType === 'select') {
            return (
                <select 
                    name={fieldName}
                    className={inputClass(form[fieldName])}
                    onChange={this.handleChange}
                    defaultValue={defaultValue}>
                    <option disabled value={defaultValue}>{fieldValue}</option>
                    {this.props.options.map((item, i) => <option key={i} name={item.toLowerCase()}>{item}</option>)}
                </select>
            )
        }
        return(
            <div>
                <input 
                    type={fieldType}
                    required={required}
                    name={fieldName}
                    className={inputClass(form[fieldName])}
                    onChange={this.handleChange}
                    aria-describedby={fieldHelp} placeholder={fieldValue}/>
                <small id={fieldHelp} className={inputClass(form[fieldName], true)}>{helpText}</small>
            </div>
        )
    }
}

export default Input