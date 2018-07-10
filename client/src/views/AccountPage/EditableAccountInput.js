import React        from 'react';
import Input        from '../Input';
import EditSwitcher from '../EditSwitcher';

import * as constants from '../../constants/global';

class EditableAccountInput extends React.Component {

    render() {
        const {
            inputOptions,
            inputOptions: {
                fieldName,
                fieldValue,
                switchers,
            }
        } = this.props
        return(
            switchers[fieldName]
            ? <Input 
                inputOptions={inputOptions}/>
            : <div className="data-field">{fieldValue || constants.INPUT_TEXT_PLACEHOLDER}
              <EditSwitcher 
                inputOptions={inputOptions}/>
            </div>
        )
    }

}

export default EditableAccountInput;

