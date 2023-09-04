"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = ({ params }) => {
	const [posts, setPosts] = useState([]);
	const { data: session, status } = useSession();

	const router = useRouter();

	const searchParams = useSearchParams();
	const username = searchParams.get("name");
	const userId = params.id;

	useEffect(() => {
		// console.log("useeffect run");
		const fetchPosts = async () => {
			// console.log("fetch run");
			const response = await fetch(`/api/users/${userId}/posts`);
			const data = await response.json();

			setPosts(data);
		};

		if (userId) fetchPosts();

		//eslint-disable-next-line
	}, [status]);

	// const handleEdit = async (prompt) => {
	// 	// router.push(`update-prompt?id=${prompt._id}`);
	// };

	// const handleDelete = async (prompt) => {
	// 	const hasConfirmed = confirm(
	// 		"Are you sure you want to delete this prompt?"
	// 	);

	// 	if (hasConfirmed) {
	// 		try {
	// 			await fetch(`/api/prompt/${prompt._id.toString()}`, {
	// 				method: "DELETE",
	// 			});

	// 			const filteredPosts = posts.filter((post) => post._id !== prompt._id);
	// 			setPosts(filteredPosts);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// };

	return (
		<Profile
			name={username}
			desc={`welcome to ${username} personalized profile page`}
			data={posts}
		/>
	);
};
export default ProfilePage;
