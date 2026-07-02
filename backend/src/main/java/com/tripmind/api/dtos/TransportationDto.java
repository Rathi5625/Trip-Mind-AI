package com.tripmind.api.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransportationDto {
    private Long id;
    private String type;
    private String origin;
    private String destination;
    private String departureTime;
    private String arrivalTime;
    private double cost;
    private String duration;
}
