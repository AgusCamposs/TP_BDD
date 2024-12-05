import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
    const { id } = useParams(); // Obtiene el ID de la película desde la URL
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch de los datos de la película
        axios.get(`http://localhost:8081/movies/${id}`)
            .then(response => setMovie(response.data))
            .catch(error => console.error('Error fetching movie details:', error));

        // Fetch de las reseñas asociadas a la película
        axios.get(`http://localhost:8081/reviews/all`)
            .then(response => {
                const movieReviews = response.data.filter(review => review.movie === id);
                setReviews(movieReviews);
            })
            .catch(error => console.error('Error fetching reviews:', error));
    }, [id]);

    const deleteMovie = () => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            axios.delete(`http://localhost:8081/movies/delete/${id}`)
                .then(() => {
                    alert('Movie deleted successfully!');
                    navigate('/'); // Redirige a la lista de películas
                })
                .catch(error => console.error('Error deleting movie:', error));
        }
    };

    const deleteReview = (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            axios.delete(`http://localhost:8081/reviews/delete/${reviewId}`)
                .then(() => {
                    alert('Review deleted successfully!');
                    setReviews(reviews.filter(review => review.id !== reviewId)); // Actualiza la lista local
                })
                .catch(error => console.error('Error deleting review:', error));
        }
    };

    if (!movie) {
        return <p>Loading movie details...</p>;
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            
            <h2>Actors</h2>
            <ul>
                {movie.actors.map(actor => (
                    <li key={actor.id}>{actor.name} {actor.lastname} ({actor.age} years old)</li>
                ))}
            </ul>

            <h2>Reviews</h2>
            <div>
                {/* Botón para agregar una nueva reseña */}
                <Link to={`/reviews/create?movieId=${id}`}>
                    <button>Add Review</button>
                </Link>
            </div>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <p><strong>Reviewer:</strong> {review.reviewerName}</p>
                            <p><strong>Review:</strong> {review.review}</p>
                            <p><strong>Rating:</strong> {review.rating}</p>
                            
                            {/* Botón para editar la reseña */}
                            <Link to={`/reviews/${review.id}/edit`}>
                                <button>Edit Review</button>
                            </Link>
                            
                            {/* Botón para eliminar la reseña */}
                            <button onClick={() => deleteReview(review.id)}>Delete Review</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews available for this movie.</p>
            )}

            {/* Botón para eliminar la película */}
            <button onClick={deleteMovie}>Delete Movie</button>
        </div>
    );
};

export default MovieDetails;