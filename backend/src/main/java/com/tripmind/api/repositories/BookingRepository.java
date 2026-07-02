package com.tripmind.api.repositories;

import com.tripmind.api.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByUserId(UUID userId);
    List<Booking> findByTripId(UUID tripId);
    Optional<Booking> findByReferenceNumber(String referenceNumber);
}
