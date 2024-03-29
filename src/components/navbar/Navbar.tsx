import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Image from "next/image";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import TrackShipmentDropdown from "./TrackShipmentDropdown";
import { useRouter } from "next/router";
import { theme } from "@/styles/mui/theme";

const LanguageButton = (props: { lang: "ar" | "en" }) => (
	<Button
		component="button"
		onClick={async () => await setLanguage(props.lang)}
		sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
	>
		{props.lang === "ar" ? "عربي" : "ENG"}
	</Button>
);

export default function Navbar() {
	const { lang } = useTranslation();
	const router = useRouter();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed"
				sx={{
					backgroundColor: "white",
					boxShadow: "none",
					border: "1px solid",
					borderColor: theme.palette.divider,
				}}
			>
				<Container>
					<Toolbar>
						<Box sx={{ display: "flex", flexGrow: 1 }}>
							<LanguageButton lang={lang === "ar" ? "en" : "ar"} />
							<TrackShipmentDropdown />
						</Box>
						<Button color="inherit" onClick={() => router.push("/")}>
							<Image
								src={`/static/images/logos/logo-${lang === "ar" ? "ar" : "en"}.svg`}
								alt="Bosta's logo"
								width={120}
								height={36}
								priority
							></Image>
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
		</Box>
	);
}
