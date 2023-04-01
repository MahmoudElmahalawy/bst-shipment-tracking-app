import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useTranslation from "next-translate/useTranslation";
import TrackShipmentForm from "../tracking-shipments/TrackShipmentForm";
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

export default function TrackShipmentDropdown() {
	const { t, lang } = useTranslation("tracking-shipments");
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
					<TrackShipmentForm />
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
