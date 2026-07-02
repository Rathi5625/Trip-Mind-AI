package com.tripmind.api.dtos;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDto {
    private Long id;
    private UUID userId;
    private String userName;
    private String destinationId;
    private double rating;
    private String comment;
    private LocalDateTime createdAt;
}
