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

const createData = (branch: string, date: string, time: string, details: string) => {
	return { branch, date, time, details };
};

const rows = [
	createData("مدينة نصر", "05/04/2020", "12:30 PM", "تم انشاء الشحنة"),
	createData("مدينة نصر", "05/04/2020", "12:30 PM", "تم استلام الشحنة من التاجر"),
	createData("مدينة نصر", "05/04/2020", "12:30 PM", "الشحنة خرجت للتسليم"),
	createData("مدينة نصر", "05/04/2020", "12:30 PM", "لم يتم تسليم الشحنة"),
];

export default function ShipmentDetailsTable() {
	const { t, lang } = useTranslation("home");

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
						{rows.map((row, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell>{row.branch}</StyledTableCell>
								<StyledTableCell>{row.date}</StyledTableCell>
								<StyledTableCell>{row.time}</StyledTableCell>
								<StyledTableCell>{row.details}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
