package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "trip_stats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(name = "countdown_days")
    private Integer countdownDays;

    @Column(name = "ai_score")
    private Integer aiScore;

    @Transient
    private Double spentBudget;

    @Transient
    private Double totalBudget;

    @Column(name = "status_badge", length = 50)
    private String statusBadge;
}
