package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "weather_caches", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"destination_id", "date"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherCache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "temp_max")
    private double tempMax;

    @Column(name = "temp_min")
    private double tempMin;

    @Column(name = "condition_text", length = 100)
    private String conditionText;

    @Column(length = 20)
    private String code; // Weather status code (e.g. sunny, cloudy, rainy)

    private double humidity;

    @Column(name = "wind_kph")
    private double windKph;
}
