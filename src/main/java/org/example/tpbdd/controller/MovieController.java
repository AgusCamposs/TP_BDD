package org.example.tpbdd.controller;

import org.example.tpbdd.dto.MovieRequest;
import org.example.tpbdd.dto.UpdateRatingRequest;
import org.example.tpbdd.model.Movie;
import org.example.tpbdd.service.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private final MovieService movieService;

    MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/create")
    public ResponseEntity<Movie> createMovie(@RequestBody @Valid MovieRequest movieRequest){
        Movie movie = movieService.createMovie(movieRequest);
        return new ResponseEntity<>(movie, HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{movieId}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long movieId) throws Exception {
        movieService.deleteMovie(movieId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/all")
    public ResponseEntity<List> getAllMovies() throws Exception {
        List<Movie> movies = movieService.getMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }
    @PatchMapping("/updateRating/{movieId}")
    public ResponseEntity<Movie> updateRating(@PathVariable Long movieId,
                                             @RequestBody @Valid UpdateRatingRequest updateRatingRequest) throws Exception {
        Movie movie = movieService.updateRating(movieId, updateRatingRequest);
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }
}
