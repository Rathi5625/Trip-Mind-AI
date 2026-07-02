package com.tripmind.api.repositories;

import com.tripmind.api.entities.WeatherCache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WeatherCacheRepository extends JpaRepository<WeatherCache, Long> {
    Optional<WeatherCache> findByDestinationIdAndDate(String destinationId, LocalDate date);
    List<WeatherCache> findByDestinationIdAndDateBetween(String destinationId, LocalDate start, LocalDate end);
}
