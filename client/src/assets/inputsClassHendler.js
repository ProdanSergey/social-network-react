const inputUntouched = "form-control";
const inputValid = "form-control is-valid";
const inputInvalid = "form-control is-invalid";

const helpHidden = "form-text text-muted d-none";
const helpVisible = "form-text text-muted";

export const inputClass = (state, helpTextFlag = false) => {
    if(state) {
        const { filled, valid } = state;
        if (filled) {
            if(helpTextFlag) {
                return valid ? helpHidden : helpVisible
            }
            return valid ? inputValid : inputInvalid
        } else {
            if(helpTextFlag) {
                return helpHidden
            }
            return inputUntouched
        }
    } else {
        if(helpTextFlag) {
            return helpHidden
        }
        return inputUntouched;
    }
}