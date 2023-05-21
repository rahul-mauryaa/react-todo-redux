import { combineReducers } from "redux";
import { TodoReducer } from "./reducer/TodoReducer";
const rootReducer = combineReducers({
    TodoReducer: TodoReducer,
});

export default rootReducer;
