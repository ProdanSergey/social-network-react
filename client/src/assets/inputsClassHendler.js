const inputUntouched = "form-control";
const inputValid = "form-control is-valid";
const inputInvalid = "form-control is-invalid";

export const inputClass = (state) => {
    if(state) {
        const { filled, valid } = state;
        if (filled) {
            return valid ? inputValid : inputInvalid
        } else {
            return inputUntouched
        }
    } else {
        return inputUntouched;
    }
}