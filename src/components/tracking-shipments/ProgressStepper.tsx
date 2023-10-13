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
import { ShipmentStore, TransitEvent } from "@/types/shipment-tracking-info.types";
import { useDispatch, useSelector } from "react-redux";
import { setShipmentState } from "@/redux/actions/shipment.actions";

const StepperConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 6,
		border: 0,
		backgroundColor: "#eaeaf0",
		borderRadius: 1,
		[theme.breakpoints.down("md")]: {
			transform: "scaleX(1.35)",
		},
		[theme.breakpoints.up("md")]: {
			transform: "scaleX(1.15)",
		},
	},
}));

const ColoredStepperConnector = ({ shipmentState = "created" }: { shipmentState?: keyof typeof COLOR }) => {
	const COLOR = {
		created: theme.palette.primary.main,
		suspended: theme.palette.warning.main,
		delivered: theme.palette.success.main,
	};

	return (
		<StepperConnector
			sx={{
				[`&.${stepConnectorClasses.active}`]: {
					[`& .${stepConnectorClasses.line}`]: {
						backgroundColor: COLOR[shipmentState],
					},
				},
				[`&.${stepConnectorClasses.completed}`]: {
					[`& .${stepConnectorClasses.line}`]: {
						backgroundColor: COLOR[shipmentState],
					},
				},
			}}
		/>
	);
};

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
		border: "none",
	}),
	...(ownerState.completed && {
		color: "white",
		border: "none",
		transform: "scale(0.45)",
	}),
}));

function ColoredStepIcon(props: StepIconProps) {
	const { lang } = useTranslation();
	const { active, completed, className } = props;

	const shipmentStore: ShipmentStore = useSelector((state: any) => state.shipmentReducer);

	const icons: { [index: string]: React.ReactElement } = {
		1: <NoteAddIcon />,
		2: <InventoryIcon />,
		3: <LocalShippingIcon sx={{ ...(lang === "ar" ? { transform: "scaleX(-1)" } : {}) }} />,
		4: <BookmarkAddedIcon />,
	};

	return (
		<StepIconRoot
			ownerState={{ completed, active }}
			className={className}
			sx={{
				...(active || completed
					? {
							backgroundColor:
								shipmentStore.state === "delivered"
									? theme.palette.success.main
									: shipmentStore.state === "suspended"
									? theme.palette.warning.main
									: theme.palette.primary.main,
					  }
					: {}),
			}}
		>
			{!completed ? icons[String(props.icon)] : <CheckIcon fontSize="large" />}
		</StepIconRoot>
	);
}

export default function ProgressStepper() {
	const { t, lang } = useTranslation("tracking-shipments");
	const dispatch = useDispatch();
	const [currentStep, setCurrentStep] = React.useState<{ number: number; reason: null | string }>({
		number: -1,
		reason: null,
	});

	const steps = [t("ticket_created"), t("package_received"), t("in_transit"), t("delivered")];

	const shipmentStore: ShipmentStore = useSelector((state: any) => state.shipmentReducer);

	const updateCurrentStep = (transitEvents?: TransitEvent[]) => {
		let step: number = 0;
		let reason: null | string = null;
		transitEvents?.forEach((e) => {
			if (e.state === "PACKAGE_RECEIVED" && step < 1) step = 1;
			if (e.state === "IN_TRANSIT" && step < 2) step = 2;
			if (e.state === "DELIVERED") step = 4;

			if (e.reason) reason = e.reason;
		});
		if (step < 4 && reason) {
			setCurrentStep((prevState) => ({ ...prevState, reason }));
			dispatch(setShipmentState("suspended"));
		} else if (step >= 4) {
			setCurrentStep((prevState) => ({ ...prevState, reason: null }));
			dispatch(setShipmentState("delivered"));
		}
		setCurrentStep((prevState) => ({ ...prevState, number: step }));
	};

	React.useEffect(() => {
		updateCurrentStep(shipmentStore.data?.TransitEvents);
	}, [shipmentStore.data]);

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper
				alternativeLabel
				activeStep={currentStep.number}
				connector={<ColoredStepperConnector shipmentState={shipmentStore.state} />}
				dir={lang === "ar" ? "rtl" : "ltr"}
			>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel
							StepIconComponent={ColoredStepIcon}
							sx={{
								fontWeight: 700,
								"& .MuiStepLabel-label": { fontWeight: 700 },
								"& .Mui-completed, & .Mui-active": {
									fontWeight: 700,
									color: theme.palette.primary.main,
								},
							}}
						>
							{label}
							{index === 2 && currentStep.reason && (
								<Typography
									sx={{
										position: "absolute",
										width: "100%",
										left: "50%",
										transform: "translateX(-50%)",
										fontSize: 12,
										color: theme.palette.warning.main,
									}}
								>
									{currentStep.reason}
								</Typography>
							)}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
}
