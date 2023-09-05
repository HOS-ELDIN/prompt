"use client";
import PromptCardList from "./PromptCardList";
import { useContext } from "react";
import SearchForm from "./SearchForm";
import { promptopiaContext } from "@utils/ContextProvider";

const Feed = () => {
	const { session } = useContext(promptopiaContext);

	//eslint-disable-next-line

	return (
		<section className="feed">
			<SearchForm />
			{session?.user && <PromptCardList />}
		</section>
	);
};
export default Feed;
