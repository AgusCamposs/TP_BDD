import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import CreateMovie from './components/CreateMovie';
import EditMovie from './components/EditMovie';
import ReviewForm from './components/ReviewForm';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MovieList />} /> 
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/create" element={<CreateMovie />} />
            <Route path="/movies/:id/edit" element={<EditMovie />} />
            <Route path="/movies/:id/details" element={<MovieDetails />} />
            <Route path="/reviews/create" element={<ReviewForm />} />
            <Route path="/reviews/:id/edit" element={<ReviewForm isEdit={true} />} />
        </Routes>
    );
};

export default App;