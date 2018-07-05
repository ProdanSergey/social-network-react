import { login }         from '../../actions/token-actions';
import { clearFormData } from '../../actions/form-actions'
import { isEmpty }       from '../utils/isEmpty'
import { push }          from 'connected-react-router';

export const getFetchResponse = (dispatch, getState, res) => {
    if(res.authorized) {
        dispatch(login(res.token));
        dispatch(push('/'));
    }
    const { form } = getState().formData
    if(!isEmpty(form)) {
        dispatch(clearFormData())
    }
    return res;
}