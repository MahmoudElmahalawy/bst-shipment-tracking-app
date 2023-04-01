import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTranslation from "next-translate/useTranslation";
import { theme } from "@/styles/mui/theme";
import { ShipmentStore } from "@/types/shipment-tracking-info.types";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		color: "#8f9bb2",
		backgroundColor: "#fafafa",
		fontWeight: 700,
		borderBottom: "1px solid",
		borderColor: theme.palette.divider,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"& td, & th": {
		borderBottom: "1px solid",
		borderColor: theme.palette.divider,
	},
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

export default function ShipmentDetailsTable() {
	const { t, lang } = useTranslation("tracking-shipments");

	const shipmentStore: ShipmentStore = useSelector((state: any) => state.shipmentReducer);

	return (
		<Box dir={lang === "ar" ? "rtl" : "ltr"}>
			<Typography component="h3" sx={{ my: 3 }}>
				{t("shipment_details")}
			</Typography>
			<TableContainer
				component={Box}
				sx={{ border: "1px solid", borderColor: theme.palette.divider, borderRadius: 1 }}
			>
				<Table sx={{ width: "100%" }}>
					<TableHead>
						<TableRow>
							<StyledTableCell>{t("branch")}</StyledTableCell>
							<StyledTableCell>{t("date")}</StyledTableCell>
							<StyledTableCell>{t("time")}</StyledTableCell>
							<StyledTableCell>{t("details")}</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{shipmentStore.data?.TransitEvents.map((ev, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell>{ev?.hub || "-"}</StyledTableCell>
								<StyledTableCell sx={{ minWidth: 110 }}>{ev.timestamp.slice(0, 10)}</StyledTableCell>
								<StyledTableCell>{new Date(ev.timestamp).toLocaleTimeString()}</StyledTableCell>
								<StyledTableCell>{t(ev.state) || "-"}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
