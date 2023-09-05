"use client";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PromptCardList from "./PromptCardList";
import SearchForm from "./SearchForm";
import { promptopiaContext } from "@utils/ContextProvider";

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState(posts);
	const { data: session, status } = useSession();
	const router = useRouter();
	const { reFetch, setReFetch } = useContext(promptopiaContext);

	const handleSearchChange = (e) => {
		e.preventDefault();
		setSearchText(e.target.value);
	};

	const handleTagClick = (tag) => {
		setSearchText(tag);
	};

	const handleOpenProfile = (creator) => {
		if (session.user && creator._id) {
			session?.user.id === creator._id
				? router.push(`profile`)
				: router.push(`profile/${creator._id}?name=${creator.username}`);
		}
	};

	useEffect(() => {
		const fetchPosts = async () => {
			console.log("fetch runs");
			const response = await fetch("api/prompt");
			const data = await response.json();

			setPosts(data);
			setReFetch(false);
		};
		fetchPosts();
		//eslint-disable-next-line
	}, [reFetch]);

	useEffect(() => {
		// console.log("filter effect runs");
		const filterApply = posts.filter(
			(post) =>
				post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
				post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
				post.creator.username.toLowerCase().includes(searchText.toLowerCase())
		);
		// console.log(filterApply);
		setFilteredPosts(filterApply);
	}, [searchText, posts]);

	return (
		<section className="feed">
			<SearchForm
				searchText={searchText}
				handleSearchChange={handleSearchChange}
			/>
			{session?.user && (
				<PromptCardList
					data={filteredPosts}
					handleTagClick={(e) => handleTagClick(e)}
					handleOpenProfile={handleOpenProfile}
				/>
			)}
		</section>
	);
};
export default Feed;
