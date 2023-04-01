import { combineReducers } from "redux";
import { shipmentReducer } from "./shipment.reducer";

export const rootReducer = combineReducers({
	shipmentReducer,
});
