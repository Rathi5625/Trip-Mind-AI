package com.tripmind.api.repositories;

import com.tripmind.api.entities.TripInsight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface TripInsightRepository extends JpaRepository<TripInsight, Long> {
    List<TripInsight> findByTripId(UUID tripId);
}
