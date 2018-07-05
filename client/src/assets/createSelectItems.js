export const createSelectItems = (from, to) => {
    let items = [];
    for(let i = from; i <= to; i++) {
      items.push(i.toString())
    }
    return items;
}