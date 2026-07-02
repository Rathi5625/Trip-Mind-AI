package com.tripmind.api.repositories;

import com.tripmind.api.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    List<Payment> findByBookingUserId(UUID userId);
    Optional<Payment> findByTransactionReference(String transactionReference);
    Optional<Payment> findByBookingId(UUID bookingId);
}
