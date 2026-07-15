package com.tripmind.api.repositories;

import com.tripmind.api.entities.TripAiRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface TripAiRecommendationRepository extends JpaRepository<TripAiRecommendation, Long> {
    List<TripAiRecommendation> findByTripIdAndDismissedFalse(UUID tripId);
}
