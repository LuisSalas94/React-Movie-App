import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import Searchbox from "./components/Searchbox";

function App() {
	//1.Display movies - create state for movies
	const [movies, setMovies] = useState([]);
	//5. Add search funcionality
	//6. searchValue state
	const [searchValue, setSearchValue] = useState("");
	//8. Favorites Movies state
	const [favorites, setFavorites] = useState([]);
	const [successBtn, setSucessBtn] = useState(false);
	const [deleteBtn, setDeleteBtn] = useState(false);

	//2. Display Movies in MovieList component hardcore
	//3. Display Movies in UI from API
	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c0594a42`;
		const response = await fetch(url);
		const responseJSON = await response.json();
		if (responseJSON.Search) {
			setMovies(responseJSON.Search);
		}
	};

	//4. useEffect to display
	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	//11. Retrieving from local storage
	useEffect(() => {
		const movieFavorites = JSON.parse(
			localStorage.getItem("react-movie-favorites")
		);
		setFavorites(movieFavorites);
	}, []);

	//10. Saving in local Storage
	const saveToLocalStorage = (items) => {
		localStorage.setItem("react-movie-favorites", JSON.stringify(items));
	};

	//7. Add to Favorite movie
	const addFavoriteMovie = (movie) => {
		const newFavoriteList = [...favorites, movie];
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
		setSucessBtn(true);
		setTimeout(() => {
			setSucessBtn(false);
		}, 1500);
	};

	//9. Remove movie from favorites
	const removeFavoritesMovie = (movie) => {
		const newFavoriteList = favorites.filter(
			(favorite) => favorite.imdbID !== movie.imdbID
		);
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
		setDeleteBtn(true);
		setTimeout(() => {
			setDeleteBtn(false);
		}, 1500);
	};

	const heart = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class="bi bi-heart-fill"
			viewBox="0 0 16 16"
		>
			<path
				fill-rule="evenodd"
				d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
			/>
		</svg>
	);

	const trash = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class="bi bi-trash"
			viewBox="0 0 16 16"
		>
			<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
			<path
				fill-rule="evenodd"
				d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
			/>
		</svg>
	);

	return (
		<div className="container container-style">
			<div className="row d-flex align-items-center  mt-4 mb-4">
				<MovieListHeading heading="Movies: #100DaysOfCode" />
				<Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className="row d-flex justify-content-center">
				<MovieList
					movies={movies}
					handleFavoritesClick={addFavoriteMovie}
					btnText="Add to favorites"
					btnColor="secondary"
					successBtn={successBtn}
					icon={heart}
				/>
			</div>
			<div className="row d-flex align-items-center mt-4 mb-4">
				<MovieListHeading heading="Favorites" />
				<div className="row d-flex justify-content-center">
					<MovieList
						movies={favorites}
						btnText="Remove from Favorites"
						handleFavoritesClick={removeFavoritesMovie}
						btnColor="danger"
						deleteBtn={deleteBtn}
						icon={trash}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
