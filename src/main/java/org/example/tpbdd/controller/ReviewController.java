package org.example.tpbdd.controller;

import jakarta.validation.Valid;
import org.example.tpbdd.dto.ReviewRequest;
import org.example.tpbdd.model.Review;
import org.example.tpbdd.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:8081", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/create")
    public ResponseEntity<Review> createReview(@RequestBody @Valid ReviewRequest reviewRequest) {
        Review review = reviewService.createReview(reviewRequest);
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }
    @GetMapping("/all")
    public ResponseEntity<List> getAllReviews() throws Exception {
        List<Review> reviews = reviewService.getAllReviews();
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable String id) throws Exception {
        reviewService.deleteReview(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PatchMapping("/updateReview/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable String id,
                                               @RequestBody @Valid ReviewRequest reviewRequest) throws Exception {
        Review review = reviewService.updateReview(id, reviewRequest);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }
}
