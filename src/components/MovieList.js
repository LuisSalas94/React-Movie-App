import React from "react";
import DeleteMessage from "./DeleteMessage";
import SuccesMesaje from "./SuccessMessaje";

const MovieList = ({
	movies,
	handleFavoritesClick,
	btnText,
	btnColor,
	successBtn,
	deleteBtn,
	icon,
}) => {
	return (
		<>
			{successBtn && <SuccesMesaje />}
			{deleteBtn && <DeleteMessage />}
			{movies.map((movie) => (
				<div className="card card-style " style={{ width: "18rem" }}>
					<img className="card-img-top" src={movie.Poster} alt={movie.Title} />
					<div className="card-body">
						<p className="card-text card-title">
							<span>Movie Title:</span> {movie.Title}
						</p>
						<p className="card-text">
							<span>Year of Release:</span> {movie.Year}
						</p>
						<button
							className={`btn btn-${btnColor}`}
							onClick={() => handleFavoritesClick(movie)}
						>
							{btnText} {icon}
						</button>
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
