import { login }            from '../../actions/token-actions';
import { clearFormData }    from '../../actions/form-actions';
import { isEmpty }          from '../utils/isEmpty';
import { push }    from 'connected-react-router';

export const getFetchResponse = (dispatch, getState, res) => {
    const { authorized, registered, token} = res
    const { form } = getState().formData
    if(authorized || registered) {
        dispatch(login(token));
        dispatch(push('/'));
    }
    if(!isEmpty(form)) {
        dispatch(clearFormData());
    }
    return res;
}