package com.tripmind.api.repositories;

import com.tripmind.api.entities.AiGeneratedItinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiGeneratedItineraryRepository extends JpaRepository<AiGeneratedItinerary, Long> {
}
