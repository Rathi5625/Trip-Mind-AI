package com.tripmind.api.dtos;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DestinationDto {
    private String id;
    private String name;
    private String country;
    private String imageUrl;
    private String description;
    private String averageBudget;
    private double averageBudgetValue;
    private String bestSeason;
    private double rating;
    private int aiMatch;
    private List<String> categories;
    private String weatherTemp;
    private String weatherText;
    private int safetyIndex;
    private int crowdScore;
}
