package com.tripmind.api.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedPlaceDto {
    private Long id;
    private String placeType; // HOTEL, RESTAURANT, ATTRACTION
    private Long referenceId;
    private String name;
    private String address;
    private double rating;
    private String imageUrl;
    private String notes;
}
