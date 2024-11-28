package org.example.tpbdd.service;

import org.example.tpbdd.dto.ReviewRequest;
import org.example.tpbdd.model.Review;

import java.util.List;

public interface ReviewService {
    Review createReview(ReviewRequest reviewRequest);

    List<Review> getAllReviews() throws Exception;

    void deleteReview(String id) throws Exception;

    Review updateReview(String id, ReviewRequest reviewRequest) throws Exception;
}
