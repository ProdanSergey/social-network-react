export const isEmpty = (target) => {
    const flag = !!Object.keys(target).length;
    return !flag;
}