import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#f40105",
		},
		secondary: {
			main: "#2f2e41",
		},
		text: {
			primary: "#252d48",
		},
		error: {
			main: "#de000a",
		},
		warning: {
			main: "#f9ba02",
		},
		info: {
			main: "#5c657c",
		},
		divider: "#eeeeee",
	},
	typography: {
		fontFamily: ["Cairo", "sans-serif"].join(","),
	},
});
