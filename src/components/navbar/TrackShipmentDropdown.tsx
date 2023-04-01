import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useTranslation from "next-translate/useTranslation";
import { theme } from "@/styles/mui/theme";

interface ExtendedTooltipProps extends TooltipProps {
	open: boolean;
	handleTooltipClose: any;
}

const TrackingFormTooltip = styled(({ open, handleTooltipClose, className, ...props }: ExtendedTooltipProps) => {
	return (
		<ClickAwayListener onClickAway={handleTooltipClose}>
			<div>
				<Tooltip
					placement="bottom-start"
					PopperProps={{
						disablePortal: true,
					}}
					onClose={handleTooltipClose}
					disableFocusListener
					disableHoverListener
					disableTouchListener
					{...props}
					open={open}
					classes={{ popper: className }}
				/>
			</div>
		</ClickAwayListener>
	);
})(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		mt: { xs: 0, md: 10 },
		backgroundColor: "white",
		maxWidth: 350,
		fontSize: theme.typography.pxToRem(12),
		border: "1px solid",
		borderColor: theme.palette.divider,
		borderRadius: "0 0 6px 6px",
	},
}));

const TrackingForm = () => {
	const { t, lang } = useTranslation("home");

	const SearchButton = () => (
		<InputAdornment position="end">
			<IconButton
				edge="end"
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
					label="Password"
				/>
			</FormControl>
		</form>
	);
};

export default function TrackShipmentDropdown() {
	const { t, lang } = useTranslation("home");
	const [open, setOpen] = React.useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};
	const handleTooltipOpen = () => {
		setOpen(true);
	};

	return (
		<TrackingFormTooltip
			open={open}
			handleTooltipClose={handleTooltipClose}
			title={
				<Box sx={{ px: 2, py: 1 }} dir={lang === "ar" ? "rtl" : "ltr"}>
					<Typography sx={{ color: theme.palette.secondary.main }}>{t("track_shipment")}</Typography>
					<TrackingForm />
				</Box>
			}
			dir={lang === "ar" ? "rtl" : "ltr"}
		>
			<Button
				onClick={handleTooltipOpen}
				sx={{
					color: theme.palette.secondary.main,
					border: "1px solid",
					borderColor: "transparent",
					fontWeight: 700,
					px: 2,
					pt: 1,
					mx: { xs: "initial", md: 5 },
					...(open
						? {
								color: theme.palette.primary.main,
								bgcolor: "white",
								borderColor: theme.palette.divider,
								borderBottom: "none",
								borderRadius: "6px 6px 0 0",
						  }
						: {}),
				}}
			>
				{t("track_shipment")}{" "}
				{lang === "ar" ? (
					<ArrowBackIosIcon sx={{ fontSize: 10 }} />
				) : (
					<ArrowForwardIosIcon sx={{ fontSize: 10 }} />
				)}
			</Button>
		</TrackingFormTooltip>
	);
}
