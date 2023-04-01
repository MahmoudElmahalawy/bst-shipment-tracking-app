import thunk, { ThunkMiddleware } from "redux-thunk";
import { rootReducer } from "../reducers/root.reducer";
import { createStore, applyMiddleware } from "redux";

const middleware: Array<ThunkMiddleware> = [thunk];

const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

export { store, middleware };
