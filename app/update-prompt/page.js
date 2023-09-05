"use client";
import { useState, useEffect } from "react";
import {  useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePromptPage = () => {
	const [submitting, setSubmitting] = useState(false);
	const searchParams = useSearchParams();
	const promptId = searchParams.get("id");
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	const {
		setReFetch,
		router,
	} = useContext(promptopiaContext);

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();
			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};
		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) return alert("Prompt ID not found");

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});
			if (response.ok) {
				setReFetch(true);
				router.push("/profile");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};
export default UpdatePromptPage;
