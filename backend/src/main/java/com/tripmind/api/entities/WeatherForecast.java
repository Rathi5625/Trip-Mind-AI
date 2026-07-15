package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "weather_forecasts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherForecast {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(nullable = false)
    private double temperature;

    @Column(name = "condition_text", nullable = false, length = 100)
    private String conditionText;

    @Column(name = "rain_prob", nullable = false)
    private double rainProb;

    @Column(name = "uv_index", nullable = false)
    private double uvIndex;
}
