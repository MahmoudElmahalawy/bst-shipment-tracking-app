import ShipmentInfoHeader from "@/components/tracking-shipments/ShipmentInfoHeader";
import Head from "next/head";
import Container from "@mui/material/Container";

export default function Home() {
	return (
		<>
			<Head>
				<title>Tracking Shipments</title>
				<meta name="description" content="Bosta shipment tracking app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 6 }}>
				<ShipmentInfoHeader />
			</Container>
		</>
	);
}
