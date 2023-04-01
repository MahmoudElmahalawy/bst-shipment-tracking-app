import Head from "next/head";
import Box from "@mui/material/Box";
import TrackShipmentForm from "@/components/tracking-shipments/TrackShipmentForm";
import Typography from "@mui/material/Typography";
import Layout from "@/components/Layout";
import useTranslation from "next-translate/useTranslation";

export default function Home() {
	const { t } = useTranslation("home");

	return (
		<>
			<Head>
				<title>Bosta</title>
				<meta name="description" content="Bosta shipment tracking app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<Box>
					<Typography component="h2" align="center" sx={{ fontSize: 25, fontWeight: 700, mb: 2 }}>
						{t("track_your_shipment")}
					</Typography>
					<TrackShipmentForm />
				</Box>
			</Layout>
		</>
	);
}
