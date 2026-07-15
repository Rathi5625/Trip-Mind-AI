package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "trip_weather")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripWeather {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    private Double temperature;

    @Column(length = 10)
    private String currency;

    @Column(length = 50)
    private String timezone;

    @Column(name = "safety_rating")
    private Double safetyRating;
}
