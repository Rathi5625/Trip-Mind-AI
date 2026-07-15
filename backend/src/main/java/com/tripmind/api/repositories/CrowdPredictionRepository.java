package com.tripmind.api.repositories;

import com.tripmind.api.entities.CrowdPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CrowdPredictionRepository extends JpaRepository<CrowdPrediction, Long> {
    Optional<CrowdPrediction> findByTripId(UUID tripId);
}
