package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_generated_itineraries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiGeneratedItinerary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String destination;

    @Column(name = "budget_level", length = 50)
    private String budgetLevel;

    @Column(name = "duration_days")
    private Integer durationDays;

    @Column(name = "raw_itinerary_json", columnDefinition = "TEXT", nullable = false)
    private String rawItineraryJson;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
