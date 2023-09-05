"use client";
import { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { promptopiaContext } from "@utils/ContextProvider";

import Form from "@components/Form";

const CreatePromptPage = () => {
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});
	const router = useRouter();
	const { data: session } = useSession();

	const { setReFetch } = useContext(promptopiaContext);

	const CreatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const response = await fetch("/api/prompt/new", {
				method: "POST",
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user.id,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				setReFetch(ture);
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Form
			type="create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={CreatePrompt}
		/>
	);
};
export default CreatePromptPage;
