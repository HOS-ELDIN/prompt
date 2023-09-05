'use client'
import { createContext, useState } from "react";

const promptopiaContext = createContext();

export function ContextProvider({ children }) {
	const [reFetch, setReFetch] = useState(false);
	return (
		<promptopiaContext.Provider value={{ reFetch, setReFetch }}>
			{children}
		</promptopiaContext.Provider>
	);
}

export { promptopiaContext };
