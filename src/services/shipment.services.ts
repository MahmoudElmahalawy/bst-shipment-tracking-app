import axios from "axios";
import { setData, setLoading } from "@/redux/actions/shipment.actions";

export const getShipmentData = (): any => {
	return (dispatch: Function, getState: Function) => {
		dispatch(setLoading(true));

		axios
			.get(`https://tracking.bosta.co/shipments/track/67151313`)
			.then(({ data }) => {
				dispatch(setData(data));
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
};
