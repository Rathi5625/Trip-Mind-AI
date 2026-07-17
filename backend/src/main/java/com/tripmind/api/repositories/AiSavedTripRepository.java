package com.tripmind.api.repositories;

import com.tripmind.api.entities.AiSavedTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface AiSavedTripRepository extends JpaRepository<AiSavedTrip, Long> {
    List<AiSavedTrip> findByUserId(UUID userId);
}
