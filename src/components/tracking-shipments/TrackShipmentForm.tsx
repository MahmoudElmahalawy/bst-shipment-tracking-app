import React from "react";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { theme } from "@/styles/mui/theme";

export default function TrackShipmentForm() {
	const [trackingNo, setTrackingNo] = React.useState<string>("");
	const { t, lang } = useTranslation("tracking-shipments");
	const router = useRouter();

	const SearchButton = () => (
		<InputAdornment position="end">
			<IconButton
				edge="end"
				onClick={() => trackingNo && router.push(`/tracking-shipments/${trackingNo}`)}
				sx={{
					color: "white",
					backgroundColor: theme.palette.primary.main,
					padding: 1.5,
					m: 0,
					borderRadius: "0 8px 8px 0",
					zIndex: 2,
					":hover": {
						backgroundColor: theme.palette.primary.main,
					},
				}}
			>
				<SearchIcon sx={{ fontSize: 30 }} />
			</IconButton>
		</InputAdornment>
	);

	return (
		<form>
			<FormControl sx={{ width: "35ch", my: 1.5 }} variant="outlined">
				<InputLabel htmlFor="track-input" color="error">
					{t("tracking_no")}
				</InputLabel>
				<OutlinedInput
					id="track-input"
					color="error"
					sx={{
						borderRadius: 2,
						paddingInlineEnd: 0,
					}}
					endAdornment={<SearchButton />}
					label="TrackingNo"
					onChange={(e) => setTrackingNo(e.target.value)}
				/>
			</FormControl>
		</form>
	);
}
