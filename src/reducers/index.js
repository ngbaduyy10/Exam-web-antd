import { combineReducers } from "redux";
import { reloadReducer } from "./reloadReducer";

const allReducers = combineReducers({
    reloadReducer,
});

export default allReducers;