import { login }            from '../../actions/token-actions';
import { clearFormData }    from '../../actions/form-actions';
import { fetchShowMessage } from '../../actions/user-actions';
import { isEmpty }          from '../utils/isEmpty';
// import { push }             from 'connected-react-router';

export const getFetchResponse = (dispatch, getState, res) => {
    const { authorized, registered, token} = res
    const { form } = getState().formData
    if(registered) {
        dispatch(fetchShowMessage());
    }
    if(authorized || registered) {
        dispatch(login(token));
    }
    if(!isEmpty(form)) {
        dispatch(clearFormData())
    }
    return res;
}