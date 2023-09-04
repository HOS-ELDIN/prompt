"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
	const [posts, setPosts] = useState([]);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		// console.log("useeffect run");
		const fetchPosts = async () => {
			// console.log("fetch run");
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setPosts(data);
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

				const filteredPosts = posts.filter((post) => post._id !== prompt._id);
				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<Profile
			name={"My"}
			desc={"welcome to your personalized profile page"}
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};
export default ProfilePage;
