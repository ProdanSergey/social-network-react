import React        from 'react';
import AccountInput from './Input';

class EditableAccountInput extends React.Component {

    render() {
        const {
            fieldName,
            fieldType,
            fieldValue,
            formState,
            form,
            onUpdate
        } = this.props
        return(
            formState ?
                <AccountInput fieldName={fieldName} fieldType={fieldType} fieldValue={fieldValue} form={form} onUpdate={onUpdate}/> :
                <div className="data-field" hidden={fieldType === 'file'}>{fieldValue}</div>
        )
    }

}

export default EditableAccountInput;

