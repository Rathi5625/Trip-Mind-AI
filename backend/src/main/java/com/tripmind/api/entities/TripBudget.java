package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "trip_budget")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripBudget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(name = "total_budget", nullable = false)
    private double totalBudget;

    @Column(name = "spent_budget", nullable = false)
    private double spentBudget;
}
