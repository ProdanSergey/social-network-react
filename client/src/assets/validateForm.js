export const validateForm = (options) => {
    const { data, asFormData } = options;
    let asForm = new FormData();
    let asObj = {};
    for (let field in data) {
        const { value, valid } = data[field]
        if(valid) {
            asFormData ? 
                asForm.append(field, value) :
                    asObj = {...asObj, [field]:value} 
        } else {
            return false;
        }
    }
    return asFormData ? asForm : asObj;
}