import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);  // Estado para controlar si se cargaron las películas

    const fetchMovies = () => {
        axios.get('http://localhost:8081/movies/all')
            .then(response => {
                setMovies(response.data);
                setIsLoaded(true);  // Cambiar el estado cuando se carguen las películas
            })
            .catch(error => console.error('Error fetching movies:', error));
    };

    return (
        <div>
            <h1>Movies</h1>

            {/* Botón para agregar una nueva película */}
            <Link to="/movies/create">
                <button>Add Movie</button>
            </Link>

            {/* Botón para listar las películas */}
            <button onClick={fetchMovies}>List Movies</button>

            {/* Si las películas están cargadas, las mostramos */}
            {isLoaded && (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            {movie.title} ({movie.year}) - {movie.genre}

                            {/* Botón para ver los detalles */}
                            <Link to={`/movies/${movie.id}/details`}>
                                <button>View Details</button>
                            </Link>

                            {/* Botón para editar la película */}
                            <Link to={`/movies/${movie.id}/edit`}>
                                <button>Edit</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieList;