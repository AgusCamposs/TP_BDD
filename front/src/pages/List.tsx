import { Link } from "@tanstack/react-router"
import axios from "axios"
import { useState } from "react"
import { Movie } from "../types/movie"
import { Review } from "../types/review"
import {useDetails} from "../hooks/useDetails.ts";

const ListMovie = () => {
	const { deleteMovie, deleteReview } = useDetails()
	const [movies, setMovies] = useState<Movie[]>([])
	const [reviews, setReviews] = useState<Review[]>([])
	const [isLoaded, setIsLoaded] = useState(false) // Estado para controlar si se cargaron las películas

	const fetchMovies = () => {
		axios
			.get("http://localhost:8081/movies/all")
			.then((response) => {
				setMovies(response.data)
				setIsLoaded(true) // Cambiar el estado cuando se carguen las películas
			})
			.catch((error) => console.error("Error fetching movies:", error))
	}
	const fetchReviews = () => {
		axios
			.get("http://localhost:8081/reviews/all")
			.then((response) => {
				setReviews(response.data)
				setIsLoaded(true) // Cambiar el estado cuando se carguen las reviews
			})
			.catch((error) => console.error("Error fetching reviews:", error))
	}

	return (
		<main>
			<h1>Movies</h1>
			{/* Botón para listar las películas */}
			<button onClick={fetchMovies}>List Movies</button>

			{/* Si las películas están cargadas, las mostramos */}
			{isLoaded && (
				<ul>
					{movies.map(movie => (
						<li key={movie.id}>
							<strong>Título:</strong> {movie.title} (<strong>Año:</strong> {movie.year}) -
							<strong>Género:</strong> {movie.genre} <strong>Rating:</strong> {movie.rating}

							<Link to={`/movies/${movie.id}/edit`}>
								<button>Edit</button>
							</Link>

							{/* Lista de actores */}
							{movie.actors.length > 0 ? (
								<ul>
									{movie.actors.map(actor => (
										<li key={actor.name + actor.lastname}>
											<strong>Nombre:</strong> {actor.name}
											<strong>Apellido:</strong> {actor.lastname}
											(<strong>Edad:</strong> {actor.age})
										</li>
									))}
								</ul>
							) : (
								<p>No hay actores listados.</p>
							)}
							{/* Botón para eliminar la película */}
							<button onClick={deleteMovie}>Delete Movie</button>
						</li>
					))}
				</ul>

			)}
			<h1>Reviews</h1>
			<button onClick={fetchReviews}>List Reviews</button>
			{isLoaded && (
				<ul>
					{reviews.map(review => (
						<li key={review.id}>
							<strong>Pelicula: </strong>{review.movie} <strong>Nombre
							Reviewer: </strong> {review.reviewerName}
							<strong>Rating:</strong> {review.rating} <strong>Review: </strong> {review.review}
							<Link to={`/reviews/${review.id}/edit`}>
								<button>Edit</button>
							</Link>
							<button onClick={() => deleteReview(review.id)}>Delete Review</button>
						</li>
					))}
				</ul>
			)}
		</main>
	)
}

export default ListMovie
