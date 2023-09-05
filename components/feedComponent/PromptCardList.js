import { useContext } from "react";
import PromptCard from "../PromptCard";
import { promptopiaContext } from "@utils/ContextProvider";

const PromptCardList = () => {
	const { filteredPosts, handleTagClick, handleOpenProfile } =
		useContext(promptopiaContext);
	return (
		<div className="mt-16 prompt_layout">
			{filteredPosts.map((prompt) => (
				<PromptCard
					key={prompt._id}
					card={prompt}
					handleTagClick={(e) => handleTagClick(e)}
					handleEdit={() => {}}
					handleDelete={() => {}}
					handleOpenProfile={handleOpenProfile}
				/>
			))}
		</div>
	);
};
export default PromptCardList;
