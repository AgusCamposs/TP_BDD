import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditMovie = () => {
    const [movie, setMovie] = useState({
        rating: '',
    });
    const { id } = useParams(); // Para obtener el ID de la película
    const navigate = useNavigate();

    // Cargar los datos de la película a editar
    useEffect(() => {
        axios.get(`http://localhost:8081/movies/${id}`)
            .then(response => setMovie(response.data))
            .catch(error => console.error('Error fetching movie:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8081/movies/updateRating/${id}`, movie)
            .then(() => navigate('/movies'))
            .catch((error) => console.error('Error updating movie:', error));
    };

    return (
        <div>
            <h1>Edit Movie Rating</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={movie.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditMovie;