import { promptopiaContext } from "@utils/ContextProvider";
import { useContext } from "react";

const SearchForm = () => {
	const {
		searchText,

		handleSearchChange,
	} = useContext(promptopiaContext);
	return (
		<form
			className="relative w-full flex-center"
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<input
				type="text"
				placeholder="Search for a tag or a user name"
				value={searchText}
				onChange={(e) => handleSearchChange(e)}
				required
				className="search_input peer"
			/>
		</form>
	);
};
export default SearchForm;
