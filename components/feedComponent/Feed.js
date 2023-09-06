"use client";
import PromptCardList from "./PromptCardList";
import { useContext, useEffect } from "react";
import SearchForm from "./SearchForm";
import { promptopiaContext } from "@utils/ContextProvider";

const Feed = () => {
	const { session, setPosts, setReFetch, reFetch } =
		useContext(promptopiaContext);

	useEffect(() => {
		const fetchPosts = async () => {
			console.log("fetch runs from feed");
			const response = await fetch("api/prompt", { cache: "no-store" });

			const data = await response.json();

			setPosts(data);
			setReFetch(false);
		};
		fetchPosts();
		//eslint-disable-next-line
	}, [reFetch]);

	return (
		<section className="feed">
			<SearchForm />
			{session?.user && <PromptCardList />}
		</section>
	);
};
export default Feed;
