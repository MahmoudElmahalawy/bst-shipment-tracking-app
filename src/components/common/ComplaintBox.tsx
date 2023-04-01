import React from "react";
import useTranslation from "next-translate/useTranslation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import { theme } from "@/styles/mui/theme";

export default function ComplaintBox() {
	const { t, lang } = useTranslation("common");

	return (
		<Box dir={lang === "ar" ? "rtl" : "ltr"} sx={{ mt: 2, marginInlineStart: { lg: 2 } }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
					px: 2,
					py: 4,
					border: "1px solid",
					borderColor: theme.palette.divider,
					borderRadius: 2,
				}}
			>
				<Box sx={{ marginInlineEnd: 1.5 }}>
					<Image
						src="/static/images/illustrations/question-mark-illustration.svg"
						alt="Complaints illustration"
						width={100}
						height={60}
					/>
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
					<Typography component="div">{t("do_you_have_a_problem_with_shipment")}</Typography>
					<Button variant="contained" sx={{ boxShadow: "none", borderRadius: 3 }}>
						{t("submit_complaint")}
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
