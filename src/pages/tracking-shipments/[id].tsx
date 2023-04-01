import React from "react";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import ComplaintBox from "@/components/common/ComplaintBox";
import DeliveryAddressBox from "@/components/tracking-shipments/DeliveryAddressBox";
import ShipmentDetailsTable from "@/components/tracking-shipments/ShipmentDetailsTable";
import ShipmentInfoHeader from "@/components/tracking-shipments/ShipmentInfoHeader";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function ShipmentInfoPage() {
	const router = useRouter();

	React.useEffect(() => {
		if (router.isReady) console.log(router.query);
	}, [router.isReady]);

	return (
		<>
			<Head>
				<title>Tracking Shipments</title>
			</Head>
			<Layout>
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
			</Layout>
		</>
	);
}
