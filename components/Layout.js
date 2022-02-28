import Head from "next/head";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Header from "./Header";
import InitialLoading from "./InitialLoading";

export default function Layout({ children }) {
	const { initialLoading } = useContext(AuthContext);

	return (
		<div>
			<Head>
				<title>Fakegram</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/F.png" />
			</Head>
			<main className="font bg-bgColor min-h-screen overflow-x-hidden">
				{initialLoading ? (
					<InitialLoading />
				) : (
					<>
						<Header />
						{children}
					</>
				)}
			</main>
		</div>
	);
}
