import PromptCard from "../PromptCard";

const PromptCardList = ({ data, handleTagClick, handleOpenProfile }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((prompt) => (
				<PromptCard
					key={prompt._id}
					card={prompt}
					handleTagClick={handleTagClick}
					handleEdit={() => {}}
					handleDelete={() => {}}
					handleOpenProfile={handleOpenProfile}
				/>
			))}
		</div>
	);
};
export default PromptCardList;
