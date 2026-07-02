package com.tripmind.api.dtos;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripDto {
    private UUID id;
    private String title;
    private String destinationName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String budgetCategory;
    private int travelersCount;
    private String pace;
    private boolean isPublic;
    private LocalDateTime createdAt;
    private List<TripDayDto> days;
    private List<BudgetDto> budgets;
    private List<TravelerDto> travelers;
}
