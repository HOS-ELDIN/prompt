"use client";
import { useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import { promptopiaContext } from "@utils/ContextProvider";

const ProfilePage = ({ params }) => {
	const { status, profilePosts, setProfilePosts } =
		useContext(promptopiaContext);

	const searchParams = useSearchParams();
	const username = searchParams.get("name");
	const userId = params.id;

	useEffect(() => {
		// console.log("useeffect run");
		const fetchPosts = async () => {
			// console.log("fetch run");
			const response = await fetch(`/api/users/${userId}/posts`);
			const data = await response.json();

			setProfilePosts(data);
		};

		if (userId) fetchPosts();

		//eslint-disable-next-line
	}, [status]);

	return (
		<Profile
			name={username}
			desc={`welcome to ${username} personalized profile page`}
			data={profilePosts}
		/>
	);
};
export default ProfilePage;
