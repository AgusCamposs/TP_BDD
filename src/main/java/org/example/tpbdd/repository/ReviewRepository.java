package org.example.tpbdd.repository;

import org.example.tpbdd.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<Review, String> {
}
