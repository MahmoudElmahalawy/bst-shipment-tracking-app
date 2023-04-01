import { ReduxAction } from "@/types/common";
import { ShipmentStore } from "@/types/shipment-tracking-info.types";
import { shipmentTypes } from "../types/shipment.types";

const initialState: ShipmentStore = {
	loading: false,
	data: null,
};

export const shipmentReducer = (state = initialState, action: ReduxAction) => {
	switch (action.type) {
		case shipmentTypes.SET_LOADING:
			return { ...state, loading: action.payload };
		case shipmentTypes.SET_DATA:
			return { ...state, data: action.payload };
		default:
			return state;
	}
};
