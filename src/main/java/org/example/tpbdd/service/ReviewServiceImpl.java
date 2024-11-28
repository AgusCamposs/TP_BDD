package org.example.tpbdd.service;

import jakarta.validation.Valid;
import org.example.tpbdd.dto.ReviewRequest;
import org.example.tpbdd.model.Review;
import org.example.tpbdd.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review createReview(@Valid ReviewRequest reviewRequest){
        Review review = new Review();
        review.setReviewerName(reviewRequest.getReviewerName());
        review.setReview(reviewRequest.getReview());
        review.setMovie(reviewRequest.getMovie());
        review.setRating(reviewRequest.getRating());
        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() throws Exception{
        List<Review> reviews = reviewRepository.findAll();
        if(reviews.isEmpty()){
            throw new Exception("No reviews found");
        }
        return reviews;
    }

    public void deleteReview(String id) throws Exception {
        Optional<Review> review = reviewRepository.findById(id);
        if(review.isPresent()){
            reviewRepository.delete(review.get());
            return;
        }
        throw new Exception("Review not found");
    }

    public Review updateReview(String id, ReviewRequest reviewRequest) throws Exception {
        Optional<Review> review = reviewRepository.findById(id);
        if(review.isPresent()){
            if(Objects.equals(reviewRequest.getReviewerName(), review.get().getReviewerName()) && Objects.equals(reviewRequest.getMovie(), review.get().getMovie())){
                review.get().setReview(reviewRequest.getReview());
                review.get().setRating(reviewRequest.getRating());
                return reviewRepository.save(review.get());
            }
            throw new Exception("You do not have a review on this movie");
        }
        throw new Exception("Review not found");
    }
}
