package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @Column(name = "resource_type", nullable = false, length = 50)
    private String resourceType; // HOTEL, FLIGHT, RESTAURANT, CAR_RENTAL, TRANSFER, INSURANCE, TRAIN, BUS

    @Column(name = "resource_name", nullable = false, length = 150)
    private String resourceName;

    @Column(name = "reference_number", unique = true, nullable = false, length = 100)
    private String referenceNumber;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false, length = 50)
    private String status; // PENDING, CONFIRMED, CANCELLED

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
