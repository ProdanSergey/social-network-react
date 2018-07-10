import React           from 'react';
import { inputClass }  from '../assets/inputsClassHendler';
import Submit          from '../views/Submit'

class Input extends React.Component {

    componentDidMount() {
        if (this.props.inputOptions.autofocus) this.textInput.focus();
    }

    render(){
        const { 
            autofocus,
            required,
            button,
            fieldName,
            fieldType,
            fieldValue,
            fieldHelp,
            helpText,
            defaultValue,
            selectOptions = [],
            form,
            onUpdate
        } = this.props.inputOptions
        if(fieldType === 'select') {
            return (
                <select 
                    name={fieldName}
                    className={inputClass(form[fieldName])}
                    onChange={onUpdate}
                    defaultValue={defaultValue}>
                    <option disabled value={defaultValue}>{fieldValue}</option>
                    {selectOptions.map((item, i) => <option key={i} name={item.toLowerCase()}>{item}</option>)}
                </select>
            )
        }
        return(
            <div className={`input-wrapper ${button.buttonSide}`}>
                <Submit 
                    button={button}
                    onUpdate={onUpdate}
                />
                <div className="input-field">
                    <input
                        ref = {autofocus ? (input) => { this.textInput = input; } : false}
                        type={fieldType}
                        required={required}
                        name={fieldName}
                        className={inputClass(form[fieldName])}
                        onChange={onUpdate}
                        onBlur={onUpdate}
                        aria-describedby={fieldHelp} placeholder={fieldValue}/>
                    <small id={fieldHelp} className={inputClass(form[fieldName], true)}>{helpText}</small>
                </div>
            </div>
        )
    }
}

export default Input