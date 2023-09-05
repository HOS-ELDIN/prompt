"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const promptopiaContext = createContext();

export function ContextProvider({ children }) {
	const [reFetch, setReFetch] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState(posts);
	const [profilePosts, setProfilePosts] = useState([]);

	const router = useRouter();

	const { data: session, status } = useSession();

	const handleSearchChange = (e) => {
		e.preventDefault();
		setSearchText(e.target.value);
	};

	const handleTagClick = (tag) => {
		setSearchText(tag);
	};

	const handleOpenProfile = (creator) => {
		if (session?.user && creator._id) {
			setProfilePosts([]);
			session?.user.id === creator._id
				? router.push(`profile`)
				: router.push(`profile/${creator._id}?name=${creator.username}`);
		}
	};

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

	useEffect(() => {
		const fetchPosts = async () => {
			console.log("fetch runs from context");
			const response = await fetch("api/prompt");
			const data = await response.json();

			setPosts(data);
			setReFetch(false);
		};
		fetchPosts();
	}, [reFetch]);

	return (
		<promptopiaContext.Provider
			value={{
				reFetch,
				setReFetch,
				searchText,
				setSearchText,
				posts,
				setPosts,
				filteredPosts,
				setFilteredPosts,
				handleSearchChange,
				handleTagClick,
				handleOpenProfile,
				session,
				status,
				router,
				profilePosts,
				setProfilePosts,
			}}
		>
			{children}
		</promptopiaContext.Provider>
	);
}

export { promptopiaContext };
