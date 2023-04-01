import React from "react";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Layout from "@/components/Layout";
import ComplaintBox from "@/components/common/ComplaintBox";
import DeliveryAddressBox from "@/components/tracking-shipments/DeliveryAddressBox";
import ShipmentDetailsTable from "@/components/tracking-shipments/ShipmentDetailsTable";
import ShipmentInfoHeader from "@/components/tracking-shipments/ShipmentInfoHeader";
import { useRouter } from "next/router";
import { ShipmentStore } from "@/types/shipment-tracking-info.types";
import { useDispatch, useSelector } from "react-redux";
import { getShipmentData } from "@/services/shipment.services";

export default function ShipmentInfoPage() {
	const router = useRouter();
	const dispatch = useDispatch();

	const shipmentStore: ShipmentStore = useSelector((state: any) => state.shipmentReducer);

	React.useEffect(() => {
		if (router.isReady) {
			if (typeof router.query.id === "string") {
				dispatch(getShipmentData(router.query.id));
			}
		}
	}, [router.isReady, router.query.id]);

	return (
		<>
			<Head>
				<title>Tracking Shipments</title>
			</Head>
			<Layout>
				<>
					{shipmentStore.loading ? (
						<CircularProgress />
					) : shipmentStore.data ? (
						<>
							<ShipmentInfoHeader />
							<Grid container maxWidth={1000}>
								<Grid item xs={12} lg={7}>
									<ShipmentDetailsTable />
								</Grid>
								<Grid item xs={12} lg={5}>
									<DeliveryAddressBox />
									<ComplaintBox />
								</Grid>
							</Grid>
						</>
					) : shipmentStore.loading ? null : (
						<span>No data</span>
					)}
				</>
			</Layout>
		</>
	);
}
