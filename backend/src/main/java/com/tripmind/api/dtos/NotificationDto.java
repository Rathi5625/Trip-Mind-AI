package com.tripmind.api.dtos;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDto {
    private Long id;
    private String title;
    private String message;
    private String type; // INFO, SUCCESS, WARNING, ERROR
    private boolean isRead;
    private LocalDateTime createdAt;
}
