import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useTranslation from "next-translate/useTranslation";

type LayoutProps = {
	children: React.ReactElement | React.ReactElement[];
};

export default function Layout({ children }: LayoutProps) {
	const { lang } = useTranslation();

	return (
		<Container dir={lang === "ar" ? "rtl" : "ltr"}>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 6 }}>{children}</Box>
		</Container>
	);
}
