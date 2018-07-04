const inputUntouched = "form-control";
const inputValid = "form-control is-valid";
const inputInvalid = "form-control is-invalid";

export const inputClass = (state) => {
    if(state) {
        const { filled, valid } = state;
        return filled ? valid ? inputValid : inputInvalid : inputUntouched;
    } else {
        return inputUntouched;
    }
}