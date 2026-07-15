package com.tripmind.api.dtos;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripDayDto {
    private Long id;
    private int dayNumber;
    private LocalDate date;
    private String description;
    private List<TransportationDto> transportations;
    private List<ActivityDto> activities;
}
