		const fetchPosts = async () => {
			// console.log("fetch runs");
			const response = await fetch("https://promptopia-hos.vercel.app/api/prompt");
			const data = await response.json();

			console.log(data)
		};
		fetchPosts();