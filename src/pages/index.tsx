import Head from "next/head";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ShipmentInfoHeader from "@/components/tracking-shipments/ShipmentInfoHeader";
import ShipmentDetailsTable from "@/components/tracking-shipments/ShipmentDetailsTable";
import DeliveryAddressBox from "@/components/tracking-shipments/DeliveryAddressBox";

export default function Home() {
	return (
		<>
			<Head>
				<title>Tracking Shipments</title>
				<meta name="description" content="Bosta shipment tracking app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container dir="rtl">
				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 6 }}>
					<ShipmentInfoHeader />
					<Grid container maxWidth={1000}>
						<Grid item xs={12} lg={7}>
							<ShipmentDetailsTable />
						</Grid>
						<Grid item xs={12} lg={5}>
							<DeliveryAddressBox />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}
