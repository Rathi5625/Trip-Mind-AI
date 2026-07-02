package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "transportations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transportation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_day_id", nullable = false)
    private TripDay tripDay;

    @Column(nullable = false, length = 50)
    private String type; // e.g. "FLIGHT", "TRAIN", "TAXI", "WALK"

    @Column(length = 100)
    private String origin;

    @Column(length = 100)
    private String destination;

    @Column(name = "departure_time", length = 50)
    private String departureTime;

    @Column(name = "arrival_time", length = 50)
    private String arrivalTime;

    private double cost;

    @Column(length = 50)
    private String duration; // e.g. "2h 15m"
}
