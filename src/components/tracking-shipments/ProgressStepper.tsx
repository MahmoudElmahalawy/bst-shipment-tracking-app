import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckIcon from "@mui/icons-material/Check";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import Typography from "@mui/material/Typography";
import useTranslation from "next-translate/useTranslation";
import { theme } from "@/styles/mui/theme";
import { ShipmentStore, TransitEventState } from "@/types/shipment-tracking-info.types";
import { useSelector } from "react-redux";

const StepperConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: theme.palette.primary.main,
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: theme.palette.primary.main,
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 6,
		border: 0,
		backgroundColor: "#eaeaf0",
		borderRadius: 1,
	},
}));

const StepIconRoot = styled("div")<{
	ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
	backgroundColor: "white",
	zIndex: 1,
	color: "#cfcfcf",
	width: 50,
	height: 50,
	display: "flex",
	borderRadius: "50%",
	justifyContent: "center",
	alignItems: "center",
	border: "1px solid",
	borderColor: "#cfcfcf",
	...(ownerState.active && {
		color: "white",
		backgroundColor: theme.palette.primary.main,
		border: "none",
	}),
	...(ownerState.completed && {
		color: "white",
		backgroundColor: theme.palette.primary.main,
		border: "none",
	}),
}));

function StepIcon(props: StepIconProps) {
	const { lang } = useTranslation();
	const { active, completed, className } = props;

	const icons: { [index: string]: React.ReactElement } = {
		1: <NoteAddIcon />,
		2: <InventoryIcon />,
		3: <LocalShippingIcon sx={{ ...(lang === "ar" ? { transform: "scaleX(-1)" } : {}) }} />,
		4: <BookmarkAddedIcon />,
	};

	return (
		<StepIconRoot ownerState={{ completed, active }} className={className}>
			{!completed ? icons[String(props.icon)] : <CheckIcon />}
		</StepIconRoot>
	);
}

export default function ProgressStepper() {
	const [currentStep, setCurrentStep] = React.useState(-1);
	const { t, lang } = useTranslation("tracking-shipments");

	const steps = [t("ticket_created"), t("package_received"), t("in_transit"), t("delivered")];

	const shipmentStore: ShipmentStore = useSelector((state: any) => state.shipmentReducer);

	const getCurrentStep = (state?: TransitEventState) => {
		if (!state) return -1;

		switch (state) {
			case "TICKET_CREATED":
				return 0;
			case "PACKAGE_RECEIVED":
			case "NOT_YET_SHIPPED":
			case "IN_TRANSIT":
			case "CANCELLED":
				return 1;
			case "OUT_FOR_DELIVERY":
			case "WAITING_FOR_CUSTOMER_ACTION":
				return 2;
			case "DELIVERED":
				return 3;
			default:
				break;
		}
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper
				alternativeLabel
				activeStep={shipmentStore.data ? getCurrentStep(shipmentStore.data?.CurrentStatus.state) : -1}
				connector={<StepperConnector />}
				dir={lang === "ar" ? "rtl" : "ltr"}
			>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel
							StepIconComponent={StepIcon}
							sx={{
								fontWeight: 700,
								"& .MuiStepLabel-label": { fontWeight: 700 },
								"& .Mui-completed, & .Mui-active": {
									fontWeight: 700,
									color: theme.palette.primary.main,
								},
							}}
							{...(getCurrentStep(shipmentStore.data?.CurrentStatus.state) === 2
								? {
										optional: (
											<Typography
												variant="caption"
												// color="error"
											>
												Alert message
											</Typography>
										),
								  }
								: null)}
							// error={true}
						>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
}
