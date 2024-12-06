import { useNavigate, useParams } from "@tanstack/react-router"
import axios from "axios"
import { useState, useEffect } from "react"
import { Movie } from "../types/movie"
import { Review } from "../types/review"

export const useDetails = () => {
	const id = useParams({ from: "/movies_/$id/details", select: (params) => params.id }) // Para obtener el ID de la película
	const navigate = useNavigate()
	const [movie, setMovie] = useState<Movie | null>(null)
	const [reviews, setReviews] = useState<Review[]>([])

	useEffect(() => {
		// Fetch de los datos de la película
		axios
			.get<Movie>(`http://localhost:8081/movies/${id}`)
			.then((response) => setMovie(response.data))
			.catch((error) => console.error("Error fetching movie details:", error))
	}, [id])

	const deleteMovie = () => {
		if (window.confirm("Are you sure you want to delete this movie?")) {
			axios
				.delete(`http://localhost:8081/movies/delete/${id}`)
				.then(() => {
					alert("Movie deleted successfully!")
					navigate({ to: "/" }) // Redirige a la lista de películas
				})
				.catch((error) => console.error("Error deleting movie:", error))
		}
	}

	const deleteReview = (reviewId: string) => {
		if (window.confirm("Are you sure you want to delete this review?")) {
			axios
				.delete(`http://localhost:8081/reviews/delete/${reviewId}`)
				.then(() => {
					alert("Review deleted successfully!")
					setReviews(reviews.filter((review) => review.id !== reviewId)) // Actualiza la lista local
				})
				.catch((error) => console.error("Error deleting review:", error))
		}
	}

	return { movie, reviews, deleteMovie, deleteReview }
}
