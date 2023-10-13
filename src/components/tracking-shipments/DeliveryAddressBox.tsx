import React from "react";
import useTranslation from "next-translate/useTranslation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { theme } from "@/styles/mui/theme";

export default function DeliveryAddressBox() {
	const { t, lang } = useTranslation("tracking-shipments");

	return (
		<Box dir={lang === "ar" ? "rtl" : "ltr"} sx={{ marginInlineStart: { lg: 2 } }}>
			<Typography component="h3" sx={{ my: 3 }}>
				{t("delivery_address")}
			</Typography>
			<Box
				sx={{
					backgroundColor: "#fafafa",
					px: 2,
					py: 4,
					border: "1px solid",
					borderColor: theme.palette.divider,
					borderRadius: 2,
				}}
			>
				<Typography component="p">{t("dummy_address")}</Typography>
			</Box>
		</Box>
	);
}
