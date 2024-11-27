package org.example.tpbdd.service;

import jakarta.validation.Valid;
import org.example.tpbdd.dto.ActorRequest;
import org.example.tpbdd.dto.MovieRequest;
import org.example.tpbdd.dto.UpdateRatingRequest;
import org.example.tpbdd.model.Actor;
import org.example.tpbdd.model.Movie;
import org.example.tpbdd.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public void createMovie(@Valid MovieRequest movieRequest) {
        Movie movie = new Movie();
        movie.setTitle(movieRequest.getTitle());
        movie.setYear(movieRequest.getYear());
        movie.setGenre(movieRequest.getGenre());
        movie.setDirector(movieRequest.getDirector());
        movie.setRating(movieRequest.getRating());

        List<Actor> actors = new ArrayList<>();
        for(ActorRequest actorRequest : movieRequest.getActors()) {
            Actor actor = new Actor();
            actor.setName(actorRequest.getName());
            actor.setLastname(actorRequest.getLastname());
            actor.setAge(actorRequest.getAge());
            actors.add(actor);
        }
        movie.setActors(actors);

        movieRepository.save(movie);
    }

    public void deleteMovie(Long movieId) throws Exception {
        Optional<Movie> movie = movieRepository.findById(movieId);
        if(movie.isPresent()) {
            movieRepository.delete(movie.get());
            return;
        }
        throw new Exception("Movie not found");
    }

    public List<Movie> getMovies() throws Exception {
        List<Movie> movies = (List<Movie>) movieRepository.findAll();
        if(movies.isEmpty()) {
            throw new Exception("No Movies Found");
        }
        return movies;
    }

    public void updateRating(Long movieId, UpdateRatingRequest updateRatingRequest) throws Exception {
        Optional<Movie> movie = movieRepository.findById(movieId);
        if(movie.isPresent()) {
            movie.get().setRating(updateRatingRequest.getRating());
            movieRepository.save(movie.get());
            return;
        }
        throw new Exception("Movie not found");
    }
}
