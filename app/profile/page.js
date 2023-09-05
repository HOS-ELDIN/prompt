"use client";
import { useEffect, useContext } from "react";
import Profile from "@components/Profile";
import { promptopiaContext } from "@utils/ContextProvider";

const ProfilePage = () => {
	const { session, status, router, profilePosts, setProfilePosts } =
		useContext(promptopiaContext);

	useEffect(() => {
		// console.log("useeffect run");
		const fetchPosts = async () => {
			// console.log("fetch run");
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setProfilePosts(data);
		};

		if (session?.user) fetchPosts();

		//eslint-disable-next-line
	}, [status]);

	const handleEdit = async (prompt) => {
		router.push(`update-prompt?id=${prompt._id}`);
	};

	const handleDelete = async (prompt) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${prompt._id.toString()}`, {
					method: "DELETE",
				});

				const filteredPosts = profilePosts.filter(
					(post) => post._id !== prompt._id
				);
				setProfilePosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<Profile
			name={"My"}
			desc={"welcome to your personalized profile page"}
			data={profilePosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};
export default ProfilePage;
