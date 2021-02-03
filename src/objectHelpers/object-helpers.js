export const updatesObjectInArray = (items, itemId, propObj, newObjProp) => {
    return items.map((u) => {
        if (u[propObj] === itemId)
            return {...u, ...newObjProp};
        return u;
    })
}