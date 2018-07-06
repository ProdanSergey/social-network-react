export const parseUploadFile = file => {
    return new Promise((resolve) => {
        let fr = new FileReader();
        fr.readAsDataURL(file)
        fr.onloadend = resolve;
    })
}