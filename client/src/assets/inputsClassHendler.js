const untouched = "form-control";
const valid = "form-control is-valid";
const invalid = "form-control is-invalid";

export const inputClass = (state) => {
    if(state) {
        const { isFilled, isValid } = state;
        return isFilled ? isValid ? valid : invalid : untouched;
    } else {
        return untouched;
    }
}