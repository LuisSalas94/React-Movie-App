import React from "react";

const Searchbox = ({ searchValue, setSearchValue }) => {
	return (
		<div className="col col-sm-4 mt-3">
			<input
				type="text"
				className="form-control input-style"
				placeholder="Type to search your movie"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</div>
	);
};

export default Searchbox;
