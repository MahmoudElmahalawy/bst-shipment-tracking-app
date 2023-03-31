import React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckIcon from "@mui/icons-material/Check";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SaveIcon from "@mui/icons-material/Save";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import Typography from "@mui/material/Typography";

import useTranslation from "next-translate/useTranslation";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: "red",
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: "red",
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 6,
		border: 0,
		backgroundColor: "#eaeaf0",
		borderRadius: 1,
	},
}));

const ColorlibStepIconRoot = styled("div")<{
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
		backgroundColor: "red",
		border: "none",
	}),
	...(ownerState.completed && {
		color: "white",
		backgroundColor: "red",
		border: "none",
	}),
}));

function ColorlibStepIcon(props: StepIconProps) {
	const { t, lang } = useTranslation("home");
	const { active, completed, className } = props;

	const icons: { [index: string]: React.ReactElement } = {
		1: <NoteAddIcon />,
		2: <InventoryIcon />,
		3: <LocalShippingIcon sx={{ ...(lang === "ar" ? { transform: "scaleX(-1)" } : {}) }} />,
		4: <SaveIcon />,
	};

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
			{!completed ? icons[String(props.icon)] : <CheckIcon />}
		</ColorlibStepIconRoot>
	);
}

export default function CustomizedSteppers() {
	const { t, lang } = useTranslation("home");

	const steps = [t("ticket_created"), t("package_received"), t("in_transit"), t("delivered")];

	// React.useEffect(() => console.log({ lang }), [lang]);

	return (
		<Stack sx={{ width: "100%" }} spacing={4}>
			<Stepper
				alternativeLabel
				activeStep={1}
				connector={<ColorlibConnector />}
				dir={lang === "ar" ? "rtl" : "ltr"}
			>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel
							StepIconComponent={ColorlibStepIcon}
							sx={{
								fontWeight: 700,
								"& .MuiStepLabel-label": { fontWeight: 700 },
								"& .Mui-completed, & .Mui-active": { fontWeight: 700, color: "#222b46" },
							}}
							optional={
								<Typography variant="caption" color="error">
									Alert message
								</Typography>
							}
							// error={true}
						>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Stack>
	);
}
