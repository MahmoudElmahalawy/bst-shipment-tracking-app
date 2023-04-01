import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as StateProvider } from "react-redux";
import { store } from "../redux/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/styles/mui/theme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import useTranslation from "next-translate/useTranslation";
import Navbar from "@/components/navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
	const { lang } = useTranslation();

	const cacheRtl = createCache({
		key: "muirtl",
		stylisPlugins: [prefixer, rtlPlugin],
	});

	const children = (
		<StateProvider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Navbar />
				<Component {...pageProps} />
			</ThemeProvider>
		</StateProvider>
	);

	const RtlLayout = (props: any) => <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;

	return lang === "ar" ? <RtlLayout>{children}</RtlLayout> : children;
}
