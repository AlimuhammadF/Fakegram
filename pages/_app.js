import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import "../styles/nprogress.css";
import nProgress from "nprogress";
import Router from "next/router";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeComplete", nProgress.done);
Router.events.on("routeChangeError", nProgress.done);

function MyApp({ Component, pageProps }) {
	return (
		<AuthContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthContextProvider>
	);
}

export default MyApp;
