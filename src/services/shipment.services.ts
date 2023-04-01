import axios from "axios";
import { setData, setLoading } from "@/redux/actions/shipment.actions";

export const getShipmentData = (shipmentId: string): any => {
	return (dispatch: Function, getState: Function) => {
		dispatch(setLoading(true));

		axios
			.get(`https://tracking.bosta.co/shipments/track/${shipmentId}`)
			.then(({ data }) => {
				dispatch(setData(data));
			})
			.catch((e) => {
				dispatch(setData(null));
				console.error(e);
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
};
