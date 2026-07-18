package com.tripmind.api.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlannerRequest {

    @NotBlank(message = "Prompt is required for trip generation")
    private String prompt;

    private String destination;
    private String travelStyle;
    private Integer durationDays;
}
