import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import ReduxThunk from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: [ReduxThunk],
});

export { store };
