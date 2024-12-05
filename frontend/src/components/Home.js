import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Movie App</h1>

            {/* Botón para agregar una nueva película */}
            <Link to="/movies/create">
                <button>Add Movie</button>
            </Link>

            {/* Botón para listar las películas */}
            <Link to="/movies">
                <button>List Movies</button>
            </Link>
        </div>
    );
};

export default Home;