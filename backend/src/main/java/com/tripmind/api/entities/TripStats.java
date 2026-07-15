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

    @Column(name = "spent_budget")
    private Double spentBudget;

    @Column(name = "total_budget")
    private Double totalBudget;

    @Column(name = "status_badge", length = 50)
    private String statusBadge;
}
