package com.tripmind.api.repositories;

import com.tripmind.api.entities.TripAiForecast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface TripAiForecastRepository extends JpaRepository<TripAiForecast, Long> {
    List<TripAiForecast> findByTripId(UUID tripId);
}
