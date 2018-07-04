import React        from 'react';
import AccountInput from './Input';
import EditSwitcher from './EditSwitcher';
import {INPUT_TEXT_PLACEHOLDER } from '../../constants/global';

class EditableAccountInput extends React.Component {

    render() {
        const {
            fieldName,
            fieldType,
            fieldValue,
            form,
            switchers,
            onUpdate
        } = this.props
        return(
            switchers[fieldName] ?
                <AccountInput fieldName={fieldName} fieldType={fieldType} fieldValue={fieldValue} form={form} onUpdate={onUpdate}/> :
                <div className="data-field">{fieldValue || INPUT_TEXT_PLACEHOLDER}<EditSwitcher onUpdate={onUpdate} fieldName={fieldName}/></div>
        )
    }

}

export default EditableAccountInput;

