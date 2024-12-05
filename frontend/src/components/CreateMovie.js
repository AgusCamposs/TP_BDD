import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateMovie = () => {
    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        year: '',
        director: '',
        rating: '',
        actors: [{ name: '', lastname: '', age: '' }],
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie((prev) => ({ ...prev, [name]: value }));
    };

    const handleActorChange = (index, field, value) => {
        const updatedActors = [...movie.actors];
        updatedActors[index][field] = value;
        setMovie((prev) => ({ ...prev, actors: updatedActors }));
    };

    const addActor = () => {
        setMovie((prev) => ({
            ...prev,
            actors: [...prev.actors, { name: '', lastname: '', age: '' }],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/movies/create', movie)
            .then(() => navigate('/movies'))
            .catch((error) => console.error('Error saving movie:', error));
    };

    return (
        <div>
            <h1>Add Movie</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Genre:</label>
                    <input
                        type="text"
                        name="genre"
                        value={movie.genre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Year:</label>
                    <input
                        type="number"
                        name="year"
                        value={movie.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Director:</label>
                    <input
                        type="text"
                        name="director"
                        value={movie.director}
                        onChange={handleChange}
                        required
                    />
                </div>
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

                <h3>Actors:</h3>
                {movie.actors.map((actor, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={actor.name}
                            onChange={(e) =>
                                handleActorChange(index, 'name', e.target.value)
                            }
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={actor.lastname}
                            onChange={(e) =>
                                handleActorChange(index, 'lastname', e.target.value)
                            }
                            required
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            value={actor.age}
                            onChange={(e) =>
                                handleActorChange(index, 'age', e.target.value)
                            }
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addActor}>
                    Add Actor
                </button>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default CreateMovie;