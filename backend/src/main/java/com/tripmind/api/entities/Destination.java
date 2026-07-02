package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "destinations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Destination {
    @Id
    @Column(length = 50)
    private String id; // e.g. "paris", "tokyo", "bali"

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String country;

    @Column(length = 500)
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "average_budget")
    private String averageBudget; // e.g. "₹70K" or "₹1.5L"

    @Column(name = "average_budget_value")
    private double averageBudgetValue; // numeric value for sorting/filtering, e.g. 70000

    @Column(name = "best_season", length = 100)
    private String bestSeason;

    private double rating;

    @Column(name = "ai_match")
    private int aiMatch; // e.g. 98

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "destination_categories", joinColumns = @JoinColumn(name = "destination_id"))
    @Column(name = "category")
    @Builder.Default
    private List<String> categories = new ArrayList<>();

    @Column(name = "weather_temp", length = 50)
    private String weatherTemp; // e.g. "18°C–26°C"

    @Column(name = "weather_text", length = 100)
    private String weatherText; // e.g. "Partly Cloudy"

    @Column(name = "safety_index")
    private int safetyIndex; // e.g. 85

    @Column(name = "crowd_score")
    private int crowdScore; // e.g. 40
}
