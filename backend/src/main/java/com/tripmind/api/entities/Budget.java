package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "budgets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(name = "total_limit")
    private double totalLimit;

    @Column(name = "spent_amount")
    private double spentAmount;

    @Column(nullable = false, length = 50)
    private String category; // e.g. "STAYS", "FLIGHTS", "FOOD", "ACTIVITIES", "OTHERS"
}
