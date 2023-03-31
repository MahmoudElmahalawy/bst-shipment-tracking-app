import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTranslation from "next-translate/useTranslation";
import ProgressStepper from "./ProgressStepper";

type HeaderCellProps = {
	title: string;
	content: string;
};

const HeaderCell = (props: HeaderCellProps) => (
	<Grid item xs={12} lg={3}>
		<Typography component={"h3"} fontSize={"0.85rem"} sx={{ color: "#999", mb: 1 }}>
			{props.title}
		</Typography>
		<Typography component={"p"} fontWeight={700}>
			{props.content}
		</Typography>
	</Grid>
);

export default function ShipmentInfoHeader() {
	const { t, lang } = useTranslation("home");

	return (
		<Box
			dir={lang === "ar" ? "rtl" : "ltr"}
			sx={{ maxWidth: "1000px", width: "100%", border: "1px solid", borderColor: "#eee", borderRadius: 2 }}
		>
			<Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "#eee" }}>
				<Grid container>
					<HeaderCell title={t("shipment_no")} content={"تم الغاء الشحنة"} />
					<HeaderCell title={t("last_update")} content={"الاثنين"} />
					<HeaderCell title={t("seller_name")} content={"سوق.كوم"} />
					<HeaderCell title={t("delivery_date_in")} content={"3 يناير 2020"} />
				</Grid>
			</Box>
			<Box sx={{ p: 3 }}>
				<ProgressStepper />
			</Box>
		</Box>
	);
}
