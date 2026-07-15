package com.tripmind.api.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityDto {
    private Long id;
    private String time;
    private String name;
    private String description;
    private String imageUrl;
    private String category;
    private String duration;
    private Double budget;
    private String address;
    private Double rating;
}
