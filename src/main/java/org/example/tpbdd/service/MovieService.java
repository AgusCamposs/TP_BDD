package org.example.tpbdd.service;

import org.example.tpbdd.dto.MovieRequest;
import org.example.tpbdd.dto.UpdateRatingRequest;
import org.example.tpbdd.model.Movie;

import java.util.List;

public interface MovieService {
    void createMovie(MovieRequest movieRequest);

    void deleteMovie(Long movieId) throws Exception;

    List<Movie> getMovies() throws Exception;

    void updateRating(Long movieId, UpdateRatingRequest updateRatingRequest) throws Exception;
}
