package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "ai_optimization_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiOptimizationResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trip_id")
    private UUID tripId;

    @Column(name = "optimization_type", nullable = false, length = 100)
    private String optimizationType;

    @Column(name = "time_saved_min")
    private Integer timeSavedMin;

    @Column(name = "budget_saved")
    private Double budgetSaved;

    @Column(name = "original_details", columnDefinition = "TEXT")
    private String originalDetails;

    @Column(name = "optimized_details", columnDefinition = "TEXT")
    private String optimizedDetails;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
