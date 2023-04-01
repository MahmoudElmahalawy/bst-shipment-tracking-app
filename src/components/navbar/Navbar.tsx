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
import { theme } from "@/styles/mui/theme";

export default function Navbar() {
	const { lang } = useTranslation();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
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
							{lang === "ar" ? (
								<Button
									component="button"
									onClick={async () => await setLanguage("en")}
									sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
								>
									ENG
								</Button>
							) : (
								<Button
									component="button"
									onClick={async () => await setLanguage("ar")}
									sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
								>
									عربي
								</Button>
							)}
							<TrackShipmentDropdown />
						</Box>
						<Button color="inherit">
							<Image
								src={`./static/images/logos/logo-${lang === "ar" ? "ar" : "en"}.svg`}
								alt="Bosta's logo"
								width={120}
								height={36}
							></Image>
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}
