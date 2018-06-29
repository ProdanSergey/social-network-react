import React from 'react';

export const createSelectItems = (from, to) => {
    let items = [];
    for(let i = from; i <= to; i++) {
      items.push(<option key={i} value={i}>{i}</option>)
    }
    return items;
}