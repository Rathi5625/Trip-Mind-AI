package com.tripmind.api.repositories;

import com.tripmind.api.entities.TripStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TripStatsRepository extends JpaRepository<TripStats, Long> {
    Optional<TripStats> findByTripId(UUID tripId);
}
