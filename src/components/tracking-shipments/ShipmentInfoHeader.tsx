import React from "react";
import { theme } from "@/styles/mui/theme";
import { ShipmentStore } from "@/types/shipment-tracking-info.types";
import { getFormattedDateTime } from "@/utils/general";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import ProgressStepper from "./ProgressStepper";

type HeaderCellProps = {
	title: string;
	content: string;
};

const HeaderCell = (props: HeaderCellProps) => (
	<Grid item xs={12} sm={6} lg={3} px={1}>
		<Typography component={"h3"} sx={{ color: "#999", fontSize: "0.85rem", mb: 1 }}>
			{props.title}
		</Typography>
		<Typography component={"p"} sx={{ fontWeight: 700, mb: { sm: 1, lg: "initial" } }}>
			{props.content}
		</Typography>
	</Grid>
);

export default function ShipmentInfoHeader() {
	const { t, lang } = useTranslation("tracking-shipments");

	const shipmentStore: ShipmentStore = useSelector((state: any) => state.shipmentReducer);

	return (
		<Box
			dir={lang === "ar" ? "rtl" : "ltr"}
			sx={{
				maxWidth: "1000px",
				width: "100%",
				border: "1px solid",
				borderColor: theme.palette.divider,
				borderRadius: 2,
			}}
		>
			{shipmentStore.data ? (
				<Box sx={{ p: 3, borderBottom: "1px solid", borderColor: theme.palette.divider }}>
					<Grid container>
						<HeaderCell
							title={`${t("shipment_no")} ${shipmentStore.data.TrackingNumber}`}
							content={"تم الغاء الشحنة"}
						/>
						<HeaderCell
							title={t("last_update")}
							content={
								getFormattedDateTime(
									shipmentStore.data.TransitEvents.slice(-1)?.[0]?.timestamp,
									lang === "ar" ? "ar-EG" : "en-EG"
								) || "-"
							}
						/>
						<HeaderCell title={t("seller_name")} content={shipmentStore.data.provider} />
						<HeaderCell
							title={t("delivery_date_in")}
							content={
								getFormattedDateTime(
									shipmentStore.data.PromisedDate,
									lang === "ar" ? "ar-EG" : "en-EG",
									true
								) || "-"
							}
						/>
					</Grid>
				</Box>
			) : null}
			<Box sx={{ py: 3 }}>
				<ProgressStepper />
			</Box>
		</Box>
	);
}
