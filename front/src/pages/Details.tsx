import { Link } from "@tanstack/react-router"
import { useDetails } from "../hooks/useDetails"

const DetailsMovie = () => {
	const { movie, reviews, deleteMovie, deleteReview } = useDetails()

	if (!movie) {
		return <p>Loading movie details...</p>
	}

	return (
		<main>
			<h1>{movie.title}</h1>
			<p>
				<strong>Genre:</strong> {movie.genre}
			</p>
			<p>
				<strong>Year:</strong> {movie.year}
			</p>
			<p>
				<strong>Director:</strong> {movie.director}
			</p>
			<p>
				<strong>Rating:</strong> {movie.rating}
			</p>

			<h2>Actors</h2>
			<ul>
				{movie.actors.map((actor) => (
					<li key={actor.name + actor.lastname}>
						{actor.name} {actor.lastname} ({actor.age} years old)
					</li>
				))}
			</ul>

			<h2>Reviews</h2>
			<div>
				{/* Botón para agregar una nueva reseña */}
				<Link to={`/reviews/create?movieId=${movie.id}`}>
					<button>Add Review</button>
				</Link>
			</div>
			{reviews.length > 0 ? (
				<ul>
					{reviews.map((review) => (
						<li key={review.movieId}>
							<p>
								<strong>Reviewer:</strong> {review.reviewerName}
							</p>
							<p>
								<strong>Review:</strong> {review.review}
							</p>
							<p>
								<strong>Rating:</strong> {review.rating}
							</p>

							{/* Botón para editar la reseña */}
							<Link to={`/reviews/${review.movieId}/edit`}>
								<button>Edit Review</button>
							</Link>

							{/* Botón para eliminar la reseña */}
							<button onClick={() => deleteReview(review.movieId)}>Delete Review</button>
						</li>
					))}
				</ul>
			) : (
				<p>No reviews available for this movie.</p>
			)}

			{/* Botón para eliminar la película */}
			<button onClick={deleteMovie}>Delete Movie</button>
		</main>
	)
}

export default DetailsMovie
