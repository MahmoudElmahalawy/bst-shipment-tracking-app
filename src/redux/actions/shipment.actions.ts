import { ReduxAction } from "@/types/common";
import { shipmentTypes } from "../types/shipment.types";

export const setLoading = (data: any): ReduxAction => {
	return {
		type: shipmentTypes.SET_LOADING,
		payload: data,
	};
};

export const setData = (data: any): ReduxAction => {
	return {
		type: shipmentTypes.SET_DATA,
		payload: data,
	};
};

export const setShipmentState = (data: "created" | "suspended" | "delivered"): ReduxAction => {
	return {
		type: shipmentTypes.SET_SHIPMENT_STATE,
		payload: data,
	};
};
