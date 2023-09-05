import "@styles/globals.css";
import { Inter } from "next/font/google";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
// import { useContext } from "react";
import { ContextProvider } from "@utils/ContextProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Promptopia",
	description: "Discover & Share Ai Prompts",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<ContextProvider>
						<main className="app">
							<Nav />
							{children}
						</main>
					</ContextProvider>
				</Provider>
			</body>
		</html>
	);
}
