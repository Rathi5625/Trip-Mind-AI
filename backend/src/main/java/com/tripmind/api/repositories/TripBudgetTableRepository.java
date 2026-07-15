package com.tripmind.api.repositories;

import com.tripmind.api.entities.TripBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TripBudgetTableRepository extends JpaRepository<TripBudget, Long> {
    Optional<TripBudget> findByTripId(UUID tripId);
}
