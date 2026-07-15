package com.tripmind.api.repositories;

import com.tripmind.api.entities.TripProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TripProgressRepository extends JpaRepository<TripProgress, Long> {
    Optional<TripProgress> findByTripId(UUID tripId);
}
