export const reloadReducer = (state = false, action) => {
    if (action.type === "SET_RELOAD") {
        return !state;
    }
    return state;
}