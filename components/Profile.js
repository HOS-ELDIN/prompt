import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
	return (
		<section className="w-full flex flex-col items-center">
			<h1 className="head_text text-left w-full">
				<span className="blue_gradient">{name} Profile</span>
			</h1>
			<p className="sesc text-left w-full">{desc}</p>
			<div className="mt-16 prompt_layout">
				{data.map((prompt) => (
					<PromptCard
						key={prompt._id}
						card={prompt}
						handleEdit={() => handleEdit && handleEdit(prompt)}
						handleDelete={() => handleDelete && handleDelete(prompt)}
					/>
				))}
			</div>
		</section>
	);
};
export default Profile;
