import ProgressStepper from "@/components/tracking-shipments/ProgressStepper";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import setLanguage from "next-translate/setLanguage";

export default function Home() {
	return (
		<>
			<Head>
				<title>Tracking Shipments</title>
				<meta name="description" content="Bosta shipment tracking app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<button onClick={async () => await setLanguage("ar")}>AR</button>
				<button onClick={async () => await setLanguage("en")}>EN</button>
				<ProgressStepper />
			</main>
		</>
	);
}
