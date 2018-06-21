export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("USER_TOKEN");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
        } 
    catch (err) {
        console.log(err)
    }
};

export const removeState = () => {
    try {
        localStorage.removeItem("USER_TOKEN");
    }
    catch (err) {
        console.log(err)
    }
}

export const saveState = (state) => {
    console.log(state)
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("USER_TOKEN", serializedState);
    } catch (err) {
        console.log(err)
    }
};