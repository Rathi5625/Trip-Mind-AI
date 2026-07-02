package com.tripmind.api.dtos;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDto {
    private UUID id;
    private UUID userId;
    private UUID tripId;
    private String resourceType;
    private String resourceName;
    private String referenceNumber;
    private double price;
    private String status;
    private String details;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime createdAt;
}
